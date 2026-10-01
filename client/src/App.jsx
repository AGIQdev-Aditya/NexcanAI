import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Inspector from './components/Inspector.jsx';
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';
import AuditLog from './components/AuditLog.jsx';
import IsoCertificateModal from './components/IsoCertificateModal.jsx';
import { getHealthStatus } from './services/api.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('inspect'); // 'inspect' | 'analytics' | 'audit'
  const [systemStatus, setSystemStatus] = useState({ online: false, gemini: false, supabase: false });
  const [currentResult, setCurrentResult] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

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
    setActiveTab('inspect');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'inspect' && (
          <Inspector
            onInspectionComplete={handleInspectionComplete}
            onOpenCertModal={() => setIsCertModalOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'audit' && (
          <AuditLog onSelectInspection={handleSelectFromAudit} />
        )}
      </main>

      {/* ISO-9001 Certificate Modal */}
      <IsoCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        result={currentResult}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 font-bold">NAXCAN AI</span>
            <span>— Autonomous Computer Vision & Visual Quality Inspection</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Team Nexus Four</span>
            <span>•</span>
            <span>Aditya • Vivek • Abhay • Rhugved</span>
            <span>•</span>
            <a
              href="https://github.com/AGIQdev-Aditya/NaxcanAI"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
