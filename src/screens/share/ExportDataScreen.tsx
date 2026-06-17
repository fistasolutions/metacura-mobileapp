// Screen 29 · Export — see specs/share.md
import React, { useState } from 'react';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FileDown, Database, Check, CheckCircle2 } from 'lucide-react-native';
import { Screen, ScreenHeader, AppText, Card, Button, Chips, SectionEyebrow } from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS } from '../../data';

const RANGES = ['Last 30 days', 'Last year', 'All history'];

export default function ExportDataScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>(MOCK_RECORDS.map(r => r.id));
  const [range, setRange] = useState(RANGES[2]);
  const [format, setFormat] = useState<'pdf' | 'fhir'>('pdf');
  const [phase, setPhase] = useState<'idle' | 'preparing' | 'ready'>('idle');

  const toggle = (id: string) =>
    setSelected(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));

  const prepare = () => {
    setPhase('preparing');
    setTimeout(() => setPhase('ready'), 1600);
  };

  return (
    <Screen>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Export"
        title="Export your records"
        subtitle="PDF for all tiers, FHIR R4 for paid tiers."
      />

      <View style={{ gap: t.spacing[5] }}>
        <View style={{ gap: t.spacing[3] }}>
          <SectionEyebrow label="1 · Records" />
          <Card padded={false}>
            {MOCK_RECORDS.map((r, i) => {
              const on = selected.includes(r.id);
              return (
                <Pressable
                  key={r.id}
                  onPress={() => toggle(r.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: t.spacing[3],
                    padding: t.spacing[4],
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: t.colors.border,
                  }}
                >
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      borderWidth: 1.5,
                      borderColor: on ? t.colors.primary : t.colors.border,
                      backgroundColor: on ? t.colors.primary : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {on ? <Check size={14} color={t.colors.textInverse} strokeWidth={3} /> : null}
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                      {r.title}
                    </AppText>
                    <AppText variant="secondary" color={t.colors.textMuted}>
                      {r.type} · {r.date}
                    </AppText>
                  </View>
                </Pressable>
              );
            })}
          </Card>
        </View>

        <View style={{ gap: t.spacing[3] }}>
          <SectionEyebrow label="2 · Date range" />
          <Chips options={RANGES} value={range} onChange={setRange} scroll={false} />
        </View>

        <View style={{ gap: t.spacing[3] }}>
          <SectionEyebrow label="3 · Format" />
          <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
            {([['pdf', 'PDF', FileDown], ['fhir', 'FHIR R4', Database]] as const).map(([key, label, Icon]) => {
              const on = format === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setFormat(key)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    gap: 8,
                    paddingVertical: t.spacing[5],
                    borderRadius: t.radius.xl,
                    borderWidth: 1.5,
                    borderColor: on ? t.colors.primary : t.colors.border,
                    backgroundColor: on ? t.colors.surfaceMuted : t.colors.surface,
                  }}
                >
                  <Icon size={22} color={on ? t.colors.primary : t.colors.textMuted} strokeWidth={2.2} />
                  <AppText variant="secondary" style={{ fontFamily: t.fonts.bodySemibold }}>
                    {label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {phase === 'idle' ? (
          <Button
            label="Prepare export bundle"
            disabled={selected.length === 0}
            onPress={prepare}
          />
        ) : phase === 'preparing' ? (
          <Card style={{ alignItems: 'center', gap: t.spacing[3] }}>
            <ActivityIndicator color={t.colors.primary} />
            <AppText variant="body" color={t.colors.textMuted}>
              Bundling {format === 'pdf' ? 'PDF' : 'FHIR R4'}…
            </AppText>
          </Card>
        ) : (
          <Card style={{ alignItems: 'center', gap: t.spacing[3] }}>
            <CheckCircle2 size={40} color={t.colors.success} strokeWidth={2} />
            <AppText variant="cardTitle">Bundle ready</AppText>
            <AppText variant="secondary" color={t.colors.textMuted} style={{ fontFamily: t.fonts.mono }}>
              metacura_export_{format}.zip
            </AppText>
            <Button label="Open share sheet" variant="outline" onPress={() => {}} />
          </Card>
        )}
      </View>
    </Screen>
  );
}
