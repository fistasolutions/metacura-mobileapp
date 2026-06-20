# Records Spec (Module E, screens 16, 17, 19)

**Priority:** P0. **Screens:** [src/screens/records/](../src/screens/records). **Tab:** Records.

Step 2 of the product spine: understand. The Source sheet (18) is specced separately in [sourcesheet.md](sourcesheet.md).

---

## 16 · Records timeline — `RecordsTimelineScreen.tsx`
- **Filter chips** at the top: All · Labs · CT · MRI · Ultrasound · Rx · Visits · Voice notes. Selecting a chip narrows the list to that record type (Rx covers Medication + Prescription); All clears the filter.
- **Search field** at the very top, filtering by title, source, or type. Search and the active chip combine (AND).
- **Chronological list** with a type icon, document title, source, and date per row. Use the design system's date-block timeline pattern (a left date block, a status-colored dot connector, columnar metadata). When nothing matches the filter/search, show a quiet "No records found" empty state.
- Primary action: a prominent path to Upload (12).

## 17 · Record detail — `RecordDetailScreen.tsx`
- **Document header** showing source and date.
- **Flag overview strip:** three compact stat tiles (High / Low / Normal counts in their status colors), shown for records that carry values.
- **AI Summary card:** a crystal `GlassCard` headed by a gradient sparkle medallion + "AI Summary" eyebrow. Ends with a tappable "Linked · N sources" pill (never "Cited") that opens the Source sheet.
- **Values list:** each value is a tappable row with a status dot, label, the user's-own-history range, the mono value, a [StatusPill](../src/components/StatusPill.tsx) (**High / Low / Normal**, not generic reference ranges), a link glyph, and a slim **3-zone range gauge** (low · normal · high) with a marker placed by flag.
- **Every flagged value and the source pill opens the [Source sheet](sourcesheet.md) (18)** to the exact original line. This is the signature interaction.
- **Findings** (imaging / visit records): a checklist, each row a teal check medallion.
- **"Ask about this record"** gradient CTA at the bottom (chat medallion + subtitle) routes to Ask Doctor (20) with this record pre-loaded as context (`AskLanding { recordId }`).

Favor a rich but calm editorial style: white/glass surfaces, hairline dividers, teal as the single accent, status color only where it carries meaning.

## 19 · Empty state, new user — `RecordsEmptyScreen.tsx`
Shown when the user has zero records. "Upload your first document to get started." Big **Open Camera** CTA reaching the Upload module (12). This is also referenced by Home (11) and listed in [states.md](states.md).

## Native dependencies
The Source sheet uses `react-native-pdf` / native image viewing (see [sourcesheet.md](sourcesheet.md)).
