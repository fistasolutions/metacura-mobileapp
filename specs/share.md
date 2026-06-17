# Share, Export & Audit Spec (Module H, screens 28-30)

**Priority:** P1. **Screens:** [src/screens/share/](../src/screens/share). **Tab:** Profile (reached from Profile and from a report).

The site promises this explicitly. The audit trail (30) is what differentiates MetaCura's privacy posture from generic cloud storage.

---

## 28 · Share with clinician — `ShareWithClinicianScreen.tsx`
Generate a **time-boxed, revocable, read-only link**. The user picks:
- **Expiry:** 24 hours / 7 days / 30 days.
- **Scope:** all records / specific records / one report only.

The result is a copyable URL the clinician opens in any browser. No clinician account required. Every share is recorded in the audit trail (30).

## 29 · Export — `ExportDataScreen.tsx`
**PDF for all tiers, FHIR R4 for paid tiers.** A selection step: which records, which date range, which format. The resulting file lands in the user's chosen destination (Files app, Drive, email, etc.) via the **native share sheet**.

## 30 · Audit trail — `AuditTrailScreen.tsx`
A log of every shared link: **who accessed** (where identity is known), **when**, **what records they viewed**, and a **revoke** action. Per the promise that every disclosure is logged in an audit trail the user can review.

## Data
A local share store records `{ id, scope, expiry, url, createdAt, revokedAt? }` and access events `{ shareId, accessedAt, viewer?, records[] }`. The audit trail reads from access events; revoke flips `revokedAt` and invalidates the link.

## Native dependencies
`react-native-share` (native share sheet for export destinations), a FHIR R4 export builder for paid tiers, and a PDF builder for all tiers.

## States
No shares yet → empty audit trail explaining that shared links and their access history will appear here. Revoke confirmation. See [states.md](states.md).
