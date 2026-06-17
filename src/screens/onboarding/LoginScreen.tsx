/**
 * Screen 05 · Log In — open your record. Social row, FaceID, email/password,
 * remember-me and forgot-password row. See specs/onboarding.md.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Fingerprint, Check } from 'lucide-react-native';
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

export default function LoginScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <Screen>
      <ScreenHeader eyebrow="Welcome back" title="Open your" accent="record." />

      <View style={{ gap: t.spacing[4] }}>
        <SocialButtons />

        <Pressable
          onPress={() => nav.navigate('App')}
          accessibilityRole="button"
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: t.spacing[2],
            height: 48,
            borderRadius: t.radius.xl,
            backgroundColor: t.colors.surfaceMuted,
            borderWidth: 1,
            borderColor: t.colors.borderStrong,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Fingerprint size={18} color={t.colors.primary} strokeWidth={2.2} />
          <AppText style={{ fontFamily: t.fonts.bodySemibold, color: t.colors.primary }}>
            Sign in with FaceID
          </AppText>
        </Pressable>

        <Divider label="or" />

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
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable
            onPress={() => setRemember(r => !r)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: t.radius.sm,
                borderWidth: 1.5,
                borderColor: remember ? t.colors.primary : t.colors.borderStrong,
                backgroundColor: remember ? t.colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {remember ? <Check size={14} color={t.colors.textInverse} strokeWidth={3} /> : null}
            </View>
            <AppText variant="secondary" color={t.colors.textMuted}>
              Remember me
            </AppText>
          </Pressable>

          <Pressable onPress={() => nav.navigate('ForgotPassword')} accessibilityRole="button">
            <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
              Forgot password?
            </AppText>
          </Pressable>
        </View>

        <Button label="Log in" onPress={() => nav.navigate('App')} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing[1] }}>
          <AppText variant="secondary" color={t.colors.textMuted}>
            New to MetaCura?
          </AppText>
          <Pressable onPress={() => nav.navigate('SignUp')} accessibilityRole="button">
            <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
              Get started free
            </AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
