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
        gap: t.spacing[4],
        paddingHorizontal: t.spacing[5],
        paddingVertical: t.spacing[4],
        borderTopWidth: first ? 0 : 1,
        borderTopColor: t.colors.border,
        backgroundColor: pressed ? t.colors.surfaceMuted : 'transparent',
      })}
    >
      <IconCircle icon={icon} size={40} tone={danger ? 'high' : 'teal'} />
      <View style={{ flex: 1, gap: 2 }}>
        <AppText variant="cardTitle" color={danger ? t.colors.high : t.colors.text}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="secondary" color={t.colors.textMuted}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing ?? <ChevronRight size={20} color={t.colors.textMuted} strokeWidth={2.2} />}
    </Pressable>
  );
}
