import React, { useState } from 'react';
import { isPublishedUrl } from '../config/site';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { PROJECTS_DATA } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const { prefersReducedMotion } = useDeviceMotion();
  const isDark = theme === 'dark';

  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Full-Stack' | 'Frontend' | 'Creative'>('All');

  const filterOptions = [
    { key: 'All', label: t.projects.filterAll },
    { key: 'Full-Stack', label: t.projects.filterFullStack },
    { key: 'Frontend', label: t.projects.filterFrontend },
    { key: 'Creative', label: t.projects.filterCreative },
  ] as const;

  const filteredProjects =
    selectedFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  return (
    <Section
      id="projects"
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      subtitle={t.projects.subtitle}
      align="center"
    >
      {/* Category Filters with physical active pill indicator */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {filterOptions.map((opt) => {
          const isActive = selectedFilter === opt.key;
          return (
            <motion.button
              key={opt.key}
              id={`project-filter-${opt.key.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
              onClick={() => setSelectedFilter(opt.key)}
              aria-pressed={isActive}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
              className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-white shadow-xs'
                  : 'glass-light opacity-80 hover:opacity-100 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProjectFilterPill"
                  className="absolute inset-0 rounded-xl shadow-xs"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    boxShadow: `0 2px 10px var(--color-accent-glow)`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 28,
                  }}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-white font-bold' : ''}`}>
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Projects Grid with 3D Tilt, Glare, and Cinematic Image Zoom */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, filter: 'blur(6px)' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, filter: 'blur(0px)' }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, filter: 'blur(4px)' }
              }
              transition={{
                duration: 0.45,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full flex"
            >
              <GlassCard
                id={`project-card-${project.id}`}
                level={project.featured ? 'floating' : 'medium'}
                interactive
                tilt
                glare
                glowEffect={project.featured}
                padding="none"
                className="w-full flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Project Image Preview with Glass Sheen & Cinematic Zoom */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900/10 dark:bg-slate-950/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 will-change-transform"
                    loading="lazy"
                  />

                  {/* Dynamic sheen overlay reflecting across the image on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                    }}
                  />

                  {/* Gradient shadow for text contrast */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: isDark
                        ? 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.85) 100%)'
                        : 'linear-gradient(180deg, transparent 40%, rgba(255, 255, 255, 0.85) 100%)',
                    }}
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span
                      className="inline-block px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-lg backdrop-blur-md shadow-xs"
                      style={{
                        background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                        color: isDark ? '#e2e8f0' : '#1e293b',
                        border: '1px solid rgba(255,255,255,0.25)',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Featured Tag */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-xs"
                        style={{
                          background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                          color: isDark ? accentConfig.hex : accentConfig.dark,
                          border: `1px solid ${isDark ? accentConfig.hex + '77' : accentConfig.dark + '66'}`,
                          boxShadow: `0 2px 8px ${accentConfig.glow}`,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5 drop-shadow-xs" strokeWidth={2.4} />
                        {t.projects.featuredBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3
                      className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                        isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-900 group-hover:text-black'
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t.projects[project.descriptionKey as keyof typeof t.projects] || project.descriptionKey}
                    </p>

                    {/* Impact Metric Highlight */}
                    <div className="p-3 rounded-xl mb-4 text-xs font-mono glass-light">
                      <div className="text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                        {t.projects.impactMetric}
                      </div>
                      <div className="font-semibold" style={{ color: isDark ? accentConfig.hex : accentConfig.dark }}>
                        {project.metrics}
                      </div>
                    </div>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium glass-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Live Demo & GitHub */}
                  <div className="pt-4 border-t border-slate-700/20 dark:border-slate-800/80 flex items-center justify-between gap-3">
                    <GlassButton
                      id={`project-demo-btn-${project.id}`}
                      size="sm"
                      variant="primary"
                      magnetic
                      disabled={!isPublishedUrl(project.demoUrl)}
                      title={!isPublishedUrl(project.demoUrl) ? t.preview.unavailable : undefined}
                      onClick={() => window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
                      iconRight={<ExternalLink className="w-4 h-4" strokeWidth={2.3} />}
                    >
                      {t.projects.viewDemo}
                    </GlassButton>

                    <GlassButton
                      id={`project-code-btn-${project.id}`}
                      size="sm"
                      variant="secondary"
                      magnetic
                      disabled={!isPublishedUrl(project.githubUrl)}
                      title={!isPublishedUrl(project.githubUrl) ? t.preview.unavailable : undefined}
                      onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                      iconLeft={<Github className="w-4 h-4" strokeWidth={2.3} />}
                    >
                      {t.projects.viewCode}
                    </GlassButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};

