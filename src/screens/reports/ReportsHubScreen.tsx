// Screen 23 · Reports hub — pick the depth — see specs/reports.md
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, ScreenHeader, AppText, TierCard } from '../../components';
import { useTheme } from '../../theme';
import { REPORT_TIERS, useOwnedReports } from '../../data';
import { ReportTier } from '../../data/types';

const REPORT_ROUTE: Record<ReportTier, string> = {
  summary: 'SummaryReport',
  insights: 'HealthInsightsReport',
  opinion: 'SecondOpinionReport',
};

export default function ReportsHubScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const { hasReport } = useOwnedReports();

  const onPressTier = (id: ReportTier) => {
    // Free Summary and already-owned paid reports open directly; re-opening is
    // always free. Unowned paid tiers route through the native payment sheet.
    if (hasReport(id)) {
      nav.navigate(REPORT_ROUTE[id]);
    } else {
      nav.navigate('PaymentSheet', { tier: id as 'insights' | 'opinion' });
    }
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader
        onBack={() => nav.goBack()}
        hideBack={!nav.canGoBack()}
        eyebrow="Reports"
        title="Pick the depth you"
        accent="need today."
        subtitle="Pay as you go. No subscription, ever. Re-opening a report is always free."
      />

      <View style={{ gap: t.spacing[5] }}>
        {REPORT_TIERS.map(tier => (
          <TierCard
            key={tier.id}
            tier={tier}
            owned={hasReport(tier.id)}
            onPress={() => onPressTier(tier.id)}
          />
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
