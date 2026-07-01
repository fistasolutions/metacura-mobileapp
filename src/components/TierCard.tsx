/**
 * TierCard — a pricing tier card for the Reports hub. Featured tiers get a teal
 * gradient ring; the clinical tier reads emerald. Features lay out in two
 * columns to echo the web hub. Once a paid report is owned, the card shows an
 * "Owned" pill and the action flips to "Open report" (re-opening is free).
 * Pay-as-you-go, no subscription. See specs/reports.md.
 */
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Check } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';
import { Badge } from './Badge';
import { Button } from './Button';
import { GlassCard } from './GlassCard';
import { ReportTierDef } from '../data/types';

export function TierCard({
  tier,
  owned = false,
  onPress,
}: {
  tier: ReportTierDef;
  owned?: boolean;
  onPress?: () => void;
}) {
  const t = useTheme();
  const isFree = tier.price === 0;
  const accent = tier.clinical ? t.colors.success : t.colors.primary;

  const inner = (
    <GlassCard
      radius={t.radius['3xl'] - 2}
      contentStyle={{ padding: t.spacing[6], gap: t.spacing[4] }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <AppText variant="cardTitle">{tier.name}</AppText>
        {owned && !isFree ? (
          <Badge label="Owned" variant="success" />
        ) : tier.badge ? (
          <Badge label={tier.badge} variant={tier.clinical ? 'success' : 'default'} />
        ) : null}
      </View>

      <AppText variant="secondary" color={t.colors.textMuted}>
        {tier.tagline}
      </AppText>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
        <AppText variant="h1" style={{ fontFamily: t.fonts.mono }}>
          {isFree ? 'Free' : `$${tier.price}`}
        </AppText>
        <AppText variant="secondary" color={t.colors.textMuted}>
          {isFree ? 'forever' : 'per report'}
        </AppText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 10,
          columnGap: t.spacing[4],
          marginTop: 4,
        }}
      >
        {tier.features.map(f => (
          <View
            key={f}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              width: '46%',
              flexGrow: 1,
            }}
          >
            <Check size={15} color={accent} strokeWidth={3} style={{ marginTop: 2 }} />
            <AppText variant="secondary" style={{ flex: 1 }}>
              {f}
            </AppText>
          </View>
        ))}
      </View>

      <Button
        label={owned && !isFree ? 'Open report' : tier.cta}
        variant={isFree || (owned && !isFree) ? 'outline' : 'primary'}
        onPress={onPress}
        style={{ marginTop: 4 }}
      />
    </GlassCard>
  );

  if (tier.featured || tier.clinical) {
    const ring = tier.clinical
      ? [t.colors.success, t.colors.primary]
      : [t.colors.primary, t.colors.accentSoft];
    return (
      <LinearGradient
        colors={ring}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: t.radius['3xl'], padding: 1.5 }}
      >
        {inner}
      </LinearGradient>
    );
  }
  return inner;
}
