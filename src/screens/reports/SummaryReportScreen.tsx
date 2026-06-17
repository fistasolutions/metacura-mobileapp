// Screen 24 · Summary report (Free) — see specs/reports.md
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, ScreenHeader, AppText, Card, Button, SectionEyebrow } from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS } from '../../data';

export default function SummaryReportScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Summary · Free"
        title="Health Summary"
      />

      <View style={{ gap: t.spacing[5] }}>
        <Card style={{ gap: t.spacing[3] }}>
          <AppText variant="cardTitle">Across your records</AppText>
          <AppText variant="body" color={t.colors.textMuted}>
            {MOCK_RECORDS[0].summary}
          </AppText>
        </Card>

        <View style={{ gap: t.spacing[3] }}>
          <SectionEyebrow label="30-day timeline" />
          <Card style={{ gap: 0 }} padded={false}>
            {MOCK_RECORDS.map((r, i) => (
              <View
                key={r.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: t.spacing[3],
                  paddingHorizontal: t.spacing[6],
                  paddingVertical: t.spacing[4],
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: t.colors.border,
                }}
              >
                <AppText variant="body" style={{ flex: 1, fontFamily: t.fonts.bodySemibold }}>
                  {r.title}
                </AppText>
                <AppText variant="secondary" color={t.colors.textMuted}>
                  {r.date}
                </AppText>
              </View>
            ))}
          </Card>
        </View>

        <Card style={{ gap: t.spacing[3] }}>
          <AppText variant="cardTitle">Export</AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            Download your full summary as a PDF.
          </AppText>
          <Button label="Export PDF" variant="outline" onPress={() => {}} />
        </Card>

        <AppText variant="secondary" color={t.colors.textMuted}>
          MetaCura reads and explains your records. It does not diagnose or replace your doctor.
        </AppText>
      </View>
    </Screen>
  );
}
