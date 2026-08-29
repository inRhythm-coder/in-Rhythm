const db = require('./index');

/**
 * Access rules for In Rhythm:
 * - 'client'      : actively engaged coaching client -> free
 * - 'client_tail' : engagement ended, within 2 months of end date -> still free
 * - 'comp'        : manually comped by Terry (e.g. speaking audience, VIP) -> free
 * - 'paid'        : everyone else -> must have active Stripe subscription
 *
 * free_access_until is always engagement_end + 2 months, computed here so
 * it never has to be recalculated by hand.
 */

function addMonths(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function markAsClient(subscriberId, { engagementStart, engagementEnd = null }) {
  const freeUntil = engagementEnd ? addMonths(engagementEnd, 2) : null;
  db.prepare(`
    UPDATE subscribers
    SET access_type = 'client',
        client_engagement_start = ?,
        client_engagement_end = ?,
        free_access_until = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(engagementStart, engagementEnd, freeUntil, subscriberId);
}

function endEngagement(subscriberId, engagementEnd) {
  const freeUntil = addMonths(engagementEnd, 2);
  db.prepare(`
    UPDATE subscribers
    SET access_type = 'client_tail',
        client_engagement_end = ?,
        free_access_until = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(engagementEnd, freeUntil, subscriberId);
}

function markAsComp(subscriberId) {
  db.prepare(`
    UPDATE subscribers SET access_type = 'comp', updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(subscriberId);
}

/**
 * Returns true if this subscriber currently has free access
 * (active client, in their post-engagement tail, or comped).
 */
function hasFreeAccess(subscriber) {
  if (subscriber.access_type === 'client' || subscriber.access_type === 'comp') return true;
  if (subscriber.access_type === 'client_tail' && subscriber.free_access_until) {
    const today = new Date().toISOString().slice(0, 10);
    return today <= subscriber.free_access_until;
  }
  return false;
}

/**
 * Sweep job: find client_tail subscribers whose free window just expired
 * and flip them to 'paid' (they'll need an active Stripe subscription to
 * keep receiving texts). Run this daily alongside the scheduler.
 */
function expireStaleTailAccess() {
  const today = new Date().toISOString().slice(0, 10);
  const expired = db.prepare(`
    SELECT id, name, phone FROM subscribers
    WHERE access_type = 'client_tail' AND free_access_until < ?
  `).all(today);

  const update = db.prepare(`
    UPDATE subscribers SET access_type = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `);
  for (const row of expired) update.run(row.id);
  return expired; // caller can use this list to trigger a "your free access has ended" text/email
}

/**
 * Whether a subscriber should currently receive a scheduled text at all:
 * active status + (free access OR active paid billing).
 */
function isSendEligible(subscriber) {
  if (subscriber.status !== 'active') return false;
  if (hasFreeAccess(subscriber)) return true;
  return subscriber.billing_status === 'active' || subscriber.billing_status === 'trialing';
}

module.exports = {
  markAsClient,
  endEngagement,
  markAsComp,
  hasFreeAccess,
  expireStaleTailAccess,
  isSendEligible,
  addMonths,
};
