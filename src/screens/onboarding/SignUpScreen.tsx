/**
 * Screen 03 · Sign Up — create a MyCare ID. Social row, name / email / phone /
 * password, a live password-requirement checklist, trust line, and a link to
 * Log in. Continue routes to Verify with the email + phone for OTP. See
 * specs/onboarding.md.
 */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import {
  Screen,
  ScreenHeader,
  AppText,
  Button,
  Input,
  SocialButtons,
  Divider,
} from '../../components';
import { TRUST_LINE } from '../../data';

// Password policy: min 8 chars, upper + lowercase, a number, a special char.
const PASSWORD_RULES: { key: string; label: string; test: (p: string) => boolean }[] = [
  { key: 'len', label: 'At least 8 characters', test: p => p.length >= 8 },
  { key: 'case', label: 'Upper & lowercase letters', test: p => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { key: 'num', label: 'A number', test: p => /\d/.test(p) },
  { key: 'special', label: 'A special character', test: p => /[^A-Za-z0-9]/.test(p) },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const phoneDigits = phone.replace(/\D/g, '');
  const passwordOk = PASSWORD_RULES.every(r => r.test(password));
  const canSubmit =
    fullName.trim().length > 1 &&
    EMAIL_RE.test(email) &&
    phoneDigits.length >= 10 &&
    passwordOk;

  const onSubmit = () => {
    if (!canSubmit) return;
    nav.navigate('VerifyEmail', { email, phone });
  };

  return (
    <Screen scroll={false} contentStyle={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          eyebrow="Get started free"
          title="Create your"
          accent="MyCare ID."
          subtitle="One ID for your whole health story."
        />

        <View style={{ gap: t.spacing[3] }}>
          <SocialButtons />
          <Divider label="or" />

          <Input
            label="Full name"
            placeholder="Sarah Jenkins"
            value={fullName}
            onChangeText={setFullName}
            style={styles.dense}
          />
          <Input
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.dense}
          />
          <Input
            label="Phone number"
            placeholder="+1 415 555 0132"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
            style={styles.dense}
          />

          <View style={{ gap: t.spacing[2] }}>
            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              style={styles.dense}
            />
            {/* Live requirement checklist — two columns to stay compact */}
            <View style={styles.checklist}>
              {PASSWORD_RULES.map(rule => {
                const ok = rule.test(password);
                return (
                  <View key={rule.key} style={styles.ruleItem}>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: ok ? t.colors.primary : 'transparent',
                        borderWidth: ok ? 0 : 1.5,
                        borderColor: t.colors.borderStrong,
                      }}
                    >
                      {ok ? <Check size={10} color={t.colors.textInverse} strokeWidth={3} /> : null}
                    </View>
                    <AppText variant="secondary" color={ok ? t.colors.text : t.colors.textMuted}>
                      {rule.label}
                    </AppText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Flexible spacer keeps the action area at the foot without scrolling. */}
        <View style={{ flex: 1, minHeight: t.spacing[4] }} />

        <View style={{ gap: t.spacing[3] }}>
          <Button label="Get started free" disabled={!canSubmit} onPress={onSubmit} />

          <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
            {TRUST_LINE}
          </AppText>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing[1] }}>
            <AppText variant="secondary" color={t.colors.textMuted}>
              Already have an account?
            </AppText>
            <Pressable onPress={() => nav.navigate('Login')} accessibilityRole="button">
              <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
                Log in
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dense: {
    paddingVertical: 11,
  },
  checklist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    columnGap: 12,
    paddingTop: 2,
  },
  ruleItem: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
