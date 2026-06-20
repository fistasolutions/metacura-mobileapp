// Screen 21 · Voice query — full-screen voice conversation, presented modally.
// Voice is a peer to text. Flow: listen (live transcript) → think → the
// assistant replies in voice (streaming answer + waveform + speaker), then the
// conversation ends and routes to the report (the Ask Doctor thread, seeded
// with this Q&A). Real STT/TTS are native deps (see specs/askdoctor.md); this
// simulates the experience.
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Mic, Volume2, X } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { AppText } from '../../components';

type Phase = 'listening' | 'thinking' | 'speaking';

const QUESTION = 'Why is my LDL high?';
const ANSWER =
  'Your LDL is high at 142 mg/dL, above the healthy range of under 100. The likely drivers are diet and activity. Everything else in this panel reads normal for you.';

const BAR_BASES = [16, 28, 40, 22, 50, 32, 56, 34, 48, 24, 42, 20];

/* A single waveform bar that breathes while active. */
function WaveBar({ base, active, index }: { base: number; active: boolean; index: number }) {
  const t = useTheme();
  const v = useSharedValue(0.5);
  useEffect(() => {
    if (active) {
      v.value = withRepeat(
        withTiming(1, { duration: 420 + (index % 5) * 90, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else {
      v.value = withTiming(0.4, { duration: 200 });
    }
  }, [active, index, v]);
  const style = useAnimatedStyle(() => ({ height: base * (0.4 + 0.6 * v.value) }));
  return <Animated.View style={[styles.bar, { backgroundColor: t.colors.primary, borderRadius: t.radius.pill }, style]} />;
}

export default function VoiceQueryScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  const [phase, setPhase] = useState<Phase>('listening');
  const [transcript, setTranscript] = useState('');
  const [spoken, setSpoken] = useState('');

  // Pulsing halo behind the orb.
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }), -1, false);
  }, [pulse]);
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.5 }],
    opacity: 0.32 * (1 - pulse.value),
  }));

  const goToReport = () =>
    nav.navigate('AskLanding', { voiceQuestion: QUESTION });

  // Drive the conversation through its phases, then hand off to the report.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setTranscript('Why is my…'), 700));
    timers.push(setTimeout(() => setTranscript(QUESTION), 1500));
    timers.push(setTimeout(() => setPhase('thinking'), 2500));
    timers.push(setTimeout(() => setPhase('speaking'), 3700));
    timers.push(setTimeout(goToReport, 8200));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stream the spoken answer word by word while "speaking".
  useEffect(() => {
    if (phase !== 'speaking') return;
    const words = ANSWER.split(' ');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setSpoken(words.slice(0, i).join(' '));
      if (i >= words.length) clearInterval(id);
    }, 120);
    return () => clearInterval(id);
  }, [phase]);

  const caption =
    phase === 'listening'
      ? 'Listening…'
      : phase === 'thinking'
        ? 'Reading your record…'
        : 'Speaking…';
  const OrbIcon = phase === 'speaking' ? Volume2 : Mic;
  const waveActive = phase !== 'thinking';

  return (
    <LinearGradient
      colors={[t.colors.gradientEnd, t.colors.surfaceMuted, t.colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.flex1}
    >
      <SafeAreaView style={styles.flex1} edges={['top', 'bottom']}>
        {/* Cancel */}
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            onPress={() => nav.goBack()}
            style={[styles.iconBtn, { backgroundColor: t.colors.surface, borderColor: t.colors.border }]}
          >
            <X size={20} color={t.colors.textMuted} strokeWidth={2.4} />
          </Pressable>
        </View>

        {/* Center: orb + transcript + (answer) + waveform */}
        <View style={styles.centerCol}>
          <View style={styles.orbWrap}>
            <Animated.View style={[styles.ring, { backgroundColor: t.colors.accent }, ringStyle]} />
            <LinearGradient
              colors={[t.colors.gradientStart, t.colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.orb, t.shadows.button]}
            >
              <OrbIcon size={46} color={t.palette.white} strokeWidth={2.2} />
            </LinearGradient>
          </View>

          {/* Question (what you asked) */}
          <View style={styles.transcriptWrap}>
            <AppText
              variant="h2"
              color={transcript ? t.colors.text : t.colors.textMuted}
              style={styles.center}
            >
              {transcript || 'Speak your question'}
            </AppText>
          </View>

          {/* Spoken answer (the voice reply, written out as it speaks) */}
          {phase === 'speaking' ? (
            <View style={[styles.answerCard, { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius['2xl'] }, t.shadows.sm]}>
              <View style={styles.answerHead}>
                <Volume2 size={14} color={t.colors.primary} strokeWidth={2.4} />
                <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
                  Answer · from your record
                </AppText>
              </View>
              <AppText variant="body" color={t.colors.text}>
                {spoken}
              </AppText>
            </View>
          ) : null}

          {/* Waveform */}
          <View style={styles.wave}>
            {BAR_BASES.map((b, i) => (
              <WaveBar key={i} base={b} index={i} active={waveActive} />
            ))}
          </View>
        </View>

        {/* Caption + end control */}
        <View style={styles.foot}>
          <AppText variant="secondary" color={t.colors.textMuted} style={styles.center}>
            {caption}
          </AppText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={phase === 'speaking' ? 'Finish and see report' : 'Stop'}
            onPress={goToReport}
            style={[styles.stopBtn, { backgroundColor: t.colors.surface, borderColor: t.colors.primary }, t.shadows.md]}
          >
            <View style={[styles.stopGlyph, { backgroundColor: t.colors.primary, borderRadius: t.radius.sm }]} />
          </Pressable>

          <AppText variant="secondary" color={t.colors.textMuted}>
            {phase === 'speaking' ? 'Tap to see the report' : 'Tap to stop'}
          </AppText>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  center: { textAlign: 'center' },
  centerCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  upper: { textTransform: 'uppercase' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // center column
  orbWrap: { alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: 124,
    height: 124,
    borderRadius: 62,
  },
  orb: {
    width: 124,
    height: 124,
    borderRadius: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transcriptWrap: { minHeight: 40, justifyContent: 'center', marginTop: 36 },
  answerCard: {
    borderWidth: 1,
    padding: 16,
    gap: 8,
    marginTop: 20,
    alignSelf: 'stretch',
  },
  answerHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 60,
    marginTop: 28,
  },
  bar: { width: 4, opacity: 0.9 },
  foot: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  stopBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopGlyph: { width: 26, height: 26 },
});
