/**
 * ScreenScaffold — themed placeholder shell used by the 35 screen stubs.
 * Renders the screen number, title, and a one-line description over a
 * safe-area-aware, theme-aware surface. Replace each stub's body with the real
 * UI as the matching spec is built (see specs/ for the per-screen contract).
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { SectionEyebrow } from './SectionEyebrow';

type Props = {
  screenNo: string; // e.g. "11"
  title: string;
  subtitle: string;
  spec: string; // e.g. "specs/home.md"
  eyebrow?: string;
  children?: React.ReactNode;
};

export function ScreenScaffold({
  screenNo,
  title,
  subtitle,
  spec,
  eyebrow,
  children,
}: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: t.colors.background }}
      contentContainerStyle={{
        paddingTop: insets.top + t.spacing[6],
        paddingHorizontal: t.spacing[5],
        paddingBottom: insets.bottom + t.spacing[12],
        gap: t.spacing[4],
      }}
    >
      <SectionEyebrow label={eyebrow ?? `Screen ${screenNo}`} />
      <Text style={[t.text.h1, { color: t.colors.text }]}>{title}</Text>
      <Text style={[t.text.body, { color: t.colors.textMuted }]}>
        {subtitle}
      </Text>
      <View
        style={[
          styles.specRow,
          { borderColor: t.colors.border, borderRadius: t.radius.lg },
        ]}
      >
        <Text style={[t.text.secondary, { color: t.colors.textMuted }]}>
          Spec ·{' '}
        </Text>
        <Text
          style={[
            t.text.mono,
            { color: t.colors.primary, fontSize: t.fontSize.sm },
          ]}
        >
          {spec}
        </Text>
      </View>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },
});
