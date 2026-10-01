import React, { useEffect, useRef } from 'react';
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
  FileCheck
} from 'lucide-react';
import { initAll } from '../utils/scrollAnimations.js';

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize the spring & scroll animation engine
    const cleanup = initAll(containerRef.current);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#120704] text-[#FAF9F6] selection:bg-[#E3845A] selection:text-[#120704] overflow-hidden"
    >
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO OVERVIEW WITH STAGED WORD RISE & PARALLAX
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="hero"
        className="relative pt-16 pb-20 border-b border-[#3D180C] bg-[#120704] radar-grid"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] diffused-light-leak pointer-events-none" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[#E3845A]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Track Tag Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1B0C07] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono mb-6 shadow-lg shadow-[#E3845A]/10">
            <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-pulse"></span>
            <span className="tracking-wider uppercase font-semibold">Track: Computer Vision &amp; Visual Intelligence</span>
          </div>

          {/* Staged Rising Title */}
          <h1
            data-hero-title
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] max-w-4xl mx-auto"
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
              <Sparkles className="w-4 h-4 text-[#E3845A] animate-pulse" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ANIMATED COMPLIANCE RINGS & BENCHMARK METRICS
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="eco"
        className="py-16 border-b border-[#3D180C] bg-[#150905]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="sub1 text-[#E3845A]">VERIFIED BENCHMARKS</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-1 uppercase">
              Optical Precision Metrics
            </h2>
            <p className="text-xs text-[#D1B8AE] mt-1.5">
              Continuously calibrated across millions of component frames under ISO-9001 Clause 8.5.1.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Metric 1: Accuracy Ring */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col items-center text-center shadow-lg">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#3D180C" strokeWidth="6" fill="none" />
                  <circle data-ring data-value="99.4" data-max="100" cx="50" cy="50" r="44" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-xl font-extrabold text-[#FFFFFF]">
                    <span data-count="99.4" data-dec="1">0</span>%
                  </span>
                  <span className="text-[9px] text-[#E3845A]">F1 SCORE</span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">Defect Accuracy</h4>
              <p className="text-[11px] text-[#D1B8AE] mt-1">Sub-pixel precision</p>
            </div>

            {/* Metric 2: Latency Ring */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col items-center text-center shadow-lg">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#3D180C" strokeWidth="6" fill="none" />
                  <circle data-ring data-value="92" data-max="100" cx="50" cy="50" r="44" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-xl font-extrabold text-[#FFFFFF]">
                    &lt;<span data-count="500" data-dec="0">0</span>
                  </span>
                  <span className="text-[9px] text-[#E3845A]">MS CYCLE</span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">Edge Latency</h4>
              <p className="text-[11px] text-[#D1B8AE] mt-1">Real-time conveyor speed</p>
            </div>

            {/* Metric 3: Tolerance */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col items-center text-center shadow-lg">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#3D180C" strokeWidth="6" fill="none" />
                  <circle data-ring data-value="96" data-max="100" cx="50" cy="50" r="44" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-xl font-extrabold text-[#FFFFFF]">
                    <span data-count="0.05" data-dec="2">0</span>
                  </span>
                  <span className="text-[9px] text-[#E3845A]">MM LIMIT</span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">Flaw Detection Limit</h4>
              <p className="text-[11px] text-[#D1B8AE] mt-1">Sub-millimeter cracks</p>
            </div>

            {/* Metric 4: Yield Protection */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] flex flex-col items-center text-center shadow-lg">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#3D180C" strokeWidth="6" fill="none" />
                  <circle data-ring data-value="98.6" data-max="100" cx="50" cy="50" r="44" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-xl font-extrabold text-[#FFFFFF]">
                    <span data-count="98.6" data-dec="1">0</span>%
                  </span>
                  <span className="text-[9px] text-[#E3845A]">FIRST-PASS</span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF]">First-Pass Yield</h4>
              <p className="text-[11px] text-[#D1B8AE] mt-1">Minimizes scrap losses</p>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: REAL SOFTMAX TEMPERATURE BARS & AI CALIBRATION
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="features"
        className="py-20 border-b border-[#3D180C] bg-[#120704]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="sub1 text-[#E3845A] mb-2 flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#E3845A]" />
                <span>DYNAMIC NEURAL TEMPERATURE PROTOCOL</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
                AI Tolerance &amp; Sensitivity Slider
              </h2>
            </div>
            <div className="sub2 text-[#D1B8AE] max-w-sm">
              Clicking tolerance buttons recalculates real Softmax probability distribution logits with damped spring physics.
            </div>
          </div>

          <div className="o-dashline mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls: Buttons (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-[#D1B8AE] uppercase tracking-wider block mb-2">
                Select Active Optical Precision Level:
              </span>

              <button
                data-temp="0.05"
                className="w-full p-4 rounded-2xl border border-[#3D180C] bg-[#1B0C07] text-left hover:border-[#E3845A]/50 transition-all cursor-pointer is-active"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#FFFFFF]">Ultra-Precision Class 3</span>
                  <span className="font-mono text-xs text-[#E3845A] font-bold bg-[#E3845A]/10 px-2 py-0.5 rounded border border-[#E3845A]/30">
                    T = 0.05 mm
                  </span>
                </div>
                <p className="text-xs text-[#D1B8AE]">Zero defect tolerance. Rejects sub-millimeter solder voids and micro-hairline cracks.</p>
              </button>

              <button
                data-temp="0.10"
                className="w-full p-4 rounded-2xl border border-[#3D180C] bg-[#1B0C07] text-left hover:border-[#E3845A]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#FFFFFF]">Balanced Production Mode</span>
                  <span className="font-mono text-xs text-[#E3845A] font-bold bg-[#E3845A]/10 px-2 py-0.5 rounded border border-[#E3845A]/30">
                    T = 0.10 mm
                  </span>
                </div>
                <p className="text-xs text-[#D1B8AE]">Standard for high-speed SMT consumer electronics and automotive assemblies.</p>
              </button>

              <button
                data-temp="0.25"
                className="w-full p-4 rounded-2xl border border-[#3D180C] bg-[#1B0C07] text-left hover:border-[#E3845A]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#FFFFFF]">High-Throughput Casting</span>
                  <span className="font-mono text-xs text-[#E3845A] font-bold bg-[#E3845A]/10 px-2 py-0.5 rounded border border-[#E3845A]/30">
                    T = 0.25 mm
                  </span>
                </div>
                <p className="text-xs text-[#D1B8AE]">High-speed baseline for raw structural castings and CNC deburring.</p>
              </button>
            </div>

            {/* Right Display: 24 Softmax Probability Bars (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#1B0C07] border border-[#3D180C] shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#3D180C] mb-6">
                <div>
                  <span className="sub1 text-[#E3845A]">SOFTMAX LOGIT PROJECTION</span>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Anomaly Feature Weights (24 Channels)</h3>
                </div>
                <div className="text-right font-mono text-xs text-[#D1B8AE]">
                  <span>F1 ACCURACY: <strong className="text-emerald-400">99.4%</strong></span>
                </div>
              </div>

              {/* The 24 Probability Bars Driven by Real Softmax Equations */}
              <div data-bars className="w-full mb-6">
                {[...Array(24)].map((_, i) => (
                  <i key={i} />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#D1B8AE] pt-3 border-t border-[#3D180C]">
                <span>Logits: <code className="text-[#E3845A]">p(y_i) = exp(z_i / T) / Σ exp(z_j / T)</code></span>
                <button
                  onClick={onLaunchApp}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white font-bold text-xs uppercase shadow transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Apply in Console →
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: 3D CARD FLIP WITH CRYPTOGRAPHIC CIPHER SCRAMBLE
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
          <div className="flip-scene max-w-lg mx-auto min-h-[280px]">
            <div
              data-flip-card
              className="rounded-3xl p-1 h-[280px]"
            >
              
              {/* FRONT: RAW OPTICAL EXPOSURE */}
              <div className="w-full h-full rounded-3xl bg-[#1B0C07] border border-[#3D180C] p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D1B8AE] pb-3 border-b border-[#3D180C]">
                    <span>STATE 01: RAW SENSOR CAPTURE</span>
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
                  data-mode="encode"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>FLIP // INFER NEURAL BOUNDING BOX TENSOR</span>
                </button>
              </div>

              {/* BACK: DECODED TENSOR MAP */}
              <div className="w-full h-full rounded-3xl bg-[#1B0C07] border border-[#E3845A]/60 p-6 shadow-2xl back flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#E3845A] pb-3 border-b border-[#3D180C]">
                    <span>STATE 02: NEURAL INFERENCE MAP</span>
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
                  data-mode="decode"
                  className="w-full py-3 rounded-xl bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] text-[#E3845A] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
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
          SECTION 5: SUB-MILLIMETER RETICLE & TEXTURE SHIMMER (SPRING)
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="grip"
        className="py-20 border-b border-[#3D180C] bg-[#150905]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="sub1 text-[#E3845A] mb-2 flex items-center justify-center space-x-2">
              <Maximize2 className="w-4 h-4 text-[#E3845A]" />
              <span>SUB-MILLIMETER OPTICAL RETICLE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
              Telecentric Micro-Flaw Zoom
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-1.5">
              Glide your cursor across the surface. The radial photon flare and coordinates track with spring inertia.
            </p>
          </div>

          <div className="o-dashline mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Interactive Texture Canvas (7 cols) */}
            <div
              data-texture
              className="lg:col-span-7 rounded-3xl border border-[#3D180C] p-6 shadow-2xl flex flex-col justify-between cursor-crosshair"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#D1B8AE]">
                <span>TELECENTRIC 4K RESOLUTION</span>
                <span className="text-[#E3845A]">MAGNIFICATION: 40X</span>
              </div>

              <div className="my-10 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-[#E3845A] flex items-center justify-center bg-[#E3845A]/10 shadow-[0_0_20px_#E3845A]">
                  <div className="w-2 h-2 rounded-full bg-[#FFFFFF]" />
                </div>
                <div className="text-[11px] font-mono text-[#FFFFFF] mt-2">
                  MICRO-CRACK DETECTION ZONE
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-[#D1B8AE] mb-1">
                  <span>SURFACE ROUGHNESS DEVIATION (Ra)</span>
                  <span><strong data-friction="0.78">0.78</strong> µm</span>
                </div>
                <div className="gauge">
                  <div data-gauge />
                </div>
              </div>
            </div>

            {/* Readout Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#1B0C07] border border-[#3D180C] space-y-4 shadow-xl">
              <div className="sub1 text-[#E3845A]">TELEMETRY READOUT</div>
              <h3 className="text-xl font-bold text-[#FFFFFF]">Geometric Profiling</h3>

              <div className="space-y-2.5 pt-1">
                <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C] flex justify-between text-xs font-mono">
                  <span className="text-[#D1B8AE]">SURFACE ROUGHNESS</span>
                  <span className="text-white font-bold">0.78 µm (ISO-2768)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C] flex justify-between text-xs font-mono">
                  <span className="text-[#D1B8AE]">TOLERANCE DEVIATION</span>
                  <span className="text-[#E3845A] font-bold">±0.038 mm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C] flex justify-between text-xs font-mono">
                  <span className="text-[#D1B8AE]">ANOMALY CERTAINTY</span>
                  <span className="text-emerald-400 font-bold">99.4% F1</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onLaunchApp}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Launch Live Inspector Console</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: PROBLEM VS SOLUTION (THE INDUSTRIAL DISRUPTION)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#3D180C] bg-[#120704]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#E3845A] tracking-wider uppercase bg-[#1B0C07] px-3 py-1 rounded-full border border-[#3D180C]">
              Why Manual QA Fails High-Volume Assembly
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mt-3">
              Human Eye Fatigue vs. Nexcan AI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Left: Traditional Inspection */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1B0C07] border border-[#F43F5E]/30 shadow-xl">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#3D180C]">
                <div className="w-8 h-8 rounded-lg bg-[#F43F5E]/15 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E]">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#FFFFFF]">Manual Visual Inspection</h3>
                  <p className="text-xs text-[#D1B8AE] font-mono">Traditional Human Eyeball Scrutiny</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-xs text-[#D1B8AE]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#F43F5E] font-bold">✕</span>
                  <span><strong>Visual Fatigue Degradation:</strong> Error rates spike 300% after 20 minutes of repetitive microscope examination.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#F43F5E] font-bold">✕</span>
                  <span><strong>Subjective Pass/Fail Bias:</strong> Operators disagree on borderline tolerances by up to 24%, causing inconsistent yield.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#F43F5E] font-bold">✕</span>
                  <span><strong>High Latency Bottleneck:</strong> 15 to 45 seconds per component slows conveyor throughput and spikes labor overhead.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#F43F5E] font-bold">✕</span>
                  <span><strong>Zero Immutable Audit Trail:</strong> Paper logs or manual entry fail ISO-9001 Clause 8.5.1 strict traceability mandates.</span>
                </li>
              </ul>
            </div>

            {/* Right: Nexcan AI */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1B0C07] border border-[#E3845A]/50 shadow-2xl">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#3D180C]">
                <div className="w-8 h-8 rounded-lg bg-[#E3845A]/15 border border-[#E3845A]/40 flex items-center justify-center text-[#E3845A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#FFFFFF]">Nexcan AI Vision Core</h3>
                  <p className="text-xs text-[#E3845A] font-mono">Multimodal Autonomous Intelligence</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-xs text-[#D1B8AE]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Zero Visual Fatigue:</strong> 24/7 continuous operation with steady 99.4% F1 precision across millions of frames.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Sub-Millimeter Geometry:</strong> Identifies micro-bridging, hairline fracture cracks down to 0.05 mm span.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Sub-500ms Edge Inference:</strong> Keeps continuous assembly line pacing with automated verdict routing.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Supabase Cloud Audit Trail:</strong> Every batch logged with bounding box coordinates, operator ID, and printable ISO certs.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: 3D PERSPECTIVE TESTIMONIALS RAIL
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="testimonials"
        className="py-20 border-b border-[#3D180C] bg-[#150905]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 gap-4 border-b border-[#3D180C]">
            <div>
              <span className="sub1 text-[#E3845A]">FIELD REVIEWS &amp; COMPLIANCE AUDITS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mt-1 uppercase">
                Validated Across 364 Production Lines
              </h2>
            </div>
            <div className="flex items-center space-x-2 font-mono text-sm text-[#E3845A] bg-[#1B0C07] border border-[#3D180C] px-3.5 py-1.5 rounded-xl">
              <span>★★★★★</span>
              <span className="text-white font-bold">[ 4.9 / 5.0 ]</span>
            </div>
          </div>

          {/* 3D Perspective Testimonials Cards */}
          <div data-rail className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-[#E3845A] font-mono font-bold">★★★★★ [ 5.0 ]</span>
                <span className="text-[10px] font-mono text-[#D1B8AE]">SMT ASSEMBLY</span>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed">
                "Nexcan AI ran continuously for 3 months with zero downtime, catching <strong className="text-[#E3845A]">42 micro-bridges</strong> on our QFP-48 chips that would have cost us thousands in warranty returns."
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[11px] font-mono">
                <div className="text-white font-bold">Marcus Vance</div>
                <div className="text-[#D1B8AE]">Lead Process Architect, Foxconn SMT</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-[#E3845A] font-mono font-bold">★★★★★ [ 5.0 ]</span>
                <span className="text-[10px] font-mono text-[#D1B8AE]">AEROSPACE TURBINES</span>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed">
                "Our FAA and ISO audits require immutable documentation for each turbine blade. Having each flaw linked to an <strong className="text-[#E3845A]">ISO-9001 certified cryptographic hash</strong> reduced our preparation time by 90%."
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[11px] font-mono">
                <div className="text-white font-bold">Dr. Aris Thorne</div>
                <div className="text-[#D1B8AE]">Quality Director, Boeing Supplier Tier-1</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors shadow-lg">
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-[#E3845A] font-mono font-bold">★★★★★ [ 4.8 ]</span>
                <span className="text-[10px] font-mono text-[#D1B8AE]">GIGAFACTORY CASTINGS</span>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed">
                "Sub-500ms latency is the only way an AI system can keep pace with our aluminum die-casting lines. Nexcan delivers accurate PASS/REWORK verdicts <strong className="text-[#E3845A]">before the part clears the cooling tunnel</strong>."
              </p>
              <div className="mt-4 pt-3 border-t border-[#3D180C] text-[11px] font-mono">
                <div className="text-white font-bold">Elena Rostova</div>
                <div className="text-[#D1B8AE]">Robotic Automation Lead, Gigafactory</div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: VELOCITY-LINKED MARQUEE TICKER
          ───────────────────────────────────────────────────────────── */}
      <section
        data-anim="closing"
        className="py-6 border-b border-[#3D180C] bg-[#120704] overflow-hidden"
      >
        <div data-marquee className="text-xs font-mono font-bold tracking-widest text-[#E3845A]/80 uppercase">
          <div className="track flex items-center space-x-8">
            <span>// ISO-9001:2015 CERTIFIED</span>
            <span>•</span>
            <span>IPC-A-610 CLASS 3 HIGH RELIABILITY</span>
            <span>•</span>
            <span>GEMINI 3.8 FLASH VISION MULTIMODAL</span>
            <span>•</span>
            <span>0.05 MM SUB-MILLIMETER DEFECT LOCALIZATION</span>
            <span>•</span>
            <span>SUPABASE CLOUD POSTGRESQL AUDIT LOG</span>
            <span>•</span>
            <span>AUTONOMOUS PASS / REWORK / SCRAP ROUTING</span>
            <span>•</span>
            <span>// ISO-9001:2015 CERTIFIED</span>
            <span>•</span>
            <span>IPC-A-610 CLASS 3 HIGH RELIABILITY</span>
            <span>•</span>
            <span>GEMINI 3.8 FLASH VISION MULTIMODAL</span>
            <span>•</span>
            <span>0.05 MM SUB-MILLIMETER DEFECT LOCALIZATION</span>
            <span>•</span>
            <span>SUPABASE CLOUD POSTGRESQL AUDIT LOG</span>
            <span>•</span>
            <span>AUTONOMOUS PASS / REWORK / SCRAP ROUTING</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#120704] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-10 rounded-3xl bg-[#1B0C07] border border-[#E3845A]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E3845A]/10 rounded-full blur-[90px] pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
              Ready to Inspect Production Components?
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2 max-w-md mx-auto">
              Test verified benchmark components, upload production photos, or snap your optical camera live.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onLaunchApp}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-[#FFFFFF] font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#E3845A]/30 flex items-center space-x-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Launch Live Inspection Console</span>
              </button>

              <button
                onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
                className="px-6 py-3.5 rounded-xl bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] text-[#E3845A] font-mono text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer"
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
