/**
 * ThemeContext — Light & Dark Mode state management
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    card: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    headerBg: string;
    bannerBg: [string, string];
    navBg: string;
  };
}

const THEME_KEY = 'app_theme_dark_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved !== null) {
        setIsDarkMode(JSON.parse(saved));
      }
    } catch {
      // default light
    }
  };

  const toggleTheme = useCallback(async () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      AsyncStorage.setItem(THEME_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const colors = {
    background: isDarkMode ? '#111827' : '#F0F9F1',
    surface: isDarkMode ? '#1F2937' : '#E8F5E9',
    card: isDarkMode ? '#1F2937' : '#F7FCF8',
    textPrimary: isDarkMode ? '#F9FAFB' : '#111827',
    textSecondary: isDarkMode ? '#9CA3AF' : '#4B5563',
    border: isDarkMode ? '#374151' : '#D1E7D4',
    headerBg: isDarkMode ? '#111827' : '#EAF5ED',
    bannerBg: (isDarkMode ? ['#064E3B', '#022C22'] : ['#DCF0E2', '#E8F5E9']) as [string, string],
    navBg: isDarkMode ? '#1F2937' : '#EAF5ED',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
