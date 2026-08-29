-- In Rhythm database schema

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,           -- E.164 format, e.g. +15551234567
  cadence TEXT NOT NULL CHECK (cadence IN ('daily','weekly','biweekly','monthly')),
  status TEXT NOT NULL DEFAULT 'pending_confirmation'
    CHECK (status IN ('pending_confirmation','active','paused','unsubscribed')),

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

CREATE INDEX IF NOT EXISTS idx_sends_subscriber ON sends(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_next_send ON subscribers(next_send_at);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
