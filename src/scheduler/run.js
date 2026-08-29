require('dotenv').config();
const db = require('../db');
const { isSendEligible, expireStaleTailAccess } = require('../db/access');
const { sendSms } = require('../sms/twilio');

const CADENCE_DAYS = { daily: 1, weekly: 7, biweekly: 14, monthly: 30 };

function computeNextSendAt(cadence, from = new Date()) {
  const days = CADENCE_DAYS[cadence];
  const next = new Date(from);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

/**
 * Pick a message this subscriber hasn't received yet (falls back to least-
 * recently-sent if they've exhausted the approved bank), prioritizing their
 * theme preferences when set.
 */
function pickMessageFor(subscriber) {
  const sentIds = db.prepare('SELECT message_id FROM sends WHERE subscriber_id = ?')
    .all(subscriber.id).map(r => r.message_id);

  const placeholders = sentIds.length ? sentIds.map(() => '?').join(',') : null;
  const baseWhere = 'active = 1 AND approved = 1';

  let row;
  if (placeholders) {
    row = db.prepare(
      `SELECT * FROM messages WHERE ${baseWhere} AND id NOT IN (${placeholders}) ORDER BY RANDOM() LIMIT 1`
    ).get(...sentIds);
  }
  if (!row) {
    // exhausted the bank -> recycle, oldest-sent-to-this-person first is fine via random
    row = db.prepare(`SELECT * FROM messages WHERE ${baseWhere} ORDER BY RANDOM() LIMIT 1`).get();
  }
  return row;
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
      db.prepare('UPDATE subscribers SET next_send_at = ? WHERE id = ?')
        .run(computeNextSendAt('daily', new Date()), sub.id);
      continue;
    }

    const message = pickMessageFor(sub);
    if (!message) {
      console.warn('[scheduler] no approved messages available in bank - skipping all sends');
      break;
    }

    try {
      const result = await sendSms(sub.phone, message.body);
      db.prepare(`
        INSERT INTO sends (subscriber_id, message_id, twilio_sid, status)
        VALUES (?, ?, ?, 'sent')
      `).run(sub.id, message.id, result.sid);

      db.prepare(`
        UPDATE subscribers
        SET last_sent_message_id = ?, last_sent_at = CURRENT_TIMESTAMP,
            next_send_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(message.id, computeNextSendAt(sub.cadence), sub.id);

      console.log(`[sent] -> ${sub.name} (${sub.phone}) msg #${message.id}`);
    } catch (err) {
      db.prepare(`
        INSERT INTO sends (subscriber_id, message_id, status, error)
        VALUES (?, ?, 'failed', ?)
      `).run(sub.id, message.id, String(err.message || err));
      console.error(`[failed] -> ${sub.name} (${sub.phone}):`, err.message);
    }
  }
}

if (require.main === module) {
  runOnce().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runOnce, computeNextSendAt, pickMessageFor };
