/**
 * Toggle — themed on/off switch.
 */
import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../theme';

export function Toggle({ value, onValueChange }: { value: boolean; onValueChange: (v: boolean) => void }) {
  const t = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: t.colors.border, true: t.colors.primary }}
      thumbColor={t.colors.surface}
      ios_backgroundColor={t.colors.border}
    />
  );
}
