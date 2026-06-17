/**
 * Divider — a thin rule, optionally with centered "or" text.
 */
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../theme';

export function Divider({ label }: { label?: string }) {
  const t = useTheme();
  if (!label) {
    return <View style={{ height: 1, backgroundColor: t.colors.border }} />;
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: t.colors.border }} />
      <Text style={{ color: t.colors.textMuted, fontSize: 13, fontFamily: t.fonts.body }}>{label}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: t.colors.border }} />
    </View>
  );
}
