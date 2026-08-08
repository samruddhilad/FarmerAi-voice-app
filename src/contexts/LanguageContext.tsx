/**
 * LanguageContext — Language preference state management
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../types/api.types';

interface LanguageContextType {
  selectedLanguage: Language;
  setLanguage: (language: Language) => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_LANGUAGE: Language = { code: 'mr', name: 'मराठी' };
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
        setSelectedLanguage(JSON.parse(saved));
      }
    } catch {
      // Use default
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = useCallback(async (language: Language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem(LANGUAGE_KEY, JSON.stringify(language));
  }, []);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setLanguage, isLoading }}>
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
