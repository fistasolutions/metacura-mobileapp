// Screen 32a · Family member detail (managed-member overview) — see specs/profile.md
// Opened by tapping a dependent on Family & dependents (32). Mirrors the web
// DependentDashboard: identity, privacy controls, emergency snapshot, latest
// insight, data composition, and delegated access for the selected MyCare ID.
import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Activity,
  AlertCircle,
  Calendar,
  Droplets,
  FileText,
  FlaskConical,
  Lock,
  Phone,
  Pill,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  Card,
  Avatar,
  Badge,
  Button,
  Section,
  IconCircle,
  AppText,
  Sheet,
} from '../../components';
import { useTheme } from '../../theme';
import { DEPENDENTS, DEPENDENT_DETAIL } from '../../data';

function initialsOf(name: string) {
  return name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('');
}

const PRIVACY = [
  { id: 'records', label: 'Records', icon: FileText, tone: 'high' as const },
  { id: 'visits', label: 'Visits', icon: Calendar, tone: 'teal' as const },
  { id: 'meds', label: 'Meds', icon: Pill, tone: 'low' as const },
  { id: 'labs', label: 'Labs', icon: FlaskConical, tone: 'teal' as const },
  { id: 'login', label: 'Login', icon: Lock, tone: 'normal' as const },
];

const COMPOSITION_ICON = {
  'Clinical Notes': FileText,
  'Lab Results': FlaskConical,
  Imaging: Activity,
  Prescriptions: Pill,
} as const;

