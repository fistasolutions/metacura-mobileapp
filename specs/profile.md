# Profile Spec (Module I, screens 31-35)

**Priority:** P1. **Screens:** [src/screens/profile/](../src/screens/profile). **Tab:** Profile.

Billing (35) is detailed in [billing.md](billing.md); share/export/audit (28-30) in [share.md](share.md).

---

## 31 · Profile — `ProfileScreen.tsx`
Profile card: the user's name, MyCare ID number, member-since date, and total records imported. Sections below: **Family & dependents · Privacy & data · Receipts & billing · Help · Sign out.**

## 32 · Family & dependents — `FamilyDependentsScreen.tsx`
A list of separate **MyCare IDs** under this household, each with its own records, history, and privacy. Add **child, parent, or patient**. Each dependent has **independent login credentials**. One email or phone can host many MyCare IDs; dependents are independent peers, not nested relations. **Tapping a dependent opens their detail screen (32a)**, passing `dependentId`.

## 32a · Family member detail — `FamilyMemberDetailScreen.tsx`
The managed-member overview for one dependent, mirroring the web `DependentDashboard`. Header reads "Managing · {name}". Sections:
- **Identity card**: avatar, relationship badge, proxy-access note, MyCare ID, added date, and managed vs independent login state. Primary action **Switch profile** (→ 33) plus **Remove** (opens a remove-from-household confirmation; the MyCare ID and records are not deleted).
- **Privacy controls**: tappable Records · Visits · Meds · Labs · Login tiles toggling proxy access per category.
- **Emergency snapshot**: blood type, allergies, and the primary contact.
- **Latest insight**: most recent AI insight with a **View full report** link (→ Reports hub).
- **Data composition**: clinical notes, lab results, imaging, and prescription counts with normal/low/high flags.
- **Delegated access**: people with shared access (co-parent, school nurse, etc.), permanent or temporary.

Backed by `DEPENDENTS` (the selected member) and `DEPENDENT_DETAIL` sample content in [src/data/profile.ts](../src/data/profile.ts). Reuses the household invariant: one person, one MyCare ID; dependents are independent peers.

## 33 · Profile switcher — `ProfileSwitcherScreen.tsx`
Reached by tapping the avatar at the top of Home (11). Switches between the user's own MyCare ID and any dependent's. The current profile name and avatar stay persistently visible in the Home header so the user always knows whose record they are viewing. Backed by the `AuthContext` multi-profile state (see [navigation.md](navigation.md#auth-gating-to-wire)).

## 34 · Privacy & data — `PrivacyDataScreen.tsx`
- **Export all data** button (one tap) → the export flow (29).
- **Delete account** button (one tap) with a confirmation showing the **30-day permanent-removal commitment**.
- Security toggles: **FaceID**, **two-factor authentication**.
- A **"Your data, never trained on"** reaffirmation panel.
- The **dark-mode** behavior follows the OS; if a manual override is added later, its toggle lives here.

## 35 · Receipts & billing — `ReceiptsBillingScreen.tsx`
See [billing.md](billing.md).

## Native dependencies
Biometrics library (FaceID toggle), and the native share sheet for data export (see [share.md](share.md)).

## States
Account-delete confirmation must display the 30-day commitment. Empty family list → prompt to add a dependent. See [states.md](states.md).
