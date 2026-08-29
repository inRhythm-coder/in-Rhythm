// Long-running process: checks once a day for subscribers who are due for
// their next text and sends it. Because `next_send_at` is tracked per
// subscriber (and set based on their own cadence), running this sweep once
// a day is enough to correctly serve daily/weekly/biweekly/monthly cadences
// all at once — no separate schedule needed per cadence.
//
// Run with: npm run scheduler   (keep this running as its own process/service
// on whatever host you deploy to — e.g. a Railway/Render "worker" process,
// separate from the web process that runs `npm start`)

require('dotenv').config();
const cron = require('node-cron');
const { runOnce } = require('./run');

const SCHEDULE = process.env.SCHEDULER_CRON || '0 9 * * *'; // default: 9am server time, daily

console.log(`[scheduler] daemon starting, sweep runs on cron "${SCHEDULE}"`);

cron.schedule(SCHEDULE, () => {
  console.log(`[scheduler] sweep starting at ${new Date().toISOString()}`);
  runOnce().catch(err => console.error('[scheduler] sweep error:', err));
});

// Also run once immediately on boot so a fresh deploy doesn't wait a full day
runOnce().catch(err => console.error('[scheduler] initial sweep error:', err));
