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
  footer,
  compact,
  style,
}: {
  icon?: LucideIcon;
  value: string;
  label: string;
  delta?: string;
  deltaUp?: boolean;
  tone?: Tone;
  /** Small uppercase caption in the footer slot. */
  footer?: string;
  /** Denser tile: tighter padding, smaller icon + value. */
  compact?: boolean;
  style?: any;
}) {
  const t = useTheme();
  const deltaColor = deltaUp ? t.colors.success : t.colors.high;
  const iconSize = compact ? 30 : 36;
  const valueSize = compact ? t.fontSize['2xl'] : t.fontSize['3xl'];
  return (
    <GlassCard
      style={[{ flex: 1 }, style]}
      contentStyle={{ gap: compact ? 6 : t.spacing[3], padding: compact ? 14 : t.spacing[5] }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {icon ? <IconCircle icon={icon} size={iconSize} tone={tone} /> : <View />}
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
        <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: valueSize, color: t.colors.text }}>
          {value}
        </AppText>
        <AppText variant="eyebrow" color={t.colors.textMuted}>
          {label.toUpperCase()}
        </AppText>
      </View>

      {/* Footer slot — a uniform height so tiles in a row stay level. */}
      {footer ? (
        <View style={{ height: 13, justifyContent: 'center' }}>
          <AppText variant="eyebrow" color={t.colors.textMuted} style={{ textTransform: 'uppercase' }}>
            {footer}
          </AppText>
        </View>
      ) : null}
    </GlassCard>
  );
}
