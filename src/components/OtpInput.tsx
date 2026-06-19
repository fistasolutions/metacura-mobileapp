/**
 * OtpInput — segmented one-time-code entry. Renders `length` boxes that fill as
 * you type, with a blinking caret on the active box, backed by a single hidden
 * TextInput (so native paste / OTP autofill still work). Theme tokens only.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from './Text';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  length?: number;
  autoFocus?: boolean;
};

export function OtpInput({ value, onChangeText, length = 6, autoFocus }: Props) {
  const t = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const blink = useSharedValue(1);
  useEffect(() => {
    blink.value = withRepeat(
      withTiming(0, { duration: 600, easing: Easing.linear }),
      -1,
      true,
    );
  }, [blink]);
  const caretStyle = useAnimatedStyle(() => ({ opacity: blink.value }));

  const handle = (text: string) =>
    onChangeText(text.replace(/\D/g, '').slice(0, length));

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={styles.row}
      accessibilityLabel={`${length}-digit code`}
    >
      {Array.from({ length }).map((_, i) => {
        const char = value[i] ?? '';
        const isFilled = char !== '';
        const isActive = focused && i === value.length;
        const showCaret = isActive && value.length < length;
        return (
          <View
            key={i}
            style={[
              styles.cell,
              {
                borderRadius: t.radius.lg,
                backgroundColor: isFilled ? t.colors.surface : t.colors.surfaceMuted,
                borderColor: isActive
                  ? t.colors.primary
                  : isFilled
                    ? t.colors.borderStrong
                    : t.colors.border,
                borderWidth: isActive ? 2 : 1.5,
              },
              isActive ? t.shadows.sm : undefined,
            ]}
          >
            {showCaret ? (
              <Animated.View
                style={[styles.caret, { backgroundColor: t.colors.primary }, caretStyle]}
              />
            ) : (
              <AppText
                style={{
                  fontFamily: t.fonts.headingSemibold,
                  fontSize: t.fontSize['2xl'],
                  color: t.colors.text,
                }}
              >
                {char}
              </AppText>
            )}
          </View>
        );
      })}

      {/* Hidden field that actually captures input (covers the row for taps). */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handle}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        caretHidden
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  cell: {
    width: 48,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caret: {
    width: 2,
    height: 26,
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    color: 'transparent',
  },
});
