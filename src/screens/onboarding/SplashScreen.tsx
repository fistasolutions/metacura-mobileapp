/**
 * Screen 01 · Splash — full-screen teal gradient with the MetaCura wordmark.
 * Auto-advances to Welcome after a short beat. See specs/onboarding.md.
 */
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';

export default function SplashScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();

  useEffect(() => {
    const id = setTimeout(() => nav.navigate('Welcome'), 1100);
    return () => clearTimeout(id);
  }, [nav]);

  return (
    <LinearGradient
      colors={[t.colors.primaryStrong, '#0e7490']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[StyleSheet.absoluteFill, styles.center]}
    >
      <Text style={{ fontFamily: t.fonts.brand, fontSize: 36, color: t.palette.white }}>
        MetaCura
      </Text>
      <Text
        style={{
          marginTop: t.spacing[3],
          fontFamily: t.fonts.bodySemibold,
          fontSize: t.fontSize.xs,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        MyCare ID, your personal health ID
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
