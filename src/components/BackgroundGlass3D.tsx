import React from 'react';
import { useTheme } from '../hooks/useTheme';

/* =========================================================================
   PHYSICALLY ACCURATE LIQUID GLASS BACKGROUND
   - Pure GPU-accelerated CSS transforms (translate3d)
   - Genuine optical glass refraction (backdrop-blur + backdrop-saturate)
   - Natural Fresnel rim lighting & chromatic caustics (NO cartoon stickers)
   - Crystalline transparency in dark mode avoiding muddy grey plastic look
   - Respects prefers-reduced-motion automatically
   ========================================================================= */

interface SphereItem {
  id: string;
  size: number;
  top: string;
  left: string;
  animationClass: string;
  opacityDark: number;
  opacityLight: number;
  hasCaustic?: boolean;
}

const OPTIMIZED_SPHERES: SphereItem[] = [
  {
    id: 'orb-hero-subtle',
    size: 180,
    top: '15%',
    left: '48%',
    animationClass: 'animate-float-slow',
    opacityDark: 0.35,
    opacityLight: 0.60,
    hasCaustic: true,
  },
  {
    id: 'orb-1',
    size: 240,
    top: '4%',
    left: '82%',
    animationClass: 'animate-float-slow',
    opacityDark: 0.38,
    opacityLight: 0.62,
    hasCaustic: true,
  },
  {
    id: 'orb-2',
    size: 150,
    top: '22%',
    left: '3%',
    animationClass: 'animate-float-reverse',
    opacityDark: 0.32,
    opacityLight: 0.55,
    hasCaustic: false,
  },
  {
    id: 'orb-projects-overlap',
    size: 200,
    top: '44%',
    left: '16%',
    animationClass: 'animate-float-medium',
    opacityDark: 0.36,
    opacityLight: 0.58,
    hasCaustic: true,
  },
  {
    id: 'orb-3',
    size: 210,
    top: '58%',
    left: '84%',
    animationClass: 'animate-float-slow',
    opacityDark: 0.35,
    opacityLight: 0.58,
    hasCaustic: true,
  },
  {
    id: 'orb-4',
    size: 125,
    top: '78%',
    left: '7%',
    animationClass: 'animate-float-reverse',
    opacityDark: 0.30,
    opacityLight: 0.50,
    hasCaustic: false,
  },
  {
    id: 'orb-5',
    size: 42,
    top: '32%',
    left: '74%',
    animationClass: 'animate-float-bubble',
    opacityDark: 0.42,
    opacityLight: 0.65,
    hasCaustic: true,
  },
  {
    id: 'orb-6',
    size: 30,
    top: '68%',
    left: '14%',
    animationClass: 'animate-float-bubble-reverse',
    opacityDark: 0.38,
    opacityLight: 0.60,
    hasCaustic: false,
  },
];

