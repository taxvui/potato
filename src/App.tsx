import React from 'react';
import { useI18n } from './hooks/useI18n';
import { I18nProvider } from './i18n';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { BackgroundGlass3D } from './components/BackgroundGlass3D';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Philosophy } from './sections/Philosophy';
import { Contact } from './sections/Contact';

const PortfolioLayout: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <a href="#main-content" className="skip-link">{t.preview.skip}</a>
      {/* Dynamic 3D Liquid Glass Background (Step 3: Background + bóng kính 3D) */}
      <BackgroundGlass3D />

      {/* Primary Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <div className="absolute top-24 inset-x-0 text-center text-[10px] tracking-wide text-slate-500 px-4">{t.preview.preview}</div>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Philosophy />
        <Contact />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <PortfolioLayout />
      </ThemeProvider>
    </I18nProvider>
  );
}

