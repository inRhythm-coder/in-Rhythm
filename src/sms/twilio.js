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
  return (
    `Welcome to ${APP_NAME} with ${COACH_NAME}! You'll get coaching texts at the cadence you chose. ` +
    `Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel anytime, HELP for help.`
  );
}

module.exports = { sendSms, buildOptInMessage };
