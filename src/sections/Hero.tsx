import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, FileText, ChevronDown } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { GlassOrbVisual } from '../components/GlassOrbVisual';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { STATS_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const { scrollToSection } = useScrollSpy();
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const { isTouch, prefersReducedMotion } = useDeviceMotion();
  const isDark = theme === 'dark';

  // Subtle Apple-style scroll parallax
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, 45]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.45]);
  const orbParallaxY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : heroContentY,
          opacity: prefersReducedMotion ? 1 : heroOpacity,
        }}
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center"
      >
        {/* Availability Badge */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -10, filter: 'blur(4px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-light mb-6 transition-colors shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Main Title & Value Statement */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 20, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Subtle greeting */}
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-2">
            {t.hero.greeting}
          </p>

          {/* Name Display */}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] mb-3 ${
              isDark ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {t.hero.name}
          </h1>

          {/* Role Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2
              className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: isDark ? accentConfig.hex : accentConfig.dark }}
            >
              {t.hero.title}
            </h2>
          </div>

          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {t.hero.description}
          </p>
        </motion.div>

        {/* CENTER LARGE GLASS ORB / AVATAR WITH SUBTLE SCROLL PARALLAX */}
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : orbParallaxY }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.94, filter: 'blur(10px)' }
          }
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <GlassOrbVisual />
        </motion.div>

        {/* Call to Actions: View My Work & Let's Talk with Magnetic Physics */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 18, filter: 'blur(6px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-8"
        >
          <GlassButton
            id="hero-cta-projects"
            size="lg"
            variant="primary"
            magnetic
            onClick={() => scrollToSection('projects')}
            iconRight={<ArrowRight className="w-4 h-4" strokeWidth={2.4} />}
          >
            {t.hero.viewMyWork || t.hero.viewWork}
          </GlassButton>

          <GlassButton
            id="hero-cta-contact"
            size="lg"
            variant="secondary"
            magnetic
            onClick={() => scrollToSection('contact')}
            iconRight={<Sparkles className="w-4 h-4" strokeWidth={2.4} />}
          >
            {t.hero.letsTalk || t.hero.contact}
          </GlassButton>

          <GlassButton
            id="hero-cta-resume"
            size="lg"
            variant="ghost"
            magnetic
            onClick={() => window.open('#', '_blank')}
            iconLeft={<FileText className="w-4 h-4" strokeWidth={2.3} />}
          >
            {t.hero.ctaResume}
          </GlassButton>
        </motion.div>

        {/* Unified Apple-Style Metric Vitrine Bar (Eliminates Cluttered Box Cliché) */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 22, filter: 'blur(6px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto rounded-2xl glass-medium p-4 sm:p-5 shadow-sm mt-2"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/50 dark:divide-slate-800/70 gap-3 sm:gap-0">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className="text-center px-2 py-2 sm:py-0">
                <div
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {t.hero[stat.labelKey as keyof typeof t.hero] || stat.labelKey}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator with gentle physical drift (No wild bouncing) */}
        <div className="mt-12 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <button
            id="hero-scroll-down-btn"
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer"
            aria-label={t.hero.scroll}
          >
            <span className="mb-1.5 tracking-widest">{t.hero.scroll}</span>
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, 5, 0] }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown className="w-4 h-4" strokeWidth={2.4} />
            </motion.div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
