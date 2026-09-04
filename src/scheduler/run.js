require('dotenv').config();
const db = require('../db');
const { isSendEligible, expireStaleTailAccess } = require('../db/access');
const { sendSms } = require('../sms/twilio');
const { SCHEDULE_TZ, SEND_HOUR, SEND_MINUTE } = require('./scheduleConfig');
const { zonedParts, zonedTimeToUtc } = require('./tz');

const CADENCE_DAYS = { daily: 1, weekly: 7, biweekly: 14, monthly: 30 };

/**
 * Always lands on the exact hour/minute the daily sweep actually fires at
 * (SEND_HOUR:SEND_MINUTE in SCHEDULE_TZ), `days` calendar days out - never
 * inherits whatever time-of-day the triggering event happened to occur at
 * (a signup at 9:05am, or an extra sweep 10 seconds after a deploy).
 *
 * That matters because the sweep in server.js only fires ONCE a day, at a
 * fixed hour. If next_send_at ever drifts to some other time (e.g. 9:05am
 * when the schedule is 8:00am), that day's 8:00am sweep sees "not due yet"
 * and skips them - they don't get picked up until the FOLLOWING day's
 * 8:00am sweep, roughly 24 hours late, and it keeps happening every cycle
 * after that since each send re-derives the next one from itself. Anchoring
 * to the actual sweep time here is what keeps that from ever happening.
 */
function computeNextSendAt(cadence, from = new Date()) {
  const days = CADENCE_DAYS[cadence];
  const nowParts = zonedParts(from, SCHEDULE_TZ);
  const targetDateUtc = new Date(Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day));
  targetDateUtc.setUTCDate(targetDateUtc.getUTCDate() + days);

  // Weekday-only sending: if the computed date lands on a Saturday or
  // Sunday, push it to the following Monday. getUTCDay() on a plain
  // Y/M/D-only UTC date correctly reflects that calendar date's real-world
  // weekday regardless of timezone, so this is safe to check here before
  // the date gets converted to a specific zoned clock time below. This is
  // the actual guarantee that no send ever goes out on a weekend - the
  // Mon-Fri cron schedule (scheduleConfig.js) is a second, redundant layer
  // on top of this, not the only thing preventing it.
  const dayOfWeek = targetDateUtc.getUTCDay(); // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 6) targetDateUtc.setUTCDate(targetDateUtc.getUTCDate() + 2); // Sat -> Mon
  if (dayOfWeek === 0) targetDateUtc.setUTCDate(targetDateUtc.getUTCDate() + 1); // Sun -> Mon

  return zonedTimeToUtc(
    targetDateUtc.getUTCFullYear(),
    targetDateUtc.getUTCMonth() + 1,
    targetDateUtc.getUTCDate(),
    SEND_HOUR,
    SEND_MINUTE,
    SCHEDULE_TZ
  ).toISOString();
}

/**
 * Pick a message this subscriber hasn't received yet (falls back to least-
 * recently-sent if they've exhausted the approved bank), in a specific
 * category when one is given. `category` is passed explicitly (rather than
 * always reading it off subscriber.content_preference) so a 'both'
 * subscriber can be sent through this twice in the same run - once forced
 * to 'leadership', once to 'spiritual' - to get one message of each,
 * instead of one message randomly drawn from the combined pool.
 */
function pickMessageForCategory(subscriber, category) {
  // Only count messages that actually went out successfully. A failed send
  // attempt still gets a row in `sends` (for the error log/history), but if
  // we counted those toward "already received," a run of failed attempts -
  // like the several we triggered today while chasing the Twilio Messaging
  // Service bug - would permanently mark whatever messages they happened to
  // pick as "sent" and exclude them forever, even though the subscriber
  // never actually got them. That skews future picks toward whatever
  // category/messages weren't unlucky enough to get picked by a failed try.
  const sentIds = db.prepare(`SELECT message_id FROM sends WHERE subscriber_id = ? AND status = 'sent'`)
    .all(subscriber.id).map(r => r.message_id);

  const language = subscriber.preferred_language === 'es' ? 'es' : 'en';
  const contentPref = (category === 'leadership' || category === 'spiritual') ? category : null;

  let baseWhere = 'active = 1 AND approved = 1 AND language = ?';
  const baseParams = [language];
  if (contentPref) {
    baseWhere += ' AND category = ?';
    baseParams.push(contentPref);
  }

  const placeholders = sentIds.length ? sentIds.map(() => '?').join(',') : null;

  let row;
  if (placeholders) {
    row = db.prepare(
      `SELECT * FROM messages WHERE ${baseWhere} AND id NOT IN (${placeholders}) ORDER BY RANDOM() LIMIT 1`
    ).get(...baseParams, ...sentIds);
  }
  if (!row) {
    // exhausted the bank -> recycle, oldest-sent-to-this-person first is fine via random
    row = db.prepare(`SELECT * FROM messages WHERE ${baseWhere} ORDER BY RANDOM() LIMIT 1`).get(...baseParams);
  }
  if (!row && language !== 'en') {
    // fallback safety net: if a language pool is ever empty, don't skip the
    // subscriber entirely - fall back to English rather than send nothing
    // (still honoring their content preference if we can).
    let fallbackWhere = "active = 1 AND approved = 1 AND language = 'en'";
    const fallbackParams = [];
    if (contentPref) { fallbackWhere += ' AND category = ?'; fallbackParams.push(contentPref); }
    row = db.prepare(`SELECT * FROM messages WHERE ${fallbackWhere} ORDER BY RANDOM() LIMIT 1`).get(...fallbackParams);
  }
  if (!row && contentPref) {
    // last resort: their chosen category is empty for every language they'd
    // accept - send something rather than nothing.
    row = db.prepare(`SELECT * FROM messages WHERE active = 1 AND approved = 1 AND language = ? ORDER BY RANDOM() LIMIT 1`).get(language);
  }
  return row;
}

