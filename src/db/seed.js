// Seed the message bank. Drawn from Dr. Terry's actual LinkedIn posts and
// distilled into standalone SMS-length coaching nuggets in his voice.
// Run: npm run seed
//
// NOTE: these are marked approved=1 so the app is functional out of the box.
// Terry should skim messages.csv (exported alongside this) before the first
// real send batch goes out, and can flip `approved` to 0 on any he'd rather
// hold back.

const db = require('./index');

const MESSAGES = [
  // -- leadership / consistency --
  { theme: 'leadership', body: "Before you close out this week: what's one \"I'll follow up\" you haven't closed yet? Close it — even the small one nobody's tracking but you. Your word is the whole brand. — Dr. Terry" },
  { theme: 'leadership', body: "Quick audit: of everything you touched this week, what could someone else have done at 80% of your quality? Pick one. Hand it over fully — not just the easy parts. That's leadership. — Dr. Terry" },
  { theme: 'leadership', body: "If you want the truth from your team, don't wait for the exit interview. Have the real conversation while they still have something at stake. Trust breaks quietly, months before anyone says it out loud. — Dr. Terry" },
  { theme: 'leadership', body: "After any disruption: name what happened, re-anchor what hasn't changed, re-pace deliberately, then re-commit out loud. Most leaders skip straight to step 3. That's why rhythm never fully returns. — Dr. Terry" },
  { theme: 'leadership', body: "Culture isn't built at a weekend retreat. It's built in the Tuesday 2pm meeting where someone pushes back and finds out what actually happens to them. — Dr. Terry" },
  { theme: 'leadership', body: "The instinct that made you an exceptional individual contributor — personal drive, controlling your own outcomes — is the opposite skill leadership requires. Leadership means reconnecting other people to their own results. — Dr. Terry" },
  { theme: 'leadership', body: "Would your team describe your Monday self and your Friday self as the same leader? Trust doesn't break on a bad day. It breaks when the bad day becomes a different leader. — Dr. Terry" },
  { theme: 'leadership', body: "Your leadership brand isn't your title. It's what your team expects from you before you walk into the room: predictable presence, named follow-through, visible consistency. Which one's weakest for you right now? — Dr. Terry" },
  { theme: 'leadership', body: "Same leader, different day — that's the whole job. Consistency isn't about being flawless. It's about being recognizable on the hard days too. — Dr. Terry" },
  { theme: 'leadership', body: "Close what you opened today. Open loops don't just create work — they quietly teach your team what your word is actually worth. — Dr. Terry" },
  { theme: 'leadership', body: "Real leadership often looks like doing less of what you're good at, so someone else gets the chance to get good at it too. — Dr. Terry" },

  // -- self-awareness --
  { theme: 'self_awareness', body: "Pull up last week's real calendar next to your top three stated priorities. Count the hours. The gap you find isn't a time management problem — it's the most honest feedback you'll get all year. — Dr. Terry" },
  { theme: 'self_awareness', body: "Two minutes before you shut your laptop this week: Where did I lead from purpose? Where did I lead from habit? What did my team need that I didn't give? No fix required yet — just pay attention. — Dr. Terry" },
  { theme: 'self_awareness', body: "Notice what you do in the ten seconds after someone proves you wrong in a meeting — not what you say, what you do first. That gap between the sting and your reaction is the whole skill. — Dr. Terry" },
  { theme: 'self_awareness', body: "When did you last change your mind about something important, publicly? Do you know what your top three people need from you right now, or are you guessing? You can't rebuild a culture you haven't reconnected to yourself. — Dr. Terry" },
  { theme: 'self_awareness', body: "Small shift, real impact: stop calling your calendar \"packed.\" Start calling it \"chosen.\" Language shapes ownership — even on the weeks that are genuinely hard. — Dr. Terry" },
  { theme: 'self_awareness', body: "Your calendar isn't lying to you. It's the most honest feedback you'll get all year — more honest than any review, because it shows what you actually chose. — Dr. Terry" },

  // -- team / relational --
  { theme: 'team', body: "Before you log off today: send one person on your team a text that isn't a task or feedback. Just \"glad you're on this team.\" Costs you thirty seconds. That's the whole framework. — Dr. Terry" },
  { theme: 'team', body: "Rebuild trust one conversation at a time. Ask your team: What haven't you told me that I should know? Where did I make your job harder this week? What do you need from me that you're not getting? Then actually listen. — Dr. Terry" },
  { theme: 'team', body: "Trust isn't rebuilt in one conversation. It's rebuilt by asking the real questions enough times that people believe you actually want the real answer. — Dr. Terry" },
  { theme: 'team', body: "Do your standards hold from January to July? Do people bring you problems early, or only once they're unavoidable? Your team's culture is downstream of your own rhythm as a leader. — Dr. Terry" },
  { theme: 'team', body: "Engagement isn't a perks problem. It's a rhythm problem, and rhythm starts at the top. Ask: what has actually changed about how the leaders in the room show up? — Dr. Terry" },

  // -- purpose / meaning --
  { theme: 'purpose', body: "Got everything you wanted and it doesn't feel the way you thought it would? That's not a warning sign — it's an invitation to go back and rebuild what you're actually working toward. — Dr. Terry" },
  { theme: 'purpose', body: "If your job has quietly turned you into \"the one who says no,\" ask: where, specifically, could you still be the person you set out to be — inside the job you already have? — Dr. Terry" },
  { theme: 'purpose', body: "Somewhere between the reports and the meetings, it's easy to become an excellent operator of a cause you no longer feel. Go back to the specific moment you first said yes. Rebuild from there. — Dr. Terry" },
  { theme: 'purpose', body: "Leadership isn't a productivity problem — it's a character problem wearing a productivity costume. Before you fix the calendar, ask what you actually believe about people and power. — Dr. Terry" },

  // -- resilience --
  { theme: 'resilience', body: "People aren't running out of resilience. They're running out of reasons. You don't build endurance by tolerating more disconnection — you build it by reconnecting to why the work matters. — Dr. Terry" },
  { theme: 'resilience', body: "Resilience without reconnection to purpose is just a longer runway to the same crash. Reconnect first. — Dr. Terry" },

  // -- dei --
  { theme: 'dei', body: "You can't train your way into inclusive leadership if the person running the meeting hasn't done their own work first. Your team believes what they watch you do, not what the module says. — Dr. Terry" },

  // -- faith / nonprofit --
  { theme: 'faith', body: "Growth doesn't corrupt calling. It quietly displaces it, one delegated task at a time — until you're managing outcomes instead of caring for the people who drew you in. What has your growth displaced? — Dr. Terry" },
];

const insert = db.prepare(`
  INSERT INTO messages (body, theme, source, active, approved)
  VALUES (@body, @theme, 'linkedin-seed', 1, 1)
`);

const insertMany = db.transaction((rows) => {
  for (const row of rows) insert.run(row);
});

insertMany(MESSAGES);

console.log(`Seeded ${MESSAGES.length} messages into the bank.`);
