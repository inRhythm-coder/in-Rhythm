# In Rhythm

Daily/weekly/bi-weekly/monthly coaching SMS for Dr. Terry Daniels' clients and community.

## What's built

- **Signup page** (`public/index.html`) — name, phone, cadence, optional client access code
- **Database** (SQLite, `data/in-rhythm.db`) — subscribers, message bank, send log
- **Access logic** (`src/db/access.js`) — active clients get free access; when an
  engagement ends, they auto-stay free for 2 months, then flip to paid
- **Content bank** (`src/db/messageBank.js`) — 52 coaching texts: 30 from your
  LinkedIn posts plus 22 distilled from *in-Rhythm: The Key to Purposeful
  Engagement*, tagged by theme and source, ready to send. Auto-loaded on every
  boot (idempotent — safe to redeploy, new content just shows up)
- **Scheduler** (`src/scheduler/`) — runs in the same process as the web
  server (no separate worker needed), sweeps once a day, and sends each
  subscriber a message on their own chosen cadence, never repeating a
  message until the bank is exhausted
- **Twilio integration** (`src/sms/twilio.js`) — sends the texts, plus a
  TCPA-style opt-in confirmation message
- **Stripe integration** (`src/billing/stripe.js`, `src/routes/billing.js`) —
  non-client signups are redirected to Stripe Checkout for a monthly
  subscription; a webhook keeps each subscriber's billing status in sync
  automatically (active / past_due / canceled) so the scheduler knows who's
  still allowed to receive texts

## Stripe setup (one-time)

1. In the Stripe dashboard: **Products** → Add Product (e.g. "In Rhythm
   Monthly," a few dollars/month, recurring). Copy the **Price ID**
   (`price_...`) it generates → this is `STRIPE_PRICE_ID_MONTHLY`
2. **Developers → API keys** → copy the **Secret key** → this is
   `STRIPE_SECRET_KEY`. Start with the **test** key (`sk_test_...`) until
   you've run a signup all the way through; switch to the live key
   (`sk_live_...`) right before you launch for real
3. **Developers → Webhooks** → Add endpoint → URL is
   `https://<your-deployed-domain>/api/stripe-webhook` → select events
   `checkout.session.completed`, `customer.subscription.updated`,
   `customer.subscription.deleted` → copy the **Signing secret**
   (`whsec_...`) → this is `STRIPE_WEBHOOK_SECRET`

All three go into the same environment variables as Twilio's, on whatever
host you deploy to.

## Before you launch: compliance

You're charging money for recurring texts, so get these right:
1. Keep the opt-in consent checkbox/language on the signup page (already there)
2. Make sure STOP/HELP keyword handling is turned on in your Twilio console
   (it usually is by default on a registered number)
3. A quick look from an attorney at the SMS consent language is worth it —
   this is the one spot with real regulatory teeth (TCPA)

## Running it locally

```
npm install
cp .env.example .env        # fill in your Twilio (and later Stripe) keys
npm start                    # runs the signup site AND the scheduler on
                              # http://localhost:3000 - the message bank is
                              # loaded automatically on boot
```

`npm run seed` also works if you just want to load the message bank into a
local dev database without starting the server.

## Deploying for real

This needs to run on a real host with normal internet access. Recommended:
**Railway** or **Render**, ~$20–50/mo total:

1. Push this project to a GitHub repo (private is fine)
2. Create a single web process on your host: `npm start` — this serves the
   signup page AND runs the daily scheduler sweep in the background, in the
   same process. (Earlier drafts of this README described a separate
   "worker" process for the scheduler — that's no longer needed. Running it
   as a second process would give it its own empty database and it would
   never see any signups, so don't split it out.)
3. Set environment variables on the host (never commit `.env`):
   `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` (or
   `TWILIO_MESSAGING_SERVICE_SID`), and later the `STRIPE_*` keys
4. Point your domain (or a subdomain) at the web process
5. **Attach a persistent volume to the `data/` directory.** Without one, the
   SQLite database (all your real subscribers!) gets wiped every time you
   redeploy. On Railway: your service → **Settings → Volumes** → add a
   volume mounted at `/app/data`. Do this before any real (non-test)
   signups come in.

## Marking someone a client (free access)

Right now this is a simple shared access code on the signup form
(`CLIENT_ACCESS_CODE` in `.env`, defaults to `CLIENT2026` — change it).
Anyone signing up with the right code gets `access_type = 'client'`.

When a coaching engagement ends, call:
```js
const { endEngagement } = require('./src/db/access');
endEngagement(subscriberId, '2026-09-30'); // engagement end date
```
This auto-computes their 2-month free tail and flips them to billed status
automatically after it expires (handled by the daily scheduler sweep).

For anything beyond a handful of clients, replacing the shared code with a
small admin page (or a CSV import from your CRM) is the natural next step —
happy to build that next.

## Content bank

52 messages: 30 from your LinkedIn posts, plus 22 distilled from
*in-Rhythm: The Key to Purposeful Engagement*, across a mix of leadership,
self-awareness, team, purpose, resilience, DEI, faith, and book-specific
themes. Worth a skim before the first real send batch — flip `approved` to
`0` in the `messages` table on any you'd rather hold back. New content
added to `src/db/messageBank.js` is picked up automatically on the next
deploy — nothing to duplicate.
