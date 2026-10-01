import React from 'react';
import { Eye, ShieldCheck, Database, Cpu, Activity, User, LogOut, Sparkles, Home, ScanLine, BarChart3, History } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  activeTab,
  setActiveTab,
  systemStatus,
  currentUser,
  onOpenLogin,
  onLogout,
  onQuickDemo,
}) {
  const handleNavClick = (view, tab) => {
    setCurrentView(view);
    if (tab) setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#3D180C]/80 bg-[#120704]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={() => handleNavClick('landing')}
        >
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
            onClick={() => handleNavClick('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
              currentView === 'landing'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => handleNavClick('app', 'inspect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
              currentView === 'app' && activeTab === 'inspect'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <ScanLine className="w-3.5 h-3.5" />
            <span>Live Inspector</span>
          </button>

          <button
            onClick={() => handleNavClick('app', 'analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
              currentView === 'app' && activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Yield Analytics</span>
          </button>

          <button
            onClick={() => handleNavClick('app', 'audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
              currentView === 'app' && activeTab === 'audit'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md shadow-[#E3845A]/30 font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail</span>
          </button>
        </nav>

        {/* Right Section: System Status & User Auth */}
        <div className="flex items-center space-x-3 text-xs">
          
          {/* Live Engine Indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#1B0C07] border border-[#3D180C] text-[#D1B8AE]">
            <Cpu className="w-3.5 h-3.5 text-[#E3845A]" />
            <span className="font-mono text-[11px]">Gemini 3.8</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#E3845A]/10 border border-[#E3845A]/30 text-[#E3845A]">
            <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping"></span>
            <span className="font-medium font-mono text-[11px]">LIVE</span>
          </div>

          {/* User Profile or Login CTA */}
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-[#1B0C07] border border-[#3D180C] py-1 px-2.5 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-[#E3845A]/20 border border-[#E3845A]/40 flex items-center justify-center text-[#E3845A] font-bold text-xs font-mono">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[11px] font-bold text-white leading-tight">
                  {currentUser.name || currentUser.email.split('@')[0]}
                </div>
                <div className="text-[9px] text-[#E3845A] font-mono leading-none">
                  {currentUser.role || 'Inspector'}
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="ml-1 p-1 text-[#D1B8AE] hover:text-[#F43F5E] hover:bg-[#3D180C]/60 rounded-md transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={onQuickDemo}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#E3845A] animate-pulse" />
                <span>Demo</span>
              </button>
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-white font-medium text-xs shadow-md shadow-[#E3845A]/20 transition-all"
              >
                Sign In
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
