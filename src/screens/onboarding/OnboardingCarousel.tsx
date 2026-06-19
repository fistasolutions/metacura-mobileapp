/**
 * Screen 02 · Welcome carousel — four short intro slides over a soft teal
 * ambient field, ending in the three entry actions (Sign Up, Log In, Try Lab
 * Demo). Each slide pairs a floating-card illustration with a white sheet
 * anchored low: a teal eyebrow, an Outfit headline whose trailing word is the
 * teal accent, a one-line value statement, page dots, and the action area.
 *
 * The first slide sets the design baseline; the others share the identical
 * layout, spacing, colors, and component language (theme tokens only, no new
 * hues). Adapted to MetaCura's teal/health brand. See specs/onboarding.md.
 */
import React, { useCallback, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  Activity,
  Brain,
  Camera,
  Check,
  Droplet,
  FileText,
  HeartPulse,
  Link2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingDown,
  Upload,
} from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { AppText, Button, StatusPill } from '../../components';

type Slide = {
  key: string;
  eyebrow: string;
  title: string;
  accent: string; // trailing word rendered in the teal accent
  subtitle: string;
  Illustration: React.ComponentType;
};

/* ── Shared illustration helpers ──────────────────────────────────────── */

// A small white badge carrying a teal brand mark, the floating logo chips that
// sit over the illustration in every slide.
function BrandBadge({
  icon: Icon,
  style,
}: {
  icon: LucideIcon;
  style?: object;
}) {
  const t = useTheme();
  return (
    <View
      pointerEvents="none"
      style={[
        styles.badge,
        { backgroundColor: t.colors.surface, borderRadius: t.radius.lg },
        t.shadows.glass,
        style,
      ]}
    >
      <Icon size={24} color={t.colors.primary} strokeWidth={2.4} />
    </View>
  );
}

// A floating white mini-card, optionally rotated, used to compose each scene.
function FloatCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  const t = useTheme();
  return (
    <View
      pointerEvents="none"
      style={[
        styles.floatCard,
        {
          backgroundColor: t.colors.surface,
          borderColor: t.colors.border,
          borderRadius: t.radius.xl,
        },
        t.shadows.lg,
        style,
      ]}
    >
      {children}
    </View>
  );
}

function CardEyebrow({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
      {children}
    </AppText>
  );
}

function SourcePill({ label }: { label: string }) {
  const t = useTheme();
  return (
    <View style={[styles.sourcePill, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.pill }]}>
      <Link2 size={12} color={t.colors.primary} strokeWidth={2.4} />
      <AppText variant="eyebrow" color={t.colors.primary}>
        {label}
      </AppText>
    </View>
  );
}

