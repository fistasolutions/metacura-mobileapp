/**
 * Screen 12 · Upload entry — camera-first, plus a drag-and-drop dropper. A
 * dashed drop zone sits at the top; below it, draggable document chips can be
 * dragged into the zone to upload (the in-app stand-in for desktop drag-drop).
 * A large gradient "Open Camera" hero, two secondary tiles (Photo Library, PDF),
 * a "Type manually" row, and the encrypted-on-arrival reassurance follow.
 * See specs/upload.md.
 */
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  ChevronRight,
  FileText,
  GripVertical,
  Image as ImageIcon,
  Lock,
  PenLine,
  UploadCloud,
  LucideIcon,
} from 'lucide-react-native';
import { ScreenHeader, AppText, GlassCard, IconCircle } from '../../components';
import { useTheme } from '../../theme';

type Rect = { x: number; y: number; w: number; h: number };
type DropDoc = { id: string; name: string; meta: string; icon: LucideIcon };

const DROP_DOCS: DropDoc[] = [
  { id: 'lab', name: 'Lab_Report.pdf', meta: 'PDF · 142 KB', icon: FileText },
  { id: 'scan', name: 'MRI_Scan.jpg', meta: 'Image · 2.4 MB', icon: ImageIcon },
  { id: 'rx', name: 'Prescription.pdf', meta: 'PDF · 88 KB', icon: FileText },
];

/* ── Drag-and-drop dropper ─────────────────────────────────────────────── */

function DocChip({
  doc,
  dropRect,
  hover,
  onDrop,
  onDragStart,
  onDragEnd,
}: {
  doc: DropDoc;
  dropRect: SharedValue<Rect>;
  hover: SharedValue<number>;
  onDrop: (doc: DropDoc) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const t = useTheme();
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const lift = useSharedValue(0); // 0..1 dragging
  const home = useSharedValue<Rect>({ x: 0, y: 0, w: 0, h: 0 });

  const isOver = (): boolean => {
    'worklet';
    const cx = home.value.x + home.value.w / 2 + tx.value;
    const cy = home.value.y + home.value.h / 2 + ty.value;
    const d = dropRect.value;
    return cx >= d.x && cx <= d.x + d.w && cy >= d.y && cy <= d.y + d.h;
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      lift.value = withSpring(1, { damping: 16 });
      runOnJS(onDragStart)();
    })
    .onUpdate(e => {
      tx.value = e.translationX;
      ty.value = e.translationY;
      hover.value = isOver() ? 1 : 0;
    })
    .onEnd(() => {
      if (isOver()) {
        hover.value = 0;
        runOnJS(onDrop)(doc);
      }
      tx.value = withSpring(0);
      ty.value = withSpring(0);
      lift.value = withSpring(0);
      hover.value = 0;
      runOnJS(onDragEnd)();
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: 1 + lift.value * 0.05 },
    ],
    zIndex: lift.value > 0 ? 20 : 1,
    shadowOpacity: 0.1 + lift.value * 0.18,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        onLayout={e => {
          home.value = {
            x: e.nativeEvent.layout.x,
            y: e.nativeEvent.layout.y,
            w: e.nativeEvent.layout.width,
            h: e.nativeEvent.layout.height,
          };
        }}
        style={[
          styles.chip,
          { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius.lg },
          t.shadows.card,
          style,
        ]}
      >
        <View style={[styles.chipIcon, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.md }]}>
          <doc.icon size={16} color={t.colors.primary} strokeWidth={2.3} />
        </View>
        <View style={styles.flex1}>
          <AppText variant="eyebrow" color={t.colors.text} numberOfLines={1} style={{ fontFamily: t.fonts.bodySemibold }}>
            {doc.name}
          </AppText>
          <AppText variant="eyebrow" color={t.colors.textMuted} numberOfLines={1}>
            {doc.meta}
          </AppText>
        </View>
        <GripVertical size={16} color={t.colors.textMuted} strokeWidth={2.2} />
      </Animated.View>
    </GestureDetector>
  );
}

