require('dotenv').config();
const { sendSms } = require('../sms/twilio');

const to = process.argv[2];
if (!to) {
  console.error('Usage: node src/scripts/sendTest.js +1XXXXXXXXXX');
  process.exit(1);
}

sendSms(to, "This is a live test text from In Rhythm — if you got this, the SMS pipeline is wired up correctly. — Dr. Terry (via Claude)")
  .then(msg => {
    console.log('Sent! SID:', msg.sid, 'status:', msg.status);
  })
  .catch(err => {
    console.error('Send failed:', err.message);
    process.exit(1);
  });
