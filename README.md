# In Rhythm

Daily/weekly/bi-weekly/monthly coaching SMS for Dr. Terry Daniels' clients and community.

## What's built

- **Signup page** (`public/index.html`) — name, phone, cadence, optional client access code
- **Database** (SQLite, `data/in-rhythm.db`) — subscribers, message bank, send log
- **Access logic** (`src/db/access.js`) — active clients get free access; when an
  engagement ends, they auto-stay free for 2 months, then flip to paid
- **Content bank** — 30 coaching texts seeded from your actual LinkedIn posts
  (`src/db/seed.js`), tagged by theme, ready to send
- **Scheduler** (`src/scheduler/`) — sends each subscriber a message on their
  chosen cadence, never repeating a message until the bank is exhausted
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
npm run seed                 # loads the 30 starter messages
npm start                    # runs the signup site on http://localhost:3000
npm run scheduler            # separate process: sends texts on schedule
```

## Deploying for real

This needs to run on a real host with normal internet access (this build
sandbox's network is locked down and can't reach Twilio directly — that's
sandbox-only, not a code issue). Recommended: **Railway** or **Render**,
~$20–50/mo total:

1. Push this project to a GitHub repo (private is fine)
2. Create two processes on your host:
   - **web**: `npm start` — serves the signup page
   - **worker**: `npm run scheduler` — sends the scheduled texts, runs
     continuously in the background
3. Set environment variables on the host (never commit `.env`):
   `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` (or
   `TWILIO_MESSAGING_SERVICE_SID`), and later the `STRIPE_*` keys
4. Point your domain (or a subdomain) at the web process

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

30 messages seeded from your LinkedIn posts, across 7 themes. Worth a skim
before the first real send batch — flip `approved` to `0` in the `messages`
table on any you'd rather hold back. Easy to add more over time as you post.
