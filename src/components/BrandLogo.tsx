import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../hooks/useTheme';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
  animated?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  showStatus = false,
  animated = true,
}) => {
  const { theme, accentConfig } = useTheme();
  const isDark = theme === 'dark';

  const sizeConfig = {
    sm: {
      box: 'w-8 h-8 rounded-lg',
      text: 'text-xs font-black tracking-tight',
      dot: 'w-2 h-2 -bottom-0.5 -right-0.5',
      glint: 'w-2 h-1 top-0.5 left-1',
    },
    md: {
      box: 'w-10 h-10 rounded-xl',
      text: 'text-sm font-black tracking-tight',
      dot: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
      glint: 'w-2.5 h-1 top-0.5 left-1.5',
    },
    lg: {
      box: 'w-12 h-12 rounded-2xl',
      text: 'text-base font-black tracking-tight',
      dot: 'w-3 h-3 -bottom-1 -right-1',
      glint: 'w-3 h-1.5 top-1 left-2',
    },
    xl: {
      box: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
      text: 'text-2xl sm:text-3xl font-black tracking-tight',
      dot: 'w-3.5 h-3.5 bottom-1.5 right-1.5',
      glint: 'w-5 h-2.5 top-1.5 left-3',
    },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group bg-clip-padding ${sizeConfig.box} ${className}`}
      style={{
        /* Jewel-cut tactile physical liquid glass badge - high vibrancy in both modes */
        background: isDark
          ? `radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 75%), linear-gradient(135deg, ${accentConfig.hex} 0%, color-mix(in srgb, ${accentConfig.hex} 55%, #090d16) 100%)`
          : `radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.20) 45%, transparent 75%), linear-gradient(135deg, ${accentConfig.hex} 0%, ${accentConfig.dark} 100%)`,
        boxShadow: isDark
          ? `0 8px 24px -3px rgba(0, 0, 0, 0.75), 0 0 20px ${accentConfig.glow}, inset 0 1px 1.5px rgba(255, 255, 255, 0.7), inset 0 -1px 2px rgba(0, 0, 0, 0.5)`
          : `0 8px 22px -3px ${accentConfig.glow}, 0 2px 10px rgba(15, 23, 42, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.20)`,
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.40)'
          : '1px solid rgba(255, 255, 255, 0.90)',
      }}
    >
      {/* Specular Glint Reflection */}
      <div
        className={`absolute rounded-full pointer-events-none opacity-80 ${sizeConfig.glint}`}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 100%)',
          filter: 'blur(0.3px)',
        }}
      />

      {/* High-contrast Monogram Typography */}
      <span
        className={`relative z-10 text-white font-extrabold transition-transform duration-300 group-hover:scale-105 ${sizeConfig.text}`}
        style={{
          textShadow: isDark
            ? '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(255, 255, 255, 0.35)'
            : '0 1px 3px rgba(15, 23, 42, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)',
        }}
      >
        AC
      </span>

      {/* Active Tech Status Indicator Dot */}
      {showStatus && (
        <span
          className={`absolute rounded-full border-2 border-white dark:border-slate-900 bg-emerald-400 z-20 shadow-xs ${sizeConfig.dot}`}
        >
          {animated && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          )}
        </span>
      )}
    </div>
  );
};
