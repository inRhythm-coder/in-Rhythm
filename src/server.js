require('dotenv').config();
const path = require('path');
const express = require('express');
const cron = require('node-cron');
require('./db'); // ensures schema is created on boot
const { autoSeedMessages } = require('./db/autoSeed');
const { runOnce } = require('./scheduler/run');

const signupRouter = require('./routes/signup');
const { webhookRouter, apiRouter: billingApiRouter } = require('./routes/billing');
const adminRouter = require('./routes/admin');

const app = express();

// Load/refresh the message bank on every boot. This is idempotent (it
// skips messages that already exist by exact text), so it's safe to run
// on every deploy - new content added to messageBank.js just shows up.
autoSeedMessages();

// Stripe webhook needs the raw body, so mount it BEFORE express.json()
// swallows the request into parsed JSON.
app.use(webhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(signupRouter);
app.use(billingApiRouter);
app.use(adminRouter);

app.get('/healthz', (req, res) => res.json({ ok: true, app: process.env.APP_NAME || 'In Rhythm' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME || 'In Rhythm'} running on http://localhost:${PORT}`);
});

// --- In-process scheduler ---
// Runs in the SAME process as the web server, so it shares the same
// database file - no separate "worker" service needed, and no risk of the
// scheduler looking at an empty/different database than the one signups
// actually land in. Sweeps once a day; each subscriber's own next_send_at
// (based on their chosen cadence) determines who actually gets texted.
// Railway containers run in UTC by default, so "9am server time" without an
// explicit timezone actually meant ~4am Central - not what anyone wants for
// a daily text. SCHEDULER_TZ pins the cron to a real timezone (defaults to
// Dr. Terry's, America/Chicago); SCHEDULER_CRON overrides the hour if needed.
const SCHEDULE = process.env.SCHEDULER_CRON || '0 8 * * *'; // default: 8am in SCHEDULER_TZ, daily
const SCHEDULE_TZ = process.env.SCHEDULER_TZ || 'America/Chicago';
console.log(`[scheduler] running in-process, sweep cron: "${SCHEDULE}" (${SCHEDULE_TZ})`);
cron.schedule(SCHEDULE, () => {
  console.log(`[scheduler] sweep starting at ${new Date().toISOString()}`);
  runOnce().catch(err => console.error('[scheduler] sweep error:', err));
}, { timezone: SCHEDULE_TZ });
// Also sweep once shortly after boot, so a fresh deploy doesn't wait a full day
setTimeout(() => {
  runOnce().catch(err => console.error('[scheduler] initial sweep error:', err));
}, 10000);
