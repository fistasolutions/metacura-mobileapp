/**
 * Screen — themed, safe-area-aware page wrapper. Scrolls by default.
 * A faint teal page wash sits behind the content so crystal cards read as
 * floating glass. Teal as accent, not flood.
 */
import React from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  background?: string;
  wash?: boolean;
};

export function Screen({
  children,
  scroll = true,
  padded = true,
  edges = ['top'],
  contentStyle,
  background,
  wash = true,
}: Props) {
  const t = useTheme();
  const bg = background ?? t.colors.background;
  const pad = padded ? { padding: t.spacing[5] } : undefined;

  const washColors =
    t.mode === 'dark'
      ? ['#0B1211', '#0A0F0E']
      : ['#DBF7F0', '#EFFCFA', '#FFFFFF'];

  const Backdrop = () =>
    wash ? (
      <LinearGradient
        colors={washColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        pointerEvents="none"
      />
    ) : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={edges}>
      <Backdrop />
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[{ paddingBottom: t.spacing[12] }, pad, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, pad, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
