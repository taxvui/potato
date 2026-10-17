import React from 'react';
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
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Dynamic 3D Liquid Glass Background (Step 3: Background + bóng kính 3D) */}
      <BackgroundGlass3D />

      {/* Primary Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
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
