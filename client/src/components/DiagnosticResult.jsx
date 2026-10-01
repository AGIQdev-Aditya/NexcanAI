import React from 'react';
import { CheckCircle2, AlertTriangle, XOctagon, FileCheck, Layers, Gauge, Wrench, ShieldAlert } from 'lucide-react';

export default function DiagnosticResult({ result, onOpenCertModal }) {
  if (!result) return null;

  const {
    verdict = 'PASS',
    component_name = 'Industrial Assembly',
    category = 'General',
    confidence = 98.5,
    defect_detected = false,
    defect_type = 'None',
    severity = 'NONE',
    dimensions_mm = '0.00 mm',
    root_cause = '',
    rework_instructions = '',
    iso_standard = 'ISO-9001:2015 Clause 8.5.1',
    batch_id = 'BATCH-ACTIVE',
  } = result;

  // Verdict configuration styled with warm industrial tones
  const verdictConfig = {
    PASS: {
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      icon: <CheckCircle2 className="w-7 h-7 text-emerald-400" />,
      title: 'OPERATIONAL VERDICT: PASS',
      subtitle: 'Component satisfies all dimensional and cosmetic tolerances.',
      gradient: 'from-emerald-500/10 via-transparent to-transparent',
    },
    REWORK: {
      badge: 'bg-[#E3845A]/20 text-[#E3845A] border-[#E3845A]/40',
      icon: <AlertTriangle className="w-7 h-7 text-[#E3845A]" />,
      title: 'OPERATIONAL VERDICT: REWORK REQUIRED',
      subtitle: 'Component has remediable defects within authorized rework limits.',
      gradient: 'from-[#E3845A]/15 via-transparent to-transparent',
    },
    SCRAP: {
      badge: 'bg-red-500/20 text-red-400 border-red-500/40',
      icon: <XOctagon className="w-7 h-7 text-red-400" />,
      title: 'OPERATIONAL VERDICT: SCRAP / REJECT',
      subtitle: 'Critical flaw violates safety/structural thresholds. Discard unit.',
      gradient: 'from-red-500/15 via-transparent to-transparent',
    },
  }[verdict] || {
    badge: 'bg-[#3D180C] text-[#D1B8AE] border-[#3D180C]',
    icon: <CheckCircle2 className="w-7 h-7 text-[#E3845A]" />,
    title: `VERDICT: ${verdict}`,
    subtitle: 'Inspection completed.',
    gradient: 'from-[#E3845A]/10 via-transparent to-transparent',
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/40 font-bold';
      case 'HIGH':
        return 'bg-[#E3845A]/20 text-[#E3845A] border-[#E3845A]/40 font-semibold';
      case 'MEDIUM':
        return 'bg-[#A74A21]/20 text-[#E3845A] border-[#A74A21]/40';
      case 'LOW':
        return 'bg-[#3D180C] text-[#D1B8AE] border-[#3D180C]';
      default:
        return 'bg-[#120704] text-[#D1B8AE] border-[#3D180C]';
    }
  };

  return (
    <div className={`rounded-2xl border border-[#3D180C] bg-[#1B0C07] p-6 shadow-2xl relative overflow-hidden bg-gradient-to-b ${verdictConfig.gradient}`}>
      
      {/* Top Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#3D180C]">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-[#120704] border border-[#3D180C] shadow-inner">
            {verdictConfig.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-extrabold border ${verdictConfig.badge}`}>
                {verdict}
              </span>
              <span className="text-xs text-[#D1B8AE] font-mono">{batch_id}</span>
            </div>
            <h3 className="text-lg font-bold text-[#FFFFFF] mt-0.5">{verdictConfig.title}</h3>
            <p className="text-xs text-[#D1B8AE]">{verdictConfig.subtitle}</p>
          </div>
        </div>

        {/* Certificate Button */}
        <button
          onClick={onOpenCertModal}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#E3845A]/20 transition-all cursor-pointer"
        >
          <FileCheck className="w-4 h-4 text-white" />
          <span>ISO-9001 Certificate</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-[#3D180C]">
        <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C]">
          <div className="flex items-center space-x-1.5 text-[#D1B8AE] text-xs mb-1">
            <Gauge className="w-3.5 h-3.5 text-[#E3845A]" />
            <span>AI Confidence</span>
          </div>
          <div className="text-lg font-extrabold text-[#FFFFFF] font-mono">{confidence}%</div>
          <div className="w-full bg-[#1B0C07] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#E3845A] h-full rounded-full" style={{ width: `${Math.min(confidence, 100)}%` }} />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C]">
          <div className="flex items-center space-x-1.5 text-[#D1B8AE] text-xs mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#E3845A]" />
            <span>Defect Severity</span>
          </div>
          <div className="mt-1">
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${getSeverityBadge(severity)}`}>
              {severity}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C]">
          <div className="flex items-center space-x-1.5 text-[#D1B8AE] text-xs mb-1">
            <Layers className="w-3.5 h-3.5 text-[#E3845A]" />
            <span>Tolerance Deviation</span>
          </div>
          <div className="text-sm font-bold text-[#FFFFFF] font-mono mt-1">{dimensions_mm}</div>
        </div>

        <div className="p-3 rounded-xl bg-[#120704] border border-[#3D180C]">
          <div className="text-[#D1B8AE] text-xs mb-1">Component Category</div>
          <div className="text-sm font-semibold text-[#FFFFFF] truncate">{category}</div>
          <div className="text-[10px] text-[#D1B8AE]/60 truncate">{component_name}</div>
        </div>
      </div>

      {/* Root Cause & Corrective Action */}
      <div className="pt-5 space-y-4">
        {defect_detected && (
          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40">
            <div className="flex items-center space-x-2 text-red-400 text-xs font-bold mb-1 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DETECTED DEFECT: {defect_type}</span>
            </div>
            <p className="text-xs text-[#D1B8AE] leading-relaxed font-sans">{root_cause}</p>
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-[#120704] border border-[#3D180C]">
          <div className="flex items-center space-x-2 text-[#E3845A] text-xs font-bold mb-1 font-mono">
            <Wrench className="w-4 h-4 shrink-0" />
            <span>CORRECTIVE ENGINEERING PROTOCOL</span>
          </div>
          <p className="text-xs text-[#D1B8AE] leading-relaxed font-sans">{rework_instructions}</p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#D1B8AE]/60 font-mono pt-1">
          <span>Standard: {iso_standard}</span>
          <span>Station: NEXCAN-CV-UNIT-01</span>
        </div>
      </div>

    </div>
  );
}
