# CLAUDE.md — MetaCura Mobile App, Project Guide & Rules

## The Sync Rule (CRITICAL)

This project follows **Spec-Driven Development**. The `.md` files in [specs/](specs/) are the source of truth for screens, UI, flows, and behavior.

Whenever any behavior, UI element, prompt, or flow changes via a user request:
1. **Identify the relevant spec** in `specs/` (e.g. `home.md`, `reports.md`, `sourcesheet.md`).
2. **Update the spec FIRST**, or in the same turn as the code change.
3. **Verbatim prompts:** if an LLM prompt or system message changes in code, update the spec to match exactly.
4. **UI / logic:** if a route, validation rule, or layout changes, the spec narrative must reflect the current state.
5. **If no matching spec exists:** create a new `.md` in `specs/` documenting the feature.
6. **Never leave specs out of sync.** Code and specs change in the same turn.

## One visual language

This app shares one brand with `MetacuraWeb` (the website + web app). The design source of truth is [specs/designsystem.md](specs/designsystem.md), itself a native translation of `MetacuraWeb/specs/app/designsystem.md`. Do **not** introduce a new theme, new fonts, or non-brand hues. Pull every color/size/spacing value from the theme via `useTheme()` ([src/theme](src/theme)); never hardcode a hex in a screen.

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
- **Animation:** `react-native-reanimated` (+ `react-native-gesture-handler` for sheets). Babel plugin already configured.
- **Gradients:** `react-native-linear-gradient`.
- **Structure:** `src/theme`, `src/components` (shared primitives, barrel-exported), `src/navigation`, `src/screens/<module>` (one file per screen).
- **Components:** functional components with TypeScript. Reuse the shared primitives ([Button](src/components/Button.tsx), [Badge](src/components/Badge.tsx), [Card](src/components/Card.tsx), [SectionEyebrow](src/components/SectionEyebrow.tsx), [StatusPill](src/components/StatusPill.tsx), [FloatingMic](src/components/FloatingMic.tsx)); do not re-style them ad hoc.

## Native surfaces (do not rebuild)

Payment, share, file picker, camera, photo library, and biometrics are **native sheets**. See the table in [specs/designsystem.md](specs/designsystem.md#native-surfaces-use-the-os-do-not-rebuild). Only the navigation + animation core is installed in the scaffold; add each feature library when its module is built.

## Design & product principles

- Quiet and considered. Plenty of whitespace. One primary action per screen. Type does the work, decoration does not.
- Teal as accent, not flood. Cards are white or near-white.
- Source pills everywhere a claim is made; they open the [Source sheet](specs/sourcesheet.md), the product's entire trust claim.
- Voice is a peer to text (the FloatingMic on every authenticated screen).
- Light mode default, dark mode follows the OS.

## Lexicon invariants (apply to every screen)

- No em-dash (U+2014). Use commas, periods, or the middle dot `·`.
- Never the word "cited" in visible copy. Use "linked" / "with sources".
- Pay-as-you-go. No subscription, auto-renewal, or recurring-charge language.
- The single conversion verb is "Get your MyCare ID · Free".
- One person, one MyCare ID; dependents are independent peers.
- No proactive push / email / SMS alerts in v1. In-record flags are reactive only.
