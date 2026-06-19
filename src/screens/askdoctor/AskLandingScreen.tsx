// Screen 20 · Ask landing — persistent conversation view — see specs/askdoctor.md
// A modern chat surface: a slim header, a centered empty state with suggestion
// chips, light assistant bubbles (small sparkle avatar + source chips), a teal
// user bubble, and a pinned composer. Voice is a peer to text.
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CalendarCheck,
  HeartPulse,
  Link2,
  Mic,
  ScanLine,
  Send,
  Sparkles,
  TrendingUp,
  Volume2,
} from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { AppText, Badge, Input } from '../../components';
import { SUGGESTED_PROMPTS, MOCK_RECORDS } from '../../data';

// One distinct accent icon per suggestion card.
const SUGGEST_ICONS: LucideIcon[] = [HeartPulse, TrendingUp, CalendarCheck, ScanLine];

type SourcePill = { label: string; answerId: string };
type Message = { id: string; role: 'user' | 'assistant'; text: string; sources?: SourcePill[] };

const CANNED_ANSWER =
  'Your LDL is high at 142 mg/dL (healthy is under 100), and total cholesterol is up at 214. Everything else in this panel reads normal for you.';
const CANNED_SOURCES: SourcePill[] = [{ label: 'CMP_Bloodwork.pdf · line 4', answerId: 'a1' }];

