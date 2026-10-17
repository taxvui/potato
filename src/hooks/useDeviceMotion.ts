import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export function useDeviceMotion(trackPointer = false) {
  const prefersReduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // -1 to 1 normalized
  const lastPos = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    // Check if device is touch-primary or has no fine pointer
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isHoverNone = window.matchMedia('(hover: none)').matches;
      const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(isCoarse || (isHoverNone && hasTouchEvents));
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });

    // Track smoothed mouse position on desktop only with rAF throttling
    const handleMouseMove = (e: MouseEvent) => {
      if (!trackPointer || prefersReduced || isTouch || ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

        // Only update if moved noticeably to avoid micro-jitter and excessive re-renders
        if (
          Math.abs(normalizedX - lastPos.current.x) > 0.015 ||
          Math.abs(normalizedY - lastPos.current.y) > 0.015
        ) {
          lastPos.current = { x: normalizedX, y: normalizedY };
          setMousePos({ x: normalizedX, y: normalizedY });
        }
        ticking.current = false;
      });
    };

    if (trackPointer) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReduced, isTouch, trackPointer]);

  return {
    isTouch,
    prefersReducedMotion: Boolean(prefersReduced),
    mousePos,
  };
}


