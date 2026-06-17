/**
 * ValueRow — a flagged lab value: label, value+unit, StatusPill, and a tap
 * target that opens the Source sheet to the exact line. The signature pattern.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { Link2 } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';
import { StatusPill } from './StatusPill';
import { FlaggedValue } from '../data/types';

export function ValueRow({ value, onPress }: { value: FlaggedValue; onPress?: () => void }) {
  const t = useTheme();
  const dot = value.flag === 'high' ? t.colors.high : value.flag === 'low' ? t.colors.low : t.colors.normal;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: t.colors.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dot }} />
      <View style={{ flex: 1 }}>
        <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
          {value.label}
        </AppText>
        {value.range ? (
          <AppText variant="secondary" color={t.colors.textMuted} style={{ marginTop: 2 }}>
            {value.range}
          </AppText>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 6 }}>
        <AppText variant="body" style={{ fontFamily: t.fonts.mono }}>
          {value.value}
          {value.unit ? ` ${value.unit}` : ''}
        </AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <StatusPill status={value.flag} />
          <Link2 size={13} color={t.colors.primary} strokeWidth={2.4} />
        </View>
      </View>
    </Pressable>
  );
}
