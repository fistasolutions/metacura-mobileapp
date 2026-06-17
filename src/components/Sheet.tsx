/**
 * Sheet — a modal sheet container (header with title + close, scrollable body).
 * Used for the Source sheet, Payment, Share, and Voice query modal screens.
 */
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';
import { SectionEyebrow } from './SectionEyebrow';

type Props = {
  eyebrow?: string;
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
  scroll?: boolean;
};

export function Sheet({ eyebrow, title, onClose, children, scroll = true }: Props) {
  const t = useTheme();
  const Body = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }} edges={['top', 'bottom']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingHorizontal: t.spacing[5],
          paddingTop: t.spacing[4],
          gap: t.spacing[3],
        }}
      >
        <View style={{ flex: 1, gap: 8 }}>
          {eyebrow ? <SectionEyebrow label={eyebrow} /> : null}
          {title ? <AppText variant="h2">{title}</AppText> : null}
        </View>
        {onClose ? (
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: t.colors.surfaceMuted,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} color={t.colors.textMuted} strokeWidth={2.4} />
          </Pressable>
        ) : null}
      </View>
      <Body
        style={{ flex: 1 }}
        contentContainerStyle={scroll ? { padding: t.spacing[5], paddingBottom: t.spacing[12], gap: t.spacing[4] } : undefined}
      >
        {scroll ? children : <View style={{ flex: 1, padding: t.spacing[5] }}>{children}</View>}
      </Body>
    </SafeAreaView>
  );
}
