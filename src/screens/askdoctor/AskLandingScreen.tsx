// Screen 20 · Ask landing — persistent conversation view — see specs/askdoctor.md
// A scrollable thread with a pinned composer. Every answer is linked to its
// source: tap a source pill to open the original document to the exact line.
// Voice is a peer to text: the Mic opens full-screen voice capture.
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Mic, Send, Sparkles, Volume2 } from 'lucide-react-native';
import { useTheme } from '../../theme';
import {
  AppText,
  Badge,
  Card,
  IconCircle,
  Input,
  SectionEyebrow,
} from '../../components';
import { SUGGESTED_PROMPTS, MOCK_RECORDS } from '../../data';

type SourcePill = { label: string; answerId: string };
type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: SourcePill[];
};

const WELCOME =
  'Ask me anything about your records. I only answer from what you have uploaded, and every answer is linked to its source.';

const CANNED_ANSWER =
  'Your LDL cholesterol is high at 142 mg/dL, above the healthy range of under 100. Your total cholesterol is also elevated at 214. Everything else in this panel reads normal for you.';

const CANNED_SOURCES: SourcePill[] = [
  { label: 'Linked · CMP_Bloodwork.pdf · row 4', answerId: 'a1' },
];

export default function AskLandingScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const scrollRef = useRef<ScrollView>(null);

  const recordId: string | undefined = route.params?.recordId;
  const contextRecord = recordId
    ? MOCK_RECORDS.find(r => r.id === recordId)
    : undefined;

  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: WELCOME },
  ]);
  const [draft, setDraft] = useState('');

  const scrollToEnd = () => {
    requestAnimationFrame(() =>
      scrollRef.current?.scrollToEnd({ animated: true }),
    );
  };

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    const stamp = Date.now();
    const userMsg: Message = { id: `u${stamp}`, role: 'user', text: q };
    const answerMsg: Message = {
      id: `a${stamp}`,
      role: 'assistant',
      text: CANNED_ANSWER,
      sources: CANNED_SOURCES,
    };
    setMessages(prev => [...prev, userMsg, answerMsg]);
    setDraft('');
    scrollToEnd();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.colors.background }}
      edges={['top']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: t.spacing[5],
            paddingTop: t.spacing[4],
            gap: t.spacing[3],
          }}
        >
          <SectionEyebrow label="Ask Doctor" />
          <AppText variant="h1">Ask anything about your record</AppText>
        </View>

        {/* Thread */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: t.spacing[5],
            gap: t.spacing[4],
            paddingBottom: t.spacing[5],
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
        >
          {messages.map(m =>
            m.role === 'user' ? (
              <View
                key={m.id}
                style={{
                  alignSelf: 'flex-end',
                  maxWidth: '85%',
                  backgroundColor: t.colors.text,
                  borderRadius: t.radius['2xl'],
                  borderBottomRightRadius: t.radius.sm,
                  paddingHorizontal: t.spacing[4],
                  paddingVertical: t.spacing[3],
                }}
              >
                <AppText variant="body" color={t.colors.textInverse}>
                  {m.text}
                </AppText>
              </View>
            ) : (
              <Card
                key={m.id}
                style={{
                  alignSelf: 'stretch',
                  padding: t.spacing[5],
                }}
              >
                <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
                  <IconCircle icon={Sparkles} size={32} tone="teal" />
                  <View style={{ flex: 1, gap: t.spacing[3] }}>
                    <AppText variant="body">{m.text}</AppText>

                    {m.sources?.length ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: t.spacing[2],
                        }}
                      >
                        {m.sources.map((s, i) => (
                          <Badge
                            key={i}
                            variant="source"
                            label={s.label}
                            onPress={() =>
                              nav.navigate('AnswerDetail', {
                                answerId: s.answerId,
                              })
                            }
                          />
                        ))}
                      </View>
                    ) : null}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: t.spacing[4],
                        marginTop: t.spacing[1],
                      }}
                    >
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Play"
                        onPress={() => {}}
                        hitSlop={8}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: t.spacing[1],
                        }}
                      >
                        <Volume2
                          size={16}
                          color={t.colors.textMuted}
                          strokeWidth={2.2}
                        />
                        <AppText variant="secondary" color={t.colors.textMuted}>
                          Play
                        </AppText>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Card>
            ),
          )}
        </ScrollView>

        {/* Suggested prompts */}
        <View
          style={{
            paddingHorizontal: t.spacing[5],
            paddingBottom: t.spacing[2],
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              gap: t.spacing[2],
              paddingVertical: t.spacing[1],
            }}
          >
            {SUGGESTED_PROMPTS.map((p, i) => (
              <Pressable
                key={i}
                accessibilityRole="button"
                onPress={() => ask(p.text)}
                style={{
                  backgroundColor: t.colors.surfaceMuted,
                  borderColor: t.colors.borderStrong,
                  borderWidth: 1,
                  borderRadius: t.radius.lg,
                  paddingHorizontal: t.spacing[3],
                  paddingVertical: t.spacing[2],
                  gap: 2,
                  maxWidth: 230,
                }}
              >
                <AppText
                  variant="secondary"
                  color={t.colors.text}
                  style={{ fontFamily: t.fonts.bodySemibold }}
                >
                  {p.text}
                </AppText>
                <AppText
                  variant="secondary"
                  color={t.colors.textMuted}
                  style={{ fontSize: t.fontSize.xs }}
                >
                  {p.hint}
                </AppText>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Context chip */}
        {contextRecord ? (
          <View
            style={{
              paddingHorizontal: t.spacing[5],
              paddingBottom: t.spacing[2],
            }}
          >
            <Badge
              variant="outline"
              label={`Asking about: ${contextRecord.title}`}
            />
          </View>
        ) : null}

        {/* Composer */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: t.spacing[2],
            paddingHorizontal: t.spacing[5],
            paddingTop: t.spacing[2],
            paddingBottom: t.spacing[4],
            borderTopWidth: 1,
            borderTopColor: t.colors.border,
            backgroundColor: t.colors.background,
          }}
        >
          <Input
            value={draft}
            onChangeText={setDraft}
            placeholder="Ask about your records…"
            returnKeyType="send"
            onSubmitEditing={() => ask(draft)}
            containerStyle={{ flex: 1 }}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voice query"
            onPress={() => nav.navigate('VoiceQuery')}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: t.colors.surfaceMuted,
              borderWidth: 1,
              borderColor: t.colors.borderStrong,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mic size={20} color={t.colors.primary} strokeWidth={2.2} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send"
            onPress={() => ask(draft)}
            style={t.shadows.button}
          >
            <LinearGradient
              colors={[t.colors.gradientStart, t.colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={20} color={t.colors.textInverse} strokeWidth={2.2} />
            </LinearGradient>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
