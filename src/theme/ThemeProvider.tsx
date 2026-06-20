/**
 * ThemeProvider + useTheme — light by default, dark follows the OS setting
 * unless the user overrides it (Privacy & data → Dark mode). The override is
 * held in memory via useThemeMode(); a restart returns to the OS preference.
 * Health data benefits from a calm light surface; dark mode shifts the same
 * palette (see colors.ts), it never introduces new hues.
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from './index';

type Mode = 'light' | 'dark';
type Preference = 'light' | 'dark' | 'system';

type ThemeModeControls = {
  /** The resolved mode actually in effect. */
  mode: Mode;
  /** The user's stored preference ('system' follows the OS). */
  preference: Preference;
  setPreference: (p: Preference) => void;
  /** Flip explicitly between light and dark. */
  toggle: () => void;
};

const ThemeContext = createContext<Theme>(lightTheme);
const ThemeModeContext = createContext<ThemeModeControls>({
  mode: 'light',
  preference: 'system',
  setPreference: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const [preference, setPreference] = useState<Preference>('system');

  const mode: Mode =
    preference === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : preference;

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const controls = useMemo<ThemeModeControls>(
    () => ({
      mode,
      preference,
      setPreference,
      toggle: () => setPreference(mode === 'dark' ? 'light' : 'dark'),
    }),
    [mode, preference],
  );

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeModeContext.Provider value={controls}>{children}</ThemeModeContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export function useThemeMode(): ThemeModeControls {
  return useContext(ThemeModeContext);
}
