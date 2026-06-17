/**
 * Chips — a horizontally scrollable row of selectable pills (filters / tabs).
 */
import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { useTheme } from '../theme';

type Props = {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  scroll?: boolean;
};

export function Chips({ options, value, onChange, scroll = true }: Props) {
  const t = useTheme();
  const items = options.map(opt => {
    const active = opt === value;
    return (
      <Pressable
        key={opt}
        onPress={() => onChange(opt)}
        accessibilityRole="button"
        style={{
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: t.radius.pill,
          backgroundColor: active ? t.colors.primary : t.colors.surfaceMuted,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            fontFamily: t.fonts.bodySemibold,
            fontSize: 13,
            color: active ? t.colors.textInverse : t.colors.textMuted,
          }}
        >
          {opt}
        </Text>
      </Pressable>
    );
  });

  if (!scroll) {
    return (
      <ScrollView horizontal={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 }}>
        {items}
      </ScrollView>
    );
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 8 }}>
      {items}
    </ScrollView>
  );
}
