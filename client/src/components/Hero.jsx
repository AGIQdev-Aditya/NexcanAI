import React, { useState, useEffect, useRef } from 'react';
import Spotlight from './Spotlight.jsx';
import OryzoShowcase from './OryzoShowcase.jsx';
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
  Eye,
  ExternalLink
} from 'lucide-react';

// Pre-calibrated defect library for the 3D interactive fanned deck
const DEFECT_DECK = [
  {
    id: 'solder-bridge',
    title: 'QFP-48 SOLDER BRIDGE',
    category: 'IC Lead Pin Short',
    verdict: 'REWORK',
    verdictColor: 'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/30',
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
    verdictColor: 'text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/30',
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
    verdictColor: 'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/30',
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
    verdictColor: 'text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30',
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
    verdictColor: 'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/30',
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
  { label: 'AOI LINE #04', value: 'ONLINE (120 FPS)', dotColor: 'bg-[#16A34A]', valueColor: 'text-[#16A34A]' },
  { label: 'WAFER TELEMETRY', value: '148,924 INSPECTED TODAY', dotColor: 'bg-[#C9B59C]', valueColor: 'text-[#1C1815]' },
  { label: 'RECENT DETECTION', value: 'DIE [D-C3] SOLDER BRIDGE (99.4%)', dotColor: 'bg-[#D97706]', valueColor: 'text-[#D97706]' },
  { label: 'CONFIDENTIAL VAULTS', value: '100% ISOLATED & ENCRYPTED', dotColor: 'bg-[#16A34A]', valueColor: 'text-[#16A34A]' },
  { label: 'OPTICAL TOLERANCE', value: '±0.05mm SUB-MILLIMETER NYQUIST', dotColor: 'bg-[#C9B59C]', valueColor: 'text-[#1C1815]' },
  { label: 'COMPLIANCE AUDIT', value: 'ISO-9001:2015 SECTION 8.5.1 PASSED', dotColor: 'bg-[#16A34A]', valueColor: 'text-[#16A34A]' },
  { label: 'YIELD METRIC', value: '99.84% FIRST-PASS YIELD (FPY)', dotColor: 'bg-[#C9B59C]', valueColor: 'text-[#1C1815]' },
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
    verdictClass: 'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/30',
    conf: '99.4%',
    coords: '[340, 420, 480, 560]',
    span: '0.42 mm bridge span',
    boxStyle: { top: '34%', left: '38%', width: '135px', height: '82px' },
    pulseColor: '#D97706',
  },
  {
    id: 'void',
    title: 'BGA SUB-SURFACE VOID',
    verdict: 'CRITICAL SCRAP',
    verdictClass: 'text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/30',
    conf: '99.8%',
    coords: '[120, 210, 240, 330]',
    span: '28.4% Area Voiding',
    boxStyle: { top: '22%', left: '22%', width: '115px', height: '115px' },
    pulseColor: '#DC2626',
  },
  {
    id: 'nominal',
    title: 'COPLANARITY SPEC OK',
    verdict: 'NOMINAL PASS',
    verdictClass: 'text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30',
    conf: '99.9%',
    coords: '[280, 310, 360, 410]',
    span: '0.012 mm (In Tolerance)',
    boxStyle: { top: '48%', left: '55%', width: '110px', height: '70px' },
    pulseColor: '#16A34A',
  },
];

