# Navigation Spec

**Library:** React Navigation 7 (`@react-navigation/native`, `native-stack`, `bottom-tabs`).
**Implemented in:** [src/navigation/](../src/navigation). Route names + param types in [routes.ts](../src/navigation/routes.ts).

---

## The tree

```
NavigationContainer (App.tsx, themed by useColorScheme)
└─ RootNavigator (native-stack)            src/navigation/RootNavigator.tsx
   ├─ Auth   → AuthNavigator               (pre-auth, onboarding, public demo)
   ├─ App    → AppTabs                      (the authenticated product)
   └─ modal group (presentation: 'modal'):
        SourceSheet (18) · ReportsHub (23) · SummaryReport (24)
        HealthInsightsReport (25) · SecondOpinionReport (26) · PaymentSheet (27)
```

### AuthNavigator (native-stack) — `AuthNavigator.tsx`

`Splash` → `Welcome` → `SignUp` → `VerifyEmail` → `ProfileSetup`, plus `Login`, `ForgotPassword`, `ResetPassword`, and the public demo `DemoIntro` → `DemoPlayback`. Header hidden throughout (custom headers per screen). On successful auth, reset the root to `App`.

### AppTabs (bottom-tabs) — `AppTabs.tsx`

Five tabs, each its own native-stack so detail screens push within the tab:

| Tab route | Stack | Screens |
| --- | --- | --- |
| `HomeTab` | HomeStack | `HomeDashboard` (11) |
| `RecordsTab` | RecordsStack | `RecordsTimeline` (16), `RecordDetail` (17), `RecordsEmpty` (19), and the Upload flow `UploadEntry` (12) → `CameraScanner` (13) → `UploadProgress` (14) → `ClassifyConfirm` (15) |
| `AskTab` | AskStack | `AskLanding` (20), `VoiceQuery` (21), `AnswerDetail` (22) |
| `ReportsTab` | ReportsStack | `ReportsHubTab` (23) — the Reports hub as a primary tab; the report + payment screens themselves stay root-level modals (below) |
| `ProfileTab` | ProfileStack | `Profile` (31), `FamilyDependents` (32), `FamilyMemberDetail` (32a, param `dependentId`), `ProfileSwitcher` (33), `PrivacyData` (34), `ReceiptsBilling` (35), plus share/export/audit `ShareWithClinician` (28), `ExportData` (29), `AuditTrail` (30) |

A **FloatingMic** overlay sits above the tab bar on every tab and routes to `AskTab → VoiceQuery` (voice is a peer to text).

### Cross-tab screens (root level)

Screens reached from more than one tab are mounted on the root stack so they sit above the current tab:

- **SourceSheet (18)** — the signature interaction, the one true slide-up **modal** (`presentation: 'modal'`; upgrade to a true detents sheet with `formSheet`/a sheet lib). Opened from `RecordDetail`, `AnswerDetail`, and any source pill. Params: `{ recordId, line? }`.
- **Reports hub + reports (23-26)** — **full-page pushes** (default card presentation), reached from Home, Family detail, and the Reports tab. Each is a standard `Screen` with a `ScreenHeader` back link.
- **PaymentSheet (27)** — also a **full-page push** (not a slide-up sheet), placeholder for the native Apple Pay / Google Pay sheet; triggered before a paid report generates. Phases `idle → card → processing → success`. Params: `{ tier }`.

## Back navigation

Native stack headers are hidden everywhere (`headerShown: false`), so every non-root screen carries its own in-content **back affordance** at the top, so you can always go back easily:

- **[BackLink](../src/components/BackLink.tsx)** is the shared `‹ Back` control. It self-wires to navigation: on press it pops the current screen, and it renders **nothing** when there is nowhere to go back (a tab root such as `HomeDashboard`, `RecordsTimeline`, `AskLanding`, `Profile`), so it is safe to drop at the top of any screen.
- **[ScreenHeader](../src/components/ScreenHeader.tsx)** renders a `BackLink` automatically. Screens that pass `onBack` keep their explicit handler; screens that omit it now get a back link whenever navigation can go back. Pass `hideBack` to suppress it.
- Slide-up sheet screens (`SourceSheet`, `AnswerDetail`, `ProfileSwitcher`) use the **[Sheet](../src/components/Sheet.tsx)** close button or `VoiceQuery`'s `✕` cancel instead of a back link. The Reports + payment screens (23-27) are full pages and use the standard `ScreenHeader` back link.

## Route param contract

All param lists are typed in [routes.ts](../src/navigation/routes.ts). Notable params: `SignUp { plan? }`, `VerifyEmail { email }`, `RecordDetail { recordId }`, `SourceSheet { recordId, line? }`, `PaymentSheet { tier: 'insights' | 'opinion' }`. Keep these in sync with screens when wiring real data.

## Auth gating (to wire)

Auth state is not implemented in the scaffold; `RootNavigator` boots into `Auth`. When auth lands, add an `AuthContext` that decides `Auth` vs `App` at the root and exposes the multi-profile MyCare switcher (Profile switcher, 33). While building a single screen, you can temporarily set `initialRouteName="App"` in `RootNavigator` to skip onboarding.

## Deep links (later)

`ResetPassword` is reached via a deep link from the reset email; configure a linking config on `NavigationContainer` when auth is real. Share links (28) open in a browser, not in-app.
