import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useTheme } from '../hooks/useTheme';
import { useDeviceMotion } from '../hooks/useDeviceMotion';

export interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  magnetic?: boolean;
  className?: string;
  id?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  magnetic = true,
  className = '',
  id,
  disabled,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const { isTouch, prefersReducedMotion } = useDeviceMotion();
  const isDark = theme === 'dark';

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, active: false });

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-medium gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-sm font-medium gap-2 rounded-xl',
    lg: 'px-7 py-3.5 text-base font-semibold gap-2.5 rounded-xl',
  }[size];

  const variantClasses = {
    primary:
      'text-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-white/20' +
      (isDark ? ' shadow-black/30' : ' shadow-slate-400/20'),
    secondary: isDark
      ? 'glass-light hover:bg-white/[0.08] text-slate-100 transition-colors duration-200'
      : 'glass-light hover:bg-white/80 text-slate-800 transition-colors duration-200',
    glass: isDark
      ? 'glass-medium hover:bg-slate-900/80 text-slate-100 transition-colors duration-200'
      : 'glass-medium hover:bg-white/90 text-slate-800 transition-colors duration-200',
    ghost: isDark
      ? 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors duration-150'
      : 'bg-transparent hover:bg-slate-100/70 text-slate-700 hover:text-slate-950 transition-colors duration-150',
    outline: isDark
      ? 'bg-transparent border border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800/40 transition-colors duration-150'
      : 'bg-transparent border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 transition-colors duration-150',
  }[variant];

  // Primary button style leveraging dynamic CSS variable with specular top edge
  const primaryInlineStyle = variant === 'primary' ? {
    backgroundColor: 'var(--color-accent)',
    boxShadow: `0 4px 18px -2px var(--color-accent-glow), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)`,
  } : undefined;

  // Handle magnetic attraction towards cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || isTouch || prefersReducedMotion || disabled || isLoading) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Smooth magnetic pull clamp (max 10px pull)
    const pull = 0.22;
    const maxPull = 10;
    const clampedX = Math.max(-maxPull, Math.min(maxPull, deltaX * pull));
    const clampedY = Math.max(-maxPull, Math.min(maxPull, deltaY * pull));

    setOffset({ x: clampedX, y: clampedY });
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const handleMouseLeave = () => {
    if (isTouch || prefersReducedMotion) return;
    setOffset({ x: 0, y: 0 });
    setCursorPos(prev => ({ ...prev, active: false }));
  };

  return (
    <motion.button
      ref={buttonRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        !isTouch && !prefersReducedMotion && magnetic
          ? { x: offset.x, y: offset.y }
          : undefined
      }
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 22,
        mass: 0.5,
      }}
      whileHover={{ scale: disabled || isLoading || prefersReducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading || prefersReducedMotion ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      style={{
        ...primaryInlineStyle,
        ...style,
      }}
      className={`relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap select-none bg-clip-padding focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {/* Internal Glass Reflection Gliding with Cursor */}
      {!isTouch && !prefersReducedMotion && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-10"
          style={{ opacity: cursorPos.active ? 1 : 0 }}
        >
          <span
            className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, transparent 70%)',
              mixBlendMode: 'overlay',
            }}
          />
        </span>
      )}

      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        iconLeft && (
          <motion.span
            animate={
              !isTouch && !prefersReducedMotion && magnetic
                ? { x: offset.x * 0.2, y: offset.y * 0.2 }
                : undefined
            }
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="shrink-0 relative z-20"
          >
            {iconLeft}
          </motion.span>
        )
      )}

      <motion.span
        animate={
          !isTouch && !prefersReducedMotion && magnetic
            ? { x: offset.x * 0.15, y: offset.y * 0.15 }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative z-20"
      >
        {children}
      </motion.span>

      {!isLoading && iconRight && (
        <motion.span
          animate={
            !isTouch && !prefersReducedMotion && magnetic
              ? { x: offset.x * 0.2, y: offset.y * 0.2 }
              : undefined
          }
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="shrink-0 relative z-20"
        >
          {iconRight}
        </motion.span>
      )}
    </motion.button>
  );
};

