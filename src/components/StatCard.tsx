/**
 * StatCard — a compact metric tile: an icon chip, a large value, a label, and
 * an optional delta chip. Used on Home and Profile. Quiet, not gamified.
 */
import React from 'react';
import { View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';
import { GlassCard } from './GlassCard';
import { IconCircle } from './IconCircle';

type Tone = 'teal' | 'high' | 'low' | 'normal' | 'neutral';

export function StatCard({
  icon,
  value,
  label,
  delta,
  deltaUp,
  tone = 'teal',
  style,
}: {
  icon?: LucideIcon;
  value: string;
  label: string;
  delta?: string;
  deltaUp?: boolean;
  tone?: Tone;
  style?: any;
}) {
  const t = useTheme();
  const deltaColor = deltaUp ? t.colors.success : t.colors.high;
  return (
    <GlassCard style={[{ flex: 1 }, style]} contentStyle={{ gap: t.spacing[3] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {icon ? <IconCircle icon={icon} size={36} tone={tone} /> : <View />}
        {delta ? (
          <View
            style={{
              backgroundColor: deltaUp ? t.colors.normalBg : t.colors.highBg,
              borderRadius: t.radius.pill,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <AppText variant="eyebrow" color={deltaColor}>
              {delta}
            </AppText>
          </View>
        ) : null}
      </View>
      <View style={{ gap: 2 }}>
        <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['3xl'], color: t.colors.text }}>
          {value}
        </AppText>
        <AppText variant="eyebrow" color={t.colors.textMuted}>
          {label.toUpperCase()}
        </AppText>
      </View>
    </GlassCard>
  );
}
