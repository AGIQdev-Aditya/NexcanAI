import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Inspector from './components/Inspector.jsx';
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';
import AuditLog from './components/AuditLog.jsx';
import LoginPage from './components/LoginPage.jsx';
import IsoCertificateModal from './components/IsoCertificateModal.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { getHealthStatus } from './services/api.js';

export default function App() {
  // Starts on the Overview landing page as requested
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'app'
  const [activeTab, setActiveTab] = useState('inspect'); // 'inspect' | 'analytics' | 'audit'
  const [systemStatus, setSystemStatus] = useState({ online: false, gemini: false, supabase: false });
  const [currentResult, setCurrentResult] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Restore authenticated user from localStorage if present
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexcan_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Poll system health once on boot
  useEffect(() => {
    getHealthStatus()
      .then((data) => {
        setSystemStatus({
          online: true,
          gemini: data.gemini_connected,
          supabase: data.supabase_connected,
        });
      })
      .catch((err) => {
        console.warn('Backend connection note:', err.message);
        setSystemStatus({ online: false, gemini: false, supabase: false });
      });
  }, []);

  const handleInspectionComplete = (result) => {
    setCurrentResult(result);
  };

  const handleSelectFromAudit = (item) => {
    setCurrentResult(item);
    setCurrentView('app');
    setActiveTab('inspect');
  };

  // 1-Click Demo Login for Hackathon Judges
  const handleQuickDemo = async () => {
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'lead' }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem('nexcan_token', data.token);
        localStorage.setItem('nexcan_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setCurrentView('app');
        setActiveTab('inspect');
      }
    } catch (err) {
      console.warn('Demo login note:', err.message);
      const fallbackUser = {
        id: 'demo-rhugved-lead',
        email: 'rhugved.kulkarni@nexcan.ai',
        full_name: 'Rhugved Kulkarni',
        role: 'Team Lead & AI Quality Architect',
      };
      localStorage.setItem('nexcan_user', JSON.stringify(fallbackUser));
      setCurrentUser(fallbackUser);
      setCurrentView('app');
      setActiveTab('inspect');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexcan_user');
    localStorage.removeItem('nexcan_token');
    setCurrentUser(null);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    setCurrentView('app');
    setActiveTab('inspect');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1815] flex flex-col font-sans selection:bg-[#C9B59C] selection:text-[#1C1815]">
      {/* High-Precision Interactive Optical Reticle Cursor */}
      <CustomCursor />
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onQuickDemo={handleQuickDemo}
      />

      {/* Primary View Routing: Overview (Landing) vs App Console */}
      {currentView === 'landing' ? (
        <Hero
          onLaunchApp={() => {
            setCurrentView('app');
            setActiveTab('inspect');
          }}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onQuickDemo={handleQuickDemo}
        />
      ) : (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full animate-fade-in">
          {/* Subheader breadcrumbs inside app view */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CFC7]">
            <div className="flex items-center space-x-3">
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#EFE9E3] text-[#1C1815] border border-[#D9CFC7] font-mono font-bold shadow-sm">
                {activeTab === 'inspect' && '🔍 OPTICAL INSPECTION CONSOLE'}
                {activeTab === 'analytics' && '📊 REAL-TIME YIELD ANALYTICS'}
                {activeTab === 'audit' && '📋 COMPLIANCE AUDIT TRAIL'}
              </span>
              {currentUser && (
                <span className="text-xs text-[#6B5E55] font-mono hidden sm:inline">
                  Active Operator: <strong className="text-[#1C1815]">{currentUser.full_name || currentUser.name || currentUser.email}</strong>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono text-[#6B5E55]">
              <span>Vision: <strong className="text-[#16A34A]">Gemini 3.8 Flash</strong></span>
              <span>•</span>
              <span>Cloud: <strong className="text-[#C9B59C]">Supabase</strong></span>
            </div>
          </div>

          {activeTab === 'inspect' && (
            <Inspector
              currentUser={currentUser}
              onInspectionComplete={handleInspectionComplete}
              onOpenCertModal={() => setIsCertModalOpen(true)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard />
          )}

          {activeTab === 'audit' && (
            <AuditLog
              currentUser={currentUser}
              onSelectInspection={handleSelectFromAudit}
            />
          )}
        </main>
      )}

      {/* Login / Register Modal */}
      {isLoginModalOpen && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      {/* ISO-9001 Certificate Modal */}
      <IsoCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        result={currentResult}
      />

      {/* Global Footer */}
      <footer className="border-t border-[#D9CFC7] bg-[#EFE9E3] py-5 text-xs text-[#6B5E55] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#C9B59C]"></span>
            <span className="text-[#1C1815] font-bold">NEXCAN AI</span>
            <span>— Autonomous Computer Vision Quality Inspection</span>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span>Team Nexus Four</span>
            <span>•</span>
            <a
              href="https://github.com/AGIQdev-Aditya/NexcanAI"
              target="_blank"
              rel="noreferrer"
              className="text-[#1C1815] hover:text-[#C9B59C] font-semibold hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