// A small gradient medallion carrying a white icon, the on-brand accent mark
// for card headers.
function Medallion({ icon: Icon, size = 30 }: { icon: LucideIcon; size?: number }) {
  const t = useTheme();
  return (
    <LinearGradient
      colors={[t.colors.gradientStart, t.colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size / 3, alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon size={size * 0.54} color={t.palette.white} strokeWidth={2.4} />
    </LinearGradient>
  );
}

// A slim teal range gauge with a marker dot showing where a value sits.
function RangeGauge({ pct }: { pct: number }) {
  const t = useTheme();
  return (
    <View style={styles.gaugeWrap}>
      <LinearGradient
        colors={[t.colors.gradientStart, t.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gaugeTrack}
      />
      <View
        style={[
          styles.gaugeMarker,
          { left: `${pct * 100}%`, borderColor: t.colors.primary, backgroundColor: t.colors.surface },
          t.shadows.sm,
        ]}
      />
    </View>
  );
}

/* ── Centered illustration stage ──────────────────────────────────────── */

// Centers a fixed-size illustration field in the available space and lays a
// soft teal glow behind it, so every scene reads as one balanced, centered
// composition instead of clustering at the top.
function Stage({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={styles.scene}>
      <View style={styles.stage}>
        <View
          pointerEvents="none"
          style={[styles.stageGlow, { backgroundColor: t.colors.accentSoft }]}
        />
        {children}
      </View>
    </View>
  );
}

/* ── Slide 1 · Upload any document ────────────────────────────────────── */

function UploadScene() {
  const t = useTheme();
  return (
    <Stage>
      <FloatCard style={[styles.posUploadDrop, { transform: [{ rotate: '-2deg' }] }]}>
        <View
          style={[
            styles.dropZone,
            { borderColor: t.colors.borderStrong, backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.lg },
          ]}
        >
          <View style={styles.uploadChip}>
            <LinearGradient
              colors={[t.colors.gradientStart, t.colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.uploadChipFill, t.shadows.button]}
            >
              <Upload size={22} color={t.palette.white} strokeWidth={2.4} />
            </LinearGradient>
          </View>
          <AppText
            variant="secondary"
            color={t.colors.text}
            style={[styles.center, { fontFamily: t.fonts.bodySemibold }]}
          >
            Drop a file, or take a photo
          </AppText>
          <AppText variant="eyebrow" color={t.colors.textMuted} style={[styles.center, styles.upper]}>
            PDF · JPG · PNG · up to 25 MB
          </AppText>
        </View>
      </FloatCard>

      <FloatCard style={[styles.posUploadFile, { transform: [{ rotate: '2deg' }] }]}>
        <View style={styles.fileRow}>
          <View style={[styles.fileIcon, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.md }]}>
            <FileText size={18} color={t.colors.primary} strokeWidth={2.2} />
          </View>
          <View style={styles.flex1}>
            <AppText variant="secondary" color={t.colors.text} style={{ fontFamily: t.fonts.bodySemibold }}>
              Lab_Report.pdf
            </AppText>
            <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
              Uploaded
            </AppText>
          </View>
          <View style={[styles.checkBadge, { backgroundColor: t.colors.primary }]}>
            <Check size={13} color={t.palette.white} strokeWidth={3} />
          </View>
        </View>
        <View style={[styles.fileTrack, { backgroundColor: t.colors.border, borderRadius: t.radius.pill }]}>
          <View style={[styles.fileFill, { backgroundColor: t.colors.primary, borderRadius: t.radius.pill }]} />
        </View>
      </FloatCard>

      <BrandBadge icon={Camera} style={styles.posBadgeTR} />
      <BrandBadge icon={Activity} style={styles.posBadgeBL} />
    </Stage>
  );
}

/* ── Slide 2 · Understand it in plain English ─────────────────────────── */

function UnderstandScene() {
  const t = useTheme();
  return (
    <Stage>
      <FloatCard style={[styles.posUnderstandTop, { transform: [{ rotate: '-1.5deg' }] }]}>
        <View style={styles.cardHeadRow}>
          <View style={styles.headLeft}>
            <Medallion icon={Droplet} size={30} />
            <AppText variant="secondary" color={t.colors.text} style={{ fontFamily: t.fonts.bodySemibold }}>
              Hemoglobin A1c
            </AppText>
          </View>
          <StatusPill status="normal" />
        </View>

        <View style={styles.valueRow}>
          <AppText style={[styles.valueBig, { color: t.colors.text, fontFamily: t.fonts.headingBold }]}>
            5.4
          </AppText>
          <AppText style={[styles.valuePct, { color: t.colors.textMuted, fontFamily: t.fonts.headingSemibold }]}>
            %
          </AppText>
          <View style={styles.flex1} />
          <View style={[styles.deltaChip, { backgroundColor: t.colors.normalBg }]}>
            <TrendingDown size={12} color={t.colors.normal} strokeWidth={2.6} />
            <AppText variant="eyebrow" color={t.colors.normal}>
              0.2
            </AppText>
          </View>
        </View>

        <RangeGauge pct={0.47} />
        <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
          Healthy below 5.7%
        </AppText>
      </FloatCard>

      <FloatCard style={[styles.posUnderstandBottom, { transform: [{ rotate: '2deg' }] }]}>
        <View style={styles.headLeft}>
          <Medallion icon={Sparkles} size={28} />
          <CardEyebrow>In plain English</CardEyebrow>
        </View>
        <AppText variant="secondary" color={t.colors.textMuted}>
          Your blood sugar control is healthy, and steady against your own past results.
        </AppText>
      </FloatCard>

      <BrandBadge icon={Brain} style={styles.posBadgeTR} />
      <BrandBadge icon={HeartPulse} style={styles.posBadgeBL} />
    </Stage>
  );
}

/* ── Slide 3 · Ask anything about your record ─────────────────────────── */

function AskScene() {
  const t = useTheme();
  return (
    <Stage>
      <FloatCard style={[styles.posAskTop, { transform: [{ rotate: '-2.5deg' }] }]}>
        <View style={styles.headLeft}>
          <Medallion icon={MessageCircle} size={28} />
          <CardEyebrow>You asked</CardEyebrow>
        </View>
        <AppText variant="bodyLg" color={t.colors.text} style={{ fontFamily: t.fonts.headingSemibold }}>
          Is my cholesterol improving?
        </AppText>
      </FloatCard>

      <FloatCard style={[styles.posAskBottom, { transform: [{ rotate: '2deg' }] }]}>
        <View style={styles.cardHeadRow}>
          <View style={styles.headLeft}>
            <Medallion icon={Sparkles} size={28} />
            <CardEyebrow>Answer</CardEyebrow>
          </View>
          <SourcePill label="WITH SOURCES" />
        </View>
        <AppText variant="secondary" color={t.colors.textMuted}>
          Down 18% since March, now within your normal range.
        </AppText>
        <View style={styles.cardFooterRow}>
          <View style={[styles.deltaChip, { backgroundColor: t.colors.normalBg }]}>
            <TrendingDown size={12} color={t.colors.normal} strokeWidth={2.6} />
            <AppText variant="eyebrow" color={t.colors.normal}>
              18%
            </AppText>
          </View>
          <StatusPill status="normal" />
        </View>
      </FloatCard>

      <BrandBadge icon={MessageCircle} style={styles.posBadgeTR} />
      <BrandBadge icon={Link2} style={styles.posBadgeBR} />
    </Stage>
  );
}

/* ── Slide 4 · Private by design ──────────────────────────────────────── */

function PrivacyRow({
  icon: Icon,
  label,
  last,
}: {
  icon: LucideIcon;
  label: string;
  last?: boolean;
}) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.privacyRow,
        last ? null : { borderBottomWidth: 1, borderBottomColor: t.colors.border },
      ]}
    >
      <View style={[styles.privacyIcon, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.md }]}>
        <Icon size={18} color={t.colors.primary} strokeWidth={2.2} />
      </View>
      <AppText variant="secondary" color={t.colors.text} style={[styles.flex1, { fontFamily: t.fonts.bodySemibold }]}>
        {label}
      </AppText>
      <Check size={16} color={t.colors.primary} strokeWidth={2.6} />
    </View>
  );
}

