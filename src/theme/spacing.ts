/**
 * MetaCura spacing + radius scale — native port (px) of the web 4px scale.
 */
export const spacing = {
  px: 1,
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16, // standard card (rounded-2xl)
  '2xl': 20, // glass panel
  '3xl': 28, // header band
  card: 36, // hero / premium card
  pill: 9999,
} as const;
