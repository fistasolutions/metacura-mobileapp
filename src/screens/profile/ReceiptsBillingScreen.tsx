// Screen 35 · Receipts & billing — see specs/billing.md
import React from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FileText } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Badge,
  IconCircle,
  SectionEyebrow,
} from '../../components';
import { useTheme } from '../../theme';
import { RECEIPTS } from '../../data';

export default function ReceiptsBillingScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Billing"
        title="Receipts & billing"
        subtitle="Pay as you go. No subscription, no recurring charges."
      />

      <View style={{ gap: t.spacing[5] }}>
        {/* Current plan */}
        <Card style={{ gap: t.spacing[2] }}>
          <AppText variant="eyebrow" color={t.colors.textMuted} style={{ textTransform: 'uppercase' }}>
            Current plan
          </AppText>
          <AppText variant="cardTitle">Basic Plan</AppText>
          <AppText variant="body" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
            Free forever
          </AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            No recurring charges
          </AppText>
        </Card>

        {/* Report receipts */}
        <View style={{ gap: t.spacing[3] }}>
          <SectionEyebrow label="Report receipts" />
          {RECEIPTS.length === 0 ? (
            <Card>
              <AppText variant="body" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
                No receipts yet. Reports you run will appear here.
              </AppText>
            </Card>
          ) : (
            <Card style={{ gap: 0 }} padded={false}>
              {RECEIPTS.map((r, i) => (
                <Pressable
                  key={r.id}
                  accessibilityRole="button"
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: t.spacing[3],
                    paddingHorizontal: t.spacing[6],
                    paddingVertical: t.spacing[4],
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: t.colors.border,
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <IconCircle icon={FileText} size={40} tone="teal" />
                  <View style={{ flex: 1 }}>
                    <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                      {r.title}
                    </AppText>
                    <AppText variant="secondary" color={t.colors.textMuted} style={{ marginTop: 2 }}>
                      {r.date}
                    </AppText>
                  </View>
                  <Badge label={r.status} variant="success" />
                  <AppText variant="body" style={{ fontFamily: t.fonts.mono }}>
                    {r.amount}
                  </AppText>
                </Pressable>
              ))}
            </Card>
          )}
        </View>

        <AppText variant="secondary" color={t.colors.textMuted}>
          Re-opening a past report is always free.
        </AppText>
      </View>
    </Screen>
  );
}
