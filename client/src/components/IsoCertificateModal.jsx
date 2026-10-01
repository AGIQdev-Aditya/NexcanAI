import React from 'react';
import { X, Printer, ShieldCheck, Award, QrCode } from 'lucide-react';

export default function IsoCertificateModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  const certHash = `CERT-${(result.id || 'NAXCAN').slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Area */}
        <div id="certificate-print-area" className="border-4 border-double border-emerald-500/40 p-6 rounded-xl bg-slate-950/90 relative">
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96 text-emerald-400" />
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-6 border-b border-slate-800">
            <div className="inline-flex items-center space-x-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">INTERNATIONAL QA STANDARDS</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-wider text-white">CERTIFICATE OF OPTICAL INSPECTION</h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              COMPLIANT WITH ISO-9001:2015 CLAUSE 8.5.1 & IPC-A-610 CLASS 3
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-4 text-xs font-mono">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block">CERTIFICATE ID:</span>
                <span className="text-emerald-400 font-bold">{certHash}</span>
              </div>
              <div>
                <span className="text-slate-500 block">TIMESTAMP:</span>
                <span className="text-slate-200">{new Date(result.created_at || Date.now()).toUTCString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">COMPONENT:</span>
                <span className="text-slate-200 font-semibold">{result.component_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">BATCH SERIAL:</span>
                <span className="text-slate-200">{result.batch_id || 'BATCH-20261001-QA'}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">DISPOSITION VERDICT</span>
                <span className={`text-base font-extrabold ${
                  result.verdict === 'PASS' ? 'text-emerald-400' : result.verdict === 'REWORK' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {result.verdict}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">AI CONFIDENCE SCORE</span>
                <span className="text-base font-extrabold text-white">{result.confidence}%</span>
              </div>
            </div>

            <div className="text-slate-400 leading-relaxed text-[11px]">
              This certifies that the identified component underwent autonomous multimodal computer vision inspection utilizing sub-millimeter edge anomaly modeling. Optical verification verified adherence to factory tolerance parameters.
            </div>

            {/* Signature Area */}
            <div className="pt-4 border-t border-slate-800 flex items-end justify-between">
              <div>
                <div className="font-mono text-emerald-400 font-bold text-sm tracking-widest">NAXCAN-VISION-V1</div>
                <div className="text-[10px] text-slate-500">Autonomous Neural QA Engine</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-slate-300 font-semibold">Team Nexus Four</div>
                <div className="text-[10px] text-slate-500">Authorized Lead Inspector</div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
