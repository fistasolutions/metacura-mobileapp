// Screen 18 · Source sheet — THE SIGNATURE INTERACTION — see specs/sourcesheet.md
// A modal: the original document opens scrolled to the exact line that produced
// the answer, with that line highlighted. The product's entire trust claim
// depends on this feeling instant (no spinner).
import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Maximize2 } from 'lucide-react-native';
import { Sheet, AppText, Badge } from '../../components';
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

  const renderLine = (line: SourceLine) => {
    const isHighlighted = line.n === highlightedLine;

    let body: React.ReactNode;
    switch (line.kind) {
      case 'title':
        body = <AppText variant="h2">{line.text}</AppText>;
        break;
      case 'section':
        body = (
          <AppText
            variant="eyebrow"
            color={t.colors.textMuted}
            style={{ textTransform: 'uppercase' }}
          >
            {line.text}
          </AppText>
        );
        break;
      case 'meta':
        body = (
          <AppText variant="secondary" color={t.colors.textMuted}>
            {line.text}
          </AppText>
        );
        break;
      case 'value':
        body = (
          <AppText variant="body" style={{ fontFamily: t.fonts.mono }}>
            {line.text}
          </AppText>
        );
        break;
      default:
        body = <AppText variant="body">{line.text}</AppText>;
    }

    if (isHighlighted) {
      return (
        <View
          key={line.n}
          onLayout={e => {
            highlightY.current = e.nativeEvent.layout.y;
          }}
          style={{
            backgroundColor: t.colors.normalBg,
            borderLeftWidth: 3,
            borderLeftColor: t.colors.primary,
            borderRadius: t.radius.sm,
            paddingVertical: t.spacing[2],
            paddingHorizontal: t.spacing[3],
            gap: t.spacing[2],
          }}
        >
          {body}
          <Badge variant="source" label="Linked" />
        </View>
      );
    }

    return (
      <View key={line.n} style={{ paddingHorizontal: t.spacing[3] }}>
        {body}
      </View>
    );
  };

  return (
    <Sheet
      eyebrow="Linked to the original"
      title={doc.fileName}
      onClose={() => nav.goBack()}
      scroll={false}
    >
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
    </Sheet>
  );
}
