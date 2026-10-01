import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Cpu,
  Scan,
  RotateCw,
  User,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Sliders,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Activity,
  Terminal,
  FileCheck,
  Radio,
  Eye
} from 'lucide-react';

// Pre-calibrated defect library for the 3D interactive fanned deck
const DEFECT_DECK = [
  {
    id: 'solder-bridge',
    title: 'QFP-48 SOLDER BRIDGE',
    category: 'IC Lead Pin Short',
    verdict: 'REWORK',
    verdictColor: 'text-[#FDE68A] bg-[#FDE68A]/15 border-[#FDE68A]/40',
    confidence: '99.4%',
    coords: '[340, 420, 480, 560]',
    delta: '0.42 mm Flaw Span',
    action: 'Micro-soldering station reroute & flux clean protocol',
    description: 'Lead pin #18 bridged with adjacent ground plane via excess flux solder bead.',
    sampleIcon: '⚡',
    badge: 'HIGH SEVERITY'
  },
  {
    id: 'bga-void',
    title: 'BGA MICRO-VOID POROSITY',
    category: 'Sub-Surface Ball Grid',
    verdict: 'SCRAP',
    verdictColor: 'text-[#FDA4AF] bg-[#FDA4AF]/15 border-[#FDA4AF]/40',
    confidence: '99.8%',
    coords: '[120, 210, 240, 330]',
    delta: '28.4% Area Voiding',
    action: 'Immediate wafer rejection to prevent thermal burnout in field',
    description: 'X-ray assisted telecentric inspection reveals internal ball array gas entrapment.',
    sampleIcon: '☢️',
    badge: 'CRITICAL FAILURE'
  },
  {
    id: 'trace-crack',
    title: 'SUB-MILLIMETER TRACE CRACK',
    category: 'PCB Signal Layer',
    verdict: 'REWORK',
    verdictColor: 'text-[#FDE68A] bg-[#FDE68A]/15 border-[#FDE68A]/40',
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
    verdictColor: 'text-[#A7F3D0] bg-[#A7F3D0]/15 border-[#A7F3D0]/40',
    confidence: '99.9%',
    coords: '[280, 310, 360, 410]',
    delta: '0.012 mm (Nominal)',
    action: 'Approved for automated high-speed surface mount packaging',
    description: 'All 32 pins within ±0.02mm Z-axis mechanical specification tolerance.',
    sampleIcon: '✓',
    badge: 'NOMINAL TOLERANCE'
  },
  {
    id: 'capacitor-skew',
    title: '0402 CAPACITOR SKEW',
    category: 'Passive Surface Mount',
    verdict: 'REWORK',
    verdictColor: 'text-[#FDE68A] bg-[#FDE68A]/15 border-[#FDE68A]/40',
    confidence: '99.1%',
    coords: '[620, 150, 710, 240]',
    delta: '12.8° Rotational Tombstone',
    action: 'Laser re-centering reflow reheat protocol',
    description: 'Surface tension imbalance during convection reflow caused passive tombstone shift.',
    sampleIcon: '⚙️',
    badge: 'ALIGNMENT SKEW'
  }
];

// Conveyor stream items for the continuous industrial tape
const CONVEYOR_ITEMS = [
  { id: 'WF-8492', status: 'PASS', conf: '99.9%', flaw: 'NOMINAL COPLANARITY' },
  { id: 'WF-8493', status: 'REWORK', conf: '99.4%', flaw: 'QFP-48 SOLDER BRIDGE' },
  { id: 'WF-8494', status: 'PASS', conf: '100.0%', flaw: 'ZERO MICRO-FLAWS' },
  { id: 'WF-8495', status: 'SCRAP', conf: '99.8%', flaw: 'BGA VOID 28.4%' },
  { id: 'WF-8496', status: 'PASS', conf: '99.7%', flaw: 'SIGNAL CONTINUITY OK' },
  { id: 'WF-8497', status: 'REWORK', conf: '99.1%', flaw: '0402 CAPACITOR SKEW' },
  { id: 'WF-8498', status: 'PASS', conf: '99.9%', flaw: 'TRACE PROFILE NOMINAL' }
];

// Live Continuous Industrial Telemetry Ticker Ribbon
const LIVE_TICKER_ITEMS = [
  { label: 'AOI LINE #04', value: 'ONLINE (120 FPS)', dotColor: 'bg-[#A7F3D0]', valueColor: 'text-[#A7F3D0]' },
  { label: 'WAFER TELEMETRY', value: '148,924 INSPECTED TODAY', dotColor: 'bg-[#F5A882]', valueColor: 'text-[#FAF8F5]' },
  { label: 'RECENT DETECTION', value: 'DIE [D-C3] SOLDER BRIDGE (99.4%)', dotColor: 'bg-[#FDE68A]', valueColor: 'text-[#FDE68A]' },
  { label: 'CONFIDENTIAL VAULTS', value: '100% ISOLATED & ENCRYPTED', dotColor: 'bg-[#A7F3D0]', valueColor: 'text-[#A7F3D0]' },
  { label: 'OPTICAL TOLERANCE', value: '±0.05mm SUB-MILLIMETER NYQUIST', dotColor: 'bg-[#C4B5FD]', valueColor: 'text-[#C4B5FD]' },
  { label: 'COMPLIANCE AUDIT', value: 'ISO-9001:2015 SECTION 8.5.1 PASSED', dotColor: 'bg-[#A7F3D0]', valueColor: 'text-[#A7F3D0]' },
  { label: 'YIELD METRIC', value: '99.84% FIRST-PASS YIELD (FPY)', dotColor: 'bg-[#F5A882]', valueColor: 'text-[#F5A882]' },
];

