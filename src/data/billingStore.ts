/**
 * billingStore — in-memory, pay-as-you-go billing state for the Reports hub.
 *
 * A paid report is "owned" once it has been run (purchased). The free Summary is
 * always available. No subscription state, ever. Mirrors the web mock billing
 * store (MetacuraWeb/src/data/mockBillingStore.ts), kept in memory for the
 * session since the scaffold has no persistence layer yet. See specs/reports.md
 * and specs/billing.md.
 */
import { useSyncExternalStore } from 'react';
import { PaidTier, ReportTier } from './types';

export type PaymentMethod = 'apple' | 'google' | 'card';

const owned = new Set<PaidTier>();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach(l => l());
}

/** True when the report for this tier can be opened for free. */
export function hasReport(tier: ReportTier): boolean {
  if (tier === 'summary') return true; // free, always available
  return owned.has(tier as PaidTier);
}

/** Records a successful (mock) purchase, unlocking re-opens of the report. */
export function purchaseReport(tier: PaidTier, _method: PaymentMethod) {
  owned.add(tier);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// Stable snapshot: a sorted key of owned tiers, referentially equal until it
// actually changes, so useSyncExternalStore only re-renders on a purchase.
function getSnapshot() {
  return owned.size === 0 ? '' : [...owned].sort().join(',');
}

/** Subscribe a screen to ownership changes; returns the live `hasReport`. */
export function useOwnedReports() {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { hasReport };
}
