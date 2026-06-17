/**
 * Screen 02 · Welcome carousel — four slides from WELCOME_SLIDES with a Next
 * button, pagination dots, and the entry actions on the last slide.
 * See specs/onboarding.md.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Upload,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  LucideIcon,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, AppText, Button } from '../../components';
import { WELCOME_SLIDES } from '../../data';

const ICONS: Record<string, LucideIcon> = {
  Upload,
  Sparkles,
  MessageCircle,
  ShieldCheck,
};

export default function WelcomeScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [index, setIndex] = useState(0);

  const slide = WELCOME_SLIDES[index];
  const Icon = ICONS[slide.icon] ?? Upload;
  const isLast = index === WELCOME_SLIDES.length - 1;

  return (
    <Screen scroll={false} contentStyle={{ flex: 1 }}>
      <AppText style={{ fontFamily: t.fonts.brand, fontSize: t.fontSize['2xl'], color: t.colors.primaryStrong }}>
        MetaCura
      </AppText>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: t.spacing[6] }}>
        <LinearGradient
          colors={[t.colors.gradientStart, t.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: t.radius['2xl'],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={36} color={t.palette.white} strokeWidth={2.2} />
        </LinearGradient>

        <View style={{ alignItems: 'center', gap: t.spacing[3], paddingHorizontal: t.spacing[2] }}>
          <AppText variant="h1" style={{ textAlign: 'center' }}>
            {slide.title}
          </AppText>
          <AppText variant="body" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
            {slide.body}
          </AppText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing[2], marginBottom: t.spacing[6] }}>
        {WELCOME_SLIDES.map((_, i) => (
          <View
            key={i}
            style={{
              height: 6,
              width: i === index ? 22 : 6,
              borderRadius: t.radius.pill,
              backgroundColor: i === index ? t.colors.primary : t.colors.border,
            }}
          />
        ))}
      </View>

      {isLast ? (
        <View style={{ gap: t.spacing[3] }}>
          <Button label="Get started free" onPress={() => nav.navigate('SignUp')} />
          <Button label="Log in" variant="outline" onPress={() => nav.navigate('Login')} />
          <Pressable
            onPress={() => nav.navigate('DemoIntro')}
            accessibilityRole="button"
            style={({ pressed }) => ({
              height: 56,
              borderRadius: t.radius.pill,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: t.colors.surfaceMuted,
              borderWidth: 1,
              borderColor: t.colors.borderStrong,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <AppText style={{ fontFamily: t.fonts.bodyBold, color: t.colors.primary }}>
              Try lab demo
            </AppText>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => setIndex(i => i + 1)}
          accessibilityRole="button"
          style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }, t.shadows.button]}
        >
          <LinearGradient
            colors={[t.colors.gradientStart, t.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              borderRadius: t.radius.pill,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: t.spacing[2],
            }}
          >
            <AppText style={{ fontFamily: t.fonts.bodyBold, color: t.colors.textInverse }}>
              Continue
            </AppText>
            <ChevronRight size={18} color={t.colors.textInverse} strokeWidth={2.4} />
          </LinearGradient>
        </Pressable>
      )}
    </Screen>
  );
}
