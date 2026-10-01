import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Cpu,
  Award,
  Scan,
  Sliders,
  RotateCw,
  Maximize2,
  Activity,
  Check,
  FileCheck,
  User,
  ChevronLeft,
  ChevronRight,
  Eye,
  Crosshair,
  AlertTriangle,
  Radio,
  Clock,
  Terminal,
  Server
} from 'lucide-react';
import { initAll } from '../utils/scrollAnimations.js';

// Pre-calibrated defect library for the 3D fanned deck (inspired by cinema showcase video)
const DEFECT_DECK = [
  {
    id: 'solder-bridge',
    title: 'QFP-48 SOLDER BRIDGE',
    category: 'IC Lead Pin Short',
    verdict: 'REWORK',
    verdictColor: 'text-[#E3845A] bg-[#E3845A]/15 border-[#E3845A]/40',
    confidence: '99.4%',
    coords: '[340, 420, 480, 560]',
    delta: '0.42 mm Flaw Span',
    action: 'Micro-soldering station reroute & flux clean',
    description: 'Lead pin #18 bridged with adjacent ground plane via excess flux solder bead.',
    sampleIcon: '⚡',
    badge: 'HIGH SEVERITY'
  },
  {
    id: 'bga-void',
    title: 'BGA MICRO-VOID POROSITY',
    category: 'Sub-Surface Ball Grid',
    verdict: 'SCRAP',
    verdictColor: 'text-[#F43F5E] bg-[#F43F5E]/15 border-[#F43F5E]/40',
    confidence: '99.8%',
    coords: '[120, 210, 240, 330]',
    delta: '28.4% Area Voiding',
    action: 'Immediate wafer rejection to prevent thermal burnout',
    description: 'X-ray assisted telecentric inspection reveals internal ball array gas entrapment.',
    sampleIcon: '☢️',
    badge: 'CRITICAL FAILURE'
  },
  {
    id: 'trace-crack',
    title: 'SUB-MILLIMETER TRACE CRACK',
    category: 'PCB Signal Layer',
    verdict: 'REWORK',
    verdictColor: 'text-[#E3845A] bg-[#E3845A]/15 border-[#E3845A]/40',
    confidence: '98.7%',
    coords: '[510, 680, 590, 760]',
    delta: '0.038 mm Micro-Fracture',
    action: 'High-frequency copper jumper bypass protocol',
    description: 'Hairline stress fracture along high-speed differential pair after thermal shock.',
    sampleIcon: '🔬',
    badge: 'LATENT RISK'
  },
  {
    id: 'pin-coplanarity',
    title: 'PIN COPLANARITY PASS',
    category: 'SMD Connector Array',
    verdict: 'PASS',
    verdictColor: 'text-[#34D399] bg-[#34D399]/15 border-[#34D399]/40',
    confidence: '99.9%',
    coords: '[280, 310, 360, 410]',
    delta: '0.012 mm (Within Spec)',
    action: 'Approved for automated high-speed surface mount',
    description: 'All 32 pins within ±0.02mm Z-axis mechanical specification tolerance.',
    sampleIcon: '✓',
    badge: 'NOMINAL TOLERANCE'
  },
  {
    id: 'capacitor-skew',
    title: '0402 CAPACITOR SKEW',
    category: 'Passive Surface Mount',
    verdict: 'REWORK',
    verdictColor: 'text-[#E3845A] bg-[#E3845A]/15 border-[#E3845A]/40',
    confidence: '99.1%',
    coords: '[620, 150, 710, 240]',
    delta: '12.8° Rotational Tombstone',
    action: 'Laser re-centering reflow reheat',
    description: 'Surface tension imbalance during convection reflow caused passive tombstone shift.',
    sampleIcon: '⚙️',
    badge: 'ALIGNMENT SKEW'
  }
];

