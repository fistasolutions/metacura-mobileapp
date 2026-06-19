/**
 * Screen 09 · Demo intro — a centered, boutique hero that doubles as the store
 * listing shot. A glowing play medallion (layered teal halo + a soft pulsing
 * ring) sits at the optical center, flanked by two floating result-card
 * previews that hint at the payoff. Headline, value line, and a rich flag
 * legend are all centered. Quiet brand surface, teal as accent. See specs/demo.md.
 */
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Link2, Play } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import {
  Screen,
  AppText,
  GradientText,
  SectionEyebrow,
  StatusPill,
  BackLink,
} from '../../components';
import type { FlagStatus } from '../../components';

// A small floating result card that previews what the demo reveals.
function PreviewCard({
  label,
  value,
  unit,
  flag,
  style,
}: {
  label: string;
  value: string;
  unit: string;
  flag: FlagStatus;
  style?: object;
}) {
  const t = useTheme();
  return (
    <View
      pointerEvents="none"
      style={[
        styles.previewCard,
        {
          backgroundColor: t.colors.surface,
          borderColor: t.colors.border,
          borderRadius: t.radius.xl,
        },
        t.shadows.lg,
        style,
      ]}
    >
      <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
        {label}
      </AppText>
      <View style={styles.previewValueRow}>
        <AppText color={t.colors.text} style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.lg }}>
          {value}
          <AppText color={t.colors.textMuted} style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.xs }}>
            {` ${unit}`}
          </AppText>
        </AppText>
      </View>
      <View style={styles.previewFooter}>
        <StatusPill status={flag} />
        <Link2 size={12} color={t.colors.primary} strokeWidth={2.4} />
      </View>
    </View>
  );
}

// A rich flag legend chip.
function LegendChip({ color, label }: { color: string; label: string }) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.legendChip,
        { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius.pill },
        t.shadows.sm,
      ]}
    >
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <AppText variant="eyebrow" color={t.colors.text} style={styles.upper}>
        {label}
      </AppText>
    </View>
  );
}

export default function DemoIntroScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  // Soft, slow pulse on the outer ring for a living, premium feel.
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.4 }],
    opacity: 0.4 * (1 - pulse.value),
  }));

  return (
    <Screen scroll={false} contentStyle={styles.flex1}>
      <BackLink />

      {/* Ambient teal glow blobs behind the hero. */}
      <View pointerEvents="none" style={[styles.blob, { top: 40, right: -80, backgroundColor: t.colors.accentSoft, opacity: 0.16 }]} />
      <View pointerEvents="none" style={[styles.blob, { bottom: 80, left: -90, backgroundColor: t.colors.accent, opacity: 0.1 }]} />

      <View style={styles.center}>
        <SectionEyebrow label="Try the lab demo" />

        {/* Hero medallion: floating previews + halo rings + play FAB. */}
        <View style={styles.hero}>
          <PreviewCard
            label="LDL Cholesterol"
            value="142"
            unit="mg/dL"
            flag="high"
            style={styles.previewTopLeft}
          />
          <PreviewCard
            label="Vitamin D"
            value="22"
            unit="ng/mL"
            flag="low"
            style={styles.previewBottomRight}
          />

          {/* layered static halo */}
          <View style={[styles.ring, styles.ringOuter, { borderColor: t.colors.accent, opacity: 0.12 }]} />
          <View style={[styles.ring, styles.ringMid, { borderColor: t.colors.accent, opacity: 0.18 }]} />
          {/* pulsing ring */}
          <Animated.View style={[styles.ring, styles.ringMid, { borderColor: t.colors.accent }, pulseStyle]} />

          <Pressable
            onPress={() => nav.navigate('DemoPlayback')}
            accessibilityRole="button"
            accessibilityLabel="Play the demo"
            style={({ pressed }) => [styles.fabWrap, { transform: [{ scale: pressed ? 0.96 : 1 }] }]}
          >
            <LinearGradient
              colors={[t.colors.gradientStart, t.colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.fab, t.shadows.button]}
            >
              <Play size={38} color={t.palette.white} fill={t.palette.white} strokeWidth={2} />
            </LinearGradient>
          </Pressable>
        </View>

        <AppText variant="h1" style={styles.centerText}>
          See one lab report,
          <GradientText style={{ fontSize: t.fontSize['3xl'] }}> read back in plain language.</GradientText>
        </AppText>

        <AppText variant="body" color={t.colors.textMuted} style={styles.centerText}>
          Watch a sample lab arrive, get read, and open into a clear panel. Every value flagged, every answer linked back to its source line.
        </AppText>

        <AppText variant="secondary" color={t.colors.primary} style={[styles.centerText, { fontFamily: t.fonts.bodySemibold }]}>
          Play the demo
        </AppText>
      </View>

      {/* Rich flag legend + reassurance, centered at the foot. */}
      <View style={styles.foot}>
        <View style={styles.legendRow}>
          <LegendChip color={t.colors.high} label="High" />
          <LegendChip color={t.colors.low} label="Low" />
          <LegendChip color={t.colors.normal} label="Normal" />
        </View>
        <AppText variant="secondary" color={t.colors.textMuted} style={styles.centerText}>
          No account needed · Nothing uploaded · Never trained on
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  upper: { textTransform: 'uppercase' },
  centerText: { textAlign: 'center' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  blob: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  // Hero medallion.
  hero: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
  },
  ringOuter: {
    width: 248,
    height: 248,
    borderRadius: 124,
  },
  ringMid: {
    width: 184,
    height: 184,
    borderRadius: 92,
  },
  fabWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    position: 'absolute',
    width: 150,
    borderWidth: 1,
    padding: 12,
    gap: 6,
    zIndex: 5,
  },
  previewTopLeft: {
    top: 6,
    left: 0,
    transform: [{ rotate: '-7deg' }],
  },
  previewBottomRight: {
    bottom: 4,
    right: 0,
    transform: [{ rotate: '7deg' }],
  },
  previewValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  // Legend.
  foot: {
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  legendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
