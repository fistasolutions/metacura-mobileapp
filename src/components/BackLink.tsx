/**
 * BackLink — the standard "‹ Back" affordance, matching the link inside
 * ScreenHeader. Self-wires to navigation: it pops the current screen and
 * renders nothing when there is nowhere to go back to (e.g. a tab root), so it
 * is safe to drop at the top of any screen.
 */
import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';

type Props = {
  label?: string;
  onPress?: () => void;
};

export function BackLink({ label = 'Back', onPress }: Props) {
  const t = useTheme();
  const nav = useNavigation<any>();

  if (!onPress && !nav.canGoBack()) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress ?? (() => nav.goBack())}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}
    >
      <ChevronLeft size={18} color={t.colors.textMuted} strokeWidth={2.4} />
      <AppText variant="secondary" color={t.colors.textMuted}>
        {label}
      </AppText>
    </Pressable>
  );
}
