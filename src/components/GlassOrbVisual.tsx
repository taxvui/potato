import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Layers } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { BrandLogo } from './BrandLogo';

export const GlassOrbVisual: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const { isTouch, prefersReducedMotion, mousePos } = useDeviceMotion(true);
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full max-w-[500px] h-[360px] sm:h-[420px] flex items-center justify-center my-6 select-none">
      {/* Outer ambient glow pulsating behind orb */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.4 }
            : {
                scale: [1, 1.06, 1],
                opacity: [0.35, 0.52, 0.35],
                x: isTouch ? 0 : mousePos.x * 8,
                y: isTouch ? 0 : mousePos.y * 8,
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                x: { type: 'spring', stiffness: 100, damping: 20 },
                y: { type: 'spring', stiffness: 100, damping: 20 },
              }
        }
        className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentConfig.glow} 0%, rgba(255,255,255,0.05) 70%, transparent 100%)`,
        }}
      />

      {/* Orbit Ring 1 */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: 360,
                x: isTouch ? 0 : mousePos.x * -6,
                y: isTouch ? 0 : mousePos.y * -6,
              }
        }
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', stiffness: 90, damping: 22 },
          y: { type: 'spring', stiffness: 90, damping: 22 },
        }}
        className="absolute w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-dashed pointer-events-none opacity-20"
        style={{ borderColor: accentConfig.hex }}
      />

      {/* Orbit Ring 2 with tilt */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: -360,
                x: isTouch ? 0 : mousePos.x * 8,
                y: isTouch ? 0 : mousePos.y * 8,
              }
        }
        transition={{
          rotate: { duration: 52, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', stiffness: 90, damping: 22 },
          y: { type: 'spring', stiffness: 90, damping: 22 },
        }}
        className="absolute w-[360px] sm:w-[430px] h-[180px] sm:h-[220px] rounded-[100%] border pointer-events-none opacity-25"
        style={{
          borderColor: accentConfig.hex,
          transform: 'rotate(-25deg)',
        }}
      />

      {/* CENTER LARGE GLASS ORB / AVATAR WITH PHYSICAL FLOATING & MOUSE PARALLAX */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: isTouch ? 0 : mousePos.x * 12,
                y: isTouch ? [0, -10, 0] : [mousePos.y * 12, mousePos.y * 12 - 10, mousePos.y * 12],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                y: {
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                x: {
                  type: 'spring',
                  stiffness: 110,
                  damping: 20,
                  mass: 0.7,
                },
              }
        }
        className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center p-1.5"
      >
        {/* Outer glass sphere container with multi-tier glass refraction */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden shadow-2xl flex items-center justify-center backdrop-blur-2xl transition-all duration-500 bg-clip-padding"
          style={{
            background: isDark
              ? `radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 20%, rgba(255, 255, 255, 0.005) 48%, color-mix(in srgb, var(--accent) 12%, rgba(15, 23, 42, 0.12)) 75%, color-mix(in srgb, var(--accent) 22%, rgba(2, 6, 23, 0.35)) 100%)`
              : `radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.32) 22%, rgba(255, 255, 255, 0.04) 50%, color-mix(in srgb, var(--accent) 16%, rgba(241, 245, 249, 0.25)) 78%, color-mix(in srgb, var(--accent) 28%, rgba(255, 255, 255, 0.60)) 100%)`,
            border: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.88)'}`,
            boxShadow: isDark
              ? `0 30px 70px -15px rgba(0,0,0,0.75), inset 0 0 28px ${accentConfig.glow}, inset 0 1px 0 0 rgba(255,255,255,0.30)`
              : `0 25px 55px -12px rgba(100, 116, 139, 0.20), inset 0 0 24px ${accentConfig.glow}, inset 0 1px 0 0 rgba(255,255,255,0.85)`,
          }}
        >
          {/* Internal Caustic Waves */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    rotate: [0, 180, 360],
                    scale: [1, 1.12, 1],
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-4 rounded-full opacity-40 blur-xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 40% 40%, ${accentConfig.hex} 0%, rgba(255,255,255,0.4) 60%, transparent 80%)`,
            }}
          />

          {/* Internal Avatar Core / Monogram Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <BrandLogo size="xl" showStatus={true} className="transition-transform duration-500 hover:scale-105" />

            <div className="mt-3">
              <div
                className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 backdrop-blur-md shadow-xs"
                style={{
                  background: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.9)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2.4} style={{ color: accentConfig.hex }} />
                <span>{t.hero.liquid3d}</span>
              </div>
            </div>
          </div>

          {/* Glass Specular Sun Glare (Top-Left Highlight) subtly responding to cursor */}
          <motion.div
            animate={
              prefersReducedMotion || isTouch
                ? undefined
                : {
                    x: mousePos.x * 6,
                    y: mousePos.y * 6,
                  }
            }
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="absolute top-2 left-6 w-20 h-10 rounded-full blur-[1px] -rotate-35 pointer-events-none opacity-80"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.18) 50%, transparent 85%)'
                : 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.30) 60%, transparent 100%)',
            }}
          />

          {/* Bottom Edge Caustic Reflection */}
          <div
            className="absolute bottom-2 inset-x-8 h-4 rounded-[100%] blur-[2px] pointer-events-none opacity-60"
            style={{
              background: isDark
                ? `radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 45%, rgba(255,255,255,0.5)) 0%, transparent 70%)`
                : 'radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, transparent 70%)',
            }}
          />
        </div>
      </motion.div>

      {/* FLOATING GLASS CARD 1 (Top-Right): Crystal Glass Material */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: isTouch ? 0 : mousePos.x * 20,
                y: isTouch ? [0, -10, 0] : [mousePos.y * 20, mousePos.y * 20 - 10, mousePos.y * 20],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                y: {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                },
                x: { type: 'spring', stiffness: 100, damping: 22 },
              }
        }
        className="absolute -top-3 sm:top-2 -right-2 sm:right-2 z-20"
      >
        <div
          className="liquid-sheen px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105 cursor-pointer bg-clip-padding"
          style={{
            background: isDark ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.45)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.85)'}`,
            boxShadow: isDark
              ? '0 16px 36px -8px rgba(0,0,0,0.65), inset 0 1px 0 0 rgba(255,255,255,0.18)'
              : '0 14px 32px -8px rgba(15,23,42,0.08), inset 0 1px 0 0 rgba(255,255,255,0.75)',
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs shrink-0"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${accentConfig.hex}40, rgba(15,23,42,0.6))`
                : `linear-gradient(135deg, ${accentConfig.hex}30, rgba(255,255,255,0.95))`,
              border: `1px solid ${accentConfig.hex}77`,
              boxShadow: `0 2px 8px ${accentConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.7)`,
            }}
          >
            <Layers className="w-4.5 h-4.5" strokeWidth={2.4} style={{ color: accentConfig.hex }} />
          </div>
          <div className="text-left">
            <p
              className={`text-xs font-bold leading-tight ${
                isDark ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {t.hero.floatingCard1Title || 'Liquid Interaction'}
            </p>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {t.hero.floatingCard1Sub || '60 FPS React & WebGL'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* FLOATING GLASS CARD 2 (Bottom-Left): Frosted Glass Material */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: isTouch ? 0 : mousePos.x * -18,
                y: isTouch ? [0, 10, 0] : [mousePos.y * -18, mousePos.y * -18 + 10, mousePos.y * -18],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                y: {
                  duration: 5.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                },
                x: { type: 'spring', stiffness: 100, damping: 22 },
              }
        }
        className="absolute -bottom-4 sm:bottom-4 -left-2 sm:left-1 z-20"
      >
        <div
          className="liquid-sheen px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105 cursor-pointer bg-clip-padding"
          style={{
            background: isDark ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.45)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.85)'}`,
            boxShadow: isDark
              ? '0 16px 36px -8px rgba(0,0,0,0.65), inset 0 1px 0 0 rgba(255,255,255,0.18)'
              : '0 14px 32px -8px rgba(15,23,42,0.08), inset 0 1px 0 0 rgba(255,255,255,0.75)',
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs shrink-0"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${accentConfig.hex}40, rgba(15,23,42,0.6))`
                : `linear-gradient(135deg, ${accentConfig.hex}30, rgba(255,255,255,0.95))`,
              border: `1px solid ${accentConfig.hex}77`,
              boxShadow: `0 2px 8px ${accentConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.7)`,
            }}
          >
            <Code2 className="w-4.5 h-4.5" strokeWidth={2.4} style={{ color: accentConfig.hex }} />
          </div>
          <div className="text-left">
            <p
              className={`text-xs font-bold leading-tight ${
                isDark ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {t.hero.floatingCard2Title || 'Full-Stack Velocity'}
            </p>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {t.hero.floatingCard2Sub || 'Next.js & PostgreSQL'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* FLOATING GLASS CARD 3 (Bottom-Right): Clear Glass Status Pill */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: isTouch ? 0 : mousePos.x * 12,
                y: isTouch ? [0, -8, 0] : [mousePos.y * 12, mousePos.y * 12 - 8, mousePos.y * 12],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                y: {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.0,
                },
                x: { type: 'spring', stiffness: 100, damping: 22 },
              }
        }
        className="absolute bottom-8 right-2 sm:right-6 z-20"
      >
        <div
          className="liquid-sheen px-3 py-1.5 rounded-full shadow-lg backdrop-blur-xl flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-pointer bg-clip-padding"
          style={{
            background: isDark ? 'rgba(15, 23, 42, 0.40)' : 'rgba(255, 255, 255, 0.50)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.85)'}`,
            boxShadow: isDark
              ? '0 10px 24px -6px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.18)'
              : '0 8px 20px -6px rgba(15,23,42,0.06), inset 0 1px 0 0 rgba(255,255,255,0.80)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span
            className={`text-[11px] font-semibold tracking-tight ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}
          >
            {t.hero.floatingCard3Title || 'Status: Available'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

