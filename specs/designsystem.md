# Design System Spec, One Visual Language (Native)

**Applies to:** every screen and every component in the app.
**Status:** Foundational. Read before building any UI.
**Source of truth:** `MetacuraWeb/specs/app/designsystem.md`, `MetacuraWeb/src/styles/tokens.ts`, and the live web app. This file is the **native translation** of that system; the brand values are identical, only the implementation changes.
**Implemented in:** [src/theme/](../src/theme) (tokens + `ThemeProvider` + `useTheme`) and [src/components/](../src/components) (shared primitives).

---

> **The mobile app inherits the web's exact visual language.** Same fonts, same teal palette, same gradients, same eyebrow, same cards, same source pills, same motion feel. A user moving from metacura.com to the app should feel zero seam.
>
> **Quality bar: world-class UI.** Quiet, premium, boutique-medical. Generous whitespace, precise type hierarchy, layered soft shadows for depth, teal as a sparing accent (not a flood), and crisp 60fps interactions. Every screen has one clear primary action. Type does the work, decoration does not.

## How to consume the theme

```ts
import { useTheme } from '../theme';

function Example() {
  const t = useTheme();
  return <Text style={[t.text.h1, { color: t.colors.text }]}>Hi</Text>;
}
```

`useTheme()` returns the active `Theme` (light or dark, driven by `useColorScheme()`): `colors`, `spacing`, `radius`, `shadows`, `fonts`, `fontSize`, `lineHeight`, `letterSpacing`, and ready-made `text` styles. Never hardcode a hex value in a screen; pull from `t.colors`.

## Typography

Three bundled fonts (Google fonts shipped as `.ttf`, see [src/assets/fonts](../src/assets/fonts/README.md)), plus system mono. Family names live in [src/theme/typography.ts](../src/theme/typography.ts).

| Role | Family token | Font | Use |
| --- | --- | --- | --- |
| Body / UI | `fonts.body` (Inter-Regular) | Inter | paragraphs, labels, inputs, table cells |
| Headlines | `fonts.heading` (Outfit-Medium / SemiBold / Bold) | Outfit | screen titles, card titles, section headlines |
| Brand / accent | `fonts.brand` (Syne-Bold) | Syne | the MetaCura wordmark, occasional numeric stat |
| Data / values | `fonts.mono` (system mono) | mono | lab values, MyCare ID, source-document lines |

Type scale (px, in `textStyles`): `display` 40, `h1` 30, `h2` 24, `cardTitle` 20, `body` 16, `bodyLg` 18, `secondary` 14, `eyebrow` 10 uppercase with wide letter-spacing. Headlines use tight letter-spacing and medium-to-bold weight. Body copy uses the muted text color for longer passages.

## Color palette

The teal / emerald / cyan brand scale, anchored by the web tokens. Hex values must match `MetacuraWeb/src/styles/tokens.ts` exactly. Defined in [src/theme/colors.ts](../src/theme/colors.ts).

| Token | Light value | Tailwind anchor | Use |
| --- | --- | --- | --- |
| Primary dark | `#134E4A` | teal-900 | deep accents, gradient dark stop |
| Primary medium | `#0D9488` | teal-600 | primary buttons, links, active states |
| Accent teal | `#14B8A6` | teal-500 | focus rings, the eyebrow dot |
| Accent cyan | `#5EEAD4` | cyan-300 | gradient light stop, ambient |
| Success | `#10B981` | emerald-500 | positive deltas |
| Warning | `#F59E0B` | amber-500 | Low flag |
| Error | `#EF4444` | red-500 | High flag |
| Neutral bg | `#F0FDFA` | teal-50 | tinted surfaces |
| Text | `#111827` | gray-900 | primary text |
| Muted | `#6B7280` | gray-500 | secondary text |

**Status / flag colors (keep exactly):** High = `#EF4444` on `#FEF2F2`, Low = `#F59E0B` on `#FFFBEB`, Normal = `#0D9488` on `#F0FDFA`. Implemented as [`<StatusPill status="high|low|normal" />`](../src/components/StatusPill.tsx). Flags are measured against the user's **own history**, not generic reference ranges.

## Signature gradients and surfaces

