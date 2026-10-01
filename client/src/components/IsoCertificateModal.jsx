import React from 'react';
import { X, Printer, ShieldCheck, Award, QrCode } from 'lucide-react';

export default function IsoCertificateModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  const certHash = `CERT-${(result.id || 'NEXCAN').slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1815]/60 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-[#EFE9E3] border border-[#D9CFC7] rounded-2xl shadow-2xl p-6 sm:p-8 text-[#1C1815] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6B5E55] hover:text-[#1C1815] rounded-lg hover:bg-[#D9CFC7]/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Area */}
        <div id="certificate-print-area" className="border-4 border-double border-[#C9B59C] p-6 rounded-xl bg-[#F9F8F6] relative shadow-sm">
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96 text-[#C9B59C]" />
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-6 border-b border-[#D9CFC7]">
            <div className="inline-flex items-center space-x-2 text-[#C9B59C] mb-1">
              <ShieldCheck className="w-6 h-6 text-[#C9B59C]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#1C1815]">INTERNATIONAL QA STANDARDS</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-wider text-[#1C1815]">CERTIFICATE OF OPTICAL INSPECTION</h2>
            <p className="text-xs text-[#6B5E55] font-mono mt-1">
              COMPLIANT WITH ISO-9001:2015 CLAUSE 8.5.1 &amp; IPC-A-610 CLASS 3
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-4 text-xs font-mono">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#6B5E55] block">CERTIFICATE ID:</span>
                <span className="text-[#1C1815] font-bold">{certHash}</span>
              </div>
              <div>
                <span className="text-[#6B5E55] block">TIMESTAMP:</span>
                <span className="text-[#1C1815]">{new Date(result.created_at || Date.now()).toUTCString()}</span>
              </div>
              <div>
                <span className="text-[#6B5E55] block">COMPONENT:</span>
                <span className="text-[#1C1815] font-semibold">{result.component_name}</span>
              </div>
              <div>
                <span className="text-[#6B5E55] block">BATCH SERIAL:</span>
                <span className="text-[#1C1815]">{result.batch_id || 'BATCH-20261001-QA'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#EFE9E3] border border-[#D9CFC7] flex items-center justify-between">
              <div>
                <span className="text-[#6B5E55] block text-[11px]">DISPOSITION VERDICT</span>
                <span className={`text-base font-extrabold ${
                  result.verdict === 'PASS' ? 'text-[#16A34A]' : result.verdict === 'REWORK' ? 'text-[#D97706]' : 'text-[#DC2626]'
                }`}>
                  {result.verdict}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#6B5E55] block text-[11px]">AI CONFIDENCE SCORE</span>
                <span className="text-base font-extrabold text-[#1C1815]">{result.confidence}%</span>
              </div>
            </div>

            <div className="text-[#6B5E55] leading-relaxed text-[11px]">
              This certifies that the identified component underwent autonomous multimodal computer vision inspection utilizing sub-millimeter edge anomaly modeling. Optical verification verified adherence to factory tolerance parameters.
            </div>

            {/* Signature Area */}
            <div className="pt-4 border-t border-[#D9CFC7] flex items-end justify-between">
              <div>
                <div className="font-mono text-[#C9B59C] font-bold text-sm tracking-widest">NEXCAN-VISION-V1</div>
                <div className="text-[10px] text-[#8C7D73]">Autonomous Neural QA Engine</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[#1C1815] font-semibold">Team Nexus Four</div>
                <div className="text-[10px] text-[#8C7D73]">Rhugved Kulkarni (Lead) &amp; Aditya Sharma (Member)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#F9F8F6] hover:bg-[#D9CFC7] border border-[#D9CFC7] text-[#1C1815] text-xs font-mono transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#1C1815]" />
            <span>Print Official Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
}