// Team Nexus Four members
const TEAM_MEMBERS = [
  {
    name: 'Rhugved Kulkarni',
    role: 'Team Lead & AI Quality Architect',
    focus: 'Neural defect models, multi-model optical classification, automated root-cause disposition',
    github: 'https://github.com/rhugved2307',
    badge: '👑 TEAM LEAD',
    badgeClass: 'bg-[#C9B59C] text-[#1C1815] font-bold',
    avatar: 'https://avatars.githubusercontent.com/u/rhugved2307?v=4',
  },
  {
    name: 'Aditya Sharma',
    role: 'Vision & Backend Architect',
    focus: 'Multi-tier vision cascade, high-speed Express streaming API, local session persistence',
    github: 'https://github.com/AGIQdev-Aditya',
    badge: '⚡ VISION ARCHITECT',
    badgeClass: 'bg-[#EFE9E3] text-[#1C1815] border border-[#D9CFC7] font-semibold',
    avatar: 'https://avatars.githubusercontent.com/u/264315813?v=4',
  },
  {
    name: 'Vivek Gajdhane',
    role: 'Frontend & UI/UX Engineer',
    focus: 'Fluid 3D scroll physics, interactive canvas reticles, ISO certificate generation',
    github: 'https://github.com/vivekgajdhane',
    badge: '🎨 UI/UX ENGINEER',
    badgeClass: 'bg-[#EFE9E3] text-[#6B5E55] border border-[#D9CFC7]',
    avatar: 'https://avatars.githubusercontent.com/u/200355176?v=4',
  },
  {
    name: 'Abhay Singh',
    role: 'Cloud & API Integration',
    focus: 'Supabase cloud schema, tamper-proof audit trails, enterprise deployment architecture',
    github: 'https://github.com/abhaysingh1230',
    badge: '☁️ CLOUD ARCHITECT',
    badgeClass: 'bg-[#EFE9E3] text-[#6B5E55] border border-[#D9CFC7]',
    avatar: 'https://avatars.githubusercontent.com/u/abhaysingh1230?v=4',
  }
];

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const [activeDeckIndex, setActiveDeckIndex] = useState(2); // Middle card
  const [deckProgress, setDeckProgress] = useState(0.5); // 0 to 1
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // 3D mouse parallax
  const [zoomLevel, setZoomLevel] = useState(40); // 10x, 40x, 100x zoom loupe
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

  // Apple / Aceternity-Style Carousel Controller
  const carouselRef = useRef(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const scrollStep = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = 340;
    carouselRef.current.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = 340;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveDeckIndex(index);
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const cardWidth = 340;
    const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(DEFECT_DECK.length - 1, newIndex));
    setActiveDeckIndex(clamped);
  };

  // Native non-passive wheel listener: maps vertical mouse wheel to horizontal card scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // If user is scrolling vertical mouse wheel over the cards:
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.5;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPos.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.6;
    carouselRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  // Parallax Tilt for Interactive Wafer Scanner Preview
  const handleScannerMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 8), y: x * 8 });
  };

  const handleScannerMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const activeDefect = DEFECT_DECK[activeDeckIndex];
  const activeScannerPreset = SCANNER_PRESETS[activePresetIndex];

  return (
    <div className="bg-[#F9F8F6] text-[#1C1815] selection:bg-[#C9B59C] selection:text-[#1C1815] overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP TECHNICAL RUNNER (Spec Bar)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#EFE9E3] border-b border-[#D9CFC7] px-4 py-2 text-[10px] font-mono text-[#6B5E55] flex flex-wrap items-center justify-between gap-2 z-20 relative">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#16A34A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="font-bold">SYSTEM ACTIVE</span>
          </span>
          <span className="text-[#D9CFC7]">|</span>
          <span className="text-[#1C1815] font-semibold">OPTICAL CORE v3.8</span>
          <span className="text-[#D9CFC7] hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#6B5E55]">TELECENTRIC 4K • 120 FPS</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[#1C1815] font-bold">SUB-MILLIMETER TENSOR RES: 0.05mm</span>
          <span className="text-[#D9CFC7] hidden md:inline">|</span>
          <span className="hidden md:inline text-[#6B5E55]">ISO-9001:2015 AUDITED</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION: LIVE INTERACTIVE SCANNER & METRICS
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-24 border-b border-[#D9CFC7] bg-[#F9F8F6] animated-grid-mesh overflow-hidden">
        {/* Aceternity UI Warm Ambient Spotlight */}
        <Spotlight className="-top-20 left-10 md:left-60 md:-top-16 opacity-75" fill="#C9B59C" />

        {/* Dynamic Animated Ambient Light Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] bg-gradient-to-tr from-[#C9B59C]/25 via-[#D9CFC7]/20 to-transparent blur-[130px] pointer-events-none rounded-full animate-ambient-drift" />
        <div className="absolute top-1/2 right-12 w-[380px] h-[380px] bg-[#16A34A]/10 blur-[110px] pointer-events-none rounded-full animate-float-aura" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[520px] diffused-light-leak pointer-events-none" />

        {/* Ambient Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
          <span className="text-[14vw] font-black uppercase tracking-tight text-[#D9CFC7]/25 leading-none whitespace-nowrap block">
            NEXCAN AI
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Live Factory Ticking Counter Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#EFE9E3] border border-[#D9CFC7] text-xs font-mono mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
            <span className="text-[#6B5E55]">LIVE LINE TELEMETRY:</span>
            <span className="text-[#1C1815] font-bold">{liveWaferCount.toLocaleString()}</span>
            <span className="text-[#16A34A] font-semibold">WAFERS INSPECTED TODAY</span>
            <span className="text-[#D9CFC7]">|</span>
            <span className="text-[#1C1815] font-bold">99.4% FPY</span>
          </div>

          {/* Staged Rising Title with Shimmer Animation */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1815] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Autonomous Quality Assurance &amp;{' '}
            <span className="animate-shimmer-headline inline-block">
              Defect Intelligence
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-[#6B5E55] max-w-2xl mx-auto leading-relaxed">
            Eliminate human visual fatigue on manufacturing lines. Instant sub-millimeter flaw localization, automated root-cause disposition (
            <code className="text-[#16A34A] font-bold bg-[#16A34A]/10 px-1.5 py-0.5 rounded border border-[#16A34A]/30">PASS</code> /{' '}
            <code className="text-[#D97706] font-bold bg-[#D97706]/10 px-1.5 py-0.5 rounded border border-[#D97706]/30">REWORK</code> /{' '}
            <code className="text-[#DC2626] font-bold bg-[#DC2626]/10 px-1.5 py-0.5 rounded border border-[#DC2626]/30">SCRAP</code>), and verified ISO-9001 compliance audit trails.
          </p>

          {/* Primary Action Buttons with Magic UI Light Sweep */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onLaunchApp}
              data-cursor="pointer"
              className="relative group px-7 py-3.5 rounded-2xl bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] font-extrabold text-xs tracking-wider uppercase shadow-[0_8px_30px_rgba(201,181,156,0.5)] flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.04] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <Zap className="w-4 h-4 text-[#1C1815]" />
              <span>Launch Live Inspector</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              data-cursor="pointer"
              className="px-5 py-3.5 rounded-xl bg-[#EFE9E3] hover:bg-[#D9CFC7] border border-[#D9CFC7] text-[#1C1815] font-mono text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center space-x-2 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#C9B59C] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>

            <button
              onClick={() => onOpenLogin && onOpenLogin()}
              data-cursor="pointer"
              className="px-5 py-3.5 rounded-xl bg-[#F9F8F6] hover:bg-[#EFE9E3] border border-[#D9CFC7] text-[#1C1815] font-mono text-xs font-medium transition-all cursor-pointer flex items-center space-x-2 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#C9B59C]" />
              <span>Sign In / Create Account</span>
            </button>
          </div>

          {/* FOREGROUND INTERACTIVE OPTICAL SCANNER PREVIEW WITH 3D TILT */}
          <div
            onMouseMove={handleScannerMouseMove}
            onMouseLeave={handleScannerMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="mt-12 max-w-4xl mx-auto rounded-3xl p-3 sm:p-5 bg-[#EFE9E3] border border-[#D9CFC7] shadow-xl text-left relative overflow-hidden"
          >
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#D9CFC7] gap-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <Radio className="w-3.5 h-3.5 text-[#16A34A] animate-pulse" />
                <span className="font-bold text-[#1C1815] text-[11px]">SELECT LIVE SAMPLE:</span>
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
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer shadow-sm ${
                      activePresetIndex === idx
                        ? 'bg-[#C9B59C] text-[#1C1815]'
                        : 'bg-[#F9F8F6] text-[#6B5E55] hover:text-[#1C1815] border border-[#D9CFC7]'
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
                  className="px-3 py-1 rounded-lg bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] text-[10px] font-black font-mono shadow-sm flex items-center space-x-1 cursor-pointer active:scale-95 transition-all"
                >
                  <Zap className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'SCANNING...' : 'TRIGGER RE-SCAN'}</span>
                </button>
              </div>
            </div>

            {/* Wafer Viewport with Animated Laser Sweep & Interactive Target */}
            <div className="relative mt-3 h-64 sm:h-80 rounded-2xl bg-[#F9F8F6] border border-[#D9CFC7] overflow-hidden flex items-center justify-center">
              {/* Subtle Grid and Reticle */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,181,156,0.15)_0,transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#D9CFC7_1px,transparent_1px),linear-gradient(to_bottom,#D9CFC7_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
              
              {/* Concentric Optical Circles */}
              <div className="absolute w-56 h-56 rounded-full border border-[#C9B59C]/30 pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#C9B59C]/50 pointer-events-none" />
              <div className="absolute w-16 h-16 rounded-full border border-[#16A34A]/40 pointer-events-none" />

              {/* Standard Laser Sweep Line */}
              {!isScanning && (
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9B59C] to-transparent shadow-[0_0_14px_#C9B59C] animate-laser-sweep pointer-events-none" />
              )}

              {/* Active Manual Fast Scan Sweep Bar */}
              {isScanning && (
                <>
                  <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#16A34A] to-transparent shadow-[0_0_25px_#16A34A] animate-fast-scan pointer-events-none z-30" />
                  <div className="absolute inset-0 bg-[#16A34A]/5 animate-pulse pointer-events-none z-20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#EFE9E3]/95 border border-[#16A34A] text-[#16A34A] font-mono text-xs font-bold tracking-wider shadow-xl z-30 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                    <span>ANALYZING 480 SUB-REGIONS (120 FPS)...</span>
                  </div>
                </>
              )}

              {/* Dynamic Target Bounding Box */}
              {opticalMode === 'segmented' && (
                <div
                  style={{
                    position: 'absolute',
                    ...activeScannerPreset.boxStyle,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="rounded border-2 border-[#C9B59C] bg-[#C9B59C]/20 shadow-md flex flex-col justify-between p-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#1C1815] bg-[#C9B59C] px-1 rounded-sm truncate">
                      {activeScannerPreset.title}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9B59C] animate-ping ml-1 shrink-0" />
                  </div>
                  <div className="text-[8px] font-mono text-[#1C1815] bg-[#F9F8F6]/95 p-0.5 rounded flex justify-between shadow-sm">
                    <span>{activeScannerPreset.span}</span>
                    <span className="text-[#16A34A] font-bold">{activeScannerPreset.conf}</span>
                  </div>
                </div>
              )}

              {/* MINI SILICON WAFER DIE MATRIX (Interactive 21-Die Map) */}
              <div className="absolute top-3 left-3 bg-[#EFE9E3]/95 backdrop-blur border border-[#D9CFC7] p-2 rounded-xl text-[10px] font-mono z-20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1.5">
                  <span className="text-[#6B5E55] text-[9px] font-bold">WAFER MAP (300mm):</span>
                  <span className="text-[#1C1815] text-[9px] font-bold">{selectedDieId}</span>
                </div>
                {/* Micro Wafer Die Grid */}
                <div className="relative w-20 h-20 rounded-full border border-[#D9CFC7] bg-[#F9F8F6] p-1.5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C9B59C]/20 to-transparent animate-radar-beam pointer-events-none" />
                  
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
                            ? 'bg-[#DC2626]'
                            : die.status === 'solder'
                            ? 'bg-[#D97706]'
                            : 'bg-[#16A34A]/70 hover:bg-[#16A34A]'
                        } ${selectedDieId === die.id ? 'ring-1 ring-[#1C1815] scale-125 z-20' : 'opacity-80'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Telecentric Zoom Loupe & View Mode Controls */}
              <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-[#EFE9E3]/95 backdrop-blur border border-[#D9CFC7] p-1 rounded-xl font-mono text-[10px] z-20 shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpticalMode((m) => (m === 'segmented' ? 'raw' : 'segmented'))}
                  className="px-2 py-0.5 rounded-lg text-[#1C1815] hover:bg-[#D9CFC7] font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3 text-[#C9B59C]" />
                  <span>{opticalMode === 'segmented' ? 'AI TENSOR' : 'RAW SENSOR'}</span>
                </button>
                <div className="w-[1px] h-3 bg-[#D9CFC7]" />
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
                        ? 'bg-[#C9B59C] text-[#1C1815] shadow-sm'
                        : 'text-[#6B5E55] hover:text-[#1C1815]'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>

              {/* Status Badges Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#EFE9E3]/95 backdrop-blur border border-[#D9CFC7] px-2.5 py-1 rounded-md text-[10px] font-mono text-[#6B5E55] z-20 shadow-sm">
                AI ENGINE: <span className="text-[#1C1815] font-bold">GEMINI 3.8 FLASH</span>
              </div>

              <div className={`absolute bottom-3 right-3 bg-[#EFE9E3]/95 backdrop-blur border px-2.5 py-1 rounded-md text-[10px] font-mono font-bold z-20 shadow-sm ${activeScannerPreset.verdictClass}`}>
                {activeScannerPreset.verdict} ({activeScannerPreset.conf})
              </div>
            </div>

            {/* Quick Actions Footer with Real-Time Dynamic MTF Equalizer */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono px-2 pt-1">
              <div className="flex items-center space-x-2 text-[11px] text-[#6B5E55]">
                <span className="text-[#16A34A] text-[10px] font-bold">MTF SENSOR 120 FPS:</span>
                <div className="flex items-end space-x-0.5 h-4">
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#C9B59C] rounded-t-sm animate-eq-1" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#C9B59C] rounded-t-sm animate-eq-2" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#C9B59C] rounded-t-sm animate-eq-3" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#16A34A] rounded-t-sm animate-eq-4" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#16A34A] rounded-t-sm animate-eq-5" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#C9B59C] rounded-t-sm animate-eq-6" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#C9B59C] rounded-t-sm animate-eq-7" />
                  <div className="w-1 bg-gradient-to-t from-[#D9CFC7] to-[#C9B59C] rounded-t-sm animate-eq-8" />
                </div>
                <span className="text-[#6B5E55] text-[10px] hidden sm:inline">NYQUIST 94.6 lp/mm</span>
              </div>

              <button
                onClick={onLaunchApp}
                className="text-[#1C1815] hover:text-[#C9B59C] font-bold inline-flex items-center space-x-1 cursor-pointer transition-colors ml-auto text-xs"
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
      <div className="w-full bg-[#EFE9E3] border-y border-[#D9CFC7] py-2.5 overflow-hidden relative select-none">
        <div className="animate-conveyor flex items-center space-x-6 text-[10px] sm:text-[11px] font-mono tracking-wider">
          {[...LIVE_TICKER_ITEMS, ...LIVE_TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor} animate-ping`} />
              <span className="text-[#6B5E55]">{item.label}:</span>
              <span className={`font-bold ${item.valueColor}`}>{item.value}</span>
              <span className="text-[#D9CFC7] ml-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. KEY PRODUCTION BENCHMARKS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-[#D9CFC7] bg-[#F9F8F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 scroll-reveal">
            <span className="sub1 text-[#8C7D73]">PRODUCTION CALIBRATED SPECS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1815] mt-1 uppercase tracking-tight">
              Optical Benchmarks &amp; Real-Time Throughput
            </h2>
          </div>

          {/* 4 METRIC CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
            
            {/* Metric 1: Accuracy */}
            <div className="scroll-reveal delay-100 p-6 rounded-2xl interactive-glass-card flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-3xl sm:text-4xl font-black text-[#1C1815] font-mono tracking-tight">
                99.4<span className="text-sm text-[#C9B59C]">%</span>
              </span>
              <span className="text-xs font-bold text-[#1C1815] uppercase mt-1.5">F1 Accuracy</span>
              <span className="text-[11px] font-mono text-[#6B5E55] mt-0.5">Sub-pixel validation</span>
            </div>

            {/* Metric 2: Accent Latency */}
            <div className="scroll-reveal delay-200 p-6 rounded-2xl bg-[#C9B59C] shadow-md flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.03]">
              <span className="text-3xl sm:text-4xl font-black text-[#1C1815] font-mono tracking-tight">
                14<span className="text-sm text-[#1C1815]/80">ms</span>
              </span>
              <span className="text-xs font-extrabold text-[#1C1815] uppercase mt-1.5">Edge Latency</span>
              <span className="text-[11px] font-mono text-[#1C1815]/80 mt-0.5">Real-time conveyor gate</span>
            </div>

            {/* Metric 3: Flaw Limit */}
            <div className="scroll-reveal delay-300 p-6 rounded-2xl interactive-glass-card flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-3xl sm:text-4xl font-black text-[#1C1815] font-mono tracking-tight">
                0.05<span className="text-sm text-[#16A34A]">mm</span>
              </span>
              <span className="text-xs font-bold text-[#1C1815] uppercase mt-1.5">Flaw Limit</span>
              <span className="text-[11px] font-mono text-[#6B5E55] mt-0.5">Telecentric zoom res</span>
            </div>

            {/* Metric 4: ISO Compliance */}
            <div className="scroll-reveal delay-400 p-6 rounded-2xl interactive-glass-card flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#1C1815] font-mono tracking-tight">
                ISO 9001
              </span>
              <span className="text-xs font-bold text-[#1C1815] uppercase mt-1.5">Audit Ledger</span>
              <span className="text-[11px] font-mono text-[#16A34A] mt-0.5">Tamper-proof logs</span>
            </div>

          </div>

        </div>

        {/* CONTINUOUS CONVEYOR SPROCKET TAPE */}
        <div className="w-full overflow-hidden border-y border-[#D9CFC7] bg-[#EFE9E3] py-2.5">
          <div className="animate-conveyor flex items-center space-x-6 text-xs font-mono text-[#6B5E55]">
            {[...CONVEYOR_ITEMS, ...CONVEYOR_ITEMS].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#F9F8F6] border border-[#D9CFC7] shrink-0 shadow-sm"
              >
                <Cpu className="w-3.5 h-3.5 text-[#C9B59C]" />
                <span className="text-[#1C1815] font-bold">{item.id}</span>
                <span className="text-[#D9CFC7]">|</span>
                <span
                  className={
                    item.status === 'PASS'
                      ? 'text-[#16A34A] font-bold'
                      : item.status === 'REWORK'
                      ? 'text-[#D97706] font-bold'
                      : 'text-[#DC2626] font-bold'
                  }
                >
                  {item.status}
                </span>
                <span className="text-[#8C7D73] text-[10px]">{item.flaw}</span>
                <span className="text-[#D9CFC7]">|</span>
                <span className="text-[#6B5E55] text-[10px]">{item.conf}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. APPLE / ACETERNITY-STYLE DEFECT SAMPLE CAROUSEL
          ───────────────────────────────────────────────────────────── */}
      <section
        className="py-24 border-b border-[#D9CFC7] bg-[#EFE9E3] relative select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 scroll-reveal">
            <div>
              <div className="sub1 text-[#8C7D73] mb-2 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#C9B59C]" />
                <span>TELECENTRIC DEFECT BENCHMARKS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1815] tracking-tight uppercase">
                Interactive Defect Sample Gallery
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5E55] mt-1 max-w-xl">
                Swipe smoothly on your trackpad, drag with mouse, or use arrow keys to inspect pre-calibrated industrial defect models.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center space-x-3 self-start md:self-auto">
              <button
                onClick={() => scrollStep(-1)}
                disabled={activeDeckIndex === 0}
                aria-label="Previous Slide"
                className="p-3 rounded-full bg-[#FFFFFF] hover:bg-[#F9F8F6] text-[#1C1815] border border-[#D9CFC7] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollStep(1)}
                disabled={activeDeckIndex === DEFECT_DECK.length - 1}
                aria-label="Next Slide"
                className="p-3 rounded-full bg-[#FFFFFF] hover:bg-[#F9F8F6] text-[#1C1815] border border-[#D9CFC7] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Smooth Snap Carousel Viewport */}
          <div className="relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#C9B59C]/15 rounded-full blur-[100px] pointer-events-none" />

            <div
              ref={carouselRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onScroll={handleCarouselScroll}
              className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-1 hide-scrollbar cursor-grab active:cursor-grabbing select-none"
            >
              {DEFECT_DECK.map((defect, idx) => {
                const isSelected = idx === activeDeckIndex;
                return (
                  <div
                    key={defect.id}
                    onClick={() => scrollToCard(idx)}
                    className={`snap-center shrink-0 w-[300px] sm:w-[350px] rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#C9B59C] shadow-[0_16px_45px_rgba(201,181,156,0.35)] ring-2 ring-[#C9B59C]/40 scale-100'
                        : 'bg-[#F9F8F6] border-[#D9CFC7] hover:border-[#C9B59C]/60 hover:bg-[#FFFFFF] opacity-85 hover:opacity-100 shadow-sm'
                    }`}
                  >
                    {/* Magic UI Border Beam Accent on Selected Card */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9B59C] to-transparent shadow-[0_0_12px_#C9B59C]" />
                    )}

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-[#D9CFC7]">
                        <span className="text-[#6B5E55] font-semibold">{defect.category}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold border text-[10px] ${defect.verdictColor}`}>
                          {defect.verdict === 'PASS' ? '✓ PASS' : defect.verdict}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="my-4">
                        <div className="w-11 h-11 rounded-2xl bg-[#EFE9E3] border border-[#D9CFC7] flex items-center justify-center text-xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
                          {defect.sampleIcon}
                        </div>
                        <h4 className="text-base font-bold text-[#1C1815] uppercase tracking-tight">
                          {defect.title}
                        </h4>
                        <p className="text-xs text-[#6B5E55] mt-1.5 leading-relaxed font-sans line-clamp-2">
                          {defect.description}
                        </p>
                      </div>

                      {/* Telemetry Chips */}
                      <div className="bg-[#EFE9E3]/70 p-3 rounded-xl border border-[#D9CFC7] font-mono text-[10px] space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-[#6B5E55]">TENSOR COORDS:</span>
                          <span className="text-[#1C1815] font-bold">{defect.coords}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B5E55]">FLAW SPAN:</span>
                          <span className="text-[#1C1815] font-bold">{defect.delta}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3.5 mt-3 border-t border-[#D9CFC7] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#8C7D73] font-semibold">{defect.badge}</span>
                      <span className="text-[#16A34A] font-bold">CONF: {defect.confidence}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Dot Navigation */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {DEFECT_DECK.map((defect, dotIdx) => (
              <button
                key={defect.id}
                onClick={() => scrollToCard(dotIdx)}
                title={`View ${defect.title}`}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  dotIdx === activeDeckIndex
                    ? 'w-8 bg-[#C9B59C] shadow-xs'
                    : 'w-2.5 bg-[#D9CFC7] hover:bg-[#B8A389]'
                }`}
              />
            ))}
          </div>

          {/* Bottom Live Selected Inspector Link */}
          <div className="mt-8 max-w-xl mx-auto p-4 rounded-2xl bg-[#FFFFFF] border border-[#D9CFC7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 scroll-reveal">
            <div>
              <div className="text-[10px] font-mono text-[#8C7D73] font-semibold">SELECTED SPECIMEN FOR LIVE INFERENCE:</div>
              <div className="text-xs font-bold text-[#1C1815] uppercase mt-0.5">{activeDefect.title}</div>
            </div>
            <button
              onClick={onLaunchApp}
              data-cursor="pointer"
              className="px-5 py-2.5 rounded-xl bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
            >
              Inspect in Live Console →
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THE DEEP TECHNICAL OPTICAL SHOWCASE (ORYZO.AI INSPIRED)
          ───────────────────────────────────────────────────────────── */}
      <OryzoShowcase
        onLaunchInspector={onLaunchApp}
        onQuickDemo={onQuickDemo}
      />

      {/* ─────────────────────────────────────────────────────────────
          7. THE INDUSTRIAL ADVANTAGE (LEGACY VS NEXCAN)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#D9CFC7] bg-[#EFE9E3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <span className="sub1 text-[#8C7D73]">THE DISRUPTION</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1815] mt-1 uppercase">
              Legacy AOI vs. Nexcan Autonomous Vision
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E55] mt-2">
              Why leading semiconductor and aerospace lines replace static threshold cameras with multi-model AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Legacy Column */}
            <div className="scroll-reveal delay-100 p-7 rounded-3xl bg-[#F9F8F6] border border-[#DC2626]/20 relative shadow-sm">
              <div className="flex items-center space-x-2 text-[#DC2626] font-mono text-xs font-bold uppercase mb-4">
                <XCircle className="w-4 h-4" />
                <span>Legacy Rule-Based AOI &amp; Manual QA</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1815] mb-3">Brittle Heuristics &amp; Human Fatigue</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#6B5E55]">
                <li className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                  <span>Human visual fatigue drops defect catch rates to &lt;82% after 20 minutes of line duty.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                  <span>Threshold optical sensors trigger up to 18% false positive rejections, costing millions in scrap.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                  <span>Zero cryptographic audit logging—untraceable compliance failures during ISO audits.</span>
                </li>
              </ul>
            </div>

            {/* Nexcan Autonomous Column */}
            <div className="scroll-reveal delay-200 p-7 rounded-3xl bg-[#F9F8F6] border-2 border-[#C9B59C] relative shadow-md">
              <div className="flex items-center space-x-2 text-[#16A34A] font-mono text-xs font-bold uppercase mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nexcan Autonomous Defect Intelligence</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1815] mb-3">Multi-Model Reasoning &amp; Sub-Millimeter Tensors</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1C1815]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <span>Continuous 120 FPS inspection with verified 99.4% F1 precision across 0.05mm flaw sizes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <span>Multi-tiered Gemini Vision fallback eliminates downtime and adapts to lighting variations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <span>Automated ISO-9001 certified audit logs with tamper-proof cryptographic signatures.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. TEAM NEXUS FOUR LEADERSHIP & ARCHITECTS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#D9CFC7] bg-[#EFE9E3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <span className="sub1 text-[#8C7D73]">ENGINEERING ARCHITECTS</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1815] mt-1 uppercase tracking-tight">
              Team Nexus Four
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E55] mt-2">
              The cross-functional engineers behind Nexcan AI's autonomous optical inspection architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.name}
                className="scroll-reveal delay-100 p-5 rounded-2xl bg-[#F9F8F6] border border-[#D9CFC7] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${member.badgeClass}`}>
                      {member.badge}
                    </span>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6B5E55] hover:text-[#1C1815] transition-colors"
                      title="GitHub Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    </a>
                  </div>

                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EFE9E3] border border-[#D9CFC7] mb-3 flex items-center justify-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <h3 className="text-base font-bold text-[#1C1815]">{member.name}</h3>
                  <div className="text-[11px] font-mono text-[#8C7D73] font-semibold mt-0.5 mb-2">
                    {member.role}
                  </div>
                  <p className="text-xs text-[#6B5E55] leading-relaxed">
                    {member.focus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D9CFC7] flex items-center justify-between text-[11px] font-mono">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1C1815] hover:text-[#C9B59C] font-semibold flex items-center space-x-1"
                  >
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. HIGH-CONVERSION BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F9F8F6] relative">
        <div className="max-w-4xl mx-auto px-4 text-center scroll-reveal">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#1C1815] tracking-tight uppercase">
            Deploy Autonomous Vision <br />
            <span className="warm-gradient-text">
              On Your Lines in Minutes
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#6B5E55] max-w-xl mx-auto">
            Zero visual inspection fatigue. Sub-millimeter bounding box localization. Direct integration with industrial PLC sorting lines.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              data-cursor="pointer"
              className="px-8 py-4 rounded-xl bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] font-bold text-xs uppercase tracking-wider shadow-md flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-[#1C1815]" />
              <span>Launch Live Inspector Console</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              data-cursor="pointer"
              className="px-6 py-4 rounded-xl bg-[#EFE9E3] hover:bg-[#D9CFC7] border border-[#D9CFC7] text-[#1C1815] font-mono text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center space-x-2 hover:scale-[1.03]"
            >
              <Sparkles className="w-4 h-4 text-[#C9B59C] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

          <div className="mt-8 text-xs font-mono text-[#8C7D73]">
            Hardware Compatible: Basler • FLIR • IDS Imaging • Cognex • Allied Vision
          </div>

        </div>
      </section>

    </div>
  );
}
