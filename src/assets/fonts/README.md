# Bundled fonts

MetaCura uses three Google fonts, bundled as `.ttf` (not loaded over the web).
Family names referenced in [src/theme/typography.ts](../../theme/typography.ts)
must match each file's PostScript name exactly.

Drop these files here, then run `npx react-native-asset` from the project root:

| File | Family name | Used for |
| --- | --- | --- |
| `Inter-Regular.ttf` | Inter-Regular | body / UI text |
| `Inter-Medium.ttf` | Inter-Medium | medium labels |
| `Inter-SemiBold.ttf` | Inter-SemiBold | emphasis |
| `Inter-Bold.ttf` | Inter-Bold | buttons, eyebrows |
| `Outfit-Medium.ttf` | Outfit-Medium | display headlines |
| `Outfit-SemiBold.ttf` | Outfit-SemiBold | screen / card titles |
| `Outfit-Bold.ttf` | Outfit-Bold | strong headlines |
| `Syne-Bold.ttf` | Syne-Bold | the MetaCura wordmark, numeric stats |

Sources:
- Inter: https://fonts.google.com/specimen/Inter
- Outfit: https://fonts.google.com/specimen/Outfit
- Syne: https://fonts.google.com/specimen/Syne

Until the `.ttf` files are present, React Native falls back to the system font
and the app still runs; only the typeface differs.
