import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Server, Wrench, CheckCircle2 } from 'lucide-react';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const { prefersReducedMotion } = useDeviceMotion();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<number | 'all'>('all');

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'frontend':
        return <Layout className="w-5 h-5" strokeWidth={2.3} />;
      case 'backend':
        return <Server className="w-5 h-5" strokeWidth={2.3} />;
      case 'tools':
      default:
        return <Wrench className="w-5 h-5" strokeWidth={2.3} />;
    }
  };

  const displayedCategories =
    activeTab === 'all'
      ? SKILL_CATEGORIES
      : [SKILL_CATEGORIES[activeTab]];

  return (
    <Section
      id="skills"
      eyebrow={t.skills.eyebrow}
      title={t.skills.title}
      subtitle={t.skills.subtitle}
      align="center"
    >
      {/* Category Tabs with Apple-style smooth sliding pill */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <motion.button
          id="skills-tab-all"
          onClick={() => setActiveTab('all')}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
          className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
            activeTab === 'all'
              ? 'text-white shadow-xs'
              : 'glass-light opacity-80 hover:opacity-100 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {activeTab === 'all' && (
            <motion.div
              layoutId="activeSkillTabPill"
              className="absolute inset-0 rounded-xl"
              style={{
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 2px 10px var(--color-accent-glow)',
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 28,
              }}
            />
          )}
          <span className={`relative z-10 ${activeTab === 'all' ? 'text-white font-bold' : ''}`}>
            {t.projects.filterAll}
          </span>
        </motion.button>

        {SKILL_CATEGORIES.map((cat, idx) => {
          const isActive = activeTab === idx;
          return (
            <motion.button
              key={cat.titleKey}
              id={`skills-tab-${cat.titleKey}`}
              onClick={() => setActiveTab(idx)}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
              className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-white shadow-xs'
                  : 'glass-light opacity-80 hover:opacity-100 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSkillTabPill"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    boxShadow: '0 2px 10px var(--color-accent-glow)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 28,
                  }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-1.5 ${isActive ? 'text-white font-bold' : ''}`}>
                {getCategoryIcon(cat.titleKey)}
                <span>{t.skills[cat.titleKey as keyof typeof t.skills] || cat.titleKey}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid: 3 Clean Columns with subtle tilt, reflection & fluid progress bars */}
      <motion.div
        layout
        className={`grid grid-cols-1 ${
          displayedCategories.length === 1 ? 'max-w-xl mx-auto w-full' : 'md:grid-cols-3'
        } gap-6`}
      >
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.titleKey}
              layout
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, filter: 'blur(6px)' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, filter: 'blur(0px)' }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, filter: 'blur(4px)' }
              }
              transition={{
                duration: 0.45,
                delay: catIdx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full flex"
            >
              <GlassCard
                id={`skill-category-card-${cat.titleKey}`}
                level="medium"
                interactive
                tilt
                glare
                padding="lg"
                className="w-full flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-700/20 dark:border-slate-800/80">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs border bg-clip-padding"
                      style={{
                        background: isDark
                          ? `linear-gradient(135deg, ${accentConfig.hex}35, rgba(15,23,42,0.65))`
                          : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                        borderColor: isDark ? `${accentConfig.hex}66` : `${accentConfig.hex}66`,
                        boxShadow: `0 3px 12px ${accentConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.7)`,
                        color: isDark ? accentConfig.hex : accentConfig.dark,
                      }}
                    >
                      {getCategoryIcon(cat.titleKey)}
                    </div>
                    <div>
                      <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {t.skills[cat.titleKey as keyof typeof t.skills] || cat.titleKey}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        {cat.skills.length} {t.skills.coreTech}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" strokeWidth={2.4} style={{ color: 'var(--color-accent)' }} />
                            {skill.name}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">{skill.level}%</span>
                        </div>

                        {/* Progress Track with smooth physical liquid fill */}
                        <div className="h-1.5 w-full rounded-full overflow-hidden glass-light">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: prefersReducedMotion ? 0.2 : 0.9,
                              delay: prefersReducedMotion ? 0 : 0.15 + sIdx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: 'var(--color-accent)',
                              boxShadow: '0 0 8px var(--color-accent-glow)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
