/**
 * Screen 13 · Camera scanner — multi-page capture with automatic edge
 * detection, "add another page" between shots, then a review grid of every
 * captured page with a per-page retake. Mock scanner: plain Views stand in for
 * the viewfinder (real capture is react-native-vision-camera). See specs/upload.md.
 */
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { FileText, Plus, RotateCcw, ScanLine, X } from 'lucide-react-native';
import { AppText, Button } from '../../components';
import { useTheme } from '../../theme';

function CornerBracket({ color, corner }: { color: string; corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 30;
  const thickness = 3;
  const edges: Record<string, object> = {
    tl: { top: -2, left: -2, borderTopWidth: thickness, borderLeftWidth: thickness },
    tr: { top: -2, right: -2, borderTopWidth: thickness, borderRightWidth: thickness },
    bl: { bottom: -2, left: -2, borderBottomWidth: thickness, borderLeftWidth: thickness },
    br: { bottom: -2, right: -2, borderBottomWidth: thickness, borderRightWidth: thickness },
  };
  return <View style={[{ position: 'absolute', width: size, height: size, borderColor: color }, edges[corner]]} />;
}

export default function CameraScannerScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [pages, setPages] = useState(0);
  const [mode, setMode] = useState<'capture' | 'review'>('capture');

  // Sweeping scan line for the live-detection feel.
  const sweep = useSharedValue(0);
  useEffect(() => {
    sweep.value = withRepeat(withTiming(1, { duration: 1900, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [sweep]);
  const sweepStyle = useAnimatedStyle(() => ({ top: `${6 + sweep.value * 86}%` }));

  /* ── Review grid ──────────────────────────────────────────────────── */
  if (mode === 'review') {
    return (
      <View style={{ flex: 1, backgroundColor: t.colors.background }}>
        <SafeAreaView style={styles.flex1} edges={['top', 'bottom']}>
          <View style={styles.reviewHead}>
            <Pressable
              onPress={() => setMode('capture')}
              accessibilityRole="button"
              accessibilityLabel="Back to camera"
              hitSlop={10}
              style={({ pressed }) => [styles.iconBtnLight, { backgroundColor: t.colors.surfaceMuted, opacity: pressed ? 0.7 : 1 }]}
            >
              <X size={20} color={t.colors.text} strokeWidth={2.4} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
                Review
              </AppText>
              <AppText variant="cardTitle" color={t.colors.text}>
                {pages} {pages === 1 ? 'page' : 'pages'} captured
              </AppText>
            </View>
          </View>

          <View style={styles.grid}>
            {Array.from({ length: pages }).map((_, i) => (
              <View key={i} style={styles.pageCell}>
                <View style={[styles.pageThumb, { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius.lg }, t.shadows.card]}>
                  <FileText size={30} color={t.colors.primary} strokeWidth={1.8} />
                  <View style={[styles.pageNum, { backgroundColor: t.colors.primary, borderRadius: t.radius.pill }]}>
                    <AppText variant="eyebrow" color={t.palette.white}>
                      {i + 1}
                    </AppText>
                  </View>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Retake page ${i + 1}`}
                  onPress={() => setMode('capture')}
                  style={({ pressed }) => [styles.retake, { opacity: pressed ? 0.6 : 1 }]}
                >
                  <RotateCcw size={13} color={t.colors.primary} strokeWidth={2.4} />
                  <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
                    Retake
                  </AppText>
                </Pressable>
              </View>
            ))}

            {/* Add-another tile */}
            <Pressable
              onPress={() => setMode('capture')}
              accessibilityRole="button"
              accessibilityLabel="Add another page"
              style={({ pressed }) => [styles.pageCell, { opacity: pressed ? 0.7 : 1 }]}
            >
              <View style={[styles.addTile, { borderColor: t.colors.borderStrong, backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.lg }]}>
                <Plus size={26} color={t.colors.primary} strokeWidth={2.4} />
                <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
                  Add page
                </AppText>
              </View>
            </Pressable>
          </View>

          <View style={styles.reviewFoot}>
            <Button label={`Use ${pages} ${pages === 1 ? 'page' : 'pages'}`} size="lg" onPress={() => nav.navigate('UploadProgress')} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  /* ── Capture (viewfinder) ─────────────────────────────────────────── */
  return (
    <View style={{ flex: 1, backgroundColor: t.palette.black }}>
      <SafeAreaView style={styles.flex1} edges={['top', 'bottom']}>
        <View style={styles.captureHead}>
          <Pressable
            onPress={() => nav.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={styles.iconBtnDark}
          >
            <X size={20} color={t.palette.white} strokeWidth={2.4} />
          </Pressable>
          {pages > 0 ? (
            <View style={[styles.pagePill, { backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: t.radius.pill }]}>
              <AppText variant="eyebrow" color={t.palette.white} style={styles.upper}>
                {pages} captured
              </AppText>
            </View>
          ) : null}
        </View>

        {/* Viewfinder */}
        <View style={styles.viewfinder}>
          <View style={[styles.frame, { borderColor: 'rgba(255,255,255,0.18)', borderRadius: t.radius.lg }]}>
            <CornerBracket color={t.palette.accentTeal} corner="tl" />
            <CornerBracket color={t.palette.accentTeal} corner="tr" />
            <CornerBracket color={t.palette.accentTeal} corner="bl" />
            <CornerBracket color={t.palette.accentTeal} corner="br" />
            {/* sweeping detection line */}
            <Animated.View style={[styles.sweep, { backgroundColor: t.palette.accentCyan }, sweepStyle]} />
            {/* edges-detected badge */}
            <View style={[styles.detectBadge, { backgroundColor: 'rgba(20,184,166,0.9)', borderRadius: t.radius.pill }]}>
              <ScanLine size={12} color={t.palette.white} strokeWidth={2.6} />
              <AppText variant="eyebrow" color={t.palette.white} style={styles.upper}>
                Edges detected
              </AppText>
            </View>
          </View>

          <AppText variant="body" color="rgba(255,255,255,0.9)" style={styles.hint}>
            Position the document in the frame. Edges are detected automatically.
          </AppText>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            onPress={() => setPages(p => p + 1)}
            accessibilityRole="button"
            accessibilityLabel="Capture page"
            style={({ pressed }) => [styles.shutterRing, { borderColor: 'rgba(255,255,255,0.4)', transform: [{ scale: pressed ? 0.94 : 1 }] }]}
          >
            <View style={[styles.shutter, { backgroundColor: t.palette.white }]} />
          </Pressable>

          {pages > 0 ? (
            <Button
              label={`Review ${pages} ${pages === 1 ? 'page' : 'pages'}`}
              size="lg"
              onPress={() => setMode('review')}
              style={styles.reviewBtn}
            />
          ) : (
            <AppText variant="secondary" color="rgba(255,255,255,0.7)">
              Tap the shutter to capture each page
            </AppText>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  upper: { textTransform: 'uppercase' },
  // Capture
  captureHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  iconBtnDark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewfinder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  frame: {
    width: '78%',
    aspectRatio: 0.75,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sweep: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 2,
    opacity: 0.9,
    borderRadius: 2,
  },
  detectBadge: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  hint: {
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 18,
  },
  shutterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  reviewBtn: {
    alignSelf: 'stretch',
  },
  // Review
  reviewHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  iconBtnLight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 20,
    alignContent: 'flex-start',
  },
  pageCell: {
    width: '47%',
    gap: 8,
    alignItems: 'center',
  },
  pageThumb: {
    width: '100%',
    aspectRatio: 0.78,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNum: {
    position: 'absolute',
    top: 8,
    left: 8,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retake: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addTile: {
    width: '100%',
    aspectRatio: 0.78,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  reviewFoot: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
