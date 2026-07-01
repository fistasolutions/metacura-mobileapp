/**
 * Input — labeled text field. Rounded, hairline border, teal focus ring.
 */
import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

type Props = TextInputProps & {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input({ label, containerStyle, style, onFocus, onBlur, ...rest }: Props) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View style={[{ gap: 8 }, containerStyle]}>
      {label ? (
        <Text style={[t.text.secondary, { color: t.colors.textMuted, fontFamily: t.fonts.bodySemibold, fontSize: 12 }]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={t.colors.textMuted}
        onFocus={e => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          {
            borderWidth: 1.5,
            borderColor: focused ? t.colors.accent : t.colors.border,
            backgroundColor: t.colors.surface,
            borderRadius: t.radius.xl,
            paddingHorizontal: 16,
            paddingVertical: 13,
            fontSize: 15,
            fontFamily: t.fonts.body,
            color: t.colors.text,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}
