/**
 * Static UI content. Mirrors MetacuraWeb constants/uiContent.ts and the
 * onboarding slides. No hardcoded copy in screens, pull from here.
 */

export const WELCOME_SLIDES = [
  {
    icon: 'Upload',
    title: 'Upload any document',
    body: 'Lab, CT, MRI, ECG, voice note, or prescription. Any source, in any format.',
  },
  {
    icon: 'Sparkles',
    title: 'Understand it in plain English',
    body: 'Tap any value to see the original line. Flagged against your own history.',
  },
  {
    icon: 'MessageCircle',
    title: 'Ask anything about your record',
    body: 'Speak or type. Every answer is linked to its source, drawn only from your record.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Yours, and only yours',
    body: 'HIPAA-aligned, end-to-end encrypted, never trained on, one-tap delete.',
  },
] as const;

export const PROFILE_TYPES = [
  { id: 'myself', label: 'Myself' },
  { id: 'my_child', label: 'My Child' },
  { id: 'my_parent', label: 'My Parent' },
  { id: 'my_patient', label: 'My Patient' },
  { id: 'other', label: 'Other' },
] as const;

export const HEALTH_FOCUS_OPTIONS = [
  'General wellness',
  'Chronic condition',
  'Post-surgery / recovery',
  'Cancer care',
  'Heart & cardiovascular',
  'Mental health',
  'Pediatric care',
  'Elderly care',
  'Other',
];

export const SUGGESTED_PROMPTS = [
  { text: 'Why is my cholesterol high?', hint: 'Reads your lipid panel' },
  { text: 'Compare to last quarter', hint: 'Trends across your records' },
  { text: 'Prep me for Tuesday’s visit', hint: 'Summarises what to ask' },
  { text: 'What does my MRI mean?', hint: 'Plain-English imaging read' },
];

export const RECORD_FILTERS = [
  'All',
  'Labs',
  'CT',
  'MRI',
  'Ultrasound',
  'Rx',
  'Visits',
  'Voice notes',
];

export const CLASSIFY_OPTIONS = [
  'Lab',
  'CT',
  'MRI',
  'Ultrasound',
  'Medication',
  'Voice note',
  'Doctor note',
  'Prescription',
];

export const TRUST_LINE =
  'HIPAA-aligned · encrypted · never trained on';
