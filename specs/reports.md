# Reports & Pricing Spec (Module G, screens 23-27)

**Priority:** P0 (the entire commercial layer). **Screens:** [src/screens/reports/](../src/screens/reports). **Mounted as:** root-level modals reached from Home and Records.

Pay-as-you-go. **No subscription, no auto-renewal, no annual lock-in.** The Reports hub is the only place pricing appears in the app. See also [billing.md](billing.md).

---

## 23 · Reports hub — `ReportsHubScreen.tsx`
Three tier cards stacked vertically. Each shows the tier name, price, included features (laid out in two columns), and a primary action button. The user picks based on the depth needed today, not on a subscription decision.

**Owned state.** Tapping a tier runs that report. The free Summary always opens directly. A paid tier (Insights, Second Opinion) routes through the payment sheet (27) the first time; once run, the report is **owned**: the card shows an "Owned" pill, its button reads "Open report", and tapping opens the report directly with no further charge. Re-opening an owned report is always free. Ownership is tracked in `src/data/billingStore.ts` (in-memory for the session; mirrors the web `mockBillingStore`), exposed to the hub via the `useOwnedReports()` hook.

| Tier | Price | Record inputs | Timeline | Queries | Adds |
| --- | --- | --- | --- | --- | --- |
| Summary | Free forever | Up to 50 | 30 days | — | Plain-English summary, PDF export |
| Health Insights | $2 / report | Up to 75 | Lifetime | 10 | Trends, source-linked answers, PDF + FHIR R4 |
| Quiet Second Opinion | $4 / report | Unlimited | Lifetime | 10 | Symptomatic history mapping, reasoning logs, priority clinical support |

## 24 · Summary report (Free) — `SummaryReportScreen.tsx`
Auto-generated for every signed-up user. 30-day timeline view, plain-English health summary, all uploaded records visible, PDF export. No payment.

## 25 · Health Insights report ($2) — `HealthInsightsReportScreen.tsx`
Per-report analysis with trends, flags, and answers linked to sources across the user's records. Unlocks 10 voice or text queries against the report. Lifetime timeline. PDF + FHIR R4 export. The paywall routes through the **native payment sheet** (27); the report generates in under 30 seconds, then opens automatically here.

## 26 · Quiet Second Opinion report ($4) — `SecondOpinionReportScreen.tsx`
Clinical-grade output with symptomatic history mapping and clinical reasoning logs. "Nobody knows you ran it" framing. Routes through the native payment sheet, then opens automatically. The most expensive screen in the app: design must communicate clinical seriousness without medical jargon.

## 27 · Payment sheet — `PaymentSheetScreen.tsx`
**Native Apple Pay or Google Pay sheet, not a custom screen.** The stub stands in during scaffolding. Triggered before screen 25 or 26 generates. On success the receipt lands in Profile · Billing (35), and the report generates then opens.

The showcase stub has phases `idle → (card) → processing → success`, mirroring the web sheet. **Pay** opens an inline **card-details** form (cardholder name, card number, expiry, CVC; basic completeness validation, nothing charged); **Pay with Google Pay** is an instant wallet path that skips the form. Each path records the purchase via `purchaseReport(tier, method)` (method `card` | `google` | `apple`) before processing. When the real native sheet is wired (StoreKit / Google Play Billing), it replaces this stub entirely. On success the sheet **replaces** itself with the report so Back returns to the hub, not to the transient success screen.

## After purchase
The report opens automatically. Re-opening a past report from Receipts & billing (35) is always free. Source pills inside every paid report open the [Source sheet](sourcesheet.md) (18).

## Native dependencies
StoreKit (iOS) / Google Play Billing (Android) or a payment SDK for the native sheet. FHIR R4 export builder for paid tiers (see [share.md](share.md)).

## States
Payment failure → clear retry path, no charge. See [states.md](states.md).