export default function FamilyMemberDetailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const dependentId = route.params?.dependentId;
  const member =
    DEPENDENTS.find(d => d.id === dependentId) ?? DEPENDENTS[0];

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    records: true,
    visits: true,
    meds: false,
    labs: true,
    login: false,
  });
  const [confirmRemove, setConfirmRemove] = useState(false);

  const toggle = (id: string) =>
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));

  const statColor = (tone: 'normal' | 'low' | 'high') =>
    tone === 'high' ? t.colors.high : tone === 'low' ? t.colors.low : t.colors.success;

  return (
    <>
      <Screen scroll>
        <ScreenHeader
          onBack={() => nav.goBack()}
          backLabel="Family"
          eyebrow="Managing"
          title={member.name}
          subtitle="An overview of their health data and access settings."
        />

        <View style={{ gap: t.spacing[5] }}>
          {/* Identity */}
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[4] }}>
              <Avatar initials={initialsOf(member.name)} size={64} />
              <View style={{ flex: 1, gap: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2], flexWrap: 'wrap' }}>
                  <Badge label={member.relationship} variant="success" />
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={13} color={t.colors.textMuted} strokeWidth={2.4} />
                    <AppText variant="eyebrow" color={t.colors.textMuted}>
                      Proxy access
                    </AppText>
                  </View>
                </View>
                <AppText variant="cardTitle">{member.name}</AppText>
                <AppText variant="mono" color={t.colors.textMuted}>
                  {member.mycareId}
                </AppText>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[4], marginTop: 4, flexWrap: 'wrap' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Calendar size={13} color={t.colors.textMuted} strokeWidth={2.2} />
                    <AppText variant="secondary" color={t.colors.textMuted}>
                      Added {member.added}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Lock size={13} color={t.colors.textMuted} strokeWidth={2.2} />
                    <AppText variant="secondary" color={t.colors.textMuted}>
                      {toggles.login ? 'Independent login' : 'Managed login'}
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: t.spacing[3], marginTop: t.spacing[5] }}>
              <Button
                label="Switch profile"
                size="sm"
                style={{ flex: 1 }}
                onPress={() => nav.navigate('ProfileSwitcher')}
              />
              <Button
                label="Remove"
                variant="outline"
                size="sm"
                style={{ flex: 1 }}
                onPress={() => setConfirmRemove(true)}
              />
            </View>
          </Card>

          {/* Privacy controls */}
          <Section title="Privacy controls">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[3] }}>
              {PRIVACY.map(p => {
                const on = toggles[p.id];
                return (
                  <Pressable
                    key={p.id}
                    accessibilityRole="switch"
                    accessibilityState={{ checked: on }}
                    accessibilityLabel={`${p.label} access`}
                    onPress={() => toggle(p.id)}
                    style={{
                      width: '31%',
                      flexGrow: 1,
                      alignItems: 'center',
                      gap: t.spacing[2],
                      paddingVertical: t.spacing[4],
                      borderRadius: t.radius['2xl'],
                      borderWidth: 1,
                      borderColor: on ? t.colors.primary : t.colors.border,
                      backgroundColor: t.colors.surface,
                      opacity: on ? 1 : 0.6,
                    }}
                  >
                    <IconCircle icon={p.icon} size={40} tone={p.tone} />
                    <AppText variant="secondary" style={{ fontFamily: t.fonts.bodySemibold }}>
                      {p.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </Section>

          {/* Emergency snapshot */}
          <Section title="Emergency snapshot">
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2], marginBottom: t.spacing[4] }}>
                <AlertCircle size={16} color={t.colors.high} strokeWidth={2.4} />
                <AppText variant="eyebrow" color={t.colors.high}>
                  In case of emergency
                </AppText>
              </View>
              <View style={{ gap: t.spacing[3] }}>
                <EmergencyRow icon={Droplets} label="Blood type" value={DEPENDENT_DETAIL.emergency.bloodType} />
                <EmergencyRow icon={Activity} label="Allergies" value={DEPENDENT_DETAIL.emergency.allergies} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View>
                    <AppText variant="eyebrow" color={t.colors.high}>
                      Primary contact
                    </AppText>
                    <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                      {DEPENDENT_DETAIL.emergency.primaryContact}
                    </AppText>
                  </View>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: t.colors.surfaceMuted,
                    }}
                  >
                    <Phone size={16} color={t.colors.primary} strokeWidth={2.2} />
                  </View>
                </View>
              </View>
            </Card>
          </Section>

          {/* Latest insight */}
          <Section title="Latest insight">
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: t.spacing[3] }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
                  <Sparkles size={16} color={t.colors.primary} strokeWidth={2.4} />
                  <AppText variant="eyebrow" color={t.colors.primary}>
                    AI insight
                  </AppText>
                </View>
                <Badge label={DEPENDENT_DETAIL.latestInsight.date} variant="source" />
              </View>
              <AppText variant="body" style={{ marginBottom: t.spacing[4] }}>
                {DEPENDENT_DETAIL.latestInsight.text}
              </AppText>
              <Button
                label="View full report"
                variant="outline"
                size="sm"
                onPress={() => nav.navigate('ReportsHub')}
              />
            </Card>
          </Section>

          {/* Data composition */}
          <Section title="Data composition">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[3] }}>
              {DEPENDENT_DETAIL.dataComposition.map(item => {
                const Icon = COMPOSITION_ICON[item.label as keyof typeof COMPOSITION_ICON] ?? FileText;
                return (
                  <Card key={item.label} style={{ width: '47%', flexGrow: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2], marginBottom: t.spacing[3] }}>
                      <IconCircle icon={Icon} size={28} tone="teal" />
                      <AppText variant="secondary" color={t.colors.textMuted} style={{ flex: 1 }} numberOfLines={1}>
                        {item.label}
                      </AppText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                      <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['2xl'], color: t.colors.text }}>
                        {item.value}
                      </AppText>
                      <AppText variant="secondary" color={t.colors.textMuted}>
                        {item.unit}
                      </AppText>
                    </View>
                    <AppText variant="eyebrow" color={statColor(item.tone)} style={{ marginTop: 4 }}>
                      {item.stat}
                    </AppText>
                  </Card>
                );
              })}
            </View>
          </Section>

          {/* Delegated access */}
          <Section title="Delegated access" actionLabel="Add" onAction={() => {}}>
            <Card>
              <View style={{ gap: t.spacing[4] }}>
                {DEPENDENT_DETAIL.delegatedAccess.map((u, i) => (
                  <View
                    key={u.name}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: t.spacing[3],
                      paddingTop: i === 0 ? 0 : t.spacing[4],
                      borderTopWidth: i === 0 ? 0 : 1,
                      borderTopColor: t.colors.border,
                    }}
                  >
                    <Avatar initials={u.initials} size={40} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                        {u.name}
                      </AppText>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
                        <AppText variant="secondary" color={t.colors.textMuted}>
                          {u.role}
                        </AppText>
                        <AppText variant="secondary" color={t.colors.textMuted}>
                          ·
                        </AppText>
                        <AppText
                          variant="secondary"
                          color={u.temporary ? t.colors.low : t.colors.success}
                          style={{ fontFamily: t.fonts.bodySemibold }}
                        >
                          {u.access}
                        </AppText>
                      </View>
                    </View>
                    <UserPlus size={16} color={t.colors.textMuted} strokeWidth={2.2} style={{ opacity: 0 }} />
                  </View>
                ))}
              </View>
            </Card>
          </Section>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2], justifyContent: 'center', paddingVertical: t.spacing[2] }}>
            <Users size={14} color={t.colors.textMuted} strokeWidth={2.2} />
            <AppText variant="secondary" color={t.colors.textMuted}>
              One person, one MyCare ID · dependents are independent peers.
            </AppText>
          </View>
        </View>
      </Screen>

      {/* Remove confirmation */}
      <Modal visible={confirmRemove} animationType="slide" onRequestClose={() => setConfirmRemove(false)}>
        <Sheet eyebrow="Household" title="Remove from household?" onClose={() => setConfirmRemove(false)}>
          <View style={{ alignItems: 'center', gap: t.spacing[2], marginBottom: t.spacing[2] }}>
            <IconCircle icon={Trash2} size={48} tone="high" />
          </View>
          <AppText variant="body" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
            <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
              {member.name}
            </AppText>{' '}
            will be removed from this account. Their MyCare ID and records are not deleted.
          </AppText>
          <View style={{ flexDirection: 'row', gap: t.spacing[3], marginTop: t.spacing[2] }}>
            <Button label="Cancel" variant="outline" style={{ flex: 1 }} onPress={() => setConfirmRemove(false)} />
            <Button
              label="Remove"
              variant="secondary"
              style={{ flex: 1 }}
              onPress={() => {
                setConfirmRemove(false);
                nav.goBack();
              }}
            />
          </View>
        </Sheet>
      </Modal>
    </>
  );
}

function EmergencyRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Droplets;
  label: string;
  value: string;
}) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
        <Icon size={16} color={t.colors.textMuted} strokeWidth={2.2} />
        <AppText variant="body" color={t.colors.textMuted}>
          {label}
        </AppText>
      </View>
      <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
        {value}
      </AppText>
    </View>
  );
}
