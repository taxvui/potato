import React from 'react';
import { motion } from 'motion/react';
import { Zap, Layers, Cpu, Award, GraduationCap } from 'lucide-react';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';

export const About: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  const principles = [
    {
      icon: <Zap className="w-5 h-5" strokeWidth={2.4} />,
      title: t.about.p1Title,
      desc: t.about.p1Desc,
    },
    {
      icon: <Layers className="w-5 h-5" strokeWidth={2.4} />,
      title: t.about.p2Title,
      desc: t.about.p2Desc,
    },
    {
      icon: <Cpu className="w-5 h-5" strokeWidth={2.4} />,
      title: t.about.p3Title,
      desc: t.about.p3Desc,
    },
  ];

  return (
    <Section
      id="about"
      eyebrow={t.about.eyebrow}
      title={t.about.title}
      align="center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Narrative Bio & Credentials */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard
            level="medium"
            padding="lg"
            interactive
            tilt
            glare
            className="group hover:shadow-xl transition-shadow duration-300"
          >
            <h3
              className={`text-lg font-bold mb-4 tracking-tight ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {t.about.architecturalMindset}
            </h3>
            <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t.about.bio1}
            </p>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t.about.bio2}
            </p>
          </GlassCard>

          {/* Education & Credentials */}
          <GlassCard
            level="light"
            padding="md"
            interactive
            tilt
            glare
            className="space-y-4 group hover:shadow-xl transition-shadow duration-300"
          >
            <h4
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t.about.educationTitle}
            </h4>

            <div className="flex items-start gap-3.5">
              <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs border bg-clip-padding"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${accentConfig.hex}35, rgba(15,23,42,0.6))`
                    : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                  borderColor: isDark ? `${accentConfig.hex}66` : `${accentConfig.hex}66`,
                  boxShadow: `0 2px 10px ${accentConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.7)`,
                  color: isDark ? accentConfig.hex : accentConfig.dark,
                }}
              >
                <GraduationCap className="w-5 h-5 drop-shadow-xs" strokeWidth={2.4} />
              </div>
              <div>
                <div className={`font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {t.about.degree}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.about.university}</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-2 border-t border-slate-700/20 dark:border-slate-800/80">
              <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs border bg-clip-padding"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${accentConfig.hex}35, rgba(15,23,42,0.6))`
                    : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                  borderColor: isDark ? `${accentConfig.hex}66` : `${accentConfig.hex}66`,
                  boxShadow: `0 2px 10px ${accentConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.7)`,
                  color: isDark ? accentConfig.hex : accentConfig.dark,
                }}
              >
                <Award className="w-5 h-5 drop-shadow-xs" strokeWidth={2.4} />
              </div>
              <div>
                <div className={`font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {t.about.cert1}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.about.awsCredential}</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: 3 Core Principles */}
        <div className="lg:col-span-6 space-y-4">
          <h3
            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {t.about.philosophyTitle}
          </h3>

          {principles.map((item, idx) => (
            <GlassCard
              key={idx}
              id={`about-principle-card-${idx}`}
              level="medium"
              interactive
              tilt
              glare
              padding="md"
              className="flex items-start gap-4 group hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs border bg-clip-padding"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${accentConfig.hex}35, rgba(15,23,42,0.6))`
                    : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                  borderColor: isDark ? `${accentConfig.hex}66` : `${accentConfig.hex}66`,
                  boxShadow: `0 3px 12px ${accentConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.7)`,
                  color: isDark ? accentConfig.hex : accentConfig.dark,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4
                  className={`text-base font-bold mb-1 tracking-tight ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
};
