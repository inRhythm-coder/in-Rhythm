const express = require('express');
const db = require('../db');
const { createCheckoutSession, getStripe } = require('../billing/stripe');
const { sendSms, buildPurchaseConfirmationMessage, notifyCoachOfNewSubscriber } = require('../sms/twilio');

// Two separate routers because the webhook route needs the RAW request body
// (to verify Stripe's signature) and must be mounted BEFORE express.json()
// runs on the app; the checkout-session route needs the opposite - parsed
// JSON - so it's mounted normally, after express.json(). See server.js.
const webhookRouter = express.Router();
const apiRouter = express.Router();

// Called by the signup page once a subscriber is created with needsPayment=true
apiRouter.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { subscriberId } = req.body;
    const sub = db.prepare('SELECT * FROM subscribers WHERE id = ?').get(subscriberId);
    if (!sub) return res.status(404).json({ error: 'subscriber not found' });

    const session = await createCheckoutSession({
      subscriberId: sub.id,
      name: sub.name,
      phone: sub.phone,
      cadence: sub.cadence,
      email: sub.email,
      preferredLanguage: sub.preferred_language,
      contentPreference: sub.content_preference,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('[billing] checkout session error:', err.message);
    res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
});

// Stripe webhook: keeps billing_status in sync automatically.
// IMPORTANT: this route needs the RAW request body (not JSON-parsed) to
// verify the signature, which is why it's mounted with express.raw() below
// instead of the app-wide express.json() middleware.
webhookRouter.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Prefer a known subscriberId (the legacy/secondary path - an existing
  // row, e.g. a resent checkout link) but fall back to looking the
  // subscriber up by phone, since that's all we have for a brand-new paid
  // signup that had no row at all until this very event.
  function resolveSubscriberId(obj) {
    const metaSubscriberId = obj?.metadata?.subscriberId;
    if (metaSubscriberId) return Number(metaSubscriberId);
    const phone = obj?.metadata?.phone;
    if (phone) {
      const row = db.prepare('SELECT id FROM subscribers WHERE phone = ?').get(phone);
      if (row) return row.id;
    }
    return null;
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const meta = session.metadata || {};
      let subscriberId = resolveSubscriberId(session);
      let isNewSubscriber = false;

      // No existing row found for this phone - this is a brand-new paid
      // signup. Create the subscriber record now, for the first time,
      // now that Stripe has actually confirmed the payment went through.
      // This is the entire point of deferring subscriber creation out of
      // src/routes/signup.js: nobody becomes a subscriber - or shows up
      // in the admin dashboard, or gets any text - without paying first.
      if (!subscriberId && meta.phone && meta.name) {
        const result = db.prepare(`
          INSERT INTO subscribers (
            name, phone, cadence, status, access_type, email, preferred_language, content_preference,
            consent_given_at, next_send_at, stripe_customer_id, stripe_subscription_id, billing_status
          )
          VALUES (?, ?, ?, 'active', 'paid', ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, 'active')
        `).run(
          meta.name,
          meta.phone,
          meta.cadence || 'daily',
          meta.email || null,
          meta.preferredLanguage || 'en',
          meta.contentPreference || 'both',
          session.customer,
          session.subscription
        );
        subscriberId = result.lastInsertRowid;
        isNewSubscriber = true;
        console.log(`[webhook] created subscriber ${subscriberId} (${meta.phone}) after confirmed payment`);
      } else if (subscriberId) {
        db.prepare(`
          UPDATE subscribers
          SET stripe_customer_id = ?, stripe_subscription_id = ?, billing_status = 'active', status = 'active', updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(session.customer, session.subscription, subscriberId);
        console.log(`[webhook] subscriber ${subscriberId} billing activated`);
      }

      if (subscriberId) {
        // Let the subscriber know their payment went through - the success
        // page tells them a text is on its way, so make sure one actually
        // is. Fire-and-forget: never let an SMS hiccup break the webhook.
        const sub = db.prepare('SELECT name, phone, cadence, email, preferred_language FROM subscribers WHERE id = ?').get(subscriberId);
        if (sub) {
          sendSms(sub.phone, buildPurchaseConfirmationMessage(sub.preferred_language))
            .catch(err => console.error('[webhook] purchase confirmation SMS failed:', err.message));

          if (isNewSubscriber) {
            notifyCoachOfNewSubscriber({ name: sub.name, phone: sub.phone, cadence: sub.cadence, email: sub.email }).catch(() => {});
          }
        }
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      const subscriberId = resolveSubscriberId(sub);
      // Map Stripe's status vocabulary onto ours
      const statusMap = {
        active: 'active', trialing: 'trialing', past_due: 'past_due',
        canceled: 'canceled', unpaid: 'past_due', incomplete_expired: 'canceled',
      };
      const billingStatus = statusMap[sub.status] || 'canceled';
      if (subscriberId) {
        db.prepare(`UPDATE subscribers SET billing_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
          .run(billingStatus, subscriberId);
        console.log(`[webhook] subscriber ${subscriberId} billing_status -> ${billingStatus}`);
      }
      break;
    }
    default:
      break; // ignore other event types
  }

  res.json({ received: true });
});

module.exports = { webhookRouter, apiRouter };
