// Screen 33 · Profile switcher — see specs/profile.md
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Check, Plus } from 'lucide-react-native';
import { Sheet, Avatar, AppText } from '../../components';
import { useTheme } from '../../theme';
import { DEPENDENTS } from '../../data';

function initialsOf(name: string) {
  return name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('');
}

export default function ProfileSwitcherScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [activeId, setActiveId] = useState(DEPENDENTS[0].id);

  return (
    <Sheet eyebrow="Switch Account" onClose={() => nav.goBack()}>
      <View style={{ gap: t.spacing[3] }}>
        {DEPENDENTS.map(d => {
          const active = d.id === activeId;
          return (
            <Pressable
              key={d.id}
              onPress={() => setActiveId(d.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: t.spacing[4],
                paddingHorizontal: t.spacing[4],
                paddingVertical: t.spacing[4],
                borderRadius: t.radius.xl,
                borderWidth: 1,
                borderColor: active ? t.colors.borderStrong : t.colors.border,
                backgroundColor: active ? t.colors.surfaceMuted : t.colors.surface,
              }}
            >
              <Avatar initials={initialsOf(d.name)} size={48} />
              <View style={{ flex: 1, gap: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
                  <AppText variant="cardTitle">{d.name}</AppText>
                  {d.isPrimary ? (
                    <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
                      (You)
                    </AppText>
                  ) : null}
                </View>
                <AppText variant="mono" color={t.colors.textMuted}>
                  {d.mycareId}
                </AppText>
              </View>
              {active ? (
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: t.colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={15} color={t.colors.textInverse} strokeWidth={3} />
                </View>
              ) : null}
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => nav.navigate('FamilyDependents')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: t.spacing[2],
            paddingVertical: t.spacing[4],
            borderRadius: t.radius.xl,
            borderWidth: 1.5,
            borderStyle: 'dashed',
            borderColor: t.colors.borderStrong,
          }}
        >
          <Plus size={18} color={t.colors.primary} strokeWidth={2.4} />
          <AppText variant="cardTitle" color={t.colors.primary}>
            Create a separate MyCare ID
          </AppText>
        </Pressable>
      </View>
    </Sheet>
  );
}
