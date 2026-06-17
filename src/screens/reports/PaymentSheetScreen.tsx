// Screen 27 · Payment sheet — see specs/reports.md
// Showcase stand-in for the native Apple Pay / Google Pay sheet.
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ShieldCheck, CheckCircle2 } from 'lucide-react-native';
import { Sheet, AppText, Card, Button } from '../../components';
import { useTheme } from '../../theme';
import { REPORT_TIERS } from '../../data';

type Phase = 'idle' | 'processing' | 'success';

export default function PaymentSheetScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tierId: 'insights' | 'opinion' = route.params?.tier ?? 'insights';

  const tier = REPORT_TIERS.find(r => r.id === tierId);
  const amount = tierId === 'opinion' ? '$4' : '$2';
  const tierName = tier?.name ?? 'Report';

  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (phase === 'processing') {
      const id = setTimeout(() => setPhase('success'), 1500);
      return () => clearTimeout(id);
    }
    if (phase === 'success') {
      const id = setTimeout(() => {
        nav.navigate(tierId === 'opinion' ? 'SecondOpinionReport' : 'HealthInsightsReport');
      }, 1200);
      return () => clearTimeout(id);
    }
  }, [phase, tierId, nav]);

  if (phase === 'processing') {
    return (
      <Sheet>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: t.spacing[4], paddingVertical: t.spacing[12] }}>
          <ActivityIndicator size="large" color={t.colors.primary} />
          <AppText variant="h2">Processing payment</AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            Confirmed · under 30 seconds
          </AppText>
        </View>
      </Sheet>
    );
  }

  if (phase === 'success') {
    return (
      <Sheet>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: t.spacing[4], paddingVertical: t.spacing[12] }}>
          <LinearGradient
            colors={[t.colors.gradientStart, t.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' }}
          >
            <CheckCircle2 size={44} color={t.colors.textInverse} strokeWidth={2.2} />
          </LinearGradient>
          <AppText variant="h2">Report ready</AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            Opening your insights now…
          </AppText>
        </View>
      </Sheet>
    );
  }

  return (
    <Sheet eyebrow="Run a report" title={tierName} onClose={() => nav.goBack()}>
      <Card style={{ backgroundColor: t.colors.surfaceMuted, gap: t.spacing[2], alignItems: 'center' }}>
        <AppText variant="secondary" color={t.colors.textMuted}>
          One report
        </AppText>
        <AppText variant="display" style={{ fontFamily: t.fonts.mono }}>
          {amount}
        </AppText>
      </Card>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: t.spacing[3],
          backgroundColor: t.colors.normalBg,
          borderRadius: t.radius.lg,
          padding: t.spacing[4],
        }}
      >
        <ShieldCheck size={20} color={t.colors.primary} strokeWidth={2.4} />
        <AppText variant="secondary" color={t.colors.primaryStrong} style={{ flex: 1 }}>
          No subscription. You only pay for this report.
        </AppText>
      </View>

      <View style={{ gap: t.spacing[3] }}>
        <Button label="Pay" onPress={() => setPhase('processing')} />
        <Button label="Pay with Google Pay" variant="outline" onPress={() => setPhase('processing')} />
      </View>

      <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
        Showcase only. Nothing is charged.
      </AppText>
    </Sheet>
  );
}
