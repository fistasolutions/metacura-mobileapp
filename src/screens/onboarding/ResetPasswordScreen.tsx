/**
 * Screen 07 · Reset password — set a new password with min-length and match
 * validation. See specs/onboarding.md.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, ScreenHeader, AppText, Button, Input } from '../../components';

export default function ResetPasswordScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const onSubmit = () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    nav.navigate('Login');
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Reset"
        title="Set a new password"
        subtitle="Choose a new password for your MyCare ID."
      />
      <View style={{ gap: t.spacing[4] }}>
        <Input
          label="New password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          label="Confirm password"
          placeholder="Re-enter your password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />

        {error ? (
          <AppText variant="secondary" color={t.colors.high}>
            {error}
          </AppText>
        ) : null}

        <Button label="Save and log in" onPress={onSubmit} />
      </View>
    </Screen>
  );
}
