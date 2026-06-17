/**
 * Screen 04 · Verify email — 6-digit code entry with a 60s resend countdown.
 * See specs/onboarding.md.
 */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, ScreenHeader, AppText, Button, Input } from '../../components';

export default function VerifyEmailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const onChange = (text: string) => setCode(text.replace(/\D/g, '').slice(0, 6));
  const ready = code.length === 6;

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Step 1 of 2 · Verify"
        title="Check your inbox"
        subtitle="We sent a 6-digit code to your email. Enter it to continue. Check spam if you do not see it."
      />

      <View style={{ gap: t.spacing[4] }}>
        <Input
          label="6-digit code"
          placeholder="000000"
          value={code}
          onChangeText={onChange}
          keyboardType="number-pad"
          maxLength={6}
        />

        <Button label="Continue" disabled={!ready} onPress={() => nav.navigate('ProfileSetup')} />

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {seconds > 0 ? (
            <AppText variant="secondary" color={t.colors.textMuted}>
              Resend code in {seconds}s
            </AppText>
          ) : (
            <Pressable onPress={() => setSeconds(60)} accessibilityRole="button">
              <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
                Resend code
              </AppText>
            </Pressable>
          )}
        </View>
      </View>
    </Screen>
  );
}
