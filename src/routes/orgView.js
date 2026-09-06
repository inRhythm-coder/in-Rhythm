const express = require('express');
const db = require('../db');
const { formatCents } = require('../billing/orgPricing');

const router = express.Router();

// A lightweight, read-only view for an organization's own point of contact -
// deliberately NOT the superadmin dashboard (public/admin.html), and
// deliberately NOT gated by the same enrollment code employees use to sign
// up (that would let any enrolled employee see how many colleagues have
// joined). Auth here is a separate, longer view_token generated once when
// the organization is created (src/routes/admin.js) and handed only to the
// org's contact - knowing it is what proves you're allowed to see this
// organization's aggregate numbers. It intentionally returns NO employee
// names, phone numbers, or emails - seat counts and code status only.
router.get('/api/org/status', (req, res) => {
  const token = (req.query.token || '').trim();
  if (!token) return res.status(400).json({ error: 'missing token' });

  const org = db.prepare('SELECT * FROM organizations WHERE view_token = ?').get(token);
  if (!org) return res.status(404).json({ error: 'not found' });

  const seatsUsed = db.prepare(`
    SELECT COUNT(*) AS n FROM subscribers WHERE org_id = ? AND status != 'unsubscribed'
  `).get(org.id).n;

  const codes = db.prepare(`
    SELECT code, note, max_uses, uses_count, active, created_at
    FROM client_codes WHERE org_id = ? ORDER BY created_at DESC
  `).all(org.id);

  const cost = org.base_fee_cents != null
    ? org.base_fee_cents + Math.max(0, org.seat_limit - org.included_seats) * (org.per_seat_cents || 0)
    : null;

  res.json({
    organization: {
      name: org.name,
      tier: org.tier,
      status: org.status,
      seatLimit: org.seat_limit,
      includedSeats: org.included_seats,
      seatsUsed,
      seatsRemaining: Math.max(0, org.seat_limit - seatsUsed),
      monthlyCostFormatted: formatCents(cost),
      contractStart: org.contract_start,
      contractEnd: org.contract_end,
    },
    codes,
  });
});

module.exports = router;
