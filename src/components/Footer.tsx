import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SectionId } from '../types';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { SocialIcon } from './SocialIcon';
import { SocialLink } from './SocialLink';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { scrollToSection } = useScrollSpy();
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'hero', label: t.nav.hero },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'philosophy', label: t.nav.philosophy },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer
      id="site-footer"
      className={`border-t py-12 sm:py-16 transition-colors relative z-10 ${
        isDark ? 'bg-slate-950/90 border-slate-800/80 text-slate-400' : 'bg-slate-50/90 border-slate-200 text-slate-600'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand, Links & Social Icon Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" className="transition-transform duration-300 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className={`font-bold text-base tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {t.hero.name}
                </span>
                <span className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">
                  {t.hero.creativeBuilder}
                </span>
              </div>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              {t.hero.title}. {t.hero.currentFocus}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{t.footer.status}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-${link.id}`}
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Media with Official Icon Logos */}
          <div className="space-y-3">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              {t.contact.socialConnect}
            </h4>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {SOCIAL_LINKS.map((item) => (
                <SocialLink
                  key={item.name}
                  id={`footer-social-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  item={item}
                  className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 hover:scale-110 shadow-xs hover:shadow-md cursor-pointer border ${
                    isDark
                      ? 'bg-slate-900/70 border-white/15 text-slate-100 hover:text-white hover:border-[var(--color-accent-border)] hover:shadow-[0_4px_16px_var(--color-accent-glow)]'
                      : 'bg-white/80 border-slate-200/80 text-slate-800 hover:text-slate-950 hover:border-[var(--color-accent-border)] hover:shadow-[0_4px_16px_var(--color-accent-glow)]'
                  }`}
                >
                  <SocialIcon name={item.name} className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 drop-shadow-xs" />
                  <span className="sr-only">{item.name}</span>
                </SocialLink>
              ))}
            </div>
            {SOCIAL_LINKS.some(item => !item.url) && <p className="text-xs text-slate-500 dark:text-slate-400">{t.contact.socialHint}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="block sm:inline mt-1 sm:mt-0 opacity-75">{t.footer.builtWith}</span>
          </div>

          <div>
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium glass-light hover:opacity-100 transition-colors text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer shadow-xs"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

