// Screen 27 · Payment sheet — see specs/reports.md
// Showcase stand-in for the native Apple Pay / Google Pay sheet, presented as a
// full page (matches the report screens). The primary "Pay" opens a card-entry
// form; Google Pay stays an instant wallet option. Nothing is charged.
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ShieldCheck, CheckCircle2 } from 'lucide-react-native';
import { Screen, ScreenHeader, AppText, Card, Button, Input } from '../../components';
import { useTheme } from '../../theme';
import { REPORT_TIERS, purchaseReport, PaymentMethod } from '../../data';

type Phase = 'idle' | 'card' | 'processing' | 'success';

const formatCard = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function PaymentSheetScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tierId: 'insights' | 'opinion' = route.params?.tier ?? 'insights';

  const tier = REPORT_TIERS.find(r => r.id === tierId);
  const amount = tierId === 'opinion' ? '$4' : '$2';
  const tierName = tier?.name ?? 'Report';

  const [phase, setPhase] = useState<Phase>('idle');

  // Card form state.
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  const pay = (method: PaymentMethod) => {
    // Mock charge: unlock the report so the hub shows it as owned (free re-opens).
    purchaseReport(tierId, method);
    setPhase('processing');
  };

  const payWithCard = () => {
    if (
      number.replace(/\s/g, '').length < 15 ||
      expiry.length < 5 ||
      cvc.length < 3 ||
      !name.trim()
    ) {
      setError('Please complete your card details.');
      return;
    }
    setError('');
    pay('card');
  };

  useEffect(() => {
    if (phase === 'processing') {
      const id = setTimeout(() => setPhase('success'), 1500);
      return () => clearTimeout(id);
    }
    if (phase === 'success') {
      const id = setTimeout(() => {
        // Replace (not push) so the payment page leaves the stack: tapping back
        // from the report returns to the hub, never to this transient screen.
        nav.replace(tierId === 'opinion' ? 'SecondOpinionReport' : 'HealthInsightsReport');
      }, 1200);
      return () => clearTimeout(id);
    }
  }, [phase, tierId, nav]);

  if (phase === 'processing') {
    return (
      <Screen edges={['top', 'bottom']} scroll={false}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: t.spacing[4] }}>
          <ActivityIndicator size="large" color={t.colors.primary} />
          <AppText variant="h2">Processing payment</AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            Confirmed · under 30 seconds
          </AppText>
        </View>
      </Screen>
    );
  }

  if (phase === 'success') {
    return (
      <Screen edges={['top', 'bottom']} scroll={false}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: t.spacing[4] }}>
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
      </Screen>
    );
  }

  // Card-entry form (full page).
  if (phase === 'card') {
    return (
      <Screen edges={['top', 'bottom']}>
        <ScreenHeader
          onBack={() => {
            setError('');
            setPhase('idle');
          }}
          eyebrow="Card details"
          title={tierName}
        />

        <View style={{ gap: t.spacing[4] }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: t.colors.surfaceMuted,
              borderRadius: t.radius.lg,
              paddingHorizontal: t.spacing[5],
              paddingVertical: t.spacing[4],
            }}
          >
            <AppText variant="secondary" color={t.colors.textMuted}>
              One report
            </AppText>
            <AppText variant="h2" style={{ fontFamily: t.fonts.mono }}>
              {amount}
            </AppText>
          </View>

          <View style={{ gap: t.spacing[3] }}>
            <Input
              label="Cardholder name"
              placeholder="Jane Patient"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="cc-name"
            />
            <Input
              label="Card number"
              placeholder="4242 4242 4242 4242"
              value={number}
              onChangeText={v => setNumber(formatCard(v))}
              keyboardType="number-pad"
              autoComplete="cc-number"
              maxLength={19}
              style={{ fontFamily: t.fonts.mono }}
            />
            <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
              <Input
                label="Expiry"
                placeholder="MM/YY"
                value={expiry}
                onChangeText={v => setExpiry(formatExpiry(v))}
                keyboardType="number-pad"
                maxLength={5}
                containerStyle={{ flex: 1 }}
                style={{ fontFamily: t.fonts.mono }}
              />
              <Input
                label="CVC"
                placeholder="123"
                value={cvc}
                onChangeText={v => setCvc(v.replace(/\D/g, '').slice(0, 4))}
                keyboardType="number-pad"
                maxLength={4}
                containerStyle={{ flex: 1 }}
                style={{ fontFamily: t.fonts.mono }}
              />
            </View>
          </View>

          {error ? (
            <AppText variant="secondary" color={t.colors.high}>
              {error}
            </AppText>
          ) : null}

          <Button label={`Pay ${amount}`} onPress={payWithCard} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: t.spacing[2] }}>
            <ShieldCheck size={14} color={t.colors.textMuted} strokeWidth={2.4} />
            <AppText variant="secondary" color={t.colors.textMuted}>
              Showcase only. Nothing is charged.
            </AppText>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader onBack={() => nav.goBack()} eyebrow="Run a report" title={tierName} />

      <View style={{ gap: t.spacing[4] }}>
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
          <Button label="Pay" onPress={() => setPhase('card')} />
          <Button label="Pay with Google Pay" variant="outline" onPress={() => pay('google')} />
        </View>

        <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
          Showcase only. Nothing is charged.
        </AppText>
      </View>
    </Screen>
  );
}
