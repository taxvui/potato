import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useTheme } from '../hooks/useTheme';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { GlassTier } from '../styles/theme';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  level?: GlassTier;
  variant?: 'default' | 'elevated' | 'subtle' | 'interactive';
  interactive?: boolean;
  tilt?: boolean;
  glare?: boolean;
  reveal?: boolean;
  glowEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  level,
  variant = 'default',
  interactive = false,
  tilt,
  glare = true,
  reveal = true,
  glowEffect = false,
  padding = 'md',
  id,
  style,
  ...rest
}) => {
  const { theme, accentConfig } = useTheme();
  const { isTouch, prefersReducedMotion } = useDeviceMotion();
  const isDark = theme === 'dark';

  const cardRef = useRef<HTMLDivElement>(null);
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0, active: false });
  const [tiltState, setTiltState] = useState({ rotateX: 0, rotateY: 0 });

  // Determine effective glass tier
  const resolvedLevel: GlassTier = level || (
    variant === 'subtle' ? 'light' :
    variant === 'elevated' ? 'floating' :
    'medium'
  );

  const isInteractive = interactive || variant === 'interactive';
  const shouldTilt = tilt ?? isInteractive;

  const paddingClasses = {
    none: '',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  }[padding];

  const levelClasses: Record<GlassTier, string> = {
    clear: 'glass-clear',
    frosted: 'glass-frosted',
    crystal: 'glass-crystal',
    deep: 'glass-deep',
    liquid: 'glass-liquid',
    light: 'glass-clear',
    medium: 'glass-frosted',
    floating: 'glass-crystal',
  };

  const textColorClass = isDark ? 'text-slate-100' : 'text-slate-900';

  // Physical subtle reflection shift (Requirement 13: moves only a few pixels, feels like light source moving across glass)
  const rect = cardRef.current?.getBoundingClientRect();
  const normX = rect && rect.width > 0 ? (localMouse.x / rect.width - 0.5) * 2 : 0;
  const normY = rect && rect.height > 0 ? (localMouse.y / rect.height - 0.5) * 2 : 0;
  const reflectionShiftX = normX * 14;
  const reflectionShiftY = normY * 14;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReducedMotion || !isInteractive) return;
    const currentRect = cardRef.current?.getBoundingClientRect();
    if (!currentRect) return;
    const x = e.clientX - currentRect.left;
    const y = e.clientY - currentRect.top;
    setLocalMouse({ x, y, active: true });

    if (shouldTilt) {
      // Gentle, subtle physical tilt: max 3.5 degrees (anti-slop, realistic)
      const nX = (x / currentRect.width - 0.5) * 2;
      const nY = (y / currentRect.height - 0.5) * 2;
      setTiltState({
        rotateX: -nY * 3.5,
        rotateY: nX * 3.5,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouch || prefersReducedMotion) return;
    setLocalMouse(prev => ({ ...prev, active: false }));
    setTiltState({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={
        reveal
          ? prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 22, filter: 'blur(6px)' }
          : undefined
      }
      whileInView={
        reveal
          ? prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: 'blur(0px)' }
          : undefined
      }
      viewport={reveal ? { once: true, margin: '-40px' } : undefined}
      animate={
        isInteractive && !prefersReducedMotion && !isTouch
          ? {
              rotateX: tiltState.rotateX,
              rotateY: tiltState.rotateY,
              y: localMouse.active ? -3 : 0,
            }
          : undefined
      }
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 24,
        mass: 0.5,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        isolation: 'isolate',
        ...style,
      }}
      className={`relative liquid-sheen rounded-2xl bg-clip-padding ${levelClasses[resolvedLevel]} ${textColorClass} ${paddingClasses} ${
        isInteractive ? 'cursor-pointer' : ''
      } ${className}`}
      {...rest}
    >
      {/* Dynamic Cursor Light Reflection (moves smoothly within card boundaries without spilling over border) */}
      {glare && isInteractive && !isTouch && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-500 z-1"
          style={{ opacity: localMouse.active ? 1 : 0.4 }}
        >
          <div
            className="absolute -inset-10 rounded-[inherit] pointer-events-none transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${reflectionShiftX}px, ${reflectionShiftY}px)`,
              background: isDark
                ? 'radial-gradient(ellipse 75% 55% at 32% 26%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)'
                : 'radial-gradient(ellipse 75% 55% at 32% 26%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.06) 40%, transparent 70%)',
              mixBlendMode: isDark ? 'screen' : 'overlay',
            }}
          />
        </div>
      )}

      {/* Internal interactive sheen contained strictly within border */}
      {isInteractive && !isTouch && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-1"
          style={{
            opacity: localMouse.active ? 0.35 : 0,
            background: `radial-gradient(350px circle at ${localMouse.x}px ${localMouse.y}px, ${accentConfig.glow}, transparent 70%)`,
          }}
        />
      )}

      {/* Ambient soft glow BEHIND the card, keeping outer edges razor-sharp */}
      {glowEffect && (
        <div
          className="pointer-events-none absolute -inset-2 rounded-[inherit] opacity-25 blur-xl -z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${accentConfig.glow}, transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
