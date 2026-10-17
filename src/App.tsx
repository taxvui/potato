import React, { useEffect, useState, lazy, Suspense } from "react";
const Development = lazy(() =>
  import("./Development").then((module) => ({ default: module.Development })),
);
import { useI18n } from "./hooks/useI18n";
import { I18nProvider } from "./i18n";
import { ThemeProvider, useTheme } from "./hooks/useTheme";
import { BackgroundGlass3D } from "./components/BackgroundGlass3D";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Philosophy } from "./sections/Philosophy";
import { Contact } from "./sections/Contact";

const PortfolioLayout: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";
  const [development, setDevelopment] = useState(
    window.location.hash.startsWith("#/development"),
  );
  useEffect(() => {
    const onRoute = () => {
      setDevelopment(window.location.hash.startsWith("#/development"));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onRoute);
    return () => window.removeEventListener("hashchange", onRoute);
  }, []);
  useEffect(() => {
    if (development) document.title = "Development · Potato UI";
    else document.title = `${t.hero.name} · Portfolio`;
  }, [development, t.hero.name]);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        {t.preview.skip}
      </a>
      {/* Dynamic 3D Liquid Glass Background (Step 3: Background + bóng kính 3D) */}
      <BackgroundGlass3D />

      {/* Primary Floating Navigation Bar */}
      {!development && <Navbar />}

      {/* Main Content Sections */}
      {development ? (
        <Suspense
          fallback={
            <p role="status" className="relative z-10 p-12">
              Loading components…
            </p>
          }
        >
          <Development />
        </Suspense>
      ) : (
        <main id="main-content" tabIndex={-1} className="relative z-10">
          <div className="absolute top-24 inset-x-0 text-center text-[10px] tracking-wide text-slate-500 px-4">
            {t.preview.preview}
          </div>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Philosophy />
          <Contact />
        </main>
      )}

      {/* Footer */}
      {!development && (
        <div className="relative z-10">
          <Footer />
        </div>
      )}
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
