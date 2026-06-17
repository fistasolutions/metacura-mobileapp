/**
 * MetaCura typography — native port of the web type system.
 * Fonts are bundled .ttf files (see src/assets/fonts + react-native.config.js),
 * NOT loaded over the web. Family names below are the PostScript names RN resolves.
 *
 * Inter   — body / UI text, inputs, table cells
 * Outfit  — headlines, card titles, screen titles
 * Syne    — the MetaCura wordmark, occasional numeric stat display
 * mono    — lab values, MyCare ID, monospace source-document lines (system mono)
 *
 * If the .ttf files are not yet dropped into src/assets/fonts, RN falls back to
 * the system font. Keep weights mapped to real files once present.
 */
import { Platform } from 'react-native';

const systemMono = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const fonts = {
  body: 'Inter-Regular',
  bodyMedium: 'Inter-Medium',
  bodySemibold: 'Inter-SemiBold',
  bodyBold: 'Inter-Bold',
  heading: 'Outfit-Medium',
  headingSemibold: 'Outfit-SemiBold',
  headingBold: 'Outfit-Bold',
  brand: 'Syne-Bold',
  mono: systemMono,
} as const;

// Type scale (px). Mirrors the web app scale:
// display text-3xl..text-[40px], card titles xl/2xl, body base/lg, secondary sm,
// eyebrows/labels 10-12px uppercase with wide tracking.
export const fontSize = {
  eyebrow: 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 40,
} as const;

export const lineHeight = {
  eyebrow: 14,
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 28,
  '2xl': 30,
  '3xl': 34,
  '4xl': 42,
} as const;

// Wide tracking for eyebrows/labels (RN uses absolute letterSpacing in px).
export const letterSpacing = {
  eyebrow: 1.6, // ~tracking-[0.22em] at 10px
  tight: -0.3,
  normal: 0,
} as const;

export type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
};

export const textStyles = {
  display: {
    fontFamily: fonts.heading,
    fontSize: fontSize['4xl'],
    lineHeight: lineHeight['4xl'],
    letterSpacing: letterSpacing.tight,
  },
  h1: {
    fontFamily: fonts.headingSemibold,
    fontSize: fontSize['3xl'],
    lineHeight: lineHeight['3xl'],
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fonts.headingSemibold,
    fontSize: fontSize['2xl'],
    lineHeight: lineHeight['2xl'],
  },
  cardTitle: {
    fontFamily: fonts.headingSemibold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
  bodyLg: {
    fontFamily: fonts.body,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },
  secondary: {
    fontFamily: fonts.body,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.eyebrow,
    lineHeight: lineHeight.eyebrow,
    letterSpacing: letterSpacing.eyebrow,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
} satisfies Record<string, TypographyToken>;
