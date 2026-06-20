# Ask Doctor Spec (Module F, screens 20-22)

**Priority:** P0. **Screens:** [src/screens/askdoctor/](../src/screens/askdoctor). **Tab:** Ask Doctor.

Step 3 of the spine: ask. **Voice and text are equal peers, not voice as a sub-feature.** Every answer is drawn entirely from the user's own record and never invents an answer.

---

## 20 · Ask landing — `AskLandingScreen.tsx`
A modern chat surface (ChatGPT / Claude feel), concise, never heavy boxes:
- **Slim header** — a small gradient sparkle avatar + "Ask Doctor" + "Answers from your records, linked".
- **Empty state** (first visit) — a centered sparkle medallion, a short greeting, a one-line trust note, and **suggestion cards** ("Why is my cholesterol high?", "Compare to last quarter", "Prep me for Tuesday's visit").
- **Conversation thread** — right-aligned **teal user bubbles**; assistant turns are a small sparkle avatar + a **light bubble** (muted surface, sharp top-left corner) with tight copy, then **source chips** (`Link2` + file · line) and a quiet **Play** affordance. Tapping a source chip opens the answer detail (22) / Source sheet (18).
- **Composer** pinned at the bottom with a microphone button and a gradient send button, given equal weight; a horizontal **quick-prompt** row sits above it during a conversation.
- **Persistent conversation view** (the thread survives across sessions). Reached from a record's "Ask about this" with `{ recordId }` pre-loaded as context (shown as an "Asking about:" chip).

## 21 · Voice query — `VoiceQueryScreen.tsx`
Full-screen voice conversation (a peer to text), reached from the composer mic and the shell **FloatingMic** on any tab. It runs through phases with a gradient orb, a pulsing halo, and a Reanimated waveform:
1. **Listening** — a live transcription grows as you speak ("Why is my LDL high?").
2. **Reading your record** — a brief thinking beat.
3. **Speaking** — the assistant **replies in voice**: the orb switches to a speaker, the waveform animates, and the answer (drawn only from the record) streams in word by word in an "Answer · from your record" card.

When the conversation ends (the reply finishes, or the user taps the stop control) it routes to the **report**: the Ask Doctor thread (20), seeded via `AskLanding { voiceQuestion }` so the spoken Q&A appears as the conversation transcript, with the source chip and a Play affordance to replay as audio. Real speech-to-text / text-to-speech are native deps; this screen simulates the experience. A cancel (✕) dismisses without a report.

## 22 · Answer detail expanded — `AnswerDetailScreen.tsx`
Tap a source pill on any answer to open this: the full original document scrolled to the line that produced the answer, plus surrounding context for clinical interpretation. Functionally a companion to the [Source sheet](sourcesheet.md) (18), reached from the conversation flow rather than the record-detail flow. Share the document-viewer component.

## Native dependencies
A speech-to-text / voice library for capture and live transcription, and text-to-speech for audio playback. Answers stream token by token; render incrementally.

## States
Empty conversation (first visit) → show the suggested prompts prominently with a one-line trust note. Mic permission denied → fall back to text with a clear prompt. See [states.md](states.md).
