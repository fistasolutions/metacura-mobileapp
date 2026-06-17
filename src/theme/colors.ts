/**
 * MetaCura color palette — native port of MetacuraWeb tokens.
 * Source of truth: MetacuraWeb/src/styles/tokens.ts + specs/app/designsystem.md.
 * One visual language: these hex values must match the web exactly.
 * Teal is an accent, not a flood. Do not introduce non-brand hues.
 */

// Raw brand palette (mode-independent anchors).
export const PALETTE = {
  // Teal / emerald / cyan brand scale
  primaryDark: '#134E4A', // teal-900
  primaryMedium: '#0D9488', // teal-600 — primary buttons, links, active
  primaryLight: '#99F6E4', // teal-200
  accentTeal: '#14B8A6', // teal-500 — focus rings, eyebrow dot, hovers
  accentCyan: '#5EEAD4', // cyan-300 — gradient light stop, ambient

  // Brightened teals for dark surfaces
  teal400: '#2DD4BF',
  teal300: '#5EEAD4',

  // Status / flag colors (keep exactly)
  success: '#10B981', // emerald-500 — positive deltas
  warning: '#F59E0B', // amber-500 — Low flag
  error: '#EF4444', // red-500 — High flag
  info: '#3B82F6',

  // Status flag backgrounds
  highBg: '#FEF2F2', // red-50
  lowBg: '#FFFBEB', // amber-50
  normalBg: '#F0FDFA', // teal-50

  // Neutrals
  tealTint: '#F0FDFA', // teal-50 — tinted surfaces
  white: '#FFFFFF',
  gray900: '#111827',
  gray700: '#374151',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  black: '#000000',

  borderTeal: 'rgba(20, 184, 166, 0.1)',
} as const;

export type ColorScheme = {
  // Surfaces
  background: string;
  surface: string; // cards
  surfaceMuted: string; // tinted input/surface
  // Text
  text: string;
  textMuted: string;
  textInverse: string;
  // Brand
  primary: string;
  primaryStrong: string;
  accent: string;
  accentSoft: string;
  // Lines
  border: string;
  borderStrong: string;
  // Status (foreground / background pairs)
  high: string;
  highBg: string;
  low: string;
  lowBg: string;
  normal: string;
  normalBg: string;
  success: string;
  // Gradient stops for the primary action
  gradientStart: string;
  gradientEnd: string;
};

export const lightColors: ColorScheme = {
  background: PALETTE.white,
  surface: PALETTE.white,
  surfaceMuted: PALETTE.tealTint,
  text: PALETTE.gray900,
  textMuted: PALETTE.gray500,
  textInverse: PALETTE.white,
  primary: PALETTE.primaryMedium,
  primaryStrong: PALETTE.primaryDark,
  accent: PALETTE.accentTeal,
  accentSoft: PALETTE.accentCyan,
  border: PALETTE.gray100,
  borderStrong: PALETTE.borderTeal,
  high: PALETTE.error,
  highBg: PALETTE.highBg,
  low: PALETTE.warning,
  lowBg: PALETTE.lowBg,
  normal: PALETTE.primaryMedium,
  normalBg: PALETTE.normalBg,
  success: PALETTE.success,
  gradientStart: PALETTE.primaryMedium,
  gradientEnd: PALETTE.accentCyan,
};

// Dark mode shifts the SAME palette, it does not introduce new hues:
// white cards become near-black surfaces, gray-900 text becomes gray-100,
// teal accent is brightened for contrast.
export const darkColors: ColorScheme = {
  background: '#0A0F0E',
  surface: '#121817',
  surfaceMuted: '#0F1514',
  text: PALETTE.gray100,
  textMuted: PALETTE.gray400,
  textInverse: PALETTE.gray900,
  primary: PALETTE.teal400,
  primaryStrong: PALETTE.teal300,
  accent: PALETTE.teal400,
  accentSoft: PALETTE.accentCyan,
  border: 'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(45,212,191,0.25)',
  high: '#F87171',
  highBg: 'rgba(248,113,113,0.12)',
  low: '#FBBF24',
  lowBg: 'rgba(251,191,36,0.12)',
  normal: PALETTE.teal400,
  normalBg: 'rgba(45,212,191,0.12)',
  success: '#34D399',
  gradientStart: PALETTE.primaryMedium,
  gradientEnd: PALETTE.teal300,
};
