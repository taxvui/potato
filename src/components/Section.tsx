import React from 'react';
import { motion } from 'motion/react';
import { SectionId } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useDeviceMotion } from '../hooks/useDeviceMotion';

export interface SectionProps {
  id: SectionId;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  align?: 'left' | 'center';
}

export const Section: React.FC<SectionProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  containerClassName = '',
  align = 'center',
}) => {
  const { theme, accentConfig } = useTheme();
  const { prefersReducedMotion } = useDeviceMotion();
  const isDark = theme === 'dark';

  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div className={`mx-auto max-w-6xl ${containerClassName}`}>
        {/* Header Block with Apple-style smooth fade + blur reveal */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 30, filter: 'blur(8px)' }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          viewport={{ once: true, margin: '-70px' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // cinematic physical ease-out
          }}
          className={`mb-12 sm:mb-16 ${
            align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
          }`}
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 mb-3.5">
              <span
                className={`inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border shadow-xs ${
                  isDark
                    ? `${accentConfig.bgDark} ${accentConfig.textDark} border-slate-700/60`
                    : `${accentConfig.bgLight} ${accentConfig.textLight} border-slate-200`
                }`}
              >
                {eyebrow}
              </span>
            </div>
          )}

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Section Body with staggered fade + blur entrance */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24, filter: 'blur(6px)' }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.85,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
