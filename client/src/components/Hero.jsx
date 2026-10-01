import React from 'react';
import { ShieldCheck, Zap, Layers, BarChart2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-8 pb-6 border-b border-slate-800/60 radar-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>NEXT-GEN COMPUTER VISION & VISUAL INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Autonomous Quality Assurance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Defect Intelligence</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Eliminate human visual fatigue on manufacturing lines. Instant sub-millimeter flaw localization, automated root-cause disposition (<code className="text-emerald-300">PASS</code> / <code className="text-amber-300">REWORK</code> / <code className="text-red-300">SCRAP</code>), and verified ISO-9001 compliance audit trails.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">&lt; 500ms</div>
                <div className="text-[10px] text-slate-400">Inference Latency</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">99.4%</div>
                <div className="text-[10px] text-slate-400">Accuracy F1</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">0.05 mm</div>
                <div className="text-[10px] text-slate-400">Tolerance Precision</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <BarChart2 className="w-5 h-5 text-purple-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">ISO-9001</div>
                <div className="text-[10px] text-slate-400">Audit Compliance</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
