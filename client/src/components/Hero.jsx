import React, { useState, useRef, useEffect } from 'react';
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
  Award
} from 'lucide-react';

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollMode, setScrollMode] = useState(false); // Toggle between Auto-play & Scroll-scrubbing

  // Scroll-driven video playback scrubbing (Apple-style)
  useEffect(() => {
    if (!scrollMode) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video || isNaN(video.duration)) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      video.currentTime = progress * video.duration;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollMode]);

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

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden pt-10 pb-16 border-b border-[#3D180C]/80 radar-grid bg-[#120704]">
      {/* Soft diffused light leak backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] diffused-light-leak pointer-events-none" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#E3845A]/12 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Text */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E3845A]/10 border border-[#E3845A]/30 text-[#E3845A] text-xs font-mono mb-5 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3845A] animate-pulse"></span>
            <span className="tracking-wide">NEXT-GEN COMPUTER VISION &amp; VISUAL INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
            Autonomous Quality Assurance &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E3845A] to-[#A74A21]">
              Defect Intelligence
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#D1B8AE] max-w-2xl mx-auto leading-relaxed">
            Eliminate human visual fatigue on manufacturing lines. Instant sub-millimeter flaw localization, automated root-cause disposition (
            <code className="text-[#34D399] font-semibold bg-[#34D399]/10 px-1 py-0.5 rounded border border-[#34D399]/20">PASS</code> /{' '}
            <code className="text-[#E3845A] font-semibold bg-[#E3845A]/10 px-1 py-0.5 rounded border border-[#E3845A]/20">REWORK</code> /{' '}
            <code className="text-[#F43F5E] font-semibold bg-[#F43F5E]/10 px-1 py-0.5 rounded border border-[#F43F5E]/20">SCRAP</code>), and verified ISO-9001 compliance audit trails.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onLaunchApp}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:from-[#E3845A] hover:to-[#A74A21] text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-[#E3845A]/25 flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>Launch Live Inspector</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              className="px-5 py-3 rounded-xl bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] font-mono text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#E3845A]" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

          {/* Quick Metrics Bar with warm espresso & obsidian surfaces */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-[#1B0C07]/90 border border-[#3D180C] flex items-center space-x-3 backdrop-blur-sm shadow-md hover:border-[#E3845A]/40 transition-colors">
              <Zap className="w-5 h-5 text-[#E3845A] shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">&lt; 500ms</div>
                <div className="text-[10px] text-[#D1B8AE]/80">Inference Latency</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1B0C07]/90 border border-[#3D180C] flex items-center space-x-3 backdrop-blur-sm shadow-md hover:border-[#E3845A]/40 transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#34D399] shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">99.4%</div>
                <div className="text-[10px] text-[#D1B8AE]/80">Accuracy F1</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1B0C07]/90 border border-[#3D180C] flex items-center space-x-3 backdrop-blur-sm shadow-md hover:border-[#E3845A]/40 transition-colors">
              <Layers className="w-5 h-5 text-[#E3845A] shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">0.05 mm</div>
                <div className="text-[10px] text-[#D1B8AE]/80">Tolerance Precision</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1B0C07]/90 border border-[#3D180C] flex items-center space-x-3 backdrop-blur-sm shadow-md hover:border-[#E3845A]/40 transition-colors">
              <BarChart2 className="w-5 h-5 text-[#A74A21] shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">ISO-9001</div>
                <div className="text-[10px] text-[#D1B8AE]/80">Audit Compliance</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Hardware Render Showcase Window with Moody Warm Glow */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] shadow-2xl cinematic-glow">
            
            <div className="rounded-[15px] bg-[#120704] overflow-hidden">
              
              {/* Window Header Bar */}
              <div className="px-4 py-2.5 bg-[#1B0C07] border-b border-[#3D180C] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E3845A]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]/80"></div>
                  <span className="ml-2 font-mono text-[11px] text-[#FAF9F6] font-semibold tracking-wide flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#E3845A]" />
                    NEXCAN-OPTIX // 3D HARDWARE OPTICAL STREAM
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Scroll vs Auto-play Mode Toggle */}
                  <button
                    onClick={() => {
                      if (!scrollMode && videoRef.current) videoRef.current.pause();
                      if (scrollMode && videoRef.current) videoRef.current.play();
                      setScrollMode(!scrollMode);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center space-x-1.5 transition-all ${
                      scrollMode
                        ? 'bg-[#E3845A] text-black font-bold shadow-md shadow-[#E3845A]/30'
                        : 'bg-[#120704] text-[#D1B8AE] border border-[#3D180C] hover:border-[#E3845A]/50'
                    }`}
                  >
                    <MousePointer className="w-3 h-3" />
                    <span>{scrollMode ? 'Mode: Scroll-Scrub' : 'Mode: Auto-Play'}</span>
                  </button>

                  {/* Video Controls */}
                  <div className="flex items-center space-x-1 pl-2 border-l border-[#3D180C]">
                    {!scrollMode && (
                      <button
                        onClick={togglePlay}
                        title={isPlaying ? "Pause" : "Play"}
                        className="p-1.5 rounded text-[#D1B8AE] hover:text-[#FFFFFF] hover:bg-[#3D180C] transition-colors"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    <button
                      onClick={toggleMute}
                      title={isMuted ? "Unmute" : "Mute"}
                      className="p-1.5 rounded text-[#D1B8AE] hover:text-[#FFFFFF] hover:bg-[#3D180C] transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleFullscreen}
                      title="Fullscreen"
                      className="p-1.5 rounded text-[#D1B8AE] hover:text-[#FFFFFF] hover:bg-[#3D180C] transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Player Display Area */}
              <div className="relative aspect-video w-full bg-[#0a0402] flex items-center justify-center overflow-hidden group">
                <video
                  ref={videoRef}
                  src="/videos/hero-render.mp4"
                  autoPlay={!scrollMode}
                  loop={!scrollMode}
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Reticle / Optical HUD Crosshairs */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#E3845A]/80">
                    <span className="px-2 py-0.5 rounded bg-[#120704]/80 backdrop-blur-sm border border-[#E3845A]/30">
                      [+ OPTICAL SENSOR 01]
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#120704]/80 backdrop-blur-sm border border-[#E3845A]/30">
                      RES: 1080P // 60 FPS
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#E3845A]/80">
                    <span className="px-2 py-0.5 rounded bg-[#120704]/80 backdrop-blur-sm border border-[#E3845A]/30">
                      AI MODEL: GEMINI 3.8 VISION
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#120704]/80 backdrop-blur-sm border border-[#E3845A]/30">
                      {scrollMode ? 'SCRUB ACTIVE // SCROLL PAGE' : 'STATUS: SYNCHRONIZED'}
                    </span>
                  </div>
                </div>

                {/* Warm diffused cinematic vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#120704]/90 via-transparent to-transparent"></div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 2: Problem vs Solution (Why Industrial QA Needs This) */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#E3845A] uppercase tracking-wider block mb-1">
              THE INDUSTRIAL QA CRISIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Manual Human Inspection Fails At Scale
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] max-w-xl mx-auto mt-2">
              Assembly line operators face severe sensory fatigue, leading to missed defects, recalls, and millions in scrap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-[#1B0C07]/80 border border-red-950/40 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-red-400 font-mono text-xs font-bold mb-4">
                <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>TRADITIONAL HUMAN INSPECTION</span>
              </div>
              <ul className="space-y-3 text-xs text-[#D1B8AE]">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>40% Accuracy Drop:</strong> Human cognitive fatigue sets in within 20 minutes of continuous scrutiny.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>$50B+ in Scrap &amp; Recalls:</strong> Micro-fractures and solder bridging escape downstream into customer hands.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Unrecorded Dispositions:</strong> Manual clipboard logs fail ISO-9001 Clause 8.5.1 regulatory traceability audits.</span>
                </li>
              </ul>
            </div>

            {/* The Nexcan AI Way */}
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#E3845A]/40 relative overflow-hidden shadow-lg shadow-[#E3845A]/5">
              <div className="flex items-center space-x-2 text-[#34D399] font-mono text-xs font-bold mb-4">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34D399]" />
                <span>NEXCAN AI AUTONOMOUS CV</span>
              </div>
              <ul className="space-y-3 text-xs text-[#D1B8AE]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Sub-0.05 mm Precision:</strong> Zero fatigue 24/7 scanning powered by Google Gemini 3.8 Flash Multimodal Vision.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Immediate Root-Cause Guidance:</strong> Line operators receive actionable rework steps (<code className="text-[#34D399]">PASS</code> / <code className="text-[#E3845A]">REWORK</code> / <code className="text-[#F43F5E]">SCRAP</code>) in 500ms.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">✓</span>
                  <span><strong>Immutable Cloud Ledger:</strong> Every component photo &amp; bounding box is recorded in Supabase with verifiable ISO certificates.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* SECTION 3: 4-Stage Architectural Pipeline */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#E3845A] uppercase tracking-wider block mb-1">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              End-to-End Visual Quality Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="text-[#E3845A] font-mono text-xs font-bold mb-2">01 // INTAKE</div>
              <h4 className="text-sm font-bold text-white mb-1">Optical Capture</h4>
              <p className="text-xs text-[#D1B8AE] leading-relaxed">
                Accepts multi-angle camera streams, live webcams, or high-res manufacturing uploads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="text-[#E3845A] font-mono text-xs font-bold mb-2">02 // INFERENCE</div>
              <h4 className="text-sm font-bold text-white mb-1">Gemini 3.8 Vision</h4>
              <p className="text-xs text-[#D1B8AE] leading-relaxed">
                Zero-shot token multimodal analysis identifies micro-fractures, voids, and pitch bridges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="text-[#E3845A] font-mono text-xs font-bold mb-2">03 // LOCALIZATION</div>
              <h4 className="text-sm font-bold text-white mb-1">Bounding Overlays</h4>
              <p className="text-xs text-[#D1B8AE] leading-relaxed">
                Dynamic normalized reticles pinpoint exact flaw coordinates and calculate tolerance deviation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C] hover:border-[#E3845A]/40 transition-colors">
              <div className="text-[#E3845A] font-mono text-xs font-bold mb-2">04 // AUDIT</div>
              <h4 className="text-sm font-bold text-white mb-1">Supabase Ledger</h4>
              <p className="text-xs text-[#D1B8AE] leading-relaxed">
                Permanent PostgreSQL storage, CDN image retention, and 1-click printable ISO-9001 certificates.
              </p>
            </div>

          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="mt-20 max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-[#1B0C07] via-[#2A130B] to-[#1B0C07] border border-[#E3845A]/40 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Test Autonomous Vision QA?</h3>
            <p className="text-xs text-[#D1B8AE] max-w-md mx-auto mb-6">
              Evaluate real PCB, turbine, and pharma packaging test presets right in your browser.
            </p>
            <button
              onClick={onLaunchApp}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:scale-105 text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-[#E3845A]/30 transition-all cursor-pointer"
            >
              Start Inspection Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
