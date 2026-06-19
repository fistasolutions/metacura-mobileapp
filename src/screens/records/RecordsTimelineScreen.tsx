// Screen 16 · Records timeline — see specs/records.md
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import {
  Screen,
  HeaderBand,
  AppText,
  Button,
  Input,
  Chips,
  RecordCard,
} from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS, RECORD_FILTERS } from '../../data';
import { RecordType } from '../../data/types';

// Maps a filter chip label to the record types it includes.
const FILTER_TYPES: Record<string, RecordType[]> = {
  Labs: ['Lab'],
  CT: ['CT'],
  MRI: ['MRI'],
  Ultrasound: ['Ultrasound'],
  Rx: ['Medication', 'Prescription'],
  Visits: ['Visit'],
  'Voice notes': ['Voice'],
};

export default function RecordsTimelineScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const records = useMemo(() => {
    const q = query.trim().toLowerCase();
    const types = FILTER_TYPES[activeFilter];
    return MOCK_RECORDS.filter(r => {
      const typeOk = activeFilter === 'All' || (types?.includes(r.type) ?? false);
      const queryOk =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q);
      return typeOk && queryOk;
    });
  }, [query, activeFilter]);

  return (
    <Screen scroll>
      <HeaderBand
        eyebrow="Records"
        title="Your"
        accent="timeline"
        subtitle="Every document you have added, read and linked to the original source."
        right={<Button label="Upload" size="sm" onPress={() => nav.navigate('UploadEntry')} />}
      />

      <View style={{ gap: t.spacing[4] }}>
        <View style={{ position: 'relative', justifyContent: 'center' }}>
          <Input
            placeholder="Search records"
            value={query}
            onChangeText={setQuery}
            style={{ paddingLeft: 44 }}
          />
          <View style={{ position: 'absolute', left: 16, top: 0, bottom: 0, justifyContent: 'center' }}>
            <Search size={18} color={t.colors.textMuted} strokeWidth={2.2} />
          </View>
        </View>

        <Chips
          options={RECORD_FILTERS}
          value={activeFilter}
          onChange={setActiveFilter}
        />

        <View style={{ gap: t.spacing[3] }}>
          {records.length > 0 ? (
            records.map(r => (
              <RecordCard
                key={r.id}
                record={r}
                onPress={() => nav.navigate('RecordDetail', { recordId: r.id })}
              />
            ))
          ) : (
            <View style={{ alignItems: 'center', paddingVertical: t.spacing[10], gap: t.spacing[2] }}>
              <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                No records found
              </AppText>
              <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
                Try a different filter or search term.
              </AppText>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}
