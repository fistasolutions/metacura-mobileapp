// Screen 23 · Reports hub — pick the depth — see specs/reports.md
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, ScreenHeader, AppText, TierCard } from '../../components';
import { useTheme } from '../../theme';
import { REPORT_TIERS } from '../../data';
import { ReportTier } from '../../data/types';

export default function ReportsHubScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  const onPressTier = (id: ReportTier) => {
    if (id === 'summary') {
      nav.navigate('SummaryReport');
    } else if (id === 'insights') {
      nav.navigate('PaymentSheet', { tier: 'insights' });
    } else {
      nav.navigate('PaymentSheet', { tier: 'opinion' });
    }
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Reports"
        title="Pick the depth you"
        accent="need today."
        subtitle="Pay as you go. No subscription, ever. Re-opening a report is always free."
      />

      <View style={{ gap: t.spacing[5] }}>
        {REPORT_TIERS.map(tier => (
          <TierCard key={tier.id} tier={tier} onPress={() => onPressTier(tier.id)} />
        ))}
      </View>

      <AppText
        variant="eyebrow"
        color={t.colors.textMuted}
        style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: t.spacing[6] }}
      >
        Pay as you go · No subscription
      </AppText>
    </Screen>
  );
}
