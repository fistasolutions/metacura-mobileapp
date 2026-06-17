// Screen 26 · Quiet Second Opinion report ($4) — see specs/reports.md
import React from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Activity,
  AlertTriangle,
  Clock,
  Brain,
  ShieldCheck,
  Link2,
} from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Button,
  Badge,
  StatusPill,
  IconCircle,
} from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS } from '../../data';

const SYMPTOMS = [
  {
    date: 'Jan 21, 2025',
    symptom: 'Lower-back stiffness',
    finding: 'Matches mild degenerative change at L4-L5 and L5-S1 on your MRI.',
  },
  {
    date: 'Jan 14, 2025',
    symptom: 'Fatigue, low energy',
    finding: 'Consistent with low vitamin D at 22 ng/mL on your metabolic panel.',
  },
];

const REASONING = [
  {
    name: 'GATHER',
    detail: 'We read every record on your timeline, labs, imaging, and visit notes, end to end.',
  },
  {
    name: 'COMPARE',
    detail: 'Each value is measured against your own history, not a generic population range.',
  },
  {
    name: 'CONNECT',
    detail: 'We map your reported symptoms to the exact findings that explain them.',
  },
  {
    name: 'EXPLAIN',
    detail: 'Every observation is written in plain English and linked to the line it came from.',
  },
];

const PRIVACY = [
  'Not visible to your doctor or insurer',
  'Not stored in any medical record',
  'Not linked to your insurance policy',
  'Deleted from our servers after 30 days',
];

export default function SecondOpinionReportScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  const flags = (MOCK_RECORDS[0].values ?? []).filter(v => v.flag !== 'normal');

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader onBack={() => nav.goBack()} title="Quiet Second Opinion" />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2], marginBottom: t.spacing[5] }}>
        <Badge label="Private · Nobody knows you ran it" variant="success" />
        <Badge label="Analysis complete" variant="outline" />
      </View>

      <AppText variant="body" color={t.colors.textMuted} style={{ marginBottom: t.spacing[6] }}>
        A clinical-grade reading of your complete health record, written for you, not your doctor.
        Every observation is linked to the exact line in your records.
      </AppText>

      <View style={{ gap: t.spacing[6] }}>
        {/* What your records say */}
        <View style={{ gap: t.spacing[3] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
            <IconCircle icon={Activity} size={36} tone="teal" />
            <AppText variant="cardTitle">What your records say</AppText>
          </View>
          <Card>
            <AppText variant="body" color={t.colors.textMuted}>
              Your records describe a generally healthy picture with two clear themes. Your lipid
              profile is trending high, with LDL cholesterol at 142 mg/dL and total cholesterol at
              214 mg/dL, both above your healthy range. Your vitamin D is low at 22 ng/mL. Your
              kidney markers, glucose, and HDL are all within range for you. Imaging shows mild
              degenerative change in your lumbar spine without nerve compression, which is common and
              consistent with the lower-back stiffness noted at your follow-up. The plan on record
              already addresses each finding: dietary change for LDL, vitamin D supplementation, and
              physical therapy for your back.
            </AppText>
          </Card>
        </View>

        {/* Clinical flags */}
        <View style={{ gap: t.spacing[3] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
            <IconCircle icon={AlertTriangle} size={36} tone="high" />
            <AppText variant="cardTitle" style={{ flex: 1 }}>
              Clinical flags · tap to see source
            </AppText>
          </View>
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
                <View style={{ flex: 1 }}>
                  <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                    {v.label}
                  </AppText>
                  {v.range ? (
                    <AppText variant="secondary" color={t.colors.textMuted} style={{ marginTop: 2 }}>
                      {v.range}
                    </AppText>
                  ) : null}
                </View>
                <AppText variant="body" style={{ fontFamily: t.fonts.mono }}>
                  {v.value}
                  {v.unit ? ` ${v.unit}` : ''}
                </AppText>
                <Link2 size={15} color={t.colors.primary} strokeWidth={2.4} />
              </Pressable>
            ))}
          </Card>
        </View>

        {/* Symptom history */}
        <View style={{ gap: t.spacing[3] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
            <IconCircle icon={Clock} size={36} tone="teal" />
            <AppText variant="cardTitle" style={{ flex: 1 }}>
              Symptom history · mapped to your records
            </AppText>
          </View>
          {SYMPTOMS.map(s => (
            <Card key={s.symptom} style={{ gap: t.spacing[3] }}>
              <Badge label={s.date} variant="source" />
              <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                {s.symptom}
              </AppText>
              <AppText variant="secondary" color={t.colors.textMuted}>
                {s.finding}
              </AppText>
              <Badge label="See source" variant="outline" />
            </Card>
          ))}
        </View>

        {/* Clinical reasoning */}
        <View style={{ gap: t.spacing[3] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
            <IconCircle icon={Brain} size={36} tone="teal" />
            <AppText variant="cardTitle" style={{ flex: 1 }}>
              Clinical reasoning · how we read your records
            </AppText>
          </View>
          <Card style={{ gap: t.spacing[5] }}>
            {REASONING.map((step, i) => (
              <View key={step.name} style={{ flexDirection: 'row', gap: t.spacing[3] }}>
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
                  <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodyBold }}>
                    {i + 1}
                  </AppText>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <AppText variant="eyebrow" color={t.colors.primary} style={{ textTransform: 'uppercase' }}>
                    {step.name}
                  </AppText>
                  <AppText variant="secondary" color={t.colors.textMuted}>
                    {step.detail}
                  </AppText>
                </View>
              </View>
            ))}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: t.spacing[2],
                paddingTop: t.spacing[3],
                borderTopWidth: 1,
                borderTopColor: t.colors.border,
              }}
            >
              <ShieldCheck size={18} color={t.colors.success} strokeWidth={2.4} />
              <AppText variant="secondary" style={{ fontFamily: t.fonts.bodySemibold }}>
                Your data, never trained on
              </AppText>
            </View>
          </Card>
        </View>

        {/* Privacy card (dark) */}
        <View
          style={{
            backgroundColor: t.colors.text,
            borderRadius: t.radius.xl,
            padding: t.spacing[6],
            gap: t.spacing[4],
          }}
        >
          <AppText variant="cardTitle" color={t.colors.textInverse}>
            Private by design
          </AppText>
          {PRIVACY.map(line => (
            <View key={line} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
              <ShieldCheck size={18} color={t.colors.accentSoft} strokeWidth={2.4} />
              <AppText variant="secondary" color={t.colors.textInverse} style={{ flex: 1 }}>
                {line}
              </AppText>
            </View>
          ))}
        </View>

        {/* Export */}
        <Card style={{ gap: t.spacing[3] }}>
          <AppText variant="cardTitle">Export</AppText>
          <Button label="Export PDF" variant="outline" onPress={() => {}} />
          <Button label="Export FHIR R4" variant="outline" onPress={() => {}} />
        </Card>

        <AppText variant="secondary" color={t.colors.textMuted}>
          MetaCura reads and explains your records. It does not diagnose or replace your doctor.
        </AppText>
      </View>
    </Screen>
  );
}
