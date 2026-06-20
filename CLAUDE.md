# CLAUDE.md — MetaCura Mobile App, Project Guide & Rules

The guide for this React Native app: how it is built, how specs stay in sync, and the design and copy rules every screen must follow.

## The Sync Rule (CRITICAL)

This project follows **Spec-Driven Development**. The `.md` files in [specs/](specs/) are the source of truth for screens, UI, flows, and behavior.

Whenever any behavior, UI element, prompt, or flow changes via a user request:
1. **Identify the relevant spec** in `specs/` (e.g. `home.md`, `reports.md`, `sourcesheet.md`).
2. **Update the spec FIRST**, or in the same turn as the code change.
3. **Verbatim prompts:** if an LLM prompt or system message changes in code, update the spec to match exactly.
4. **UI / logic:** if a route, validation rule, or layout changes, the spec narrative must reflect the current state.
5. **If no matching spec exists:** create a new `.md` in `specs/` documenting the feature.
6. **Never leave specs out of sync.** Code and specs change in the same turn.

### Rule for the AI
If you are asked to "change a prompt", "update a feature", or "add a screen" via chat, you are **bound by this protocol** to find the matching spec in [specs/](specs/) and update it in the same turn. If the matching spec does not exist, create a new `.md` that accurately documents the new feature or behavior. Code and specs MUST change together.

## One visual language

The design source of truth is [specs/designsystem.md](specs/designsystem.md). Do **not** introduce a new theme, new fonts, or non-brand hues. Pull every color/size/spacing/radius/font value from the theme via `useTheme()` ([src/theme](src/theme)); never hardcode a hex in a screen (translucent white/black overlays on gradients are the only acceptable literals). Bundled brand assets live in [src/assets](src/assets) (e.g. the logo, [src/assets/images/logo.png](src/assets/images/logo.png)).

## Technical commands

- **Start Metro:** `npm start`
- **Run Android:** `npm run android` (requires `ANDROID_HOME`; an emulator must be running)
- **Run iOS:** `npm run ios` (run `cd ios && pod install` first after adding native deps)
- **Lint:** `npm run lint`
- **Types:** `npx tsc --noEmit`
- **Test:** `npm test`
- **Link bundled fonts:** drop `.ttf` into `src/assets/fonts`, then `npx react-native-asset` (see [src/assets/fonts/README.md](src/assets/fonts/README.md))

## Stack & conventions

- **Framework:** React Native 0.86, React 19, TypeScript.
- **Navigation:** React Navigation 7 (native-stack + bottom-tabs). Tree and route types in [src/navigation](src/navigation). See [specs/navigation.md](specs/navigation.md).
- **Styling:** React Native `StyleSheet` + theme tokens from [src/theme](src/theme). No hardcoded colors.
- **Animation:** `react-native-reanimated` (+ `react-native-gesture-handler` for sheets/drags). Babel plugin already configured.
- **Gradients:** `react-native-linear-gradient`.
- **Structure:** `src/theme`, `src/components` (shared primitives, barrel-exported), `src/navigation`, `src/data`, `src/screens/<module>` (one file per screen).
- **Components:** functional components with TypeScript. Reuse the shared primitives ([Button](src/components/Button.tsx), [Badge](src/components/Badge.tsx), [Card](src/components/Card.tsx), [GlassCard](src/components/GlassCard.tsx), [SectionEyebrow](src/components/SectionEyebrow.tsx), [StatusPill](src/components/StatusPill.tsx), [OtpInput](src/components/OtpInput.tsx), [BackLink](src/components/BackLink.tsx), [FloatingMic](src/components/FloatingMic.tsx)); do not re-style them ad hoc.

## Coding standards & data

- **Barrel exports:** shared modules export through an `index.ts` ([src/components](src/components/index.ts), [src/data](src/data/index.ts), [src/theme](src/theme/index.ts)). Import from the barrel, not deep paths.
- **Single source of types:** all domain types live in [src/data/types.ts](src/data/types.ts). Do not redeclare record / report / profile shapes per screen.
- **No hardcoded UI strings or mock data in screens:** copy, suggested prompts, and sample records live in [src/data](src/data) (`content.ts`, `records.ts`, `profile.ts`, ...). Screens compose from data + theme; they don't inline content.
- **No hardcoded colors / sizes:** pull every hue, space, radius, and font from `useTheme()`.
- **Done means green:** `npx tsc --noEmit` and `npm run lint` must pass before a change is considered complete.

## Native surfaces (do not rebuild)

Payment, share, file picker, camera, photo library, and biometrics are **native sheets**. See the table in [specs/designsystem.md](specs/designsystem.md#native-surfaces-use-the-os-do-not-rebuild). Only the navigation + animation core is installed in the scaffold; add each feature library when its module is built.

## Design & product principles

- Quiet and considered. Plenty of whitespace. **One primary action per screen.** Type does the work, decoration does not.
- Teal as accent, not flood. Cards are white or near-white.
- **Trust is the product.** Source pills everywhere a claim is made; they open the [Source sheet](specs/sourcesheet.md), the app's entire trust claim. Surface security, encryption, and data ownership where claims appear.
- **Outcome-focused copy.** Say what the user gets ("every answer linked to its source"), not how it works ("AI / OCR / LLM reads your PDF").
- The core spine stays **Upload → Understand → Ask**.
- Voice is a peer to text (the FloatingMic on every authenticated screen).
- Light mode default, dark mode follows the OS.

## UI/UX principles

- **Motion:** `react-native-reanimated` for entry, press, and loading loops; `react-native-gesture-handler` for drags and sheets. Subtle and purposeful, never decorative noise.
- **Visuals:** no raw placeholders in built screens; compose real-feeling mocks from the shared primitives and theme.
- **Hierarchy & a11y:** clear type hierarchy from the theme scale; every interactive element has an `accessibilityRole` and label; respect safe-area insets.
- **Density:** considered compaction, but readability first, this is health data.

## Lexicon invariants (apply to every screen)

- No em-dash (U+2014). Use commas, periods, or the middle dot `·`.
- Never the word "cited" in visible copy. Use "linked" / "with sources".
- Pay-as-you-go. No subscription, auto-renewal, or recurring-charge language.
- The single conversion verb is "Get your MyCare ID · Free".
- One person, one MyCare ID; dependents are independent peers.
- No proactive push / email / SMS alerts in v1. In-record flags are reactive only.
