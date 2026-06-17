/**
 * Typed text helpers. AppText applies a theme text style + color.
 * GradientText approximates the web's italic teal gradient accent word
 * (RN text gradients need masked-view; a strong teal italic reads the same).
 */
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

type Variant = keyof Theme['text'];

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export function AppText({ variant = 'body', color, style, children, ...rest }: Props) {
  const t = useTheme();
  return (
    <Text style={[t.text[variant], { color: color ?? t.colors.text }, style]} {...rest}>
      {children}
    </Text>
  );
}

export function GradientText({ style, children, ...rest }: TextProps & { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <Text
      style={[{ color: t.colors.primaryStrong, fontStyle: 'italic', fontFamily: t.fonts.headingBold }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
