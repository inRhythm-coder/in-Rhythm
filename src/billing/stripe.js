require('dotenv').config();

let stripeClient = null;
function getStripe() {
  if (stripeClient) return stripeClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY missing from .env');
  stripeClient = require('stripe')(key);
  return stripeClient;
}

/**
 * Creates a Stripe Checkout session for a new paid subscriber.
 * subscriberId is passed through as metadata so the webhook can match the
 * completed session back to the right row in our own database.
 */
async function createCheckoutSession(subscriberId, { name, phone }) {
  const stripe = getStripe();
  const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
  const priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
  if (!priceId) throw new Error('STRIPE_PRICE_ID_MONTHLY missing from .env');

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/signup-success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?canceled=1`,
    metadata: { subscriberId: String(subscriberId), name, phone },
    // Also stamp the subscription itself, so it's identifiable from Stripe's
    // dashboard/webhooks even after the checkout session object ages out.
    subscription_data: {
      metadata: { subscriberId: String(subscriberId) },
    },
  });

  return session; // session.url is what the frontend redirects to
}

module.exports = { getStripe, createCheckoutSession };
