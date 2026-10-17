export type Language = 'en' | 'vi' | 'zh';

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'philosophy' | 'contact';

export interface NavItem {
  id: SectionId;
  labelKey: string;
  href: string;
}

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type ThemeMode = ThemePreference;

export type AccentColor =
  | 'pastel-pink'
  | 'lavender'
  | 'baby-blue'
  | 'mint'
  | 'peach'
  | 'soft-yellow';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Frontend' | 'Creative' | 'Web App';
  descriptionKey: string;
  techStack: string[];
  metrics: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  roleKey: string;
  company: string;
  period: string;
  location: string;
  type: string;
  descriptionKey: string;
  technologies: string[];
}

export interface SkillCategory {
  titleKey: string;
  skills: {
    name: string;
    icon?: string;
    descriptionKey?: string;
  }[];
}

export interface StatItem {
  value: string;
  labelKey: string;
  highlightKey?: string;
}

