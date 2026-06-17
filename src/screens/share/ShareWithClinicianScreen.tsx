// Screen 28 · Share with clinician — see specs/share.md
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck, Link2, Clock, Copy, Check } from 'lucide-react-native';
import { Sheet, AppText, Button, Chips, Card } from '../../components';
import { useTheme } from '../../theme';

const EXPIRY = ['24 hours', '7 days', '30 days'];
const SCOPE = ['All records', 'Specific records', 'One report only'];

export default function ShareWithClinicianScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [ready, setReady] = useState(false);
  const [expiry, setExpiry] = useState(EXPIRY[1]);
  const [scope, setScope] = useState(SCOPE[0]);
  const [copied, setCopied] = useState(false);

  const url = 'https://metacura.app/s/7F3A21';

  return (
    <Sheet eyebrow="Share with a clinician" title="Read-only link" onClose={() => nav.goBack()}>
      {!ready ? (
        <>
          <AppText variant="body" color={t.colors.textMuted}>
            A read-only link, time-boxed and revocable. Every view is logged.
          </AppText>

          <View style={{ gap: t.spacing[2] }}>
            <AppText variant="eyebrow" color={t.colors.textMuted}>
              LINK EXPIRES IN
            </AppText>
            <Chips options={EXPIRY} value={expiry} onChange={setExpiry} scroll={false} />
          </View>

          <View style={{ gap: t.spacing[2] }}>
            <AppText variant="eyebrow" color={t.colors.textMuted}>
              SCOPE
            </AppText>
            <Chips options={SCOPE} value={scope} onChange={setScope} scroll={false} />
          </View>

          <Button label="Create read-only link" onPress={() => setReady(true)} />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color={t.colors.primary} strokeWidth={2.4} />
            <AppText variant="secondary" color={t.colors.textMuted}>
              Revoke anytime from your access history
            </AppText>
          </View>
        </>
      ) : (
        <>
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
            <Link2 size={18} color={t.colors.primary} strokeWidth={2.2} />
            <AppText variant="secondary" style={{ flex: 1, fontFamily: t.fonts.mono }} numberOfLines={1}>
              {url}
            </AppText>
            <Pressable
              onPress={() => setCopied(true)}
              accessibilityRole="button"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: t.colors.primary,
                borderRadius: t.radius.pill,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              {copied ? (
                <Check size={13} color={t.colors.textInverse} strokeWidth={3} />
              ) : (
                <Copy size={13} color={t.colors.textInverse} strokeWidth={2.4} />
              )}
              <AppText variant="eyebrow" color={t.colors.textInverse}>
                {copied ? 'COPIED' : 'COPY'}
              </AppText>
            </Pressable>
          </Card>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Clock size={14} color={t.colors.textMuted} strokeWidth={2.2} />
            <AppText variant="secondary" color={t.colors.textMuted}>
              Expires in {expiry}
            </AppText>
          </View>

          <Button label="Manage in access history" variant="outline" onPress={() => nav.navigate('AuditTrail')} />
        </>
      )}
    </Sheet>
  );
}
