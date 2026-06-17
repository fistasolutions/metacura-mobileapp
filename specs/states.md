# Empty & Error States Spec (P2)

**Priority:** P2. These consistently slip during design but block QA at launch, so design them upfront. Never ship a blank screen.

---

## The required states (from brief §5)

| State | Where | Behavior |
| --- | --- | --- |
| Empty Records timeline | Records (19) | "Upload your first document to get started." Big Open Camera CTA → Upload (12). |
| Empty Ask Doctor conversation | Ask landing (20) | Suggested prompts shown prominently with a one-line trust note. |
| Upload failure / unreadable scan | Upload progress (14) | Clear re-upload prompt; explain what went wrong, offer retake / pick another file. |
| Payment failure | Payment sheet (27) | Clear retry path. No charge. Return to the Reports hub (23) cleanly. |
| Camera permission denied | Camera scanner (13) | Fall back to the photo library; explain how to re-enable in Settings. |
| Network offline | Upload (12-14), anywhere syncing | Queue uploads; show a sync-on-reconnect badge. Reads of cached records still work. |
| Account delete confirmation | Privacy & data (34) | Show the 30-day permanent-removal commitment before confirming. |
| No receipts yet | Receipts & billing (35) | Free Summary always available; paid reports appear here after purchase. |
| No shares yet | Audit trail (30) | Shared links and their access history will appear here. |

## Loading states
- The **Source sheet (18)** never shows a spinner as its first frame; the highlighted line renders first (see [sourcesheet.md](sourcesheet.md)).
- Report generation shows progress with "under 30 seconds" framing, then opens the report automatically.
- Ask Doctor answers stream incrementally rather than blocking on a spinner.

## Design rules for states
- Use the same calm, quiet surface as the rest of the app: an eyebrow, a short headline, one line of explanation, one primary action.
- One primary action per empty/error state, matching the [design system](designsystem.md) button.
- Dark-mode aware (automatic via `useTheme()`).
- Copy follows the [lexicon invariants](00-overview.md#lexicon-invariants-apply-to-every-screen-and-every-spec): no em-dash, no "cited", no subscription language.
