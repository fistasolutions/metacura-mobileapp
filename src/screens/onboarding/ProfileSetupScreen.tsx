/**
 * Screen 08 · Profile setup — who you manage health for and what journey you
 * are on. Selectable pills plus an inline dropdown. See specs/onboarding.md.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, ScreenHeader, AppText, Button, Card } from '../../components';
import { PROFILE_TYPES, HEALTH_FOCUS_OPTIONS } from '../../data';

export default function ProfileSetupScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [selectedType, setSelectedType] = useState<string>('myself');
  const [focus, setFocus] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = () => {
    if (!focus) {
      setError('Pick a health focus so we can set up your experience.');
      return;
    }
    setError('');
    nav.navigate('App');
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Step 2 of 2 · Set up"
        title="Set up your experience"
        subtitle="Two quick questions help us tailor MetaCura from day one."
      />

      <View style={{ gap: t.spacing[5] }}>
        <View style={{ gap: t.spacing[3] }}>
          <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
            Who are you managing health for?
          </AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
            {PROFILE_TYPES.map(pt => {
              const active = pt.id === selectedType;
              return (
                <Pressable
                  key={pt.id}
                  onPress={() => setSelectedType(pt.id)}
                  accessibilityRole="button"
                  style={({ pressed }) => ({
                    paddingHorizontal: t.spacing[4],
                    paddingVertical: t.spacing[2],
                    borderRadius: t.radius.pill,
                    borderWidth: 1,
                    borderColor: active ? t.colors.primary : t.colors.borderStrong,
                    backgroundColor: active ? t.colors.primary : t.colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <AppText
                    variant="secondary"
                    color={active ? t.colors.textInverse : t.colors.text}
                    style={{ fontFamily: t.fonts.bodySemibold }}
                  >
                    {pt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ gap: t.spacing[3] }}>
          <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
            What kind of health journey are you on?
          </AppText>

          <Pressable
            onPress={() => setOpen(o => !o)}
            accessibilityRole="button"
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1.5,
              borderColor: open ? t.colors.accent : t.colors.border,
              backgroundColor: t.colors.surface,
              borderRadius: t.radius.xl,
              paddingHorizontal: t.spacing[4],
              paddingVertical: t.spacing[3] + 1,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <AppText variant="body" color={focus ? t.colors.text : t.colors.textMuted}>
              {focus ?? 'Choose a focus'}
            </AppText>
            <ChevronDown size={18} color={t.colors.textMuted} strokeWidth={2.2} />
          </Pressable>

          {open ? (
            <Card padded={false} style={{ overflow: 'hidden' }}>
              {HEALTH_FOCUS_OPTIONS.map((opt, i) => {
                const active = opt === focus;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => {
                      setFocus(opt);
                      setOpen(false);
                      setError('');
                    }}
                    accessibilityRole="button"
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: t.spacing[4],
                      paddingVertical: t.spacing[3],
                      borderTopWidth: i === 0 ? 0 : 1,
                      borderTopColor: t.colors.border,
                      backgroundColor: active ? t.colors.surfaceMuted : 'transparent',
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <AppText
                      variant="body"
                      color={active ? t.colors.primary : t.colors.text}
                      style={{ fontFamily: active ? t.fonts.bodySemibold : t.fonts.body }}
                    >
                      {opt}
                    </AppText>
                    {active ? <Check size={16} color={t.colors.primary} strokeWidth={2.6} /> : null}
                  </Pressable>
                );
              })}
            </Card>
          ) : null}
        </View>

        {error ? (
          <AppText variant="secondary" color={t.colors.high}>
            {error}
          </AppText>
        ) : null}

        <Button label="Enter MetaCura" onPress={onSubmit} />
      </View>
    </Screen>
  );
}
