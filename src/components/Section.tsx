/**
 * Section — a titled block: an editorial header (a short teal bar + uppercase
 * title) with an optional right action, then its children with consistent gap.
 * Gives every screen the same vertical rhythm.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';

type Props = {
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
  gap?: number;
  children: React.ReactNode;
  style?: any;
};

export function Section({ title, actionLabel, onAction, gap, children, style }: Props) {
  const t = useTheme();
  return (
    <View style={[{ gap: gap ?? t.spacing[3] }, style]}>
      {title ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <View style={{ width: 3, height: 16, borderRadius: 2, backgroundColor: t.colors.text }} />
            <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize.lg, color: t.colors.text }}>
              {title}
            </AppText>
          </View>
          {actionLabel && onAction ? (
            <Pressable onPress={onAction} accessibilityRole="button">
              <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
                {actionLabel}
              </AppText>
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
