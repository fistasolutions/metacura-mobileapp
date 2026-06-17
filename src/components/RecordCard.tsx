/**
 * RecordCard — a record list/timeline row: type icon, title, source · date,
 * an optional flag count, and a chevron. Taps through to the record detail.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import {
  Activity,
  ChevronRight,
  FileText,
  FlaskConical,
  Scan,
  Stethoscope,
  LucideIcon,
} from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppText } from './Text';
import { IconCircle } from './IconCircle';
import { MedicalRecord, RecordType } from '../data/types';

const ICONS: Record<RecordType, LucideIcon> = {
  Lab: FlaskConical,
  CT: Scan,
  MRI: Scan,
  Ultrasound: Activity,
  Medication: FileText,
  Voice: FileText,
  Visit: Stethoscope,
  Prescription: FileText,
};

export function RecordCard({ record, onPress }: { record: MedicalRecord; onPress?: () => void }) {
  const t = useTheme();
  const Icon = ICONS[record.type] ?? FileText;
  const flagged = record.values?.filter(v => v.flag !== 'normal').length ?? 0;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: t.colors.surface,
        borderWidth: 1,
        borderColor: t.colors.border,
        borderRadius: t.radius.xl,
        padding: 14,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <IconCircle icon={Icon} tone="teal" size={40} />
      <View style={{ flex: 1 }}>
        <AppText variant="body" numberOfLines={1} style={{ fontFamily: t.fonts.bodySemibold }}>
          {record.title}
        </AppText>
        <AppText variant="secondary" color={t.colors.textMuted} numberOfLines={1} style={{ marginTop: 2 }}>
          {record.source} · {record.date}
        </AppText>
      </View>
      {flagged > 0 ? (
        <View
          style={{
            backgroundColor: t.colors.highBg,
            borderRadius: t.radius.pill,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <AppText variant="eyebrow" color={t.colors.high}>
            {flagged} FLAGGED
          </AppText>
        </View>
      ) : null}
      <ChevronRight size={18} color={t.colors.textMuted} strokeWidth={2.2} />
    </Pressable>
  );
}
