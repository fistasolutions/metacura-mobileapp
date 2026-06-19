/**
 * Screen 11 · Home dashboard — the MyCare ID card, recent records, and a
 * Reports-ready card (shown only when a generated report exists). Quiet and
 * factual, no gamification. The FloatingMic and tab bar are shell-level.
 * See specs/home.md.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  ChevronRight,
  FileText,
  FlaskConical,
  Heart,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { Screen, AppText, Avatar, IconCircle, RecordCard, Section, StatCard } from '../../components';
import { CURRENT_USER, MOCK_RECORDS } from '../../data';

export default function HomeDashboardScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const recent = MOCK_RECORDS.slice(0, 3);
  const flagged = MOCK_RECORDS.reduce(
    (n, r) => n + (r.values?.filter(v => v.flag !== 'normal').length ?? 0),
    0,
  );

  // A generated report exists for this profile (the free Summary). When none
  // exists the Reports-ready card is hidden entirely.
  const reportReady = true;

  const openRecord = (recordId: string) =>
    nav.navigate('App', { screen: 'RecordsTab', params: { screen: 'RecordDetail', params: { recordId } } });

  return (
    <Screen contentStyle={{ gap: t.spacing[6] }}>
      {/* MyCare ID card — a compact membership card */}
      <LinearGradient
        colors={[t.colors.gradientStart, t.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          { borderRadius: t.radius['3xl'], padding: t.spacing[4], overflow: 'hidden' },
          t.shadows.button,
        ]}
      >
        {/* Ambient blobs + faint watermark for depth */}
        <View
          pointerEvents="none"
          style={{ position: 'absolute', top: -70, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.12)' }}
        />
        <View
          pointerEvents="none"
          style={{ position: 'absolute', bottom: -60, left: -30, width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(255,255,255,0.06)' }}
        />
        <Activity
          size={160}
          color="rgba(255,255,255,0.08)"
          strokeWidth={1.5}
          style={{ position: 'absolute', top: -24, right: -28 }}
        />

        {/* Identity row */}
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          <Avatar initials={CURRENT_USER.initials} size={46} onPrimary />
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
              color="rgba(255,255,255,0.88)"
              numberOfLines={1}
              style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.sm, letterSpacing: 1, marginTop: 3 }}
            >
              {CURRENT_USER.mycareId}
            </AppText>
          </View>

          {/* Active status chip */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: 6,
              backgroundColor: 'rgba(255,255,255,0.18)',
              borderRadius: t.radius.pill,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: t.palette.white }} />
            <AppText variant="eyebrow" color={t.palette.white}>
              ACTIVE
            </AppText>
          </View>
        </View>

        {/* Hairline divider */}
        <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: t.spacing[3] }} />

        {/* Footer: member since on the left, records count on the right */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: t.spacing[4] }}>
          <AppText color="rgba(255,255,255,0.78)" style={{ fontSize: t.fontSize.sm }}>
            Member since {CURRENT_USER.memberSince}
          </AppText>

          <View style={{ alignItems: 'flex-end' }}>
            <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['3xl'], lineHeight: 34, color: t.palette.white }}>
              {CURRENT_USER.records}
            </AppText>
            <AppText variant="eyebrow" color="rgba(255,255,255,0.85)">
              RECORDS
            </AppText>
          </View>
        </View>
      </LinearGradient>

      {/* Compact stat tiles */}
      <View style={{ gap: t.spacing[3] }}>
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          <StatCard compact icon={FileText} value={String(CURRENT_USER.records)} label="Records" tone="teal" footer="All time" />
          <StatCard compact icon={Heart} value="86" label="Health Score" tone="normal" delta="+4" deltaUp footer="This month" />
        </View>
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          <StatCard compact icon={AlertTriangle} value={String(flagged)} label="Flagged" tone="high" footer="Needs review" />
          <StatCard compact icon={FlaskConical} value="4" label="Reports" tone="teal" footer="Ready to view" />
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

      {/* Reports ready — only when a generated report exists */}
      {reportReady ? (
        <Pressable
          onPress={() => nav.navigate('ReportsHub')}
          accessibilityRole="button"
          accessibilityLabel="Your health summary is ready"
          style={({ pressed }) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing[3],
              backgroundColor: t.colors.surfaceMuted,
              borderWidth: 1,
              borderColor: t.colors.borderStrong,
              borderRadius: t.radius['2xl'],
              padding: t.spacing[4],
              opacity: pressed ? 0.85 : 1,
            },
            t.shadows.card,
          ]}
        >
          <IconCircle icon={FlaskConical} tone="teal" size={44} />
          <View style={{ flex: 1 }}>
            <AppText variant="eyebrow" color={t.colors.primary} style={{ textTransform: 'uppercase' }}>
              Report ready
            </AppText>
            <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold, marginTop: 2 }}>
              Your Health Summary
            </AppText>
            <AppText variant="secondary" color={t.colors.textMuted} numberOfLines={1} style={{ marginTop: 1 }}>
              Open your linked Summary report
            </AppText>
          </View>
          <ChevronRight size={18} color={t.colors.primary} strokeWidth={2.4} />
        </Pressable>
      ) : null}
    </Screen>
  );
}
