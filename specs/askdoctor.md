# Ask Doctor Spec (Module F, screens 20-22)

**Priority:** P0. **Screens:** [src/screens/askdoctor/](../src/screens/askdoctor). **Tab:** Ask Doctor.

Step 3 of the spine: ask. **Voice and text are equal peers, not voice as a sub-feature.** Every answer is drawn entirely from the user's own record and never invents an answer.

---

## 20 · Ask landing — `AskLandingScreen.tsx`
- **Persistent conversation view** (the thread survives across sessions).
- **Composer** at the bottom with a microphone button and a send button, given equal weight.
- **Suggested prompts** above the composer: "Why is my cholesterol high?", "Compare to last quarter", "Prep me for Tuesday's visit."
- **Every answer shows source pills** linked to the specific records and lines that produced it. Tapping a pill opens the answer detail (22) / Source sheet (18).
- Reached from a record's "Ask about this" with `{ recordId }` pre-loaded as context.

## 21 · Voice query — `VoiceQueryScreen.tsx`
Full-screen microphone view with live transcription and a waveform animation (Reanimated). A cancel option. On release, the transcription confirms and the answer streams back, with the option to play it as audio. Reached from the composer mic and from the shell **FloatingMic** on any tab.

## 22 · Answer detail expanded — `AnswerDetailScreen.tsx`
Tap a source pill on any answer to open this: the full original document scrolled to the line that produced the answer, plus surrounding context for clinical interpretation. Functionally a companion to the [Source sheet](sourcesheet.md) (18), reached from the conversation flow rather than the record-detail flow. Share the document-viewer component.

## Native dependencies
A speech-to-text / voice library for capture and live transcription, and text-to-speech for audio playback. Answers stream token by token; render incrementally.

## States
Empty conversation (first visit) → show the suggested prompts prominently with a one-line trust note. Mic permission denied → fall back to text with a clear prompt. See [states.md](states.md).
