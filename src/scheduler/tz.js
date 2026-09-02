/**
 * Minimal IANA-timezone helpers built on the standard Intl API (no extra
 * dependency needed). Used to anchor a subscriber's next_send_at to a
 * specific wall-clock time (e.g. "8:00am America/Chicago"), correctly
 * across DST changes - see computeNextSendAt() in run.js for why this
 * matters.
 */

function zonedParts(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts = dtf.formatToParts(date).reduce((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = parseInt(p.value, 10);
    return acc;
  }, {});
  if (parts.hour === 24) parts.hour = 0; // some environments report midnight as "24"
  return parts;
}

// Converts a wall-clock date/time as it would read in `timeZone` into the
// correct real UTC Date instant. Standard "guess, then correct for the
// zone's actual offset" approach - handles DST transitions correctly for
// virtually all real-world cases.
function zonedTimeToUtc(year, month, day, hour, minute, timeZone) {
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const asZoned = zonedParts(guess, timeZone);
  const asIfUtc = Date.UTC(asZoned.year, asZoned.month - 1, asZoned.day, asZoned.hour, asZoned.minute, asZoned.second);
  const offset = guess.getTime() - asIfUtc;
  return new Date(guess.getTime() + offset);
}

module.exports = { zonedParts, zonedTimeToUtc };
