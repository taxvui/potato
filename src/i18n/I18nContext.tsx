import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { en } from '../locales/en';
import { vi } from '../locales/vi';
import { zh } from '../locales/zh';
import { I18nContextType } from './types';

const dictionaries = {
  en,
  vi,
  zh,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang') as Language;
      if (saved && (saved === 'en' || saved === 'vi' || saved === 'zh')) {
        return saved;
      }
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) return 'zh';
      if (browserLang.startsWith('en')) return 'en';
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: I18nContextType = {
    language,
    setLanguage,
    t: dictionaries[language] || dictionaries.en,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
