import { AccentColor } from '../types';

export interface AccentConfig {
  name: AccentColor;
  label: string;
  primary: string;
  hex: string;
  light: string;
  dark: string;
  soft: string;
  glow: string;
  border: string;
  borderHover: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
  ring: string;
  sphereGradient: string;
}

export const ACCENT_COLORS: Record<AccentColor, AccentConfig> = {
  'pastel-pink': {
    name: 'pastel-pink',
    label: 'Pastel Pink',
    primary: '#f472b6',
    hex: '#f472b6',
    light: '#fdf2f8',
    dark: '#db2777',
    soft: 'rgba(244, 114, 182, 0.12)',
    glow: 'rgba(244, 114, 182, 0.32)',
    border: 'rgba(244, 114, 182, 0.30)',
    borderHover: 'hover:border-pink-400/60',
    bgLight: 'bg-pink-500/10',
    bgDark: 'bg-pink-500/15',
    textLight: 'text-pink-600',
    textDark: 'text-pink-300',
    ring: 'ring-pink-400/40',
    sphereGradient: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #fce7f3 28%, #f472b6 65%, #be185d 96%)',
  },
  'lavender': {
    name: 'lavender',
    label: 'Lavender',
    primary: '#a78bfa',
    hex: '#a78bfa',
    light: '#faf5ff',
    dark: '#7c3aed',
    soft: 'rgba(167, 139, 250, 0.12)',
    glow: 'rgba(167, 139, 250, 0.32)',
    border: 'rgba(167, 139, 250, 0.30)',
    borderHover: 'hover:border-purple-400/60',
    bgLight: 'bg-purple-500/10',
    bgDark: 'bg-purple-500/15',
    textLight: 'text-purple-600',
    textDark: 'text-purple-300',
    ring: 'ring-purple-400/40',
    sphereGradient: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #f3e8ff 28%, #a78bfa 65%, #6d28d9 96%)',
  },
  'baby-blue': {
    name: 'baby-blue',
    label: 'Baby Blue',
    primary: '#60a5fa',
    hex: '#60a5fa',
    light: '#f0f9ff',
    dark: '#2563eb',
    soft: 'rgba(96, 165, 250, 0.12)',
    glow: 'rgba(96, 165, 250, 0.32)',
    border: 'rgba(96, 165, 250, 0.30)',
    borderHover: 'hover:border-blue-400/60',
    bgLight: 'bg-blue-500/10',
    bgDark: 'bg-blue-500/15',
    textLight: 'text-blue-600',
    textDark: 'text-blue-300',
    ring: 'ring-blue-400/40',
    sphereGradient: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #e0f2fe 28%, #60a5fa 65%, #1d4ed8 96%)',
  },
  'mint': {
    name: 'mint',
    label: 'Mint',
    primary: '#34d399',
    hex: '#34d399',
    light: '#ecfdf5',
    dark: '#059669',
    soft: 'rgba(52, 211, 153, 0.12)',
    glow: 'rgba(52, 211, 153, 0.32)',
    border: 'rgba(52, 211, 153, 0.30)',
    borderHover: 'hover:border-emerald-400/60',
    bgLight: 'bg-emerald-500/10',
    bgDark: 'bg-emerald-500/15',
    textLight: 'text-emerald-600',
    textDark: 'text-emerald-300',
    ring: 'ring-emerald-400/40',
    sphereGradient: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #d1fae5 28%, #34d399 65%, #047857 96%)',
  },
  'peach': {
    name: 'peach',
    label: 'Peach',
    primary: '#fb923c',
    hex: '#fb923c',
    light: '#fff7ed',
    dark: '#ea580c',
    soft: 'rgba(251, 146, 60, 0.12)',
    glow: 'rgba(251, 146, 60, 0.32)',
    border: 'rgba(251, 146, 60, 0.30)',
    borderHover: 'hover:border-orange-400/60',
    bgLight: 'bg-orange-500/10',
    bgDark: 'bg-orange-500/15',
    textLight: 'text-orange-600',
    textDark: 'text-orange-300',
    ring: 'ring-orange-400/40',
    sphereGradient: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #ffedd5 28%, #fb923c 65%, #c2410c 96%)',
  },
  'soft-yellow': {
    name: 'soft-yellow',
    label: 'Soft Yellow',
    primary: '#facc15',
    hex: '#facc15',
    light: '#fefce8',
    dark: '#ca8a04',
    soft: 'rgba(250, 204, 21, 0.14)',
    glow: 'rgba(250, 204, 21, 0.32)',
    border: 'rgba(250, 204, 21, 0.30)',
    borderHover: 'hover:border-amber-400/60',
    bgLight: 'bg-amber-500/10',
    bgDark: 'bg-amber-500/15',
    textLight: 'text-amber-700',
    textDark: 'text-amber-300',
    ring: 'ring-amber-400/40',
    sphereGradient: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #fef9c3 28%, #facc15 65%, #a16207 96%)',
  },
};

export type GlassTier =
  | 'light'
  | 'medium'
  | 'deep'
  | 'floating'
  | 'clear'
  | 'frosted'
  | 'crystal'
  | 'liquid';

export const LIQUID_GLASS_TIERS: Record<GlassTier, { className: string; description: string }> = {
  clear: {
    className: 'glass-clear liquid-sheen rounded-xl',
    description: 'Ultra-transparent crystal glass with minimal blur for navigation and floating elements',
  },
  frosted: {
    className: 'glass-frosted liquid-sheen rounded-2xl',
    description: 'Frosted transparent glass with rich background diffusion for main content cards',
  },
  crystal: {
    className: 'glass-crystal liquid-sheen rounded-2xl',
    description: 'Transparent high-index crystal glass with crisp specular edge highlights for hero elements',
  },
  deep: {
    className: 'glass-deep liquid-sheen rounded-2xl',
    description: 'Translucent darker tinted glass with layered depth for modals and prominent containers',
  },
  liquid: {
    className: 'glass-liquid liquid-sheen rounded-2xl',
    description: 'Liquid glass with subtle environmental color dispersion and optical light transmission',
  },
  // Compatibility aliases
  light: {
    className: 'glass-clear liquid-sheen rounded-xl',
    description: 'Translucent, subtle background with micro-blur for secondary chips and inner elements',
  },
  medium: {
    className: 'glass-frosted liquid-sheen rounded-2xl',
    description: 'Primary structural glass tier for cards, information blocks, and interactive modules',
  },
  floating: {
    className: 'glass-crystal liquid-sheen rounded-2xl',
    description: 'Floating glass tier with maximum elevation and ambient specular highlights for navbars and spotlights',
  },
};

export const GLASS_PRESETS = {
  card: {
    dark: 'glass-medium text-slate-100',
    light: 'glass-medium text-slate-900',
  },
  navbar: {
    dark: 'floating-glass text-slate-100',
    light: 'floating-glass text-slate-900',
  },
  button: {
    glassDark: 'glass-light hover:border-slate-600 text-slate-100 backdrop-blur-md transition-all',
    glassLight: 'glass-light hover:border-slate-300 text-slate-800 backdrop-blur-md transition-all',
  },
  pill: {
    dark: 'glass-light text-slate-300',
    light: 'glass-light text-slate-700',
  },
};