function Medallion({ icon: Icon, size = 30 }: { icon: LucideIcon; size?: number }) {
  const t = useTheme();
  return (
    <LinearGradient
      colors={[t.colors.gradientStart, t.colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size / 3, alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon size={size * 0.54} color={t.palette.white} strokeWidth={2.3} />
    </LinearGradient>
  );
}

export default function AskLandingScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const scrollRef = useRef<ScrollView>(null);

  const recordId: string | undefined = route.params?.recordId;
  const contextRecord = recordId ? MOCK_RECORDS.find(r => r.id === recordId) : undefined;

  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const hasAsked = messages.length > 0;

  const scrollToEnd = () =>
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    const stamp = `${messages.length}`;
    setMessages(prev => [
      ...prev,
      { id: `u${stamp}`, role: 'user', text: q },
      { id: `a${stamp}`, role: 'assistant', text: CANNED_ANSWER, sources: CANNED_SOURCES },
    ]);
    setDraft('');
    scrollToEnd();
  };

  const openSource = (answerId: string) => nav.navigate('AnswerDetail', { answerId });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }} edges={['top']}>
      <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Slim header */}
        <View style={[styles.header, { borderBottomColor: t.colors.border }]}>
          <Medallion icon={Sparkles} size={36} />
          <View style={styles.flex1}>
            <AppText variant="cardTitle" color={t.colors.text}>
              Ask Doctor
            </AppText>
            <AppText variant="secondary" color={t.colors.textMuted}>
              Answers from your records, linked
            </AppText>
          </View>
        </View>

        {hasAsked ? (
          /* ── Conversation thread ─────────────────────────────────── */
          <ScrollView
            ref={scrollRef}
            style={styles.flex1}
            contentContainerStyle={styles.thread}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToEnd}
          >
            {messages.map(m =>
              m.role === 'user' ? (
                <View key={m.id} style={[styles.userBubble, { backgroundColor: t.colors.primary, borderRadius: t.radius['2xl'], borderBottomRightRadius: t.radius.sm }]}>
                  <AppText variant="body" color={t.colors.textInverse}>
                    {m.text}
                  </AppText>
                </View>
              ) : (
                <View key={m.id} style={styles.assistantRow}>
                  <Medallion icon={Sparkles} size={28} />
                  <View style={styles.assistantCol}>
                    <View style={[styles.assistantBubble, { backgroundColor: t.colors.surfaceMuted, borderColor: t.colors.border, borderRadius: t.radius['2xl'], borderTopLeftRadius: t.radius.sm }]}>
                      <AppText variant="body" color={t.colors.text}>
                        {m.text}
                      </AppText>
                    </View>

                    {m.sources?.length ? (
                      <View style={styles.sourceRow}>
                        {m.sources.map((s, i) => (
                          <Pressable
                            key={i}
                            onPress={() => openSource(s.answerId)}
                            accessibilityRole="button"
                            accessibilityLabel={`Source: ${s.label}`}
                            style={({ pressed }) => [styles.sourceChip, { backgroundColor: t.colors.surface, borderColor: t.colors.borderStrong, borderRadius: t.radius.pill, opacity: pressed ? 0.6 : 1 }]}
                          >
                            <Link2 size={12} color={t.colors.primary} strokeWidth={2.4} />
                            <AppText variant="eyebrow" color={t.colors.primary}>
                              {s.label}
                            </AppText>
                          </Pressable>
                        ))}
                      </View>
                    ) : null}

                    <Pressable
                      onPress={() => {}}
                      accessibilityRole="button"
                      accessibilityLabel="Play answer"
                      hitSlop={8}
                      style={({ pressed }) => [styles.play, { opacity: pressed ? 0.5 : 1 }]}
                    >
                      <Volume2 size={15} color={t.colors.textMuted} strokeWidth={2.2} />
                      <AppText variant="secondary" color={t.colors.textMuted}>
                        Play
                      </AppText>
                    </Pressable>
                  </View>
                </View>
              ),
            )}
          </ScrollView>
        ) : (
          /* ── Empty state ─────────────────────────────────────────── */
          <ScrollView
            style={styles.flex1}
            contentContainerStyle={styles.emptyWrap}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Medallion icon={Sparkles} size={56} />
            <View style={styles.emptyHead}>
              <AppText variant="h2" color={t.colors.text} style={styles.center}>
                Ask anything about your records
              </AppText>
              <AppText variant="body" color={t.colors.textMuted} style={styles.center}>
                Answers come only from what you've uploaded, every claim linked to its source.
              </AppText>
            </View>

            <View style={styles.suggestGrid}>
              {SUGGESTED_PROMPTS.map((p, i) => {
                const Icon = SUGGEST_ICONS[i % SUGGEST_ICONS.length];
                return (
                  <Pressable
                    key={i}
                    onPress={() => ask(p.text)}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.suggestCard, { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderRadius: t.radius.xl, opacity: pressed ? 0.85 : 1 }, t.shadows.sm]}
                  >
                    <View style={[styles.suggestIcon, { backgroundColor: t.colors.surfaceMuted, borderRadius: t.radius.lg }]}>
                      <Icon size={18} color={t.colors.primary} strokeWidth={2.3} />
                    </View>
                    <AppText variant="secondary" color={t.colors.text} style={{ fontFamily: t.fonts.bodySemibold }}>
                      {p.text}
                    </AppText>
                    <AppText variant="secondary" color={t.colors.textMuted}>
                      {p.hint}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        )}

        {/* Quick prompts (during conversation) */}
        {hasAsked ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.chipScroll}
            contentContainerStyle={styles.chipRow}
          >
            {SUGGESTED_PROMPTS.map((p, i) => (
              <Pressable
                key={i}
                onPress={() => ask(p.text)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.quickChip, { backgroundColor: t.colors.surfaceMuted, borderColor: t.colors.borderStrong, borderRadius: t.radius.pill, opacity: pressed ? 0.7 : 1 }]}
              >
                <AppText variant="secondary" color={t.colors.text} style={{ fontFamily: t.fonts.bodySemibold }}>
                  {p.text}
                </AppText>
              </Pressable>
            ))}
          </ScrollView>
        ) : null}

        {contextRecord ? (
          <View style={styles.contextRow}>
            <Badge variant="outline" label={`Asking about: ${contextRecord.title}`} />
          </View>
        ) : null}

        {/* Composer */}
        <View style={[styles.composer, { borderTopColor: t.colors.border, backgroundColor: t.colors.background }]}>
          <Input
            value={draft}
            onChangeText={setDraft}
            placeholder="Ask about your records…"
            returnKeyType="send"
            onSubmitEditing={() => ask(draft)}
            containerStyle={styles.flex1}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voice query"
            onPress={() => nav.navigate('VoiceQuery')}
            style={[styles.iconBtn, { backgroundColor: t.colors.surfaceMuted, borderColor: t.colors.borderStrong }]}
          >
            <Mic size={20} color={t.colors.primary} strokeWidth={2.2} />
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Send" onPress={() => ask(draft)} style={t.shadows.button}>
            <LinearGradient
              colors={[t.colors.gradientStart, t.colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sendBtn}
            >
              <Send size={20} color={t.colors.textInverse} strokeWidth={2.2} />
            </LinearGradient>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  center: { textAlign: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  // Thread
  thread: {
    padding: 20,
    gap: 18,
  },
  userBubble: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  assistantRow: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'stretch',
  },
  assistantCol: {
    flex: 1,
    gap: 8,
  },
  assistantBubble: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  sourceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  sourceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  play: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  // Empty state
  emptyWrap: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
    gap: 18,
  },
  emptyHead: {
    alignItems: 'center',
    gap: 8,
  },
  suggestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    gap: 10,
    marginTop: 4,
  },
  suggestCard: {
    width: '47%',
    flexGrow: 1,
    minHeight: 118,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  suggestIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Quick chips
  chipScroll: {
    flexGrow: 0,
  },
  chipRow: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  quickChip: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  contextRow: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  // Composer
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
