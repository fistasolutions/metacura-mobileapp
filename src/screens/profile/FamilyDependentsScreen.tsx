// Screen 32 · Family & dependents — see specs/profile.md
import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  Card,
  Avatar,
  Badge,
  Button,
  Input,
  Chips,
  AppText,
  Sheet,
} from '../../components';
import { useTheme } from '../../theme';
import { DEPENDENTS, PROFILE_TYPES } from '../../data';

const TABS = ['All', 'Primary', 'Active', 'Pending'];

function initialsOf(name: string) {
  return name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('');
}

export default function FamilyDependentsScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [tab, setTab] = useState('All');
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<string>(PROFILE_TYPES[0].label);

  const closeAdd = () => {
    setAdding(false);
    setName('');
    setRelationship(PROFILE_TYPES[0].label);
  };

  return (
    <>
      <Screen>
        <ScreenHeader
          onBack={() => nav.goBack()}
          eyebrow="Family"
          title="Family & dependents"
          subtitle="Separate MyCare IDs, each with its own records, history, and login."
          right={<Button label="Add" size="sm" onPress={() => setAdding(true)} />}
        />

        <View style={{ marginBottom: t.spacing[4] }}>
          <Chips options={TABS} value={tab} onChange={setTab} />
        </View>

        <View style={{ gap: t.spacing[3] }}>
          {DEPENDENTS.map(d => (
            <Pressable
              key={d.id}
              accessibilityRole="button"
              accessibilityLabel={`Open ${d.name}`}
              onPress={() => nav.navigate('FamilyMemberDetail', { dependentId: d.id })}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[4] }}>
                  <Avatar initials={initialsOf(d.name)} size={48} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2], flexWrap: 'wrap' }}>
                      <AppText variant="cardTitle">{d.name}</AppText>
                      <Badge label={d.relationship} variant="success" />
                    </View>
                    <AppText variant="mono" color={t.colors.textMuted}>
                      {d.mycareId}
                    </AppText>
                    <AppText variant="secondary" color={t.colors.textMuted}>
                      {d.records} records · {d.focus}
                    </AppText>
                  </View>
                  <ChevronRight size={20} color={t.colors.textMuted} strokeWidth={2.2} />
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      </Screen>

      <Modal visible={adding} animationType="slide" onRequestClose={closeAdd}>
        <Sheet eyebrow="New Account" title="Add Dependent" onClose={closeAdd}>
          <Input
            label="Full Legal Name"
            placeholder="e.g. John Doe"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <View style={{ gap: t.spacing[3] }}>
            <AppText variant="secondary" color={t.colors.textMuted} style={{ fontFamily: t.fonts.bodySemibold }}>
              Relationship
            </AppText>
            <Chips
              options={PROFILE_TYPES.map(p => p.label)}
              value={relationship}
              onChange={setRelationship}
              scroll={false}
            />
          </View>
          <Button label="Generate MyCare ID" disabled={name.trim().length === 0} onPress={closeAdd} />
        </Sheet>
      </Modal>
    </>
  );
}