// Convenience wrapper for the common single-message case: derives the
// category from the subscriber's own preference ('both'/unset -> no filter,
// mixed pool). Used for 'leadership'-only and 'spiritual'-only subscribers,
// and kept exported since src/scripts/sendTest.js and others may call it
// directly for a one-off single message regardless of category.
function pickMessageFor(subscriber) {
  const contentPref = (subscriber.content_preference === 'leadership' || subscriber.content_preference === 'spiritual')
    ? subscriber.content_preference
    : null;
  return pickMessageForCategory(subscriber, contentPref);
}

/**
 * Sends a single message to a subscriber in a given category and records
 * the result (sent or failed) in `sends`. Shared by both the single-message
 * path (leadership-only / spiritual-only / unset) and the two-message path
 * ('both' - one leadership + one spiritual) below, so success/failure
 * logging stays identical either way.
 */
async function sendOneMessage(sub, category) {
  const message = category ? pickMessageForCategory(sub, category) : pickMessageFor(sub);
  if (!message) {
    console.warn(`[scheduler] no approved ${category || ''} messages available in bank - skipping`);
    return null;
  }

  try {
    const result = await sendSms(sub.phone, message.body);
    db.prepare(`
      INSERT INTO sends (subscriber_id, message_id, twilio_sid, status)
      VALUES (?, ?, ?, 'sent')
    `).run(sub.id, message.id, result.sid);
    console.log(`[sent] -> ${sub.name} (${sub.phone}) msg #${message.id}${category ? ` (${category})` : ''}`);
    return message;
  } catch (err) {
    db.prepare(`
      INSERT INTO sends (subscriber_id, message_id, status, error)
      VALUES (?, ?, 'failed', ?)
    `).run(sub.id, message.id, String(err.message || err));
    console.error(`[failed] -> ${sub.name} (${sub.phone})${category ? ` (${category})` : ''}:`, err.message);
    return null;
  }
}

async function runOnce() {
  const expired = expireStaleTailAccess();
  if (expired.length) {
    console.log(`[access] ${expired.length} subscriber(s) moved from client_tail -> paid`);
  }

  const now = new Date().toISOString();
  const due = db.prepare(`
    SELECT * FROM subscribers
    WHERE status = 'active' AND (next_send_at IS NULL OR next_send_at <= ?)
  `).all(now);

  console.log(`[scheduler] ${due.length} subscriber(s) due`);

  for (const sub of due) {
    if (!isSendEligible(sub)) {
      // Not eligible (e.g. paid access lapsed) - skip sending but still
      // advance next_send_at a bit so we don't hammer the DB re-checking hourly.
      // This used to be completely silent - a subscriber could get skipped
      // here every single day, forever, with nothing in the logs to explain
      // why they never received a text. Logging the reason is what actually
      // lets us tell "silently ineligible" apart from "really did send."
      console.log(
        `[skipped] -> ${sub.name} (${sub.phone}) not send-eligible ` +
        `(status=${sub.status}, access_type=${sub.access_type}, billing_status=${sub.billing_status})`
      );
      db.prepare('UPDATE subscribers SET next_send_at = ? WHERE id = ?')
        .run(computeNextSendAt('daily', new Date()), sub.id);
      continue;
    }

    // "Both" means one leadership message AND one spiritual message, as two
    // separate texts, every cadence cycle - not one message drawn at random
    // from the combined pool. Everyone else (leadership-only, spiritual-only,
    // or unset) still gets exactly one message, as before.
    if (sub.content_preference === 'both') {
      const leadershipMsg = await sendOneMessage(sub, 'leadership');
      const spiritualMsg = await sendOneMessage(sub, 'spiritual');
      const lastMessage = spiritualMsg || leadershipMsg;

      // Advance the schedule regardless of whether one or both sends failed -
      // any failure is already visible in the logs/sends table above, and an
      // admin can always force a retry via "Send now". Only touch
      // last_sent_* when at least one of the two actually went out, so a
      // fully-failed day doesn't overwrite the last real send with nothing.
      if (lastMessage) {
        db.prepare(`
          UPDATE subscribers
          SET last_sent_message_id = ?, last_sent_at = CURRENT_TIMESTAMP,
              next_send_at = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(lastMessage.id, computeNextSendAt(sub.cadence), sub.id);
      } else {
        db.prepare('UPDATE subscribers SET next_send_at = ? WHERE id = ?')
          .run(computeNextSendAt(sub.cadence), sub.id);
      }
      continue;
    }

    const message = await sendOneMessage(sub, null);
    if (message) {
      db.prepare(`
        UPDATE subscribers
        SET last_sent_message_id = ?, last_sent_at = CURRENT_TIMESTAMP,
            next_send_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(message.id, computeNextSendAt(sub.cadence), sub.id);
    }
    // On failure, next_send_at is deliberately left alone (same as before) -
    // the subscriber stays "due" so the next sweep retries automatically.
  }
}

if (require.main === module) {
  runOnce().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runOnce, computeNextSendAt, pickMessageFor };
