/**
 * Screen 14 · Upload progress — the trust moment. A glowing file medallion over
 * a soft teal field, a glass card with the file, page count, an
 * encryption-on-arrival chip, and an animated progress bar reading
 * "Reading… (under 30 seconds)". Auto-advances to classify. See specs/upload.md.
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { FileText, ShieldCheck } from 'lucide-react-native';
import { Screen, ScreenHeader, AppText, GlassCard } from '../../components';
import { useTheme } from '../../theme';

export default function UploadProgressScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => (p + 4 >= 100 ? 100 : p + 4));
    }, 60);
    return () => clearInterval(id);
  }, []);

  const done = progress >= 100;

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => nav.navigate('ClassifyConfirm'), 550);
    return () => clearTimeout(id);
  }, [done, nav]);

  // Pulsing halo around the medallion.
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.out(Easing.ease) }), -1, false);
  }, [pulse]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.4 }],
    opacity: 0.4 * (1 - pulse.value),
  }));

  return (
    <Screen scroll contentStyle={{ flexGrow: 1, gap: t.spacing[6] }} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[t.colors.surfaceMuted, t.colors.background]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <ScreenHeader hideBack eyebrow="Reading" title="Reading your record" />

      {/* Center the reading content in the available space. */}
      <View style={{ flex: 1 }} />

      {/* Halo medallion */}
      <View style={styles.medallion}>
        <View style={[styles.ring, styles.ringOuter, { borderColor: t.colors.accent, opacity: 0.12 }]} />
        <View style={[styles.ring, styles.ringMid, { borderColor: t.colors.accent, opacity: 0.18 }]} />
        {!done ? <Animated.View style={[styles.ring, styles.ringMid, { borderColor: t.colors.accent }, pulseStyle]} /> : null}
        <LinearGradient
          colors={[t.colors.gradientStart, t.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.fab, t.shadows.button]}
        >
          <FileText size={40} color={t.palette.white} strokeWidth={2.2} />
        </LinearGradient>
      </View>

      <GlassCard contentStyle={{ gap: t.spacing[4] }}>
        <View style={styles.fileRow}>
          <AppText variant="cardTitle" color={t.colors.text} numberOfLines={1} style={{ flex: 1 }}>
            CMP_Apr18.pdf
          </AppText>
          <View style={[styles.encChip, { backgroundColor: t.colors.normalBg, borderRadius: t.radius.pill }]}>
            <ShieldCheck size={13} color={t.colors.primary} strokeWidth={2.4} />
            <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
              Encrypted
            </AppText>
          </View>
        </View>
        <AppText variant="secondary" color={t.colors.textMuted}>
          3 pages · encrypted on arrival
        </AppText>

        {/* Progress */}
        <View style={[styles.track, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.pill }]}>
          <View style={[styles.fill, { width: `${progress}%`, backgroundColor: t.colors.primary, borderRadius: t.radius.pill }]} />
        </View>

        <View style={styles.statusRow}>
          <AppText variant="secondary" color={t.colors.textMuted}>
            {done ? 'Done' : 'Reading… (under 30 seconds)'}
          </AppText>
          <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
            {progress}%
          </AppText>
        </View>
      </GlassCard>

      {/* balances the top spacer so the block sits centered */}
      <View style={{ flex: 1 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  upper: { textTransform: 'uppercase' },
  medallion: {
    height: 168,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
  },
  ringOuter: {
    width: 188,
    height: 188,
    borderRadius: 94,
  },
  ringMid: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  fab: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  encChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  track: {
    height: 8,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
