import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  BarChart2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ArrowRight,
  Terminal,
  MousePointer,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Database,
  Cpu,
  Award,
  Scan,
  Compass,
  Activity,
  Sliders,
  ChevronDown
} from 'lucide-react';
import OryzoShowcase from './OryzoShowcase.jsx';

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#120704] text-[#FAF9F6] selection:bg-[#E3845A] selection:text-[#120704]">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO OVERVIEW & INTRO
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-[#3D180C] bg-[#120704] radar-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] diffused-light-leak pointer-events-none" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#E3845A]/12 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Track Tag Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1B0C07] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-[#E3845A]/10">
            <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-pulse"></span>
            <span className="tracking-wider uppercase font-semibold">Track: Computer Vision &amp; Visual Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Autonomous Quality Assurance &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E3845A] to-[#A74A21]">
              Defect Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-lg text-[#D1B8AE] max-w-2xl mx-auto leading-relaxed">
            Eliminate human visual fatigue on manufacturing lines. Instant sub-millimeter flaw localization, automated root-cause disposition (
            <code className="text-[#34D399] font-bold bg-[#34D399]/15 px-1.5 py-0.5 rounded border border-[#34D399]/30">PASS</code> /{' '}
            <code className="text-[#E3845A] font-bold bg-[#E3845A]/15 px-1.5 py-0.5 rounded border border-[#E3845A]/30">REWORK</code> /{' '}
            <code className="text-[#F43F5E] font-bold bg-[#F43F5E]/15 px-1.5 py-0.5 rounded border border-[#F43F5E]/30">SCRAP</code>), and verified ISO-9001 compliance audit trails.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-[#FFFFFF] font-bold text-xs tracking-wider uppercase shadow-xl shadow-[#E3845A]/25 flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>Launch Live Inspector</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              className="px-6 py-3.5 rounded-xl bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] font-mono text-xs font-semibold shadow-lg transition-all cursor-pointer flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-[#E3845A]" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

          {/* Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex items-center space-x-2 text-[#E3845A] mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Latency</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">&lt; 500ms</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Real-time edge cycle</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex items-center space-x-2 text-[#34D399] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Accuracy</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">99.4% F1</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Defect precision</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex items-center space-x-2 text-[#E3845A] mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Precision</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">0.05 mm</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Sub-millimeter flaw limit</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex items-center space-x-2 text-[#A74A21] mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Standard</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">ISO-9001</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Clause 8.5.1 certified</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: 3D OPTICAL HARDWARE RIG SHOWCASE (SMOOTH & STABLE)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl border border-[#3D180C] bg-[#1B0C07] overflow-hidden shadow-2xl">
          
          {/* Backing Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,132,90,0.12)_0%,rgba(18,7,4,0.95)_75%)] pointer-events-none" />

          {/* Clean Responsive Video Container */}
          <div className="relative w-full aspect-video sm:aspect-[21/9] max-h-[560px] flex items-center justify-center bg-[#0d0503] overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/hero-render.mp4"
              playsInline
              autoPlay
              loop
              muted={isMuted}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            />

            {/* Vignette gradients to blend video seamlessly into Obsidian theme */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1B0C07] via-transparent to-[#1B0C07]/70" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#1B0C07]/80 via-transparent to-[#1B0C07]/80" />

            {/* Optical Alignment Reticles */}
            <div className="absolute inset-6 pointer-events-none border border-[#E3845A]/20 rounded-2xl hidden md:block">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E3845A]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#E3845A]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#E3845A]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E3845A]" />
            </div>

            {/* TOP TELEMETRY HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center space-x-2.5 bg-[#120704]/90 border border-[#3D180C] px-3.5 py-1.5 rounded-xl backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping" />
                <span className="font-mono text-xs text-[#FFFFFF] font-bold">NEXCAN 3D OPTICAL RIG</span>
                <span className="text-[#3D180C] hidden sm:inline">|</span>
                <span className="font-mono text-[11px] text-[#D1B8AE] hidden sm:inline">TELECENTRIC 4K SENSOR</span>
              </div>

              <div className="flex items-center space-x-2 bg-[#120704]/90 border border-[#3D180C] px-3.5 py-1.5 rounded-xl backdrop-blur-md shadow-lg">
                <Cpu className="w-3.5 h-3.5 text-[#E3845A]" />
                <span className="font-mono text-xs text-[#FFFFFF]">GEMINI 3.8 VISION CORE</span>
              </div>
            </div>

            {/* BOTTOM CONTROLS & CTA HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 bg-[#120704]/90 border border-[#3D180C] p-1.5 rounded-xl backdrop-blur-md">
                <button
                  onClick={togglePlay}
                  className="px-2.5 py-1 text-xs text-[#D1B8AE] hover:text-[#FFFFFF] rounded-lg hover:bg-[#3D180C]/50 transition-colors flex items-center space-x-1.5 font-mono"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E3845A]" /> : <Play className="w-3.5 h-3.5 text-[#E3845A]" />}
                  <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  title="Toggle Audio"
                  className="p-1.5 text-[#D1B8AE] hover:text-white rounded-lg hover:bg-[#3D180C]/50 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E3845A]" />}
                </button>
              </div>

              <button
                onClick={onLaunchApp}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-[#FFFFFF] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Live Inspector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 border-t border-[#3D180C] bg-[#150905]">
            
            <div className="p-4 rounded-xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-md">
              <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                <Scan className="w-4 h-4" />
                <span>01 / OPTICAL SCAN</span>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">Sub-Millimeter Profiling</h4>
              <p className="text-xs text-[#D1B8AE] mt-1.5 leading-relaxed">
                Custom telecentric optics isolate micro-fractures and voids with 0.05 mm precision.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-md">
              <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                <Cpu className="w-4 h-4" />
                <span>02 / VISION CORE</span>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">Gemini 3.8 Intelligence</h4>
              <p className="text-xs text-[#D1B8AE] mt-1.5 leading-relaxed">
                Zero human fatigue. Evaluates complex geometries against IPC-A-610 criteria.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-md">
              <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                <Zap className="w-4 h-4" />
                <span>03 / ROUTING ENGINE</span>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">&lt; 500ms Disposition</h4>
              <p className="text-xs text-[#D1B8AE] mt-1.5 leading-relaxed">
                Automated PASS / REWORK / SCRAP routing with pinpoint coordinate directives.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-md">
              <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                <Award className="w-4 h-4" />
                <span>04 / ISO-9001 AUDIT</span>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">Supabase Traceability</h4>
              <p className="text-xs text-[#D1B8AE] mt-1.5 leading-relaxed">
                Immutable cloud logs, operator attribution, and downloadable certificates.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ORYZO-INSPIRED TECHNICAL SHOWCASE WIDGETS & CALIBRATION
          ───────────────────────────────────────────────────────────── */}
      <OryzoShowcase
        onLaunchInspector={onLaunchApp}
        onQuickDemo={onQuickDemo}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: PROBLEM VS SOLUTION (THE INDUSTRIAL DISRUPTION)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#120704] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono text-[#E3845A] tracking-wider uppercase bg-[#1B0C07] px-3 py-1 rounded-full border border-[#3D180C]">
              Why Manual QA Fails High-Volume Assembly
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-4 tracking-tight">
              Human Visual Exhaustion vs.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E3845A] to-[#A74A21]">
                Autonomous Nexcan AI
              </span>
            </h2>
            <p className="text-sm text-[#D1B8AE] mt-3">
              Studies show manual visual inspectors miss 20% to 35% of sub-millimeter defects after just 20 minutes of continuous line scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Left: Traditional Inspection */}
            <div className="p-8 rounded-2xl bg-[#1B0C07] border border-[#F43F5E]/30 relative overflow-hidden shadow-xl">
              <div className="flex items-center space-x-3 pb-4 border-b border-[#3D180C]">
                <div className="w-10 h-10 rounded-xl bg-[#F43F5E]/15 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E]">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Manual Visual Inspection</h3>
                  <p className="text-xs text-[#D1B8AE] font-mono">Traditional Human Eyeball Scrutiny</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-xs text-[#D1B8AE]">
                <li className="flex items-start space-x-3">
                  <span className="text-[#F43F5E] font-bold text-sm">✕</span>
                  <span><strong>Visual Fatigue Degradation:</strong> Error rates spike 300% after 20 minutes of repetitive microscope examination.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#F43F5E] font-bold text-sm">✕</span>
                  <span><strong>Subjective Pass/Fail Bias:</strong> Operators disagree on borderline tolerances by up to 24%, causing inconsistent yield.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#F43F5E] font-bold text-sm">✕</span>
                  <span><strong>High Latency Bottleneck:</strong> 15 to 45 seconds per component slows conveyor throughput and spikes labor overhead.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#F43F5E] font-bold text-sm">✕</span>
                  <span><strong>Zero Immutable Audit Trail:</strong> Paper logs or manual entry fail ISO-9001 Clause 8.5.1 strict traceability mandates.</span>
                </li>
              </ul>
            </div>

            {/* Right: Nexcan AI */}
            <div className="p-8 rounded-2xl bg-[#1B0C07] border border-[#E3845A]/50 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-[#FFFFFF] text-[10px] font-mono font-bold uppercase tracking-wider">
                Autonomous Standard
              </div>

              <div className="flex items-center space-x-3 pb-4 border-b border-[#3D180C]">
                <div className="w-10 h-10 rounded-xl bg-[#E3845A]/15 border border-[#E3845A]/40 flex items-center justify-center text-[#E3845A]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Nexcan AI Vision Core</h3>
                  <p className="text-xs text-[#E3845A] font-mono">Multimodal Autonomous Intelligence</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-xs text-[#D1B8AE]">
                <li className="flex items-start space-x-3">
                  <span className="text-[#34D399] font-bold text-sm">✓</span>
                  <span><strong>Zero Visual Fatigue:</strong> 24/7 continuous operation with steady 99.4% F1 precision across millions of frames.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#34D399] font-bold text-sm">✓</span>
                  <span><strong>Sub-Millimeter Geometry:</strong> Identifies micro-bridging, hairline fracture cracks down to 0.05 mm span.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#34D399] font-bold text-sm">✓</span>
                  <span><strong>Sub-500ms Edge Inference:</strong> Keeps continuous assembly line pacing with automated verdict routing.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#34D399] font-bold text-sm">✓</span>
                  <span><strong>Supabase Cloud Audit Trail:</strong> Every batch logged with bounding box coordinates, operator ID, and printable ISO certs.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: END-TO-END VISION PIPELINE
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#120704]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono text-[#E3845A] tracking-wider uppercase bg-[#1B0C07] px-3 py-1 rounded-full border border-[#3D180C]">
              Architecture Blueprint
            </span>
            <h2 className="text-3xl font-extrabold text-[#FFFFFF] mt-3">
              4-Stage Computer Vision Pipeline
            </h2>
            <p className="text-xs text-[#D1B8AE] mt-2">
              From hardware sensor photons to certified disposition in under half a second.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/50 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#E3845A]/15 border border-[#E3845A]/30 flex items-center justify-center text-[#E3845A] font-mono font-bold mb-4">
                01
              </div>
              <h4 className="text-base font-bold text-[#FFFFFF]">Optical Capture</h4>
              <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                Telecentric optics capture 4K raw frames under dual-band ring lighting to nullify reflections and shadows.
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[10px] font-mono text-[#E3845A]">
                Input: Raw Image / Webcam
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/50 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#E3845A]/15 border border-[#E3845A]/30 flex items-center justify-center text-[#E3845A] font-mono font-bold mb-4">
                02
              </div>
              <h4 className="text-base font-bold text-[#FFFFFF]">Spatial Alignment</h4>
              <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                Normalizes component orientation against CAD fiducial markers for sub-pixel feature overlay alignment.
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[10px] font-mono text-[#E3845A]">
                Tolerance: ±0.05 mm
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/50 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#E3845A]/15 border border-[#E3845A]/30 flex items-center justify-center text-[#E3845A] font-mono font-bold mb-4">
                03
              </div>
              <h4 className="text-base font-bold text-[#FFFFFF]">Gemini 3.8 Vision</h4>
              <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                Multimodal reasoning maps bounding boxes, calculates flaw severity, and infers machine tooling root causes.
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[10px] font-mono text-[#E3845A]">
                Latency: &lt; 500 ms
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/50 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#E3845A]/15 border border-[#E3845A]/30 flex items-center justify-center text-[#E3845A] font-mono font-bold mb-4">
                04
              </div>
              <h4 className="text-base font-bold text-[#FFFFFF]">Supabase Audit</h4>
              <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                Immutable cloud PostgreSQL logging, personal operator history, real-time scrap analytics, and ISO certificate dispatch.
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[10px] font-mono text-[#E3845A]">
                Standard: ISO-9001:2015
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#120704] to-[#0d0503] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="p-10 rounded-3xl bg-[#1B0C07] border border-[#E3845A]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E3845A]/10 rounded-full blur-[90px] pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
              Experience Autonomous Optical QA in Real-Time
            </h2>
            <p className="text-sm text-[#D1B8AE] mt-3 max-w-xl mx-auto">
              Test verified benchmark components, upload your own production photos, or activate your optical camera.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onLaunchApp}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-[#FFFFFF] font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#E3845A]/30 flex items-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Launch Live Inspection Console</span>
              </button>

              <button
                onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
                className="px-6 py-3.5 rounded-xl bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] text-[#E3845A] font-mono text-xs font-semibold transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#E3845A] animate-pulse" />
                <span>1-Click Judge Access</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
