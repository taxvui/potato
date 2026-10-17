import React from 'react';
import { motion } from 'motion/react';
import { Quote, Heart, Compass, Gauge } from 'lucide-react';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';

export const Philosophy: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  const pillars = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: t.philosophy.pillar1Title,
      desc: t.philosophy.pillar1Desc,
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: t.philosophy.pillar2Title,
      desc: t.philosophy.pillar2Desc,
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: t.philosophy.pillar3Title,
      desc: t.philosophy.pillar3Desc,
    },
  ];

  return (
    <Section
      id="philosophy"
      eyebrow={t.philosophy.eyebrow}
      title={t.philosophy.title}
      align="center"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Main Quote Glass Showcase with 3D Tilt & Cursor Glare */}
        <GlassCard
          level="floating"
          padding="lg"
          interactive
          tilt
          glare
          className="relative overflow-hidden text-center py-10 sm:py-14 group shadow-xl hover:shadow-2xl transition-shadow duration-500"
          glowEffect
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25"
            style={{ background: accentConfig.hex }}
          />

          {/* Quote Glyph */}
          <div
            className="inline-flex p-3 rounded-2xl glass-light mb-6 shadow-xs transition-transform duration-300 group-hover:scale-110"
            style={{ color: accentConfig.hex }}
          >
            <Quote className="w-7 h-7" />
          </div>

          {/* The Exact Philosophy Quote */}
          <blockquote className="max-w-3xl mx-auto">
            <p
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug sm:leading-tight tracking-tight mb-8 ${
                isDark ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {t.philosophy.quote}
            </p>
          </blockquote>

          {/* Attribution Tag */}
          <div className="inline-flex flex-col items-center">
            <div
              className={`text-base font-bold tracking-tight ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {t.philosophy.author}
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mt-0.5"
              style={{ color: accentConfig.hex }}
            >
              {t.philosophy.authorTitle}
            </div>
          </div>
        </GlassCard>

        {/* 3 Pillars of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <GlassCard
              key={idx}
              id={`philosophy-pillar-${idx}`}
              level="medium"
              interactive
              tilt
              glare
              padding="md"
              className="flex flex-col justify-between text-left group hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 glass-light transition-transform duration-300 group-hover:scale-105"
                  style={{ color: accentConfig.hex }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className={`text-base font-bold mb-2 tracking-tight ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {pillar.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {pillar.desc}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
};
