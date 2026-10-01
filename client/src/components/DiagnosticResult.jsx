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

  // Verdict configuration styled with luxury architectural tones
  const verdictConfig = {
    PASS: {
      badge: 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30',
      icon: <CheckCircle2 className="w-7 h-7 text-[#16A34A]" />,
      title: 'OPERATIONAL VERDICT: PASS',
      subtitle: 'Component satisfies all dimensional and cosmetic tolerances.',
      gradient: 'from-[#16A34A]/5 via-transparent to-transparent',
    },
    REWORK: {
      badge: 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30',
      icon: <AlertTriangle className="w-7 h-7 text-[#D97706]" />,
      title: 'OPERATIONAL VERDICT: REWORK REQUIRED',
      subtitle: 'Component has remediable defects within authorized rework limits.',
      gradient: 'from-[#D97706]/5 via-transparent to-transparent',
    },
    SCRAP: {
      badge: 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30',
      icon: <XOctagon className="w-7 h-7 text-[#DC2626]" />,
      title: 'OPERATIONAL VERDICT: SCRAP / REJECT',
      subtitle: 'Critical flaw violates safety/structural thresholds. Discard unit.',
      gradient: 'from-[#DC2626]/5 via-transparent to-transparent',
    },
  }[verdict] || {
    badge: 'bg-[#EFE9E3] text-[#6B5E55] border-[#D9CFC7]',
    icon: <CheckCircle2 className="w-7 h-7 text-[#C9B59C]" />,
    title: `VERDICT: ${verdict}`,
    subtitle: 'Inspection completed.',
    gradient: 'from-[#C9B59C]/5 via-transparent to-transparent',
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30 font-bold';
      case 'HIGH':
        return 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30 font-semibold';
      case 'MEDIUM':
        return 'bg-[#C9B59C]/20 text-[#1C1815] border-[#C9B59C]/40';
      case 'LOW':
        return 'bg-[#EFE9E3] text-[#6B5E55] border-[#D9CFC7]';
      default:
        return 'bg-[#F9F8F6] text-[#6B5E55] border-[#D9CFC7]';
    }
  };

  return (
    <div className={`rounded-2xl border border-[#D9CFC7] bg-[#EFE9E3] p-6 shadow-sm relative overflow-hidden bg-gradient-to-b ${verdictConfig.gradient}`}>
      
      {/* Top Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#D9CFC7]">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7] shadow-inner">
            {verdictConfig.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-extrabold border ${verdictConfig.badge}`}>
                {verdict}
              </span>
              <span className="text-xs text-[#6B5E55] font-mono">{batch_id}</span>
            </div>
            <h3 className="text-lg font-bold text-[#1C1815] mt-0.5">{verdictConfig.title}</h3>
            <p className="text-xs text-[#6B5E55]">{verdictConfig.subtitle}</p>
          </div>
        </div>

        {/* Certificate Button */}
        <button
          onClick={onOpenCertModal}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <FileCheck className="w-4 h-4 text-[#1C1815]" />
          <span>ISO-9001 Certificate</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-[#D9CFC7]">
        <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7]">
          <div className="flex items-center space-x-1.5 text-[#6B5E55] text-xs mb-1">
            <Gauge className="w-3.5 h-3.5 text-[#C9B59C]" />
            <span>AI Confidence</span>
          </div>
          <div className="text-lg font-extrabold text-[#1C1815] font-mono">{confidence}%</div>
          <div className="w-full bg-[#EFE9E3] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#C9B59C] h-full rounded-full" style={{ width: `${Math.min(confidence, 100)}%` }} />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7]">
          <div className="flex items-center space-x-1.5 text-[#6B5E55] text-xs mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#C9B59C]" />
            <span>Defect Severity</span>
          </div>
          <div className="mt-1">
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${getSeverityBadge(severity)}`}>
              {severity}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7]">
          <div className="flex items-center space-x-1.5 text-[#6B5E55] text-xs mb-1">
            <Layers className="w-3.5 h-3.5 text-[#C9B59C]" />
            <span>Tolerance Deviation</span>
          </div>
          <div className="text-sm font-bold text-[#1C1815] font-mono mt-1">{dimensions_mm}</div>
        </div>

        <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7]">
          <div className="text-[#6B5E55] text-xs mb-1">Component Category</div>
          <div className="text-sm font-semibold text-[#1C1815] truncate">{category}</div>
          <div className="text-[10px] text-[#8C7D73] truncate">{component_name}</div>
        </div>
      </div>

      {/* Root Cause & Corrective Action */}
      <div className="pt-5 space-y-4">
        {defect_detected && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center space-x-2 text-[#DC2626] text-xs font-bold mb-1 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DETECTED DEFECT: {defect_type}</span>
            </div>
            <p className="text-xs text-[#6B5E55] leading-relaxed font-sans">{root_cause}</p>
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7]">
          <div className="flex items-center space-x-2 text-[#1C1815] text-xs font-bold mb-1 font-mono">
            <Wrench className="w-4 h-4 shrink-0 text-[#C9B59C]" />
            <span>CORRECTIVE ENGINEERING PROTOCOL</span>
          </div>
          <p className="text-xs text-[#6B5E55] leading-relaxed font-sans">{rework_instructions}</p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#8C7D73] font-mono pt-1">
          <span>Standard: {iso_standard}</span>
          <span>Station: NEXCAN-CV-UNIT-01</span>
        </div>
      </div>

    </div>
  );
}