- **Primary button / pill:** teal→cyan gradient via `react-native-linear-gradient` (`[t.colors.gradientStart, t.colors.gradientEnd]`), white bold text, `borderRadius: radius.pill`, soft teal glow (`shadows.button`), press scale `0.98`. Implemented in [Button.tsx](../src/components/Button.tsx) (`variant="primary"`).
- **Cards:** white (near-black in dark), 1px hairline border (`colors.border`), `radius.xl`, soft `shadows.sm`. Implemented in [Card.tsx](../src/components/Card.tsx). Restraint over decoration, do not stack gradients on data screens.
- **Eyebrow:** the shared label capsule, a pill with a teal dot and an uppercase wide-tracked label. Implemented in [SectionEyebrow.tsx](../src/components/SectionEyebrow.tsx). Reuse it; do not invent ad-hoc pill markup.
- **Source pill:** [`<Badge variant="source" onPress={openSourceSheet} />`](../src/components/Badge.tsx). Anywhere a claim is made, the source is a tappable pill that opens the Source sheet to the original line. This is the product's visual signature.
- **Ambient background (hero / landing tabs only):** white base with one or two large blurred teal blobs, low opacity, non-interactive. Never on data-dense detail screens.

## Shadows

iOS uses `shadowColor / shadowOffset / shadowOpacity / shadowRadius`; Android uses `elevation`. Both are bundled per token in [src/theme/shadows.ts](../src/theme/shadows.ts): `sm` (subtle card), `md`, `lg`, `button` (teal glow under the primary action), `glass` (hero lift). Spread them: `style={[base, t.shadows.md]}`. Soft layered depth, never hard lines or heavy drop shadows.

## Motion

- Use **`react-native-reanimated`** (and `react-native-gesture-handler` for gesture-driven sheets) for all interactive motion. The babel plugin is already configured.
- Match the web feel: entrance fades with a small upward translate, press scale to `0.98`, the premium cubic ease. Durations 200-500ms for micro-interactions.
- Respect the OS "reduce motion" setting. Target 60fps; never animate layout-thrashing properties. The Source sheet open is the one interaction that must feel instant.

## Light and dark mode

- Light is the default, matching the web exactly. Health data benefits from a calm light surface.
- Dark mode **follows the OS setting** (`useColorScheme()` in [ThemeProvider.tsx](../src/theme/ThemeProvider.tsx)) and **shifts the same palette**, it does not introduce new hues: white cards become near-black surfaces, `gray-900` text becomes `gray-100`, teal is brightened (`teal-400`/`teal-300`) for contrast. Every component reads from `t.colors`, so dark mode is automatic.

## Native surfaces (use the OS, do not rebuild)

Per the brief, these are native sheets, never custom screens:

| Surface | Native API | Library (prescribed) |
| --- | --- | --- |
| Payment | Apple Pay / Google Pay | StoreKit / Google Pay IAP or a payment SDK |
| Share / export destination | iOS / Android share sheet | `react-native-share` |
| File / document picker | Files / SAF picker | `@react-native-documents/picker` |
| Camera (document scan) | native camera + edge detect | `react-native-vision-camera` |
| Photo library | native picker | `react-native-image-picker` |
| Biometric login | FaceID / fingerprint | a biometrics lib |
| Voice capture / STT | native mic + speech | a speech-to-text lib |
| Source document viewer | native PDF / image | `react-native-pdf` for the Source sheet |

These are documented here as the prescribed stack; only the navigation + animation core is installed in the scaffold (see [navigation.md](navigation.md)). Add each feature library when its module is built.

## World-class UI checklist (apply per screen)

- One clear primary action; everything else is quieter.
- Consistent spacing rhythm using the `spacing` scale (cards `spacing[6]`, screen padding `spacing[5]`).
- Depth through layered soft shadows and hairline borders, never hard lines.
- Teal accent appears in only a few places per screen (primary action, active tab, one gradient accent).
- Crisp empty / loading / error states (see [states.md](states.md)), never a blank screen.
- Accessible: `accessibilityRole` / `accessibilityLabel` on icon buttons, visible focus, 4.5:1 contrast minimum, respects Dynamic Type where feasible.
- Safe-area aware on every screen (notch, home indicator, status bar). Use `useSafeAreaInsets()`.

## Copy invariants

- No em-dash (U+2014); use commas, periods, or `·`.
- Never "cited"; use "linked" / "with sources".
- Teal is accent, not flood. Do not introduce non-brand hues.
