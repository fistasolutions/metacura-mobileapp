/**
 * IconCircle — a lucide icon inside a rounded square/circle tile.
 * Mirrors the web's icon-circle pattern used across cards and list rows.
 */
import React from 'react';
import { View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../theme';

type Tone = 'teal' | 'neutral' | 'high' | 'low' | 'normal' | 'brand';

export function IconCircle({
  icon: Icon,
  size = 40,
  tone = 'teal',
  radius,
}: {
  icon: LucideIcon;
  size?: number;
  tone?: Tone;
  radius?: number;
}) {
  const t = useTheme();
  const tones: Record<Tone, { bg: string; fg: string }> = {
    teal: { bg: t.colors.surfaceMuted, fg: t.colors.primary },
    neutral: { bg: t.colors.surfaceMuted, fg: t.colors.textMuted },
    high: { bg: t.colors.highBg, fg: t.colors.high },
    low: { bg: t.colors.lowBg, fg: t.colors.low },
    normal: { bg: t.colors.normalBg, fg: t.colors.normal },
    brand: { bg: t.colors.primary, fg: t.colors.textInverse },
  };
  const c = tones[tone];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius ?? size / 2.6,
        backgroundColor: c.bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={size * 0.5} color={c.fg} strokeWidth={2.2} />
    </View>
  );
}
