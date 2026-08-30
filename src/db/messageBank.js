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
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Before you close out this week: what's one \"I'll follow up\" you haven't closed yet? Close it — even the small one nobody's tracking but you. Your word is the whole brand. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Quick audit: of everything you touched this week, what could someone else have done at 80% of your quality? Pick one. Hand it over fully — not just the easy parts. That's leadership. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "If you want the truth from your team, don't wait for the exit interview. Have the real conversation while they still have something at stake. Trust breaks quietly, months before anyone says it out loud. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "After any disruption: name what happened, re-anchor what hasn't changed, re-pace deliberately, then re-commit out loud. Most leaders skip straight to step 3. That's why rhythm never fully returns. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Culture isn't built at a weekend retreat. It's built in the Tuesday 2pm meeting where someone pushes back and finds out what actually happens to them. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "The instinct that made you an exceptional individual contributor — personal drive, controlling your own outcomes — is the opposite skill leadership requires. Leadership means reconnecting other people to their own results. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Would your team describe your Monday self and your Friday self as the same leader? Trust doesn't break on a bad day. It breaks when the bad day becomes a different leader. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Your leadership brand isn't your title. It's what your team expects from you before you walk into the room: predictable presence, named follow-through, visible consistency. Which one's weakest for you right now? — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Same leader, different day — that's the whole job. Consistency isn't about being flawless. It's about being recognizable on the hard days too. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Close what you opened today. Open loops don't just create work — they quietly teach your team what your word is actually worth. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'en', body: "Real leadership often looks like doing less of what you're good at, so someone else gets the chance to get good at it too. — Dr. Terry" },

  // -- self-awareness --
  { theme: 'self_awareness', source: 'linkedin', language: 'en', body: "Pull up last week's real calendar next to your top three stated priorities. Count the hours. The gap you find isn't a time management problem — it's the most honest feedback you'll get all year. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'en', body: "Two minutes before you shut your laptop this week: Where did I lead from purpose? Where did I lead from habit? What did my team need that I didn't give? No fix required yet — just pay attention. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'en', body: "Notice what you do in the ten seconds after someone proves you wrong in a meeting — not what you say, what you do first. That gap between the sting and your reaction is the whole skill. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'en', body: "When did you last change your mind about something important, publicly? Do you know what your top three people need from you right now, or are you guessing? You can't rebuild a culture you haven't reconnected to yourself. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'en', body: "Small shift, real impact: stop calling your calendar \"packed.\" Start calling it \"chosen.\" Language shapes ownership — even on the weeks that are genuinely hard. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'en', body: "Your calendar isn't lying to you. It's the most honest feedback you'll get all year — more honest than any review, because it shows what you actually chose. — Dr. Terry" },

  // -- team / relational --
  { theme: 'team', source: 'linkedin', language: 'en', body: "Before you log off today: send one person on your team a text that isn't a task or feedback. Just \"glad you're on this team.\" Costs you thirty seconds. That's the whole framework. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'en', body: "Rebuild trust one conversation at a time. Ask your team: What haven't you told me that I should know? Where did I make your job harder this week? What do you need from me that you're not getting? Then actually listen. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'en', body: "Trust isn't rebuilt in one conversation. It's rebuilt by asking the real questions enough times that people believe you actually want the real answer. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'en', body: "Do your standards hold from January to July? Do people bring you problems early, or only once they're unavoidable? Your team's culture is downstream of your own rhythm as a leader. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'en', body: "Engagement isn't a perks problem. It's a rhythm problem, and rhythm starts at the top. Ask: what has actually changed about how the leaders in the room show up? — Dr. Terry" },

  // -- purpose / meaning --
  { theme: 'purpose', source: 'linkedin', language: 'en', body: "Got everything you wanted and it doesn't feel the way you thought it would? That's not a warning sign — it's an invitation to go back and rebuild what you're actually working toward. — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', language: 'en', body: "If your job has quietly turned you into \"the one who says no,\" ask: where, specifically, could you still be the person you set out to be — inside the job you already have? — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', language: 'en', body: "Somewhere between the reports and the meetings, it's easy to become an excellent operator of a cause you no longer feel. Go back to the specific moment you first said yes. Rebuild from there. — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', language: 'en', body: "Leadership isn't a productivity problem — it's a character problem wearing a productivity costume. Before you fix the calendar, ask what you actually believe about people and power. — Dr. Terry" },

  // -- resilience --
  { theme: 'resilience', source: 'linkedin', language: 'en', body: "People aren't running out of resilience. They're running out of reasons. You don't build endurance by tolerating more disconnection — you build it by reconnecting to why the work matters. — Dr. Terry" },
  { theme: 'resilience', source: 'linkedin', language: 'en', body: "Resilience without reconnection to purpose is just a longer runway to the same crash. Reconnect first. — Dr. Terry" },

  // -- dei --
  { theme: 'dei', source: 'linkedin', language: 'en', body: "You can't train your way into inclusive leadership if the person running the meeting hasn't done their own work first. Your team believes what they watch you do, not what the module says. — Dr. Terry" },

  // -- faith / nonprofit --
  { theme: 'faith', source: 'linkedin', language: 'en', body: "Growth doesn't corrupt calling. It quietly displaces it, one delegated task at a time — until you're managing outcomes instead of caring for the people who drew you in. What has your growth displaced? — Dr. Terry" },
];

