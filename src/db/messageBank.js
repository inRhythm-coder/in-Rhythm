// Shared message bank: source of truth for both the manual `npm run seed`
// script and the auto-seed that runs on every server boot (see autoSeed.js).
// Add new messages here over time - autoSeed picks up anything new on the
// next deploy automatically, no manual re-seed step required.
//
// Every message has a `language` ('en' or 'es'). The scheduler picks from
// whichever language pool matches a subscriber's preferred_language, so
// keep the English and Spanish banks in sync (same themes/count) when you
// add new content.

const LINKEDIN_MESSAGES = [
  // -- leadership / consistency --
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Before you close out this week: what's one \"I'll follow up\" you haven't closed yet? Close it — even the small one nobody's tracking but you. Your word is the whole brand. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Quick audit: of everything you touched this week, what could someone else have done at 80% of your quality? Pick one. Hand it over fully — not just the easy parts. That's leadership. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "If you want the truth from your team, don't wait for the exit interview. Have the real conversation while they still have something at stake. Trust breaks quietly, months before anyone says it out loud. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "After any disruption: name what happened, re-anchor what hasn't changed, re-pace deliberately, then re-commit out loud. Most leaders skip straight to step 3. That's why rhythm never fully returns. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Culture isn't built at a weekend retreat. It's built in the Tuesday 2pm meeting where someone pushes back and finds out what actually happens to them. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "The instinct that made you an exceptional individual contributor — personal drive, controlling your own outcomes — is the opposite skill leadership requires. Leadership means reconnecting other people to their own results. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Would your team describe your Monday self and your Friday self as the same leader? Trust doesn't break on a bad day. It breaks when the bad day becomes a different leader. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Your leadership brand isn't your title. It's what your team expects from you before you walk into the room: predictable presence, named follow-through, visible consistency. Which one's weakest for you right now? — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Same leader, different day — that's the whole job. Consistency isn't about being flawless. It's about being recognizable on the hard days too. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Close what you opened today. Open loops don't just create work — they quietly teach your team what your word is actually worth. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'en', body: "Real leadership often looks like doing less of what you're good at, so someone else gets the chance to get good at it too. — Dr. Terry" },

  // -- self-awareness --
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'en', body: "Pull up last week's real calendar next to your top three stated priorities. Count the hours. The gap you find isn't a time management problem — it's the most honest feedback you'll get all year. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'en', body: "Two minutes before you shut your laptop this week: Where did I lead from purpose? Where did I lead from habit? What did my team need that I didn't give? No fix required yet — just pay attention. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'en', body: "Notice what you do in the ten seconds after someone proves you wrong in a meeting — not what you say, what you do first. That gap between the sting and your reaction is the whole skill. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'en', body: "When did you last change your mind about something important, publicly? Do you know what your top three people need from you right now, or are you guessing? You can't rebuild a culture you haven't reconnected to yourself. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'en', body: "Small shift, real impact: stop calling your calendar \"packed.\" Start calling it \"chosen.\" Language shapes ownership — even on the weeks that are genuinely hard. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'en', body: "Your calendar isn't lying to you. It's the most honest feedback you'll get all year — more honest than any review, because it shows what you actually chose. — Dr. Terry" },

  // -- team / relational --
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'en', body: "Before you log off today: send one person on your team a text that isn't a task or feedback. Just \"glad you're on this team.\" Costs you thirty seconds. That's the whole framework. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'en', body: "Rebuild trust one conversation at a time. Ask your team: What haven't you told me that I should know? Where did I make your job harder this week? What do you need from me that you're not getting? Then actually listen. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'en', body: "Trust isn't rebuilt in one conversation. It's rebuilt by asking the real questions enough times that people believe you actually want the real answer. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'en', body: "Do your standards hold from January to July? Do people bring you problems early, or only once they're unavoidable? Your team's culture is downstream of your own rhythm as a leader. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'en', body: "Engagement isn't a perks problem. It's a rhythm problem, and rhythm starts at the top. Ask: what has actually changed about how the leaders in the room show up? — Dr. Terry" },

  // -- purpose / meaning --
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'en', body: "Got everything you wanted and it doesn't feel the way you thought it would? That's not a warning sign — it's an invitation to go back and rebuild what you're actually working toward. — Dr. Terry" },
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'en', body: "If your job has quietly turned you into \"the one who says no,\" ask: where, specifically, could you still be the person you set out to be — inside the job you already have? — Dr. Terry" },
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'en', body: "Somewhere between the reports and the meetings, it's easy to become an excellent operator of a cause you no longer feel. Go back to the specific moment you first said yes. Rebuild from there. — Dr. Terry" },
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'en', body: "Leadership isn't a productivity problem — it's a character problem wearing a productivity costume. Before you fix the calendar, ask what you actually believe about people and power. — Dr. Terry" },

  // -- resilience --
  { theme: 'resilience', category: 'leadership', source: 'linkedin', language: 'en', body: "People aren't running out of resilience. They're running out of reasons. You don't build endurance by tolerating more disconnection — you build it by reconnecting to why the work matters. — Dr. Terry" },
  { theme: 'resilience', category: 'leadership', source: 'linkedin', language: 'en', body: "Resilience without reconnection to purpose is just a longer runway to the same crash. Reconnect first. — Dr. Terry" },

  // -- dei --
  { theme: 'dei', category: 'leadership', source: 'linkedin', language: 'en', body: "You can't train your way into inclusive leadership if the person running the meeting hasn't done their own work first. Your team believes what they watch you do, not what the module says. — Dr. Terry" },

  // -- faith / nonprofit --
  { theme: 'faith', category: 'spiritual', source: 'linkedin', language: 'en', body: "Growth doesn't corrupt calling. It quietly displaces it, one delegated task at a time — until you're managing outcomes instead of caring for the people who drew you in. What has your growth displaced? — Dr. Terry" },
];

