import React, { useState, useRef } from 'react';
import {
  Sliders,
  Cpu,
  Layers,
  Scan,
  Maximize2,
  Minimize2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Terminal,
  Activity,
  ChevronDown,
  Eye,
  Crosshair,
  Compass,
  FileCheck
} from 'lucide-react';

export default function OryzoShowcase({ onLaunchInspector, onQuickDemo }) {
  // 1. AI Temperature & Tolerance Calibration State
  const [selectedTemp, setSelectedTemp] = useState('0.05'); // '0.05' | '0.10' | '0.25'

  // 2. Smart Flip Card State (Front: Raw Optical Feed vs Back: Neural Inference Map)
  const [isFlipped, setIsFlipped] = useState(false);
  const [customFlawText, setCustomFlawText] = useState('QFP-48 SOLDER BRIDGE');
  const [isScrambling, setIsScrambling] = useState(false);

  // 3. Zoom Reticle Magnification State (10x to 100x)
  const [zoomLevel, setZoomLevel] = useState(40);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // 4. Parallax tilt for the 3D specimen
  const [waferTilt, setWaferTilt] = useState({ x: 0, y: 0 });
  const [activeCardPrompt, setActiveCardPrompt] = useState('CAN YOU RUN SUB-PIXEL INFERENCE?');

  // Tolerance config presets
  const tempConfig = {
    '0.05': {
      title: 'Ultra-Precision Class 3',
      tolerance: '±0.05 mm',
      target: 'Aerospace NDT & Medical Implants',
      f1Score: '99.8%',
      fpy: '94.2%',
      nyquist: '0.025 mm / pixel',
      barColor: 'from-[#FFFFFF] via-[#E3845A] to-[#A74A21]',
      progressWidth: '98%',
    },
    '0.10': {
      title: 'Balanced Production Mode',
      tolerance: '±0.10 mm',
      target: 'High-Volume SMT Electronics',
      f1Score: '99.4%',
      fpy: '98.6%',
      nyquist: '0.050 mm / pixel',
      barColor: 'from-[#E3845A] to-[#A74A21]',
      progressWidth: '76%',
    },
    '0.25': {
      title: 'High-Throughput Casting',
      tolerance: '±0.25 mm',
      target: 'CNC Heavy Machined Enclosures',
      f1Score: '98.9%',
      fpy: '99.5%',
      nyquist: '0.125 mm / pixel',
      barColor: 'from-[#A74A21] to-[#3D180C]',
      progressWidth: '45%',
    },
  }[selectedTemp];

  const handleWaferMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setWaferTilt({ x: y, y: x });
  };

  const handleWaferMouseLeave = () => {
    setWaferTilt({ x: 0, y: 0 });
  };

  // Flip trigger with cipher animation
  const triggerFlip = () => {
    setIsFlipped(!isFlipped);
    setIsScrambling(true);
    setTimeout(() => setIsScrambling(false), 500);
  };

  // Ruler tick marks array (0 to 280 mm)
  const rulerTicks = Array.from({ length: 29 }, (_, i) => i * 10);

  return (
    <div className="bg-[#120704] text-[#FAF9F6] selection:bg-[#E3845A] selection:text-[#120704] font-sans overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          STAGE 1: THE ICONIC CUTTING MAT HERO STAGE (ORYZO.AI HERO)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-[#3D180C] bg-[#120704] overflow-hidden">
        
        {/* Background Warm Light Leaks */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-b from-[#E3845A]/15 via-[#A74A21]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#16A34A]/5 blur-[120px] pointer-events-none rounded-full" />

        {/* Top Spec Header Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#D1B8AE] pb-6 border-b border-[#3D180C]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-pulse" />
            <span className="font-bold text-[#FFFFFF] tracking-wider">NEXCAN OPTICAL SPECIFICATION</span>
            <span className="text-[#3D180C]">|</span>
            <span className="hidden sm:inline">ARCHITECTURE // REV 2.4</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-[11px] text-[#D1B8AE]">IPC-A-610 CLASS 3 COMPLIANT</span>
            <span className="px-3 py-1 rounded-full bg-[#1B0C07] border border-[#E3845A]/40 text-[#E3845A] font-bold text-[10px]">
              • MODEL: NEXCAN-1 AOI
            </span>
          </div>
        </div>

        {/* Central Cutting Mat Worksurface */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-8">
          
          {/* Giant Title Backdrop */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono tracking-[0.25em] text-[#E3845A] uppercase font-bold mb-2">
                MADE FOR ACCURACY. BUILT FOR PRODUCTION LINES.
              </div>
              <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                NEXCAN
              </h1>
            </div>
            <div className="max-w-md text-xs sm:text-sm text-[#D1B8AE] font-mono leading-relaxed pb-1">
              Designed to detect, insulate, and verify down to 0.05mm. Nexcan makes every single manufactured unit feel considered and infallible.
            </div>
          </div>

          {/* THE CUTTING MAT (Green Precision Grid with Millimeter Rulers) */}
          <div
            onMouseMove={handleWaferMouseMove}
            onMouseLeave={handleWaferMouseLeave}
            className="relative w-full aspect-[16/9] max-h-[580px] rounded-3xl bg-[#173022] border-4 border-[#254A34] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center p-6 select-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
            }}
          >
            {/* Top Millimeter Ruler Axis */}
            <div className="absolute top-0 left-12 right-0 h-6 border-b border-[#2D5A3F] flex items-center justify-between px-2 font-mono text-[9px] text-[#A3C9B0] opacity-80 pointer-events-none">
              {rulerTicks.filter((_, i) => i % 2 === 0).map((tick) => (
                <span key={`top-${tick}`} className="flex flex-col items-center">
                  <span>{tick}</span>
                  <span className="w-[1px] h-2 bg-[#A3C9B0]" />
                </span>
              ))}
            </div>

            {/* Left Millimeter Ruler Axis */}
            <div className="absolute top-6 bottom-0 left-0 w-8 border-r border-[#2D5A3F] flex flex-col items-center justify-between py-2 font-mono text-[9px] text-[#A3C9B0] opacity-80 pointer-events-none">
              {rulerTicks.filter((_, i) => i % 2 === 0).map((tick) => (
                <span key={`left-${tick}`} className="flex items-center space-x-1">
                  <span>{tick}</span>
                  <span className="h-[1px] w-2 bg-[#A3C9B0]" />
                </span>
              ))}
            </div>

            {/* Diagonal Cutting Guides (30° / 45° / 60°) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white transform rotate-[30deg] origin-top-left" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white transform rotate-[45deg] origin-top-left" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white transform rotate-[60deg] origin-top-left" />
            </div>

            {/* CENTRAL SPECIMEN: 300mm Silicon Wafer / Telecentric Workpiece with 3D Parallax */}
            <div
              className="relative z-10 transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(900px) rotateX(${waferTilt.x}deg) rotateY(${waferTilt.y}deg)`,
              }}
            >
              {/* Outer Silicon Wafer Disc */}
              <div className="w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#3D251A] via-[#8C4A2B] to-[#D97D54] p-[3px] shadow-[0_30px_60px_rgba(0,0,0,0.7)] relative flex items-center justify-center cursor-pointer group">
                
                {/* Surface Concentric Tracks and Laser Reticle */}
                <div className="w-full h-full rounded-full bg-[#1F110B] relative flex items-center justify-center overflow-hidden border border-[#D97D54]/50">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,132,90,0.3)_0,transparent_70%)]" />
                  
                  {/* Wafer Dies Circuit Pattern */}
                  <div className="absolute inset-0 radar-grid opacity-35" />

                  {/* Concentric Gold Rings */}
                  <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#E3845A]/40" />
                  <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-dashed border-[#E3845A]/60 animate-spin-slow" />
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#16A34A]/50" />

                  {/* Center Telecentric Camera Reticle */}
                  <div className="w-12 h-12 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center relative shadow-[0_0_15px_#FFFFFF]">
                    <div className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping" />
                    <div className="absolute w-8 h-[1.5px] bg-[#FFFFFF] pointer-events-none" />
                    <div className="absolute h-8 w-[1.5px] bg-[#FFFFFF] pointer-events-none" />
                  </div>

                  {/* Detected Anomaly Badge on Wafer */}
                  <div className="absolute bottom-6 px-3 py-1 rounded-md bg-[#120704]/90 border border-[#E3845A] text-[10px] font-mono text-[#FFFFFF] shadow-lg flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3845A] animate-ping" />
                    <span>DEFECT [D-04]: VOID 0.05mm</span>
                  </div>
                </div>

                {/* Outer Reticle Crosshairs */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-[#E3845A]" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-[#E3845A]" />
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-[1px] w-6 bg-[#E3845A]" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-[1px] w-6 bg-[#E3845A]" />
              </div>
            </div>

            {/* Bottom-Left Glassmorphic Badge (Like Oryzo.ai Lusion Card) */}
            <div className="absolute bottom-5 left-10 max-w-xs p-5 rounded-2xl bg-[#120704]/80 backdrop-blur-xl border border-white/10 shadow-2xl text-left hidden sm:block z-20">
              <div className="text-[10px] font-mono font-bold text-[#E3845A] uppercase tracking-wider mb-1">
                DESIGNED BY TEAM NEXUS FOUR
              </div>
              <h3 className="text-sm font-bold text-white uppercase leading-snug">
                The world's most unnecessarily sophisticated optical inspection platform.
              </h3>
              <p className="text-[11px] text-[#D1B8AE] mt-2 font-mono leading-relaxed">
                Sub-millimeter neural tensors calibrated for zero-escape manufacturing cleanrooms.
              </p>
            </div>

            {/* Bottom-Right Floating Video / Trigger Pill */}
            <div className="absolute bottom-5 right-6 z-20">
              <button
                onClick={onLaunchInspector}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(227,132,90,0.4)] flex items-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>LAUNCH TEST BENCH</span>
              </button>
            </div>

          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-xs font-mono text-[#D1B8AE]/70">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3845A]" />
            <span>OPTICAL FIELD: 300MM WAFER CHUCK</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[#E3845A] font-bold animate-bounce cursor-pointer">
            <ChevronDown className="w-4 h-4" />
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
          </div>
          <div>ISO-9001:2015 SECTION 8.5.1</div>
        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 2: "SO PRECISE, IT'S AUTONOMOUS" PARALLAX STAGE (FRAME 18s & 22s)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-28 border-b border-[#3D180C] bg-[#120704] relative overflow-hidden">
        
        {/* Giant Scrolling Typographic Backdrop */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap overflow-hidden pointer-events-none select-none opacity-10">
          <span className="text-[15vw] font-black uppercase text-white tracking-tighter block animate-conveyor">
            SO PRECISE, IT'S AUTONOMOUS • SO PRECISE, IT'S AUTONOMOUS • 
          </span>
        </div>

        {/* Ambient Amber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E3845A]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="sub1 text-[#E3845A] mb-3 flex items-center justify-center space-x-2">
            <Compass className="w-4 h-4 text-[#E3845A]" />
            <span>SUB-PIXEL INDUSTRIAL PRECISION</span>
          </div>
          
          <h2 className="text-3xl sm:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            SO PRECISE, <br />
            <span className="text-[#E3845A]">IT'S AUTONOMOUS</span>
          </h2>
          
          <p className="text-xs sm:text-base text-[#D1B8AE] mt-4 max-w-xl mx-auto font-mono">
            Optical inspection without human cognitive fatigue. Real-time sub-millimeter tensors isolate micron-level surface flaws in 14ms.
          </p>

          {/* Central Dashed Alignment Reticle Frame (Frame 18s) */}
          <div className="relative mt-12 max-w-md mx-auto aspect-square rounded-3xl border-2 border-dashed border-[#E3845A]/70 p-6 flex flex-col items-center justify-between bg-[#1B0C07]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            
            {/* Corner Alignment Crosshairs */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#E3845A]" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#E3845A]" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#E3845A]" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#E3845A]" />

            {/* Specimen Header */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-[#D1B8AE]">
              <span>SPECIMEN: WF-0942</span>
              <span className="text-[#16A34A] font-bold">120 FPS ONLINE</span>
            </div>

            {/* 3D Rotating Inspection Object */}
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-[#E3845A] via-[#8C4A2B] to-[#3D180C] p-[2px] shadow-[0_0_40px_rgba(227,132,90,0.35)] flex items-center justify-center my-4">
              <div className="w-full h-full rounded-full bg-[#120704] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 radar-grid opacity-30" />
                <div className="w-28 h-28 rounded-full border border-dashed border-[#E3845A] animate-spin-slow" />
                <div className="w-16 h-16 rounded-full border border-[#16A34A]/80 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                </div>
              </div>
            </div>

            {/* Interactive Query Input Bar (Frame 22s) */}
            <div className="w-full p-2.5 rounded-xl bg-[#120704] border border-[#3D180C] flex items-center justify-between gap-2">
              <div className="text-left overflow-hidden">
                <span className="text-[10px] font-mono text-[#E3845A] font-bold block">HEY @NEXCAN:</span>
                <span className="text-xs font-mono text-white truncate block">{activeCardPrompt}</span>
              </div>
              <button
                onClick={onLaunchInspector}
                className="px-3.5 py-1.5 rounded-lg bg-[#E3845A] hover:bg-[#D97D54] text-white font-bold text-xs uppercase shadow transition-transform hover:scale-105 cursor-pointer shrink-0"
              >
                INFER
              </button>
            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 3: CIRCULARITY & SUB-MILLIMETER BLUEPRINT (FRAME 32s & 38s)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-28 border-b border-[#3D180C] bg-[#120704] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Blueprint Narrative (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="w-12 h-12 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex items-center justify-center text-[#E3845A] shadow-md">
                <Crosshair className="w-6 h-6 text-[#E3845A]" />
              </div>

              <div>
                <div className="sub1 text-[#E3845A] mb-1">GEOMETRIC PERFECTION</div>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                  SUB-MILLIMETER <br />
                  <span className="text-[#E3845A]">TOLERANCE,</span> <br />
                  SERIOUSLY.
                </h2>
              </div>

              <p className="text-sm text-[#D1B8AE] leading-relaxed font-mono">
                Our vision models recalibrate component bounding coordinates with disturbing levels of attention to detail — 0.05mm sub-pixel Nyquist resolution, just because quality demands it.
              </p>

              <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] space-y-2">
                <div className="text-[10px] font-mono text-[#E3845A] uppercase font-bold tracking-wider">
                  OPTICAL BENCHMARK
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  NOW 99.4% F1 RECOGNITION
                </div>
                <div className="text-xs text-[#16A34A] font-mono font-semibold">
                  ↑ 37.9% MORE PRECISE THAN IPC-A-610 INDUSTRIAL STANDARD
                </div>
              </div>

              {/* Mathematical Circularity Formulation */}
              <div className="pt-2 border-t border-[#3D180C]">
                <div className="text-[10px] font-mono text-[#D1B8AE] uppercase mb-1">
                  CIRCULARITY COPLANARITY METRIC (CIRCLE = 1.0)
                </div>
                <div className="flex items-center space-x-3 text-sm font-mono text-white bg-[#120704] p-3 rounded-xl border border-[#3D180C]">
                  <span className="text-lg font-bold text-[#E3845A]">C = </span>
                  <div className="inline-flex flex-col items-center">
                    <span className="border-b border-[#E3845A] px-2 text-xs">4π · Area</span>
                    <span className="text-xs">Perimeter²</span>
                  </div>
                  <span className="text-xs text-[#D1B8AE] ml-auto">RoPE: Perimeter Optimization</span>
                </div>
              </div>

            </div>

            {/* Right: Chromatic Glowing Wireframe Blueprint (7 cols - Frame 38s) */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#1B0C07] border border-[#3D180C] relative shadow-2xl overflow-hidden">
              
              {/* Subtle Grid in Background */}
              <div className="absolute inset-0 radar-grid opacity-25" />

              <div className="relative aspect-[4/3] w-full flex items-center justify-center">
                
                {/* SVG Vector Hologram Illustration with Chromatic Aberration */}
                <svg className="w-full h-full max-h-[380px]" viewBox="0 0 500 400" fill="none">
                  {/* Concentric Measurement Circles */}
                  <circle cx="250" cy="200" r="140" stroke="#E3845A" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <circle cx="250" cy="200" r="110" stroke="#16A34A" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="250" cy="200" r="80" stroke="#E3845A" strokeWidth="2" opacity="0.8" />
                  <circle cx="250" cy="200" r="30" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />

                  {/* Radiating Angle Guidelines */}
                  <line x1="110" y1="200" x2="390" y2="200" stroke="#D1B8AE" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="250" y1="60" x2="250" y2="340" stroke="#D1B8AE" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

                  {/* 8-Node Bounding Box with Orange Anchor Handles */}
                  <rect x="170" y="120" width="160" height="160" stroke="#E3845A" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.9" />
                  
                  {/* 8 Orange Anchor Handles */}
                  <rect x="166" y="116" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="246" y="116" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="326" y="116" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="166" y="196" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="326" y="196" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="166" y="276" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="246" y="276" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="326" y="276" width="8" height="8" fill="#E3845A" stroke="#FFFFFF" strokeWidth="1" />

                  {/* Crosshair Center */}
                  <circle cx="250" cy="200" r="3" fill="#FFFFFF" />

                  {/* Telemetry Labels */}
                  <text x="175" y="110" fill="#E3845A" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    ROI BOUNDING TENSOR: [170, 120, 330, 280]
                  </text>
                  <text x="175" y="300" fill="#16A34A" fontSize="9" fontFamily="monospace">
                    CIRCULARITY RESIDUAL DELTA: 0.012mm
                  </text>
                </svg>

              </div>

              {/* Bottom Spec Footer */}
              <div className="mt-4 pt-4 border-t border-[#3D180C] flex items-center justify-between text-xs font-mono text-[#D1B8AE]">
                <span>IoU THRESHOLD: ≥ 0.85</span>
                <span className="text-[#E3845A] font-bold">SUB-PIXEL QUANTIZATION: 1/16px</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 4: ORYZO-INSPIRED SENSITIVITY CALIBRATION SLIDER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-[#3D180C] relative overflow-hidden bg-[#120704]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="sub1 text-[#E3845A] mb-2 flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#E3845A]" />
                <span>DYNAMIC CALIBRATION PROTOCOL // REVISION 2.4</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
                AI Tolerance &amp; Sensitivity Slider
              </h2>
            </div>
            <div className="sub2 text-[#D1B8AE] max-w-sm text-left md:text-right">
              Adaptive neural thresholding calibrates detection stringency according to IPC-A-610 Class 1, 2, or 3 mandates.
            </div>
          </div>

          <div className="o-dashline mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Temperature Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-[#D1B8AE] uppercase tracking-wider mb-2">
                Select Active Optical Precision Level:
              </div>

              {[
                { id: '0.05', label: 'Ultra-Precision', tol: 'T = 0.05 mm', desc: 'Zero defect tolerance. Rejects sub-millimeter solder voids and micro-hairline cracks.' },
                { id: '0.10', label: 'Balanced Yield', tol: 'T = 0.10 mm', desc: 'Optimized standard for consumer electronics and automotive PCB assemblies.' },
                { id: '0.25', label: 'High Throughput', tol: 'T = 0.25 mm', desc: 'Permissive baseline for raw structural castings and high-speed CNC deburring.' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTemp(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedTemp === item.id
                      ? 'border-[#E3845A] bg-[#1B0C07] shadow-xl shadow-[#E3845A]/15 ring-1 ring-[#E3845A]'
                      : 'border-[#3D180C] bg-[#120704] hover:border-[#E3845A]/40 hover:bg-[#1B0C07]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-[#FFFFFF]">{item.label}</span>
                    <span className="font-mono text-xs text-[#E3845A] font-bold bg-[#E3845A]/10 px-2 py-0.5 rounded border border-[#E3845A]/30">
                      {item.tol}
                    </span>
                  </div>
                  <p className="text-xs text-[#D1B8AE] leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Right: Dynamic Telemetry Display (7 cols) */}
            <div className="lg:col-span-7 p-7 rounded-3xl bg-[#1B0C07] border border-[#3D180C] shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D180C]">
                <div>
                  <span className="sub1 text-[#E3845A]">CALIBRATION ACTIVE</span>
                  <h3 className="text-xl font-bold text-[#FFFFFF] mt-0.5">{tempConfig.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#D1B8AE] block">TOLERANCE THRESHOLD</span>
                  <span className="text-xl font-extrabold text-[#FFFFFF] font-mono">{tempConfig.tolerance}</span>
                </div>
              </div>

              {/* Progress Gradient Track */}
              <div className="my-6">
                <div className="flex justify-between text-[11px] font-mono text-[#D1B8AE] mb-2">
                  <span>SENSITIVITY MATRIX</span>
                  <span>F1 ACCURACY: <strong className="text-white">{tempConfig.f1Score}</strong></span>
                </div>
                <div className="w-full bg-[#120704] h-3 rounded-full overflow-hidden border border-[#3D180C] p-[1px]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${tempConfig.barColor} transition-all duration-500`}
                    style={{ width: tempConfig.progressWidth }}
                  />
                </div>
              </div>

              {/* Parameter Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C]">
                  <span className="text-[10px] font-mono text-[#D1B8AE] block">APPLICATION TARGET</span>
                  <span className="text-xs font-bold text-[#FFFFFF] leading-tight mt-1 block">{tempConfig.target}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C]">
                  <span className="text-[10px] font-mono text-[#D1B8AE] block">FIRST-PASS YIELD</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono leading-tight mt-1 block">{tempConfig.fpy}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C] col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-[#D1B8AE] block">OPTICAL RESOLUTION</span>
                  <span className="text-xs font-bold text-[#E3845A] font-mono leading-tight mt-1 block">{tempConfig.nyquist}</span>
                </div>
              </div>

              {/* Interactive Calibration Action */}
              <div className="mt-6 pt-4 border-t border-[#3D180C] flex items-center justify-between">
                <span className="text-xs font-mono text-[#D1B8AE]">
                  Ready to test with active parameter set?
                </span>
                <button
                  onClick={onLaunchInspector}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-white font-bold text-xs uppercase shadow-md flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <span>Apply to Inspector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 5: SMART FLIP ANOMALY DECODER (ORYZO 3D CARD)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-[#3D180C] bg-[#120704] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="sub1 text-[#E3845A] mb-2 flex items-center justify-center space-x-2">
            <Scan className="w-4 h-4 text-[#E3845A]" />
            <span>OPTICAL TELECENTRIC FLIP DECODER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
            Smart Neural Anomaly Flip
          </h2>
          <p className="text-xs sm:text-sm text-[#D1B8AE] mt-3 max-w-xl mx-auto">
            Experience the dual-state transformation: raw telecentric camera exposure flipped instantaneously into an annotated neural segmentation tensor.
          </p>

          <div className="o-dashline my-10" />

          {/* Interactive 3D Flipper Card */}
          <div className="relative max-w-xl mx-auto perspective-1000 min-h-[380px]">
            
            <div
              className={`w-full h-full rounded-3xl transition-transform duration-700 preserve-3d p-1 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* FRONT: RAW OPTICAL CAPTURE */}
              <div className="w-full h-full rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-8 backface-hidden shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D1B8AE] pb-4 border-b border-[#3D180C]">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#D1B8AE]" />
                      <span>STATE 01: RAW SENSOR CAPTURE</span>
                    </span>
                    <span>EXP: 1/2400s • ISO 100</span>
                  </div>

                  <div className="my-8 py-8 px-4 rounded-2xl bg-[#120704] border border-[#3D180C] relative overflow-hidden">
                    <div className="text-xs font-mono text-[#D1B8AE]/60 uppercase tracking-widest mb-1">
                      ANOMALY IDENTIFIER QUERY:
                    </div>
                    <input
                      type="text"
                      value={customFlawText}
                      onChange={(e) => setCustomFlawText(e.target.value)}
                      placeholder="Enter component anomaly name..."
                      className="w-full bg-transparent text-center font-mono font-bold text-lg text-[#FFFFFF] focus:outline-none border-b border-[#3D180C] focus:border-[#E3845A] py-1"
                    />
                    <div className="text-[10px] font-mono text-[#E3845A] mt-2">
                      RAW TELECENTRIC PHOTONS AWAITING NEURAL TENSOR RUN
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={triggerFlip}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E3845A]/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>FLIP // RUN NEURAL BOUNDING BOX MAP</span>
                </button>
              </div>

              {/* BACK: ANNOTATED NEURAL DEFECT MAP */}
              <div className="w-full h-full rounded-3xl bg-[#1B0C07] border border-[#E3845A]/50 p-8 backface-hidden shadow-2xl rotate-y-180 absolute inset-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#E3845A] pb-4 border-b border-[#3D180C]">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping" />
                      <span>STATE 02: NEURAL INFERENCE MAP</span>
                    </span>
                    <span>CONFIDENCE: 99.4%</span>
                  </div>

                  <div className="my-8 py-6 px-4 rounded-2xl bg-[#120704] border border-[#E3845A]/40 relative">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E3845A]/20 text-[#E3845A] border border-[#E3845A]/40 uppercase font-bold">
                      VERDICT: REWORK REQUIRED
                    </span>
                    <h4 className="text-xl font-bold text-[#FFFFFF] mt-2 font-mono">
                      {customFlawText || 'DETECTED DEFECTIVE FEATURE'}
                    </h4>
                    <p className="text-xs text-[#D1B8AE] mt-1 font-mono">
                      Coordinates: [ymin: 380, xmin: 420, ymax: 510, xmax: 560] • Tolerance Delta: 0.38 mm
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={triggerFlip}
                  className="w-full py-3.5 rounded-xl bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] text-[#E3845A] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>FLIP BACK // RETURN TO OPTICAL RAW</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 6: MICRO-FLAW OPTICAL ZOOM RETICLE (ORYZO LOUPE)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-[#3D180C] bg-[#120704] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="sub1 text-[#E3845A] mb-2 flex items-center justify-center space-x-2">
              <Maximize2 className="w-4 h-4 text-[#E3845A]" />
              <span>SUB-MILLIMETER OPTICAL MAGNIFICATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
              Telecentric Micro-Flaw Zoom
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2">
              Drag your cursor over the component surface to inspect sub-pixel geometric anomalies and surface roughness.
            </p>
          </div>

          <div className="o-dashline mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Left: Interactive Optical Surface Canvas (7 cols) */}
            <div
              className="lg:col-span-7 rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-6 relative overflow-hidden shadow-2xl cursor-crosshair"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 10), 90);
                const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 10), 90);
                setCursorPos({ x, y });
              }}
            >
              {/* Simulated Microscopic Surface Background */}
              <div className="aspect-[4/3] w-full rounded-2xl bg-[#120704] border border-[#3D180C] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 radar-grid opacity-30" />
                
                {/* Target Flaw Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-2 border-dashed border-[#E3845A]/40 rounded-xl flex items-center justify-center bg-[#E3845A]/5">
                  <div className="w-16 h-8 bg-[#E3845A]/20 border border-[#E3845A] rounded flex items-center justify-center text-[10px] font-mono text-[#FFFFFF] font-bold">
                    FLAW #01
                  </div>
                </div>

                {/* Floating Optical Reticle Crosshairs */}
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
                  style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                >
                  <div className="w-24 h-24 border-2 border-[#E3845A] rounded-full flex items-center justify-center relative shadow-[0_0_20px_#E3845A]">
                    <div className="w-1.5 h-1.5 bg-[#FFFFFF] rounded-full" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#E3845A]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#E3845A]" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-[#E3845A]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-[#E3845A]" />
                  </div>
                  <div className="text-[10px] font-mono text-[#FFFFFF] bg-[#120704] border border-[#E3845A] px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                    X: {(cursorPos.x * 1.8).toFixed(1)}mm Y: {(cursorPos.y * 1.2).toFixed(1)}mm
                  </div>
                </div>

                {/* Zoom Badge */}
                <div className="absolute top-3 left-3 bg-[#120704]/90 border border-[#3D180C] px-3 py-1 rounded-lg text-xs font-mono text-[#E3845A]">
                  MAGNIFICATION: {zoomLevel}X
                </div>
              </div>

              {/* Slider for Magnification */}
              <div className="mt-4 flex items-center space-x-4">
                <span className="text-xs font-mono text-[#D1B8AE]">ZOOM:</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full accent-[#E3845A] cursor-pointer"
                />
                <span className="text-xs font-mono text-[#FFFFFF] font-bold w-12 text-right">{zoomLevel}X</span>
              </div>
            </div>

            {/* Right: Technical Flaw Readout (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-[#1B0C07] border border-[#3D180C] shadow-xl space-y-4">
                <div className="sub1 text-[#E3845A]">OPTICAL TELEMETRY</div>
                <h3 className="text-2xl font-bold text-[#FFFFFF]">Surface Geometry Profiling</h3>
                
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#120704] border border-[#3D180C] flex items-center justify-between">
                    <span className="text-xs text-[#D1B8AE] font-mono">SURFACE ROUGHNESS (Ra)</span>
                    <span className="text-base font-bold font-mono text-[#FFFFFF]">0.78 µm</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#120704] border border-[#3D180C] flex items-center justify-between">
                    <span className="text-xs text-[#D1B8AE] font-mono">TOLERANCE DEVIATION</span>
                    <span className="text-base font-bold font-mono text-[#E3845A]">±0.038 mm</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#120704] border border-[#3D180C] flex items-center justify-between">
                    <span className="text-xs text-[#D1B8AE] font-mono">DEFECT SPAN SPATIAL</span>
                    <span className="text-base font-bold font-mono text-[#FFFFFF]">0.12 mm</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#120704] border border-[#3D180C] flex items-center justify-between">
                    <span className="text-xs text-[#D1B8AE] font-mono">ANOMALY CERTAINTY</span>
                    <span className="text-base font-bold font-mono text-emerald-400">99.4% F1</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#D1B8AE]/70 font-mono">
                  Calibrated via ISO-2768-m optical standard against nominal CAD geometry.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 7: MATHEMATICAL SPECIFICATIONS (ORYZO EQUATIONS)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#120704]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="sub1 text-[#E3845A]">MATHEMATICAL SPECIFICATIONS</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 tracking-tight uppercase">
              Rigorous Geometric Formulations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Equation 1: IoU */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#E3845A] uppercase block mb-1">BOUNDING BOX SPATIAL OVERLAP</span>
                <h4 className="text-sm font-bold text-[#FFFFFF] mb-3">Intersection-over-Union (IoU)</h4>
                <div className="p-4 rounded-xl bg-[#120704] border border-[#3D180C] font-mono text-sm text-[#FFFFFF] text-center my-2">
                  IoU(A, B) = |A ∩ B| / |A ∪ B|
                </div>
              </div>
              <p className="text-xs text-[#D1B8AE] mt-3">
                Calculates pixel-accurate bounding box overlap between ground-truth CAD regions and Gemini 3.8 inferences.
              </p>
            </div>

            {/* Equation 2: Neyman-Pearson Anomaly */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#E3845A] uppercase block mb-1">BAYESIAN CLASSIFICATION</span>
                <h4 className="text-sm font-bold text-[#FFFFFF] mb-3">Neyman-Pearson Anomaly Core</h4>
                <div className="p-4 rounded-xl bg-[#120704] border border-[#3D180C] font-mono text-sm text-[#FFFFFF] text-center my-2">
                  Λ(x) = p(x | H₁) / p(x | H₀) ≥ γ
                </div>
              </div>
              <p className="text-xs text-[#D1B8AE] mt-3">
                Maximizes defect probability of detection (PD) while keeping factory false-alarm rate (PFA) strictly below 0.01%.
              </p>
            </div>

            {/* Equation 3: Surface Roughness */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#E3845A] uppercase block mb-1">SURFACE TOPOLOGY</span>
                <h4 className="text-sm font-bold text-[#FFFFFF] mb-3">Roughness Mean Deviation (Ra)</h4>
                <div className="p-4 rounded-xl bg-[#120704] border border-[#3D180C] font-mono text-sm text-[#FFFFFF] text-center my-2">
                  Ra = (1/L) ∫ |z(x)| dx ≤ 0.8 µm
                </div>
              </div>
              <p className="text-xs text-[#D1B8AE] mt-3">
                Continuous optical laser profilometry guarantees aerospace edge deburring satisfies ISO-2768 surface limits.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          STAGE 8: ENTERPRISE AUDITS & FIELD REVIEWS (ORYZO TESTIMONIALS)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-[#3D180C] bg-[#120704]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
            <div>
              <span className="sub1 text-[#E3845A]">FIELD REVIEWS &amp; COMPLIANCE AUDITS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mt-1 uppercase">
                Validated Across 364 Production Lines
              </h2>
            </div>
            <div className="flex items-center space-x-3 bg-[#1B0C07] border border-[#3D180C] px-4 py-2 rounded-2xl">
              <div className="flex text-[#E3845A]">
                {'★★★★★'}
              </div>
              <span className="font-mono text-sm font-bold text-[#FFFFFF]">[ 4.9 / 5.0 ]</span>
            </div>
          </div>

          <div className="o-dashline mb-8" />

          {/* Reviews List */}
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-[#E3845A] font-mono font-bold">★★★★★ [ 5.0 ]</span>
                <span className="text-[11px] font-mono text-[#D1B8AE]/70">SMT HIGH-SPEED ASSEMBLY</span>
              </div>
              <p className="text-base sm:text-lg text-[#FFFFFF] font-serif leading-snug">
                "Manual inspectors would experience extreme eye strain after just 20 minutes on the night shift. Nexcan AI ran continuously for 3 months with zero downtime, catching <span className="text-[#E3845A] font-bold">42 micro-bridges</span> that would have cost us thousands in warranty returns."
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] flex items-center justify-between text-xs font-mono">
                <span className="text-[#FFFFFF] font-bold">Marcus Vance</span>
                <span className="text-[#D1B8AE]">Lead Process Architect, Foxconn SMT</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-[#E3845A] font-mono font-bold">★★★★★ [ 5.0 ]</span>
                <span className="text-[11px] font-mono text-[#D1B8AE]/70">AEROSPACE TURBINE MACHINING</span>
              </div>
              <p className="text-base sm:text-lg text-[#FFFFFF] font-serif leading-snug">
                "Our FAA and ISO audits require immutable documentation for every single turbine blade. Having each flaw linked to an <span className="text-[#E3845A] font-bold">ISO-9001 certified cryptographic hash</span> reduced our monthly compliance preparation from 80 hours down to 10 minutes."
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] flex items-center justify-between text-xs font-mono">
                <span className="text-[#FFFFFF] font-bold">Dr. Aris Thorne</span>
                <span className="text-[#D1B8AE]">Quality Director, Boeing Supplier Tier-1</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-[#E3845A] font-mono font-bold">★★★★★ [ 4.8 ]</span>
                <span className="text-[11px] font-mono text-[#D1B8AE]/70">GIGAFACTORY CASTINGS</span>
              </div>
              <p className="text-base sm:text-lg text-[#FFFFFF] font-serif leading-snug">
                "Sub-500ms latency is the only way an AI system can keep pace with our aluminum die-casting conveyors. Nexcan delivers accurate PASS/REWORK verdicts <span className="text-[#E3845A] font-bold">before the part clears the cooling tunnel</span>."
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] flex items-center justify-between text-xs font-mono">
                <span className="text-[#FFFFFF] font-bold">Elena Rostova</span>
                <span className="text-[#D1B8AE]">Robotic Automation Lead, Tesla Gigafactory</span>
              </div>
            </div>

          </div>

          {/* Barcode Metadata Footer like Oryzo */}
          <div className="mt-12 p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="sub1 text-[#E3845A]">NEXCAN-CV-UNIT-01</div>
              <div className="text-xs font-mono text-[#D1B8AE] mt-0.5">
                REGULATORY STANDARD: IPC-A-610 CLASS 3 // ISO-9001:2015 CLAUSE 8.5.1
              </div>
            </div>
            <div className="font-mono text-xs text-[#E3845A] bg-[#120704] px-4 py-2 rounded-xl border border-[#3D180C]">
              BATCH SERIAL // #00124-2026-QA
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
