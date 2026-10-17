import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';

export interface GlassLanguageSwitcherProps {
  id?: string;
  size?: 'sm' | 'md';
  className?: string;
  showFlag?: boolean;
}

interface LanguageOption {
  code: Language;
  label: string;
  fullLabel: string;
  flag: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'vi', label: 'VI', fullLabel: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'EN', fullLabel: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文', fullLabel: '简体中文', flag: '🇨🇳' },
];

export const GlassLanguageSwitcher: React.FC<GlassLanguageSwitcherProps> = ({
  id = 'glass-language-switcher',
  size = 'sm',
  className = '',
  showFlag = false,
}) => {
  const { language, setLanguage } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isSmall = size === 'sm';

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Language selection"
      className={`relative inline-flex items-center p-1 rounded-full transition-all duration-300 select-none ${
        isDark
          ? 'bg-slate-900/65 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
          : 'bg-white/70 border border-white/60 shadow-[0_4px_20px_0_rgba(0,0,0,0.06)]'
      } backdrop-blur-xl ${className}`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Top subtle glare reflection line for liquid glass depth */}
      <div
        className="pointer-events-none absolute inset-x-2 top-0 h-[1px] rounded-full opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
        }}
      />

      {LANGUAGE_OPTIONS.map((opt) => {
        const isActive = language === opt.code;

        return (
          <button
            key={opt.code}
            id={`${id}-opt-${opt.code}`}
            role="radio"
            aria-checked={isActive}
            title={opt.fullLabel}
            onClick={() => setLanguage(opt.code)}
            className={`relative z-10 flex items-center justify-center gap-1 font-medium transition-colors duration-200 focus:outline-none ${
              isSmall
                ? 'px-2.5 py-1 text-[11px] min-w-[34px] sm:min-w-[38px] h-7'
                : 'px-3 py-1.5 text-xs min-w-[42px] sm:min-w-[46px] h-8'
            } rounded-full whitespace-nowrap ${
              isActive
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-slate-900 font-bold'
                : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {/* Sliding Liquid Glass Pill Background */}
            {isActive && (
              <motion.div
                layoutId={`active-lang-pill-${id}`}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 35,
                }}
                className={`absolute inset-0 rounded-full ${
                  isDark
                    ? 'bg-white/[0.16] border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
                    : 'bg-white/95 border border-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 2px 14px -1px var(--accent-glow), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)'
                    : '0 2px 12px -1px var(--accent-glow), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                {/* Specular highlight arc inside active pill */}
                <div
                  className="pointer-events-none absolute inset-x-1.5 top-0.5 h-[1px] rounded-full opacity-70"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                  }}
                />
              </motion.div>
            )}

            {/* Content: Label & Optional Flag */}
            <span className="relative z-20 flex items-center gap-1">
              {showFlag && <span className="text-xs leading-none">{opt.flag}</span>}
              <span
                className={`tracking-wide ${
                  isActive ? 'accent-color' : ''
                }`}
                style={{
                  fontFamily: opt.code === 'zh' ? "'Noto Sans SC', sans-serif" : undefined,
                }}
              >
                {opt.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
