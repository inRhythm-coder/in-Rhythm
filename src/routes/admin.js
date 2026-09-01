const express = require('express');
const db = require('../db');
const { sendSms, buildCatchupWelcomeMessage } = require('../sms/twilio');

const router = express.Router();

// Anyone who signed up before this fix went live may have had their welcome
// text silently filtered by carriers (A2P 10DLC wasn't registered/attached
// yet). This cutoff keeps the one-time catch-up send from ever re-firing on
// someone who signed up normally afterward and already got a real welcome
// text - safe to click the catch-up button more than once.
const WELCOME_CATCHUP_CUTOFF = '2026-09-01T12:00:00Z';

const CADENCES = ['daily', 'weekly', 'biweekly', 'monthly'];
const STATUSES = ['pending_confirmation', 'active', 'paused', 'unsubscribed'];
const CONTENT_PREFS = ['leadership', 'spiritual', 'both'];
const LANGUAGES = ['en', 'es'];

function requireAdmin(req, res, next) {
  const token = req.header('x-admin-token') || req.query.token;
  const expected = process.env.ADMIN_TOKEN || 'change-me';
  if (!token || token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Simple counts for the dashboard header.
router.get('/api/admin/summary', requireAdmin, (req, res) => {
  const totals = db.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active,
      SUM(CASE WHEN status = 'pending_confirmation' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'paused' THEN 1 ELSE 0 END) AS paused,
      SUM(CASE WHEN status = 'unsubscribed' THEN 1 ELSE 0 END) AS unsubscribed
    FROM subscribers
  `).get();
  res.json({ totals });
});

router.get('/api/admin/subscribers', requireAdmin, (req, res) => {
  const rows = db.prepare(`
    SELECT id, name, phone, email, cadence, status, access_type, preferred_language,
           content_preference, billing_status, created_at, last_sent_at, next_send_at
    FROM subscribers
    ORDER BY created_at DESC
  `).all();
  res.json({ subscribers: rows });
});

// Same light US-centric normalization used at signup (src/routes/signup.js) -
// kept in sync so a phone fixed here passes the same E.164 shape Twilio expects.
function toE164(raw) {
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

router.patch('/api/admin/subscribers/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { cadence, status, content_preference, preferred_language, phone } = req.body;

  const existing = db.prepare('SELECT id FROM subscribers WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'subscriber not found' });

  const fields = [];
  const values = [];

  if (phone !== undefined) {
    const e164 = toE164(phone);
    if (!e164) return res.status(400).json({ error: 'Enter a valid 10-digit US phone number' });
    const dupe = db.prepare('SELECT id FROM subscribers WHERE phone = ? AND id != ?').get(e164, id);
    if (dupe) return res.status(409).json({ error: 'Another subscriber already has that number' });
    fields.push('phone = ?'); values.push(e164);
  }
  if (cadence !== undefined) {
    if (!CADENCES.includes(cadence)) return res.status(400).json({ error: 'invalid cadence' });
    fields.push('cadence = ?'); values.push(cadence);
  }
  if (status !== undefined) {
    if (!STATUSES.includes(status)) return res.status(400).json({ error: 'invalid status' });
    fields.push('status = ?'); values.push(status);
  }
  if (content_preference !== undefined) {
    if (!CONTENT_PREFS.includes(content_preference)) return res.status(400).json({ error: 'invalid content_preference' });
    fields.push('content_preference = ?'); values.push(content_preference);
  }
  if (preferred_language !== undefined) {
    if (!LANGUAGES.includes(preferred_language)) return res.status(400).json({ error: 'invalid preferred_language' });
    fields.push('preferred_language = ?'); values.push(preferred_language);
  }

  if (!fields.length) return res.status(400).json({ error: 'nothing to update' });

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  db.prepare(`UPDATE subscribers SET ${fields.join(', ')} WHERE id = ?`).run(...values);

  const updated = db.prepare('SELECT * FROM subscribers WHERE id = ?').get(id);
  res.json({ ok: true, subscriber: updated });
});

// Permanently removes a subscriber record - for cleaning up accidental
// duplicate signups (e.g. someone submitted the form twice). This deletes
// their sends history too (foreign key), not just the subscriber row.
router.delete('/api/admin/subscribers/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT id FROM subscribers WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'subscriber not found' });

  db.prepare('DELETE FROM sends WHERE subscriber_id = ?').run(id);
  db.prepare('DELETE FROM subscribers WHERE id = ?').run(id);

  res.json({ ok: true });
});

// One-time catch-up: text everyone who signed up before the A2P fix and
// never got a real welcome message (carrier-filtered), without touching
// anyone who signed up normally afterward. Safe to call more than once -
// each subscriber only ever gets this once (welcome_catchup_sent_at).
router.post('/api/admin/catchup-welcome', requireAdmin, async (req, res) => {
  const candidates = db.prepare(`
    SELECT id, name, phone, preferred_language
    FROM subscribers
    WHERE status = 'active'
      AND welcome_catchup_sent_at IS NULL
      AND created_at < ?
  `).all(WELCOME_CATCHUP_CUTOFF);

  const results = { attempted: candidates.length, sent: 0, failed: 0, errors: [] };

  for (const sub of candidates) {
    const body = buildCatchupWelcomeMessage(sub.preferred_language);
    try {
      await sendSms(sub.phone, body);
      db.prepare('UPDATE subscribers SET welcome_catchup_sent_at = CURRENT_TIMESTAMP WHERE id = ?').run(sub.id);
      results.sent += 1;
    } catch (err) {
      results.failed += 1;
      results.errors.push({ id: sub.id, name: sub.name, error: String(err.message || err) });
    }
  }

  res.json(results);
});

module.exports = router;
