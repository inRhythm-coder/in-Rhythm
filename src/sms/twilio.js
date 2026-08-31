require('dotenv').config();

let client = null;
function getClient() {
  if (client) return client;
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) {
    throw new Error('Twilio credentials missing. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
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

  const message = await c.messages.create(params);
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

module.exports = { sendSms, buildOptInMessage, buildPurchaseConfirmationMessage, notifyCoachOfNewSubscriber };
