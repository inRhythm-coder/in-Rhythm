// Shared message bank: source of truth for both the manual `npm run seed`
// script and the auto-seed that runs on every server boot (see autoSeed.js).
// Add new messages here over time - autoSeed picks up anything new on the
// next deploy automatically, no manual re-seed step required.

const LINKEDIN_MESSAGES = [
  // -- leadership / consistency --
  { theme: 'leadership', source: 'linkedin', body: "Before you close out this week: what's one \"I'll follow up\" you haven't closed yet? Close it — even the small one nobody's tracking but you. Your word is the whole brand. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Quick audit: of everything you touched this week, what could someone else have done at 80% of your quality? Pick one. Hand it over fully — not just the easy parts. That's leadership. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "If you want the truth from your team, don't wait for the exit interview. Have the real conversation while they still have something at stake. Trust breaks quietly, months before anyone says it out loud. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "After any disruption: name what happened, re-anchor what hasn't changed, re-pace deliberately, then re-commit out loud. Most leaders skip straight to step 3. That's why rhythm never fully returns. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Culture isn't built at a weekend retreat. It's built in the Tuesday 2pm meeting where someone pushes back and finds out what actually happens to them. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "The instinct that made you an exceptional individual contributor — personal drive, controlling your own outcomes — is the opposite skill leadership requires. Leadership means reconnecting other people to their own results. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Would your team describe your Monday self and your Friday self as the same leader? Trust doesn't break on a bad day. It breaks when the bad day becomes a different leader. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Your leadership brand isn't your title. It's what your team expects from you before you walk into the room: predictable presence, named follow-through, visible consistency. Which one's weakest for you right now? — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Same leader, different day — that's the whole job. Consistency isn't about being flawless. It's about being recognizable on the hard days too. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Close what you opened today. Open loops don't just create work — they quietly teach your team what your word is actually worth. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', body: "Real leadership often looks like doing less of what you're good at, so someone else gets the chance to get good at it too. — Dr. Terry" },

  // -- self-awareness --
  { theme: 'self_awareness', source: 'linkedin', body: "Pull up last week's real calendar next to your top three stated priorities. Count the hours. The gap you find isn't a time management problem — it's the most honest feedback you'll get all year. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', body: "Two minutes before you shut your laptop this week: Where did I lead from purpose? Where did I lead from habit? What did my team need that I didn't give? No fix required yet — just pay attention. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', body: "Notice what you do in the ten seconds after someone proves you wrong in a meeting — not what you say, what you do first. That gap between the sting and your reaction is the whole skill. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', body: "When did you last change your mind about something important, publicly? Do you know what your top three people need from you right now, or are you guessing? You can't rebuild a culture you haven't reconnected to yourself. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', body: "Small shift, real impact: stop calling your calendar \"packed.\" Start calling it \"chosen.\" Language shapes ownership — even on the weeks that are genuinely hard. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', body: "Your calendar isn't lying to you. It's the most honest feedback you'll get all year — more honest than any review, because it shows what you actually chose. — Dr. Terry" },

  // -- team / relational --
  { theme: 'team', source: 'linkedin', body: "Before you log off today: send one person on your team a text that isn't a task or feedback. Just \"glad you're on this team.\" Costs you thirty seconds. That's the whole framework. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', body: "Rebuild trust one conversation at a time. Ask your team: What haven't you told me that I should know? Where did I make your job harder this week? What do you need from me that you're not getting? Then actually listen. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', body: "Trust isn't rebuilt in one conversation. It's rebuilt by asking the real questions enough times that people believe you actually want the real answer. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', body: "Do your standards hold from January to July? Do people bring you problems early, or only once they're unavoidable? Your team's culture is downstream of your own rhythm as a leader. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', body: "Engagement isn't a perks problem. It's a rhythm problem, and rhythm starts at the top. Ask: what has actually changed about how the leaders in the room show up? — Dr. Terry" },

  // -- purpose / meaning --
  { theme: 'purpose', source: 'linkedin', body: "Got everything you wanted and it doesn't feel the way you thought it would? That's not a warning sign — it's an invitation to go back and rebuild what you're actually working toward. — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', body: "If your job has quietly turned you into \"the one who says no,\" ask: where, specifically, could you still be the person you set out to be — inside the job you already have? — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', body: "Somewhere between the reports and the meetings, it's easy to become an excellent operator of a cause you no longer feel. Go back to the specific moment you first said yes. Rebuild from there. — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', body: "Leadership isn't a productivity problem — it's a character problem wearing a productivity costume. Before you fix the calendar, ask what you actually believe about people and power. — Dr. Terry" },

  // -- resilience --
  { theme: 'resilience', source: 'linkedin', body: "People aren't running out of resilience. They're running out of reasons. You don't build endurance by tolerating more disconnection — you build it by reconnecting to why the work matters. — Dr. Terry" },
  { theme: 'resilience', source: 'linkedin', body: "Resilience without reconnection to purpose is just a longer runway to the same crash. Reconnect first. — Dr. Terry" },

  // -- dei --
  { theme: 'dei', source: 'linkedin', body: "You can't train your way into inclusive leadership if the person running the meeting hasn't done their own work first. Your team believes what they watch you do, not what the module says. — Dr. Terry" },

  // -- faith / nonprofit --
  { theme: 'faith', source: 'linkedin', body: "Growth doesn't corrupt calling. It quietly displaces it, one delegated task at a time — until you're managing outcomes instead of caring for the people who drew you in. What has your growth displaced? — Dr. Terry" },
];

// Distilled from Terry's book, "in-Rhythm: The Key to Purposeful Engagement"
// (2025) - the "Eight Keys" chapter, the conclusion, and the organizational
// rhythm chapter.
const BOOK_MESSAGES = [
  // -- the Eight Keys, one message each --
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "Before your next conversation, try this: listen for someone's tone and pace, not just their words. That's the first step to rapport — tuning in, not just hearing. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "You don't build trust by talking louder. You build it by matching the rhythm of the person in front of you — adapt your style before you ask them to adapt to yours. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "Empathy isn't a soft skill you add on top of leadership. It's the beat underneath it — the thing that turns a conversation into real engagement. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "Great leaders know when to lead a conversation and when to follow it. That timing — not volume, not control — is what keeps an exchange in rhythm. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "Silence isn't a gap to fill. It's part of the music — space for reflection, and sometimes the most honest thing in the room. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "Your words can say one thing while your body says another. Real rhythm means your tone, your posture, and your words are all playing the same song. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "Flow in a conversation isn't an accident. It's built — one intentional, consistent choice at a time — until people trust where you're taking them. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', body: "The real test of a conversation isn't how good it felt. It's whether it turned into clarity, alignment, and something that actually moved forward. — Dr. Terry, in-Rhythm" },

  // -- organizational rhythm (chapter 13) --
  { theme: 'book_org', source: 'in-rhythm-book', body: "Your organization has a rhythm whether you're managing it or not. The only question is whether you're setting the tempo — or reacting to whoever else is. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', body: "A leader who's always micromanaging turns a smooth process into a bumpy one — like someone hitting pause on the dance floor every few seconds. Let people move. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', body: "When priorities shift constantly and no one knows the plan, it's not a communication problem. It's a rhythm problem. Give your team the sheet music. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', body: "A steady rhythm doesn't mean nothing changes. It means people know the beat well enough to trust it, even when the song shifts. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', body: "Sustainable leadership isn't about intensity all the time. A good rhythm includes rest — moments to pause and recharge before the next push. — Dr. Terry, in-Rhythm" },

  // -- conclusion / general voice --
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "The best leaders don't dominate a room into agreement. They read it — sensing when to push, when to pause, and when to simply listen. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "Leadership isn't a rigid pace you set once. It's discovering the distinct rhythms already in your team — and orchestrating them into something that moves as one. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "Misunderstandings rarely come from bad intentions. They come from being out of rhythm — talking past each other instead of with each other. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "The people who connect with you best aren't the most polished talkers. They're the ones who match your energy and pace — and make you feel understood. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "Trust is the beat that keeps a team moving even when things get hard. Without it, no strategy holds together for long. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "A rhythm-driven leader doesn't micromanage. They build an environment safe enough for people to take risks, speak up, and actually contribute. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', body: "Consistency isn't about being the same every day. It's about being recognizable — your team should know what to expect from you, even on the hard days. — Dr. Terry, in-Rhythm" },

  // -- faith --
  { theme: 'book_faith', source: 'in-rhythm-book', body: "Even Jesus led a wildly diverse team — fishermen, tax collectors, zealots — and brought them into rhythm not by control, but by example, patience, and clear purpose. — Dr. Terry, in-Rhythm" },
  { theme: 'book_faith', source: 'in-rhythm-book', body: "\"Make every effort to keep the unity of the Spirit\" (Eph. 4:3). Leadership at its best is exactly that — effort, not accident, toward unity. — Dr. Terry, in-Rhythm" },
];

// Occasional, low-key invitations to learn more about 1:1 coaching. Mixed
// sparingly into the normal rotation (same random pick as everything else)
// rather than attached to every message, so it reads as a natural text
// rather than an ad.
const INVITE_MESSAGES = [
  { theme: 'invite', source: 'invite', body: "Curious what working with me looks like beyond these texts? I take on a limited number of coaching clients each year. Reply here or email tdaniels@focalpointcoaching.com if you'd like to talk. — Dr. Terry" },
  { theme: 'invite', source: 'invite', body: "These texts are just a taste of the work. If you're facing something bigger right now — a team, a transition, a decision — I do that work directly with leaders. Email me anytime: tdaniels@focalpointcoaching.com. — Dr. Terry" },
  { theme: 'invite', source: 'invite', body: "Most of what I send here comes from real coaching conversations. If you'd ever like to have one of your own, just reply or reach me at tdaniels@focalpointcoaching.com. — Dr. Terry" },
];

const MESSAGES = [...LINKEDIN_MESSAGES, ...BOOK_MESSAGES, ...INVITE_MESSAGES];

module.exports = { MESSAGES, LINKEDIN_MESSAGES, BOOK_MESSAGES, INVITE_MESSAGES };
