// Screen 16 · Records timeline — see specs/records.md
import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import {
  Screen,
  HeaderBand,
  Button,
  Input,
  Chips,
  RecordCard,
} from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS, RECORD_FILTERS } from '../../data';

export default function RecordsTimelineScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

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
          {MOCK_RECORDS.map(r => (
            <RecordCard
              key={r.id}
              record={r}
              onPress={() => nav.navigate('RecordDetail', { recordId: r.id })}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}