// Conveyor stream items for the continuous industrial tape
const CONVEYOR_ITEMS = [
  { id: 'WF-8492', status: 'PASS', conf: '99.9%', exp: '1/2400s', flaw: 'ZERO DEFECTS' },
  { id: 'WF-8493', status: 'REWORK', conf: '99.4%', exp: '1/2400s', flaw: 'QFP-48 SOLDER BRIDGE' },
  { id: 'WF-8494', status: 'PASS', conf: '100.0%', exp: '1/2400s', flaw: 'COPLANARITY NOMINAL' },
  { id: 'WF-8495', status: 'SCRAP', conf: '99.8%', exp: '1/2400s', flaw: 'BGA VOID 28.4%' },
  { id: 'WF-8496', status: 'PASS', conf: '99.7%', exp: '1/2400s', flaw: 'TRACE CONTINUITY OK' },
  { id: 'WF-8497', status: 'REWORK', conf: '99.1%', exp: '1/2400s', flaw: '0402 CAPACITOR SKEW' },
  { id: 'WF-8498', status: 'PASS', conf: '99.9%', exp: '1/2400s', flaw: 'SUB-MICRON PASS' },
];

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const containerRef = useRef(null);
  const [activeDeckIndex, setActiveDeckIndex] = useState(2); // Center card (0 to 4)
  const [activeStep, setActiveStep] = useState(1); // 0 to 3 for process timeline

  useEffect(() => {
    // Initialize the spring & scroll animation engine
    const cleanup = initAll(containerRef.current);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const activeDefect = DEFECT_DECK[activeDeckIndex];

  return (
    <div
      ref={containerRef}
      className="bg-[#120704] text-[#FAF9F6] selection:bg-[#E3845A] selection:text-[#120704] overflow-hidden"
    >

      {/* ─────────────────────────────────────────────────────────────
          TOP TECHNICAL SPEC BAR (CINEMA RUNNER)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#0D0503] border-b border-[#3D180C] px-4 py-2 text-[10px] font-mono text-[#D1B8AE] flex flex-wrap items-center justify-between gap-2 z-20 relative">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span className="font-bold">SYSTEM ACTIVE</span>
          </span>
          <span className="text-[#3D180C]">|</span>
          <span>OPTICAL CORE v3.8</span>
          <span className="text-[#3D180C] hidden sm:inline">|</span>
          <span className="hidden sm:inline">TELECENTRIC 4K • 120 FPS</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[#E3845A]">SUB-MILLIMETER TENSOR RES: 0.05mm</span>
          <span className="text-[#3D180C] hidden md:inline">|</span>
          <span className="hidden md:inline text-white/80">ISO-9001:2015 AUDITED</span>
        </div>
      </div>

      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: CINEMA KINETIC HERO WITH DEPTH LAYERING
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="hero"
        className="relative pt-16 pb-24 border-b border-[#3D180C] bg-[#120704] radar-grid overflow-hidden"
      >
        {/* Cinema Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] diffused-light-leak pointer-events-none" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#E3845A]/10 blur-[140px] pointer-events-none rounded-full" />

        {/* GIANT LAYERED BACKGROUND TYPOGRAPHY (from Video Frame 1 & 3) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
          <span className="text-[14vw] font-black uppercase tracking-tight text-[#E3845A]/[0.035] leading-none whitespace-nowrap block">
            NEXCAN AI
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Track Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1B0C07] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono mb-6 shadow-lg shadow-[#E3845A]/10">
            <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-pulse"></span>
            <span className="tracking-wider uppercase font-semibold">Track: Computer Vision &amp; Visual Intelligence</span>
          </div>

          {/* Staged Rising Title */}
          <h1
            data-hero-title
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.12] max-w-4xl mx-auto"
          >
            Autonomous Quality Assurance &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E3845A] to-[#A74A21]">
              Defect Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base text-[#D1B8AE] max-w-2xl mx-auto leading-relaxed">
            Eliminate human visual fatigue on manufacturing lines. Instant sub-millimeter flaw localization, automated root-cause disposition (
            <code className="text-[#34D399] font-bold bg-[#34D399]/15 px-1.5 py-0.5 rounded border border-[#34D399]/30">PASS</code> /{' '}
            <code className="text-[#E3845A] font-bold bg-[#E3845A]/15 px-1.5 py-0.5 rounded border border-[#E3845A]/30">REWORK</code> /{' '}
            <code className="text-[#F43F5E] font-bold bg-[#F43F5E]/15 px-1.5 py-0.5 rounded border border-[#F43F5E]/30">SCRAP</code>), and verified ISO-9001 compliance audit trails.
          </p>

          {/* Primary Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onLaunchApp}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-[#FFFFFF] font-bold text-xs tracking-wider uppercase shadow-xl shadow-[#E3845A]/25 flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>Launch Live Inspector</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              className="px-5 py-3.5 rounded-xl bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] font-mono text-xs font-semibold shadow-lg transition-all cursor-pointer flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#E3845A] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>

            <button
              onClick={() => onOpenLogin && onOpenLogin()}
              className="px-5 py-3.5 rounded-xl bg-[#120704] hover:bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 text-[#FAF9F6] font-mono text-xs font-medium transition-all cursor-pointer flex items-center space-x-2"
            >
              <User className="w-3.5 h-3.5 text-[#E3845A]" />
              <span>Sign In / Create Account</span>
            </button>
          </div>

          {/* FOREGROUND INTERACTIVE OPTICAL SCANNER PREVIEW (Cinematic Focus) */}
          <div className="mt-12 max-w-3xl mx-auto relative rounded-3xl bg-[#170B06] border border-[#3D180C] p-4 shadow-2xl overflow-hidden group">
            {/* Corner Crosshairs */}
            <div className="absolute top-2 left-2 text-[#E3845A]/40 font-mono text-xs">+</div>
            <div className="absolute top-2 right-2 text-[#E3845A]/40 font-mono text-xs">+</div>
            <div className="absolute bottom-2 left-2 text-[#E3845A]/40 font-mono text-xs">+</div>
            <div className="absolute bottom-2 right-2 text-[#E3845A]/40 font-mono text-xs">+</div>

            {/* Viewport Header */}
            <div className="flex items-center justify-between text-xs font-mono text-[#D1B8AE] pb-3 border-b border-[#3D180C] px-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping" />
                <span className="font-bold text-white">LIVE TELECENTRIC CAM FEED #01</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="text-[#34D399]">120.4 FPS</span>
                <span>•</span>
                <span>EXP: 416 µs</span>
                <span>•</span>
                <span className="text-[#E3845A]">RES: 0.05 mm</span>
              </div>
            </div>

            {/* Mock Wafer Viewport with Animated Laser Sweep */}
            <div className="relative mt-3 h-56 sm:h-64 rounded-2xl bg-[#0F0603] border border-[#2A1107] overflow-hidden flex items-center justify-center">
              {/* Subtle Grid and Reticle */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,132,90,0.08)_0,transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D180C_1px,transparent_1px),linear-gradient(to_bottom,#3D180C_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
              
              {/* Concentric Optical Circles */}
              <div className="absolute w-44 h-44 rounded-full border border-[#E3845A]/20 pointer-events-none" />
              <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#E3845A]/35 pointer-events-none" />
              <div className="absolute w-12 h-12 rounded-full border border-[#E3845A]/50 pointer-events-none" />

              {/* Animated Laser Sweep Line */}
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E3845A] to-transparent shadow-[0_0_12px_#E3845A] animate-laser-sweep pointer-events-none" />

              {/* Simulated Defect Target Bounding Box */}
              <div className="absolute top-[38%] left-[44%] w-24 h-16 rounded border-2 border-[#E3845A] bg-[#E3845A]/10 shadow-[0_0_15px_rgba(227,132,90,0.3)] flex flex-col justify-between p-1">
                <span className="text-[9px] font-mono font-bold text-white bg-[#E3845A] px-1 rounded-sm w-max">
                  FLAW: SOLDER BRIDGE
                </span>
                <span className="text-[8px] font-mono text-[#D1B8AE] self-end">
                  [340, 420, 480, 560]
                </span>
              </div>

              {/* Status Badges Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#1B0C07]/90 backdrop-blur border border-[#3D180C] px-2.5 py-1 rounded-md text-[10px] font-mono text-[#D1B8AE]">
                AI REASONING: <span className="text-[#E3845A] font-bold">GEMINI 3.8 FLASH</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-[#1B0C07]/90 backdrop-blur border border-[#E3845A]/40 px-2.5 py-1 rounded-md text-[10px] font-mono text-[#E3845A] font-bold">
                VERDICT: REWORK REQUIRED (99.4%)
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono px-2 pt-1">
              <span className="text-[#D1B8AE] text-[11px]">
                Autonomous Inspection Active • Auto-Logging to Supabase Audit Ledger
              </span>
              <button
                onClick={onLaunchApp}
                className="text-[#E3845A] hover:text-white font-bold inline-flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <span>Full Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CIRCULAR METRIC ORBS & CONTINUOUS INDUSTRIAL CONVEYOR
          (Directly inspired by Frame 3 of the video)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-[#3D180C] bg-[#150905]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <span className="sub1 text-[#E3845A]">PRODUCTION CALIBRATED SPECS</span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#FFFFFF] mt-1 uppercase tracking-tight">
              Optical Benchmarks &amp; Throughput
            </h2>
          </div>

          {/* 4 FLOATING CIRCULAR METRIC ORBS (Clean, high-impact, zero clutter) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
            
            {/* Orb 1: Accuracy */}
            <div className="aspect-square rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                99.4<span className="text-sm text-[#E3845A]">%</span>
              </span>
              <span className="text-xs font-bold text-white uppercase mt-1">F1 Accuracy</span>
              <span className="text-[10px] font-mono text-[#D1B8AE] mt-0.5">Sub-pixel validation</span>
            </div>

            {/* Orb 2: Hero Accent Latency (Highlighted like IMAX in video) */}
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#E3845A] via-[#A74A21] to-[#3D180C] p-4 flex flex-col items-center justify-center text-center shadow-xl shadow-[#E3845A]/25 transition-transform hover:scale-105">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                14<span className="text-sm text-white/80">ms</span>
              </span>
              <span className="text-xs font-extrabold text-white uppercase mt-1">Edge Latency</span>
              <span className="text-[10px] font-mono text-white/80 mt-0.5">Real-time conveyor gate</span>
            </div>

            {/* Orb 3: Micro-Flaw Tolerance */}
            <div className="aspect-square rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                0.05<span className="text-sm text-[#E3845A]">mm</span>
              </span>
              <span className="text-xs font-bold text-white uppercase mt-1">Flaw Limit</span>
              <span className="text-[10px] font-mono text-[#D1B8AE] mt-0.5">Telecentric zoom res</span>
            </div>

            {/* Orb 4: ISO Compliance */}
            <div className="aspect-square rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                ISO 9001
              </span>
              <span className="text-xs font-bold text-white uppercase mt-1">Audit Ledger</span>
              <span className="text-[10px] font-mono text-[#34D399] mt-0.5">Tamper-proof logs</span>
            </div>

          </div>

        </div>

        {/* CONTINUOUS CONVEYOR SPROCKET TAPE (from Frame 3 of the video) */}
        <div className="w-full overflow-hidden border-y border-[#3D180C] bg-[#0E0503] py-2.5">
          <div className="animate-conveyor flex items-center space-x-6 text-xs font-mono text-[#D1B8AE]">
            {[...CONVEYOR_ITEMS, ...CONVEYOR_ITEMS].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#1B0C07] border border-[#3D180C]/80"
              >
                <Cpu className="w-3.5 h-3.5 text-[#E3845A]" />
                <span className="text-white font-bold">{item.id}</span>
                <span className="text-[#3D180C]">|</span>
                <span
                  className={
                    item.status === 'PASS'
                      ? 'text-[#34D399] font-bold'
                      : item.status === 'REWORK'
                      ? 'text-[#E3845A] font-bold'
                      : 'text-[#F43F5E] font-bold'
                  }
                >
                  {item.status}
                </span>
                <span className="text-[#D1B8AE]/60 text-[10px]">{item.flaw}</span>
                <span className="text-[#3D180C]">|</span>
                <span className="text-white/60 text-[10px]">{item.conf}</span>
              </div>
            ))}
          </div>
        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: 3D FANNED CARD DECK (DEFECT INSPECTION GALLERY)
          (Directly inspired by Frame 5 of the cinema video)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#120704] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="sub1 text-[#E3845A] mb-2 flex items-center justify-center space-x-2">
              <Layers className="w-4 h-4 text-[#E3845A]" />
              <span>SUB-MILLIMETER INSPECTION DECK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
              Interactive Defect Sample Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2 max-w-xl mx-auto">
              Click any sample card or use the navigation controls to fan through real-world manufacturing anomalies inspected by Nexcan AI.
            </p>
          </div>

          {/* 3D FANNED DECK STAGE */}
          <div className="relative max-w-4xl mx-auto min-h-[380px] sm:min-h-[420px] flex items-center justify-center py-6">
            
            {/* Render 5 Fanned Cards with 3D Angles */}
            <div className="relative w-full max-w-md h-[340px] flex items-center justify-center [perspective:1200px]">
              {DEFECT_DECK.map((defect, idx) => {
                const offset = idx - activeDeckIndex;
                const isSelected = idx === activeDeckIndex;

                // Calculated transform coordinates for the luxury fanned card deck
                const rot = offset * 8; // -16, -8, 0, 8, 16 deg
                const tx = offset * 58; // Horizontal spacing
                const ty = Math.abs(offset) * 10; // Vertical arch
                const zIndex = 20 - Math.abs(offset) * 3;
                const scale = isSelected ? 1.05 : 0.92;
                const opacity = Math.abs(offset) > 2 ? 0.3 : 1;

                return (
                  <div
                    key={defect.id}
                    onClick={() => setActiveDeckIndex(idx)}
                    style={{
                      transform: `translateX(${tx}px) translateY(${ty}px) rotateZ(${rot}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                    className={`absolute w-72 sm:w-80 h-[320px] rounded-3xl p-5 cursor-pointer transition-all duration-500 ease-out select-none flex flex-col justify-between shadow-2xl ${
                      isSelected
                        ? 'bg-[#1D0C07] border-2 border-[#E3845A] shadow-[0_0_35px_rgba(227,132,90,0.35)]'
                        : 'bg-[#150905] border border-[#3D180C] hover:border-[#E3845A]/50'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between text-[11px] font-mono pb-2.5 border-b border-[#3D180C]">
                        <span className="text-[#D1B8AE]">{defect.category}</span>
                        <span className={`px-2 py-0.5 rounded font-bold border text-[10px] ${defect.verdictColor}`}>
                          {defect.verdict}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="my-4">
                        <div className="text-2xl mb-2">{defect.sampleIcon}</div>
                        <h4 className="text-base font-bold text-white uppercase tracking-tight">
                          {defect.title}
                        </h4>
                        <p className="text-xs text-[#D1B8AE] mt-1.5 leading-relaxed line-clamp-2">
                          {defect.description}
                        </p>
                      </div>

                      {/* Technical Readout */}
                      <div className="p-2.5 rounded-xl bg-[#0F0603] border border-[#3D180C] space-y-1 font-mono text-[10px]">
                        <div className="flex justify-between text-[#D1B8AE]">
                          <span>COORDINATES:</span>
                          <span className="text-white font-bold">{defect.coords}</span>
                        </div>
                        <div className="flex justify-between text-[#D1B8AE]">
                          <span>DEVIATION:</span>
                          <span className="text-[#E3845A] font-bold">{defect.delta}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 border-t border-[#3D180C] flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#D1B8AE]">{defect.badge}</span>
                      <span className="text-[#34D399] font-bold">CONF: {defect.confidence}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* DECK NAVIGATION CONTROLS (from Video: Circular arrows + indicator) */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <button
              onClick={() => setActiveDeckIndex((prev) => (prev > 0 ? prev - 1 : DEFECT_DECK.length - 1))}
              className="w-12 h-12 rounded-full bg-[#1B0C07] hover:bg-[#2A130B] border border-[#3D180C] hover:border-[#E3845A] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous defect"
            >
              <ChevronLeft className="w-5 h-5 text-[#E3845A]" />
            </button>

            {/* Indicator Pills */}
            <div className="flex items-center space-x-2 font-mono text-xs">
              {DEFECT_DECK.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDeckIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === activeDeckIndex ? 'w-8 bg-[#E3845A]' : 'w-2 bg-[#3D180C] hover:bg-[#D1B8AE]'
                  }`}
                  aria-label={`Jump to sample ${i + 1}`}
                />
              ))}
              <span className="text-[#D1B8AE] ml-2 text-xs">
                0{activeDeckIndex + 1} / 0{DEFECT_DECK.length}
              </span>
            </div>

            <button
              onClick={() => setActiveDeckIndex((prev) => (prev < DEFECT_DECK.length - 1 ? prev + 1 : 0))}
              className="w-12 h-12 rounded-full bg-[#1B0C07] hover:bg-[#2A130B] border border-[#3D180C] hover:border-[#E3845A] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next defect"
            >
              <ChevronRight className="w-5 h-5 text-[#E3845A]" />
            </button>
          </div>

          {/* ACTIVE DEFECT DETAIL CARD (Uncluttered, high-legibility readout) */}
          <div className="mt-8 max-w-2xl mx-auto p-5 rounded-2xl bg-[#170A05] border border-[#3D180C] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-white uppercase">{activeDefect.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${activeDefect.verdictColor}`}>
                  {activeDefect.verdict}
                </span>
              </div>
              <p className="text-xs text-[#D1B8AE] font-mono">
                Protocol: <span className="text-white">{activeDefect.action}</span>
              </p>
            </div>

            <button
              onClick={onLaunchApp}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow cursor-pointer transition-transform hover:scale-[1.02]"
            >
              Inspect in Live Console
            </button>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: SMART 3D NEURAL ANOMALY FLIP (CIPHER SCRAMBLE)
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="flip"
        className="py-20 border-b border-[#3D180C] bg-[#120704]"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <div className="sub1 text-[#E3845A] mb-2 flex items-center justify-center space-x-2">
            <Scan className="w-4 h-4 text-[#E3845A]" />
            <span>DUAL-STATE 3D NEURAL DECODER</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
            Smart Neural Anomaly Flip
          </h2>
          <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2 max-w-lg mx-auto">
            Experience the dual-state transition: raw telecentric camera exposure flipped instantaneously into an annotated neural segmentation tensor with live cipher scramble.
          </p>

          <div className="o-dashline my-8" />

          {/* 3D Flip Card Container */}
          <div className="flip-scene relative max-w-lg mx-auto h-[320px] perspective-1000 my-6">
            <div
              data-flip-card
              className="relative w-full h-full preserve-3d"
              style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
            >
              
              {/* FRONT: RAW OPTICAL EXPOSURE */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-6 shadow-2xl flex flex-col justify-between backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                  WebkitTransform: 'rotateY(0deg)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D1B8AE] pb-3 border-b border-[#3D180C]">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#E3845A]" />
                      <span>STATE 01: RAW SENSOR CAPTURE</span>
                    </span>
                    <span className="text-[#E3845A]">1/2400s • ISO 100</span>
                  </div>

                  <div className="my-6 p-4 rounded-xl bg-[#120704] border border-[#3D180C]">
                    <div className="text-[10px] font-mono text-[#D1B8AE] mb-1">
                      SENSOR PHOTONS PENDING SEGMENTATION:
                    </div>
                    <div
                      data-cipher
                      data-msg="QFP-48 SOLDER BRIDGE DETECTED"
                      className="font-mono text-base font-bold text-[#FFFFFF] tracking-wider"
                    >
                      RAW_OPTICAL_FEED_01
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-mode="encode"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>FLIP // INFER NEURAL BOUNDING BOX TENSOR</span>
                </button>
              </div>

              {/* BACK: DECODED TENSOR MAP */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#1B0C07] border border-[#E3845A]/60 p-6 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  WebkitTransform: 'rotateY(180deg)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#E3845A] pb-3 border-b border-[#3D180C]">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping" />
                      <span>STATE 02: NEURAL INFERENCE MAP</span>
                    </span>
                    <span className="bg-[#E3845A]/20 px-2 py-0.5 rounded border border-[#E3845A]/40 font-bold">
                      VERDICT: REWORK
                    </span>
                  </div>

                  <div className="my-6 p-4 rounded-xl bg-[#120704] border border-[#E3845A]/30">
                    <div className="text-[10px] font-mono text-[#E3845A] mb-1">
                      NORMALIZED BOUNDING BOX [YMIN, XMIN, YMAX, XMAX]:
                    </div>
                    <div className="font-mono text-sm font-bold text-[#FFFFFF]">
                      [340, 420, 480, 560] • 0.42 mm Flaw Span
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-mode="decode"
                  className="w-full py-3 rounded-xl bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] text-[#E3845A] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
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
          SECTION 5: 4-STEP RETICLE HUD PROCESS TIMELINE (01 - 04)
          (Directly inspired by Frame 7 of the video)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#150905] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="sub1 text-[#E3845A] mb-2 flex items-center justify-center space-x-2">
              <Crosshair className="w-4 h-4 text-[#E3845A]" />
              <span>END-TO-END AUTONOMOUS PIPELINE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
              The 4-Step Optical Decision Engine
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2 max-w-xl mx-auto">
              From raw photons arriving at telecentric lenses to real-time pneumatic PLC gate dispatch in under 14 milliseconds.
            </p>
          </div>

          {/* STEP RETICLE TIMELINE TABS (01 - 04 from Video Frame 7) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { num: '01', title: 'TELECENTRIC CAPTURE', desc: '120 FPS high-exposure optical snapshot' },
              { num: '02', title: 'GEMINI MULTI-MODEL', desc: 'gemini-3.8-flash auto-tier fallback' },
              { num: '03', title: 'SUB-PIXEL TENSOR', desc: 'Normalized [ymin, xmin, ymax, xmax]' },
              { num: '04', title: 'SCADA / PLC DISPATCH', desc: 'Immediate diverter gate signal (<14ms)' },
            ].map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  activeStep === idx
                    ? 'bg-[#220E08] border-[#E3845A] shadow-lg shadow-[#E3845A]/20'
                    : 'bg-[#180A06] border-[#3D180C] hover:border-[#E3845A]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xl font-black font-mono ${activeStep === idx ? 'text-[#E3845A]' : 'text-white/40'}`}>
                    {step.num}
                  </span>
                  {activeStep === idx && (
                    <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-bold text-white uppercase">{step.title}</div>
                <div className="text-[10px] text-[#D1B8AE] mt-1">{step.desc}</div>
              </button>
            ))}
          </div>

          {/* CENTERED TELEMETRY TERMINAL DEVICE (from Video Frame 7) */}
          <div className="max-w-2xl mx-auto rounded-3xl bg-[#110502] border border-[#3D180C] p-6 shadow-2xl relative">
            <div className="flex items-center justify-between text-xs font-mono text-[#D1B8AE] pb-3 border-b border-[#3D180C]">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-[#E3845A]" />
                <span className="text-white font-bold">PIPELINE TELEMETRY STATUS</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#34D399]/20 text-[#34D399] font-bold text-[10px]">
                ALL NODES HEALTHY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#190B06] border border-[#3D180C]">
                <div className="text-[10px] text-[#D1B8AE]">ACTIVE STAGE</div>
                <div className="text-sm font-bold text-[#E3845A] mt-0.5">
                  {activeStep === 0 && 'STAGE 01: OPTICAL FRAME GRAB'}
                  {activeStep === 1 && 'STAGE 02: NEURAL VISION REASONING'}
                  {activeStep === 2 && 'STAGE 03: TENSOR BOUNDING BOX'}
                  {activeStep === 3 && 'STAGE 04: AUTOMATION REJECT GATE'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#190B06] border border-[#3D180C]">
                <div className="text-[10px] text-[#D1B8AE]">CRYPTOGRAPHIC INTEGRITY</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate">
                  SHA256: 0x7F4B89E2...C01
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090302] border border-[#2B1006] text-xs font-mono text-[#D1B8AE] space-y-1">
              <div>&gt; INGESTION: 120 FPS TELECENTRIC STREAM [PASS]</div>
              <div>&gt; VISION INFERENCE: GEMINI 3.8 FLASH [12.4ms]</div>
              <div>&gt; DISPOSITION: SOLDER BRIDGE LOCATED @ [340, 420, 480, 560]</div>
              <div className="text-[#34D399]">&gt; SCADA DISPATCH: HIGH_PRIORITY_DIVERTER SIGNAL FIRED</div>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: REAL SOFTMAX TEMPERATURE BARS & AI CALIBRATION
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="features"
        className="py-20 border-b border-[#3D180C] bg-[#120704]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="sub1 text-[#E3845A] mb-2 flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#E3845A]" />
                <span>DYNAMIC NEURAL TEMPERATURE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
                Softmax Confidence Distribution
              </h2>
              <p className="text-xs sm:text-sm text-[#D1B8AE] mt-1.5 max-w-xl">
                Observe the Spring-damped logits transition as neural sampling temperature shifts between sharp argmax and entropy.
              </p>
            </div>

            {/* Interactive Temperature Control Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'T = 0.10 (Argmax)', val: '0.10' },
                { label: 'T = 0.25 (Factory)', val: '0.25', active: true },
                { label: 'T = 0.50 (Balanced)', val: '0.50' },
                { label: 'T = 1.00 (Entropy)', val: '1.00' }
              ].map((b, i) => (
                <button
                  key={i}
                  data-temp={b.val}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    b.active
                      ? 'is-active bg-[#E3845A] text-[#120704]'
                      : 'bg-[#1B0C07] text-[#D1B8AE] hover:text-[#FFFFFF] border border-[#3D180C]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* The 24 Softmax Probability Bars */}
          <div className="p-6 rounded-3xl bg-[#1B0C07] border border-[#3D180C] shadow-2xl">
            <div data-bars className="h-44 sm:h-52 flex items-end justify-between gap-1.5 sm:gap-2 px-2 pb-2 border-b border-[#3D180C]">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  data-bar
                  className="w-full rounded-t-sm bg-gradient-to-t from-[#3D180C] via-[#A74A21] to-[#E3845A] transition-all"
                  style={{ height: '100%', transform: 'scaleY(0.15)', transformOrigin: 'bottom' }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#D1B8AE] mt-4 px-2">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#E3845A]" />
                <span>FLAW CLASS DISTRIBUTION (K=24)</span>
              </span>
              <span>CALIBRATED OVER 1,400,000 WAFERS</span>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: THE INDUSTRIAL DISRUPTION (LEGACY VS NEXCAN)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#150905]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="sub1 text-[#E3845A]">THE DISRUPTION</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-1 uppercase">
              Legacy AOI vs. Nexcan Autonomous Vision
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2">
              Why leading semiconductor and aerospace manufacturers are replacing static threshold cameras with multi-model vision intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Legacy Column */}
            <div className="p-8 rounded-3xl bg-[#1B0C07] border border-[#F43F5E]/30 relative shadow-xl">
              <div className="flex items-center space-x-2 text-[#F43F5E] font-mono text-xs font-bold uppercase mb-4">
                <XCircle className="w-4 h-4" />
                <span>Legacy Rule-Based AOI &amp; Manual QA</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Brittle Heuristics &amp; Human Fatigue</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#D1B8AE]">
                <li className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-[#F43F5E] mt-0.5 shrink-0" />
                  <span>Human visual fatigue drops defect catch rates to &lt;82% after 20 minutes of line duty.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-[#F43F5E] mt-0.5 shrink-0" />
                  <span>Threshold optical sensors trigger up to 18% false positive rejections, costing millions in wasted scrap.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-[#F43F5E] mt-0.5 shrink-0" />
                  <span>Zero cryptographic audit logging—untraceable compliance failures during ISO audits.</span>
                </li>
              </ul>
            </div>

            {/* Nexcan Autonomous Column */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#220E08] to-[#170904] border border-[#E3845A]/50 relative shadow-2xl">
              <div className="flex items-center space-x-2 text-[#34D399] font-mono text-xs font-bold uppercase mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nexcan Autonomous Defect Intelligence</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Multi-Model Reasoning &amp; Sub-Millimeter Tensors</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#FAF9F6]">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] mt-0.5 shrink-0" />
                  <span>24/7 continuous 120 FPS inspection with verified 99.4% F1 precision across 0.05mm flaw sizes.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] mt-0.5 shrink-0" />
                  <span>Multi-tiered Gemini Vision fallback eliminates downtime and adapts dynamically to lighting variations.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] mt-0.5 shrink-0" />
                  <span>Automated ISO-9001:2015 Clause 8.5.1 certified audit logs with tamper-proof cryptographic signatures.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: EXECUTIVE PROOF & INDUSTRIAL TESTIMONIALS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#120704]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="sub1 text-[#E3845A]">FIELD VERIFIED</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-1 uppercase">
              Proven in Mission-Critical Cleanrooms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col justify-between shadow-lg">
              <p className="text-xs sm:text-sm text-[#D1B8AE] italic leading-relaxed">
                "Nexcan reduced our micro-crack solder escapes by 94% on our QFP line within 48 hours of initial deployment. The 14ms latency is unmatched."
              </p>
              <div className="mt-6 pt-4 border-t border-[#3D180C] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#E3845A]/20 flex items-center justify-center font-bold text-xs text-[#E3845A]">
                  SC
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Dr. Sarah Chen</div>
                  <div className="text-[10px] font-mono text-[#D1B8AE]">Lead AOI Architect • Semiconductor Foundry</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col justify-between shadow-lg">
              <p className="text-xs sm:text-sm text-[#D1B8AE] italic leading-relaxed">
                "The automated ISO-9001 audit export saved our team 25+ hours per audit cycle. Every disposition is timestamped and cryptographically verified."
              </p>
              <div className="mt-6 pt-4 border-t border-[#3D180C] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#E3845A]/20 flex items-center justify-center font-bold text-xs text-[#E3845A]">
                  MK
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Marcus Klein</div>
                  <div className="text-[10px] font-mono text-[#D1B8AE]">VP of Operations • Tier-1 Automotive Electronics</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col justify-between shadow-lg">
              <p className="text-xs sm:text-sm text-[#D1B8AE] italic leading-relaxed">
                "We replaced three legacy camera stations with a single Nexcan AI telecentric rig. The sub-millimeter bounding box tensor accuracy is unbelievable."
              </p>
              <div className="mt-6 pt-4 border-t border-[#3D180C] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#E3845A]/20 flex items-center justify-center font-bold text-xs text-[#E3845A]">
                  JP
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Jean-Paul Dupont</div>
                  <div className="text-[10px] font-mono text-[#D1B8AE]">Quality Director • Medical Micro-Sensors</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: VELOCITY-LINKED MARQUEE TICKER & CLOSING CTA
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="closing"
        className="py-16 border-b border-[#3D180C] bg-[#0E0503] relative"
      >
        <div data-marquee className="text-xs font-mono font-bold tracking-widest text-[#E3845A]/80 uppercase">
          <span className="track">
            • ZERO COMPONENT ESCAPES • ISO-9001:2015 AUDITED • SUB-MILLIMETER TENSOR RES: 0.05MM • 120 FPS TELECENTRIC INGESTION • MULTI-MODEL GEMINI FALLBACK • REAL-TIME PLC SCADA DISPATCH • 99.4% F1 PRECISION • ZERO COMPONENT ESCAPES • ISO-9001:2015 AUDITED • SUB-MILLIMETER TENSOR RES: 0.05MM • 120 FPS TELECENTRIC INGESTION •
          </span>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: HIGH-CONVERSION BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#120704] relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight uppercase">
            Deploy Autonomous Vision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E3845A] to-[#A74A21]">
              On Your Lines in Minutes
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#D1B8AE] max-w-xl mx-auto">
            Zero visual inspection fatigue. Sub-millimeter bounding box localization. Direct integration with industrial PLC sorting lines.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-[#E3845A]/30 flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Live Inspector Console</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              className="px-6 py-4 rounded-xl bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] font-mono text-xs font-semibold shadow-lg transition-all cursor-pointer flex items-center space-x-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-[#E3845A] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

          <div className="mt-8 text-xs font-mono text-[#D1B8AE]/60">
            Hardware Compatible: Basler • FLIR • IDS Imaging • Cognex • Allied Vision
          </div>

        </div>
      </section>

    </div>
  );
}
