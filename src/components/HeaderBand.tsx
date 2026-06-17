/**
 * HeaderBand — a rich-minimal hero panel for a tab landing: a soft teal-tinted
 * gradient surface with one ambient blob, an eyebrow, a headline (with optional
 * italic gradient accent), a one-line value statement, and an optional right
 * action. Mirrors the web's header band. Teal as accent, not flood.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText, GradientText } from './Text';
import { SectionEyebrow } from './SectionEyebrow';

type Props = {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  right?: React.ReactNode;
  onBack?: () => void;
  backLabel?: string;
};

export function HeaderBand({ eyebrow, title, accent, subtitle, right, onBack, backLabel = 'Back' }: Props) {
  const t = useTheme();
  const tint =
    t.mode === 'dark' ? 'rgba(45,212,191,0.08)' : 'rgba(240,253,250,0.9)';
  return (
    <LinearGradient
      colors={[tint, t.colors.surface]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: t.radius['3xl'],
        borderWidth: 1,
        borderColor: t.colors.border,
        padding: t.spacing[5],
        overflow: 'hidden',
        marginBottom: t.spacing[5],
      }}
    >
      {/* Ambient blob */}
      <View
        style={{
          position: 'absolute',
          top: -60,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: t.mode === 'dark' ? 'rgba(45,212,191,0.10)' : 'rgba(94,234,212,0.22)',
        }}
        pointerEvents="none"
      />
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: t.spacing[3] }}
        >
          <ChevronLeft size={18} color={t.colors.textMuted} strokeWidth={2.4} />
          <AppText variant="secondary" color={t.colors.textMuted}>
            {backLabel}
          </AppText>
        </Pressable>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: t.spacing[3] }}>
        <View style={{ flex: 1, gap: t.spacing[3] }}>
          {eyebrow ? <SectionEyebrow label={eyebrow} /> : null}
          <AppText variant="h1">
            {title}
            {accent ? <GradientText style={{ fontSize: t.fontSize['3xl'] }}> {accent}</GradientText> : null}
          </AppText>
          {subtitle ? (
            <AppText variant="secondary" color={t.colors.textMuted}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
        {right ? <View style={{ paddingBottom: 2 }}>{right}</View> : null}
      </View>
    </LinearGradient>
  );
}
