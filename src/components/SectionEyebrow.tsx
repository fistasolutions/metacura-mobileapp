/**
 * SectionEyebrow — the shared screen/section label capsule.
 * A rounded-full pill with a teal dot and an uppercase wide-tracked label.
 * Native port of MetacuraWeb/src/components/landing/SectionEyebrow.tsx.
 * Reuse this; do not invent ad-hoc pill markup.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

export function SectionEyebrow({ label }: { label: string }) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: t.colors.surfaceMuted,
          borderColor: t.colors.borderStrong,
          borderRadius: t.radius.pill,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: t.colors.accent }]} />
      <Text
        style={[
          t.text.eyebrow,
          { color: t.colors.primary, textTransform: 'uppercase' },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