// Distilled from Terry's book, "in-Rhythm: The Key to Purposeful Engagement"
// (2025) - the "Eight Keys" chapter, the conclusion, and the organizational
// rhythm chapter.
const BOOK_MESSAGES = [
  // -- the Eight Keys, one message each --
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "Before your next conversation, try this: listen for someone's tone and pace, not just their words. That's the first step to rapport — tuning in, not just hearing. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "You don't build trust by talking louder. You build it by matching the rhythm of the person in front of you — adapt your style before you ask them to adapt to yours. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "Empathy isn't a soft skill you add on top of leadership. It's the beat underneath it — the thing that turns a conversation into real engagement. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "Great leaders know when to lead a conversation and when to follow it. That timing — not volume, not control — is what keeps an exchange in rhythm. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "Silence isn't a gap to fill. It's part of the music — space for reflection, and sometimes the most honest thing in the room. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "Your words can say one thing while your body says another. Real rhythm means your tone, your posture, and your words are all playing the same song. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "Flow in a conversation isn't an accident. It's built — one intentional, consistent choice at a time — until people trust where you're taking them. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'en', body: "The real test of a conversation isn't how good it felt. It's whether it turned into clarity, alignment, and something that actually moved forward. — Dr. Terry, in-Rhythm" },

  // -- organizational rhythm (chapter 13) --
  { theme: 'book_org', source: 'in-rhythm-book', language: 'en', body: "Your organization has a rhythm whether you're managing it or not. The only question is whether you're setting the tempo — or reacting to whoever else is. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'en', body: "A leader who's always micromanaging turns a smooth process into a bumpy one — like someone hitting pause on the dance floor every few seconds. Let people move. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'en', body: "When priorities shift constantly and no one knows the plan, it's not a communication problem. It's a rhythm problem. Give your team the sheet music. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'en', body: "A steady rhythm doesn't mean nothing changes. It means people know the beat well enough to trust it, even when the song shifts. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'en', body: "Sustainable leadership isn't about intensity all the time. A good rhythm includes rest — moments to pause and recharge before the next push. — Dr. Terry, in-Rhythm" },

  // -- conclusion / general voice --
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "The best leaders don't dominate a room into agreement. They read it — sensing when to push, when to pause, and when to simply listen. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "Leadership isn't a rigid pace you set once. It's discovering the distinct rhythms already in your team — and orchestrating them into something that moves as one. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "Misunderstandings rarely come from bad intentions. They come from being out of rhythm — talking past each other instead of with each other. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "The people who connect with you best aren't the most polished talkers. They're the ones who match your energy and pace — and make you feel understood. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "Trust is the beat that keeps a team moving even when things get hard. Without it, no strategy holds together for long. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "A rhythm-driven leader doesn't micromanage. They build an environment safe enough for people to take risks, speak up, and actually contribute. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'en', body: "Consistency isn't about being the same every day. It's about being recognizable — your team should know what to expect from you, even on the hard days. — Dr. Terry, in-Rhythm" },

  // -- faith --
  { theme: 'book_faith', source: 'in-rhythm-book', language: 'en', body: "Even Jesus led a wildly diverse team — fishermen, tax collectors, zealots — and brought them into rhythm not by control, but by example, patience, and clear purpose. — Dr. Terry, in-Rhythm" },
  { theme: 'book_faith', source: 'in-rhythm-book', language: 'en', body: "\"Make every effort to keep the unity of the Spirit\" (Eph. 4:3). Leadership at its best is exactly that — effort, not accident, toward unity. — Dr. Terry, in-Rhythm" },
];

