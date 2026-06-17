/**
 * SocialButtons — Apple + Google sign-in row (presentational).
 */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Apple } from 'lucide-react-native';
import { useTheme } from '../theme';

function SocialButton({ label, glyph, icon, onPress }: { label: string; glyph?: string; icon?: React.ReactNode; onPress?: () => void }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: t.colors.border,
        backgroundColor: t.colors.surface,
        borderRadius: t.radius.xl,
        paddingVertical: 12,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {icon}
      {glyph ? (
        <Text style={{ fontFamily: t.fonts.bodyBold, fontSize: 15, color: t.colors.text }}>{glyph}</Text>
      ) : null}
      <Text style={{ fontFamily: t.fonts.bodySemibold, fontSize: 14, color: t.colors.text }}>{label}</Text>
    </Pressable>
  );
}

export function SocialButtons() {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <SocialButton label="Apple" icon={<Apple size={16} color={t.colors.text} fill={t.colors.text} />} />
      <SocialButton label="Google" glyph="G" />
    </View>
  );
}
