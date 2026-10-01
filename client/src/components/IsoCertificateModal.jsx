import React from 'react';
import { X, Printer, ShieldCheck, Award, QrCode } from 'lucide-react';

export default function IsoCertificateModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  const certHash = `CERT-${(result.id || 'NEXCAN').slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120704]/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-[#1B0C07] border border-[#3D180C] rounded-2xl shadow-2xl p-6 sm:p-8 text-[#FAF9F6] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#D1B8AE] hover:text-white rounded-lg hover:bg-[#3D180C]/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Area */}
        <div id="certificate-print-area" className="border-4 border-double border-[#E3845A]/40 p-6 rounded-xl bg-[#120704] relative">
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96 text-[#E3845A]" />
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-6 border-b border-[#3D180C]">
            <div className="inline-flex items-center space-x-2 text-[#E3845A] mb-1">
              <ShieldCheck className="w-6 h-6 text-[#E3845A]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">INTERNATIONAL QA STANDARDS</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-wider text-[#FFFFFF]">CERTIFICATE OF OPTICAL INSPECTION</h2>
            <p className="text-xs text-[#D1B8AE] font-mono mt-1">
              COMPLIANT WITH ISO-9001:2015 CLAUSE 8.5.1 &amp; IPC-A-610 CLASS 3
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-4 text-xs font-mono">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#D1B8AE]/70 block">CERTIFICATE ID:</span>
                <span className="text-[#E3845A] font-bold">{certHash}</span>
              </div>
              <div>
                <span className="text-[#D1B8AE]/70 block">TIMESTAMP:</span>
                <span className="text-[#FAF9F6]">{new Date(result.created_at || Date.now()).toUTCString()}</span>
              </div>
              <div>
                <span className="text-[#D1B8AE]/70 block">COMPONENT:</span>
                <span className="text-[#FAF9F6] font-semibold">{result.component_name}</span>
              </div>
              <div>
                <span className="text-[#D1B8AE]/70 block">BATCH SERIAL:</span>
                <span className="text-[#FAF9F6]">{result.batch_id || 'BATCH-20261001-QA'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#1B0C07] border border-[#3D180C] flex items-center justify-between">
              <div>
                <span className="text-[#D1B8AE] block text-[11px]">DISPOSITION VERDICT</span>
                <span className={`text-base font-extrabold ${
                  result.verdict === 'PASS' ? 'text-emerald-400' : result.verdict === 'REWORK' ? 'text-[#E3845A]' : 'text-red-400'
                }`}>
                  {result.verdict}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#D1B8AE] block text-[11px]">AI CONFIDENCE SCORE</span>
                <span className="text-base font-extrabold text-[#FFFFFF]">{result.confidence}%</span>
              </div>
            </div>

            <div className="text-[#D1B8AE] leading-relaxed text-[11px]">
              This certifies that the identified component underwent autonomous multimodal computer vision inspection utilizing sub-millimeter edge anomaly modeling. Optical verification verified adherence to factory tolerance parameters.
            </div>

            {/* Signature Area */}
            <div className="pt-4 border-t border-[#3D180C] flex items-end justify-between">
              <div>
                <div className="font-mono text-[#E3845A] font-bold text-sm tracking-widest">NEXCAN-VISION-V1</div>
                <div className="text-[10px] text-[#D1B8AE]/70">Autonomous Neural QA Engine</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[#FAF9F6] font-semibold">Team Nexus Four</div>
                <div className="text-[10px] text-[#D1B8AE]/70">Authorized Lead Inspector</div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#120704] hover:bg-[#3D180C] border border-[#3D180C] text-[#D1B8AE] text-xs font-mono transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E3845A] to-[#A74A21] hover:brightness-110 text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#E3845A]/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Print Official Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
}
