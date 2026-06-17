# Billing Spec (Module G/I, screens 27, 35)

**Priority:** P1. **Screen:** [src/screens/profile/ReceiptsBillingScreen.tsx](../src/screens/profile/ReceiptsBillingScreen.tsx). **Tab:** Profile.

The no-subscription rule made concrete. See [reports.md](reports.md) for the purchase flow and [profile.md](profile.md) for the Profile entry point.

---

## 35 · Receipts & billing — `ReceiptsBillingScreen.tsx`
- A **chronological list of past report purchases** ($2 Insights, $4 Second Opinions).
- Each receipt **re-opens its corresponding report for free**.
- **No subscription state, no recurring charges shown.** There is nothing to cancel because there is nothing recurring.

## The no-subscription invariant
- Never display "renews on", "next billing date", "manage subscription", "plan", or "auto-renew".
- Each purchase is a one-time charge for one report, recorded as a receipt.
- A user can buy the same tier again later; that is a new receipt, not a renewal.

## Data
A local billing store records `{ id, tier, amount, reportId, purchasedAt }`. Receipts drive both this screen and the "re-open for free" behavior. Payment itself is the native sheet (27); this screen only reflects completed purchases.

## States
No purchases yet → a calm empty state explaining that the free Summary is always available and paid reports appear here after purchase. See [states.md](states.md).
