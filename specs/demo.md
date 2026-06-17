# Public Lab Demo Spec (Module B, screens 09-10)

**Priority:** P0. **Screens:** [src/screens/demo/](../src/screens/demo). **Stack:** `AuthNavigator` (no account required).

The website's most distinctive entry point and the source of App Store / Play Store listing screenshots. Reachable from the Welcome carousel without signing up.

---

## 09 · Demo intro — `DemoIntroScreen.tsx`
"Watch a sample lab read in plain English." Big play button. Quiet brand surface. These screens double as the store listing shots, so they must look complete and polished even though no real data is involved.

## 10 · Demo playback — `DemoPlaybackScreen.tsx`
An animated sequence (Reanimated):
1. A sample lab file arrives.
2. MetaCura reads it.
3. The document opens and individual values flag **High / Low / Normal**.
4. Tap any row to hear that value explained.

End CTA: **"Get your MyCare ID · Free"**, routing to Sign Up (03). This is the demo's single conversion action.

The demo uses canned sample data only; nothing is uploaded or stored. The flag colors and the tap-a-row-to-explain interaction preview the real Source sheet (18), so reuse [StatusPill](../src/components/StatusPill.tsx) and the source-pill pattern for consistency.
