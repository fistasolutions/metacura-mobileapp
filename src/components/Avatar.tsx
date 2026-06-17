/**
 * Avatar — initials in a rounded tile.
 */
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../theme';

export function Avatar({
  initials,
  size = 48,
  onPrimary,
}: {
  initials: string;
  size?: number;
  onPrimary?: boolean;
}) {
  const t = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 3.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: onPrimary ? 'rgba(255,255,255,0.18)' : t.colors.surfaceMuted,
      }}
    >
      <Text
        style={{
          fontFamily: t.fonts.bodyBold,
          fontSize: size * 0.38,
          color: onPrimary ? t.colors.textInverse : t.colors.primary,
        }}
      >
        {initials.toUpperCase()}
      </Text>
    </View>
  );
}
