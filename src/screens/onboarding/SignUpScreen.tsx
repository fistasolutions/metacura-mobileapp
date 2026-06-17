/**
 * Screen 03 · Sign Up — create a MyCare ID. Social row, name/email/password,
 * trust line, and a link to Log in. See specs/onboarding.md.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
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

export default function SignUpScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Get started free"
        title="Create your"
        accent="MyCare ID."
        subtitle="One ID for your whole health story. Free forever, no subscription."
      />

      <View style={{ gap: t.spacing[4] }}>
        <SocialButtons />
        <Divider label="or" />

        <Input
          label="Full name"
          placeholder="Sarah Jenkins"
          value={fullName}
          onChangeText={setFullName}
        />
        <Input
          label="Email"
          placeholder="you@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button label="Get started free" onPress={() => nav.navigate('VerifyEmail')} />

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
    </Screen>
  );
}
