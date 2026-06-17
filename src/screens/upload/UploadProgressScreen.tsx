// Screen 14 · Upload progress — see specs/upload.md
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FileText, Lock } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Button,
  IconCircle,
} from '../../components';
import { useTheme } from '../../theme';

export default function UploadProgressScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        const next = p + 4; // ~2.4s over 60 ticks at 40ms
        return next >= 100 ? 100 : next;
      });
    }, 40);
    return () => clearInterval(id);
  }, []);

  const done = progress >= 100;

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => nav.navigate('ClassifyConfirm'), 500);
    return () => clearTimeout(id);
  }, [done, nav]);

  return (
    <Screen scroll>
      <ScreenHeader eyebrow="Reading" title="Reading your record" />

      <View style={{ gap: t.spacing[5] }}>
        <Card>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing[4],
            }}
          >
            <IconCircle icon={FileText} tone="teal" size={48} />
            <View style={{ flex: 1 }}>
              <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                CMP_Apr18.pdf
              </AppText>
              <AppText
                variant="secondary"
                color={t.colors.textMuted}
                style={{ marginTop: 2 }}
              >
                3 pages
              </AppText>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing[2],
              marginTop: t.spacing[4],
            }}
          >
            <Lock size={14} color={t.colors.primary} strokeWidth={2.4} />
            <AppText variant="secondary" color={t.colors.textMuted}>
              Encrypted on arrival
            </AppText>
          </View>

          {/* Progress bar */}
          <View
            style={{
              height: 8,
              borderRadius: t.radius.pill,
              backgroundColor: t.colors.surfaceMuted,
              overflow: 'hidden',
              marginTop: t.spacing[5],
            }}
          >
            <View
              style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: t.radius.pill,
                backgroundColor: t.colors.primary,
              }}
            />
          </View>

          <AppText
            variant="secondary"
            color={t.colors.textMuted}
            style={{ marginTop: t.spacing[3] }}
          >
            {done ? 'Done' : 'Reading… (under 30 seconds)'}
          </AppText>
        </Card>

        {done ? (
          <Button
            label="Continue"
            onPress={() => nav.navigate('ClassifyConfirm')}
          />
        ) : null}
      </View>
    </Screen>
  );
}
