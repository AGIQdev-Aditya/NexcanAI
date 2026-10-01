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

  const displayName = currentUser?.full_name || currentUser?.name || (currentUser?.email ? currentUser.email.split('@')[0] : 'Operator');

  return (
    <header className="sticky top-0 z-50 border-b border-[#3D180C] bg-[#120704]/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div
          className="flex items-center space-x-2.5 cursor-pointer select-none shrink-0"
          onClick={() => handleNavClick('landing')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E3845A] to-[#A74A21] p-[1.5px] shadow-md shadow-[#E3845A]/25 overflow-hidden">
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
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-white">NEXCAN</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E3845A]/15 text-[#E3845A] border border-[#E3845A]/30 font-mono font-semibold">
                AI
              </span>
            </div>
            <p className="text-[9px] text-[#D1B8AE] tracking-tight font-mono hidden sm:block">AUTONOMOUS QA</p>
          </div>
        </div>

        {/* Navigation Tabs — Logical Order: Overview FIRST, then Inspector, Analytics, Audit Trail */}
        <nav className="flex items-center space-x-1 p-1 bg-[#1B0C07] border border-[#3D180C] rounded-xl overflow-x-auto shrink-0">
          
          {/* 1. Overview / Landing Page (FIRST) */}
          <button
            onClick={() => handleNavClick('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'landing'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Overview</span>
          </button>

          {/* 2. Live Inspector */}
          <button
            onClick={() => handleNavClick('app', 'inspect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'app' && activeTab === 'inspect'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <ScanLine className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Live Inspector</span>
          </button>

          {/* 3. Yield Analytics */}
          <button
            onClick={() => handleNavClick('app', 'analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'app' && activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Yield Analytics</span>
          </button>

          {/* 4. Audit Trail */}
          <button
            onClick={() => handleNavClick('app', 'audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'app' && activeTab === 'audit'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-md font-semibold'
                : 'text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Audit Trail</span>
          </button>

        </nav>

        {/* Right Section: System Indicator & User Auth */}
        <div className="flex items-center space-x-2.5 text-xs shrink-0">
          
          {/* Active Live Indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#1B0C07] border border-[#3D180C] text-[#D1B8AE]">
            <Cpu className="w-3 h-3 text-[#E3845A]" />
            <span className="font-mono text-[10px]">Gemini 3.8</span>
          </div>

          {/* User Profile or Sign In / Demo */}
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-[#1B0C07] border border-[#3D180C] py-1 px-2.5 rounded-xl shadow-sm">
              <div className="w-6 h-6 rounded-lg bg-[#E3845A]/20 border border-[#E3845A]/40 flex items-center justify-center text-[#E3845A] font-bold text-xs font-mono">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[11px] font-bold text-white leading-tight max-w-[110px] truncate">
                  {displayName}
                </div>
                <div className="text-[9px] text-[#E3845A] font-mono leading-none">
                  {currentUser.role || 'Lead QA'}
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="ml-1 p-1 text-[#D1B8AE] hover:text-[#F43F5E] hover:bg-[#3D180C]/60 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={onQuickDemo}
                className="px-2.5 py-1.5 rounded-lg bg-[#1B0C07] hover:bg-[#2A130B] border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3 text-[#E3845A]" />
                <span>Demo</span>
              </button>
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-white font-semibold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
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
