// Screen 17 · Record detail — see specs/records.md
// A rich editorial read of one record: a flag-overview strip, a glass AI summary
// with a gradient medallion, value rows with a mini range gauge that opens the
// Source sheet, optional findings, and a gradient "Ask about this" CTA.
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Check, ChevronRight, Link2, MessageCircle, Sparkles } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  GlassCard,
  Badge,
  SectionEyebrow,
  StatusPill,
} from '../../components';
import { useTheme } from '../../theme';
import { MOCK_RECORDS } from '../../data';
import { Flag, FlaggedValue } from '../../data/types';

/* ── A compact flag-count tile for the overview strip ──────────────────── */
function StatTile({ count, label, color }: { count: number; label: string; color: string }) {
  const t = useTheme();
  return (
    <View style={[styles.statTile, { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius.xl }, t.shadows.sm]}>
      <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['2xl'], color }}>
        {count}
      </AppText>
      <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
        {label}
      </AppText>
    </View>
  );
}

/* ── A slim 3-zone range gauge with a marker positioned by flag ────────── */
function RangeGauge({ flag }: { flag: Flag }) {
  const t = useTheme();
  const pos = flag === 'high' ? 0.82 : flag === 'low' ? 0.18 : 0.5;
  const marker = flag === 'high' ? t.colors.high : flag === 'low' ? t.colors.low : t.colors.normal;
  return (
    <View style={styles.gaugeWrap}>
      <View style={[styles.gaugeTrack, { borderRadius: t.radius.pill }]}>
        <View style={{ flex: 1, backgroundColor: t.colors.lowBg }} />
        <View style={{ flex: 1.5, backgroundColor: t.colors.normalBg }} />
        <View style={{ flex: 1, backgroundColor: t.colors.highBg }} />
      </View>
      <View
        style={[
          styles.gaugeMarker,
          { left: `${pos * 100}%`, backgroundColor: t.colors.surface, borderColor: marker },
        ]}
      />
    </View>
  );
}

