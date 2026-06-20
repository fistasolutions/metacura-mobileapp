/**
 * MetaCura mobile app root.
 * SafeAreaProvider → ThemeProvider → NavigationContainer → RootNavigator.
 * Light by default; dark follows the OS setting unless the user overrides it in
 * Privacy & data (see src/theme/ThemeProvider · useThemeMode).
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme as NavTheme,
} from '@react-navigation/native';
import { ThemeProvider, useThemeMode, darkTheme, lightTheme } from './src/theme';
import { RootNavigator } from './src/navigation';

function buildNavTheme(isDark: boolean): NavTheme {
  const t = isDark ? darkTheme : lightTheme;
  const base = isDark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: t.colors.primary,
      background: t.colors.background,
      card: t.colors.surface,
      text: t.colors.text,
      border: t.colors.border,
      notification: t.colors.accent,
    },
  };
}

// Reads the resolved theme mode so the status bar + navigation chrome follow
// the in-app Dark mode toggle, not only the OS setting.
function ThemedApp() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer theme={buildNavTheme(isDark)}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