// Distilled from Terry's book, "in-Rhythm: The Key to Purposeful Engagement"
// (2025) - the "Eight Keys" chapter, the conclusion, and the organizational
// rhythm chapter.
const BOOK_MESSAGES = [
  // -- the Eight Keys, one message each --
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Before your next conversation, try this: listen for someone's tone and pace, not just their words. That's the first step to rapport — tuning in, not just hearing. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "You don't build trust by talking louder. You build it by matching the rhythm of the person in front of you — adapt your style before you ask them to adapt to yours. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Empathy isn't a soft skill you add on top of leadership. It's the beat underneath it — the thing that turns a conversation into real engagement. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Great leaders know when to lead a conversation and when to follow it. That timing — not volume, not control — is what keeps an exchange in rhythm. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Silence isn't a gap to fill. It's part of the music — space for reflection, and sometimes the most honest thing in the room. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Your words can say one thing while your body says another. Real rhythm means your tone, your posture, and your words are all playing the same song. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Flow in a conversation isn't an accident. It's built — one intentional, consistent choice at a time — until people trust where you're taking them. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "The real test of a conversation isn't how good it felt. It's whether it turned into clarity, alignment, and something that actually moved forward. — Dr. Terry, in-Rhythm" },

  // -- organizational rhythm (chapter 13) --
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Your organization has a rhythm whether you're managing it or not. The only question is whether you're setting the tempo — or reacting to whoever else is. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "A leader who's always micromanaging turns a smooth process into a bumpy one — like someone hitting pause on the dance floor every few seconds. Let people move. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "When priorities shift constantly and no one knows the plan, it's not a communication problem. It's a rhythm problem. Give your team the sheet music. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "A steady rhythm doesn't mean nothing changes. It means people know the beat well enough to trust it, even when the song shifts. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Sustainable leadership isn't about intensity all the time. A good rhythm includes rest — moments to pause and recharge before the next push. — Dr. Terry, in-Rhythm" },

  // -- conclusion / general voice --
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "The best leaders don't dominate a room into agreement. They read it — sensing when to push, when to pause, and when to simply listen. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Leadership isn't a rigid pace you set once. It's discovering the distinct rhythms already in your team — and orchestrating them into something that moves as one. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Misunderstandings rarely come from bad intentions. They come from being out of rhythm — talking past each other instead of with each other. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "The people who connect with you best aren't the most polished talkers. They're the ones who match your energy and pace — and make you feel understood. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Trust is the beat that keeps a team moving even when things get hard. Without it, no strategy holds together for long. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "A rhythm-driven leader doesn't micromanage. They build an environment safe enough for people to take risks, speak up, and actually contribute. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'en', body: "Consistency isn't about being the same every day. It's about being recognizable — your team should know what to expect from you, even on the hard days. — Dr. Terry, in-Rhythm" },

  // -- faith --
  { theme: 'book_faith', category: 'spiritual', source: 'in-rhythm-book', language: 'en', body: "Even Jesus led a wildly diverse team — fishermen, tax collectors, zealots — and brought them into rhythm not by control, but by example, patience, and clear purpose. — Dr. Terry, in-Rhythm" },
  { theme: 'book_faith', category: 'spiritual', source: 'in-rhythm-book', language: 'en', body: "\"Make every effort to keep the unity of the Spirit\" (Eph. 4:3). Leadership at its best is exactly that — effort, not accident, toward unity. — Dr. Terry, in-Rhythm" },
];