function PrivacyScene() {
  const t = useTheme();
  return (
    <Stage>
      <FloatCard style={styles.posPrivacy}>
        <View style={styles.privacyHead}>
          <Medallion icon={ShieldCheck} size={36} />
          <View style={styles.flex1}>
            <AppText variant="cardTitle" color={t.colors.text}>
              Your privacy
            </AppText>
            <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
              Built for trust
            </AppText>
          </View>
        </View>

        <View style={styles.privacyList}>
          <PrivacyRow icon={ShieldCheck} label="HIPAA-compliant" />
          <PrivacyRow icon={Lock} label="End-to-end encrypted" />
          <PrivacyRow icon={Brain} label="Never trained on" />
          <PrivacyRow icon={Trash2} label="One-tap delete" last />
        </View>
      </FloatCard>

      <BrandBadge icon={Lock} style={styles.posBadgeTR} />
      <BrandBadge icon={Activity} style={styles.posBadgeBR} />
    </Stage>
  );
}

const SLIDES: Slide[] = [
  {
    key: 'upload',
    eyebrow: 'Upload',
    title: 'Upload Any',
    accent: 'Document',
    subtitle: 'Snap a photo or import a PDF. Lab reports, prescriptions, scans, discharge notes.',
    Illustration: UploadScene,
  },
  {
    key: 'understand',
    eyebrow: 'Understand',
    title: 'Read it in Plain',
    accent: 'English',
    subtitle: 'Every result explained simply, against your own history, not generic ranges.',
    Illustration: UnderstandScene,
  },
  {
    key: 'ask',
    eyebrow: 'Ask Doctor',
    title: 'Ask Anything About Your',
    accent: 'Record',
    subtitle: 'Clear answers, every claim linked to where it came from.',
    Illustration: AskScene,
  },
  {
    key: 'privacy',
    eyebrow: 'Private by design',
    title: 'Yours Alone,',
    accent: 'Always',
    subtitle: 'Your records stay encrypted and entirely under your control.',
    Illustration: PrivacyScene,
  },
];

/* ── Carousel ─────────────────────────────────────────────────────────── */

