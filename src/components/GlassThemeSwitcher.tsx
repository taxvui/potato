import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../hooks/useTheme';
import { ThemePreference } from '../types';
import { Sun, Moon, Monitor } from 'lucide-react';

interface GlassThemeSwitcherProps {
  className?: string;
  id?: string;
  size?: 'sm' | 'md';
}

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export const GlassThemeSwitcher: React.FC<GlassThemeSwitcherProps> = ({
  className = '',
  id = 'glass-theme-switcher',
  size = 'md',
}) => {
  const { themePreference, setThemePreference, theme } = useTheme();
  const isDark = theme === 'dark';

  const options: ThemeOption[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const iconSizes = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const paddingSizes = size === 'sm' ? 'p-1 gap-0.5' : 'p-1 gap-1';
  const itemSizes = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-xs';

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Color theme selection"
      className={`relative inline-flex items-center rounded-xl glass-light border border-white/25 dark:border-white/10 select-none shadow-sm ${paddingSizes} ${className}`}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = themePreference === option.value;

        return (
          <button
            key={option.value}
            id={`theme-opt-${option.value}`}
            role="radio"
            aria-checked={isSelected}
            onClick={() => setThemePreference(option.value)}
            className={`relative z-10 flex items-center gap-1.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 ${itemSizes} ${
              isSelected
                ? isDark
                  ? 'text-white'
                  : 'text-slate-900'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {/* Sliding Glass Pill Highlight */}
            {isSelected && (
              <motion.div
                layoutId="theme-active-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-lg floating-glass border border-white/40 dark:border-white/20 shadow-sm"
                style={{
                  boxShadow: `0 2px 8px -2px var(--accent-glow)`,
                }}
              />
            )}

            <Icon
              className={`relative z-10 ${iconSizes} ${
                isSelected ? 'stroke-[2.2]' : 'stroke-[1.8]'
              }`}
              style={isSelected ? { color: 'var(--accent)' } : undefined}
            />
            <span className="relative z-10 hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

