const express = require('express');
const db = require('../db');

const router = express.Router();

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

router.patch('/api/admin/subscribers/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { cadence, status, content_preference, preferred_language } = req.body;

  const existing = db.prepare('SELECT id FROM subscribers WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'subscriber not found' });

  const fields = [];
  const values = [];

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

module.exports = router;
