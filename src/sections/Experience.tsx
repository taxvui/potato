import React from 'react';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { EXPERIENCES_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  return (
    <Section
      id="experience"
      eyebrow={t.experience.eyebrow}
      title={t.experience.title}
      subtitle={t.experience.subtitle}
      align="center"
    >
      <div className="relative border-l-2 border-slate-700/30 dark:border-slate-800 ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-8 space-y-10">
        {EXPERIENCES_DATA.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node Icon - High Contrast in Light & Dark Mode */}
            <div
              className="absolute -left-[38px] sm:-left-[46px] top-1 w-7 h-7 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-115 shadow-sm z-10 bg-clip-padding"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${accentConfig.hex}, color-mix(in srgb, ${accentConfig.hex} 40%, #090d16))`
                  : `linear-gradient(135deg, ${accentConfig.hex}, ${accentConfig.dark})`,
                borderColor: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.95)',
                boxShadow: `0 0 14px ${accentConfig.glow}, 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 1.5px rgba(255,255,255,0.8)`,
              }}
            >
              <Briefcase className="w-3.5 h-3.5 text-white drop-shadow-sm" strokeWidth={2.5} />
            </div>

            {/* Date Tag on Desktop (positioned to the left of the line) */}
            <div className="hidden md:block absolute -left-36 top-1.5 text-right w-24 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              {t.experience[`${exp.roleKey}Period` as keyof typeof t.experience]}
            </div>

            {/* Experience Card with 3D Tilt & Cursor Glare */}
            <GlassCard
              id={`experience-card-${exp.id}`}
              level="medium"
              interactive
              tilt
              glare
              padding="md"
              className="group-hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3
                    className={`text-lg font-bold tracking-tight ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {t.experience[exp.roleKey as keyof typeof t.experience]}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {t.experience[`${exp.roleKey}Company` as keyof typeof t.experience]}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t.experience[`${exp.roleKey}Type` as keyof typeof t.experience] || exp.type}
                    </span>
                  </div>
                </div>

                {/* Mobile Period & Location */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="md:hidden flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5" strokeWidth={2.2} style={{ color: 'var(--color-accent)' }} />
                    {t.experience[`${exp.roleKey}Period` as keyof typeof t.experience] || exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2.2} style={{ color: 'var(--color-accent)' }} />
                    {t.experience[`${exp.roleKey}Location` as keyof typeof t.experience] || exp.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.experience[exp.descriptionKey as keyof typeof t.experience]}
              </p>

              {/* Technologies Applied */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-700/20 dark:border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 mr-1">{t.experience.stackLabel}</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono glass-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </Section>
  );
};

