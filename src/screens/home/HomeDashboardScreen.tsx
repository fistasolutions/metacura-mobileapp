/**
 * Screen 11 · Home dashboard — the MyCare ID card, compact stats, and recent
 * records. Quiet and factual, no gamification. See specs/home.md.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BadgeCheck,
  ChevronRight,
  FileText,
  Heart,
  AlertTriangle,
  FlaskConical,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, AppText, Avatar, RecordCard, StatCard, Section } from '../../components';
import { CURRENT_USER, MOCK_RECORDS } from '../../data';

export default function HomeDashboardScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const recent = MOCK_RECORDS.slice(0, 3);
  const flagged = MOCK_RECORDS.reduce(
    (n, r) => n + (r.values?.filter(v => v.flag !== 'normal').length ?? 0),
    0,
  );

  const openRecord = (recordId: string) =>
    nav.navigate('App', { screen: 'RecordsTab', params: { screen: 'RecordDetail', params: { recordId } } });

  return (
    <Screen contentStyle={{ gap: t.spacing[6] }}>
      {/* MyCare ID card */}
      <LinearGradient
        colors={[t.colors.gradientStart, t.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          { borderRadius: t.radius['3xl'], padding: t.spacing[5], overflow: 'hidden' },
          t.shadows.button,
        ]}
      >
        {/* Ambient blobs */}
        <View
          pointerEvents="none"
          style={{ position: 'absolute', top: -70, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.12)' }}
        />
        <View
          pointerEvents="none"
          style={{ position: 'absolute', bottom: -60, left: -30, width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(255,255,255,0.06)' }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: t.spacing[4] }}>
          <View style={{ flex: 1, flexDirection: 'row', gap: t.spacing[3] }}>
            <Avatar initials={CURRENT_USER.initials} size={52} onPrimary />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[1] }}>
                <BadgeCheck size={13} color={t.palette.white} strokeWidth={2.4} />
                <AppText variant="eyebrow" color="rgba(255,255,255,0.85)">
                  MYCARE ID
                </AppText>
              </View>
              <AppText
                color={t.palette.white}
                numberOfLines={1}
                style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize.xl, marginTop: t.spacing[1] }}
              >
                {CURRENT_USER.fullName}
              </AppText>
              <AppText
                color="rgba(255,255,255,0.85)"
                numberOfLines={1}
                style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.xs, marginTop: 3 }}
              >
                {CURRENT_USER.mycareId}
              </AppText>
              <AppText color="rgba(255,255,255,0.7)" numberOfLines={1} style={{ fontSize: t.fontSize.xs, marginTop: 1 }}>
                Member since {CURRENT_USER.memberSince}
              </AppText>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['4xl'], color: t.palette.white }}>
              {CURRENT_USER.records}
            </AppText>
            <AppText variant="eyebrow" color="rgba(255,255,255,0.85)">
              RECORDS
            </AppText>
          </View>
        </View>

        <Pressable
          onPress={() => nav.navigate('ReportsHub')}
          accessibilityRole="button"
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: t.spacing[1],
            marginTop: t.spacing[5],
            backgroundColor: t.palette.white,
            borderRadius: t.radius.pill,
            paddingVertical: t.spacing[2] + 2,
            paddingHorizontal: t.spacing[4],
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <AppText variant="secondary" style={{ fontFamily: t.fonts.bodyBold, color: t.colors.primaryStrong }}>
            Summary ready
          </AppText>
          <ChevronRight size={16} color={t.colors.primaryStrong} strokeWidth={2.6} />
        </Pressable>
      </LinearGradient>

      {/* Stat cards */}
      <View style={{ gap: t.spacing[3] }}>
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          <StatCard icon={FileText} value={String(CURRENT_USER.records)} label="Records" tone="teal" />
          <StatCard icon={Heart} value="86" label="Health Score" tone="normal" delta="+4" deltaUp />
        </View>
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          <StatCard icon={AlertTriangle} value={String(flagged)} label="Flagged" tone="high" />
          <StatCard icon={FlaskConical} value="4" label="Reports" tone="teal" />
        </View>
      </View>

      {/* Recent records */}
      <Section
        title="Recent records"
        actionLabel="View all"
        onAction={() => nav.navigate('App', { screen: 'RecordsTab' })}
      >
        {recent.map(r => (
          <RecordCard key={r.id} record={r} onPress={() => openRecord(r.id)} />
        ))}
      </Section>
    </Screen>
  );
}
