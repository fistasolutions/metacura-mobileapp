// Screen 18 · Source sheet — THE SIGNATURE INTERACTION — see specs/sourcesheet.md
// A modal: the original document opens scrolled to the exact line that produced
// the answer, with that line highlighted. The product's entire trust claim
// depends on this feeling instant (no spinner). Tap and hold any line to magnify.
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Maximize2 } from 'lucide-react-native';
import { Sheet, AppText, Badge, StatusPill } from '../../components';
import { useTheme } from '../../theme';
import { MOCK_SOURCE_DOCUMENTS } from '../../data';
import { SourceLine } from '../../data/types';

export default function SourceSheetScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const recordId: string = route.params?.recordId ?? 'cmp';
  const highlightedLine: number = route.params?.line ?? 1;
  const doc = MOCK_SOURCE_DOCUMENTS[recordId] ?? MOCK_SOURCE_DOCUMENTS.cmp;

  const scrollRef = useRef<ScrollView>(null);
  const highlightY = useRef(0);
  const [magnified, setMagnified] = useState<SourceLine | null>(null);

  useEffect(() => {
    // Jump to the highlighted line right after mount. Instant, no spinner.
    const id = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: Math.max(0, highlightY.current - 80),
        animated: false,
      });
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const lineBody = (line: SourceLine) => {
    switch (line.kind) {
      case 'title':
        return <AppText variant="h2">{line.text}</AppText>;
      case 'section':
        return (
          <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
            {line.text}
          </AppText>
        );
      case 'meta':
        return (
          <AppText variant="secondary" color={t.colors.textMuted}>
            {line.text}
          </AppText>
        );
      case 'value':
        return (
          <AppText variant="body" style={{ fontFamily: t.fonts.mono }}>
            {line.text}
          </AppText>
        );
      default:
        return <AppText variant="body">{line.text}</AppText>;
    }
  };

  const renderLine = (line: SourceLine) => {
    const isHighlighted = line.n === highlightedLine;
    return (
      <Pressable
        key={line.n}
        onLongPress={() => setMagnified(line)}
        onPressOut={() => setMagnified(null)}
        delayLongPress={180}
        onLayout={
          isHighlighted
            ? e => {
                highlightY.current = e.nativeEvent.layout.y;
              }
            : undefined
        }
        style={
          isHighlighted
            ? {
                backgroundColor: t.colors.normalBg,
                borderLeftWidth: 3,
                borderLeftColor: t.colors.primary,
                borderRadius: t.radius.sm,
                paddingVertical: t.spacing[2],
                paddingHorizontal: t.spacing[3],
                gap: t.spacing[2],
              }
            : { paddingHorizontal: t.spacing[3] }
        }
      >
        {lineBody(line)}
        {isHighlighted ? <Badge variant="source" label="Linked" /> : null}
      </Pressable>
    );
  };

  return (
    <Sheet
      eyebrow="Linked to the original"
      title={doc.fileName}
      onClose={() => nav.goBack()}
      scroll={false}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: t.spacing[3], paddingBottom: t.spacing[4] }}
          showsVerticalScrollIndicator={false}
        >
          {doc.lines.map(renderLine)}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing[2],
              paddingHorizontal: t.spacing[3],
              marginTop: t.spacing[3],
            }}
          >
            <Maximize2 size={14} color={t.colors.textMuted} strokeWidth={2.2} />
            <AppText variant="secondary" color={t.colors.textMuted}>
              Tap and hold to magnify
            </AppText>
          </View>
        </ScrollView>

        {/* Magnifier — long-press a line to enlarge it. Non-interactive overlay
            so the originating press keeps tracking and clears on release. */}
        {magnified ? (
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.magOverlay]}>
            <View
              style={[
                styles.magCard,
                { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius.xl },
                t.shadows.lg,
              ]}
            >
              <AppText variant="eyebrow" color={t.colors.textMuted} style={styles.upper}>
                Magnified · line {magnified.n}
              </AppText>
              <AppText
                style={{
                  fontFamily: magnified.kind === 'value' ? t.fonts.mono : t.fonts.headingSemibold,
                  fontSize: t.fontSize['2xl'],
                  lineHeight: 34,
                  color: t.colors.text,
                }}
              >
                {magnified.text}
              </AppText>
              {magnified.flag ? <StatusPill status={magnified.flag} /> : null}
            </View>
          </View>
        ) : null}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  upper: { textTransform: 'uppercase' },
  magOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 24,
  },
  magCard: {
    borderWidth: 1,
    padding: 24,
    gap: 12,
    alignItems: 'flex-start',
    maxWidth: 420,
    width: '100%',
  },
});
