/**
 * Screen 15 · Auto-classified confirmation — "Read as: Lab Report,
 * CMP_Apr18.pdf." A result card shows the auto-detected type; a single dropdown
 * (bottom-sheet picker) lets the user correct it across Lab / CT / MRI /
 * Ultrasound / Medication / Voice note / Doctor note / Prescription. Confirm
 * lands the record on the timeline (16). See specs/upload.md.
 */
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Check, ChevronDown, FlaskConical, Sparkles } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Screen, ScreenHeader, AppText, GlassCard, Button } from '../../components';
import { useTheme } from '../../theme';
import { CLASSIFY_OPTIONS } from '../../data';

const FILE_NAME = 'CMP_Apr18.pdf';

export default function ClassifyConfirmScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const [selected, setSelected] = useState('Lab');
  const [open, setOpen] = useState(false);

  return (
    <Screen scroll contentStyle={{ flexGrow: 1, gap: t.spacing[6] }} edges={['top', 'bottom']}>
      <ScreenHeader hideBack eyebrow="Almost done" title="Read as" accent={`${selected}.`} subtitle={FILE_NAME} />

      {/* Result card */}
      <GlassCard contentStyle={{ gap: t.spacing[4] }}>
        <View style={styles.resultRow}>
          <LinearGradient
            colors={[t.colors.gradientStart, t.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.medallion, { borderRadius: t.radius.lg }]}
          >
            <FlaskConical size={26} color={t.palette.white} strokeWidth={2.2} />
          </LinearGradient>
          <View style={{ flex: 1, gap: 2 }}>
            <View style={styles.detectRow}>
              <Sparkles size={13} color={t.colors.primary} strokeWidth={2.4} />
              <AppText variant="eyebrow" color={t.colors.primary} style={styles.upper}>
                Auto-detected
              </AppText>
            </View>
            <AppText variant="cardTitle" color={t.colors.text}>
              {selected}
            </AppText>
            <AppText variant="secondary" color={t.colors.textMuted} numberOfLines={1}>
              {FILE_NAME} · 3 pages
            </AppText>
          </View>
        </View>
      </GlassCard>

      {/* Classification dropdown */}
      <View style={{ gap: t.spacing[3] }}>
        <AppText variant="secondary" color={t.colors.textMuted} style={{ fontFamily: t.fonts.bodySemibold }}>
          Not right? Change the type
        </AppText>
        <Pressable
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Change classification"
          style={({ pressed }) => [
            styles.dropdown,
            { borderColor: open ? t.colors.accent : t.colors.borderStrong, backgroundColor: t.colors.surface, borderRadius: t.radius.xl, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <AppText variant="body" color={t.colors.text} style={{ fontFamily: t.fonts.bodySemibold }}>
            {selected}
          </AppText>
          <ChevronDown size={18} color={t.colors.textMuted} strokeWidth={2.2} />
        </Pressable>
      </View>

      {/* Flexible spacer fills the screen so the actions sit at the foot. */}
      <View style={{ flex: 1, minHeight: t.spacing[6] }} />

      {/* Actions */}
      <View style={{ gap: t.spacing[3] }}>
        <Button label="Confirm, add to timeline" size="lg" onPress={() => nav.navigate('RecordsTimeline')} />
        <Button label="Re-upload" variant="outline" size="lg" onPress={() => nav.goBack()} />
      </View>

      {/* Picker — a bottom sheet whose list scrolls on its own. */}
      <Modal visible={open} transparent animationType="slide" statusBarTranslucent onRequestClose={() => setOpen(false)}>
        <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
          <Pressable
            onPress={() => {}}
            style={[styles.sheet, { backgroundColor: t.colors.surface, borderTopLeftRadius: t.radius.card, borderTopRightRadius: t.radius.card }]}
          >
            <View style={[styles.grabber, { backgroundColor: t.colors.border, borderRadius: t.radius.pill }]} />
            <AppText variant="cardTitle">Classification</AppText>
            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator bounces={false}>
              {CLASSIFY_OPTIONS.map((opt, i) => {
                const active = opt === selected;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => {
                      setSelected(opt);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: t.spacing[4],
                      paddingVertical: t.spacing[4],
                      borderRadius: t.radius.lg,
                      borderTopWidth: i === 0 ? 0 : 1,
                      borderTopColor: t.colors.border,
                      backgroundColor: active ? t.colors.surfaceMuted : 'transparent',
                      opacity: pressed ? 0.6 : 1,
                    })}
                  >
                    <AppText
                      variant="body"
                      color={active ? t.colors.primary : t.colors.text}
                      style={{ fontFamily: active ? t.fonts.bodySemibold : t.fonts.body }}
                    >
                      {opt}
                    </AppText>
                    {active ? <Check size={18} color={t.colors.primary} strokeWidth={2.6} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  upper: { textTransform: 'uppercase' },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  medallion: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 20,
    gap: 16,
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 5,
  },
});
