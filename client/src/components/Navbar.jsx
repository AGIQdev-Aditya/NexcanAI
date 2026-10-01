import React from 'react';
import { Eye, ShieldCheck, Database, Cpu, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemStatus }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#3D180C]/80 bg-[#120704]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('inspect')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E3845A] via-[#A74A21] to-[#3D180C] p-[1.5px] shadow-lg shadow-[#E3845A]/20 overflow-hidden">
            <div className="w-full h-full bg-[#120704] rounded-[10px] flex items-center justify-center overflow-hidden">
              <img
                src="/assets/nexcan-logo.jpeg"
                alt="Nexcan AI"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wider text-white">NEXCAN</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E3845A]/10 text-[#E3845A] border border-[#E3845A]/30 font-mono font-semibold">
                AI VISION
              </span>
            </div>
            <p className="text-[10px] text-[#D1B8AE] tracking-tight font-mono">AUTONOMOUS QA PLATFORM</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-[#1B0C07] border border-[#3D180C] rounded-xl backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('inspect')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'inspect'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            🔍 Live Inspection
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            📊 Yield Analytics
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            📋 Audit Trail
          </button>
        </nav>

        {/* System Health Indicators */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#1B0C07] border border-[#3D180C] text-[#D1B8AE]">
            <Cpu className="w-3.5 h-3.5 text-[#E3845A]" />
            <span className="font-mono text-[11px]">Gemini 3.8 Vision</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#E3845A]/10 border border-[#E3845A]/30 text-[#E3845A]">
            <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping"></span>
            <span className="font-medium font-mono text-[11px]">LIVE</span>
          </div>

          <div className="hidden sm:block text-[11px] text-[#D1B8AE] font-mono bg-[#1B0C07] px-2 py-1 rounded border border-[#3D180C]">
            Team Nexus Four
          </div>
        </div>

      </div>
    </header>
  );
}
