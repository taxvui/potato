import { useState, useEffect, useCallback } from 'react';
import { SectionId } from '../types';

export const SECTION_IDS: SectionId[] = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'philosophy',
  'contact',
];

export function useScrollSpy(offset = 120) {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  const scrollToSection = useCallback((id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { activeSection, scrollToSection, sectionIds: SECTION_IDS };
}

