/**
 * Screen 10 · Demo playback — simulated upload → reading → ready sequence that
 * lands on a real record panel. See specs/demo.md.
 */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Check, FileText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import {
  Screen,
  AppText,
  BackLink,
  Button,
  Card,
  SectionEyebrow,
  ValueRow,
} from '../../components';
import { MOCK_RECORDS } from '../../data';

type Phase = 'uploading' | 'reading' | 'ready';

const READING_STEPS = [
  'Reading the document',
  'Pulling out every value',
  'Flagging High, Low, Normal',
  'Linking each value to its source line',
];

export default function DemoPlaybackScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [phase, setPhase] = useState<Phase>('uploading');

  useEffect(() => {
    if (phase === 'uploading') {
      const id = setTimeout(() => setPhase('reading'), 1500);
      return () => clearTimeout(id);
    }
    if (phase === 'reading') {
      const id = setTimeout(() => setPhase('ready'), 1500);
      return () => clearTimeout(id);
    }
  }, [phase]);

  const record = MOCK_RECORDS[0];

  return (
    <Screen>
      <BackLink />
      {phase === 'uploading' ? (
        <View style={{ gap: t.spacing[5] }}>
          <SectionEyebrow label="Step 1 of 3 · Uploading" />

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: t.radius.lg,
                  backgroundColor: t.colors.surfaceMuted,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={22} color={t.colors.primary} strokeWidth={2.2} />
              </View>
              <View style={{ flex: 1 }}>
                <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                  CMP_Bloodwork.pdf
                </AppText>
                <AppText variant="secondary" color={t.colors.textMuted} style={{ marginTop: 2 }}>
                  142 KB
                </AppText>
              </View>
            </View>

            <View
              style={{
                height: 6,
                borderRadius: t.radius.pill,
                backgroundColor: t.colors.border,
                marginTop: t.spacing[4],
                overflow: 'hidden',
              }}
            >
              <View style={{ height: 6, width: '70%', borderRadius: t.radius.pill, backgroundColor: t.colors.primary }} />
            </View>
          </Card>

          <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
            Encrypted in transit · stays inside your record · never used to train any model
          </AppText>
        </View>
      ) : null}

      {phase === 'reading' ? (
        <View style={{ gap: t.spacing[5] }}>
          <SectionEyebrow label="Step 2 of 3 · Reading" />
          <AppText variant="h2">MetaCura is reading CMP_Bloodwork.pdf</AppText>

          <Card style={{ gap: t.spacing[3] }}>
            {READING_STEPS.map((step, i) => (
              <View key={step} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: i < 2 ? t.colors.primary : t.colors.surfaceMuted,
                    borderWidth: i < 2 ? 0 : 1,
                    borderColor: t.colors.borderStrong,
                  }}
                >
                  {i < 2 ? (
                    <Check size={13} color={t.colors.textInverse} strokeWidth={3} />
                  ) : (
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: t.colors.primary }} />
                  )}
                </View>
                <AppText variant="body" color={i < 2 ? t.colors.text : t.colors.textMuted}>
                  {step}
                </AppText>
              </View>
            ))}
          </Card>
        </View>
      ) : null}

      {phase === 'ready' ? (
        <View style={{ gap: t.spacing[4] }}>
          <SectionEyebrow label="Step 3 of 3 · Ready" />
          <AppText variant="h2">{record.title}</AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            {record.source} · {record.date}
          </AppText>

          <AppText variant="body" color={t.colors.textMuted}>
            {record.summary}
          </AppText>

          <Card padded={false} style={{ paddingHorizontal: t.spacing[5], paddingTop: t.spacing[2] }}>
            {record.values?.map(v => (
              <ValueRow key={v.label} value={v} onPress={() => {}} />
            ))}
          </Card>

          <Pressable onPress={() => setPhase('uploading')} accessibilityRole="button" style={{ alignSelf: 'center' }}>
            <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
              Replay
            </AppText>
          </Pressable>

          <Button label="Get your MyCare ID · Free" onPress={() => nav.navigate('SignUp')} />
        </View>
      ) : null}
    </Screen>
  );
}
