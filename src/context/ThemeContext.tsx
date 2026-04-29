import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@taskflow:theme';

export interface ThemeColors {
  background: string; surface: string; card: string; primary: string;
  primaryLight: string; primaryDark: string; text: string; textSecondary: string;
  textMuted: string; border: string; borderLight: string; error: string;
  success: string; warning: string; info: string; inputBackground: string;
  tabBar: string; shadow: string; accent: string;
}

const lightColors: ThemeColors = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#5B4CF5',
  primaryLight: '#EEF0FF',
  primaryDark: '#3D2FD9',
  accent: '#FF6B6B',
  text: '#0F0E17',
  textSecondary: '#4A4A5A',
  textMuted: '#9090A0',
  border: '#EBEBF0',
  borderLight: '#F3F3F8',
  error: '#E53E3E',
  success: '#38A169',
  warning: '#D69E2E',
  info: '#3182CE',
  inputBackground: '#F7F8FC',
  tabBar: '#FFFFFF',
  shadow: '#5B4CF5',
};

const darkColors: ThemeColors = {
  background: '#0A0A12',
  surface: '#13131F',
  card: '#1A1A2A',
  primary: '#7B6FF0',
  primaryLight: '#1E1B3A',
  primaryDark: '#5B4CF5',
  accent: '#FF6B6B',
  text: '#F0F0FF',
  textSecondary: '#A0A0C0',
  textMuted: '#606080',
  border: '#2A2A3A',
  borderLight: '#1E1E2E',
  error: '#FC8181',
  success: '#68D391',
  warning: '#F6E05E',
  info: '#63B3ED',
  inputBackground: '#13131F',
  tabBar: '#13131F',
  shadow: '#000000',
};

interface ThemeContextData {
  isDark: boolean;
  theme: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((v) => { if (v !== null) setIsDark(v === 'dark'); });
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? darkColors : lightColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}