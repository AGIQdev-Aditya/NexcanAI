import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Layers,
  Cpu,
  ShieldCheck,
  FileJson,
  Download,
  Copy,
  Check,
  Sliders,
  FileCheck
} from 'lucide-react';
import DefectCanvas from './DefectCanvas.jsx';
import DiagnosticResult from './DiagnosticResult.jsx';
import { SAMPLE_PRESETS } from '../data/sampleInspections.js';
import { inspectImage } from '../services/api.js';

export default function Inspector({ onInspectionComplete, onOpenCertModal, currentUser, initialResult }) {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PRESETS[0].svgData);
  const [componentHint, setComponentHint] = useState(SAMPLE_PRESETS[0].hint);
  const [category, setCategory] = useState(SAMPLE_PRESETS[0].category);
  const [toleranceLimit, setToleranceLimit] = useState('0.05'); // 0.05mm, 0.10mm, 0.25mm
  const [isScanning, setIsScanning] = useState(false);
  const [inspectionResult, setInspectionResult] = useState(initialResult || null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('report'); // 'report' | 'json'
  const [copiedJson, setCopiedJson] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Sync inspection result when navigating from AuditLog
  useEffect(() => {
    if (initialResult) {
      setInspectionResult(initialResult);
      if (initialResult.image_url) {
        setSelectedImage(initialResult.image_url);
      }
      if (initialResult.component_name) {
        setComponentHint(initialResult.component_name);
      }
      if (initialResult.category) {
        setCategory(initialResult.category);
      }
    }
  }, [initialResult]);

  // Handle Preset Selection
  const handleSelectPreset = (preset) => {
    setSelectedImage(preset.svgData);
    setComponentHint(preset.hint);
    setCategory(preset.category);
    setInspectionResult(null);
    setErrorMsg(null);
    if (isWebcamActive) stopWebcam();
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      setComponentHint(`Uploaded: ${file.name}`);
      setCategory('General');
      setInspectionResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  // Webcam Controls
  const startWebcam = async () => {
    try {
      setIsWebcamActive(true);
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Webcam error:', err);
      setErrorMsg('Camera access denied or unavailable.');
      setIsWebcamActive(false);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsWebcamActive(false);
  };

  const captureWebcamSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/jpeg');
    setSelectedImage(dataUri);
    setComponentHint('Live Assembly Line Optical Capture');
    setCategory('General');
    stopWebcam();
  };

  // Run AI Inspection
  const handleRunInspection = async () => {
    if (!selectedImage) {
      setErrorMsg('Please select or upload an inspection image first.');
      return;
    }

    setIsScanning(true);
    setErrorMsg(null);

    try {
      const response = await inspectImage({
        imageBase64: selectedImage,
        componentHint: `${componentHint} [Tolerance: ${toleranceLimit}mm]`,
        category: category,
        userEmail: currentUser?.email || 'lead.inspector@nexcan.ai',
        userId: currentUser?.id || 'lead-inspector',
      });

      if (response?.data) {
        setInspectionResult(response.data);
        if (onInspectionComplete) onInspectionComplete(response.data);
      } else {
        throw new Error('No inspection data received');
      }
    } catch (err) {
      console.error('Inspection error:', err);
      setErrorMsg(err.message || 'Vision inspection failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  // Copy Raw JSON to Clipboard
  const handleCopyJson = () => {
    if (!inspectionResult) return;
    navigator.clipboard.writeText(JSON.stringify(inspectionResult, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Export Audit CSV
  const handleExportCsv = () => {
    if (!inspectionResult) return;
    const headers = ['id', 'batch_id', 'component_name', 'verdict', 'confidence', 'defect_type', 'dimensions_mm', 'iso_standard'];
    const row = [
      inspectionResult.id || 'NEXCAN-1',
      inspectionResult.batch_id || 'BATCH-001',
      `"${inspectionResult.component_name || ''}"`,
      inspectionResult.verdict,
      inspectionResult.confidence,
      `"${inspectionResult.defect_type || ''}"`,
      `"${inspectionResult.dimensions_mm || ''}"`,
      `"${inspectionResult.iso_standard || ''}"`,
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' + row.join(',');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inspection_${inspectionResult.id || Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Test Presets Selector */}
      <div className="p-5 rounded-2xl bg-[#1B0C07] border border-[#3D180C] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#3D180C] gap-2">
          <div>
            <h3 className="text-xs font-bold font-mono tracking-wider text-[#E3845A] uppercase flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INDUSTRIAL QUALITY BENCHMARK PRESETS</span>
            </h3>
            <p className="text-[11px] text-[#D1B8AE] mt-0.5">
              Select verified test components to evaluate autonomous defect recognition across high-throughput assemblies.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#D1B8AE]/70 bg-[#120704] px-2.5 py-1 rounded-lg border border-[#3D180C]">
            Model: Gemini 3.8 Flash Vision
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = componentHint === preset.hint;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#E3845A] bg-[#2A130B] shadow-lg shadow-[#E3845A]/15 ring-1 ring-[#E3845A]/50'
                    : 'border-[#3D180C] bg-[#120704] hover:border-[#E3845A]/40 hover:bg-[#1B0C07]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    preset.expectedVerdict === 'PASS' 
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : preset.expectedVerdict === 'REWORK'
                      ? 'bg-[#E3845A]/20 text-[#E3845A] border-[#E3845A]/40'
                      : 'bg-red-500/15 text-red-400 border-red-500/30'
                  }`}>
                    {preset.expectedVerdict}
                  </span>
                  <span className="text-[10px] text-[#D1B8AE]/70 font-mono">{preset.category}</span>
                </div>
                <div className="text-xs font-bold text-[#FFFFFF] truncate">{preset.title}</div>
                <div className="text-[10px] text-[#D1B8AE] line-clamp-2 mt-0.5">{preset.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Image Feed & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="rounded-2xl border border-[#3D180C] bg-[#1B0C07] p-4 shadow-xl">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="font-mono text-[#D1B8AE] font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-pulse"></span>
                <span className="text-[#FFFFFF]">OPTICAL FEED SURFACE</span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] hover:border-[#E3845A]/40 text-[#D1B8AE] hover:text-[#FFFFFF] text-xs font-mono transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#E3845A]" />
                  <span>Upload Image</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Webcam Button */}
                {isWebcamActive ? (
                  <button
                    onClick={captureWebcamSnapshot}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-[#FFFFFF] text-xs font-bold shadow-md shadow-[#E3845A]/30 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Snap Feed</span>
                  </button>
                ) : (
                  <button
                    onClick={startWebcam}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#120704] hover:bg-[#2A130B] border border-[#3D180C] hover:border-[#E3845A]/40 text-[#D1B8AE] hover:text-[#FFFFFF] text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#E3845A]" />
                    <span>Live Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Webcam Live Stream View */}
            {isWebcamActive ? (
              <div className="relative rounded-xl overflow-hidden bg-[#120704] aspect-video flex items-center justify-center border border-[#E3845A]/50">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#120704]/90 text-[#E3845A] text-[10px] font-mono border border-[#E3845A]/30">
                  LIVE SENSOR FEED
                </div>
              </div>
            ) : (
              /* Canvas with Defect Overlays */
              <DefectCanvas
                imageSrc={selectedImage}
                boundingBoxes={inspectionResult?.bounding_boxes || []}
                verdict={inspectionResult?.verdict || 'PASS'}
                isScanning={isScanning}
              />
            )}

            {/* Component Metadata & Tolerance Controls */}
            <div className="mt-4 pt-4 border-t border-[#3D180C] space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-8">
                  <label className="text-[10px] font-mono text-[#D1B8AE] block mb-1">
                    COMPONENT DESCRIPTION / SPECIFICATION HINT
                  </label>
                  <input
                    type="text"
                    value={componentHint}
                    onChange={(e) => setComponentHint(e.target.value)}
                    placeholder="e.g. Solder leads, Turbine blade, Hermetic seal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120704] border border-[#3D180C] text-xs text-[#FFFFFF] placeholder-[#D1B8AE]/40 focus:outline-none focus:border-[#E3845A] font-mono"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-[10px] font-mono text-[#D1B8AE] block mb-1">
                    TOLERANCE THRESHOLD
                  </label>
                  <select
                    value={toleranceLimit}
                    onChange={(e) => setToleranceLimit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#120704] border border-[#3D180C] text-xs text-[#FFFFFF] focus:outline-none focus:border-[#E3845A] font-mono cursor-pointer"
                  >
                    <option value="0.05">±0.05 mm (Strict Class 3)</option>
                    <option value="0.10">±0.10 mm (Balanced SMT)</option>
                    <option value="0.25">±0.25 mm (Permissive Cast)</option>
                  </select>
                </div>
              </div>

              {/* Run Inspection Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-[#D1B8AE]/70 hidden sm:block">
                  Standards: IPC-A-610 Class 3 / ISO-9001:2015
                </div>

                <button
                  onClick={handleRunInspection}
                  disabled={isScanning}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 disabled:opacity-50 text-[#FFFFFF] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E3845A]/30 flex items-center justify-center space-x-2 shrink-0 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#FFFFFF]" />
                      <span>Running Neural Inspection...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FFFFFF]" />
                      <span>ANALYZE ANOMALIES</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-800/60 flex items-center space-x-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>

        </div>

        {/* Right: Diagnostic Result & Raw JSON Workspace (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {inspectionResult ? (
            <div className="space-y-3">
              {/* Output Tab Switcher */}
              <div className="flex items-center justify-between p-1 bg-[#1B0C07] border border-[#3D180C] rounded-xl text-xs font-mono">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setActiveResultTab('report')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeResultTab === 'report'
                        ? 'bg-[#E3845A] text-white font-bold shadow'
                        : 'text-[#D1B8AE] hover:text-white'
                    }`}
                  >
                    Diagnostic Report
                  </button>
                  <button
                    onClick={() => setActiveResultTab('json')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                      activeResultTab === 'json'
                        ? 'bg-[#E3845A] text-white font-bold shadow'
                        : 'text-[#D1B8AE] hover:text-white'
                    }`}
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    <span>Raw JSON</span>
                  </button>
                </div>

                {/* Export Buttons */}
                <div className="flex items-center space-x-1 pr-1">
                  <button
                    onClick={handleExportCsv}
                    title="Export Audit CSV"
                    className="p-1.5 text-[#D1B8AE] hover:text-white hover:bg-[#3D180C]/50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* View 1: Formatted Diagnostic Result Card */}
              {activeResultTab === 'report' ? (
                <DiagnosticResult
                  result={inspectionResult}
                  onOpenCertModal={onOpenCertModal}
                />
              ) : (
                /* View 2: Raw Neural Machine JSON Payload */
                <div className="rounded-2xl border border-[#3D180C] bg-[#1B0C07] p-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3D180C] text-xs font-mono text-[#D1B8AE]">
                    <span>NEURAL PAYLOAD (REST JSON)</span>
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#120704] border border-[#3D180C] hover:border-[#E3845A]/40 text-[#E3845A] text-[11px] transition-colors cursor-pointer"
                    >
                      {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-[#FAF9F6] bg-[#120704] p-3 rounded-xl border border-[#3D180C] overflow-x-auto max-h-[460px] leading-relaxed">
                    {JSON.stringify(inspectionResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#3D180C] bg-[#1B0C07] p-8 text-center flex flex-col items-center justify-center min-h-[440px] shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-[#120704] border border-[#3D180C] flex items-center justify-center mb-4 text-[#E3845A]">
                <Sparkles className="w-7 h-7 text-[#E3845A] animate-pulse" />
              </div>
              <h4 className="text-base font-bold text-[#FFFFFF]">Awaiting Optical Inspection</h4>
              <p className="text-xs text-[#D1B8AE] mt-2 max-w-xs leading-relaxed">
                Select a benchmark preset or upload your production image, then click <strong className="text-[#E3845A]">Analyze Anomalies</strong> to evaluate defects with Gemini 3.8.
              </p>
              <div className="mt-6 text-[11px] font-mono text-[#D1B8AE] border border-[#3D180C] bg-[#120704] px-4 py-2 rounded-xl">
                STANDARDS: ISO-9001 / IPC-A-610 CLASS 3
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
