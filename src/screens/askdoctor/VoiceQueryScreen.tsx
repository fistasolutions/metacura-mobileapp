// Screen 21 · Voice query — full-screen voice capture, presented modally.
// see specs/askdoctor.md. Voice is a peer to text: a large pulsing mic, a live
// transcription that grows, and a waveform. On release we return to the thread.
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Mic, X } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { AppText, IconCircle } from '../../components';

// The canned transcription grows in stages to simulate live capture.
const TRANSCRIPT_STAGES = ['', 'Why is my…', 'Why is my LDL high?'];

// 13 waveform bars with varying heights.
const BAR_HEIGHTS = [12, 22, 34, 18, 44, 28, 52, 30, 46, 20, 36, 24, 14];

export default function VoiceQueryScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  const [transcript, setTranscript] = useState('');
  const [caption, setCaption] = useState('Listening…');

  const pulse = useRef(new Animated.Value(0)).current;

  // Pulsing mic ring.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  // Grow the transcription, then switch the caption.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setTranscript(TRANSCRIPT_STAGES[1]), 700));
    timers.push(setTimeout(() => setTranscript(TRANSCRIPT_STAGES[2]), 1600));
    timers.push(
      setTimeout(() => setCaption('Got it, reading your record…'), 2400),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0],
  });

  return (
    <LinearGradient
      colors={[t.colors.gradientEnd, t.colors.surfaceMuted, t.colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Cancel */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: t.spacing[5],
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            onPress={() => nav.goBack()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: t.colors.surface,
              borderWidth: 1,
              borderColor: t.colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} color={t.colors.textMuted} strokeWidth={2.4} />
          </Pressable>
        </View>

        {/* Center: pulsing mic + transcript + waveform */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: t.spacing[6],
            gap: t.spacing[8],
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View
              style={{
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: t.colors.accent,
                opacity: ringOpacity,
                transform: [{ scale: ringScale }],
              }}
            />
            <IconCircle icon={Mic} size={120} tone="brand" radius={60} />
          </View>

          {/* Live transcription */}
          <View style={{ minHeight: 40, justifyContent: 'center' }}>
            <AppText
              variant="h2"
              color={transcript ? t.colors.text : t.colors.textMuted}
              style={{ textAlign: 'center' }}
            >
              {transcript || 'Speak your question'}
            </AppText>
          </View>

          {/* Waveform */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              height: 56,
            }}
          >
            {BAR_HEIGHTS.map((h, i) => (
              <View
                key={i}
                style={{
                  width: 4,
                  height: h,
                  borderRadius: t.radius.pill,
                  backgroundColor: t.colors.primary,
                  opacity: 0.85,
                }}
              />
            ))}
          </View>
        </View>

        {/* Caption + Stop */}
        <View
          style={{
            alignItems: 'center',
            gap: t.spacing[5],
            paddingHorizontal: t.spacing[6],
            paddingBottom: t.spacing[8],
          }}
        >
          <AppText
            variant="secondary"
            color={t.colors.textMuted}
            style={{ textAlign: 'center' }}
          >
            {caption}
          </AppText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Stop"
            onPress={() => nav.goBack()}
            style={[
              {
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: t.colors.surface,
                borderWidth: 2,
                borderColor: t.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              },
              t.shadows.md,
            ]}
          >
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: t.radius.sm,
                backgroundColor: t.colors.primary,
              }}
            />
          </Pressable>

          <AppText variant="secondary" color={t.colors.textMuted}>
            Tap to stop
          </AppText>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
