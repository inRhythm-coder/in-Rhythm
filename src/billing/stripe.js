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
 * Creates a Stripe Checkout session for a paid subscriber.
 *
 * Deliberately does NOT require a subscriberId. For brand-new signups
 * there is no subscriber row yet - by design (see src/routes/signup.js):
 * we don't want anyone showing up as a subscriber, getting a welcome text,
 * or reaching your admin dashboard until Stripe actually confirms they
 * paid. So every piece of info needed to create their subscriber record
 * later travels along as Checkout Session metadata, keyed by phone number
 * (the one thing guaranteed unique and known before payment). The webhook
 * (src/routes/billing.js, checkout.session.completed) reads it back out
 * and creates the row at that point - not before.
 *
 * subscriberId is still accepted (and preferred when present) for the one
 * legacy/secondary path that already has a row to attach to - e.g. someone
 * resending a checkout link to an existing pending subscriber.
 */
async function createCheckoutSession({ subscriberId, name, phone, cadence, email, preferredLanguage, contentPreference }) {
  const stripe = getStripe();
  const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
  const priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
  if (!priceId) throw new Error('STRIPE_PRICE_ID_MONTHLY missing from .env');

  const metadata = { phone, name: name || '' };
  if (subscriberId) metadata.subscriberId = String(subscriberId);
  if (cadence) metadata.cadence = cadence;
  if (email) metadata.email = email;
  if (preferredLanguage) metadata.preferredLanguage = preferredLanguage;
  if (contentPreference) metadata.contentPreference = contentPreference;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/signup-success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?canceled=1`,
    metadata,
    // Also stamp the subscription itself, so it's identifiable from Stripe's
    // dashboard/webhooks even after the checkout session object ages out.
    // Phone is what lets later subscription-level webhooks (renewal,
    // cancellation) find the right subscriber even when there was no
    // subscriberId yet at the moment checkout started.
    subscription_data: {
      metadata: subscriberId ? { subscriberId: String(subscriberId), phone } : { phone },
    },
  });

  return session; // session.url is what the frontend redirects to
}

module.exports = { getStripe, createCheckoutSession };
