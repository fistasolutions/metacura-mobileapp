# Public Lab Demo Spec (Module B, screens 09-10)

**Priority:** P0. **Screens:** [src/screens/demo/](../src/screens/demo). **Stack:** `AuthNavigator` (no account required).

The website's most distinctive entry point and the source of App Store / Play Store listing screenshots. Reachable from the Welcome carousel without signing up.

---

## 09 · Demo intro — `DemoIntroScreen.tsx`
A centered, boutique hero that doubles as the store listing shot, so it must look complete and polished even though no real data is involved. The optical center holds a glowing play medallion: a teal→cyan gradient play FAB ringed by a layered teal halo and a slow Reanimated pulse ring, flanked by two floating result-card previews (LDL High, Vitamin D Low, each with a `StatusPill` and a source link) that hint at the payoff. Soft teal glow blobs sit behind. Centered below: the eyebrow "Try the lab demo", the headline "See one lab report, read back in plain language." (accent on the closing phrase), the value line, and a quiet "Play the demo" caption. At the foot, a centered rich flag legend (High / Low / Normal chips) with the reassurance line "No account needed · Nothing uploaded · Never trained on". Tapping the medallion opens playback.

## 10 · Demo playback — `DemoPlaybackScreen.tsx`
A centered, glass-panelled sequence over soft teal glow blobs, with a three-step progress rail at the top. Each phase is anchored by a glowing halo medallion (the same gradient-circle + layered-halo + Reanimated-pulse language as the intro hero):
1. **Uploading** — a pulsing file medallion, the file name, and a GlassCard carrying an animated progress fill plus the privacy reassurance line.
2. **Reading** — a pulsing scan medallion over "Reading your report", with a GlassCard checklist that ticks through the steps and highlights the active row.
3. **Ready** — a settled check medallion, a centered "Your record is ready" eyebrow, title + source, a plain-English summary on a GlassCard, rich High / Low / Normal legend chips, and a GlassCard of `ValueRow`s where individual values flag **High / Low / Normal**. Tap any row to see it linked to its source line (previews the Source sheet).

End CTA: **"Get your MyCare ID · Free"**, routing to Sign Up (03). This is the demo's single conversion action. A quiet **Replay the demo** link restarts the sequence.

The demo uses canned sample data only; nothing is uploaded or stored. The flag colors and the tap-a-row-to-explain interaction preview the real Source sheet (18), so reuse [StatusPill](../src/components/StatusPill.tsx) and the source-pill pattern for consistency.
