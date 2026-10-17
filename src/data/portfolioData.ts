import { siteConfig, isPublishedUrl } from '../config/site';
import { ProjectItem, ExperienceItem, SkillCategory, StatItem } from '../types';
import liquidGlassToggleImg from '../assets/images/liquid_glass_toggle_1788686647957.jpg';
import liquidGlassCardsImg from '../assets/images/liquid_glass_cards_1788686871343.jpg';
import glassMobileUiImg from '../assets/images/glass_mobile_ui_1788687130980.jpg';

export const STATS_DATA: StatItem[] = [
  { value: '3', labelKey: 'languages' },
  { value: '6', labelKey: 'accents' },
  { value: '7', labelKey: 'sections' },
  { value: '3', labelKey: 'concepts' },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-liquid-commerce',
    title: 'Liquid Commerce',
    category: 'Full-Stack',
    descriptionKey: 'project1Desc',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
    metrics: 'project1Focus',
    image: glassMobileUiImg,
    demoUrl: 'https://demo.liquid-commerce.example.com',
    githubUrl: 'https://github.com/example/liquid-commerce',
    featured: true,
  },
  {
    id: 'project-digital-dashboard',
    title: 'Digital Dashboard',
    category: 'Frontend',
    descriptionKey: 'project2Desc',
    techStack: ['React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API'],
    metrics: 'project2Focus',
    image: liquidGlassCardsImg,
    demoUrl: 'https://demo.digital-dashboard.example.com',
    githubUrl: 'https://github.com/example/digital-dashboard',
    featured: true,
  },
  {
    id: 'project-creative-studio',
    title: 'Creative Studio',
    category: 'Creative',
    descriptionKey: 'project3Desc',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Figma', 'TypeScript', 'Docker'],
    metrics: 'project3Focus',
    image: liquidGlassToggleImg,
    demoUrl: 'https://demo.creative-studio.example.com',
    githubUrl: 'https://github.com/example/creative-studio',
    featured: true,
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-vanguard',
    roleKey: 'role1',
    company: '',
    period: '',
    location: '',
    type: '',
    descriptionKey: 'role1Desc',
    technologies: ['TypeScript', 'Distributed Architecture', 'Go', 'Kubernetes', 'GraphQL', 'AWS'],
  },
  {
    id: 'exp-novus',
    roleKey: 'role2',
    company: '',
    period: '',
    location: '',
    type: '',
    descriptionKey: 'role2Desc',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker'],
  },
  {
    id: 'exp-aether',
    roleKey: 'role3',
    company: '',
    period: '',
    location: '',
    type: '',
    descriptionKey: 'role3Desc',
    technologies: ['React', 'TypeScript', 'Webpack/Vite', 'REST APIs', 'Jest/Cypress'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    titleKey: 'frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    titleKey: 'backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Next.js (Server)' },
      { name: 'REST API' },
      { name: 'PostgreSQL' },
    ],
  },
  {
    titleKey: 'tools',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'Figma' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/taxvui' },
  { name: 'LinkedIn', url: isPublishedUrl(siteConfig.linkedinUrl) ? siteConfig.linkedinUrl : '' },
  { name: 'X', url: isPublishedUrl(siteConfig.xUrl) ? siteConfig.xUrl : '' },
  { name: 'Email', url: siteConfig.contactEmail ? `mailto:${encodeURIComponent(siteConfig.contactEmail)}` : '' },
];
