require('dotenv').config();

// Masks a secret for logging: shows just enough to visually confirm it's
// the right value (and to spot stray whitespace/quotes/newlines from a
// copy-paste into Railway) without ever printing the whole thing.
function maskForLog(value) {
  if (!value) return '(empty)';
  const len = value.length;
  const hasWhitespace = /\s/.test(value);
  const hasQuotes = /^['"]|['"]$/.test(value);
  const first = value.slice(0, 4);
  const last = value.slice(-4);
  const flags = [];
  if (hasWhitespace) flags.push('CONTAINS WHITESPACE');
  if (hasQuotes) flags.push('HAS SURROUNDING QUOTES');
  return `${first}...${last} (len=${len}${flags.length ? ', ' + flags.join(', ') : ''})`;
}

let client = null;
let loggedCredsOnce = false;
function getClient() {
  if (client) return client;
  // Trim defensively - a Railway variable pasted with a trailing space or
  // newline (very easy to do when copying from a browser) produces a SID/
  // token that "looks" right in the UI but fails Twilio auth silently.
  const sid = (process.env.TWILIO_ACCOUNT_SID || '').trim();
  const token = (process.env.TWILIO_AUTH_TOKEN || '').trim();
  if (!sid || !token) {
    throw new Error('Twilio credentials missing. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
  }
  if (!loggedCredsOnce) {
    loggedCredsOnce = true;
    console.log(`[twilio] using Account SID: ${maskForLog(sid)}`);
    console.log(`[twilio] using Auth Token: ${maskForLog(token)}`);
    if (!sid.startsWith('AC')) {
      console.log('[twilio] WARNING: TWILIO_ACCOUNT_SID does not start with "AC" - this is not a valid Account SID.');
    }
  }
  const twilio = require('twilio');
  client = twilio(sid, token);
  return client;
}

/**
 * Send a single SMS. Uses a Messaging Service if configured (recommended -
 * handles carrier registration/throughput), otherwise falls back to a
 * single From number.
 */
// Without an explicit timeout, a hung connection to Twilio (bad network
// egress, a stalled TLS handshake, anything short of Twilio itself
// returning an HTTP error) leaves this await pending forever. That's
// exactly what happened on 2026-09-03: the 8am sweep found subscribers
// due, started sending to the first one, and the whole sweep froze for
// good - no [sent], no [failed], no crash, nothing - because nothing ever
// told the request to give up. This wraps the Twilio call in a race
// against a timeout so a stuck connection fails loudly (and quickly)
// instead of silently blocking every subscriber behind it forever.
const SEND_TIMEOUT_MS = 20000;

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function sendSms(toPhoneE164, body) {
  const c = getClient();
  const params = { to: toPhoneE164, body };

  if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
    params.messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  } else if (process.env.TWILIO_FROM_NUMBER) {
    params.from = process.env.TWILIO_FROM_NUMBER;
  } else {
    throw new Error('Set either TWILIO_MESSAGING_SERVICE_SID or TWILIO_FROM_NUMBER in .env');
  }

  const message = await withTimeout(c.messages.create(params), SEND_TIMEOUT_MS, 'Twilio send');
  return message; // has .sid, .status, etc.
}

const APP_NAME = process.env.APP_NAME || 'In Rhythm';
const COACH_NAME = process.env.COACH_NAME || 'Dr. Terry';

/**
 * TCPA-compliant opt-in confirmation. Twilio's carrier-registered numbers
 * auto-handle STOP/HELP/START keywords, but we still send our own explicit
 * opt-in confirmation text as best practice (and a paper/digital trail).
 */
function buildOptInMessage() {
  const contact = process.env.COACH_CELL
    ? ` Questions anytime? Text or call me directly at ${process.env.COACH_CELL}.`
    : '';
  return (
    `Welcome to ${APP_NAME} with ${COACH_NAME}! You'll get coaching texts at the cadence you chose. ` +
    `Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel anytime, HELP for help.${contact}`
  );
}

/**
 * Sent once, right when Stripe confirms a paid subscriber's first payment
 * (checkout.session.completed webhook) - separate from the opt-in text,
 * which goes out immediately at signup before payment is even attempted.
 * This is the "yes, your card went through and you're all set" message.
 */
function buildPurchaseConfirmationMessage(language) {
  const contact = process.env.COACH_CELL
    ? ` Questions? Text or call me at ${process.env.COACH_CELL}.`
    : '';
  if (language === 'es') {
    return (
      `¡Pago confirmado! Ya estás dentro de ${APP_NAME} con ${COACH_NAME}. ` +
      `Tu primer mensaje de coaching llegará en el próximo envío programado.${contact} Responde STOP para cancelar.`
    );
  }
  return (
    `Payment confirmed! You're officially set up with ${APP_NAME} and ${COACH_NAME}. ` +
    `Your first coaching text will arrive on the next scheduled send.${contact} Reply STOP anytime to cancel.`
  );
}

/**
 * One-time "catch-up" welcome, for subscribers who signed up before the
 * A2P 10DLC carrier registration was fixed and whose original welcome text
 * was silently filtered by carriers (they never actually received it,
 * even though our system had recorded the signup as successful). Distinct
 * wording from buildOptInMessage() so it doesn't read like a duplicate or
 * a new signup - it explains why they're getting a "welcome" days/weeks in.
 */
function buildCatchupWelcomeMessage(language) {
  const contact = process.env.COACH_CELL
    ? ` Questions? Text or call me at ${process.env.COACH_CELL}.`
    : '';
  if (language === 'es') {
    return (
      `Hola, soy ${COACH_NAME} de ${APP_NAME}. Tuvimos un problema técnico que impidió la entrega de mensajes de texto ` +
      `y ya está resuelto - ¡bienvenido(a) de nuevo a ${APP_NAME}! Tus mensajes de coaching llegarán ahora en tu horario ` +
      `regular.${contact} Responde STOP para cancelar en cualquier momento.`
    );
  }
  return (
    `Hi, this is ${COACH_NAME} with ${APP_NAME}. We had a technical delivery issue that's now fixed - welcome (again) ` +
    `to ${APP_NAME}! Your coaching texts will now arrive on your regular schedule.${contact} Reply STOP anytime to cancel.`
  );
}

/**
 * Fire-and-forget text to the coach's own cell when a new subscriber signs
 * up. Uses the same Twilio setup as everything else - no separate service
 * needed. Safe to call even if COACH_CELL isn't set (just no-ops).
 */
async function notifyCoachOfNewSubscriber({ name, phone, cadence, email }) {
  if (!process.env.COACH_CELL) return;
  const digits = process.env.COACH_CELL.replace(/\D/g, '');
  const coachE164 = digits.length === 10 ? `+1${digits}` : digits.length === 11 ? `+${digits}` : null;
  if (!coachE164) return;
  const emailPart = email ? `, ${email}` : '';
  const body = `New In Rhythm subscriber: ${name}, ${phone}${emailPart} (${cadence}).`;
  try {
    await sendSms(coachE164, body);
  } catch (err) {
    console.error('[notify] failed to text coach about new subscriber:', err.message);
  }
}

module.exports = {
  sendSms,
  buildOptInMessage,
  buildPurchaseConfirmationMessage,
  buildCatchupWelcomeMessage,
  notifyCoachOfNewSubscriber,
};
