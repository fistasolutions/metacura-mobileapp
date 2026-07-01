/**
 * Screen 04 · Verify — a single 6-digit OTP sent to the one contact the user
 * signed up with (an email or a phone number; auto-detected and masked).
 * No channel toggle: one identifier, one code. 60s resend countdown.
 * See specs/onboarding.md.
 */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, ScreenHeader, AppText, Button, OtpInput } from '../../components';

function isEmail(value: string): boolean {
  return value.includes('@');
}

function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain) return email;
  return `${name.slice(0, 1)}•••@${domain}`;
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `••• ••• ${digits.slice(-4) || '••••'}`;
}

/**
 * Owns its own 60s countdown so the per-second tick re-renders only this small
 * subtree, not the OtpInput. Re-rendering a focused TextInput every second tears
 * down the Android IME connection and dismisses the keyboard mid-entry.
 */
function ResendTimer() {
  const t = useTheme();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  if (seconds > 0) {
    return (
      <AppText variant="secondary" color={t.colors.textMuted}>
        Resend code in {seconds}s
      </AppText>
    );
  }

  return (
    <Pressable onPress={() => setSeconds(60)} accessibilityRole="button">
      <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
        Resend code
      </AppText>
    </Pressable>
  );
}

export default function VerifyEmailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  // One identifier — email or phone. Fall back to legacy params if present.
  const identifier: string =
    route.params?.identifier ?? route.params?.email ?? route.params?.phone ?? '';
  const emailChannel = isEmail(identifier);
  const destination = identifier
    ? emailChannel
      ? maskEmail(identifier)
      : maskPhone(identifier)
    : 'your email or phone';

  const [code, setCode] = useState('');

  const ready = code.length === 6;

  return (
    <Screen contentStyle={{ flexGrow: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          eyebrow="Step 1 of 2 · Verify"
          title="Verify it's you"
          subtitle={`We sent a 6-digit code to ${destination}. Enter it to continue.`}
        />

        {/* Centered code entry fills the space between header and footer. */}
        <View style={{ flex: 1, justifyContent: 'center', gap: t.spacing[4] }}>
          <AppText
            variant="eyebrow"
            color={t.colors.textMuted}
            style={{ textAlign: 'center', textTransform: 'uppercase' }}
          >
            Enter your 6-digit code
          </AppText>
          <OtpInput value={code} onChangeText={setCode} length={6} autoFocus />
          {emailChannel ? (
            <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
              Check spam if you do not see it.
            </AppText>
          ) : null}
        </View>

        <View style={{ gap: t.spacing[4] }}>
          <Button label="Continue" disabled={!ready} onPress={() => nav.navigate('ProfileSetup')} />

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ResendTimer />
          </View>
        </View>
      </View>
    </Screen>
  );
}
