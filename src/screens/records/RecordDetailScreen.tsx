// Screen 17 · Record detail — see specs/records.md
import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Check } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Badge,
  Button,
  ValueRow,
  SectionEyebrow,
} from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS } from '../../data';

export default function RecordDetailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const recordId = route.params?.recordId;
  const record = MOCK_RECORDS.find(r => r.id === recordId) ?? MOCK_RECORDS[0];

  return (
    <Screen scroll>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow={record.type}
        title={record.title}
        subtitle={`${record.source} · ${record.date}`}
      />

      <View style={{ gap: t.spacing[5] }}>
        <Card>
          <AppText variant="eyebrow" color={t.colors.primary}>
            AI SUMMARY
          </AppText>
          <AppText variant="body" style={{ marginTop: t.spacing[3] }}>
            {record.summary}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: t.spacing[2],
              marginTop: t.spacing[4],
            }}
          >
            <Badge
              variant="source"
              label={`Linked · ${record.citedSources} sources`}
              onPress={() =>
                nav.navigate('SourceSheet', { recordId: record.id, line: 1 })
              }
            />
          </View>
        </Card>

        {record.values ? (
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Values" />
            <Card padded={false} style={{ paddingHorizontal: t.spacing[6] }}>
              {record.values.map((v, i) => (
                <ValueRow
                  key={`${v.label}-${i}`}
                  value={v}
                  onPress={() =>
                    nav.navigate('SourceSheet', {
                      recordId: record.id,
                      line: v.sourceLine,
                    })
                  }
                />
              ))}
            </Card>
          </View>
        ) : null}

        {record.findings ? (
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Findings" />
            <Card>
              <View style={{ gap: t.spacing[3] }}>
                {record.findings.map((f, i) => (
                  <View
                    key={`${f}-${i}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: t.spacing[3],
                    }}
                  >
                    <View style={{ marginTop: 2 }}>
                      <Check size={18} color={t.colors.primary} strokeWidth={2.6} />
                    </View>
                    <AppText variant="body" style={{ flex: 1 }}>
                      {f}
                    </AppText>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        ) : null}

        <Button
          label="Ask about this"
          onPress={() =>
            nav.navigate('App', {
              screen: 'AskTab',
              params: { screen: 'AskLanding', params: { recordId: record.id } },
            })
          }
        />
      </View>
    </Screen>
  );
}
