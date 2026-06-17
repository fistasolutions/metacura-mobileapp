/**
 * Badge — small label capsule. The `source` variant is the source-pill base:
 * tap a source pill and the original document opens to the exact line (Source
 * sheet). Native port of MetacuraWeb/src/components/ui/Badge.tsx (glass variant).
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Variant = 'default' | 'success' | 'outline' | 'source';

type Props = {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  style?: ViewStyle;
};

export function Badge({ label, variant = 'default', onPress, style }: Props) {
  const t = useTheme();

  const variants: Record<Variant, { bg: string; fg: string; border: string }> =
    {
      default: {
        bg: t.colors.primary,
        fg: t.colors.textInverse,
        border: 'transparent',
      },
      success: {
        bg: t.colors.normalBg,
        fg: t.colors.success,
        border: t.colors.success,
      },
      outline: {
        bg: 'transparent',
        fg: t.colors.text,
        border: t.colors.primary,
      },
      source: {
        bg: t.colors.surfaceMuted,
        fg: t.colors.primary,
        border: t.colors.borderStrong,
      },
    };
  const v = variants[variant];

  const body = (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          borderRadius: t.radius.pill,
        },
        style,
      ]}
    >
      <Text style={[t.text.eyebrow, { color: v.fg, textTransform: 'uppercase' }]}>
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" onPress={onPress}>
        {body}
      </Pressable>
    );
  }
  return body;
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
