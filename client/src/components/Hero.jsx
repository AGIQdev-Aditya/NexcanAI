import React, { useState, useRef } from 'react';
import { ShieldCheck, Zap, Layers, BarChart2, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Scan, Terminal } from 'lucide-react';

export default function Hero() {
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

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative overflow-hidden pt-10 pb-12 border-b border-[#3D180C]/80 radar-grid bg-[#120704]">
      {/* Soft diffused light leak backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] diffused-light-leak pointer-events-none" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-[#E3845A]/10 blur-[130px] pointer-events-none rounded-full" />

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
                    NEXCAN-OPTIX // 3D DIGITAL TWIN &amp; INSPECTION STREAM
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Status Badge */}
                  <span className="hidden sm:inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#E3845A]/10 border border-[#E3845A]/30 text-[#E3845A] font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3845A] animate-ping"></span>
                    <span>ONLINE FEED</span>
                  </span>

                  {/* Video Controls */}
                  <div className="flex items-center space-x-1 pl-2 border-l border-[#3D180C]">
                    <button
                      onClick={togglePlay}
                      title={isPlaying ? "Pause" : "Play"}
                      className="p-1.5 rounded text-[#D1B8AE] hover:text-[#FFFFFF] hover:bg-[#3D180C] transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
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
                  autoPlay
                  loop
                  muted
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
                      STATUS: SYNCHRONIZED
                    </span>
                  </div>
                </div>

                {/* Warm diffused cinematic vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#120704]/90 via-transparent to-transparent"></div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
