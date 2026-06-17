/**
 * TierCard — a pricing tier card for the Reports hub. Featured tiers get a teal
 * gradient ring; the clinical tier reads emerald. Pay-as-you-go, no subscription.
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

export function TierCard({ tier, onPress }: { tier: ReportTierDef; onPress?: () => void }) {
  const t = useTheme();

  const inner = (
    <GlassCard
      radius={t.radius['3xl'] - 2}
      contentStyle={{ padding: t.spacing[6], gap: t.spacing[4] }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <AppText variant="cardTitle">{tier.name}</AppText>
        {tier.badge ? <Badge label={tier.badge} variant={tier.clinical ? 'success' : 'default'} /> : null}
      </View>
      <AppText variant="secondary" color={t.colors.textMuted}>
        {tier.tagline}
      </AppText>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
        <AppText variant="h1" style={{ fontFamily: t.fonts.mono }}>
          {tier.price === 0 ? 'Free' : `$${tier.price}`}
        </AppText>
        {tier.price !== 0 ? (
          <AppText variant="secondary" color={t.colors.textMuted}>
            per report
          </AppText>
        ) : null}
      </View>
      <View style={{ gap: 10, marginTop: 4 }}>
        {tier.features.map(f => (
          <View key={f} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Check size={16} color={tier.clinical ? t.colors.success : t.colors.primary} strokeWidth={2.6} />
            <AppText variant="secondary" style={{ flex: 1 }}>
              {f}
            </AppText>
          </View>
        ))}
      </View>
      <Button
        label={tier.cta}
        variant={tier.price === 0 ? 'outline' : 'primary'}
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
