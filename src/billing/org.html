// In Rhythm for Organizations - confirmed pricing/scaling model.
//
// Every self-serve tier (team / organization / enterprise) is a flat base
// fee that includes a set number of seats, plus a per-seat rate for any
// seat beyond that. This is exactly what a Stripe "graduated pricing" Price
// (a base flat_amount plus a per-unit rate for units past a threshold)
// represents - it's not wired up to Stripe yet (see the note below), but
// the numbers here are the same numbers that price would use once it is.
//
// culture_partner (1,000+ employees) is deliberately NOT a formula. It's a
// relationship-based agreement Terry negotiates by hand - custom content,
// executive briefings, a dedicated success manager, etc. can all be part of
// it - so baseFeeCents/perSeatCents are null here on purpose. Organizations
// created at this tier take whatever fee was actually agreed to, typed in
// directly rather than computed.
//
// NOTE on Stripe automation: this v1 build tracks organizations, seats, and
// enrollment the same way individual client_codes already work, and gives
// Terry a clear monthly-cost number for every org - but it does NOT create
// or charge a live Stripe subscription for an org automatically. With zero
// organization customers signed yet, building metered/graduated Stripe
// billing now would be speculative engineering for a billing shape that
// hasn't been used in practice - a Stripe Payment Link or manual invoice at
// the computed monthlyCostCents() figure gets the first organizations
// billed correctly today. stripe_customer_id/stripe_subscription_id columns
// already exist on the organizations table so this can be automated later
// without a schema change, once there's a real contract to model it against.

const ORG_TIERS = {
  team: {
    label: 'Team',
    minSeats: 25,
    maxSeats: 99,
    includedSeats: 25,
    baseFeeCents: 14900,   // $149.00/month
    perSeatCents: 300,     // $3.00/seat/month beyond the first 25
  },
  organization: {
    label: 'Organization',
    minSeats: 100,
    maxSeats: 499,
    includedSeats: 100,
    baseFeeCents: 39900,   // $399.00/month
    perSeatCents: 120,     // $1.20/seat/month beyond the first 100
  },
  enterprise: {
    label: 'Enterprise',
    minSeats: 500,
    maxSeats: 999,
    includedSeats: 500,
    baseFeeCents: 125000,  // $1,250.00/month
    perSeatCents: 90,      // $0.90/seat/month beyond the first 500
  },
  culture_partner: {
    label: 'Culture Partner',
    minSeats: 1000,
    maxSeats: null,
    includedSeats: null,
    baseFeeCents: null,    // custom - negotiated per organization, ~$25,000/year starting point
    perSeatCents: null,
  },
};

const TIER_ORDER = ['team', 'organization', 'enterprise', 'culture_partner'];

function tierForSeatCount(seatCount) {
  if (seatCount >= 1000) return 'culture_partner';
  if (seatCount >= 500) return 'enterprise';
  if (seatCount >= 100) return 'organization';
  if (seatCount >= 25) return 'team';
  return null; // below 25, Individual applies - no organization needed
}

// Monthly cost in cents for a given tier at a given seat count. Returns
// null for culture_partner (or any tier missing a base fee) - there's no
// formula, so the caller should show/enter the negotiated fee instead.
function monthlyCostCents(tier, seatCount) {
  const t = ORG_TIERS[tier];
  if (!t || t.baseFeeCents == null) return null;
  const overageSeats = Math.max(0, seatCount - t.includedSeats);
  return t.baseFeeCents + overageSeats * t.perSeatCents;
}

function formatCents(cents) {
  if (cents == null) return 'Custom';
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

module.exports = { ORG_TIERS, TIER_ORDER, tierForSeatCount, monthlyCostCents, formatCents };
