/**
 * Screen 10 · Demo playback — a centered, glass-panelled sequence: uploading →
 * reading → ready, landing on a real record panel. A three-step progress rail
 * sits centered at the top; each phase is anchored by a glowing halo medallion
 * (matching the intro hero) over soft teal glow blobs. Canned sample data only;
 * nothing is uploaded or stored. See specs/demo.md.
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
import { Check, FileText, ScanLine, Sparkles } from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import {
  Screen,
  AppText,
  BackLink,
  Button,
  GlassCard,
  SectionEyebrow,
  ValueRow,
} from '../../components';
import { MOCK_RECORDS } from '../../data';

type Phase = 'uploading' | 'reading' | 'ready';
const PHASES: Phase[] = ['uploading', 'reading', 'ready'];

const READING_STEPS = [
  'Reading the document',
  'Pulling out every value',
  'Flagging High, Low, Normal',
  'Linking each value to its source line',
];

/* ── Shared rich visuals (mirror the intro hero) ──────────────────────── */

// A glowing gradient medallion ringed by a layered teal halo and, optionally,
// a slow Reanimated pulse, the same language as the intro play button.
function HaloMedallion({ icon: Icon, pulsing }: { icon: LucideIcon; pulsing?: boolean }) {
  const t = useTheme();
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
    <View style={styles.medallion}>
      <View style={[styles.ring, styles.ringOuter, { borderColor: t.colors.accent, opacity: 0.12 }]} />
      <View style={[styles.ring, styles.ringMid, { borderColor: t.colors.accent, opacity: 0.18 }]} />
      {pulsing ? (
        <Animated.View style={[styles.ring, styles.ringMid, { borderColor: t.colors.accent }, pulseStyle]} />
      ) : null}
      <LinearGradient
        colors={[t.colors.gradientStart, t.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.fab, t.shadows.button]}
      >
        <Icon size={40} color={t.palette.white} strokeWidth={2.2} />
      </LinearGradient>
    </View>
  );
}

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

// Centered three-step progress rail.
function StepRail({ active }: { active: number }) {
  const t = useTheme();
  return (
    <View style={styles.rail}>
      {PHASES.map((p, i) => (
        <View
          key={p}
          style={[
            styles.railSeg,
            { backgroundColor: i <= active ? t.colors.primary : t.colors.border, width: i === active ? 28 : 18 },
          ]}
        />
      ))}
    </View>
  );
}

