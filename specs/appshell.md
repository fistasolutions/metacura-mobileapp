# App Shell Spec

**Brief module:** shell. **Implemented in:** [src/navigation/AppTabs.tsx](../src/navigation/AppTabs.tsx), [App.tsx](../App.tsx).

---

The shell is the persistent frame around every authenticated screen: the four-tab bottom bar, the floating microphone, safe-area handling, and the light/dark surface.

## Bottom tab bar

Four tabs, always present on authenticated screens: **Home · Records · Ask Doctor · Profile**. Built with `@react-navigation/bottom-tabs`.

- Active tint `colors.primary`, inactive `colors.textMuted`; bar background `colors.surface` with a hairline top border `colors.border`.
- Labels in `fonts.bodyMedium`, 11px. Icons are placeholder glyphs in the scaffold; replace with a proper icon set (e.g. `react-native-vector-icons` or `lucide-react-native`) matching the web's lucide icons at a medium stroke weight.
- The bar respects the home indicator inset automatically.

## Floating microphone

Voice is a peer to text. A circular gradient FAB ([FloatingMic.tsx](../src/components/FloatingMic.tsx)) sits bottom-right above the tab bar and opens `AskTab → VoiceQuery`. It uses the primary teal→cyan gradient and the `shadows.button` glow. Replace the emoji glyph with the mic icon when the icon set is wired.

The FAB is **hidden on the Ask Doctor screens** (`AskLanding`, `VoiceQuery`, `AnswerDetail`) — those already carry their own voice affordance (the chat composer's mic / the voice capture screen), so the global FAB would only overlap the composer's send button. It is also hidden on the immersive `CameraScanner` (where the whole chrome, tab bar included, is hidden).

## Safe area

Every screen reads `useSafeAreaInsets()` (via `react-native-safe-area-context`, already a dependency) and pads for the status bar, notch, and home indicator. The shared [ScreenScaffold](../src/components/ScreenScaffold.tsx) does this for the stubs; real screens should do the same. `StatusBar` is translucent with bar style flipped by color scheme (see [App.tsx](../App.tsx)).

## Light + dark

The shell is theme-driven end to end. `NavigationContainer` is themed from `useColorScheme()` so the navigator chrome (backgrounds, borders) matches the active mode, and every component pulls from `useTheme()`. No per-screen dark handling needed beyond reading `t.colors`.

## What does NOT belong in the shell

- No proactive alert badges, no notification center, no gamified score (per the brief: Home is quiet and factual).
- No persistent search bar in the shell; search lives on the Records timeline (16).
