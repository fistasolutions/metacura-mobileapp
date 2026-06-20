// Screen 31 · Profile — see specs/profile.md
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  BadgeCheck,
  Building2,
  Camera,
  CreditCard,
  FileText,
  Receipt,
  Share2,
  ShieldCheck,
  Shield,
  Users,
  LucideIcon,
} from 'lucide-react-native';
import {
  Screen,
  Card,
  GlassCard,
  Avatar,
  Button,
  AppText,
  IconCircle,
  Section,
  SettingRow,
} from '../../components';
import { useTheme } from '../../theme';
import { CURRENT_USER, PROFILE_STATS } from '../../data';

// An icon for each profile metric, keyed by a word in its label.
function statIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes('record')) return FileText;
  if (l.includes('clinic')) return Building2;
  if (l.includes('mycare')) return Users;
  if (l.includes('secured')) return ShieldCheck;
  if (l.includes('share')) return Share2;
  if (l.includes('spend')) return Receipt;
  return FileText;
}

const FEATURE_TAGS = ['E2E Encrypted', 'Zero-Knowledge', 'No Ads', 'Pay-as-you-go'];

const SETTINGS = [
  { icon: Users, title: 'Family & Dependents', subtitle: 'Manage separate MyCare IDs', route: 'FamilyDependents' },
  { icon: Shield, title: 'Privacy & Data', subtitle: 'Security and your data', route: 'PrivacyData' },
  { icon: CreditCard, title: 'Receipts & Billing', subtitle: 'Past report purchases', route: 'ReceiptsBilling' },
] as const;

export default function ProfileScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  return (
    <Screen scroll={false} contentStyle={{ flex: 1, gap: t.spacing[5] }} edges={['top', 'bottom']}>
      {/* Profile membership card — teal gradient hero */}
      <LinearGradient
        colors={[t.colors.gradientStart, t.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { borderRadius: t.radius['3xl'] }, t.shadows.button]}
      >
        <ShieldCheck size={118} color="rgba(255,255,255,0.09)" strokeWidth={1.5} style={styles.watermark} />
        <View pointerEvents="none" style={styles.blobTR} />
        <View pointerEvents="none" style={styles.blobBL} />

        {/* Identity */}
        <View style={styles.identity}>
          <View>
            <Avatar initials={CURRENT_USER.initials} size={50} onPrimary />
            <View style={[styles.camBadge, { backgroundColor: t.palette.white, borderColor: t.colors.primary }]}>
              <Camera size={10} color={t.colors.primary} strokeWidth={2.4} />
            </View>
          </View>
          <View style={{ flex: 1, gap: 3 }}>
            <View style={styles.verifiedRow}>
              <BadgeCheck size={13} color={t.palette.white} strokeWidth={2.4} />
              <AppText variant="eyebrow" color="rgba(255,255,255,0.9)">
                VERIFIED · PRIMARY
              </AppText>
            </View>
            <AppText color={t.palette.white} numberOfLines={1} style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize.xl }}>
              {CURRENT_USER.fullName}
            </AppText>
            <AppText color="rgba(255,255,255,0.88)" style={{ fontFamily: t.fonts.mono, fontSize: t.fontSize.xs, letterSpacing: 1 }}>
              {CURRENT_USER.mycareId}
            </AppText>
          </View>
        </View>

        {/* Feature tags as translucent chips */}
        <View style={styles.tagRow}>
          {FEATURE_TAGS.map(tag => (
            <View key={tag} style={[styles.tag, { borderRadius: t.radius.pill }]}>
              <AppText variant="eyebrow" color={t.palette.white}>
                {tag.toUpperCase()}
              </AppText>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* Info boxes */}
        <View style={styles.infoRow}>
          {[
            { label: 'Created', value: 'Oct 2024' },
            { label: 'Region', value: 'Global (UTC)' },
          ].map(box => (
            <View key={box.label} style={[styles.infoBox, { borderRadius: t.radius.lg }]}>
              <AppText variant="eyebrow" color="rgba(255,255,255,0.7)">
                {box.label.toUpperCase()}
              </AppText>
              <AppText color={t.palette.white} style={{ fontFamily: t.fonts.bodySemibold, fontSize: t.fontSize.sm }}>
                {box.value}
              </AppText>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Stats grid — three key crystal tiles, one row */}
      <View style={styles.statGrid}>
        {PROFILE_STATS.slice(0, 3).map(stat => (
          <GlassCard key={stat.label} style={styles.statTile} contentStyle={styles.statContent}>
            <IconCircle icon={statIcon(stat.label)} size={30} tone="teal" radius={10} />
            <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize.xl, color: t.colors.text }}>
              {stat.value}
            </AppText>
            <AppText variant="eyebrow" color={t.colors.textMuted} numberOfLines={2}>
              {stat.label.toUpperCase()}
            </AppText>
          </GlassCard>
        ))}
      </View>

      {/* Account settings */}
      <Section title="Account Settings">
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {SETTINGS.map((row, i) => (
            <SettingRow
              key={row.title}
              icon={row.icon}
              title={row.title}
              subtitle={row.subtitle}
              first={i === 0}
              onPress={() => nav.navigate(row.route)}
            />
          ))}
        </Card>
      </Section>

      {/* Flexible spacer keeps the actions at the foot without scrolling. */}
      <View style={{ flex: 1, minHeight: t.spacing[4] }} />

      {/* Bottom actions */}
      <View style={{ gap: t.spacing[2] }}>
        <Button label="Switch Profile" variant="outline" onPress={() => nav.navigate('ProfileSwitcher')} />
        <Button label="Sign Out" variant="ghost" onPress={() => nav.navigate('Auth')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 16,
    overflow: 'hidden',
    gap: 14,
  },
  watermark: { position: 'absolute', top: -16, right: -18 },
  blobTR: {
    position: 'absolute',
    top: -70,
    right: -40,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  blobBL: {
    position: 'absolute',
    bottom: -60,
    left: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  camBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 2,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statTile: {
    width: '31%',
  },
  statContent: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 7,
    minHeight: 116,
    justifyContent: 'flex-start',
  },
});
