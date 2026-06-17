/**
 * GlassCard — a crystalline box: a translucent vertical gradient surface with a
 * glossy top sheen, a crisp light edge, and a soft layered shadow. Reads as
 * floating frosted glass over the page wash. Use for metric tiles, tier cards,
 * and other prominent boxes.
 *
 * Layout: pass `style` for outer box layout (flex, width, margin); pass
 * `contentStyle` for inner content (gap, alignment). Shadow sits on the outer
 * view (unclipped); the gradient + gloss are clipped to the rounded corners.
 */
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  padded?: boolean;
  radius?: number;
};

export function GlassCard({ children, style, contentStyle, padded = true, radius }: Props) {
  const t = useTheme();
  const r = radius ?? t.radius['2xl'];

  const fill =
    t.mode === 'dark'
      ? ['rgba(34,46,44,0.85)', 'rgba(16,22,21,0.60)']
      : ['rgba(255,255,255,0.98)', 'rgba(232,251,247,0.74)'];
  const edge = t.mode === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.95)';
  const ring = t.mode === 'dark' ? 'rgba(94,234,212,0.24)' : 'rgba(20,184,166,0.22)';
  const gloss =
    t.mode === 'dark'
      ? ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']
      : ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0)'];

  return (
    <View style={[{ borderRadius: r, backgroundColor: t.colors.surface }, t.shadows.card, style]}>
      <LinearGradient
        colors={fill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          {
            borderRadius: r,
            borderWidth: 1,
            borderColor: ring,
            padding: padded ? t.spacing[5] : 0,
            overflow: 'hidden',
          },
          contentStyle,
        ]}
      >
        {/* glossy top sheen */}
        <LinearGradient
          colors={gloss}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72 }}
          pointerEvents="none"
        />
        {/* crisp light top edge */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: edge,
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
        {children}
      </LinearGradient>
    </View>
  );
}
