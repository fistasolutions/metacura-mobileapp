/**
 * SettingRow — an icon + title + subtitle + chevron list row. Stack several
 * inside one Card (padded={false}) for a clean settings list.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';
import { IconCircle } from './IconCircle';

export function SettingRow({
  icon,
  title,
  subtitle,
  onPress,
  first,
  danger,
  trailing,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  first?: boolean;
  danger?: boolean;
  trailing?: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing[3] + 2,
        paddingHorizontal: t.spacing[4],
        paddingVertical: t.spacing[3] + 4,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: t.colors.border,
        backgroundColor: pressed ? t.colors.surfaceMuted : 'transparent',
      })}
    >
      <IconCircle icon={icon} size={42} tone={danger ? 'high' : 'teal'} radius={13} />
      <View style={{ flex: 1, gap: 1 }}>
        <AppText
          variant="body"
          color={danger ? t.colors.high : t.colors.text}
          style={{ fontFamily: t.fonts.bodySemibold }}
        >
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="secondary" color={t.colors.textMuted}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing ?? (
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: t.colors.surfaceMuted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronRight size={16} color={t.colors.textMuted} strokeWidth={2.4} />
        </View>
      )}
    </Pressable>
  );
}