export default function DemoPlaybackScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [phase, setPhase] = React.useState<Phase>('uploading');

  useEffect(() => {
    if (phase === 'uploading') {
      const id = setTimeout(() => setPhase('reading'), 1800);
      return () => clearTimeout(id);
    }
    if (phase === 'reading') {
      const id = setTimeout(() => setPhase('ready'), 1800);
      return () => clearTimeout(id);
    }
  }, [phase]);

  // Animated upload progress fill.
  const progress = useSharedValue(0);
  useEffect(() => {
    if (phase === 'uploading') {
      progress.value = 0;
      progress.value = withTiming(1, { duration: 1700, easing: Easing.inOut(Easing.ease) });
    }
  }, [phase, progress]);
  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  const record = MOCK_RECORDS[0];
  const activeStep = PHASES.indexOf(phase);

  return (
    <Screen>
      <BackLink />

      {/* Ambient teal glow blobs behind every phase. */}
      <View pointerEvents="none" style={[styles.blob, { top: 60, right: -90, backgroundColor: t.colors.accentSoft, opacity: 0.16 }]} />
      <View pointerEvents="none" style={[styles.blob, { top: 360, left: -100, backgroundColor: t.colors.accent, opacity: 0.1 }]} />

      <View style={styles.head}>
        <SectionEyebrow
          label={
            phase === 'uploading'
              ? 'Step 1 of 3 · Uploading'
              : phase === 'reading'
                ? 'Step 2 of 3 · Reading'
                : 'Step 3 of 3 · Ready'
          }
        />
        <StepRail active={activeStep} />
      </View>

      {phase === 'uploading' ? (
        <View style={styles.block}>
          <HaloMedallion icon={FileText} pulsing />
          <AppText variant="h2" style={styles.centerText}>
            CMP_Bloodwork.pdf
          </AppText>
          <AppText variant="secondary" color={t.colors.textMuted} style={styles.centerText}>
            142 KB · arriving securely
          </AppText>

          <GlassCard contentStyle={styles.glassCenter}>
            <View style={[styles.track, { backgroundColor: t.colors.border, borderRadius: t.radius.pill }]}>
              <Animated.View
                style={[styles.fill, { backgroundColor: t.colors.primary, borderRadius: t.radius.pill }, fillStyle]}
              />
            </View>
            <AppText variant="secondary" color={t.colors.textMuted} style={styles.centerText}>
              Encrypted in transit · stays inside your record · never used to train any model
            </AppText>
          </GlassCard>
        </View>
      ) : null}

      {phase === 'reading' ? (
        <View style={styles.block}>
          <HaloMedallion icon={ScanLine} pulsing />
          <AppText variant="h2" style={styles.centerText}>
            Reading your report
          </AppText>
          <AppText variant="secondary" color={t.colors.textMuted} style={styles.centerText}>
            MetaCura is turning the page into plain language.
          </AppText>

          <GlassCard contentStyle={styles.readList}>
            {READING_STEPS.map((step, i) => {
              const done = i < 2;
              const activeRow = i === 2;
              return (
                <View
                  key={step}
                  style={[
                    styles.readRow,
                    activeRow
                      ? { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.lg }
                      : null,
                  ]}
                >
                  <View
                    style={[
                      styles.readDot,
                      {
                        backgroundColor: done ? t.colors.primary : t.colors.surfaceMuted,
                        borderWidth: done ? 0 : 1.5,
                        borderColor: activeRow ? t.colors.primary : t.colors.borderStrong,
                      },
                    ]}
                  >
                    {done ? (
                      <Check size={13} color={t.colors.textInverse} strokeWidth={3} />
                    ) : (
                      <View style={[styles.readPending, { backgroundColor: t.colors.primary }]} />
                    )}
                  </View>
                  <AppText
                    variant="body"
                    color={done || activeRow ? t.colors.text : t.colors.textMuted}
                    style={done ? undefined : { fontFamily: t.fonts.bodySemibold }}
                  >
                    {step}
                  </AppText>
                </View>
              );
            })}
          </GlassCard>
        </View>
      ) : null}

      {phase === 'ready' ? (
        <View style={styles.block}>
          <HaloMedallion icon={Check} />
          <View style={styles.readyHead}>
            <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
              Your record is ready
            </AppText>
            <AppText variant="h2" style={styles.centerText}>
              {record.title}
            </AppText>
            <AppText variant="secondary" color={t.colors.textMuted} style={styles.centerText}>
              {record.source} · {record.date}
            </AppText>
          </View>

          {/* Plain-English summary on a glass panel. */}
          <GlassCard contentStyle={styles.summaryCard}>
            <View style={styles.summaryHead}>
              <Sparkles size={16} color={t.colors.primary} strokeWidth={2.2} />
              <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
                In plain English
              </AppText>
            </View>
            <AppText variant="body" color={t.colors.text}>
              {record.summary}
            </AppText>
          </GlassCard>

          <View style={styles.legendRow}>
            <LegendChip color={t.colors.high} label="High" />
            <LegendChip color={t.colors.low} label="Low" />
            <LegendChip color={t.colors.normal} label="Normal" />
          </View>

          <GlassCard padded={false} contentStyle={styles.valuesCard}>
            {record.values?.map(v => (
              <ValueRow key={v.label} value={v} onPress={() => {}} />
            ))}
            <AppText variant="secondary" color={t.colors.textMuted} style={styles.tapHint}>
              Tap any value to see it linked to its source line.
            </AppText>
          </GlassCard>

          <Button label="Get your MyCare ID · Free" onPress={() => nav.navigate('SignUp')} />

          <Pressable onPress={() => setPhase('uploading')} accessibilityRole="button" style={styles.replay}>
            <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
              Replay the demo
            </AppText>
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  centerText: { textAlign: 'center' },
  upper: { textTransform: 'uppercase' },
  blob: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  head: {
    alignItems: 'center',
    gap: 14,
    marginBottom: 28,
  },
  rail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  railSeg: {
    height: 6,
    borderRadius: 3,
  },
  block: {
    gap: 18,
    alignItems: 'stretch',
  },
  // Medallion (mirrors the intro hero).
  medallion: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
  },
  ringOuter: {
    width: 196,
    height: 196,
    borderRadius: 98,
  },
  ringMid: {
    width: 148,
    height: 148,
    borderRadius: 74,
  },
  fab: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Uploading.
  glassCenter: {
    alignItems: 'center',
    gap: 14,
  },
  track: {
    height: 8,
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: 8,
  },
  // Reading.
  readList: {
    gap: 8,
  },
  readRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
  },
  readDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // Ready.
  readyHead: {
    alignItems: 'center',
    gap: 6,
  },
  summaryCard: {
    gap: 10,
  },
  summaryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  valuesCard: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
  },
  tapHint: {
    marginTop: 14,
    textAlign: 'center',
  },
  replay: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
})