/* ── A rich, tappable value row ────────────────────────────────────────── */
function ValueDetailRow({
  value,
  last,
  onPress,
}: {
  value: FlaggedValue;
  last: boolean;
  onPress: () => void;
}) {
  const t = useTheme();
  const dot = value.flag === 'high' ? t.colors.high : value.flag === 'low' ? t.colors.low : t.colors.normal;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${value.label}, ${value.value} ${value.unit ?? ''}, ${value.flag}`}
      style={({ pressed }) => [
        styles.valueRow,
        { borderBottomColor: t.colors.border, borderBottomWidth: last ? 0 : 1, opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <View style={styles.valueTop}>
        <View style={styles.flex1}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: dot }]} />
            <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
              {value.label}
            </AppText>
          </View>
          {value.range ? (
            <AppText variant="secondary" color={t.colors.textMuted} style={{ marginTop: 2 }}>
              {value.range}
            </AppText>
          ) : null}
        </View>
        <View style={styles.valueRight}>
          <AppText color={t.colors.text} style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.lg }}>
            {value.value}
            {value.unit ? (
              <AppText color={t.colors.textMuted} style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.sm }}>
                {` ${value.unit}`}
              </AppText>
            ) : null}
          </AppText>
          <View style={styles.pillRow}>
            <StatusPill status={value.flag} />
            <Link2 size={13} color={t.colors.primary} strokeWidth={2.4} />
          </View>
        </View>
      </View>
      <RangeGauge flag={value.flag} />
    </Pressable>
  );
}

export default function RecordDetailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const recordId = route.params?.recordId;
  const record = MOCK_RECORDS.find(r => r.id === recordId) ?? MOCK_RECORDS[0];

  const values = record.values ?? [];
  const counts = {
    high: values.filter(v => v.flag === 'high').length,
    low: values.filter(v => v.flag === 'low').length,
    normal: values.filter(v => v.flag === 'normal').length,
  };

  const askAboutThis = () =>
    nav.navigate('App', {
      screen: 'AskTab',
      params: { screen: 'AskLanding', params: { recordId: record.id } },
    });

  return (
    <Screen scroll>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow={record.type}
        title={record.title}
        subtitle={`${record.source} · ${record.date}`}
      />

      <View style={{ gap: t.spacing[5] }}>
        {/* Flag overview */}
        {values.length ? (
          <View style={styles.statRow}>
            <StatTile count={counts.high} label="High" color={t.colors.high} />
            <StatTile count={counts.low} label="Low" color={t.colors.low} />
            <StatTile count={counts.normal} label="Normal" color={t.colors.normal} />
          </View>
        ) : null}

        {/* AI summary */}
        <GlassCard contentStyle={{ gap: t.spacing[4] }}>
          <View style={styles.summaryHead}>
            <LinearGradient
              colors={[t.colors.gradientStart, t.colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.medallion, { borderRadius: t.radius.lg }]}
            >
              <Sparkles size={18} color={t.palette.white} strokeWidth={2.3} />
            </LinearGradient>
            <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
              AI Summary
            </AppText>
          </View>
          <AppText variant="body" color={t.colors.text}>
            {record.summary}
          </AppText>
          <Badge
            variant="source"
            label={`Linked · ${record.citedSources} sources`}
            onPress={() => nav.navigate('SourceSheet', { recordId: record.id, line: 1 })}
          />
        </GlassCard>

        {/* Values */}
        {values.length ? (
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Values" />
            <Card padded={false} style={{ paddingHorizontal: t.spacing[5], paddingVertical: t.spacing[1] }}>
              {values.map((v, i) => (
                <ValueDetailRow
                  key={`${v.label}-${i}`}
                  value={v}
                  last={i === values.length - 1}
                  onPress={() => nav.navigate('SourceSheet', { recordId: record.id, line: v.sourceLine })}
                />
              ))}
            </Card>
          </View>
        ) : null}

        {/* Findings */}
        {record.findings ? (
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Findings" />
            <Card style={{ gap: t.spacing[3] }}>
              {record.findings.map((f, i) => (
                <View key={`${f}-${i}`} style={styles.findingRow}>
                  <View style={[styles.findingCheck, { backgroundColor: t.colors.normalBg, borderRadius: t.radius.pill }]}>
                    <Check size={14} color={t.colors.primary} strokeWidth={2.8} />
                  </View>
                  <AppText variant="body" style={styles.flex1}>
                    {f}
                  </AppText>
                </View>
              ))}
            </Card>
          </View>
        ) : null}

        {/* Ask about this — gradient CTA */}
        <Pressable
          onPress={askAboutThis}
          accessibilityRole="button"
          accessibilityLabel="Ask about this record"
          style={({ pressed }) => [t.shadows.button, { transform: [{ scale: pressed ? 0.99 : 1 }] }]}
        >
          <LinearGradient
            colors={[t.colors.gradientStart, t.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.cta, { borderRadius: t.radius['2xl'] }]}
          >
            <View style={[styles.ctaIcon, { borderRadius: t.radius.lg }]}>
              <MessageCircle size={20} color={t.palette.white} strokeWidth={2.3} />
            </View>
            <View style={styles.flex1}>
              <AppText style={{ fontFamily: t.fonts.bodyBold, color: t.palette.white, fontSize: t.fontSize.base }}>
                Ask about this record
              </AppText>
              <AppText variant="secondary" color="rgba(255,255,255,0.85)">
                Opens Ask Doctor with this record loaded
              </AppText>
            </View>
            <ChevronRight size={20} color={t.palette.white} strokeWidth={2.4} />
          </LinearGradient>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  upper: { textTransform: 'uppercase' },
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 14,
    gap: 2,
  },
  summaryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  medallion: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueRow: {
    paddingVertical: 14,
  },
  valueTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  valueRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gaugeWrap: {
    height: 14,
    justifyContent: 'center',
    marginTop: 12,
  },
  gaugeTrack: {
    height: 6,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  gaugeMarker: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: -6,
  },
  findingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  findingCheck: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  ctaIcon: {
    width: 42,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