// Occasional, low-key invitations to learn more about 1:1 coaching. Mixed
// sparingly into the normal rotation (same random pick as everything else)
// rather than attached to every message, so it reads as a natural text
// rather than an ad.
const INVITE_MESSAGES = [
  { theme: 'invite', category: 'leadership', source: 'invite', language: 'en', body: "Curious what working with me looks like beyond these texts? I take on a limited number of coaching clients each year. Reply here or email tdaniels@focalpointcoaching.com if you'd like to talk. — Dr. Terry" },
  { theme: 'invite', category: 'leadership', source: 'invite', language: 'en', body: "These texts are just a taste of the work. If you're facing something bigger right now — a team, a transition, a decision — I do that work directly with leaders. Email me anytime: tdaniels@focalpointcoaching.com. — Dr. Terry" },
  { theme: 'invite', category: 'leadership', source: 'invite', language: 'en', body: "Most of what I send here comes from real coaching conversations. If you'd ever like to have one of your own, just reply or reach me at tdaniels@focalpointcoaching.com. — Dr. Terry" },
];

// Spanish translations of the full bank above (same themes, same order, same
// count) so the scheduler always has a matching pool for subscribers who
// choose Spanish as their preferred language.
const LINKEDIN_MESSAGES_ES = [
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Antes de cerrar la semana: ¿cuál es ese \"te voy a dar seguimiento\" que aún no has cerrado? Ciérralo, aunque sea el pequeño que nadie más está siguiendo salvo tú. Tu palabra es toda tu marca. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Auditoría rápida: de todo lo que hiciste esta semana, ¿qué podría haber hecho otra persona al 80% de tu calidad? Elige uno. Entrégalo por completo, no solo las partes fáciles. Eso es liderazgo. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Si quieres la verdad de tu equipo, no esperes a la entrevista de salida. Ten la conversación real mientras todavía tienen algo en juego. La confianza se rompe en silencio, meses antes de que alguien lo diga en voz alta. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Después de cualquier disrupción: nombra lo que pasó, reafirma lo que no ha cambiado, retoma el ritmo con intención, y vuelve a comprometerte en voz alta. La mayoría de los líderes se saltan directo al paso 3. Por eso el ritmo nunca regresa del todo. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "La cultura no se construye en un retiro de fin de semana. Se construye en la reunión del martes a las 2pm, donde alguien te contradice y descubre qué pasa de verdad. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "El instinto que te hizo un colaborador excepcional — impulso personal, controlar tus propios resultados — es la habilidad opuesta a lo que exige el liderazgo. Liderar significa reconectar a otras personas con sus propios resultados. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "¿Describiría tu equipo a tu \"yo\" del lunes igual que a tu \"yo\" del viernes? La confianza no se rompe en un mal día. Se rompe cuando el mal día se convierte en un líder distinto. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Tu marca de liderazgo no es tu título. Es lo que tu equipo espera de ti antes de entrar al salón: presencia predecible, seguimiento con nombre propio, consistencia visible. ¿Cuál de esas es tu punto más débil ahora mismo? — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Mismo líder, día diferente — ese es todo el trabajo. Consistencia no significa ser perfecto. Significa ser reconocible también en los días difíciles. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "Cierra lo que abriste hoy. Los pendientes sin cerrar no solo generan más trabajo — le enseñan a tu equipo, en silencio, cuánto vale realmente tu palabra. — Dr. Terry" },
  { theme: 'leadership', category: 'leadership', source: 'linkedin', language: 'es', body: "El liderazgo real muchas veces se ve como hacer menos de lo que se te da bien, para que alguien más tenga la oportunidad de volverse bueno en eso también. — Dr. Terry" },

  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'es', body: "Abre tu calendario real de la semana pasada junto a tus tres prioridades declaradas. Cuenta las horas. La brecha que encuentres no es un problema de manejo del tiempo — es la retroalimentación más honesta que recibirás en todo el año. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'es', body: "Dos minutos antes de cerrar tu laptop esta semana: ¿Dónde lideré desde el propósito? ¿Dónde lideré desde el hábito? ¿Qué necesitaba mi equipo que no le di? No hace falta arreglarlo todavía — solo presta atención. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'es', body: "Fíjate en lo que haces en los diez segundos después de que alguien te demuestra que estabas equivocado en una reunión — no lo que dices, lo que haces primero. Esa brecha entre el golpe y tu reacción es toda la habilidad. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'es', body: "¿Cuándo fue la última vez que cambiaste de opinión sobre algo importante, en público? ¿Sabes qué necesitan de ti tus tres personas clave en este momento, o estás adivinando? No puedes reconstruir una cultura con la que tú mismo no estás reconectado. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'es', body: "Un pequeño cambio con impacto real: deja de llamar a tu calendario \"saturado\". Empieza a llamarlo \"elegido\". El lenguaje moldea la propiedad — incluso en las semanas genuinamente difíciles. — Dr. Terry" },
  { theme: 'self_awareness', category: 'leadership', source: 'linkedin', language: 'es', body: "Tu calendario no te está mintiendo. Es la retroalimentación más honesta que recibirás en todo el año — más honesta que cualquier evaluación, porque muestra lo que realmente elegiste. — Dr. Terry" },

  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'es', body: "Antes de desconectarte hoy: envíale a alguien de tu equipo un mensaje que no sea una tarea ni retroalimentación. Solo \"qué bueno tenerte en este equipo\". Te cuesta treinta segundos. Ese es todo el método. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'es', body: "Reconstruye la confianza una conversación a la vez. Pregúntale a tu equipo: ¿Qué no me has dicho que debería saber? ¿Dónde te hice el trabajo más difícil esta semana? ¿Qué necesitas de mí que no estás recibiendo? Y luego, escucha de verdad. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'es', body: "La confianza no se reconstruye en una sola conversación. Se reconstruye haciendo las preguntas reales las veces suficientes hasta que la gente cree que de verdad quieres la respuesta real. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'es', body: "¿Se mantienen tus estándares de enero a julio? ¿La gente te trae los problemas temprano, o solo cuando ya son inevitables? La cultura de tu equipo es consecuencia directa de tu propio ritmo como líder. — Dr. Terry" },
  { theme: 'team', category: 'leadership', source: 'linkedin', language: 'es', body: "El compromiso no es un problema de beneficios. Es un problema de ritmo, y el ritmo empieza desde arriba. Pregúntate: ¿qué ha cambiado realmente en cómo se presentan los líderes en la sala? — Dr. Terry" },

  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'es', body: "¿Conseguiste todo lo que querías y no se siente como pensabas? Eso no es una señal de alarma — es una invitación a volver y reconstruir hacia dónde realmente te diriges. — Dr. Terry" },
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'es', body: "Si tu trabajo te ha convertido, sin darte cuenta, en \"el que siempre dice que no\", pregúntate: ¿dónde, específicamente, podrías seguir siendo la persona que querías ser — dentro del trabajo que ya tienes? — Dr. Terry" },
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'es', body: "En algún punto entre los reportes y las reuniones, es fácil convertirte en un operador excelente de una causa que ya no sientes. Vuelve al momento exacto en que dijiste que sí por primera vez. Reconstruye desde ahí. — Dr. Terry" },
  { theme: 'purpose', category: 'leadership', source: 'linkedin', language: 'es', body: "El liderazgo no es un problema de productividad — es un problema de carácter disfrazado de productividad. Antes de arreglar el calendario, pregúntate qué crees realmente sobre las personas y el poder. — Dr. Terry" },

  { theme: 'resilience', category: 'leadership', source: 'linkedin', language: 'es', body: "A la gente no se le está acabando la resiliencia. Se le están acabando las razones. No construyes resistencia tolerando más desconexión — la construyes reconectando con por qué importa el trabajo. — Dr. Terry" },
  { theme: 'resilience', category: 'leadership', source: 'linkedin', language: 'es', body: "La resiliencia sin reconexión con el propósito es solo una pista más larga hacia el mismo choque. Reconéctate primero. — Dr. Terry" },

  { theme: 'dei', category: 'leadership', source: 'linkedin', language: 'es', body: "No puedes entrenar tu camino hacia un liderazgo inclusivo si la persona que dirige la reunión no ha hecho su propio trabajo primero. Tu equipo cree lo que te ve hacer, no lo que dice el módulo de capacitación. — Dr. Terry" },

  { theme: 'faith', category: 'spiritual', source: 'linkedin', language: 'es', body: "El crecimiento no corrompe el llamado. Lo desplaza en silencio, una tarea delegada a la vez — hasta que terminas gestionando resultados en lugar de cuidar a las personas que te atrajeron al inicio. ¿Qué ha desplazado tu crecimiento? — Dr. Terry" },
];