// Occasional, low-key invitations to learn more about 1:1 coaching. Mixed
// sparingly into the normal rotation (same random pick as everything else)
// rather than attached to every message, so it reads as a natural text
// rather than an ad.
const INVITE_MESSAGES = [
  { theme: 'invite', source: 'invite', language: 'en', body: "Curious what working with me looks like beyond these texts? I take on a limited number of coaching clients each year. Reply here or email tdaniels@focalpointcoaching.com if you'd like to talk. — Dr. Terry" },
  { theme: 'invite', source: 'invite', language: 'en', body: "These texts are just a taste of the work. If you're facing something bigger right now — a team, a transition, a decision — I do that work directly with leaders. Email me anytime: tdaniels@focalpointcoaching.com. — Dr. Terry" },
  { theme: 'invite', source: 'invite', language: 'en', body: "Most of what I send here comes from real coaching conversations. If you'd ever like to have one of your own, just reply or reach me at tdaniels@focalpointcoaching.com. — Dr. Terry" },
];

// Spanish translations of the full bank above (same themes, same order, same
// count) so the scheduler always has a matching pool for subscribers who
// choose Spanish as their preferred language.
const LINKEDIN_MESSAGES_ES = [
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Antes de cerrar la semana: ¿cuál es ese \"te voy a dar seguimiento\" que aún no has cerrado? Ciérralo, aunque sea el pequeño que nadie más está siguiendo salvo tú. Tu palabra es toda tu marca. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Auditoría rápida: de todo lo que hiciste esta semana, ¿qué podría haber hecho otra persona al 80% de tu calidad? Elige uno. Entrégalo por completo, no solo las partes fáciles. Eso es liderazgo. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Si quieres la verdad de tu equipo, no esperes a la entrevista de salida. Ten la conversación real mientras todavía tienen algo en juego. La confianza se rompe en silencio, meses antes de que alguien lo diga en voz alta. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Después de cualquier disrupción: nombra lo que pasó, reafirma lo que no ha cambiado, retoma el ritmo con intención, y vuelve a comprometerte en voz alta. La mayoría de los líderes se saltan directo al paso 3. Por eso el ritmo nunca regresa del todo. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "La cultura no se construye en un retiro de fin de semana. Se construye en la reunión del martes a las 2pm, donde alguien te contradice y descubre qué pasa de verdad. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "El instinto que te hizo un colaborador excepcional — impulso personal, controlar tus propios resultados — es la habilidad opuesta a lo que exige el liderazgo. Liderar significa reconectar a otras personas con sus propios resultados. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "¿Describiría tu equipo a tu \"yo\" del lunes igual que a tu \"yo\" del viernes? La confianza no se rompe en un mal día. Se rompe cuando el mal día se convierte en un líder distinto. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Tu marca de liderazgo no es tu título. Es lo que tu equipo espera de ti antes de entrar al salón: presencia predecible, seguimiento con nombre propio, consistencia visible. ¿Cuál de esas es tu punto más débil ahora mismo? — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Mismo líder, día diferente — ese es todo el trabajo. Consistencia no significa ser perfecto. Significa ser reconocible también en los días difíciles. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "Cierra lo que abriste hoy. Los pendientes sin cerrar no solo generan más trabajo — le enseñan a tu equipo, en silencio, cuánto vale realmente tu palabra. — Dr. Terry" },
  { theme: 'leadership', source: 'linkedin', language: 'es', body: "El liderazgo real muchas veces se ve como hacer menos de lo que se te da bien, para que alguien más tenga la oportunidad de volverse bueno en eso también. — Dr. Terry" },

  { theme: 'self_awareness', source: 'linkedin', language: 'es', body: "Abre tu calendario real de la semana pasada junto a tus tres prioridades declaradas. Cuenta las horas. La brecha que encuentres no es un problema de manejo del tiempo — es la retroalimentación más honesta que recibirás en todo el año. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'es', body: "Dos minutos antes de cerrar tu laptop esta semana: ¿Dónde lideré desde el propósito? ¿Dónde lideré desde el hábito? ¿Qué necesitaba mi equipo que no le di? No hace falta arreglarlo todavía — solo presta atención. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'es', body: "Fíjate en lo que haces en los diez segundos después de que alguien te demuestra que estabas equivocado en una reunión — no lo que dices, lo que haces primero. Esa brecha entre el golpe y tu reacción es toda la habilidad. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'es', body: "¿Cuándo fue la última vez que cambiaste de opinión sobre algo importante, en público? ¿Sabes qué necesitan de ti tus tres personas clave en este momento, o estás adivinando? No puedes reconstruir una cultura con la que tú mismo no estás reconectado. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'es', body: "Un pequeño cambio con impacto real: deja de llamar a tu calendario \"saturado\". Empieza a llamarlo \"elegido\". El lenguaje moldea la propiedad — incluso en las semanas genuinamente difíciles. — Dr. Terry" },
  { theme: 'self_awareness', source: 'linkedin', language: 'es', body: "Tu calendario no te está mintiendo. Es la retroalimentación más honesta que recibirás en todo el año — más honesta que cualquier evaluación, porque muestra lo que realmente elegiste. — Dr. Terry" },

  { theme: 'team', source: 'linkedin', language: 'es', body: "Antes de desconectarte hoy: envíale a alguien de tu equipo un mensaje que no sea una tarea ni retroalimentación. Solo \"qué bueno tenerte en este equipo\". Te cuesta treinta segundos. Ese es todo el método. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'es', body: "Reconstruye la confianza una conversación a la vez. Pregúntale a tu equipo: ¿Qué no me has dicho que debería saber? ¿Dónde te hice el trabajo más difícil esta semana? ¿Qué necesitas de mí que no estás recibiendo? Y luego, escucha de verdad. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'es', body: "La confianza no se reconstruye en una sola conversación. Se reconstruye haciendo las preguntas reales las veces suficientes hasta que la gente cree que de verdad quieres la respuesta real. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'es', body: "¿Se mantienen tus estándares de enero a julio? ¿La gente te trae los problemas temprano, o solo cuando ya son inevitables? La cultura de tu equipo es consecuencia directa de tu propio ritmo como líder. — Dr. Terry" },
  { theme: 'team', source: 'linkedin', language: 'es', body: "El compromiso no es un problema de beneficios. Es un problema de ritmo, y el ritmo empieza desde arriba. Pregúntate: ¿qué ha cambiado realmente en cómo se presentan los líderes en la sala? — Dr. Terry" },

  { theme: 'purpose', source: 'linkedin', language: 'es', body: "¿Conseguiste todo lo que querías y no se siente como pensabas? Eso no es una señal de alarma — es una invitación a volver y reconstruir hacia dónde realmente te diriges. — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', language: 'es', body: "Si tu trabajo te ha convertido, sin darte cuenta, en \"el que siempre dice que no\", pregúntate: ¿dónde, específicamente, podrías seguir siendo la persona que querías ser — dentro del trabajo que ya tienes? — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', language: 'es', body: "En algún punto entre los reportes y las reuniones, es fácil convertirte en un operador excelente de una causa que ya no sientes. Vuelve al momento exacto en que dijiste que sí por primera vez. Reconstruye desde ahí. — Dr. Terry" },
  { theme: 'purpose', source: 'linkedin', language: 'es', body: "El liderazgo no es un problema de productividad — es un problema de carácter disfrazado de productividad. Antes de arreglar el calendario, pregúntate qué crees realmente sobre las personas y el poder. — Dr. Terry" },

  { theme: 'resilience', source: 'linkedin', language: 'es', body: "A la gente no se le está acabando la resiliencia. Se le están acabando las razones. No construyes resistencia tolerando más desconexión — la construyes reconectando con por qué importa el trabajo. — Dr. Terry" },
  { theme: 'resilience', source: 'linkedin', language: 'es', body: "La resiliencia sin reconexión con el propósito es solo una pista más larga hacia el mismo choque. Reconéctate primero. — Dr. Terry" },

  { theme: 'dei', source: 'linkedin', language: 'es', body: "No puedes entrenar tu camino hacia un liderazgo inclusivo si la persona que dirige la reunión no ha hecho su propio trabajo primero. Tu equipo cree lo que te ve hacer, no lo que dice el módulo de capacitación. — Dr. Terry" },

  { theme: 'faith', source: 'linkedin', language: 'es', body: "El crecimiento no corrompe el llamado. Lo desplaza en silencio, una tarea delegada a la vez — hasta que terminas gestionando resultados en lugar de cuidar a las personas que te atrajeron al inicio. ¿Qué ha desplazado tu crecimiento? — Dr. Terry" },
];

const BOOK_MESSAGES_ES = [
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "Antes de tu próxima conversación, prueba esto: escucha el tono y el ritmo de la otra persona, no solo sus palabras. Ese es el primer paso hacia la conexión — sintonizar, no solo oír. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "No construyes confianza hablando más fuerte. La construyes igualando el ritmo de la persona frente a ti — adapta tu estilo antes de pedirles que se adapten al tuyo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "La empatía no es una habilidad blanda que se añade al liderazgo. Es el pulso debajo de él — lo que convierte una conversación en verdadero compromiso. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "Los grandes líderes saben cuándo guiar una conversación y cuándo dejarse guiar por ella. Ese sentido del tiempo — no el volumen, no el control — es lo que mantiene un intercambio en ritmo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "El silencio no es un espacio que hay que llenar. Es parte de la música — espacio para reflexionar, y a veces lo más honesto en la sala. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "Tus palabras pueden decir una cosa mientras tu cuerpo dice otra. El ritmo verdadero significa que tu tono, tu postura y tus palabras tocan la misma canción. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "El flujo en una conversación no es un accidente. Se construye — una elección intencional y constante a la vez — hasta que la gente confía en hacia dónde los llevas. — Dr. Terry, in-Rhythm" },
  { theme: 'book_rhythm', source: 'in-rhythm-book', language: 'es', body: "La verdadera prueba de una conversación no es qué tan bien se sintió. Es si se convirtió en claridad, alineación, y algo que realmente avanzó. — Dr. Terry, in-Rhythm" },

  { theme: 'book_org', source: 'in-rhythm-book', language: 'es', body: "Tu organización tiene un ritmo, lo estés dirigiendo o no. La única pregunta es si tú marcas el tempo — o si estás reaccionando al de alguien más. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'es', body: "Un líder que siempre microgestiona convierte un proceso fluido en uno accidentado — como alguien que pausa la pista de baile cada pocos segundos. Deja que la gente se mueva. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'es', body: "Cuando las prioridades cambian todo el tiempo y nadie conoce el plan, no es un problema de comunicación. Es un problema de ritmo. Dale a tu equipo la partitura. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'es', body: "Un ritmo estable no significa que nada cambie. Significa que la gente conoce el compás lo suficientemente bien como para confiar en él, incluso cuando la canción cambia. — Dr. Terry, in-Rhythm" },
  { theme: 'book_org', source: 'in-rhythm-book', language: 'es', body: "El liderazgo sostenible no se trata de intensidad todo el tiempo. Un buen ritmo incluye descanso — momentos para pausar y recargar antes del siguiente impulso. — Dr. Terry, in-Rhythm" },

  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "Los mejores líderes no dominan una sala hasta lograr acuerdo. La leen — sintiendo cuándo presionar, cuándo pausar, y cuándo simplemente escuchar. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "El liderazgo no es un ritmo rígido que estableces una sola vez. Es descubrir los ritmos distintos que ya existen en tu equipo — y orquestarlos en algo que se mueve como uno solo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "Los malentendidos rara vez vienen de malas intenciones. Vienen de estar fuera de ritmo — hablando uno al lado del otro en lugar de hablar el uno con el otro. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "Las personas que mejor conectan contigo no son las más pulidas al hablar. Son las que igualan tu energía y tu ritmo — y te hacen sentir comprendido. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "La confianza es el pulso que mantiene a un equipo en movimiento incluso cuando las cosas se ponen difíciles. Sin ella, ninguna estrategia se sostiene por mucho tiempo. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "Un líder guiado por el ritmo no microgestiona. Construye un ambiente lo suficientemente seguro para que la gente tome riesgos, hable y realmente aporte. — Dr. Terry, in-Rhythm" },
  { theme: 'book_leadership', source: 'in-rhythm-book', language: 'es', body: "La consistencia no se trata de ser igual todos los días. Se trata de ser reconocible — tu equipo debería saber qué esperar de ti, incluso en los días difíciles. — Dr. Terry, in-Rhythm" },

  { theme: 'book_faith', source: 'in-rhythm-book', language: 'es', body: "Incluso Jesús lideró un equipo tremendamente diverso — pescadores, recaudadores de impuestos, zelotes — y los llevó al ritmo no por control, sino con ejemplo, paciencia y propósito claro. — Dr. Terry, in-Rhythm" },
  { theme: 'book_faith', source: 'in-rhythm-book', language: 'es', body: "\"Esfuércense por mantener la unidad del Espíritu\" (Efesios 4:3). El liderazgo en su mejor forma es exactamente eso — esfuerzo, no accidente, hacia la unidad. — Dr. Terry, in-Rhythm" },
];

const INVITE_MESSAGES_ES = [
  { theme: 'invite', source: 'invite', language: 'es', body: "¿Tienes curiosidad de cómo es trabajar conmigo más allá de estos mensajes? Cada año acepto un número limitado de clientes de coaching. Responde aquí o escribe a tdaniels@focalpointcoaching.com si quieres platicar. — Dr. Terry" },
  { theme: 'invite', source: 'invite', language: 'es', body: "Estos mensajes son solo una probada del trabajo. Si estás enfrentando algo más grande ahora mismo — un equipo, una transición, una decisión — yo hago ese trabajo directamente con líderes. Escríbeme cuando quieras: tdaniels@focalpointcoaching.com. — Dr. Terry" },
  { theme: 'invite', source: 'invite', language: 'es', body: "La mayoría de lo que envío aquí viene de conversaciones reales de coaching. Si alguna vez quieres tener una propia, solo responde o contáctame en tdaniels@focalpointcoaching.com. — Dr. Terry" },
];

const MESSAGES = [
  ...LINKEDIN_MESSAGES, ...BOOK_MESSAGES, ...INVITE_MESSAGES,
  ...LINKEDIN_MESSAGES_ES, ...BOOK_MESSAGES_ES, ...INVITE_MESSAGES_ES,
];

module.exports = {
  MESSAGES,
  LINKEDIN_MESSAGES, BOOK_MESSAGES, INVITE_MESSAGES,
  LINKEDIN_MESSAGES_ES, BOOK_MESSAGES_ES, INVITE_MESSAGES_ES,
};
