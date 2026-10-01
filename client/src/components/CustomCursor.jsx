import React, { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor — High-Performance Precision Optical Reticle Cursor
 * Styled in the luxury architectural palette (#C9B59C Camel Gold & #16A34A Precision Emerald)
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'inspect'
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  // References for requestAnimationFrame smooth lerp loop
  const mousePos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const reticleRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target;
      if (!target) return;

      const isInputOrModal = target.closest('input, textarea, select, [role="dialog"], .modal-content, [data-native-cursor]');
      if (isInputOrModal) {
        setCursorState('hidden');
        return;
      }

      const inspectTarget = target.closest('[data-cursor="inspect"]');
      const pointerTarget = target.closest('button, a, [role="button"], [data-cursor="pointer"]');

      if (inspectTarget) {
        setCursorState('inspect');
      } else if (pointerTarget) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    let rafId;
    const lerp = (a, b, n) => a + (b - a) * n;

    const updateReticle = () => {
      reticlePos.current.x = lerp(reticlePos.current.x, mousePos.current.x, 0.22);
      reticlePos.current.y = lerp(reticlePos.current.y, mousePos.current.y, 0.22);

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(updateReticle);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    rafId = requestAnimationFrame(updateReticle);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled || cursorState === 'hidden') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Center Instant Precision Dot (Zero Lag) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none will-change-transform z-20"
        style={{
          backgroundColor: cursorState === 'inspect' ? '#16A34A' : '#C9B59C',
          boxShadow: cursorState === 'inspect'
            ? '0 0 8px #16A34A, 0 0 16px rgba(22, 163, 74, 0.6)'
            : '0 0 8px #C9B59C, 0 0 16px rgba(201, 181, 156, 0.6)',
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${isClicking ? 0.6 : 1})`,
        }}
      />

      {/* 2. Smooth Lagged Outer Reticle Ring */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform z-10 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0)`,
        }}
      >
        {/* DEFAULT STATE */}
        {cursorState === 'default' && (
          <div
            className={`-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#C9B59C]/60 transition-all duration-200 flex items-center justify-center ${
              isClicking ? 'scale-75 border-[#C9B59C]' : 'scale-100'
            }`}
          >
            <div className="absolute w-2 h-[1px] bg-[#C9B59C]/40 -left-1" />
            <div className="absolute w-2 h-[1px] bg-[#C9B59C]/40 -right-1" />
            <div className="absolute h-2 w-[1px] bg-[#C9B59C]/40 -top-1" />
            <div className="absolute h-2 w-[1px] bg-[#C9B59C]/40 -bottom-1" />
          </div>
        )}

        {/* POINTER STATE */}
        {cursorState === 'pointer' && (
          <div
            className={`-ml-6 -mt-6 w-12 h-12 rounded-full border border-[#C9B59C] bg-[#C9B59C]/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(201,181,156,0.35)] transition-all duration-200 animate-pulse ${
              isClicking ? 'scale-90 bg-[#C9B59C]/40' : 'scale-110'
            }`}
          />
        )}

        {/* INSPECT STATE */}
        {cursorState === 'inspect' && (
          <div
            className={`-ml-8 -mt-8 w-16 h-16 rounded-xl border border-dashed border-[#16A34A]/70 bg-[#16A34A]/10 backdrop-blur-[2px] shadow-[0_0_25px_rgba(22,163,74,0.3)] transition-all duration-200 relative flex items-center justify-center ${
              isClicking ? 'scale-90 border-[#16A34A]' : 'scale-100'
            }`}
          >
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#16A34A]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#16A34A]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#16A34A]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#16A34A]" />

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-[#1C1815]/95 border border-[#16A34A]/50 text-[9px] font-mono font-bold text-[#16A34A] tracking-tighter shadow-md">
              [{coords.x}, {coords.y}] • SCAN
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
