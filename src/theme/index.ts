/**
 * MetaCura theme — single import surface for the design system.
 * Usage: const theme = useTheme(); theme.colors.primary, theme.spacing[4], ...
 */
import { ColorScheme, darkColors, lightColors, PALETTE } from './colors';
import { spacing, radius } from './spacing';
import { shadows } from './shadows';
import {
  fonts,
  fontSize,
  lineHeight,
  letterSpacing,
  textStyles,
} from './typography';

export type Theme = {
  mode: 'light' | 'dark';
  colors: ColorScheme;
  palette: typeof PALETTE;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  fonts: typeof fonts;
  fontSize: typeof fontSize;
  lineHeight: typeof lineHeight;
  letterSpacing: typeof letterSpacing;
  text: typeof textStyles;
};

const base = {
  palette: PALETTE,
  spacing,
  radius,
  shadows,
  fonts,
  fontSize,
  lineHeight,
  letterSpacing,
  text: textStyles,
};

export const lightTheme: Theme = { mode: 'light', colors: lightColors, ...base };
export const darkTheme: Theme = { mode: 'dark', colors: darkColors, ...base };

export * from './colors';
export * from './spacing';
export * from './shadows';
export * from './typography';
export { ThemeProvider, useTheme, useThemeMode } from './ThemeProvider';