// Silicon Wafer Die Map: 21 Interactive Dies
const WAFER_DIES = [
  { id: 'D-A2', r: 1, c: 2, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-A3', r: 1, c: 3, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-A4', r: 1, c: 4, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-B1', r: 2, c: 1, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-B2', r: 2, c: 2, status: 'void', name: 'BGA Void', preset: 1 },
  { id: 'D-B3', r: 2, c: 3, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-B4', r: 2, c: 4, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-B5', r: 2, c: 5, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-C1', r: 3, c: 1, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-C2', r: 3, c: 2, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-C3', r: 3, c: 3, status: 'solder', name: 'Solder Bridge', preset: 0 },
  { id: 'D-C4', r: 3, c: 4, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-C5', r: 3, c: 5, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-D1', r: 4, c: 1, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-D2', r: 4, c: 2, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-D3', r: 4, c: 3, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-D4', r: 4, c: 4, status: 'nominal', name: 'Coplanarity Pass', preset: 2 },
  { id: 'D-D5', r: 4, c: 5, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-E2', r: 5, c: 2, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-E3', r: 5, c: 3, status: 'pass', name: 'Nominal Spec', preset: 2 },
  { id: 'D-E4', r: 5, c: 4, status: 'pass', name: 'Nominal Spec', preset: 2 },
];

// Interactive Telecentric Camera Live Inspection Presets
const SCANNER_PRESETS = [
  {
    id: 'solder',
    title: 'QFP-48 SOLDER BRIDGE',
    verdict: 'REWORK REQUIRED',
    verdictClass: 'text-[#FDE68A] bg-[#FDE68A]/15 border-[#FDE68A]/40',
    conf: '99.4%',
    coords: '[340, 420, 480, 560]',
    span: '0.42 mm bridge span',
    boxStyle: { top: '34%', left: '38%', width: '135px', height: '82px' },
    pulseColor: '#FDE68A',
  },
  {
    id: 'void',
    title: 'BGA SUB-SURFACE VOID',
    verdict: 'CRITICAL SCRAP',
    verdictClass: 'text-[#FDA4AF] bg-[#FDA4AF]/15 border-[#FDA4AF]/40',
    conf: '99.8%',
    coords: '[120, 210, 240, 330]',
    span: '28.4% Area Voiding',
    boxStyle: { top: '22%', left: '22%', width: '115px', height: '115px' },
    pulseColor: '#FDA4AF',
  },
  {
    id: 'nominal',
    title: 'COPLANARITY SPEC OK',
    verdict: 'NOMINAL PASS',
    verdictClass: 'text-[#A7F3D0] bg-[#A7F3D0]/15 border-[#A7F3D0]/40',
    conf: '99.9%',
    coords: '[280, 310, 360, 410]',
    span: '0.012 mm (In Tolerance)',
    boxStyle: { top: '48%', left: '55%', width: '110px', height: '70px' },
    pulseColor: '#A7F3D0',
  },
];

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const [activeDeckIndex, setActiveDeckIndex] = useState(2); // Middle card
  const [deckProgress, setDeckProgress] = useState(0.5); // 0 to 1
  const [isFlipped, setIsFlipped] = useState(false); // Dual-state flip
  const [scrambleText, setScrambleText] = useState('RAW_TELECENTRIC_STREAM_01');
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // 3D mouse parallax
  const [zoomLevel, setZoomLevel] = useState(40); // 10x, 40x, 100x zoom loupe
  const [selectedTol, setSelectedTol] = useState('0.05'); // Oryzo-style tolerance preset
  const [activePresetIndex, setActivePresetIndex] = useState(0); // Live camera preset
  const [liveWaferCount, setLiveWaferCount] = useState(148924); // Ticking factory counter
  const [opticalMode, setOpticalMode] = useState('segmented'); // 'segmented' | 'raw'
  const [isScanning, setIsScanning] = useState(false); // Live scanning sweep state
  const [selectedDieId, setSelectedDieId] = useState('D-C3'); // Active silicon wafer die

  const handleTriggerScan = (presetIdx) => {
    setIsScanning(true);
    if (typeof presetIdx === 'number') {
      setActivePresetIndex(presetIdx);
    }
    setTimeout(() => {
      setIsScanning(false);
    }, 1300);
  };

  const deckSectionRef = useRef(null);
  const targetProgress = useRef(0.5);
  const currentProgress = useRef(0.5);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startProgress = useRef(0.5);

  // Live Factory Ticking Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveWaferCount((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for smooth staggered scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll-Linked Horizontal Motion for Defect Deck
  useEffect(() => {
    let animId;

    const handleWindowScroll = () => {
      if (!deckSectionRef.current) return;
      const rect = deckSectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      const totalDistance = vh + rect.height;
      const rawProgress = (vh - rect.top) / totalDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      
      targetProgress.current = clamped;
    };

    const updateLoop = () => {
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      setDeckProgress(currentProgress.current);

      const floatIndex = currentProgress.current * (DEFECT_DECK.length - 1);
      const roundedIndex = Math.max(0, Math.min(DEFECT_DECK.length - 1, Math.round(floatIndex)));
      setActiveDeckIndex(roundedIndex);

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Drag & Wheel interactions
  const handleDeckWheel = (e) => {
    const delta = (e.deltaY || e.deltaX) * 0.0006;
    targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + delta));
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startProgress.current = targetProgress.current;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    const delta = -dx * 0.0018;
    targetProgress.current = Math.max(0, Math.min(1, startProgress.current + delta));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // 3D Parallax Tilt for Interactive Wafer Scanner Preview
  const handleScannerMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 10), y: x * 10 });
  };

  const handleScannerMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Flip Card Cipher Scramble Animation
  const handleFlipCard = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    const chars = '0123456789ABCDEF#%&*<>[]{}';
    const targetText = nextFlipped
      ? 'GEMINI_3.8_TENSOR: [340, 420, 480, 560]'
      : 'RAW_TELECENTRIC_STREAM_01';
    
    let step = 0;
    const interval = setInterval(() => {
      setScrambleText(() => {
        return targetText
          .split('')
          .map((ch, idx) => {
            if (idx < step) return ch;
            if (ch === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });
      step += 2;
      if (step > targetText.length) {
        clearInterval(interval);
        setScrambleText(targetText);
      }
    }, 25);
  };

  const activeDefect = DEFECT_DECK[activeDeckIndex];
  const activeScannerPreset = SCANNER_PRESETS[activePresetIndex];

  // Oryzo Tolerance Presets
  const tolPresets = {
    '0.05': {
      title: 'Ultra-Precision Class 3',
      tol: '±0.05 mm',
      target: 'Aerospace NDT & Medical Implants',
      f1Score: '99.8%',
      fpy: '94.2%',
      nyquist: '0.025 mm / pixel',
      gradient: 'from-[#FAF8F5] via-[#F5A882] to-[#E07A5F]',
      barWidth: '98%',
    },
    '0.10': {
      title: 'Balanced Production Mode',
      tol: '±0.10 mm',
      target: 'High-Volume SMT Electronics',
      f1Score: '99.4%',
      fpy: '98.6%',
      nyquist: '0.050 mm / pixel',
      gradient: 'from-[#F5A882] to-[#E07A5F]',
      barWidth: '76%',
    },
    '0.25': {
      title: 'High-Throughput Casting',
      tol: '±0.25 mm',
      target: 'CNC Heavy Machined Enclosures',
      f1Score: '98.9%',
      fpy: '99.5%',
      nyquist: '0.125 mm / pixel',
      gradient: 'from-[#E07A5F] to-[#7C2D12]',
      barWidth: '45%',
    },
  }[selectedTol];

  return (
    <div className="bg-[#0E0B0A] text-[#FAF8F5] selection:bg-[#F5A882] selection:text-[#0E0B0A] overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP TECHNICAL RUNNER (Oryzo-Style Minimalist Spec Bar)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#080605] border-b border-[#2D1F1A] px-4 py-2 text-[10px] font-mono text-[#C5B7AE] flex flex-wrap items-center justify-between gap-2 z-20 relative">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#A7F3D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A7F3D0] animate-pulse" />
            <span className="font-bold">SYSTEM ACTIVE</span>
          </span>
          <span className="text-[#2D1F1A]">|</span>
          <span className="text-[#C5B7AE]">OPTICAL CORE v3.8</span>
          <span className="text-[#2D1F1A] hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#C4B5FD]">TELECENTRIC 4K • 120 FPS</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[#F5A882]">SUB-MILLIMETER TENSOR RES: 0.05mm</span>
          <span className="text-[#2D1F1A] hidden md:inline">|</span>
          <span className="hidden md:inline text-[#FAF8F5]/80">ISO-9001:2015 AUDITED</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION: CINEMATIC, PASTEL AURA & LIVE INTERACTIVE SCANNER
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-20 border-b border-[#2D1F1A] bg-[#0E0B0A] radar-grid overflow-hidden">
        {/* Oryzo Pastel Light Leaks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[520px] diffused-light-leak pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[#F5A882]/10 blur-[130px] pointer-events-none rounded-full animate-float-aura" />

        {/* Ambient Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
          <span className="text-[14vw] font-black uppercase tracking-tight text-[#F5A882]/[0.025] leading-none whitespace-nowrap block">
            NEXCAN AI
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Live Factory Ticking Counter Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#171210] border border-[#A7F3D0]/30 text-xs font-mono mb-5 shadow-lg shadow-[#A7F3D0]/10">
            <span className="w-2 h-2 rounded-full bg-[#A7F3D0] animate-ping" />
            <span className="text-[#C5B7AE]">LIVE LINE TELEMETRY:</span>
            <span className="text-white font-bold">{liveWaferCount.toLocaleString()}</span>
            <span className="text-[#A7F3D0] font-semibold">WAFERS INSPECTED TODAY</span>
            <span className="text-[#2D1F1A]">|</span>
            <span className="text-[#F5A882]">99.4% FPY</span>
          </div>

          {/* Staged Rising Title with Warm Pastel Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Autonomous Quality Assurance &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#F5A882] to-[#C4B5FD]">
              Defect Intelligence
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-[#C5B7AE] max-w-2xl mx-auto leading-relaxed">
            Eliminate human visual fatigue on manufacturing lines. Instant sub-millimeter flaw localization, automated root-cause disposition (
            <code className="text-[#A7F3D0] font-bold bg-[#A7F3D0]/15 px-1.5 py-0.5 rounded border border-[#A7F3D0]/30">PASS</code> /{' '}
            <code className="text-[#FDE68A] font-bold bg-[#FDE68A]/15 px-1.5 py-0.5 rounded border border-[#FDE68A]/30">REWORK</code> /{' '}
            <code className="text-[#FDA4AF] font-bold bg-[#FDA4AF]/15 px-1.5 py-0.5 rounded border border-[#FDA4AF]/30">SCRAP</code>), and verified ISO-9001 compliance audit trails.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onLaunchApp}
              data-cursor="pointer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F5A882] via-[#E07A5F] to-[#7C2D12] hover:brightness-110 text-[#0E0B0A] font-bold text-xs tracking-wider uppercase shadow-xl shadow-[#F5A882]/25 flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-[#0E0B0A]" />
              <span>Launch Live Inspector</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              data-cursor="pointer"
              className="px-5 py-3.5 rounded-xl bg-[#171210] hover:bg-[#231A16] border border-[#F5A882]/40 text-[#F5A882] font-mono text-xs font-semibold shadow-lg transition-all cursor-pointer flex items-center space-x-2 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#F5A882] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>

            <button
              onClick={() => onOpenLogin && onOpenLogin()}
              data-cursor="pointer"
              className="px-5 py-3.5 rounded-xl bg-[#0E0B0A] hover:bg-[#171210] border border-[#2D1F1A] hover:border-[#F5A882]/40 text-[#FAF8F5] font-mono text-xs font-medium transition-all cursor-pointer flex items-center space-x-2"
            >
              <User className="w-3.5 h-3.5 text-[#F5A882]" />
              <span>Sign In / Create Account</span>
            </button>
          </div>

          {/* FOREGROUND INTERACTIVE OPTICAL SCANNER WITH LIVE DEFECT PRESETS & 3D TILT */}
          <div
            onMouseMove={handleScannerMouseMove}
            onMouseLeave={handleScannerMouseLeave}
            data-cursor="inspect"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="mt-10 max-w-3xl mx-auto relative rounded-3xl bg-[#140F0D] border border-[#2D1F1A] p-4 shadow-2xl overflow-hidden group select-none"
          >
            {/* Oryzo Sub-pixel Corner Crosshairs */}
            <div className="absolute top-2 left-2 text-[#F5A882]/50 font-mono text-xs">+</div>
            <div className="absolute top-2 right-2 text-[#F5A882]/50 font-mono text-xs">+</div>
            <div className="absolute bottom-2 left-2 text-[#F5A882]/50 font-mono text-xs">+</div>
            <div className="absolute bottom-2 right-2 text-[#F5A882]/50 font-mono text-xs">+</div>

            {/* Interactive Live Sample Presets Selector & Instant Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#2D1F1A] px-2 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-[#A7F3D0] animate-pulse" />
                <span className="font-bold text-white text-[11px]">SELECT LIVE SAMPLE:</span>
              </div>
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {SCANNER_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setActivePresetIndex(idx);
                      handleTriggerScan(idx);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                      activePresetIndex === idx
                        ? 'bg-[#F5A882] text-[#0E0B0A] shadow-md'
                        : 'bg-[#171210] text-[#C5B7AE] hover:text-white border border-[#2D1F1A]'
                    }`}
                  >
                    {preset.id === 'solder' && '⚡ Solder Bridge'}
                    {preset.id === 'void' && '☢️ BGA Void'}
                    {preset.id === 'nominal' && '✓ Nominal Spec'}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handleTriggerScan()}
                  disabled={isScanning}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#F5A882] to-[#E07A5F] hover:brightness-110 text-[#0E0B0A] text-[10px] font-black font-mono shadow-md flex items-center space-x-1 cursor-pointer active:scale-95 transition-all"
                >
                  <Zap className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'SCANNING...' : 'TRIGGER RE-SCAN'}</span>
                </button>
              </div>
            </div>

            {/* Wafer Viewport with Animated Laser Sweep & Interactive Target */}
            <div className="relative mt-3 h-64 sm:h-80 rounded-2xl bg-[#080605] border border-[#231A16] overflow-hidden flex items-center justify-center">
              {/* Subtle Grid and Reticle */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,168,130,0.08)_0,transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D1F1A_1px,transparent_1px),linear-gradient(to_bottom,#2D1F1A_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
              
              {/* Concentric Optical Circles */}
              <div className="absolute w-56 h-56 rounded-full border border-[#F5A882]/20 pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#F5A882]/35 pointer-events-none" />
              <div className="absolute w-16 h-16 rounded-full border border-[#A7F3D0]/40 pointer-events-none" />

              {/* Standard Laser Sweep Line */}
              {!isScanning && (
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5A882] to-transparent shadow-[0_0_14px_#F5A882] animate-laser-sweep pointer-events-none" />
              )}

              {/* Active Manual Fast Scan Sweep Bar with Spark Trail */}
              {isScanning && (
                <>
                  <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#A7F3D0] to-transparent shadow-[0_0_25px_#A7F3D0] animate-fast-scan pointer-events-none z-30" />
                  <div className="absolute inset-0 bg-[#A7F3D0]/5 animate-pulse pointer-events-none z-20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#0E0B0A]/90 border border-[#A7F3D0] text-[#A7F3D0] font-mono text-xs font-bold tracking-wider shadow-2xl z-30 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#A7F3D0] animate-ping" />
                    <span>ANALYZING 480 SUB-REGIONS (120 FPS)...</span>
                  </div>
                </>
              )}

              {/* Dynamic Target Bounding Box (Smooth Morphing to Active Preset) */}
              {opticalMode === 'segmented' && (
                <div
                  style={{
                    position: 'absolute',
                    ...activeScannerPreset.boxStyle,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="rounded border-2 border-[#F5A882] bg-[#F5A882]/15 shadow-[0_0_20px_rgba(245,168,130,0.35)] flex flex-col justify-between p-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#0E0B0A] bg-[#F5A882] px-1 rounded-sm truncate">
                      {activeScannerPreset.title}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A882] animate-ping ml-1 shrink-0" />
                  </div>
                  <div className="text-[8px] font-mono text-[#FAF8F5] bg-[#0E0B0A]/85 p-0.5 rounded flex justify-between">
                    <span>{activeScannerPreset.span}</span>
                    <span className="text-[#A7F3D0]">{activeScannerPreset.conf}</span>
                  </div>
                </div>
              )}

              {/* MINI SILICON WAFER DIE MATRIX (Interactive 21-Die Map) */}
              <div className="absolute top-3 left-3 bg-[#171210]/90 backdrop-blur border border-[#2D1F1A] p-2 rounded-xl text-[10px] font-mono z-20">
                <div className="flex items-center justify-between space-x-2 mb-1.5">
                  <span className="text-[#C5B7AE] text-[9px] font-bold">WAFER MAP (300mm):</span>
                  <span className="text-[#F5A882] text-[9px] font-bold">{selectedDieId}</span>
                </div>
                {/* Micro Wafer Die Grid */}
                <div className="relative w-20 h-20 rounded-full border border-[#2D1F1A] bg-[#0E0B0A] p-1.5 flex items-center justify-center overflow-hidden">
                  {/* Subtle rotating radar beam */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F5A882]/10 to-transparent animate-radar-beam pointer-events-none" />
                  
                  {/* Grid of dies */}
                  <div className="grid grid-cols-5 gap-0.5 relative z-10">
                    {WAFER_DIES.slice(0, 15).map((die) => (
                      <button
                        key={die.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDieId(die.id);
                          if (typeof die.preset === 'number') {
                            handleTriggerScan(die.preset);
                          } else {
                            handleTriggerScan(2);
                          }
                        }}
                        title={`${die.id}: ${die.name}`}
                        className={`w-2.5 h-2.5 rounded-[1px] transition-all cursor-pointer ${
                          die.status === 'void'
                            ? 'bg-[#FDA4AF]'
                            : die.status === 'solder'
                            ? 'bg-[#FDE68A]'
                            : 'bg-[#A7F3D0]/60 hover:bg-[#A7F3D0]'
                        } ${selectedDieId === die.id ? 'ring-1 ring-white scale-125 z-20' : 'opacity-80'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Telecentric Zoom Loupe & View Mode Controls */}
              <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-[#171210]/90 backdrop-blur border border-[#2D1F1A] p-1 rounded-xl font-mono text-[10px] z-20">
                <button
                  type="button"
                  onClick={() => setOpticalMode((m) => (m === 'segmented' ? 'raw' : 'segmented'))}
                  className="px-2 py-0.5 rounded-lg text-[#F5A882] hover:bg-[#231A16] font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>{opticalMode === 'segmented' ? 'AI TENSOR' : 'RAW SENSOR'}</span>
                </button>
                <div className="w-[1px] h-3 bg-[#2D1F1A]" />
                {[
                  { label: '10X', val: 10 },
                  { label: '40X', val: 40 },
                  { label: '100X', val: 100 }
                ].map((z) => (
                  <button
                    key={z.val}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomLevel(z.val);
                    }}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                      zoomLevel === z.val
                        ? 'bg-[#F5A882] text-[#0E0B0A]'
                        : 'text-[#C5B7AE] hover:text-white'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>

              {/* Status Badges Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#171210]/90 backdrop-blur border border-[#2D1F1A] px-2.5 py-1 rounded-md text-[10px] font-mono text-[#C5B7AE] z-20">
                AI ENGINE: <span className="text-[#F5A882] font-bold">GEMINI 3.8 FLASH</span>
              </div>

              <div className={`absolute bottom-3 right-3 bg-[#171210]/90 backdrop-blur border px-2.5 py-1 rounded-md text-[10px] font-mono font-bold z-20 ${activeScannerPreset.verdictClass}`}>
                {activeScannerPreset.verdict} ({activeScannerPreset.conf})
              </div>
            </div>

            {/* Quick Actions Footer with Real-Time Dynamic MTF Equalizer */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono px-2 pt-1">
              {/* 8 Live Animated Optical Equalizer Bars */}
              <div className="flex items-center space-x-2 text-[11px] text-[#C5B7AE]">
                <span className="text-[#A7F3D0] text-[10px] font-bold">MTF SENSOR 120 FPS:</span>
                <div className="flex items-end space-x-0.5 h-4">
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#F5A882] rounded-t-sm animate-eq-1" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#F5A882] rounded-t-sm animate-eq-2" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#F5A882] rounded-t-sm animate-eq-3" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#A7F3D0] rounded-t-sm animate-eq-4" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#A7F3D0] rounded-t-sm animate-eq-5" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#F5A882] rounded-t-sm animate-eq-6" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#F5A882] rounded-t-sm animate-eq-7" />
                  <div className="w-1 bg-gradient-to-t from-[#E07A5F] to-[#F5A882] rounded-t-sm animate-eq-8" />
                </div>
                <span className="text-[#C4B5FD] text-[10px] hidden sm:inline">NYQUIST 94.6 lp/mm</span>
              </div>

              <button
                onClick={onLaunchApp}
                className="text-[#F5A882] hover:text-white font-bold inline-flex items-center space-x-1 cursor-pointer transition-colors ml-auto text-xs"
              >
                <span>Launch Full Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2.5 CONTINUOUS INDUSTRIAL TELEMETRY TICKER MARQUEE
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#080605] border-y border-[#2D1F1A] py-2.5 overflow-hidden relative select-none">
        <div className="animate-conveyor flex items-center space-x-6 text-[10px] sm:text-[11px] font-mono tracking-wider">
          {[...LIVE_TICKER_ITEMS, ...LIVE_TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor} animate-ping`} />
              <span className="text-[#C5B7AE]">{item.label}:</span>
              <span className={`font-bold ${item.valueColor}`}>{item.value}</span>
              <span className="text-[#2D1F1A] ml-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. KEY PRODUCTION BENCHMARKS (Pastel Glass Cards)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-[#2D1F1A] bg-[#140F0D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 scroll-reveal">
            <span className="sub1 text-[#F5A882]">PRODUCTION CALIBRATED SPECS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] mt-1 uppercase tracking-tight">
              Optical Benchmarks &amp; Real-Time Throughput
            </h2>
          </div>

          {/* 4 FLOATING GLASS METRIC CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
            
            {/* Metric 1: Accuracy */}
            <div className="scroll-reveal delay-100 p-6 rounded-2xl interactive-glass-card flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#FAF8F5] font-mono tracking-tight">
                99.4<span className="text-sm text-[#F5A882]">%</span>
              </span>
              <span className="text-xs font-bold text-[#FAF8F5] uppercase mt-1.5">F1 Accuracy</span>
              <span className="text-[11px] font-mono text-[#C5B7AE] mt-0.5">Sub-pixel validation</span>
            </div>

            {/* Metric 2: Hero Accent with Pastel Gradient */}
            <div className="scroll-reveal delay-200 p-6 rounded-2xl bg-gradient-to-br from-[#F5A882] via-[#E07A5F] to-[#7C2D12] shadow-xl shadow-[#F5A882]/20 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.03]">
              <span className="text-3xl sm:text-4xl font-black text-[#0E0B0A] font-mono tracking-tight">
                14<span className="text-sm text-[#0E0B0A]/80">ms</span>
              </span>
              <span className="text-xs font-extrabold text-[#0E0B0A] uppercase mt-1.5">Edge Latency</span>
              <span className="text-[11px] font-mono text-[#0E0B0A]/80 mt-0.5">Real-time conveyor gate</span>
            </div>

            {/* Metric 3: Flaw Limit */}
            <div className="scroll-reveal delay-300 p-6 rounded-2xl interactive-glass-card flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#FAF8F5] font-mono tracking-tight">
                0.05<span className="text-sm text-[#A7F3D0]">mm</span>
              </span>
              <span className="text-xs font-bold text-[#FAF8F5] uppercase mt-1.5">Flaw Limit</span>
              <span className="text-[11px] font-mono text-[#C5B7AE] mt-0.5">Telecentric zoom res</span>
            </div>

            {/* Metric 4: ISO Compliance */}
            <div className="scroll-reveal delay-400 p-6 rounded-2xl interactive-glass-card flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#FAF8F5] font-mono tracking-tight">
                ISO 9001
              </span>
              <span className="text-xs font-bold text-[#FAF8F5] uppercase mt-1.5">Audit Ledger</span>
              <span className="text-[11px] font-mono text-[#A7F3D0] mt-0.5">Tamper-proof logs</span>
            </div>

          </div>

        </div>

        {/* CONTINUOUS CONVEYOR SPROCKET TAPE */}
        <div className="w-full overflow-hidden border-y border-[#2D1F1A] bg-[#0A0706] py-2.5">
          <div className="animate-conveyor flex items-center space-x-6 text-xs font-mono text-[#C5B7AE]">
            {[...CONVEYOR_ITEMS, ...CONVEYOR_ITEMS].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#171210] border border-[#2D1F1A]/80 shrink-0"
              >
                <Cpu className="w-3.5 h-3.5 text-[#F5A882]" />
                <span className="text-[#FAF8F5] font-bold">{item.id}</span>
                <span className="text-[#2D1F1A]">|</span>
                <span
                  className={
                    item.status === 'PASS'
                      ? 'text-[#A7F3D0] font-bold'
                      : item.status === 'REWORK'
                      ? 'text-[#FDE68A] font-bold'
                      : 'text-[#FDA4AF] font-bold'
                  }
                >
                  {item.status}
                </span>
                <span className="text-[#C5B7AE]/70 text-[10px]">{item.flaw}</span>
                <span className="text-[#2D1F1A]">|</span>
                <span className="text-[#FAF8F5]/60 text-[10px]">{item.conf}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. ORYZO-INSPIRED AI SENSITIVITY & TOLERANCE CALIBRATION SLIDER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#2D1F1A] bg-[#0E0B0A] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 scroll-reveal">
            <div>
              <div className="sub1 text-[#F5A882] mb-1.5 flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#F5A882]" />
                <span>DYNAMIC CALIBRATION PROTOCOL // IPC-A-610</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight uppercase">
                AI Tolerance &amp; Sensitivity Matrix
              </h2>
            </div>
            <p className="text-xs text-[#C5B7AE] max-w-xs md:text-right">
              Calibrate neural classification strictness according to industrial compliance standards.
            </p>
          </div>

          <div className="o-dashline mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: 3 Selectable Precision Tiers (5 cols) */}
            <div className="md:col-span-5 space-y-3 scroll-reveal delay-100">
              {[
                { id: '0.05', label: 'Ultra-Precision Class 3', tol: 'T = 0.05 mm', desc: 'Zero defect tolerance. Rejects sub-millimeter solder voids and micro-cracks.' },
                { id: '0.10', label: 'Balanced Production Mode', tol: 'T = 0.10 mm', desc: 'Standard for consumer electronics and automotive PCB assemblies.' },
                { id: '0.25', label: 'High-Throughput Casting', tol: 'T = 0.25 mm', desc: 'Permissive baseline for raw structural castings and high-speed CNC deburring.' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-cursor="pointer"
                  onClick={() => setSelectedTol(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedTol === item.id
                      ? 'border-[#F5A882] bg-[#1C1613] shadow-lg shadow-[#F5A882]/15 ring-1 ring-[#F5A882]'
                      : 'border-[#2D1F1A] bg-[#140F0D] hover:border-[#F5A882]/40 hover:bg-[#1A1310]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-[#FAF8F5]">{item.label}</span>
                    <span className="font-mono text-xs text-[#F5A882] font-bold bg-[#F5A882]/10 px-2 py-0.5 rounded border border-[#F5A882]/30">
                      {item.tol}
                    </span>
                  </div>
                  <p className="text-xs text-[#C5B7AE] leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Right: Telemetry Readout (7 cols) */}
            <div className="md:col-span-7 p-6 rounded-3xl bg-[#171210] border border-[#2D1F1A] shadow-xl scroll-reveal delay-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#2D1F1A]">
                <div>
                  <span className="sub1 text-[#A7F3D0]">ACTIVE PRESET</span>
                  <h3 className="text-lg font-bold text-[#FAF8F5] mt-0.5">{tolPresets.title}</h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-[#C5B7AE] block">THRESHOLD</span>
                  <span className="text-lg font-extrabold text-[#F5A882]">{tolPresets.tol}</span>
                </div>
              </div>

              {/* Sensitivity Gauge Bar */}
              <div className="my-5">
                <div className="flex justify-between text-[11px] font-mono text-[#C5B7AE] mb-2">
                  <span>SENSITIVITY MATRIX</span>
                  <span>F1 SCORE: <strong className="text-[#FAF8F5]">{tolPresets.f1Score}</strong></span>
                </div>
                <div className="w-full bg-[#080605] h-3 rounded-full overflow-hidden border border-[#2D1F1A] p-[1px]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${tolPresets.gradient} transition-all duration-500`}
                    style={{ width: tolPresets.barWidth }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#2D1F1A] font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-[#0E0B0A] border border-[#2D1F1A]">
                  <div className="text-[#C5B7AE] text-[10px]">NYQUIST LIMIT</div>
                  <div className="text-[#FAF8F5] font-bold mt-0.5">{tolPresets.nyquist}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0E0B0A] border border-[#2D1F1A]">
                  <div className="text-[#C5B7AE] text-[10px]">APPLICATION DOMAIN</div>
                  <div className="text-[#A7F3D0] font-bold mt-0.5 truncate">{tolPresets.target}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SCROLL-DRIVEN 3D DEFECT GALLERY (Fluid Horizontal Motion)
          ───────────────────────────────────────────────────────────── */}
      <section
        ref={deckSectionRef}
        onWheel={handleDeckWheel}
        className="py-20 border-b border-[#2D1F1A] bg-[#140F0D] relative select-none overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 scroll-reveal">
            <div className="sub1 text-[#F5A882] mb-2 flex items-center justify-center space-x-2">
              <Layers className="w-4 h-4 text-[#F5A882]" />
              <span>SUB-MILLIMETER INSPECTION DECK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight uppercase">
              Interactive Defect Sample Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#C5B7AE] mt-2 max-w-xl mx-auto">
              Scroll down to glide the cards sideways. Observe the sub-millimeter bounding box coordinates and remediation protocols.
            </p>

            {/* Scroll Navigation Cue */}
            <div className="mt-4 inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#171210] border border-[#2D1F1A] text-[11px] font-mono text-[#F5A882] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#F5A882] animate-pulse" />
              <span>SCROLL DOWN</span>
              <span className="text-[#F5A882]">⟶</span>
              <span className="text-white font-bold">GLIDES HORIZONTALLY</span>
              <span className="text-[#2D1F1A]">|</span>
              <span className="text-[#C5B7AE]">DRAG OR WHEEL INTERACTIVE</span>
            </div>
          </div>

          {/* 3D SCROLL-DRIVEN FANNED STAGE */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            data-cursor="inspect"
            className="relative w-full max-w-5xl mx-auto min-h-[360px] sm:min-h-[400px] flex items-center justify-center py-6 cursor-grab active:cursor-grabbing [perspective:1200px]"
          >
            {/* Center Spotlight Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F5A882]/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Render 5 Cards whose positions glide smoothly based on deckProgress */}
            <div className="relative w-full h-[320px] flex items-center justify-center">
              {DEFECT_DECK.map((defect, idx) => {
                const floatIndex = deckProgress * (DEFECT_DECK.length - 1);
                const offset = (floatIndex - idx);
                const cardX = offset * 135;
                const distFromCenter = Math.abs(cardX);
                const isSelected = idx === activeDeckIndex;

                // 3D Transforms
                const rot = Math.max(-20, Math.min(20, cardX * 0.04));
                const ty = Math.min(30, distFromCenter * 0.04);
                const zIndex = Math.max(1, 30 - Math.round(distFromCenter * 0.04));
                const scale = Math.max(0.85, 1.05 - distFromCenter * 0.0006);
                const opacity = Math.max(0.35, 1 - distFromCenter * 0.001);

                return (
                  <div
                    key={defect.id}
                    onClick={() => {
                      targetProgress.current = idx / (DEFECT_DECK.length - 1);
                    }}
                    style={{
                      transform: `translateX(${cardX}px) translateY(${ty}px) rotateZ(${rot}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                    className={`absolute w-72 sm:w-80 h-[300px] rounded-3xl p-5 cursor-pointer transition-all duration-100 ease-out select-none flex flex-col justify-between shadow-2xl ${
                      isSelected
                        ? 'bg-[#1C1613] border-2 border-[#F5A882] shadow-[0_0_35px_rgba(245,168,130,0.35)]'
                        : 'bg-[#140F0D] border border-[#2D1F1A] hover:border-[#F5A882]/50'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between text-[11px] font-mono pb-2 border-b border-[#2D1F1A]">
                        <span className="text-[#C5B7AE]">{defect.category}</span>
                        <span className={`px-2 py-0.5 rounded font-bold border text-[10px] ${defect.verdictColor}`}>
                          {defect.verdict}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="my-3">
                        <div className="text-xl mb-1.5">{defect.sampleIcon}</div>
                        <h4 className="text-base font-bold text-[#FAF8F5] uppercase tracking-tight">
                          {defect.title}
                        </h4>
                        <p className="text-xs text-[#C5B7AE] mt-1 leading-relaxed line-clamp-2">
                          {defect.description}
                        </p>
                      </div>

                      {/* Technical Readout */}
                      <div className="p-2 rounded-xl bg-[#080605] border border-[#2D1F1A] space-y-1 font-mono text-[10px]">
                        <div className="flex justify-between text-[#C5B7AE]">
                          <span>COORDINATES:</span>
                          <span className="text-[#FAF8F5] font-bold">{defect.coords}</span>
                        </div>
                        <div className="flex justify-between text-[#C5B7AE]">
                          <span>DEVIATION:</span>
                          <span className="text-[#F5A882] font-bold">{defect.delta}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 border-t border-[#2D1F1A] flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#C5B7AE]">{defect.badge}</span>
                      <span className="text-[#A7F3D0] font-bold">CONF: {defect.confidence}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* DECK NAVIGATION CONTROLS & PROGRESS RAIL */}
          <div className="flex flex-col items-center justify-center space-y-3 mt-4">
            
            {/* Interactive Progress Slider Rail */}
            <div className="w-64 h-1.5 bg-[#171210] border border-[#2D1F1A] rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#E07A5F] to-[#F5A882] rounded-full transition-all duration-75"
                style={{ width: `${Math.max(5, Math.min(100, deckProgress * 100))}%` }}
              />
            </div>

            <div className="flex items-center justify-center space-x-6">
              <button
                type="button"
                data-cursor="pointer"
                onClick={() => {
                  targetProgress.current = Math.max(0, targetProgress.current - 0.25);
                }}
                className="w-11 h-11 rounded-full bg-[#171210] hover:bg-[#231A16] border border-[#2D1F1A] hover:border-[#F5A882] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous defect"
              >
                <ChevronLeft className="w-5 h-5 text-[#F5A882]" />
              </button>

              {/* Indicator Pills */}
              <div className="flex items-center space-x-2 font-mono text-xs">
                {DEFECT_DECK.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    data-cursor="pointer"
                    onClick={() => {
                      targetProgress.current = i / (DEFECT_DECK.length - 1);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeDeckIndex ? 'w-8 bg-[#F5A882]' : 'w-2 bg-[#2D1F1A] hover:bg-[#C5B7AE]'
                    }`}
                    aria-label={`Jump to sample ${i + 1}`}
                  />
                ))}
                <span className="text-[#C5B7AE] ml-2 text-xs">
                  0{activeDeckIndex + 1} / 0{DEFECT_DECK.length}
                </span>
              </div>

              <button
                type="button"
                data-cursor="pointer"
                onClick={() => {
                  targetProgress.current = Math.min(1, targetProgress.current + 0.25);
                }}
                className="w-11 h-11 rounded-full bg-[#171210] hover:bg-[#231A16] border border-[#2D1F1A] hover:border-[#F5A882] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next defect"
              >
                <ChevronRight className="w-5 h-5 text-[#F5A882]" />
              </button>
            </div>
          </div>

          {/* ACTIVE DEFECT DETAIL CARD (Uncluttered, High Legibility) */}
          <div className="mt-8 max-w-2xl mx-auto p-5 rounded-2xl bg-[#171210] border border-[#2D1F1A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#FAF8F5] uppercase">{activeDefect.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${activeDefect.verdictColor}`}>
                  {activeDefect.verdict}
                </span>
              </div>
              <p className="text-xs text-[#C5B7AE] font-mono">
                Protocol: <span className="text-[#FAF8F5]">{activeDefect.action}</span>
              </p>
            </div>

            <button
              onClick={onLaunchApp}
              data-cursor="pointer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A882] to-[#E07A5F] hover:brightness-110 text-[#0E0B0A] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow cursor-pointer transition-transform hover:scale-[1.02]"
            >
              Inspect in Live Console
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DUAL-STATE NEURAL DECODER & 4-STEP PIPELINE
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#2D1F1A] bg-[#0E0B0A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 scroll-reveal">
            <div className="sub1 text-[#F5A882] mb-2 flex items-center justify-center space-x-2">
              <Scan className="w-4 h-4 text-[#F5A882]" />
              <span>DUAL-STATE OPTICAL TRANSITION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight uppercase">
              Smart Neural Anomaly Flip
            </h2>
            <p className="text-xs sm:text-sm text-[#C5B7AE] mt-2 max-w-lg mx-auto">
              Flip between raw telecentric photon exposure and real-time Gemini neural tensor segmentation with cryptographic audit validation.
            </p>
          </div>

          {/* Interactive 3D Flip Card */}
          <div className="max-w-lg mx-auto h-[300px] perspective-1000 my-6 scroll-reveal">
            <div
              data-cursor="pointer"
              onClick={handleFlipCard}
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative w-full h-full cursor-pointer select-none"
            >
              {/* FRONT: RAW OPTICAL EXPOSURE */}
              <div
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#171210] border border-[#2D1F1A] p-6 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#C5B7AE] pb-3 border-b border-[#2D1F1A]">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#F5A882]" />
                      <span>STATE 01: RAW SENSOR CAPTURE</span>
                    </span>
                    <span className="text-[#F5A882]">1/2400s • ISO 100</span>
                  </div>

                  <div className="my-5 p-4 rounded-xl bg-[#080605] border border-[#2D1F1A]">
                    <div className="text-[10px] font-mono text-[#C5B7AE] mb-1">
                      SENSOR PHOTONS PENDING SEGMENTATION:
                    </div>
                    <div className="font-mono text-base font-bold text-[#FAF8F5] tracking-wider truncate">
                      {scrambleText}
                    </div>
                  </div>
                </div>

                <div className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5A882] via-[#E07A5F] to-[#7C2D12] text-[#0E0B0A] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2">
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span>CLICK TO FLIP // INFER NEURAL TENSOR MAP</span>
                </div>
              </div>

              {/* BACK: DECODED TENSOR MAP */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#171210] border border-[#F5A882]/70 p-6 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#F5A882] pb-3 border-b border-[#2D1F1A]">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#A7F3D0] animate-ping" />
                      <span>STATE 02: NEURAL INFERENCE MAP</span>
                    </span>
                    <span className="bg-[#FDE68A]/20 px-2 py-0.5 rounded border border-[#FDE68A]/40 text-[#FDE68A] font-bold">
                      VERDICT: REWORK (99.4%)
                    </span>
                  </div>

                  <div className="my-5 p-4 rounded-xl bg-[#080605] border border-[#F5A882]/30">
                    <div className="text-[10px] font-mono text-[#F5A882] mb-1">
                      NORMALIZED BOUNDING BOX [YMIN, XMIN, YMAX, XMAX]:
                    </div>
                    <div className="font-mono text-sm font-bold text-[#FAF8F5] truncate">
                      {scrambleText}
                    </div>
                  </div>
                </div>

                <div className="w-full py-3 rounded-xl bg-[#080605] border border-[#2D1F1A] text-[#F5A882] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2">
                  <RotateCw className="w-4 h-4" />
                  <span>CLICK TO FLIP // RETURN TO RAW SENSOR</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Step Process Breadcrumbs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-12 scroll-reveal">
            {[
              { num: '01', title: 'TELECENTRIC CAPTURE', desc: '120 FPS high-exposure' },
              { num: '02', title: 'GEMINI 3.8 FLASH', desc: 'Multi-tiered fallback' },
              { num: '03', title: 'SUB-PIXEL TENSOR', desc: 'Normalized bounding box' },
              { num: '04', title: 'PLC DIVERTER GATE', desc: '<14ms pneumatic fire' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#140F0D] border border-[#2D1F1A] text-left"
              >
                <div className="text-base font-black font-mono text-[#F5A882] mb-1">{step.num}</div>
                <div className="text-xs font-bold text-[#FAF8F5] uppercase">{step.title}</div>
                <div className="text-[10px] text-[#C5B7AE] mt-0.5">{step.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. THE INDUSTRIAL ADVANTAGE (LEGACY VS NEXCAN)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#2D1F1A] bg-[#140F0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <span className="sub1 text-[#F5A882]">THE DISRUPTION</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] mt-1 uppercase">
              Legacy AOI vs. Nexcan Autonomous Vision
            </h2>
            <p className="text-xs sm:text-sm text-[#C5B7AE] mt-2">
              Why leading semiconductor and aerospace lines replace static threshold cameras with multi-model AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Legacy Column */}
            <div className="scroll-reveal delay-100 p-7 rounded-3xl bg-[#171210] border border-[#FDA4AF]/30 relative shadow-xl">
              <div className="flex items-center space-x-2 text-[#FDA4AF] font-mono text-xs font-bold uppercase mb-4">
                <XCircle className="w-4 h-4" />
                <span>Legacy Rule-Based AOI &amp; Manual QA</span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF8F5] mb-3">Brittle Heuristics &amp; Human Fatigue</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#C5B7AE]">
                <li className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-[#FDA4AF] mt-0.5 shrink-0" />
                  <span>Human visual fatigue drops defect catch rates to &lt;82% after 20 minutes of line duty.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-[#FDA4AF] mt-0.5 shrink-0" />
                  <span>Threshold optical sensors trigger up to 18% false positive rejections, costing millions in scrap.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-[#FDA4AF] mt-0.5 shrink-0" />
                  <span>Zero cryptographic audit logging—untraceable compliance failures during ISO audits.</span>
                </li>
              </ul>
            </div>

            {/* Nexcan Autonomous Column */}
            <div className="scroll-reveal delay-200 p-7 rounded-3xl bg-gradient-to-b from-[#1C1613] to-[#140F0D] border border-[#F5A882]/50 relative shadow-2xl">
              <div className="flex items-center space-x-2 text-[#A7F3D0] font-mono text-xs font-bold uppercase mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nexcan Autonomous Defect Intelligence</span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF8F5] mb-3">Multi-Model Reasoning &amp; Sub-Millimeter Tensors</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#FAF8F5]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A7F3D0] mt-0.5 shrink-0" />
                  <span>Continuous 120 FPS inspection with verified 99.4% F1 precision across 0.05mm flaw sizes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A7F3D0] mt-0.5 shrink-0" />
                  <span>Multi-tiered Gemini Vision fallback eliminates downtime and adapts to lighting variations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A7F3D0] mt-0.5 shrink-0" />
                  <span>Automated ISO-9001 certified audit logs with tamper-proof cryptographic signatures.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FIELD VERIFIED TESTIMONIALS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#2D1F1A] bg-[#0E0B0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 scroll-reveal">
            <span className="sub1 text-[#F5A882]">FIELD VERIFIED</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] mt-1 uppercase">
              Proven in Mission-Critical Cleanrooms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            
            <div className="scroll-reveal delay-100 p-6 rounded-2xl interactive-glass-card flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#C5B7AE] italic leading-relaxed">
                "Nexcan reduced our micro-crack solder escapes by 94% on our QFP line within 48 hours of initial deployment. The 14ms latency is unmatched."
              </p>
              <div className="mt-5 pt-3.5 border-t border-[#2D1F1A] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#F5A882]/20 flex items-center justify-center font-bold text-xs text-[#F5A882]">
                  SC
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Dr. Sarah Chen</div>
                  <div className="text-[10px] font-mono text-[#C5B7AE]">Lead AOI Architect • Semiconductor Foundry</div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-200 p-6 rounded-2xl interactive-glass-card flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#C5B7AE] italic leading-relaxed">
                "The automated ISO-9001 audit export saved our team 25+ hours per audit cycle. Every disposition is timestamped and cryptographically verified."
              </p>
              <div className="mt-5 pt-3.5 border-t border-[#2D1F1A] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#F5A882]/20 flex items-center justify-center font-bold text-xs text-[#F5A882]">
                  MK
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Marcus Klein</div>
                  <div className="text-[10px] font-mono text-[#C5B7AE]">VP of Operations • Tier-1 Automotive Electronics</div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-300 p-6 rounded-2xl interactive-glass-card flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#C5B7AE] italic leading-relaxed">
                "We replaced three legacy camera stations with a single Nexcan AI telecentric rig. The sub-millimeter bounding box tensor accuracy is unbelievable."
              </p>
              <div className="mt-5 pt-3.5 border-t border-[#2D1F1A] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#F5A882]/20 flex items-center justify-center font-bold text-xs text-[#F5A882]">
                  JP
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Jean-Paul Dupont</div>
                  <div className="text-[10px] font-mono text-[#C5B7AE]">Quality Director • Medical Micro-Sensors</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. HIGH-CONVERSION BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0E0B0A] relative">
        <div className="max-w-4xl mx-auto px-4 text-center scroll-reveal">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#FAF8F5] tracking-tight uppercase">
            Deploy Autonomous Vision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#F5A882] to-[#C4B5FD]">
              On Your Lines in Minutes
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#C5B7AE] max-w-xl mx-auto">
            Zero visual inspection fatigue. Sub-millimeter bounding box localization. Direct integration with industrial PLC sorting lines.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              data-cursor="pointer"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F5A882] via-[#E07A5F] to-[#7C2D12] hover:brightness-110 text-[#0E0B0A] font-bold text-xs uppercase tracking-wider shadow-2xl shadow-[#F5A882]/30 flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Live Inspector Console</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              data-cursor="pointer"
              className="px-6 py-4 rounded-xl bg-[#171210] hover:bg-[#231A16] border border-[#F5A882]/40 text-[#F5A882] font-mono text-xs font-semibold shadow-lg transition-all cursor-pointer flex items-center space-x-2 hover:scale-[1.03]"
            >
              <Sparkles className="w-4 h-4 text-[#F5A882] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

          <div className="mt-8 text-xs font-mono text-[#C5B7AE]/60">
            Hardware Compatible: Basler • FLIR • IDS Imaging • Cognex • Allied Vision
          </div>

        </div>
      </section>

    </div>
  );
}
