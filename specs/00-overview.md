# MetaCura Mobile App, Overview & Spec Index

**Platform:** React Native 0.86 (iOS + Android), TypeScript.
**Status:** Planned, v1.0. Spec-first build. Scaffold in place (`src/`), screens are themed stubs to be filled in spec by spec.
**Source brief:** `MetaCura_New.pdf` (35 screens, 9 modules). This spec set is the **native** adaptation of that brief.
**Design source of truth:** `MetacuraWeb` (the marketing + web-app codebase). The mobile app inherits its exact colors, fonts, spacing, and motion conventions. See [designsystem.md](designsystem.md).

---

> **One product, one visual language.** MetaCura ships as a website, a responsive web app, and this native mobile app. They share one brand: the same teal palette, the same fonts (Inter / Outfit / Syne), the same source-pill pattern, the same quiet boutique-medical feel. The mobile app does **not** invent a new theme. We translate only the implementation (Tailwind → React Native StyleSheet, framer-motion → Reanimated, Next routes → React Navigation), never the brand.
>
> **The brief was written for native.** `MetacuraWeb/specs/app/*` adapted the same PDF to a responsive web app. This folder takes the brief back to its native home: camera-first capture, native payment / share / file-picker sheets, biometric login, bundled fonts, and a real bottom tab bar.

## The four tabs

Present on every authenticated screen, plus a floating microphone that opens a voice query from any tab.

| Tab | Stack route | Purpose | Brief module |
| --- | --- | --- | --- |
| Home | `HomeTab` | MyCare ID card, recent records, reports-ready card | C (11) |
| Records | `RecordsTab` | Timeline, record detail, the Source sheet, and the Upload flow | E (16-19), D (12-15) |
| Ask Doctor | `AskTab` | Persistent conversation, voice query, answers linked to sources | F (20-22) |
| Profile | `ProfileTab` | Profile, family, privacy, receipts, share / export / audit | I (31-35), H (28-30) |

The **Reports hub** (Module G) and the **Source sheet** (18) are modal screens reached from multiple tabs. See [navigation.md](navigation.md).

## The three commercial tiers (pay-as-you-go, no subscription)

| Tier | Price | Record inputs | Timeline | What it adds |
| --- | --- | --- | --- | --- |
| Summary | Free forever | Up to 50 | 30 days | Auto-generated for every account. Plain-English summary. PDF export. |
| Health Insights | $2 per report | Up to 75 | Full lifetime | Trends, answers linked to sources, 10 voice or text queries, PDF + FHIR R4. |
| Quiet Second Opinion | $4 per report | Unlimited | Full lifetime | Clinical-grade analysis, symptomatic history mapping, reasoning logs, priority clinical support. |

No subscription, no auto-renewal, no annual lock-in. Pricing appears only in the in-app Reports hub. Re-opening a purchased report is always free. See [reports.md](reports.md) and [billing.md](billing.md).

## The signature interaction

**Tap any flagged value or any source pill, the original document opens to the exact line that produced the answer, with that line highlighted.** This single behavior is the product's entire trust claim. It is one reusable screen, the **Source sheet** (18, see [sourcesheet.md](sourcesheet.md)), reached from record detail (17), Ask Doctor answers (20 / 22), and anywhere a claim is shown. It must feel instant.

## The master journey

```
Splash (01)
  → Welcome carousel (02)
      ├─ Sign Up (03) → Verify email (04) → Profile setup (08) ─┐
      ├─ Log In (05) ───────────────────────────────────────────┤
      └─ Try Lab Demo (09 → 10) → Sign-up CTA ───────────────────┤
                                                                  ▼
                                              Home (11), free Summary active
                                              ├─ four bottom tabs
                                              └─ Reports hub (23) → native payment (27)
                                                   → report ready (25 / 26)
                                                   → Share (28) / Export (29) / Audit (30)
```

The free tier needs no payment and no paywall on entry. Paid tiers are chosen later, inside the Reports hub.

## Spec index

| Spec | Covers | Brief module |
| --- | --- | --- |
| [designsystem.md](designsystem.md) | **The one visual language in native terms**: theme tokens, fonts, gradients, eyebrow, cards, source pills, motion, dark mode, native sheets, world-class UI bar | foundational |
| [navigation.md](navigation.md) | The React Navigation tree, route names, where modals mount | shell |
| [appshell.md](appshell.md) | The 4-tab bar, floating mic, safe-area, light + dark | shell |
| [onboarding.md](onboarding.md) | Splash, Welcome, Sign Up, Verify OTP, Log In, Forgot, Reset, Profile setup | A (1-8) |
| [demo.md](demo.md) | Public lab demo intro + playback | B (9-10) |
| [home.md](home.md) | Home dashboard | C (11) |
| [upload.md](upload.md) | Upload entry, camera scanner, progress, auto-classified confirmation | D (12-15) |
| [records.md](records.md) | Records timeline, record detail, empty state | E (16, 17, 19) |
| [sourcesheet.md](sourcesheet.md) | The signature Source sheet | E/F (18, 22) |
| [askdoctor.md](askdoctor.md) | Ask landing, voice query, answer detail | F (20-22) |
| [reports.md](reports.md) | Reports hub, the 3 report screens, native payment | G (23-27) |
| [billing.md](billing.md) | Receipts & billing, no-subscription rule | G/I (27, 35) |
| [profile.md](profile.md) | Profile, family & dependents, switcher, privacy & data | I (31-35) |
| [share.md](share.md) | Share with clinician, export, audit trail | H (28-30) |
| [states.md](states.md) | Empty / error states, the P2 list | P2 |

## Build sequence (from brief §5)

- **P0, blocks launch:** A onboarding (1-8), B demo (9-10), C Home (11), D Upload (12-15), E Records incl. **Source sheet 18**, F Ask Doctor (20-22), G Reports & pricing (23-27).
- **P1, credibility:** H Share / export / audit (28-30), I Profile incl. Family (32) and Switcher (33).
- **P2, empty & error states (design upfront):** empty Records (19), empty Ask Doctor, upload failure / unreadable scan, payment failure, camera permission denied (fall back to photo library), network offline (queued uploads, sync-on-reconnect badge), account-delete confirmation (30-day commitment). See [states.md](states.md).

## Lexicon invariants (apply to every screen and every spec)

- No em-dash (U+2014) anywhere in visible copy. Use commas, periods, or the middle dot `·`.
- Never the word "cited". Use "linked", "with sources", or "linked to the original". The data field may keep a name like `citations`; no UI text says "cited".
- The single conversion verb is **"Get your MyCare ID · Free"** / "Get started free". No "early access", "beta", "waitlist", or "invite only".
- One person, one MyCare ID. Dependents are independent peers (each its own MyCare ID and login). One email or phone can host many MyCare IDs.
- No proactive push, email, or SMS alerts in v1. In-record flags (High / Low / Normal) are reactive only, shown when the user opens a record.
- Pay-as-you-go. No subscription, auto-renewal, or recurring-charge language.
- Teal is an accent, not a flood. Do not introduce non-brand hues.
