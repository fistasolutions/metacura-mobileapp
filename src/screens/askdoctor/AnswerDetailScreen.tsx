// Screen 22 · Answer detail expanded — companion to the Source sheet (18).
// see specs/askdoctor.md. Reached from a source pill: the original document
// opens to the exact cited line, highlighted, with surrounding context. Instant,
// no spinner. The product's whole trust claim is that this feels immediate.
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { AppText, Badge, Sheet } from '../../components';
import { MOCK_SOURCE_DOCUMENTS } from '../../data';

const ANSWER_CONTEXT =
  'Your LDL cholesterol is high at 142 mg/dL, above the healthy range of under 100. This is the original line that produced that answer.';

const CITED_LINE = 4;

export default function AnswerDetailScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  const doc = MOCK_SOURCE_DOCUMENTS.cmp;

  return (
    <Sheet
      eyebrow="Linked to the original"
      title={doc.fileName}
      onClose={() => nav.goBack()}
    >
      {/* Answer context */}
      <View style={{ gap: t.spacing[2] }}>
        <AppText variant="body" color={t.colors.text}>
          {ANSWER_CONTEXT}
        </AppText>
        <Badge variant="success" label="Linked" />
      </View>

      {/* Original document lines */}
      <View
        style={{
          backgroundColor: t.colors.surfaceMuted,
          borderColor: t.colors.border,
          borderWidth: 1,
          borderRadius: t.radius.xl,
          overflow: 'hidden',
        }}
      >
        {doc.lines.map(line => {
          const cited = line.n === CITED_LINE;
          return (
            <View
              key={line.n}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: t.spacing[3],
                paddingHorizontal: t.spacing[4],
                paddingVertical: t.spacing[2],
                backgroundColor: cited ? t.colors.normalBg : 'transparent',
                borderLeftWidth: cited ? 3 : 0,
                borderLeftColor: cited ? t.colors.primary : 'transparent',
              }}
            >
              <AppText
                variant="mono"
                color={t.colors.textMuted}
                style={{ fontSize: t.fontSize.xs, width: 22, textAlign: 'right' }}
              >
                {line.n}
              </AppText>
              <AppText
                variant="mono"
                color={cited ? t.colors.primaryStrong : t.colors.text}
                style={{
                  flex: 1,
                  fontSize: t.fontSize.sm,
                  fontFamily:
                    line.kind === 'title' || line.kind === 'section'
                      ? t.fonts.bodySemibold
                      : t.fonts.mono,
                }}
              >
                {line.text}
              </AppText>
            </View>
          );
        })}
      </View>

      <AppText variant="secondary" color={t.colors.textMuted}>
        The highlighted line is the exact source for this answer, drawn only from
        your record.
      </AppText>
    </Sheet>
  );
}
