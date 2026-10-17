import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemePreference, ResolvedTheme, AccentColor } from '../types';
import { ACCENT_COLORS, AccentConfig } from '../styles/theme';

interface ThemeContextType {
  theme: ResolvedTheme;
  themePreference: ThemePreference;
  setThemePreference: (mode: ThemePreference) => void;
  toggleTheme: () => void;
  setTheme: (mode: ThemePreference) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentConfig: AccentConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme Preference: 'light' | 'dark' | 'system' (Default: 'light')
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme') as ThemePreference;
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    }
    return 'light'; // Default is Light as requested
  });

  // System OS theme detection
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Resolved theme ('light' or 'dark')
  const resolvedTheme: ResolvedTheme =
    themePreference === 'system' ? (systemIsDark ? 'dark' : 'light') : themePreference;

  // Accent Color: Default 'pastel-pink'
  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_accent') as AccentColor;
      if (saved && ACCENT_COLORS[saved]) return saved;
    }
    return 'pastel-pink'; // Default is Pastel Pink
  });

  // Listen to OS system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update theme preference
  const setThemePreference = useCallback((pref: ThemePreference) => {
    setThemePreferenceState(pref);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme', pref);
    }
  }, []);

  // Toggle theme mode (Light <-> Dark)
  const toggleTheme = useCallback(() => {
    if (resolvedTheme === 'dark') {
      setThemePreference('light');
    } else {
      setThemePreference('dark');
    }
  }, [resolvedTheme, setThemePreference]);

  // Update accent color
  const setAccent = useCallback((newAccent: AccentColor) => {
    if (!ACCENT_COLORS[newAccent]) return;
    setAccentState(newAccent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_accent', newAccent);
    }
  }, []);

  // Apply DOM classes and CSS variables with smooth transitions
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isDark = resolvedTheme === 'dark';

    // 1. Dark class synchronization
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 2. Data attributes for theme and accent
    root.setAttribute('data-theme', resolvedTheme);
    root.setAttribute('data-accent', accent);

    // 3. Centralized CSS Variables Injection:
    // --accent, --accent-light, --accent-dark, --accent-soft, --accent-glow, --accent-border
    const currentAccentConfig = ACCENT_COLORS[accent];
    if (currentAccentConfig) {
      root.style.setProperty('--accent', currentAccentConfig.primary);
      root.style.setProperty('--accent-light', currentAccentConfig.light);
      root.style.setProperty('--accent-dark', currentAccentConfig.dark);
      root.style.setProperty('--accent-soft', currentAccentConfig.soft);
      root.style.setProperty('--accent-glow', currentAccentConfig.glow);
      root.style.setProperty('--accent-border', currentAccentConfig.border);

      // Compatibility variables & High-contrast icon/text variables
      const contrastTone = isDark ? currentAccentConfig.primary : currentAccentConfig.dark;
      root.style.setProperty('--accent-contrast', contrastTone);
      root.style.setProperty('--color-accent', currentAccentConfig.primary);
      root.style.setProperty('--color-accent-contrast', contrastTone);
      root.style.setProperty('--color-accent-icon', contrastTone);
      root.style.setProperty('--color-accent-light', currentAccentConfig.light);
      root.style.setProperty('--color-accent-dark', currentAccentConfig.dark);
      root.style.setProperty('--color-accent-subtle', currentAccentConfig.soft);
      root.style.setProperty('--color-accent-glow', currentAccentConfig.glow);
      root.style.setProperty('--color-accent-border', currentAccentConfig.border);
    }
  }, [resolvedTheme, accent]);

  const value: ThemeContextType = {
    theme: resolvedTheme,
    themePreference,
    setThemePreference,
    toggleTheme,
    setTheme: setThemePreference,
    accent,
    setAccent,
    accentConfig: ACCENT_COLORS[accent],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
