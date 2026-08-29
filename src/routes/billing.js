const express = require('express');
const db = require('../db');
const { createCheckoutSession, getStripe } = require('../billing/stripe');

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

    const session = await createCheckoutSession(sub.id, { name: sub.name, phone: sub.phone });
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

  const findSubscriberId = (obj) => obj?.metadata?.subscriberId;

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const subscriberId = findSubscriberId(session);
      if (subscriberId) {
        db.prepare(`
          UPDATE subscribers
          SET stripe_customer_id = ?, stripe_subscription_id = ?, billing_status = 'active', updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(session.customer, session.subscription, subscriberId);
        console.log(`[webhook] subscriber ${subscriberId} billing activated`);
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      const subscriberId = findSubscriberId(sub);
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
