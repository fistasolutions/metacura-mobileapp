# Source Sheet Spec — THE SIGNATURE INTERACTION (screen 18)

**Priority:** P0, highest. **Screen:** [src/screens/records/SourceSheetScreen.tsx](../src/screens/records/SourceSheetScreen.tsx). **Mounted as:** a root-level modal (see [navigation.md](navigation.md)).

> "Tap any value, see the source." This single behavior is the product's entire trust claim. The whole app exists to make this feel instant and effortless.

---

## 18 · Source sheet

A **half-sheet modal** opened by tapping any flagged value or any source pill. The original PDF, scan, or image opens **scrolled to the exact line that produced the answer, with that line highlighted**.

- **Open from:** record detail (17, a value or summary pill), Ask Doctor answers (20), the answer detail view (22, its in-conversation companion), and anywhere a claim is shown.
- **Params:** `{ recordId, line? }` — the document to open and the line to highlight.
- **Magnify:** tap-and-hold to magnify the highlighted region.
- **Presentation:** a true bottom sheet with detents (start at half height, drag to full). In the scaffold this is `presentation: 'modal'`; upgrade to a detents sheet (`@gorhom/bottom-sheet` or native `formSheet`) when built. Gesture-driven via `react-native-gesture-handler` + `react-native-reanimated`.

## Performance bar (non-negotiable)

The sheet must feel **instant**. Pre-resolve the document and target line before presenting; render the highlighted line first, then the surrounding pages. Never show a spinner as the first frame of this interaction. This is the one place where perceived latency directly undermines the product's trust claim.

## Native dependencies
`react-native-pdf` for PDFs, native `Image` with zoom for scans/photos, and a bottom-sheet library for the detents. Highlighting overlays a tinted rectangle on the resolved line bounds.

## Relationship to screen 22
[Answer detail expanded](askdoctor.md) (22) is functionally the same view reached from the conversation flow instead of the record-detail flow. Share the underlying document viewer component between 18 and 22; only the entry point and chrome differ.