const BOOK_MESSAGES_ES = [
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Antes de tu próxima conversación, prueba esto: escucha el tono y el ritmo de la otra persona, no solo sus palabras. Ese es el primer paso hacia la conexión — sintonizar, no solo oír. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "No construyes confianza hablando más fuerte. La construyes igualando el ritmo de la persona frente a ti — adapta tu estilo antes de pedirles que se adapten al tuyo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "La empatía no es una habilidad blanda que se añade al liderazgo. Es el pulso debajo de él — lo que convierte una conversación en verdadero compromiso. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Los grandes líderes saben cuándo guiar una conversación y cuándo dejarse guiar por ella. Ese sentido del tiempo — no el volumen, no el control — es lo que mantiene un intercambio en ritmo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "El silencio no es un espacio que hay que llenar. Es parte de la música — espacio para reflexionar, y a veces lo más honesto en la sala. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Tus palabras pueden decir una cosa mientras tu cuerpo dice otra. El ritmo verdadero significa que tu tono, tu postura y tus palabras tocan la misma canción. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "El flujo en una conversación no es un accidente. Se construye — una elección intencional y constante a la vez — hasta que la gente confía en hacia dónde los llevas. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "La verdadera prueba de una conversación no es qué tan bien se sintió. Es si se convirtió en claridad, alineación, y algo que realmente avanzó. — Dr. Terry, in-Rhythm" },

  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Tu organización tiene un ritmo, lo estés dirigiendo o no. La única pregunta es si tú marcas el tempo — o si estás reaccionando al de alguien más. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Un líder que siempre microgestiona convierte un proceso fluido en uno accidentado — como alguien que pausa la pista de baile cada pocos segundos. Deja que la gente se mueva. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Cuando las prioridades cambian todo el tiempo y nadie conoce el plan, no es un problema de comunicación. Es un problema de ritmo. Dale a tu equipo la partitura. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Un ritmo estable no significa que nada cambie. Significa que la gente conoce el compás lo suficientemente bien como para confiar en él, incluso cuando la canción cambia. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "El liderazgo sostenible no se trata de intensidad todo el tiempo. Un buen ritmo incluye descanso — momentos para pausar y recargar antes del siguiente impulso. — Dr. Terry, in-Rhythm" },

  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Los mejores líderes no dominan una sala hasta lograr acuerdo. La leen — sintiendo cuándo presionar, cuándo pausar, y cuándo simplemente escuchar. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "El liderazgo no es un ritmo rígido que estableces una sola vez. Es descubrir los ritmos distintos que ya existen en tu equipo — y orquestarlos en algo que se mueve como uno solo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Los malentendidos rara vez vienen de malas intenciones. Vienen de estar fuera de ritmo — hablando uno al lado del otro en lugar de hablar el uno con el otro. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Las personas que mejor conectan contigo no son las más pulidas al hablar. Son las que igualan tu energía y tu ritmo — y te hacen sentir comprendido. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "La confianza es el pulso que mantiene a un equipo en movimiento incluso cuando las cosas se ponen difíciles. Sin ella, ninguna estrategia se sostiene por mucho tiempo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "Un líder guiado por el ritmo no microgestiona. Construye un ambiente lo suficientemente seguro para que la gente tome riesgos, hable y realmente aporte. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', category: 'leadership', source: 'in-rhythm-book', language: 'es', body: "La consistencia no se trata de ser igual todos los días. Se trata de ser reconocible — tu equipo debería saber qué esperar de ti, incluso en los días difíciles. — Dr. Terry, in-Rhythm" },

  { theme: 'book_faith', category: 'spiritual', source: 'in-rhythm-book', language: 'es', body: "Incluso Jesús lideró un equipo tremendamente diverso — pescadores, recaudadores de impuestos, zelotes — y los llevó al ritmo no por control, sino con ejemplo, paciencia y propósito claro. — Dr. Terry, in-Rhythm" },
  { theme: 'book_faith', category: 'spiritual', source: 'in-rhythm-book', language: 'es', body: "\"Esfuércense por mantener la unidad del Espíritu\" (Efesios 4:3). El liderazgo en su mejor forma es exactamente eso — esfuerzo, no accidente, hacia la unidad. — Dr. Terry, in-Rhythm" },
];

