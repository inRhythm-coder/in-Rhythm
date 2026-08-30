const db = require('./index');
const { MESSAGES } = require('./messageBank');

// Idempotent: only inserts messages whose exact body text doesn't already
// exist in the messages table. Safe to call on every boot/deploy - new
// content added to messageBank.js just shows up, nothing is duplicated.
function autoSeedMessages() {
  const existing = db.prepare('SELECT body FROM messages').all();
  const existingBodies = new Set(existing.map(row => row.body));

  const insert = db.prepare(`
    INSERT INTO messages (body, theme, source, language, category, active, approved)
    VALUES (@body, @theme, @source, @language, @category, 1, 1)
  `);

  let added = 0;
  const insertMany = db.transaction((messages) => {
    for (const msg of messages) {
      if (existingBodies.has(msg.body)) continue;
      insert.run(msg);
      existingBodies.add(msg.body);
      added++;
    }
  });

  insertMany(MESSAGES);

  console.log(`[autoSeed] message bank checked: ${added} new message(s) added, ${MESSAGES.length} total in bank`);
  return { added, total: MESSAGES.length };
}

module.exports = { autoSeedMessages };