export const BackgroundGlass3D: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. Atmospheric Ambient Glow Meshes (Soft radial gradients) */}
      <div
        className="absolute -top-32 right-[-10%] w-[520px] h-[520px] rounded-full opacity-35 dark:opacity-20 transition-colors duration-700 pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, ${accentConfig.glow} 0%, rgba(255,255,255,0.01) 65%, transparent 75%)`,
          filter: 'blur(50px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      <div
        className="hidden sm:block absolute top-[40%] -left-32 w-[460px] h-[460px] rounded-full opacity-30 dark:opacity-18 transition-colors duration-700 pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, ${accentConfig.glow} 0%, rgba(255,255,255,0.01) 65%, transparent 75%)`,
          filter: 'blur(55px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[10%] w-[540px] h-[540px] rounded-full opacity-30 dark:opacity-18 transition-colors duration-700 pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, ${accentConfig.glow} 0%, rgba(255,255,255,0.01) 65%, transparent 75%)`,
          filter: 'blur(55px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* 2. Tactile Subtle Grid Texture */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none ${
          isDark ? 'opacity-20' : 'opacity-35'
        }`}
      />

      {/* 3. Authentic Optical Liquid Glass Spheres */}
      {OPTIMIZED_SPHERES.map((sphere) => (
        <div
          key={sphere.id}
          className={`absolute pointer-events-none ${sphere.animationClass}`}
          style={{
            width: sphere.size,
            height: sphere.size,
            top: sphere.top,
            left: sphere.left,
            opacity: isDark ? sphere.opacityDark : sphere.opacityLight,
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
          }}
        >
          {/* Glass Sphere Shell with Real Backdrop Refraction */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden backdrop-blur-[12px] sm:backdrop-blur-[16px] backdrop-saturate-150 transition-all duration-700 bg-clip-padding"
            style={{
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.82)'}`,
              boxShadow: isDark
                ? `0 24px 60px -12px rgba(0, 0, 0, 0.70), 0 0 28px -4px ${sphere.hasCaustic ? accentConfig.glow : 'rgba(255, 255, 255, 0.03)'}, inset 0 1px 1.5px rgba(255, 255, 255, 0.28), inset 0 -12px 28px -6px ${sphere.hasCaustic ? accentConfig.glow : 'rgba(255, 255, 255, 0.04)'}, inset 0 0 16px rgba(255, 255, 255, 0.03)`
                : `0 20px 48px -10px rgba(100, 116, 139, 0.16), 0 0 24px -4px ${sphere.hasCaustic ? accentConfig.glow : 'rgba(255, 255, 255, 0.30)'}, inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -12px 28px -6px ${sphere.hasCaustic ? accentConfig.glow : 'rgba(255, 255, 255, 0.30)'}, inset 0 0 16px rgba(255, 255, 255, 0.25)`,
              background: isDark
                ? `radial-gradient(circle at 35% 26%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 22%, rgba(255, 255, 255, 0.002) 48%, color-mix(in srgb, var(--accent) 8%, rgba(15, 23, 42, 0.12)) 78%, color-mix(in srgb, var(--accent) 20%, rgba(2, 6, 23, 0.35)) 100%)`
                : `radial-gradient(circle at 35% 26%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.34) 22%, rgba(255, 255, 255, 0.04) 50%, color-mix(in srgb, var(--accent) 12%, rgba(241, 245, 249, 0.22)) 78%, color-mix(in srgb, var(--accent) 26%, rgba(255, 255, 255, 0.65)) 100%)`,
            }}
          >
            {/* Realistic Optical Specular Highlight (Soft Gaussian falloff along curvature, no hard cartoon stickers) */}
            <div
              className="absolute top-[8%] left-[12%] rounded-full pointer-events-none"
              style={{
                width: sphere.size * 0.44,
                height: sphere.size * 0.22,
                transform: 'rotate(-32deg)',
                background: isDark
                  ? 'radial-gradient(ellipse at 45% 45%, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.14) 38%, transparent 72%)'
                  : 'radial-gradient(ellipse at 45% 45%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.35) 38%, transparent 72%)',
                filter: 'blur(1.5px)',
              }}
            />

            {/* Secondary Internal Refraction Rim (Simulates front/back glass reflection) */}
            <div
              className="absolute inset-[3px] sm:inset-[4px] rounded-full pointer-events-none"
              style={{
                border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(255, 255, 255, 0.40)',
              }}
            />

            {/* Internal Caustic Dispersion (Opposite side focused light pool) */}
            {sphere.hasCaustic && (
              <div
                className="absolute bottom-[-12%] right-[-12%] rounded-full pointer-events-none transition-colors duration-500"
                style={{
                  width: sphere.size * 0.70,
                  height: sphere.size * 0.70,
                  background: `radial-gradient(circle at 65% 65%, ${accentConfig.glow} 0%, color-mix(in srgb, var(--accent) 20%, transparent) 40%, transparent 70%)`,
                  filter: 'blur(8px)',
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
