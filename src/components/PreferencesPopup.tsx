import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  Sun,
  Moon,
  Monitor,
  Globe,
  Palette,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { ACCENT_COLORS } from '../styles/theme';
import { AccentColor, Language, ThemePreference } from '../types';

interface PreferencesPopupProps {
  id?: string;
  variant?: 'icon-only' | 'pill' | 'footer-button';
  align?: 'right' | 'left' | 'center';
  className?: string;
}

export const PreferencesPopup: React.FC<PreferencesPopupProps> = ({
  id = 'preferences-popup',
  variant = 'icon-only',
  className = '',
}) => {
  const { theme, themePreference, setThemePreference, accent, setAccent, accentConfig } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const colorKeys = Object.keys(ACCENT_COLORS) as AccentColor[];

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const languages: { code: Language; label: string; short: string; flag: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', short: 'VI', flag: '🇻🇳' },
    { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
    { code: 'zh', label: '简体中文', short: '中文', flag: '🇨🇳' },
  ];

  const themeOptions: { mode: ThemePreference; labelKey: 'light' | 'dark' | 'system'; icon: React.ReactNode }[] = [
    { mode: 'light', labelKey: 'light', icon: <Sun className="w-3.5 h-3.5" /> },
    { mode: 'dark', labelKey: 'dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { mode: 'system', labelKey: 'system', icon: <Monitor className="w-3.5 h-3.5" /> },
  ];

  const getAccentLocalizedName = (key: AccentColor) => {
    switch (key) {
      case 'pastel-pink':
        return t.theme.accentPink;
      case 'lavender':
        return t.theme.accentLavender;
      case 'baby-blue':
        return t.theme.accentBlue;
      case 'mint':
        return t.theme.accentMint;
      case 'peach':
        return t.theme.accentPeach;
      case 'soft-yellow':
        return t.theme.accentYellow;
      default:
        return key;
    }
  };

  // Portal Modal content rendered at the top-level document body so it never breaks any parent layout
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          id={`${id}-portal-overlay`}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
          style={{ isolation: 'isolate' }}
        >
          {/* Subtle Darkening Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Liquid Glass Apple Control Center Modal Card */}
          <motion.div
            ref={modalCardRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.preferences.title}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="relative w-full max-w-[400px] p-5 sm:p-6 rounded-3xl floating-glass liquid-sheen shadow-2xl select-none overflow-hidden z-10 bg-clip-padding"
            style={{
              boxShadow: isDark
                ? '0 30px 60px -12px rgba(0, 0, 0, 0.85), 0 0 32px -4px var(--color-accent-glow)'
                : '0 30px 60px -12px rgba(15, 23, 42, 0.24), 0 0 24px -4px var(--color-accent-glow)',
            }}
          >
            {/* Header: Title + Subtitle + Close Button */}
            <div className="flex items-start justify-between pb-3.5 mb-4 border-b border-slate-200/50 dark:border-slate-800/70">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {t.preferences.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.preferences.subtitle}
                  </p>
                </div>
              </div>

              <button
                id={`${id}-close-btn`}
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={t.preferences.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SECTION 1: LANGUAGE / NGÔN NGỮ                                */}
            {/* ------------------------------------------------------------- */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.footer.languageLabel || 'Ngôn ngữ'}</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  {languages.find((l) => l.code === language)?.short}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl glass-light border border-slate-200/50 dark:border-slate-800/70">
                {languages.map((item) => {
                  const isSelected = language === item.code;
                  return (
                    <button
                      key={item.code}
                      id={`${id}-lang-${item.code}`}
                      onClick={() => setLanguage(item.code)}
                      className={`relative py-2 px-2 rounded-xl text-xs font-medium transition-colors focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'text-white font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="portalActiveLangPill"
                          className="absolute inset-0 rounded-xl shadow-xs"
                          style={{
                            backgroundColor: 'var(--color-accent)',
                            boxShadow: '0 2px 10px var(--color-accent-glow)',
                          }}
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 text-xs">{item.flag}</span>
                      <span className="relative z-10 truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SECTION 2: APPEARANCE MODE / GIAO DIỆN                        */}
            {/* ------------------------------------------------------------- */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.footer.themeLabel || 'Giao diện'}</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400 capitalize">
                  {t.theme[themePreference as keyof typeof t.theme] || themePreference}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl glass-light border border-slate-200/50 dark:border-slate-800/70">
                {themeOptions.map((opt) => {
                  const isSelected = themePreference === opt.mode;
                  return (
                    <button
                      key={opt.mode}
                      id={`${id}-theme-${opt.mode}`}
                      onClick={() => setThemePreference(opt.mode)}
                      className={`relative py-2 px-2 rounded-xl text-xs font-medium transition-colors focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'text-white font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="portalActiveThemePill"
                          className="absolute inset-0 rounded-xl shadow-xs"
                          style={{
                            backgroundColor: 'var(--color-accent)',
                            boxShadow: '0 2px 10px var(--color-accent-glow)',
                          }}
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{opt.icon}</span>
                      <span className="relative z-10 capitalize">
                        {t.theme[opt.labelKey]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SECTION 3: ACCENT COLOR / MÀU SẮC ĐIỂM NHẤN                  */}
            {/* ------------------------------------------------------------- */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.footer.accentLabel || 'Màu sắc'}</span>
                </label>
                <span
                  className="text-[11px] font-semibold tracking-tight"
                  style={{ color: isDark ? accentConfig.hex : accentConfig.dark }}
                >
                  {getAccentLocalizedName(accent)}
                </span>
              </div>

              <div className="p-2.5 rounded-2xl glass-light border border-slate-200/50 dark:border-slate-800/70 flex items-center justify-between">
                {colorKeys.map((key) => {
                  const config = ACCENT_COLORS[key];
                  const isSelected = accent === key;
                  return (
                    <button
                      key={key}
                      id={`${id}-color-${key}`}
                      onClick={() => setAccent(key)}
                      title={config.label}
                      aria-label={`Select ${config.label} color`}
                      className={`group relative p-1 rounded-full transition-transform duration-200 focus:outline-none cursor-pointer ${
                        isSelected ? 'scale-115' : 'hover:scale-110'
                      }`}
                    >
                      {/* Active Aura Ring */}
                      {isSelected && (
                        <motion.div
                          layoutId="portalActiveColorAura"
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: `0 0 12px 2px ${config.glow}, inset 0 0 0 2px ${config.primary}`,
                          }}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}

                      {/* 3D Liquid Glass Sphere body */}
                      <div
                        className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden transition-shadow duration-300"
                        style={{
                          background: config.sphereGradient,
                          boxShadow: isDark
                            ? `0 3px 8px -1px rgba(0, 0, 0, 0.6), inset 0 -2px 5px 0 ${config.glow}, inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)`
                            : `0 3px 8px -1px rgba(15, 23, 42, 0.15), inset 0 -2px 5px 0 ${config.glow}, inset 0 1px 2px 0 rgba(255, 255, 255, 0.7)`,
                        }}
                      >
                        {/* Top specular crescent */}
                        <div
                          className="pointer-events-none absolute top-0.5 left-1/2 -translate-x-1/2 w-[70%] h-[35%] rounded-full opacity-85"
                          style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.1) 100%)',
                            filter: 'blur(0.4px)',
                          }}
                        />

                        {/* Secondary pinpoint dot */}
                        <div className="pointer-events-none absolute top-1 left-1.5 w-1 h-1 rounded-full bg-white/90" />

                        {/* Bottom caustic */}
                        <div
                          className="pointer-events-none absolute bottom-0.5 inset-x-1 h-[30%] rounded-full opacity-60"
                          style={{
                            background: 'radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.8) 0%, transparent 80%)',
                          }}
                        />

                        {/* Selected Checkmark */}
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white stroke-[3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions: Auto-save status + Done button */}
            <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/70 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Sparkles className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                <span>{t.preferences.savedNotice}</span>
              </span>

              <button
                id={`${id}-done-btn`}
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: '0 2px 10px var(--color-accent-glow)',
                }}
              >
                {t.preferences.done}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* 1. TRIGGER BUTTONS (Zero layout footprint, perfectly aligned) */}
      {variant === 'icon-only' ? (
        <button
          id={`${id}-trigger-btn`}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={t.preferences.tooltip}
          title={t.preferences.tooltip}
          className={`relative p-2.5 rounded-xl glass-light border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer hover:glass-medium hover:scale-105 active:scale-95 ${
            isDark
              ? 'text-slate-100 hover:text-white border-white/20 hover:border-white/35 bg-white/[0.04]'
              : 'text-slate-800 hover:text-slate-950 border-slate-300/80 hover:border-slate-400 bg-white/80 shadow-xs'
          } ${className}`}
        >
          <SlidersHorizontal className="w-4 h-4 drop-shadow-xs" strokeWidth={2.4} />

          {/* Active Luminous Accent Dot */}
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white/90 dark:border-slate-900 shadow-xs transition-colors"
            style={{
              backgroundColor: accentConfig.hex,
              boxShadow: `0 0 6px ${accentConfig.glow}`,
            }}
          />
        </button>
      ) : variant === 'footer-button' ? (
        <button
          id={`${id}-trigger-footer-btn`}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-medium border border-white/30 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-102 active:scale-98 ${className}`}
        >
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <SlidersHorizontal className="w-3 h-3" />
          </div>
          <span>{t.footer.preferencesTitle}</span>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: accentConfig.hex,
              boxShadow: `0 0 6px ${accentConfig.glow}`,
            }}
          />
        </button>
      ) : (
        <button
          id={`${id}-trigger-pill-btn`}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass-light border border-slate-200/50 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer hover:scale-102 active:scale-98 ${className}`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
          <span>{t.preferences.title}</span>
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: accentConfig.hex,
              boxShadow: `0 0 6px ${accentConfig.glow}`,
            }}
          />
        </button>
      )}

      {/* 2. TOP-LEVEL PORTAL MODAL (Never clipped, never breaks layout) */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
};
