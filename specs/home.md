# Home Spec (Module C, screen 11)

**Priority:** P0. **Screen:** [src/screens/home/HomeDashboardScreen.tsx](../src/screens/home/HomeDashboardScreen.tsx). **Tab:** Home.

A quiet, factual surface. **No wellness scoring, no gamification.**

---

## 11 · Home dashboard

Top to bottom:
- **MyCare ID card** — the user's name, member-since date, and MyCare ID. Tapping the avatar opens the **Profile switcher** (33), and the current profile's name + avatar stay persistently visible here so the user always knows whose record they are viewing.
- **Recent records** — the last three documents added, each tappable through to its detail screen (17).
- **Reports ready** card — visible only when a generated report exists; hidden otherwise. Tapping opens the report.
- **Floating microphone** (shell-level) bottom-right for a global voice query.

The bottom tab bar is present (shell). Use the eyebrow + headline + value-line header pattern from the design system, then white cards with hairline borders. Keep teal to the MyCare ID card accent and the primary action only.

## Entry points out of Home
- A record card → `RecordDetail` (17).
- The Reports-ready card or a "View reports" affordance → `ReportsHub` (23).
- The avatar → `ProfileSwitcher` (33).

## States
- **First run / zero records:** the recent-records block becomes a gentle prompt to upload the first document (mirrors the Records empty state, 19). The Reports-ready card stays hidden. See [states.md](states.md).
