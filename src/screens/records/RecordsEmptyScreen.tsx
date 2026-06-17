// Screen 19 · Empty state, new user — see specs/records.md and specs/states.md
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FileText } from 'lucide-react-native';
import { Screen, AppText, Button, IconCircle, BackLink } from '../../components';
import { useTheme } from '../../theme';

export default function RecordsEmptyScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  return (
    <Screen scroll={false} contentStyle={{ justifyContent: 'center' }}>
      <BackLink />
      <View style={{ alignItems: 'center', gap: t.spacing[4] }}>
        <IconCircle icon={FileText} tone="teal" size={88} />

        <AppText
          variant="h2"
          style={{ textAlign: 'center', marginTop: t.spacing[2] }}
        >
          Upload your first document to get started
        </AppText>

        <AppText
          variant="body"
          color={t.colors.textMuted}
          style={{ textAlign: 'center' }}
        >
          Lab, MRI, ECG, prescription, any format. Average time under 30 seconds.
        </AppText>

        <View style={{ alignSelf: 'stretch', gap: t.spacing[3], marginTop: t.spacing[4] }}>
          <Button
            label="Open Camera"
            size="lg"
            onPress={() => nav.navigate('CameraScanner')}
          />
          <Button
            label="Choose a file"
            variant="outline"
            onPress={() => nav.navigate('UploadEntry')}
          />
        </View>
      </View>
    </Screen>
  );
}
