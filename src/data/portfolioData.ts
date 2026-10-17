import { ProjectItem, ExperienceItem, SkillCategory, StatItem } from '../types';
import liquidGlassToggleImg from '../assets/images/liquid_glass_toggle_1788686647957.jpg';
import liquidGlassCardsImg from '../assets/images/liquid_glass_cards_1788686871343.jpg';
import glassMobileUiImg from '../assets/images/glass_mobile_ui_1788687130980.jpg';

export const STATS_DATA: StatItem[] = [
  { value: '8+', labelKey: 'yearsExp', highlightKey: 'production' },
  { value: '25+', labelKey: 'productionProjects', highlightKey: 'systems' },
  { value: '1.2k+', labelKey: 'codeReviews', highlightKey: 'quality' },
  { value: '99.4%', labelKey: 'clientSatisfaction', highlightKey: 'uptime' },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-liquid-commerce',
    title: 'Liquid Commerce',
    category: 'Full-Stack',
    descriptionKey: 'project1Desc',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
    metrics: '99.8% Core Web Vitals • 400ms Checkout',
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
    metrics: 'Real-time WebSocket Streaming • Sub-50ms Visuals',
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
    metrics: 'Liquid Glass 3D Canvas • 60 FPS Fluid Motion',
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
    company: 'Vanguard Systems',
    period: '2022 — Present',
    location: 'San Francisco, CA',
    type: 'Full-Time / Hybrid',
    descriptionKey: 'role1Desc',
    technologies: ['TypeScript', 'Distributed Architecture', 'Go', 'Kubernetes', 'GraphQL', 'AWS'],
  },
  {
    id: 'exp-novus',
    roleKey: 'role2',
    company: 'Novus Cloud Technologies',
    period: '2019 — 2022',
    location: 'Austin, TX',
    type: 'Full-Time / Remote',
    descriptionKey: 'role2Desc',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker'],
  },
  {
    id: 'exp-aether',
    roleKey: 'role3',
    company: 'Aether Digital Labs',
    period: '2017 — 2019',
    location: 'Seattle, WA',
    type: 'Full-Time',
    descriptionKey: 'role3Desc',
    technologies: ['React', 'TypeScript', 'Webpack/Vite', 'REST APIs', 'Jest/Cypress'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    titleKey: 'frontend',
    skills: [
      { name: 'React', level: 96 },
      { name: 'Next.js', level: 94 },
      { name: 'TypeScript', level: 98 },
      { name: 'Vite', level: 92 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    titleKey: 'backend',
    skills: [
      { name: 'Node.js', level: 93 },
      { name: 'Next.js (Server)', level: 91 },
      { name: 'REST API', level: 95 },
      { name: 'PostgreSQL', level: 90 },
    ],
  },
  {
    titleKey: 'tools',
    skills: [
      { name: 'Git', level: 96 },
      { name: 'GitHub', level: 95 },
      { name: 'Docker', level: 90 },
      { name: 'Figma', level: 88 },
    ],
  },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/taxvui', icon: 'Github', handle: '@taxvui' },
];
