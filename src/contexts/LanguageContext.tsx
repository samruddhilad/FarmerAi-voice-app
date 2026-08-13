/**
 * LanguageContext — Marathi ('mr') as Default Language State Management
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../types/api.types';
import { getTranslation } from '../utils/i18n';

interface LanguageContextType {
  selectedLanguage: Language;
  setLanguage: (language: Language) => Promise<void>;
  isLoading: boolean;
  t: (key: string, params?: Record<string, any>) => string;
}

export const DEFAULT_LANGUAGE: Language = { code: 'mr', name: 'मराठी' };
const LANGUAGE_KEY = 'app_selected_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.code) {
          setSelectedLanguage(parsed);
          return;
        }
      }
    } catch {
      // Use default Marathi
    } finally {
      setIsLoading(false);
    }
    setSelectedLanguage(DEFAULT_LANGUAGE);
  };

  const setLanguage = useCallback(async (language: Language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem(LANGUAGE_KEY, JSON.stringify(language));
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, any>) => {
      return getTranslation(selectedLanguage.code, key, params);
    },
    [selectedLanguage.code]
  );

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setLanguage, isLoading, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
