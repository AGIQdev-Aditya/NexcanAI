import React, { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor — High-Performance Precision Optical Reticle Cursor
 * 
 * Features:
 * - Smooth lerped trailing reticle ring with spring damping
 * - Instant zero-lag center laser point
 * - Contextual hover states:
 *   - 'pointer': expands & glows for buttons, links, and clickable triggers
 *   - 'inspect': transforms into technical camera reticle with corner brackets & live coords
 *   - 'click': crisp contract ripple pulse
 * - Automatically hides on touch devices
 * - Non-blocking (pointer-events: none)
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
  const infoRef = useRef(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      // Immediate dot tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element for cursor type
      const target = e.target;
      if (!target) return;

      // Inside modals, inputs, selects, or textareas, use native cursor
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

    // Smooth physics loop for outer reticle
    const updateReticle = () => {
      // Reticle glides toward mouse with smooth lerp
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
          backgroundColor: cursorState === 'inspect' ? '#A7F3D0' : '#F5A882',
          boxShadow: cursorState === 'inspect'
            ? '0 0 8px #A7F3D0, 0 0 16px rgba(167, 243, 208, 0.6)'
            : '0 0 8px #F5A882, 0 0 16px rgba(245, 168, 130, 0.6)',
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
        {/* DEFAULT STATE: Sleek technical minimalist ring */}
        {cursorState === 'default' && (
          <div
            className={`-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#F5A882]/40 transition-all duration-200 flex items-center justify-center ${
              isClicking ? 'scale-75 border-[#F5A882]' : 'scale-100'
            }`}
          >
            {/* Subtle Crosshairs */}
            <div className="absolute w-2 h-[1px] bg-[#F5A882]/30 -left-1" />
            <div className="absolute w-2 h-[1px] bg-[#F5A882]/30 -right-1" />
            <div className="absolute h-2 w-[1px] bg-[#F5A882]/30 -top-1" />
            <div className="absolute h-2 w-[1px] bg-[#F5A882]/30 -bottom-1" />
          </div>
        )}

        {/* POINTER STATE: Magnetic glowing interactive circle on buttons/links */}
        {cursorState === 'pointer' && (
          <div
            className={`-ml-6 -mt-6 w-12 h-12 rounded-full border border-[#F5A882] bg-[#F5A882]/15 backdrop-blur-[2px] shadow-[0_0_20px_rgba(245,168,130,0.35)] transition-all duration-200 animate-pulse ${
              isClicking ? 'scale-90 bg-[#F5A882]/30' : 'scale-110'
            }`}
          />
        )}

        {/* INSPECT STATE: High-precision camera viewfinder reticle with live coords */}
        {cursorState === 'inspect' && (
          <div
            className={`-ml-8 -mt-8 w-16 h-16 rounded-xl border border-dashed border-[#A7F3D0]/70 bg-[#A7F3D0]/10 backdrop-blur-[2px] shadow-[0_0_25px_rgba(167,243,208,0.3)] transition-all duration-200 relative flex items-center justify-center ${
              isClicking ? 'scale-90 border-[#A7F3D0]' : 'scale-100'
            }`}
          >
            {/* Precision corner brackets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#A7F3D0]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#A7F3D0]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#A7F3D0]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#A7F3D0]" />

            {/* Micro coordinate HUD tag */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-[#0E0B0A]/90 border border-[#A7F3D0]/50 text-[9px] font-mono font-bold text-[#A7F3D0] tracking-tighter shadow-md">
              [{coords.x}, {coords.y}] • SCAN
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
