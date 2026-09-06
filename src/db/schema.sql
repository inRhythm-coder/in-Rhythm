-- In Rhythm database schema

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,           -- E.164 format, e.g. +15551234567
  cadence TEXT NOT NULL CHECK (cadence IN ('daily','weekly','biweekly','monthly')),
  status TEXT NOT NULL DEFAULT 'pending_confirmation'
    CHECK (status IN ('pending_confirmation','active','paused','unsubscribed')),

  email TEXT,                          -- optional, collected at signup
  preferred_language TEXT NOT NULL DEFAULT 'en'
    CHECK (preferred_language IN ('en','es')),
  content_preference TEXT NOT NULL DEFAULT 'both'
    CHECK (content_preference IN ('leadership','spiritual','both')),

  -- Access type drives whether they're billed
  access_type TEXT NOT NULL DEFAULT 'paid'
    CHECK (access_type IN ('paid','client','client_tail','comp')),

  -- Client relationship tracking (null if never a client)
  client_engagement_start DATE,
  client_engagement_end DATE,          -- when coaching engagement ended
  free_access_until DATE,              -- engagement_end + 2 months, computed on set

  -- Billing
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  billing_status TEXT DEFAULT 'none'
    CHECK (billing_status IN ('none','trialing','active','past_due','canceled')),

  -- Consent / compliance (TCPA)
  consent_given_at DATETIME,
  consent_ip TEXT,
  opted_out_at DATETIME,

  theme_preferences TEXT,              -- JSON array of preferred themes, optional
  last_sent_message_id INTEGER,
  last_sent_at DATETIME,
  next_send_at DATETIME,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  body TEXT NOT NULL,                  -- the SMS text itself, <=320 chars target
  theme TEXT NOT NULL,                 -- e.g. 'leadership', 'dei', 'resilience', 'faith', 'purpose'
  source TEXT,                         -- e.g. linkedin post id/url this was derived from
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en','es')),
  category TEXT NOT NULL DEFAULT 'leadership' CHECK (category IN ('leadership','spiritual')),
  active INTEGER NOT NULL DEFAULT 1,   -- 1 = eligible to send, 0 = retired/needs review
  approved INTEGER NOT NULL DEFAULT 0, -- Terry has reviewed/approved this message
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER NOT NULL REFERENCES subscribers(id),
  message_id INTEGER NOT NULL REFERENCES messages(id),
  twilio_sid TEXT,
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued','sent','delivered','failed')),
  error TEXT,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Individual, trackable client access codes (as opposed to the single
-- shared CLIENT_ACCESS_CODE env var, which anyone can pass along to anyone
-- else). Each row is one code, generated from the admin dashboard for one
-- named client, good for max_uses signups (1 by default) before it stops
-- working. The legacy shared code in .env keeps working too, for anything
-- already printed/sent out referencing it.
CREATE TABLE IF NOT EXISTS client_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  note TEXT,                            -- e.g. the client's name, for Terry's reference
  max_uses INTEGER NOT NULL DEFAULT 1,
  uses_count INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,    -- manually revoked codes are set to 0
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  used_at DATETIME,
  used_by_subscriber_id INTEGER REFERENCES subscribers(id)
);

-- In Rhythm for Organizations: a company/team buys bulk access, and each
-- employee still opts themselves in individually (via the org's own
-- client_codes-style enrollment code) - required for TCPA consent, and
-- kept deliberately consistent with how individual client codes already
-- work rather than inventing a second mechanism.
--
-- tier drives the default pricing (base fee + included seats + per-seat
-- overage rate) via src/billing/orgPricing.js. 'culture_partner' (1,000+
-- employees) is the one tier that's fully custom/manual - no formula, no
-- Stripe automation - so its fee columns are just whatever was actually
-- negotiated, entered by hand.
--
-- view_token is a separate, longer secret from any enrollment code, so the
-- org's own point of contact can see aggregate seat usage without that
-- same link letting every enrolled employee see how many colleagues have
-- signed up.
CREATE TABLE IF NOT EXISTS organizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('team','organization','enterprise','culture_partner')),

  seat_limit INTEGER NOT NULL,            -- total employees allowed to enroll right now
  included_seats INTEGER NOT NULL,        -- seats covered by the base fee
  base_fee_cents INTEGER,                 -- monthly base fee, in cents (NULL for an as-yet-unpriced custom deal)
  per_seat_cents INTEGER NOT NULL DEFAULT 0, -- overage rate per seat/month, in cents (0 for culture_partner)

  contact_name TEXT,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','canceled')),

  -- Billing is NOT automated for any tier yet (see src/billing/orgPricing.js
  -- header comment for why) - these just track however Terry actually
  -- billed the org (a Stripe Payment Link, a manual invoice, a wire, etc.).
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  billing_notes TEXT,

  contract_start DATE,
  contract_end DATE,

  view_token TEXT UNIQUE,                 -- lets the org's contact see aggregate seat usage, see src/routes/orgView.js

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sends_subscriber ON sends(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_next_send ON subscribers(next_send_at);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
-- Indexes on client_codes.org_id / subscribers.org_id are created in
-- src/db/index.js, AFTER those columns are added by migration - both
-- columns are new additions to tables that already existed before
-- Organizations shipped, so they can't be relied on to exist yet here.
