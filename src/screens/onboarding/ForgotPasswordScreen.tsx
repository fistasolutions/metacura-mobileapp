/**
 * Screen 06 · Forgot password — request a reset link, then a sent-confirmation
 * state. See specs/onboarding.md.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, ScreenHeader, AppText, Button, Input, Card } from '../../components';

export default function ForgotPasswordScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <Screen contentStyle={{ flexGrow: 1 }} edges={['top', 'bottom']}>
        <View style={{ flex: 1 }}>
          <ScreenHeader
            eyebrow="Check your inbox"
            title="Reset link sent"
            subtitle="If an account exists for that email, a reset link is on its way."
          />
          <Card style={{ backgroundColor: t.colors.normalBg, borderColor: t.colors.borderStrong }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
              <CheckCircle2 size={24} color={t.colors.normal} strokeWidth={2.2} />
              <AppText variant="body" style={{ flex: 1, fontFamily: t.fonts.bodySemibold }}>
                Check your inbox to continue.
              </AppText>
            </View>
          </Card>

          {/* Flexible spacer fills the screen so the action sits at the foot. */}
          <View style={{ flex: 1, minHeight: t.spacing[6] }} />

          <Pressable onPress={() => nav.navigate('Login')} accessibilityRole="button" style={{ alignSelf: 'center' }}>
            <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
              Back to log in
            </AppText>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen contentStyle={{ flexGrow: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          onBack={() => nav.goBack()}
          eyebrow="Reset"
          title="Forgot your password?"
          subtitle="Enter your email and we will send a reset link."
        />
        <View style={{ gap: t.spacing[4] }}>
          <Input
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Flexible spacer fills the screen so the action sits at the foot. */}
        <View style={{ flex: 1, minHeight: t.spacing[6] }} />

        <Button label="Send reset link" onPress={() => setSent(true)} />
      </View>
    </Screen>
  );
}
