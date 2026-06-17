/**
 * Button — primary action uses the teal→cyan gradient pill with a soft teal glow.
 * Variants: primary | secondary | outline | ghost. Native port of
 * MetacuraWeb/src/components/ui/Button.tsx. One primary action per screen.
 */
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const HEIGHT: Record<Size, number> = { sm: 36, md: 44, lg: 56 };
const PAD_X: Record<Size, number> = { sm: 16, md: 24, lg: 32 };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  style,
}: Props) {
  const t = useTheme();
  const height = HEIGHT[size];
  const paddingHorizontal = PAD_X[size];

  const content = () => {
    const color =
      variant === 'primary'
        ? t.colors.textInverse
        : variant === 'secondary'
          ? t.colors.textInverse
          : t.colors.primary;
    return loading ? (
      <ActivityIndicator color={color} />
    ) : (
      <Text style={[styles.label, { color, fontFamily: t.fonts.bodyBold }]}>
        {label}
      </Text>
    );
  };

  const base: ViewStyle = {
    height,
    paddingHorizontal,
    borderRadius: t.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  if (variant === 'primary') {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={disabled || loading}
        onPress={onPress}
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
          t.shadows.button,
          style,
        ]}
      >
        <LinearGradient
          colors={[t.colors.gradientStart, t.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={base}
        >
          {content()}
        </LinearGradient>
      </Pressable>
    );
  }

  const variantStyle: ViewStyle =
    variant === 'secondary'
      ? { backgroundColor: t.colors.primaryStrong }
      : variant === 'outline'
        ? { borderWidth: 2, borderColor: t.colors.primary }
        : {}; // ghost

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        base,
        variantStyle,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
        style,
      ]}
    >
      <View>{content()}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
});
