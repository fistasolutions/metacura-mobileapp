/**
 * Screen 04 · Verify — 6-digit OTP sent to the user's email or phone. When both
 * are on file a segmented toggle switches the delivery channel; the masked
 * destination is shown above the code field. 60s resend countdown.
 * See specs/onboarding.md.
 */
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, ScreenHeader, AppText, Button, OtpInput } from '../../components';

type Method = 'email' | 'phone';

function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain) return email;
  const head = name.slice(0, 1);
  return `${head}•••@${domain}`;
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const last = digits.slice(-4);
  return `••• ••• ${last || '••••'}`;
}

export default function VerifyEmailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  const email: string | undefined = route.params?.email;
  const phone: string | undefined = route.params?.phone;
  const hasBoth = !!email && !!phone;

  const [method, setMethod] = useState<Method>(email ? 'email' : 'phone');
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const ready = code.length === 6;
  const destination =
    method === 'email'
      ? email
        ? maskEmail(email)
        : 'your email'
      : phone
        ? maskPhone(phone)
        : 'your phone';

  const switchMethod = (m: Method) => {
    if (m === method) return;
    setMethod(m);
    setCode('');
    setSeconds(60);
  };

  return (
    <Screen contentStyle={{ flexGrow: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          eyebrow="Step 1 of 2 · Verify"
          title="Verify it's you"
          subtitle={`We sent a 6-digit code to ${destination}. Enter it to continue.`}
        />

        {/* Email / Phone channel toggle (only when both are on file). */}
        {hasBoth ? (
          <View style={[styles.segment, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.pill }]}>
            {(['email', 'phone'] as Method[]).map(m => {
              const active = m === method;
              return (
                <Pressable
                  key={m}
                  onPress={() => switchMethod(m)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={[
                    styles.segmentBtn,
                    { borderRadius: t.radius.pill, backgroundColor: active ? t.colors.surface : 'transparent' },
                    active ? t.shadows.sm : null,
                  ]}
                >
                  <AppText
                    variant="secondary"
                    color={active ? t.colors.primary : t.colors.textMuted}
                    style={{ fontFamily: t.fonts.bodySemibold }}
                  >
                    {m === 'email' ? 'Email' : 'Phone'}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        ) : null}

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
          {method === 'email' ? (
            <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
              Check spam if you do not see it.
            </AppText>
          ) : null}
        </View>

        <View style={{ gap: t.spacing[4] }}>
          <Button label="Continue" disabled={!ready} onPress={() => nav.navigate('ProfileSetup')} />

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {seconds > 0 ? (
              <AppText variant="secondary" color={t.colors.textMuted}>
                Resend code in {seconds}s
              </AppText>
            ) : (
              <Pressable onPress={() => setSeconds(60)} accessibilityRole="button">
                <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
                  {method === 'email' ? 'Resend email code' : 'Resend SMS code'}
                </AppText>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    padding: 4,
    marginTop: 20,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
  },
});
