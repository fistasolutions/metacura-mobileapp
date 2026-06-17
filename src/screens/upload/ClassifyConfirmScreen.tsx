// Screen 15 · Auto-classified confirmation — see specs/upload.md
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Button,
} from '../../components';
import { useTheme } from '../../theme';
import { CLASSIFY_OPTIONS } from '../../data';

export default function ClassifyConfirmScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [selected, setSelected] = useState('Lab');

  return (
    <Screen scroll>
      <ScreenHeader
        eyebrow="Almost done"
        title="Read as: Lab Report"
        subtitle="CMP_Apr18.pdf"
      />

      <View style={{ gap: t.spacing[5] }}>
        <View style={{ gap: t.spacing[3] }}>
          <AppText
            variant="secondary"
            color={t.colors.textMuted}
            style={{ fontFamily: t.fonts.bodySemibold }}
          >
            Classification
          </AppText>

          <Card padded={false} style={{ overflow: 'hidden' }}>
            {CLASSIFY_OPTIONS.map((opt, i) => {
              const active = opt === selected;
              return (
                <Pressable
                  key={opt}
                  onPress={() => setSelected(opt)}
                  accessibilityRole="button"
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: t.spacing[5],
                    paddingVertical: t.spacing[4],
                    backgroundColor: active
                      ? t.colors.normalBg
                      : 'transparent',
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: t.colors.border,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <AppText
                    variant="body"
                    color={active ? t.colors.primary : t.colors.text}
                    style={{
                      fontFamily: active
                        ? t.fonts.bodySemibold
                        : t.fonts.body,
                    }}
                  >
                    {opt}
                  </AppText>
                  {active ? (
                    <Check
                      size={18}
                      color={t.colors.primary}
                      strokeWidth={2.6}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </Card>
        </View>

        <View style={{ gap: t.spacing[3] }}>
          <Button
            label="Confirm, add to timeline"
            onPress={() => nav.navigate('RecordsTimeline')}
          />
          <Button
            label="Re-upload"
            variant="outline"
            onPress={() => nav.goBack()}
          />
        </View>
      </View>
    </Screen>
  );
}
