const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'in-rhythm.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// Lightweight migrations: schema.sql only runs CREATE TABLE IF NOT EXISTS,
// so a table that already existed before a column was added to schema.sql
// won't pick it up automatically. Add any newly-introduced columns here,
// guarded so this is safe to run on every boot.
function columnExists(table, column) {
  return db.prepare(`PRAGMA table_info(${table})`).all().some(c => c.name === column);
}
function addColumnIfMissing(table, column, definition) {
  if (!columnExists(table, column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    console.log(`[migrate] added ${table}.${column}`);
  }
}
addColumnIfMissing('subscribers', 'email', 'TEXT');
addColumnIfMissing('subscribers', 'preferred_language', "TEXT NOT NULL DEFAULT 'en'");
addColumnIfMissing('subscribers', 'content_preference', "TEXT NOT NULL DEFAULT 'both'");
addColumnIfMissing('subscribers', 'welcome_catchup_sent_at', 'DATETIME');
addColumnIfMissing('messages', 'language', "TEXT NOT NULL DEFAULT 'en'");
addColumnIfMissing('messages', 'category', "TEXT NOT NULL DEFAULT 'leadership'");

// One-time-per-boot cleanup: the daily scheduler sweep (src/server.js) only
// fires ONCE a day, at a fixed hour. If a subscriber's next_send_at ever
// carries a different time-of-day (e.g. 9:05am when the sweep runs at
// 8:00am - which happened whenever the "sweep shortly after boot" fired at
// an odd time during a deploy, or from an early version of this code that
// didn't anchor the time at all), that day's sweep sees "not due yet" and
// skips them until the FOLLOWING day's sweep - a full ~24 hours late, every
// cycle, indefinitely. This re-anchors every existing next_send_at to the
// scheduler's actual hour/minute (same calendar date, just the correct
// clock time), so it lines up with the sweep from here on. Safe to run on
// every boot - it's a no-op once everything is already aligned.
function normalizeNextSendTimes() {
  const { SCHEDULE_TZ, SEND_HOUR, SEND_MINUTE } = require('../scheduler/scheduleConfig');
  const { zonedParts, zonedTimeToUtc } = require('../scheduler/tz');

  const rows = db.prepare(`SELECT id, next_send_at FROM subscribers WHERE next_send_at IS NOT NULL`).all();
  const update = db.prepare(`UPDATE subscribers SET next_send_at = ? WHERE id = ?`);
  let fixed = 0;
  for (const row of rows) {
    const raw = row.next_send_at.includes('T') ? row.next_send_at : row.next_send_at.replace(' ', 'T') + 'Z';
    const current = new Date(raw);
    if (isNaN(current.getTime())) continue;

    const parts = zonedParts(current, SCHEDULE_TZ);
    if (parts.hour === SEND_HOUR && parts.minute === SEND_MINUTE) continue; // already anchored

    const corrected = zonedTimeToUtc(parts.year, parts.month, parts.day, SEND_HOUR, SEND_MINUTE, SCHEDULE_TZ).toISOString();
    update.run(corrected, row.id);
    fixed++;
  }
  if (fixed) console.log(`[migrate] re-anchored next_send_at time-of-day for ${fixed} subscriber(s)`);
}
normalizeNextSendTimes();

module.exports = db;
