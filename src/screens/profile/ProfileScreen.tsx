// Screen 31 · Profile — see specs/profile.md
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  CheckCircle2,
  Users,
  Shield,
  CreditCard,
} from 'lucide-react-native';
import {
  Screen,
  Card,
  GlassCard,
  Avatar,
  Badge,
  Button,
  AppText,
  Section,
  SettingRow,
} from '../../components';
import { useTheme } from '../../theme';
import { CURRENT_USER, PROFILE_STATS } from '../../data';

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
    <Screen contentStyle={{ gap: t.spacing[6] }}>
      {/* Profile card */}
      <Card style={{ gap: t.spacing[5] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[4] }}>
          <View>
            <Avatar initials={CURRENT_USER.initials} size={72} />
            <View
              style={{
                position: 'absolute',
                right: -2,
                bottom: -2,
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: t.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: t.colors.surface,
              }}
            >
              <Camera size={13} color={t.colors.textInverse} strokeWidth={2.4} />
            </View>
          </View>
          <View style={{ flex: 1, gap: t.spacing[2] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[1] }}>
              <CheckCircle2 size={15} color={t.colors.success} strokeWidth={2.4} />
              <AppText variant="eyebrow" color={t.colors.success}>
                VERIFIED
              </AppText>
            </View>
            <AppText variant="h2">{CURRENT_USER.fullName}</AppText>
            <Badge label="Primary Account" variant="success" />
          </View>
        </View>

        {/* Feature tags */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          {FEATURE_TAGS.map(tag => (
            <Badge key={tag} label={tag} variant="outline" />
          ))}
        </View>

        {/* Info boxes */}
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          {[
            { label: 'Created', value: 'Oct 2024' },
            { label: 'Region', value: 'Global (UTC)' },
          ].map(box => (
            <View
              key={box.label}
              style={{
                flex: 1,
                backgroundColor: t.colors.surfaceMuted,
                borderRadius: t.radius.lg,
                paddingHorizontal: t.spacing[4],
                paddingVertical: t.spacing[3],
                gap: 3,
              }}
            >
              <AppText variant="eyebrow" color={t.colors.textMuted}>
                {box.label.toUpperCase()}
              </AppText>
              <AppText variant="secondary" style={{ fontFamily: t.fonts.bodySemibold }}>
                {box.value}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      {/* Stats grid, 3 per row, aligned */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[3] }}>
        {PROFILE_STATS.map(stat => (
          <GlassCard
            key={stat.label}
            style={{ width: `${(100 - 2 * 4) / 3}%` }}
            contentStyle={{ paddingVertical: t.spacing[4], paddingHorizontal: t.spacing[3], gap: 4 }}
          >
            <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['2xl'], color: t.colors.text }}>
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

      {/* Bottom actions */}
      <View style={{ gap: t.spacing[3] }}>
        <Button label="Switch Profile" variant="outline" onPress={() => nav.navigate('ProfileSwitcher')} />
        <Button label="Sign Out" variant="ghost" onPress={() => nav.navigate('Auth')} />
      </View>
    </Screen>
  );
}