function DragDropUpload({
  onDrop,
  onDragStart,
  onDragEnd,
}: {
  onDrop: (doc: DropDoc) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const t = useTheme();
  const dropRect = useSharedValue<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const hover = useSharedValue(0);

  const dropStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(hover.value, [0, 1], [t.colors.surfaceMuted, t.colors.normalBg]),
    borderColor: interpolateColor(hover.value, [0, 1], [t.colors.borderStrong, t.colors.primary]),
    transform: [{ scale: 1 + hover.value * 0.02 }],
  }));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -hover.value * 3 }, { scale: 1 + hover.value * 0.08 }],
  }));

  return (
    <View style={{ gap: t.spacing[3] }}>
      <Animated.View
        onLayout={e => {
          dropRect.value = {
            x: e.nativeEvent.layout.x,
            y: e.nativeEvent.layout.y,
            w: e.nativeEvent.layout.width,
            h: e.nativeEvent.layout.height,
          };
        }}
        style={[styles.dropZone, { borderRadius: t.radius['2xl'] }, dropStyle]}
      >
        <Animated.View style={[styles.dropIcon, { backgroundColor: t.colors.surface, borderRadius: t.radius.pill }, iconStyle]}>
          <UploadCloud size={26} color={t.colors.primary} strokeWidth={2.2} />
        </Animated.View>
        <AppText variant="body" color={t.colors.text} style={{ fontFamily: t.fonts.bodySemibold }}>
          Drag a file here to upload
        </AppText>
        <AppText variant="secondary" color={t.colors.textMuted}>
          Drop it in the box, or tap a source below
        </AppText>
      </Animated.View>

      <View style={styles.chipRow}>
        {DROP_DOCS.map(d => (
          <DocChip
            key={d.id}
            doc={d}
            dropRect={dropRect}
            hover={hover}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </View>
    </View>
  );
}

/* ── Secondary source tile ─────────────────────────────────────────────── */

function SmallTile({
  icon: Icon,
  title,
  subtitle,
  onPress,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [styles.smallWrap, { opacity: pressed ? 0.85 : 1 }]}
    >
      <GlassCard contentStyle={styles.smallContent}>
        <IconCircle icon={Icon} tone="teal" size={42} />
        <View style={{ gap: 2 }}>
          <AppText variant="body" style={{ fontFamily: t.fonts.bodySemibold }}>
            {title}
          </AppText>
          <AppText variant="secondary" color={t.colors.textMuted}>
            {subtitle}
          </AppText>
        </View>
      </GlassCard>
    </Pressable>
  );
}

export default function UploadEntryScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (doc: DropDoc) =>
    nav.navigate('UploadProgress', { fileName: doc.name });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }} edges={['top', 'bottom']}>
      <ScrollView
        scrollEnabled={!dragging}
        contentContainerStyle={{ padding: t.spacing[5], paddingBottom: t.spacing[12], gap: t.spacing[5] }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          onBack={() => nav.goBack()}
          eyebrow="Upload"
          title="Add a"
          accent="record."
          subtitle="Drag a file into the box, or use the camera. Everything arrives encrypted."
        />

        {/* Drag-and-drop dropper */}
        <DragDropUpload
          onDrop={handleDrop}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
        />

        {/* Hero — Open Camera */}
        <Pressable
          onPress={() => nav.navigate('CameraScanner')}
          accessibilityRole="button"
          accessibilityLabel="Open camera"
          style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
        >
          <LinearGradient
            colors={[t.colors.gradientStart, t.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.hero, t.shadows.button]}
          >
            <Camera
              size={150}
              color="rgba(255,255,255,0.10)"
              strokeWidth={1.5}
              style={styles.heroWatermark}
            />
            <View style={[styles.heroIcon, { borderRadius: t.radius['2xl'] }]}>
              <Camera size={30} color={t.palette.white} strokeWidth={2.2} />
            </View>
            <View style={{ marginTop: t.spacing[4], gap: 4 }}>
              <AppText style={{ fontFamily: t.fonts.headingBold, fontSize: t.fontSize['2xl'], color: t.palette.white }}>
                Open Camera
              </AppText>
              <AppText variant="body" color="rgba(255,255,255,0.85)">
                Scan a document, page by page. Edges detected automatically.
              </AppText>
            </View>
            <View style={[styles.heroCta, { backgroundColor: t.palette.white, borderRadius: t.radius.pill }]}>
              <AppText variant="eyebrow" color={t.colors.primaryStrong} style={styles.upper}>
                Start scan
              </AppText>
              <ChevronRight size={15} color={t.colors.primaryStrong} strokeWidth={2.8} />
            </View>
          </LinearGradient>
        </Pressable>

        {/* Secondary sources */}
        <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
          <SmallTile
            icon={ImageIcon}
            title="Photo Library"
            subtitle="Pick a photo"
            onPress={() => nav.navigate('UploadProgress')}
          />
          <SmallTile
            icon={FileText}
            title="PDF or doc"
            subtitle="Choose a file"
            onPress={() => nav.navigate('UploadProgress')}
          />
        </View>

        {/* Type manually — secondary */}
        <Pressable
          onPress={() => nav.navigate('ClassifyConfirm')}
          accessibilityRole="button"
          accessibilityLabel="Type manually"
          style={({ pressed }) => [
            styles.manual,
            { backgroundColor: t.colors.surfaceMuted, borderColor: t.colors.borderStrong, borderRadius: t.radius.xl, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <PenLine size={18} color={t.colors.primary} strokeWidth={2.2} />
          <AppText variant="secondary" style={{ flex: 1, fontFamily: t.fonts.bodySemibold }}>
            Type manually
          </AppText>
          <ChevronRight size={18} color={t.colors.textMuted} strokeWidth={2.2} />
        </Pressable>

        {/* Reassurance */}
        <View style={styles.reassure}>
          <Lock size={13} color={t.colors.textMuted} strokeWidth={2.4} />
          <AppText variant="secondary" color={t.colors.textMuted} style={styles.center}>
            Arrives encrypted · the share sheet lands here too
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  upper: { textTransform: 'uppercase' },
  center: { textAlign: 'center' },
  // Dropper
  dropZone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    gap: 6,
  },
  dropIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  chipIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Hero
  hero: {
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
  },
  heroWatermark: {
    position: 'absolute',
    top: -20,
    right: -24,
  },
  heroIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  smallWrap: {
    flex: 1,
  },
  smallContent: {
    gap: 12,
    minHeight: 132,
    justifyContent: 'space-between',
  },
  manual: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  reassure: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
});
