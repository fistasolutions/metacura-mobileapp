/**
 * Screen 09 · Demo intro — hero with a big gradient play button and a flag
 * legend. See specs/demo.md.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Play } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, AppText, GradientText, SectionEyebrow, BackLink } from '../../components';

function LegendDot({ color, label }: { color: string; label: string }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
      <AppText variant="secondary" color={t.colors.textMuted}>
        {label}
      </AppText>
    </View>
  );
}

export default function DemoIntroScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  return (
    <Screen scroll={false} contentStyle={{ flex: 1 }}>
      <BackLink />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: t.spacing[6] }}>
        <SectionEyebrow label="Try the lab demo" />

        <AppText variant="h1" style={{ textAlign: 'center' }}>
          One lab report,
          <GradientText style={{ fontSize: t.fontSize['3xl'] }}> read back in plain language.</GradientText>
        </AppText>

        <AppText variant="body" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
          Watch a sample lab arrive, get read, and open into a clear panel. Every value flagged, every answer linked back to its source line.
        </AppText>

        <Pressable
          onPress={() => nav.navigate('DemoPlayback')}
          accessibilityRole="button"
          style={({ pressed }) => [{ alignItems: 'center', gap: t.spacing[3], opacity: pressed ? 0.92 : 1 }]}
        >
          <LinearGradient
            colors={[t.colors.gradientStart, t.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              {
                width: 96,
                height: 96,
                borderRadius: 48,
                alignItems: 'center',
                justifyContent: 'center',
              },
              t.shadows.button,
            ]}
          >
            <Play size={36} color={t.palette.white} fill={t.palette.white} strokeWidth={2} />
          </LinearGradient>
          <AppText style={{ fontFamily: t.fonts.bodyBold, color: t.colors.primary }}>
            Play the demo
          </AppText>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing[5], marginBottom: t.spacing[4] }}>
        <LegendDot color={t.colors.high} label="High" />
        <LegendDot color={t.colors.low} label="Low" />
        <LegendDot color={t.colors.normal} label="Normal" />
      </View>
    </Screen>
  );
}
