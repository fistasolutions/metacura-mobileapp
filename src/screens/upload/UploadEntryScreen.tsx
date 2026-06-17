// Screen 12 · Upload entry — see specs/upload.md
import React from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  Image as ImageIcon,
  FileText,
  ChevronRight,
  LucideIcon,
} from 'lucide-react-native';
import {
  Screen,
  ScreenHeader,
  AppText,
  Card,
  Button,
  IconCircle,
} from '../../components';
import { useTheme } from '../../theme';

type Tile = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  tone: 'brand' | 'teal';
  big?: boolean;
  onPress: () => void;
};

export default function UploadEntryScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  const tiles: Tile[] = [
    {
      icon: Camera,
      title: 'Open Camera',
      subtitle: 'Scan a document, page by page.',
      tone: 'brand',
      big: true,
      onPress: () => nav.navigate('CameraScanner'),
    },
    {
      icon: ImageIcon,
      title: 'Photo Library',
      subtitle: 'Pick an existing photo.',
      tone: 'teal',
      onPress: () => nav.navigate('UploadProgress'),
    },
    {
      icon: FileText,
      title: 'PDF or document',
      subtitle: 'Choose a file from your device.',
      tone: 'teal',
      onPress: () => nav.navigate('UploadProgress'),
    },
  ];

  return (
    <Screen scroll>
      <ScreenHeader
        onBack={() => nav.goBack()}
        eyebrow="Upload"
        title="Add a record"
      />

      <View style={{ gap: t.spacing[4] }}>
        {tiles.map(tile => (
          <Pressable
            key={tile.title}
            onPress={tile.onPress}
            accessibilityRole="button"
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: t.spacing[4],
                  paddingVertical: tile.big ? t.spacing[3] : 0,
                }}
              >
                <IconCircle
                  icon={tile.icon}
                  tone={tile.tone}
                  size={tile.big ? 64 : 48}
                />
                <View style={{ flex: 1 }}>
                  <AppText
                    variant={tile.big ? 'cardTitle' : 'body'}
                    style={{ fontFamily: t.fonts.bodySemibold }}
                  >
                    {tile.title}
                  </AppText>
                  <AppText
                    variant="secondary"
                    color={t.colors.textMuted}
                    style={{ marginTop: 2 }}
                  >
                    {tile.subtitle}
                  </AppText>
                </View>
                <ChevronRight
                  size={20}
                  color={t.colors.textMuted}
                  strokeWidth={2.2}
                />
              </View>
            </Card>
          </Pressable>
        ))}

        <View style={{ alignItems: 'center', marginTop: t.spacing[2] }}>
          <Button
            label="Type manually"
            variant="ghost"
            onPress={() => nav.navigate('ClassifyConfirm')}
          />
        </View>

        <AppText
          variant="secondary"
          color={t.colors.textMuted}
          style={{ textAlign: 'center', marginTop: t.spacing[2] }}
        >
          iOS and Android share-sheet inbound also lands here. Encrypted on arrival.
        </AppText>
      </View>
    </Screen>
  );
}
