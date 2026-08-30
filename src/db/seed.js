// Manual/local convenience script: loads the full message bank
// (src/db/messageBank.js — LinkedIn + book content) into the local dev
// database. Idempotent, same as the auto-seed that runs on every server
// boot — safe to run more than once.
//
// Run: npm run seed

const { autoSeedMessages } = require('./autoSeed');

const { added, total } = autoSeedMessages();
console.log(`Done. ${added} new message(s) added, ${total} total in bank.`);
