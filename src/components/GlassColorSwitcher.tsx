import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../hooks/useTheme';
import { ACCENT_COLORS } from '../styles/theme';
import { AccentColor } from '../types';
import { Palette, Check } from 'lucide-react';

interface GlassColorSwitcherProps {
  variant?: 'compact' | 'expanded';
  className?: string;
  id?: string;
}

export const GlassColorSwitcher: React.FC<GlassColorSwitcherProps> = ({
  variant = 'compact',
  className = '',
  id = 'glass-color-switcher',
}) => {
  const { accent, setAccent, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<AccentColor | null>(null);
  const isDark = theme === 'dark';

  const colorKeys = Object.keys(ACCENT_COLORS) as AccentColor[];

  // Render individual 3D liquid glass sphere
  const renderGlassSphere = (key: AccentColor, isCurrentSelected: boolean) => {
    const config = ACCENT_COLORS[key];
    return (
      <button
        key={key}
        id={`color-sphere-${key}`}
        onClick={() => {
          setAccent(key);
        }}
        onMouseEnter={() => setHoveredColor(key)}
        onMouseLeave={() => setHoveredColor(null)}
        title={config.label}
        aria-label={`Select ${config.label} accent color`}
        className={`group relative p-1 rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isCurrentSelected ? 'scale-110' : 'hover:scale-115'
        }`}
      >
        {/* Active outer aura / glass ring */}
        {isCurrentSelected && (
          <motion.div
            layoutId="active-sphere-aura"
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `0 0 10px 2px ${config.glow}, inset 0 0 0 1.5px ${config.primary}`,
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          />
        )}

        {/* 3D Liquid Glass Sphere Body */}
        <div
          className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden transition-shadow duration-300"
          style={{
            background: config.sphereGradient,
            boxShadow: isDark
              ? `0 3px 8px -1px rgba(0, 0, 0, 0.6), inset 0 -2px 5px 0 ${config.glow}, inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)`
              : `0 3px 8px -1px rgba(15, 23, 42, 0.15), inset 0 -2px 5px 0 ${config.glow}, inset 0 1px 2px 0 rgba(255, 255, 255, 0.7)`,
          }}
        >
          {/* Top Specular Glint Crescent */}
          <div
            className="pointer-events-none absolute top-0.5 left-1/2 -translate-x-1/2 w-[70%] h-[35%] rounded-full opacity-85"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.1) 100%)',
              filter: 'blur(0.4px)',
            }}
          />

          {/* Secondary micro-specular dot */}
          <div className="pointer-events-none absolute top-1 left-1.5 w-1 h-1 rounded-full bg-white/90" />

          {/* Bottom caustic bounce */}
          <div
            className="pointer-events-none absolute bottom-0.5 inset-x-1 h-[30%] rounded-full opacity-60"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.8) 0%, transparent 80%)',
            }}
          />

          {/* Active Mini Check Indicator */}
          {isCurrentSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white stroke-[3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
            </div>
          )}
        </div>
      </button>
    );
  };

  // If expanded variant, render the 6 spheres in a sleek horizontal glass dock
  if (variant === 'expanded') {
    return (
      <div
        id={id}
        className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full glass-light border border-white/20 dark:border-white/10 ${className}`}
      >
        {colorKeys.map((key) => renderGlassSphere(key, accent === key))}
      </div>
    );
  }

  // Compact variant: Glass button with active sphere preview + popover tray
  const currentAccent = ACCENT_COLORS[accent];

  return (
    <div className={`relative ${className}`} id={id}>
      {/* Trigger Button with Active 3D Mini Sphere */}
      <button
        type="button"
        id={`${id}-trigger`}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl glass-light hover:border-white/40 dark:hover:border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2"
        aria-label="Select accent color"
        aria-expanded={isOpen}
      >
        {/* Active mini 3D sphere */}
        <div
          className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-sm"
          style={{
            background: currentAccent.sphereGradient,
            boxShadow: `0 0 8px ${currentAccent.glow}`,
          }}
        >
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-2.5 h-1 rounded-full bg-white/80" />
        </div>

        <Palette className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />

        {/* Glow halo */}
        <span
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 14px -2px ${currentAccent.glow}`,
          }}
        />
      </button>

      {/* Floating 6-Sphere Glass Dock Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="absolute right-0 mt-2 z-50 p-2.5 rounded-2xl floating-glass min-w-[210px] shadow-2xl border border-white/30 dark:border-white/15"
            >
              {/* Header with selected color name */}
              <div className="px-2 pb-2 mb-2 border-b border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                  Accent Color
                </span>
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                  {hoveredColor ? ACCENT_COLORS[hoveredColor].label : currentAccent.label}
                </span>
              </div>

              {/* 6 Glass Spheres Grid */}
              <div className="flex items-center justify-between px-1 gap-1">
                {colorKeys.map((key) => renderGlassSphere(key, accent === key))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
