// Screen 30 · Audit trail — see specs/share.md
import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link2 } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Badge,
  Button,
  Chips,
  IconCircle,
} from '../../components';
import { useTheme } from '../../theme';
import { SHARE_LINKS } from '../../data';

const TABS = ['All', 'Active', 'Expired', 'Revoked'];

export default function AuditTrailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [tab, setTab] = useState('All');

  const links = SHARE_LINKS.filter(l =>
    tab === 'All' ? true : l.status === tab.toLowerCase(),
  );

  const statusVariant = (s: string) =>
    s === 'active' ? 'success' : s === 'revoked' ? 'outline' : 'default';

  return (
    <Screen>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Audit trail"
        title="Every disclosure, logged"
        subtitle="Who accessed your records, when, and what they viewed."
        right={<Button label="Share" size="sm" onPress={() => nav.navigate('ShareWithClinician')} />}
      />

      <View style={{ marginBottom: t.spacing[4] }}>
        <Chips options={TABS} value={tab} onChange={setTab} />
      </View>

      {links.length === 0 ? (
        <Card>
          <AppText variant="body" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
            No {tab.toLowerCase()} links. Shared links and their access history appear here.
          </AppText>
        </Card>
      ) : (
        <View style={{ gap: t.spacing[3] }}>
          {links.map(l => (
            <Card key={l.id} style={{ gap: t.spacing[3] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] }}>
                <IconCircle icon={Link2} size={40} tone="teal" />
                <View style={{ flex: 1 }}>
                  <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
                    {l.label}
                  </AppText>
                  <AppText variant="secondary" color={t.colors.textMuted}>
                    Read-only link
                  </AppText>
                </View>
                <Badge
                  label={l.status[0].toUpperCase() + l.status.slice(1)}
                  variant={statusVariant(l.status)}
                />
              </View>
              <AppText variant="secondary" color={t.colors.textMuted}>
                {l.views} views · Shared {l.sharedAt} · Expires {l.expiresAt}
              </AppText>
              {l.status === 'active' ? (
                <Button label="Revoke" variant="outline" size="sm" onPress={() => {}} />
              ) : null}
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}
