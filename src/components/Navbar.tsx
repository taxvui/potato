import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { SectionId } from '../types';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { GlassButton } from './GlassButton';
import { PreferencesPopup } from './PreferencesPopup';
import { BrandLogo } from './BrandLogo';

interface NavItemDef {
  id: SectionId;
  labelKey: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'philosophy' | 'contact';
}

const NAV_ITEMS: NavItemDef[] = [
  { id: 'hero', labelKey: 'hero' },
  { id: 'about', labelKey: 'about' },
  { id: 'skills', labelKey: 'skills' },
  { id: 'projects', labelKey: 'projects' },
  { id: 'experience', labelKey: 'experience' },
  { id: 'philosophy', labelKey: 'philosophy' },
  { id: 'contact', labelKey: 'contact' },
];

export const Navbar: React.FC = () => {
  const { activeSection, scrollToSection } = useScrollSpy();
  const { theme } = useTheme();
  const { t } = useI18n();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    // Run once on mount to handle initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      style={{ isolation: 'isolate' }}
      className={`fixed top-0 inset-x-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-slate-950/45 backdrop-blur-md backdrop-saturate-[190%] border-b border-white/10 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45)] py-2.5 sm:py-3'
            : 'bg-white/45 backdrop-blur-md backdrop-saturate-[190%] border-b border-slate-200/50 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.05)] py-2.5 sm:py-3'
          : isDark
            ? 'bg-slate-950/20 backdrop-blur-xs border-b border-white/5 py-3 sm:py-4'
            : 'bg-white/25 backdrop-blur-xs border-b border-slate-200/30 py-3 sm:py-4'
      }`}
    >
      {/* Top Specular Rim */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-75"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Brand / Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label={`${t.hero.name} — ${t.nav.home}`}
        >
          <BrandLogo size="md" className="transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col text-left">
            <span
              className={`font-bold text-sm tracking-tight transition-colors ${
                isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-900 group-hover:text-black'
              }`}
            >
              {t.hero.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">
              {t.hero.creativeBuilder}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 rounded-full p-1.5 glass-medium shadow-xs transition-colors"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none select-none ${
                  isActive
                    ? isDark
                      ? 'text-white'
                      : 'text-slate-900'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full border glass-light"
                    style={{
                      borderColor: 'var(--color-accent-border)',
                      backgroundColor: 'var(--color-accent-subtle)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.nav[item.labelKey]}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA, Preferences Icon Popup & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a href="#/development" className="rounded-lg px-2 py-2 text-xs font-medium accent-color focus-visible:outline-2" aria-label="Development component library">Development</a>
          {/* Preferences Icon Popup: Language, Appearance & Color */}
          <PreferencesPopup id="nav-preferences" variant="icon-only" align="right" />

          {/* CTA Button: Contact */}
          <GlassButton
            id="nav-contact-cta"
            size="sm"
            variant="primary"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex"
            iconRight={<Sparkles className="w-3 h-3" />}
          >
            {t.nav.getInTouch}
          </GlassButton>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl glass-medium border border-white/25 dark:border-white/10 transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer ${
              isDark
                ? 'text-slate-100 hover:text-white hover:bg-white/10'
                : 'text-slate-800 hover:text-slate-950 hover:bg-white/80'
            }`}
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" strokeWidth={2.3} /> : <Menu className="w-4 h-4" strokeWidth={2.3} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden floating-glass border-b px-4 py-4 ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'glass-light font-semibold'
                        : isDark
                          ? 'text-slate-300 hover:bg-white/[0.06]'
                          : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    style={isActive ? { color: 'var(--color-accent)' } : undefined}
                  >
                    <span>{t.nav[item.labelKey]}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                  </button>
                );
              })}

              {/* Mobile Preferences & Contact Buttons */}
              <div className="pt-2.5 mt-1 border-t border-slate-200/40 dark:border-slate-800/60 flex items-center justify-between gap-2">
                <PreferencesPopup
                  id="mobile-nav-preferences"
                  variant="pill"
                  align="left"
                  className="flex-1"
                />

                <GlassButton
                  id="mobile-contact-cta"
                  size="sm"
                  variant="primary"
                  onClick={() => handleNavClick('contact')}
                  className="flex-1"
                >
                  {t.nav.getInTouch}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


