/**
 * FloatingMic — voice is a peer to text. A floating microphone button sits on
 * every authenticated screen and captures a question from any tab, routing to
 * the Ask Doctor voice flow. Bottom-right, lifted clear of the tab bar so it
 * never covers the Profile tab.
 */
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme';

// Default bottom-tabs content height (excludes the bottom safe-area inset).
const TAB_BAR_HEIGHT = 49;

export function FloatingMic({ onPress }: { onPress?: () => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Ask by voice"
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrap,
        { bottom: insets.bottom + TAB_BAR_HEIGHT + 16 },
        t.shadows.button,
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
      ]}
    >
      <LinearGradient
        colors={[t.colors.gradientStart, t.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fab}
      >
        {/* Placeholder glyph until an icon set is wired (see designsystem spec). */}
        <Text style={[styles.glyph, { color: t.colors.textInverse }]}>🎤</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 22,
  },
});
