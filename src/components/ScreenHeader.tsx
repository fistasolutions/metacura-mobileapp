/**
 * ScreenHeader — the standard tab/screen header: optional back link, an eyebrow
 * pill, a headline (with an optional italic gradient accent word), and a one-line
 * value statement. Mirrors the web's header band.
 */
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { AppText, GradientText } from './Text';
import { SectionEyebrow } from './SectionEyebrow';
import { BackLink } from './BackLink';

type Props = {
  eyebrow?: string;
  title: string;
  accent?: string; // italic gradient word appended to the title
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  /** Hide the back link even when navigation could go back. */
  hideBack?: boolean;
  right?: React.ReactNode;
};

export function ScreenHeader({
  eyebrow,
  title,
  accent,
  subtitle,
  onBack,
  backLabel = 'Back',
  hideBack = false,
  right,
}: Props) {
  const t = useTheme();
  return (
    <View style={{ gap: t.spacing[3], marginBottom: t.spacing[5] }}>
      {hideBack ? null : <BackLink label={backLabel} onPress={onBack} />}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: t.spacing[3] }}>
        <View style={{ flex: 1, gap: t.spacing[3] }}>
          {eyebrow ? <SectionEyebrow label={eyebrow} /> : null}
          <AppText variant="h1">
            {title}
            {accent ? <GradientText style={{ fontSize: t.fontSize['3xl'] }}> {accent}</GradientText> : null}
          </AppText>
          {subtitle ? (
            <AppText variant="body" color={t.colors.textMuted}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
        {right}
      </View>
    </View>
  );
}