function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  const t = useTheme();
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => {
        const on = i === active;
        return (
          <Pressable
            key={i}
            onPress={() => onSelect(i)}
            accessibilityRole="button"
            accessibilityLabel={`Go to slide ${i + 1}`}
            hitSlop={10}
          >
            <View
              style={{
                width: on ? 22 : 7,
                height: 7,
                borderRadius: t.radius.pill,
                backgroundColor: on ? t.colors.primary : t.colors.border,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function OnboardingCarousel() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const lastIndex = SLIDES.length - 1;
  const isLast = index === lastIndex;

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const i = Math.round(e.nativeEvent.contentOffset.x / width);
      if (i !== index) setIndex(i);
    },
    [index, width],
  );

  const goNext = useCallback(() => {
    scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
  }, [index, width]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      scrollRef.current?.scrollTo({ x: width * i, animated: true });
    },
    [width],
  );

  const skipToEnd = useCallback(() => {
    scrollRef.current?.scrollTo({ x: width * lastIndex, animated: true });
  }, [width, lastIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.background }}>
      {/* Soft teal ambient field rising from the top behind the cards. */}
      <LinearGradient
        colors={[t.colors.surfaceMuted, t.colors.background]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.flex1} edges={['top', 'bottom']}>
        {/* Skip to the entry actions. */}
        <View style={styles.topBar}>
          {!isLast ? (
            <Pressable
              onPress={skipToEnd}
              accessibilityRole="button"
              accessibilityLabel="Skip to sign in"
              hitSlop={12}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <AppText variant="secondary" color={t.colors.textMuted} style={{ fontFamily: t.fonts.bodySemibold }}>
                Skip
              </AppText>
            </Pressable>
          ) : null}
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          scrollEventThrottle={16}
        >
          {SLIDES.map(({ key, Illustration }) => (
            <View key={key} style={{ width }}>
              <Illustration />
            </View>
          ))}
        </ScrollView>

        {/* Bottom sheet — copy + dots + action area (shared chrome). */}
        <View style={styles.sheet}>
          <Dots count={SLIDES.length} active={index} onSelect={goTo} />

          <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
            {SLIDES[index].eyebrow}
          </AppText>

          <AppText style={[styles.headline, { color: t.colors.text, fontFamily: t.fonts.headingBold }]}>
            {SLIDES[index].title}{' '}
            <AppText style={[styles.headline, { color: t.colors.primary, fontFamily: t.fonts.headingBold }]}>
              {SLIDES[index].accent}
            </AppText>
          </AppText>

          <AppText variant="body" color={t.colors.textMuted}>
            {SLIDES[index].subtitle}
          </AppText>

          {isLast ? (
            <View style={styles.actions}>
              <Button label="Sign Up" size="lg" onPress={() => nav.navigate('SignUp')} />
              <Button
                label="Log In"
                variant="outline"
                size="lg"
                onPress={() => nav.navigate('Login')}
              />
              <Pressable
                onPress={() => nav.navigate('DemoIntro')}
                accessibilityRole="button"
                hitSlop={8}
                style={({ pressed }) => [styles.demoLink, { opacity: pressed ? 0.6 : 1 }]}
              >
                <AppText variant="secondary" color={t.colors.textMuted} style={{ fontFamily: t.fonts.bodySemibold }}>
                  Try the lab demo
                </AppText>
              </Pressable>
            </View>
          ) : (
            <Button label="Continue" size="lg" onPress={goNext} style={styles.mt2} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  center: { textAlign: 'center' },
  upper: { textTransform: 'uppercase' },
  mt2: { marginTop: 8 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minHeight: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  // Fixed-size, centered illustration field. Cards are positioned within it.
  stage: {
    width: '100%',
    maxWidth: 400,
    height: 320,
    alignSelf: 'center',
  },
  stageGlow: {
    position: 'absolute',
    top: 24,
    left: '50%',
    width: 280,
    height: 280,
    borderRadius: 140,
    transform: [{ translateX: -140 }],
    opacity: 0.16,
  },
  floatCard: {
    position: 'absolute',
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  badge: {
    position: 'absolute',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Slide-specific float-card positions (within the 320px-tall stage).
  posUploadDrop: { top: 16, left: 8, right: 8 },
  posUploadFile: { top: 206, left: 24, right: 16 },
  posUnderstandTop: { top: 14, left: 14, right: 10 },
  posUnderstandBottom: { top: 200, left: 6, right: 20 },
  posAskTop: { top: 24, left: 18, right: 8 },
  posAskBottom: { top: 168, left: 6, right: 22 },
  posPrivacy: { top: 16, left: 10, right: 10, gap: 12 },
  // Badge positions.
  posBadgeTR: { top: -8, right: 0 },
  posBadgeBL: { top: 252, left: 0 },
  posBadgeTL: { top: -6, left: 2 },
  posBadgeBR: { top: 262, right: 2 },
  // Upload scene.
  dropZone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 10,
  },
  uploadChip: {
    width: 48,
    height: 48,
  },
  uploadChipFill: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileTrack: {
    height: 5,
    width: '100%',
    overflow: 'hidden',
  },
  fileFill: {
    height: 5,
    width: '100%',
  },
  // Cards.
  cardHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  sourcePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  // Understand scene — metric card.
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  valueBig: {
    fontSize: 34,
    letterSpacing: -0.5,
  },
  valuePct: {
    fontSize: 18,
  },
  deltaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  gaugeWrap: {
    height: 14,
    justifyContent: 'center',
    marginTop: 4,
  },
  gaugeTrack: {
    height: 6,
    width: '100%',
    borderRadius: 3,
  },
  gaugeMarker: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    marginLeft: -7,
    top: 0,
  },
  // Privacy scene.
  privacyHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 2,
  },
  privacyList: {
    marginTop: 2,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
  },
  privacyIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sheet.
  sheet: {
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 20,
    gap: 12,
  },
  headline: {
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  actions: {
    gap: 10,
    marginTop: 6,
  },
  demoLink: {
    alignSelf: 'center',
    paddingVertical: 6,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
});
