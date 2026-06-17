// Screen 13 · Camera scanner — see specs/upload.md
// Mock scanner. No real camera, plain Views standing in for the viewfinder.
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { AppText, Button } from '../../components';
import { useTheme } from '../../theme';

function CornerBracket({
  color,
  corner,
}: {
  color: string;
  corner: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const size = 28;
  const thickness = 3;
  const base: any = { position: 'absolute', width: size, height: size };
  const edges: any = {
    tl: { top: -2, left: -2, borderTopWidth: thickness, borderLeftWidth: thickness },
    tr: { top: -2, right: -2, borderTopWidth: thickness, borderRightWidth: thickness },
    bl: { bottom: -2, left: -2, borderBottomWidth: thickness, borderLeftWidth: thickness },
    br: { bottom: -2, right: -2, borderBottomWidth: thickness, borderRightWidth: thickness },
  };
  return <View style={[base, edges[corner], { borderColor: color }]} />;
}

export default function CameraScannerScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [pages, setPages] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: t.palette.black }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Close */}
        <View style={{ paddingHorizontal: t.spacing[5], paddingTop: t.spacing[2] }}>
          <Pressable
            onPress={() => nav.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} color={t.palette.white} strokeWidth={2.4} />
          </Pressable>
        </View>

        {/* Viewfinder */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: t.spacing[6] }}>
          <View
            style={{
              width: '78%',
              aspectRatio: 0.75,
              borderRadius: t.radius.lg,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.18)',
            }}
          >
            <CornerBracket color={t.palette.accentTeal} corner="tl" />
            <CornerBracket color={t.palette.accentTeal} corner="tr" />
            <CornerBracket color={t.palette.accentTeal} corner="bl" />
            <CornerBracket color={t.palette.accentTeal} corner="br" />
          </View>

          <AppText
            variant="body"
            color={t.palette.white}
            style={{ textAlign: 'center', paddingHorizontal: t.spacing[8] }}
          >
            Position the document in the frame. Edges detected automatically.
          </AppText>
        </View>

        {/* Controls */}
        <View
          style={{
            paddingHorizontal: t.spacing[5],
            paddingBottom: t.spacing[4],
            alignItems: 'center',
            gap: t.spacing[4],
          }}
        >
          {pages > 0 ? (
            <AppText variant="secondary" color={t.palette.accentCyan}>
              {pages} {pages === 1 ? 'page' : 'pages'} captured
            </AppText>
          ) : null}

          <Pressable
            onPress={() => setPages(p => p + 1)}
            accessibilityRole="button"
            accessibilityLabel="Capture page"
            style={({ pressed }) => ({
              width: 76,
              height: 76,
              borderRadius: 38,
              borderWidth: 5,
              borderColor: 'rgba(255,255,255,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ scale: pressed ? 0.94 : 1 }],
            })}
          >
            <View
              style={{
                width: 58,
                height: 58,
                borderRadius: 29,
                backgroundColor: t.palette.white,
              }}
            />
          </Pressable>

          {pages > 0 ? (
            <View style={{ alignSelf: 'stretch', gap: t.spacing[3] }}>
              <Button
                label="Add another page"
                variant="ghost"
                onPress={() => setPages(p => p + 1)}
                style={{ alignSelf: 'center' }}
              />
              <Button
                label={`Review ${pages} ${pages === 1 ? 'page' : 'pages'}`}
                onPress={() => nav.navigate('UploadProgress')}
              />
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
