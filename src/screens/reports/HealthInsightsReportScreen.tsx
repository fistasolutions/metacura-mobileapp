// Screen 25 · Health Insights report ($2) — see specs/reports.md
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { TrendingUp, Link2, Send } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Button,
  Badge,
  Input,
  StatusPill,
  SectionEyebrow,
} from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS } from '../../data';

const TREND = [42, 55, 48, 60, 70, 66, 88]; // last bar tallest

export default function HealthInsightsReportScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [question, setQuestion] = useState('');

  const name = 'Sarah Jenkins';
  const flags = (MOCK_RECORDS[0].values ?? []).filter(v => v.flag !== 'normal');

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Insights · $2"
        title="Insights and trends"
        subtitle={`For ${name} · ${MOCK_RECORDS.length} records analysed`}
      />

      <View style={{ gap: t.spacing[5] }}>
        {/* Overview */}
        <LinearGradient
          colors={[t.colors.primary, t.colors.accentSoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: t.radius.xl + 1, padding: 1.5 }}
        >
          <View
            style={{
              backgroundColor: t.colors.surface,
              borderRadius: t.radius.xl,
              padding: t.spacing[6],
              gap: t.spacing[3],
            }}
          >
            <AppText variant="cardTitle">Overview</AppText>
            <AppText variant="body" color={t.colors.textMuted}>
              Across your recent records, your LDL cholesterol is trending high and vitamin D is
              low. Most other markers are stable.
            </AppText>
          </View>
        </LinearGradient>

        {/* Source-linked answers */}
        <Card style={{ gap: t.spacing[3] }}>
          <AppText variant="cardTitle">Source-linked answers</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <Input
              placeholder="Ask a question about these records…"
              value={question}
              onChangeText={setQuestion}
              containerStyle={{ flex: 1 }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Send"
              style={{
                width: 48,
                height: 48,
                borderRadius: t.radius.lg,
                backgroundColor: t.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={18} color={t.colors.textInverse} strokeWidth={2.4} />
            </Pressable>
          </View>
          <Badge label="10 queries left" variant="outline" />
        </Card>

        {/* Key flags */}
        <View style={{ gap: t.spacing[3] }}>
          <SectionEyebrow label="Key flags · tap to see source" />
          <Card style={{ gap: 0 }} padded={false}>
            {flags.map((v, i) => (
              <Pressable
                key={v.label}
                accessibilityRole="button"
                onPress={() => nav.navigate('SourceSheet', { recordId: 'cmp', line: v.sourceLine })}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: t.spacing[3],
                  paddingHorizontal: t.spacing[6],
                  paddingVertical: t.spacing[4],
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: t.colors.border,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <StatusPill status={v.flag} />
                <AppText variant="body" style={{ flex: 1, fontFamily: t.fonts.bodySemibold }}>
                  {v.label}
                </AppText>
                <AppText variant="body" style={{ fontFamily: t.fonts.mono }}>
                  {v.value}
                  {v.unit ? ` ${v.unit}` : ''}
                </AppText>
                <Link2 size={15} color={t.colors.primary} strokeWidth={2.4} />
              </Pressable>
            ))}
          </Card>
        </View>

        {/* Trends */}
        <Card style={{ gap: t.spacing[4] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <TrendingUp size={20} color={t.colors.primary} strokeWidth={2.4} />
            <AppText variant="cardTitle">LDL Cholesterol</AppText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: 120,
              gap: t.spacing[2],
            }}
          >
            {TREND.map((h, i) => {
              const last = i === TREND.length - 1;
              return (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: t.radius.sm,
                    backgroundColor: last ? t.colors.primary : t.colors.surfaceMuted,
                    borderWidth: last ? 0 : 1,
                    borderColor: t.colors.borderStrong,
                  }}
                />
              );
            })}
          </View>
        </Card>

        {/* Export */}
        <Card style={{ gap: t.spacing[3] }}>
          <AppText variant="cardTitle">Export</AppText>
          <Button label="Export PDF" variant="outline" onPress={() => {}} />
          <Button label="Export FHIR R4" variant="outline" onPress={() => {}} />
        </Card>
      </View>
    </Screen>
  );
}
