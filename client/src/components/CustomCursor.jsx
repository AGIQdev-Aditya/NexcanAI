import React, { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor — Awwwards-grade High-Precision Optical Reticle Cursor
 * Engineered for 60fps hardware-accelerated lerp, multi-surface high-contrast visibility,
 * magnetic hover states, and live telemetry HUD.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'inspect' | 'hidden'
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // References for requestAnimationFrame smooth lerp loop
  const mousePos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const reticleRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only disable if exclusively a pure mobile touchscreen without fine mouse pointer
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice && window.innerWidth < 768) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!hasMoved) setHasMoved(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target;
      if (!target) return;

      const isInput = target.closest('input, textarea, select');
      if (isInput) {
        setCursorState('hidden');
        return;
      }

      const inspectTarget = target.closest('[data-cursor="inspect"], .inspect-surface, canvas, .cursor-crosshair');
      const pointerTarget = target.closest('button, a, [role="button"], [data-cursor="pointer"], .cursor-pointer');

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
      reticlePos.current.x = lerp(reticlePos.current.x, mousePos.current.x, 0.32);
      reticlePos.current.y = lerp(reticlePos.current.y, mousePos.current.y, 0.32);

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
  }, [hasMoved]);

  if (!enabled || !hasMoved || cursorState === 'hidden') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      
      {/* 1. Center Precision Dot (Zero Latency - instant hardware response) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2.5 h-2.5 rounded-full pointer-events-none will-change-transform z-20"
        style={{
          backgroundColor: cursorState === 'inspect' ? '#16A34A' : '#E3845A',
          boxShadow: cursorState === 'inspect'
            ? '0 0 10px #16A34A, 0 0 4px #FFFFFF'
            : '0 0 12px rgba(227, 132, 90, 0.9), 0 0 3px #FFFFFF',
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${isClicking ? 0.6 : 1})`,
        }}
      />

      {/* 2. Smooth Lagged Outer Magnetic Ring */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform z-10"
        style={{
          transform: `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0)`,
        }}
      >
        {/* DEFAULT STATE: Optical reticle with 4 crosshairs */}
        {cursorState === 'default' && (
          <div
            className={`-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#C9B59C] bg-[#C9B59C]/15 backdrop-blur-[1px] shadow-[0_0_12px_rgba(201,181,156,0.3)] transition-transform duration-150 flex items-center justify-center ${
              isClicking ? 'scale-75 border-[#E3845A]' : 'scale-100'
            }`}
          >
            <div className="absolute w-2 h-[1px] bg-[#C9B59C] -left-1" />
            <div className="absolute w-2 h-[1px] bg-[#C9B59C] -right-1" />
            <div className="absolute h-2 w-[1px] bg-[#C9B59C] -top-1" />
            <div className="absolute h-2 w-[1px] bg-[#C9B59C] -bottom-1" />
          </div>
        )}

        {/* POINTER STATE: Magnetic hover expansion with champagne/copper glow */}
        {cursorState === 'pointer' && (
          <div
            className={`-ml-6 -mt-6 w-12 h-12 rounded-full border-2 border-[#E3845A] bg-[#E3845A]/20 backdrop-blur-[2px] shadow-[0_0_25px_rgba(227,132,90,0.5)] transition-transform duration-150 flex items-center justify-center ${
              isClicking ? 'scale-85 bg-[#E3845A]/40' : 'scale-110'
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        )}

        {/* INSPECT STATE: Telecom measurement reticle with live coordinate HUD */}
        {cursorState === 'inspect' && (
          <div
            className={`-ml-8 -mt-8 w-16 h-16 rounded-2xl border-2 border-dashed border-[#16A34A] bg-[#16A34A]/20 backdrop-blur-[2px] shadow-[0_0_30px_rgba(22,163,74,0.45)] transition-transform duration-150 relative flex items-center justify-center ${
              isClicking ? 'scale-85 border-[#16A34A]' : 'scale-100'
            }`}
          >
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#16A34A]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#16A34A]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#16A34A]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#16A34A]" />

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#120704]/95 border border-[#16A34A]/80 text-[9px] font-mono font-bold text-[#16A34A] tracking-tighter shadow-xl">
              [{coords.x}, {coords.y}] • MEASURE
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