const INVITE_MESSAGES_ES = [
  { theme: 'invite', category: 'leadership', source: 'invite', language: 'es', body: "¿Tienes curiosidad de cómo es trabajar conmigo más allá de estos mensajes? Cada año acepto un número limitado de clientes de coaching. Responde aquí o escribe a tdaniels@focalpointcoaching.com si quieres platicar. — Dr. Terry" },
  { theme: 'invite', category: 'leadership', source: 'invite', language: 'es', body: "Estos mensajes son solo una probada del trabajo. Si estás enfrentando algo más grande ahora mismo — un equipo, una transición, una decisión — yo hago ese trabajo directamente con líderes. Escríbeme cuando quieras: tdaniels@focalpointcoaching.com. — Dr. Terry" },
  { theme: 'invite', category: 'leadership', source: 'invite', language: 'es', body: "La mayoría de lo que envío aquí viene de conversaciones reales de coaching. Si alguna vez quieres tener una propia, solo responde o contáctame en tdaniels@focalpointcoaching.com. — Dr. Terry" },
];

// Distilled from the "Through Spiritual Eyes" devotional at the end of each
// chapter of in-Rhythm - Terry's own reflections tying each chapter's theme
// to Scripture. Two messages per chapter/devotional, tagged category:
// 'spiritual' so subscribers who choose Spiritual (or Both) content receive
// these; a 'leadership'-only subscriber never sees them.
const BOOK_SPIRITUAL_MESSAGES = [
  // -- The Pulse of Connection --
  { theme: 'faith_connection', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "Every conversation has a rhythm. Jesus met the woman at the well right where she was, not where He wanted her to be (John 4). Meet people there first — depth comes after. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_connection', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Be quick to listen, slow to speak\" (James 1:19). Listening is tapping your foot to the beat before you dance. Get in rhythm before you respond. — Dr. Terry, in-Rhythm" },

  // -- Fine-tuning Your Response --
  { theme: 'faith_listening', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "God didn't speak to Elijah in the wind or fire — He came in a gentle whisper (1 Kings 19). Sometimes the most spiritual thing you can do in a conversation is go quiet. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_listening', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"To answer before listening — that is folly and shame\" (Prov. 18:13). Set your agenda down for one conversation today and just listen. — Dr. Terry, in-Rhythm" },

  // -- In-Sync or Sink in Conversation --
  { theme: 'faith_sync', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "Jesus talked nets with fishermen and parables with farmers (Matt. 4:19, Mark 4). He never forced people into His style — He stepped into theirs. Who do you need to meet in their language today? — Dr. Terry, in-Rhythm" },
  { theme: 'faith_sync', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"A gentle answer turns away wrath\" (Prov. 15:1). Adapting how you communicate isn't losing yourself — it's valuing the other person above your own comfort (Phil. 2:3-4). — Dr. Terry, in-Rhythm" },

  // -- The Beat of Empathy --
  { theme: 'faith_empathy', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "Jesus didn't open with a theology lesson at Lazarus's tomb — He wept with Mary and Martha first (John 11:35). Sometimes the holiest response is simply feeling it with someone. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_empathy', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"The purposes of a person's heart are deep waters, but one who has insight draws them out\" (Prov. 20:5). Empathy is wading in without making waves. — Dr. Terry, in-Rhythm" },

  // -- Tempo and Timing --
  { theme: 'faith_timing', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "With Nicodemus, Jesus let the conversation unfold slowly (John 3). With blind Bartimaeus, He moved decisively: \"What do you want me to do for you?\" (Mark 10:51). Discernment knows the difference. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_timing', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"A time to be silent and a time to speak\" (Eccl. 3:7). Today's leadership question: which one does this moment actually need from you? — Dr. Terry, in-Rhythm" },

  // -- Tearing Down Walls and Building Bridges --
  { theme: 'faith_bridges', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Will you give me a drink?\" Jesus broke a cultural wall down with one simple, human question (John 4). Sometimes bridging starts smaller than you think. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_bridges', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"The tongue has the power of life and death\" (Prov. 18:21). Use yours today to build someone up (Eph. 4:29) — even if it's just, \"How are you really doing?\" — Dr. Terry, in-Rhythm" },

  // -- Building Harmony Takes Work --
  { theme: 'faith_trust', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "Jesus built trust with Zacchaeus not with a lecture, but by inviting Himself to dinner (Luke 19). Trust is rarely won in one big gesture — it's built one interaction at a time. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_trust', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Let love and faithfulness never leave you... write them on the tablet of your heart\" (Prov. 3:3-4). Credibility is just faithfulness, repeated. — Dr. Terry, in-Rhythm" },

  // -- Reflecting Peace and Unity Beyond Discord --
  { theme: 'faith_conflict', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "After Peter's three denials, Jesus didn't shame him — He asked three times, \"Do you love me?\" (John 21). Restoration, not condemnation, is the goal of godly conflict. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_conflict', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Be quick to listen, slow to speak, and slow to become angry\" (James 1:19) — applies double in conflict. Take the rest note before you respond. — Dr. Terry, in-Rhythm" },

  // -- Being Noticed for Genuine Communication --
  { theme: 'faith_nonverbal', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "Jesus didn't just tell the children they were welcome — He took them in His arms (Mark 10:13-16). Your body language either confirms your words or contradicts them. Which is it today? — Dr. Terry, in-Rhythm" },
  { theme: 'faith_nonverbal', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"As water reflects the face, so one's life reflects the heart\" (Prov. 27:19). People read your heart before they hear your words. — Dr. Terry, in-Rhythm" },

  // -- The Joy of Natural Guidance in Conversation --
  { theme: 'faith_flow', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "On the road to Emmaus, Jesus didn't dump answers on two discouraged disciples — He asked questions and let understanding unfold (Luke 24). Good guidance is patient. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_flow', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Gracious words are a honeycomb, sweet to the soul\" (Prov. 16:24). Today, guide one conversation with sweetness instead of force. — Dr. Terry, in-Rhythm" },

  // -- Steady Presence in an Out-of-tune World --
  { theme: 'faith_consistency', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Many claim unfailing love, but a faithful person, who can find?\" (Prov. 20:6). Be the steady one. Same person Monday morning as Sunday afternoon. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_consistency', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Let us not become weary in doing good\" (Gal. 6:9). Consistency isn't a personality trait — it's a decision you make again tomorrow. — Dr. Terry, in-Rhythm" },

  // -- Inspiring Leadership Leads Through Purpose --
  { theme: 'faith_leadership', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "Fishermen, tax collectors, zealots — Jesus built one team out of people who had nothing in common (the Gospels). Leadership is conducting a symphony, not playing every instrument yourself. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_leadership', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"If any of you lacks wisdom, ask God, who gives generously\" (James 1:5). Feeling out of rhythm as a leader? Start there. — Dr. Terry, in-Rhythm" },

  // -- Vision Plus Purpose Leads to Impact --
  { theme: 'faith_vision', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Follow me... love one another... go and make disciples\" — Jesus gave His team direction, reinforcement, and a mission (the Gospels). That's organizational rhythm. Does yours have all three? — Dr. Terry, in-Rhythm" },
  { theme: 'faith_vision', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'en', body: "\"Where there is no vision, the people perish\" (Prov. 29:18). Rhythm is what turns vision into daily action. — Dr. Terry, in-Rhythm" },
];

const BOOK_SPIRITUAL_MESSAGES_ES = [
  { theme: 'faith_connection', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Cada conversación tiene un ritmo. Jesús se encontró con la samaritana justo donde ella estaba, no donde Él quería que estuviera (Juan 4). Encuentra primero a las personas ahí — la profundidad viene después. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_connection', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Sean rápidos para escuchar, lentos para hablar\" (Santiago 1:19). Escuchar es seguir el compás con el pie antes de bailar. Entra en ritmo antes de responder. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_listening', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Dios no le habló a Elías en el viento ni en el fuego — vino en un susurro suave (1 Reyes 19). A veces lo más espiritual que puedes hacer en una conversación es guardar silencio. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_listening', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Responder antes de escuchar es necedad y vergüenza\" (Prov. 18:13). Suelta tu agenda por una conversación hoy y solo escucha. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_sync', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Jesús habló de redes con los pescadores y de parábolas con los agricultores (Mat. 4:19, Marcos 4). Nunca obligó a nadie a adaptarse a Su estilo — Él entraba al de ellos. ¿A quién necesitas encontrar hoy en su propio idioma? — Dr. Terry, in-Rhythm" },
  { theme: 'faith_sync', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"La respuesta amable calma el enojo\" (Prov. 15:1). Adaptar cómo te comunicas no es perderte a ti mismo — es valorar al otro más que tu propia comodidad (Fil. 2:3-4). — Dr. Terry, in-Rhythm" },

  { theme: 'faith_empathy', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Jesús no abrió con una lección de teología en la tumba de Lázaro — lloró junto a María y Marta primero (Juan 11:35). A veces la respuesta más santa es simplemente sentirlo junto a alguien. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_empathy', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Aguas profundas son los propósitos del corazón humano, pero el hombre entendido los sacará a la luz\" (Prov. 20:5). La empatía es entrar en esas aguas sin hacer olas. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_timing', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Con Nicodemo, Jesús dejó que la conversación se desarrollara despacio (Juan 3). Con el mendigo ciego, actuó con decisión: \"¿Qué quieres que haga por ti?\" (Marcos 10:51). El discernimiento sabe la diferencia. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_timing', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Tiempo de callar, y tiempo de hablar\" (Ecl. 3:7). La pregunta de liderazgo de hoy: ¿cuál de los dos necesita este momento de ti? — Dr. Terry, in-Rhythm" },

  { theme: 'faith_bridges', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"¿Me das de beber?\" Jesús derribó una barrera cultural con una sola pregunta sencilla y humana (Juan 4). A veces construir un puente empieza más pequeño de lo que crees. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_bridges', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"La lengua tiene poder de vida y muerte\" (Prov. 18:21). Usa la tuya hoy para edificar a alguien (Ef. 4:29) — aunque sea solo un \"¿cómo estás en verdad?\". — Dr. Terry, in-Rhythm" },

  { theme: 'faith_trust', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Jesús construyó confianza con Zaqueo no con un sermón, sino invitándose a cenar en su casa (Lucas 19). La confianza rara vez se gana en un solo gran gesto — se construye una conversación a la vez. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_trust', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Nunca se aparten de ti el amor y la verdad... escríbelos en la tabla de tu corazón\" (Prov. 3:3-4). La credibilidad no es más que fidelidad, repetida. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_conflict', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Después de las tres negaciones de Pedro, Jesús no lo avergonzó — le preguntó tres veces, \"¿Me amas?\" (Juan 21). La restauración, no la condena, es la meta de un conflicto manejado con fe. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_conflict', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Sean rápidos para escuchar, lentos para hablar y lentos para enojarse\" (Santiago 1:19) — aplica el doble en un conflicto. Toma el respiro antes de responder. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_nonverbal', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Jesús no solo les dijo a los niños que eran bienvenidos — los tomó en sus brazos (Marcos 10:13-16). Tu lenguaje corporal, o confirma tus palabras, o las contradice. ¿Cuál de las dos hace hoy? — Dr. Terry, in-Rhythm" },
  { theme: 'faith_nonverbal', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Como en el agua el rostro corresponde al rostro, así el corazón del hombre al hombre\" (Prov. 27:19). La gente lee tu corazón antes de escuchar tus palabras. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_flow', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "En el camino a Emaús, Jesús no les dio todas las respuestas a dos discípulos desanimados — hizo preguntas y dejó que la comprensión se revelara poco a poco (Lucas 24). Guiar bien requiere paciencia. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_flow', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Panal de miel son las palabras amables, dulces al alma\" (Prov. 16:24). Hoy, guía una conversación con dulzura en lugar de fuerza. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_consistency', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Muchos hombres proclaman su propia bondad, pero ¿quién hallará a un hombre fiel?\" (Prov. 20:6). Sé esa persona constante. El mismo lunes por la mañana que el domingo por la tarde. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_consistency', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"No nos cansemos de hacer el bien\" (Gál. 6:9). La constancia no es un rasgo de personalidad — es una decisión que vuelves a tomar mañana. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_leadership', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "Pescadores, cobradores de impuestos, zelotes — Jesús construyó un solo equipo con personas que no tenían nada en común (los Evangelios). Liderar es dirigir una sinfonía, no tocar cada instrumento tú mismo. — Dr. Terry, in-Rhythm" },
  { theme: 'faith_leadership', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Si a alguno le falta sabiduría, pídala a Dios, quien da a todos generosamente\" (Santiago 1:5). ¿Sientes que como líder estás fuera de ritmo? Empieza ahí. — Dr. Terry, in-Rhythm" },

  { theme: 'faith_vision', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Síganme... ámense unos a otros... vayan y hagan discípulos\" — Jesús le dio a su equipo dirección, refuerzo constante y una misión (los Evangelios). Eso es ritmo organizacional. ¿El tuyo tiene los tres? — Dr. Terry, in-Rhythm" },
  { theme: 'faith_vision', category: 'spiritual', source: 'in-rhythm-book-spiritual', language: 'es', body: "\"Donde no hay visión, el pueblo perece\" (Prov. 29:18). El ritmo es lo que convierte la visión en acción diaria. — Dr. Terry, in-Rhythm" },
];

const MESSAGES = [
  ...LINKEDIN_MESSAGES, ...BOOK_MESSAGES, ...INVITE_MESSAGES, ...BOOK_SPIRITUAL_MESSAGES,
  ...LINKEDIN_MESSAGES_ES, ...BOOK_MESSAGES_ES, ...INVITE_MESSAGES_ES, ...BOOK_SPIRITUAL_MESSAGES_ES,
];

module.exports = {
  MESSAGES,
  LINKEDIN_MESSAGES, BOOK_MESSAGES, INVITE_MESSAGES, BOOK_SPIRITUAL_MESSAGES,
  LINKEDIN_MESSAGES_ES, BOOK_MESSAGES_ES, INVITE_MESSAGES_ES, BOOK_SPIRITUAL_MESSAGES_ES,
};
