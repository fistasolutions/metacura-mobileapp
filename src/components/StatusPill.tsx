/**
 * StatusPill — the High / Low / Normal flag, colored against the user's own
 * history (not generic reference ranges). High = red, Low = amber, Normal = teal.
 * Native port of the flag pill in MetacuraWeb LabResultsTable.tsx.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

export type FlagStatus = 'high' | 'low' | 'normal';

export function StatusPill({ status }: { status: FlagStatus }) {
  const t = useTheme();
  const map = {
    high: { fg: t.colors.high, bg: t.colors.highBg, label: 'High' },
    low: { fg: t.colors.low, bg: t.colors.lowBg, label: 'Low' },
    normal: { fg: t.colors.normal, bg: t.colors.normalBg, label: 'Normal' },
  }[status];

  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: map.bg, borderRadius: t.radius.pill },
      ]}
    >
      <Text
        style={[
          t.text.eyebrow,
          { color: map.fg, textTransform: 'uppercase' },
        ]}
      >
        {map.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
