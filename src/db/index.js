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

module.exports = db;
