/**
 * Card — white (or near-black in dark) surface, hairline border, soft layered
 * shadow. The default container for content blocks. Restraint over decoration.
 */
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  elevated?: boolean;
};

export function Card({ children, style, padded = true, elevated = true }: Props) {
  const t = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: t.colors.surface,
          borderColor: t.colors.border,
          borderWidth: 1,
          borderRadius: t.radius['2xl'],
          padding: padded ? t.spacing[5] : 0,
        },
        elevated ? t.shadows.card : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
