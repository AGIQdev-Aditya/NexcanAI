import React from 'react';
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
  Check
} from 'lucide-react';

export default function Hero({ onLaunchApp, onOpenLogin, onQuickDemo }) {
  return (
    <div className="bg-[#120704] text-[#FAF9F6] selection:bg-[#E3845A] selection:text-[#120704]">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO OVERVIEW & INTRO
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 border-b border-[#3D180C] bg-[#120704]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Track Tag Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1B0C07] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E3845A]"></span>
            <span className="tracking-wider uppercase font-semibold">Track: Computer Vision &amp; Visual Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] max-w-4xl mx-auto">
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
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-[#FFFFFF] font-bold text-xs tracking-wider uppercase shadow-xl flex items-center space-x-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>Launch Live Inspector</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onQuickDemo ? onQuickDemo('lead') : (onOpenLogin && onOpenLogin())}
              className="px-6 py-3.5 rounded-xl bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] font-mono text-xs font-semibold shadow-lg cursor-pointer flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#E3845A]" />
              <span>1-Click Judge Access</span>
            </button>
          </div>

          {/* Key Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left">
              <div className="flex items-center space-x-2 text-[#E3845A] mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Latency</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">&lt; 500ms</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Real-time edge cycle</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left">
              <div className="flex items-center space-x-2 text-[#34D399] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Accuracy</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">99.4% F1</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Defect precision</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left">
              <div className="flex items-center space-x-2 text-[#E3845A] mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase">Precision</span>
              </div>
              <div className="text-xl font-extrabold text-[#FFFFFF] font-mono">0.05 mm</div>
              <div className="text-[11px] text-[#D1B8AE]/80 mt-0.5">Sub-millimeter flaw limit</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1B0C07] border border-[#3D180C] text-left">
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
          SECTION 2: 4 CORE SYSTEM CAPABILITIES (CLEAN STATIC CARDS)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#3D180C]">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono text-[#E3845A] tracking-wider uppercase bg-[#1B0C07] px-3 py-1 rounded-full border border-[#3D180C]">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mt-3">
            Industrial Vision Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#D1B8AE] mt-1.5">
            Designed for continuous 24/7 manufacturing line deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C]">
            <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
              <Scan className="w-4 h-4" />
              <span>01 / OPTICAL SCAN</span>
            </div>
            <h4 className="text-base font-bold text-[#FFFFFF]">Sub-Millimeter Profiling</h4>
            <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
              Custom telecentric optics isolate micro-fractures, voids, and bridging with 0.05 mm precision.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C]">
            <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
              <Cpu className="w-4 h-4" />
              <span>02 / VISION CORE</span>
            </div>
            <h4 className="text-base font-bold text-[#FFFFFF]">Gemini 3.8 Intelligence</h4>
            <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
              Zero human fatigue. Evaluates complex geometries against IPC-A-610 Class 3 specifications.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C]">
            <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
              <Zap className="w-4 h-4" />
              <span>03 / ROUTING ENGINE</span>
            </div>
            <h4 className="text-base font-bold text-[#FFFFFF]">&lt; 500ms Disposition</h4>
            <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
              Autonomous PASS / REWORK / SCRAP verdict routing with pinpoint rework coordinate directives.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C]">
            <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-mono font-bold mb-2">
              <Award className="w-4 h-4" />
              <span>04 / ISO-9001 AUDIT</span>
            </div>
            <h4 className="text-base font-bold text-[#FFFFFF]">Supabase Traceability</h4>
            <p className="text-xs text-[#D1B8AE] mt-2 leading-relaxed">
              Immutable cloud PostgreSQL logs, operator attribution, and downloadable compliance certificates.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: PROBLEM VS SOLUTION (THE INDUSTRIAL DISRUPTION)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-[#3D180C] bg-[#120704]">
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
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#F43F5E]/30">
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
            <div className="p-6 rounded-2xl bg-[#1B0C07] border border-[#E3845A]/50">
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
          SECTION 4: BOTTOM CTA
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#120704] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-8 rounded-3xl bg-[#1B0C07] border border-[#E3845A]/40">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              Ready to Inspect Components?
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8AE] mt-2 max-w-md mx-auto">
              Test verified benchmark components or upload production photos in the Live Inspector.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onLaunchApp}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-[#FFFFFF] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <Zap className="w-4 h-4" />
                <span>Open Live Inspection Console</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
