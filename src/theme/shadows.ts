/**
 * MetaCura shadows — native port of the web shadow scale.
 * Soft layered depth, never hard lines. iOS uses shadow*, Android uses elevation.
 * Use these via the spread helper: { ...shadows.md }.
 */
import { Platform, ViewStyle } from 'react-native';

type Shadow = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

const make = (
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number,
  color = '#000000',
): Shadow =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  }) as Shadow;

export const shadows = {
  sm: make(1, 3, 0.04, 1),
  // Default card lift: large, soft, low-opacity for a premium boutique feel.
  card: make(10, 24, 0.06, 3),
  md: make(8, 20, 0.08, 5),
  lg: make(16, 36, 0.1, 9),
  // Soft teal glow under the primary action (from-teal-600 button).
  button: make(14, 26, 0.3, 10, '#0D9488'),
  // Glass / hero card lift.
  glass: make(18, 48, 0.1, 12),
} as const;
