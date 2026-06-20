// Screen 34 · Privacy & data — see specs/profile.md
import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fingerprint, Lock, Moon, Download, Trash2, ShieldCheck } from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  Card,
  Button,
  Input,
  Toggle,
  AppText,
  IconCircle,
  SectionEyebrow,
  Sheet,
} from '../../components';
import { useTheme, useThemeMode } from '../../theme';

export default function PrivacyDataScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const { mode, setPreference } = useThemeMode();
  const [biometrics, setBiometrics] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const darkMode = mode === 'dark';
  const [deleting, setDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const toggleRow = (
    icon: typeof Fingerprint,
    title: string,
    subtitle: string,
    value: boolean,
    onChange: (v: boolean) => void,
    danger = false,
  ) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[4] }}>
      <IconCircle icon={icon} size={40} tone={danger ? 'high' : 'teal'} />
      <View style={{ flex: 1, gap: 2 }}>
        <AppText variant="cardTitle">{title}</AppText>
        <AppText variant="secondary" color={t.colors.textMuted}>
          {subtitle}
        </AppText>
      </View>
      <Toggle value={value} onValueChange={onChange} />
    </View>
  );

  const closeDelete = () => {
    setDeleting(false);
    setConfirmText('');
  };

  return (
    <>
      <Screen>
        <ScreenHeader onBack={() => nav.goBack()} title="Privacy & data" />

        <View style={{ gap: t.spacing[5] }}>
          {/* Security & Access */}
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Security & Access" />
            <Card style={{ gap: t.spacing[5] }}>
              {toggleRow(
                Fingerprint,
                'FaceID / Biometrics',
                'Unlock with your face or fingerprint',
                biometrics,
                setBiometrics,
              )}
              {toggleRow(Lock, 'Two-Factor Authentication', 'Extra security on login', twoFactor, setTwoFactor)}
            </Card>
          </View>

          {/* Appearance */}
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Appearance" />
            <Card>
              {toggleRow(
                Moon,
                'Dark mode theme',
                darkMode ? 'Dark theme is on' : 'Switch the whole app to dark',
                darkMode,
                v => setPreference(v ? 'dark' : 'light'),
              )}
            </Card>
          </View>

          {/* Export & Delete */}
          <View style={{ gap: t.spacing[3] }}>
            <SectionEyebrow label="Export & Delete" />
            <Card padded={false} style={{ overflow: 'hidden' }}>
              <Pressable
                onPress={() => nav.navigate('ExportData')}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: t.spacing[4],
                  padding: t.spacing[5],
                  backgroundColor: pressed ? t.colors.surfaceMuted : 'transparent',
                })}
              >
                <IconCircle icon={Download} size={40} tone="teal" />
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="cardTitle">Export all my data</AppText>
                  <AppText variant="secondary" color={t.colors.textMuted}>
                    Get a ZIP file of all records
                  </AppText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setDeleting(true)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: t.spacing[4],
                  padding: t.spacing[5],
                  borderTopWidth: 1,
                  borderTopColor: t.colors.border,
                  backgroundColor: pressed ? t.colors.highBg : 'transparent',
                })}
              >
                <IconCircle icon={Trash2} size={40} tone="high" />
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="cardTitle" color={t.colors.high}>
                    Delete account permanently
                  </AppText>
                  <AppText variant="secondary" color={t.colors.textMuted}>
                    Initiate 30-day removal process
                  </AppText>
                </View>
              </Pressable>
            </Card>
          </View>

          {/* Privacy seal */}
          <Card style={{ backgroundColor: t.colors.text, gap: t.spacing[3] }}>
            <ShieldCheck size={28} color={t.colors.accent} strokeWidth={2.2} />
            <AppText variant="h2" color={t.colors.textInverse}>
              Your data, never trained on.
            </AppText>
            <AppText variant="body" color={t.colors.textInverse} style={{ opacity: 0.8 }}>
              We never sell your data, and we explicitly prohibit its use for training any AI models.
            </AppText>
            <AppText variant="eyebrow" color={t.colors.accent}>
              END-TO-END ENCRYPTED
            </AppText>
          </Card>
        </View>
      </Screen>

      <Modal visible={deleting} animationType="slide" onRequestClose={closeDelete}>
        <Sheet eyebrow="Danger Zone" title="Delete your account?" onClose={closeDelete}>
          <AppText variant="body" color={t.colors.textMuted}>
            This action cannot be undone. Your records will be permanently wiped within our 30-day removal commitment. To
            verify, type DELETE below.
          </AppText>
          <Input
            placeholder="DELETE"
            autoCapitalize="characters"
            value={confirmText}
            onChangeText={setConfirmText}
          />
          <Button
            label="Confirm Deletion"
            variant="secondary"
            disabled={confirmText !== 'DELETE'}
            style={{ backgroundColor: t.colors.high }}
            onPress={closeDelete}
          />
          <Button label="Cancel" variant="ghost" onPress={closeDelete} />
        </Sheet>
      </Modal>
    </>
  );
}
