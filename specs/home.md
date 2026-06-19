# Home Spec (Module C, screen 11)

**Priority:** P0. **Screen:** [src/screens/home/HomeDashboardScreen.tsx](../src/screens/home/HomeDashboardScreen.tsx). **Tab:** Home.

A quiet, factual surface. **No wellness scoring, no gamification.**

---

## 11 · Home dashboard

Top to bottom:
- **MyCare ID card** — a compact, premium teal membership card: an identity row (avatar tile, "MYCARE ID" eyebrow with a verified badge, name, the MyCare ID in mono) with an **ACTIVE** status chip top-right, a hairline divider, then a footer pairing "Member since {date}" on the left with the total **records count** on the right. A faint activity watermark and soft blobs give depth. Tapping the avatar opens the **Profile switcher** (33); the current profile's name + avatar stay persistently visible so the user always knows whose record they are viewing.
- **Stat tiles** — a 2×2 grid of compact crystal `GlassCard` tiles (Records, Health Score, Flagged, Reports), each with an icon chip, a value, a label, an uppercase footer caption, and a quiet delta chip where relevant. `compact` mode keeps the tiles dense.
- **Recent records** — the last three documents added, each a softly raised row tappable through to its detail screen (17).
- **Reports ready** card — visible only when a generated report exists; hidden otherwise. A teal-tinted row (lab icon, "REPORT READY" eyebrow, "Your Health Summary", a one-line value) that opens the Reports hub (23).
- **Floating microphone** (shell-level) bottom-right for a global voice query.

The bottom tab bar is present (shell). Use the eyebrow + headline + value-line header pattern from the design system, then white cards with hairline borders. Keep teal to the MyCare ID card accent and the primary action only.

## Entry points out of Home
- A record card → `RecordDetail` (17).
- The Reports-ready card or a "View reports" affordance → `ReportsHub` (23).
- The avatar → `ProfileSwitcher` (33).

## States
- **First run / zero records:** the recent-records block becomes a gentle prompt to upload the first document (mirrors the Records empty state, 19). The Reports-ready card stays hidden. See [states.md](states.md).
