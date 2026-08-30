const express = require('express');
const db = require('../db');
const { markAsClient } = require('../db/access');
const { sendSms, buildOptInMessage, notifyCoachOfNewSubscriber } = require('../sms/twilio');
const { createCheckoutSession } = require('../billing/stripe');

const router = express.Router();

// Very light phone normalization -> E.164 (US-centric; swap for a real lib
// like libphonenumber-js if you expect international subscribers)
function toE164(raw) {
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (String(raw).startsWith('+')) return raw;
  return null;
}

router.post('/api/signup', async (req, res) => {
  try {
    const { name, phone, cadence, clientCode, email, preferredLanguage, contentPreference } = req.body;

    if (!name || !phone || !cadence) {
      return res.status(400).json({ error: 'name, phone, and cadence are required' });
    }
    if (!['daily', 'weekly', 'biweekly', 'monthly'].includes(cadence)) {
      return res.status(400).json({ error: 'invalid cadence' });
    }
    const language = preferredLanguage === 'es' ? 'es' : 'en';
    const content = ['leadership', 'spiritual', 'both'].includes(contentPreference) ? contentPreference : 'both';

    const e164 = toE164(phone);
    if (!e164) {
      return res.status(400).json({ error: 'please enter a valid 10-digit US phone number' });
    }

    const existing = db.prepare('SELECT * FROM subscribers WHERE phone = ?').get(e164);
    if (existing) {
      return res.status(409).json({ error: 'This number is already signed up.' });
    }

    // Client access code: simplest possible version. Swap for a real
    // per-client code / lookup against your CRM roster when ready.
    const isClientCode = clientCode && clientCode.trim().toUpperCase() === (process.env.CLIENT_ACCESS_CODE || 'CLIENT2026');
    const accessType = isClientCode ? 'client' : 'paid';

    const result = db.prepare(`
      INSERT INTO subscribers (name, phone, cadence, status, access_type, email, preferred_language, content_preference, consent_given_at, consent_ip, next_send_at)
      VALUES (?, ?, ?, 'pending_confirmation', ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)
    `).run(name, e164, cadence, accessType, email || null, language, content, req.ip);

    if (isClientCode) {
      markAsClient(result.lastInsertRowid, { engagementStart: new Date().toISOString().slice(0, 10) });
    }

    // Send opt-in confirmation text immediately (also verifies the number works)
    try {
      const optIn = buildOptInMessage();
      const msg = await sendSms(e164, optIn);
      db.prepare(`UPDATE subscribers SET status = 'active' WHERE id = ?`).run(result.lastInsertRowid);
      console.log(`[signup] opt-in sent to ${e164}, sid=${msg.sid}`);
    } catch (smsErr) {
      // Signup still succeeds even if the confirmation text fails to send;
      // subscriber stays 'pending_confirmation' for manual follow-up.
      console.error('[signup] opt-in SMS failed:', smsErr.message);
    }

    // Let Terry know a new subscriber just signed up (best-effort, never
    // blocks or fails the signup itself).
    notifyCoachOfNewSubscriber({ name, phone: e164, cadence, email }).catch(() => {});

    const needsPayment = accessType === 'paid';
    let checkoutUrl = null;
    if (needsPayment) {
      try {
        const session = await createCheckoutSession(result.lastInsertRowid, { name, phone: e164 });
        checkoutUrl = session.url;
      } catch (billingErr) {
        // Signup still succeeds; frontend can show a "contact us to complete payment"
        // fallback if Stripe isn't configured yet (e.g. during initial setup).
        console.error('[signup] checkout session creation failed:', billingErr.message);
      }
    }

    res.json({
      ok: true,
      subscriberId: result.lastInsertRowid,
      needsPayment,
      checkoutUrl, // frontend redirects here when present
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
