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
  Award,
  Scan,
  Compass,
  Activity,
  Sliders,
  ChevronDown
} from 'lucide-react';
import OryzoShowcase from './OryzoShowcase.jsx';

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  const scrollTrackRef = useRef(null);
  const videoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Default to scroll scrubbing
  const [isMuted, setIsMuted] = useState(true);

  // High-performance scroll-driven video scrubbing (Apple-style)
  useEffect(() => {
    if (isAutoPlay) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const track = scrollTrackRef.current;
          const video = videoRef.current;
          if (!track || !video || isNaN(video.duration)) {
            ticking = false;
            return;
          }

          const rect = track.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalDistance = rect.height - windowHeight;

          if (totalDistance <= 0) {
            ticking = false;
            return;
          }

          // Progress from 0.0 when top hits top of viewport, to 1.0 when bottom hits bottom of viewport
          const scrolled = -rect.top;
          const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);

          setScrollProgress(progress);

          // Update video frame smoothly (scrub video with -g 1 intra-frames)
          if (!isNaN(video.duration) && video.duration > 0) {
            video.currentTime = progress * video.duration;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoPlay]);

  const toggleAutoPlay = () => {
    if (!videoRef.current) return;
    if (isAutoPlay) {
      videoRef.current.pause();
      setIsAutoPlay(false);
    } else {
      videoRef.current.play();
      setIsAutoPlay(true);
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
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-[#3D180C] bg-[#120704] radar-grid">
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

          {/* Interactive Scroll Prompt */}
          <div className="mt-12 flex flex-col items-center justify-center space-y-2 text-[#D1B8AE]/70 animate-bounce">
            <span className="text-xs font-mono tracking-widest uppercase">Scroll Down to Scrub 3D Optical Hardware</span>
            <ChevronDown className="w-4 h-4 text-[#E3845A]" />
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: FULL-SPACE STICKY SCROLL VIDEO THEATER (APPLE-STYLE)
          ───────────────────────────────────────────────────────────── */}
      <section ref={scrollTrackRef} className="relative h-[320vh] bg-[#120704]">
        
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#120704] z-20">
          
          {/* Subtle Diffused Backing Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,132,90,0.12)_0%,rgba(18,7,4,0.95)_70%)] pointer-events-none" />

          {/* The Full-Space Video Element */}
          <div className="relative w-full h-full max-w-[1920px] flex items-center justify-center">
            
            <video
              ref={videoRef}
              src="/videos/hero-render-scrub.mp4"
              playsInline
              muted={isMuted}
              loop={isAutoPlay}
              autoPlay={false}
              className="w-full h-full object-cover sm:object-contain transition-opacity duration-300 pointer-events-none select-none"
            />

            {/* Edge Vignette & Ambient Darkness Overlays to blend flawlessly into #120704 */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#120704] via-transparent to-[#120704]/90" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#120704] via-transparent to-[#120704]" />

            {/* Optical Alignment Crosshairs & Laser Overlay */}
            <div className="absolute inset-8 pointer-events-none border border-[#E3845A]/15 rounded-3xl hidden md:block">
              {/* Corner Reticles */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E3845A]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E3845A]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#E3845A]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E3845A]" />
            </div>

            {/* Dynamic Laser Scanline sweeping down based on scroll */}
            <div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E3845A] to-transparent shadow-[0_0_15px_#E3845A] pointer-events-none transition-all duration-75"
              style={{ top: `${Math.min(Math.max(scrollProgress * 100, 10), 90)}%` }}
            />

            {/* TOP FLOATING HUD: Live Telemetry Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-30">
              <div className="flex items-center space-x-3 bg-[#1B0C07]/90 border border-[#3D180C] px-3.5 py-1.5 rounded-xl backdrop-blur-md shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping" />
                <span className="font-mono text-xs text-[#FFFFFF] font-bold">NEXCAN 3D OPTICAL RIG</span>
                <span className="text-[#3D180C]">|</span>
                <span className="font-mono text-[11px] text-[#D1B8AE] hidden sm:inline">
                  POS: X:{(120 + scrollProgress * 40).toFixed(1)}mm Y:{(60 + scrollProgress * 30).toFixed(1)}mm
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-[#1B0C07]/90 border border-[#3D180C] px-3 py-1.5 rounded-xl backdrop-blur-md shadow-xl">
                <Cpu className="w-3.5 h-3.5 text-[#E3845A]" />
                <span className="font-mono text-xs text-[#FFFFFF]">GEMINI 3.8 REASONING</span>
              </div>
            </div>

            {/* CENTER FLOATING NARRATIVE MILESTONE (Transitions with Scroll Progress) */}
            <div className="absolute inset-x-4 sm:inset-x-auto sm:left-12 sm:max-w-md bottom-28 sm:bottom-24 pointer-events-auto z-30">
              
              {/* Milestone 1: 0% - 25% */}
              {scrollProgress < 0.25 && (
                <div className="p-6 rounded-2xl bg-[#1B0C07]/95 border border-[#3D180C] shadow-2xl backdrop-blur-xl animate-fade-in">
                  <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                    <Scan className="w-4 h-4" />
                    <span>01 / HIGH-RESOLUTION OPTICAL SCAN</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Sub-Millimeter Surface Profiling</h3>
                  <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                    Custom telecentric lenses illuminate micro-fractures, dimensional warpage, and solder voids with 0.05 mm precision.
                  </p>
                </div>
              )}

              {/* Milestone 2: 25% - 52% */}
              {scrollProgress >= 0.25 && scrollProgress < 0.52 && (
                <div className="p-6 rounded-2xl bg-[#1B0C07]/95 border border-[#3D180C] shadow-2xl backdrop-blur-xl animate-fade-in">
                  <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                    <Cpu className="w-4 h-4" />
                    <span>02 / MULTIMODAL VISION CORE</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Gemini 3.8 Visual Intelligence</h3>
                  <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                    Eliminates human inspector eye fatigue. Evaluates complex geometries, contextual defect severity, and IPC-A-610 criteria.
                  </p>
                </div>
              )}

              {/* Milestone 3: 52% - 78% */}
              {scrollProgress >= 0.52 && scrollProgress < 0.78 && (
                <div className="p-6 rounded-2xl bg-[#1B0C07]/95 border border-[#3D180C] shadow-2xl backdrop-blur-xl animate-fade-in">
                  <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                    <Zap className="w-4 h-4" />
                    <span>03 / SUB-500MS DISPOSITION</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Autonomous PASS / REWORK / SCRAP</h3>
                  <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                    Instant factory routing decisions. Outputs explicit rework coordinates and instructions directly to technician workstations.
                  </p>
                </div>
              )}

              {/* Milestone 4: 78% - 100% */}
              {scrollProgress >= 0.78 && (
                <div className="p-6 rounded-2xl bg-[#1B0C07]/95 border border-[#E3845A]/40 shadow-2xl backdrop-blur-xl animate-fade-in">
                  <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
                    <Award className="w-4 h-4" />
                    <span>04 / ISO-9001 COMPLIANCE</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Supabase Audit &amp; Certificate</h3>
                  <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
                    Immutable PostgreSQL audit trail with operator attribution, downloadable compliance certificates, and real-time yield analytics.
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      onClick={onLaunchApp}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-[#FFFFFF] font-bold text-xs uppercase shadow-md hover:brightness-110 transition-all flex items-center space-x-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Launch Console</span>
                    </button>
                    <button
                      onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
                      className="px-3.5 py-2 rounded-xl bg-[#120704] border border-[#3D180C] text-[#E3845A] text-xs font-mono hover:bg-[#3D180C]/50 transition-colors"
                    >
                      Judge Demo
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* BOTTOM HUD: Interactive Scrub Controls & Progress Track */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-30 pointer-events-auto">
              
              {/* Playback Mode Switcher */}
              <div className="flex items-center space-x-2 bg-[#1B0C07]/90 border border-[#3D180C] p-1.5 rounded-xl backdrop-blur-md">
                <button
                  onClick={toggleAutoPlay}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all ${
                    isAutoPlay
                      ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-[#FFFFFF] font-bold shadow-md'
                      : 'text-[#D1B8AE] hover:text-[#FFFFFF]'
                  }`}
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoPlay ? 'Auto-Playing' : 'Scroll Scrub Mode'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  title="Toggle Audio"
                  className="p-1.5 text-[#D1B8AE] hover:text-white rounded-lg hover:bg-[#3D180C]/50 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Real-time Scrubbing Meter */}
              <div className="w-full sm:w-80 bg-[#1B0C07]/90 border border-[#3D180C] p-2.5 rounded-xl backdrop-blur-md flex items-center space-x-3">
                <div className="text-[11px] font-mono text-[#D1B8AE] whitespace-nowrap">
                  FRAME SCRUB: <strong className="text-[#FFFFFF]">{Math.round(scrollProgress * 100)}%</strong>
                </div>
                <div className="w-full bg-[#120704] h-2 rounded-full overflow-hidden border border-[#3D180C]">
                  <div
                    className="h-full bg-gradient-to-r from-[#A74A21] via-[#E3845A] to-[#FFFFFF] transition-all duration-75 shadow-[0_0_10px_#E3845A]"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Quick Launch CTA */}
              <button
                onClick={onLaunchApp}
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1B0C07]/90 hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono font-bold backdrop-blur-md shadow-lg transition-all"
              >
                <span>Launch App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

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
      <section className="py-24 border-b border-[#3D180C] bg-[#120704] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          
          <div className="text-center max-w-3xl mx-auto mb-16">
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
