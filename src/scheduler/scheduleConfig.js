require('dotenv').config();

// Single source of truth for the daily sweep's schedule, shared by
// server.js (which actually fires the cron) and run.js (which uses
// SEND_HOUR/SEND_MINUTE to anchor every subscriber's next_send_at to the
// exact moment the sweep runs - see computeNextSendAt() for why that
// matters).
const SCHEDULE = process.env.SCHEDULER_CRON || '0 8 * * *'; // default: 8am in SCHEDULE_TZ, daily
const SCHEDULE_TZ = process.env.SCHEDULER_TZ || 'America/Chicago';

const [minuteField, hourField] = SCHEDULE.split(/\s+/);
const parsedMinute = parseInt(minuteField, 10);
const parsedHour = parseInt(hourField, 10);
// Falls back to 8:00 if SCHEDULER_CRON is ever set to something with a
// wildcard/step hour or minute field (e.g. "*/15 * * * *") that this
// simple parse can't turn into a single fixed clock time.
const SEND_HOUR = Number.isInteger(parsedHour) ? parsedHour : 8;
const SEND_MINUTE = Number.isInteger(parsedMinute) ? parsedMinute : 0;

module.exports = { SCHEDULE, SCHEDULE_TZ, SEND_HOUR, SEND_MINUTE };
