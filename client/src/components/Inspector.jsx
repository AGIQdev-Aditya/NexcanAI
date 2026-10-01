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
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsWebcamActive(false);
  };

  const captureWebcamSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setSelectedImage(dataUrl);
    setComponentHint('Live Camera Frame');
    setCategory('General Optical');
    setInspectionResult(null);
    setErrorMsg(null);
    stopWebcam();
  };

  // Run AI Inspection
  const handleRunInspection = async () => {
    if (!selectedImage) {
      setErrorMsg('Please select or upload a component image first.');
      return;
    }

    setIsScanning(true);
    try {
      const result = await inspectImage({
        imageBase64: selectedImage,
        image: selectedImage,
        componentHint: componentHint,
        component_name: componentHint,
        category,
        tolerance_limit_mm: parseFloat(toleranceLimit),
        userEmail: currentUser?.email,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to complete inspection analysis.');
      }

      setInspectionResult(result.data);
      if (onInspectionComplete) {
        onInspectionComplete(result.data);
      }
    } catch (err) {
      console.error('Inspection error:', err);
      setErrorMsg(err.message || 'Vision inspection error. Ensure image is clear.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopyJson = () => {
    if (!inspectionResult) return;
    navigator.clipboard.writeText(JSON.stringify(inspectionResult, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleExportCsv = () => {
    if (!inspectionResult) return;
    const headers = ['ID', 'Timestamp', 'Component', 'Category', 'Verdict', 'Defect Type', 'Confidence', 'Tolerance Dev'];
    const row = [
      inspectionResult.id || 'N/A',
      inspectionResult.timestamp || new Date().toISOString(),
      `"${inspectionResult.component_name || ''}"`,
      `"${inspectionResult.category || ''}"`,
      inspectionResult.verdict || 'PASS',
      `"${inspectionResult.defect_type || 'None'}"`,
      `${inspectionResult.confidence || 0}%`,
      `"${inspectionResult.dimensions_mm || '0.00 mm'}"`,
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
      <div className="p-5 rounded-2xl bg-[#EFE9E3] border border-[#D9CFC7] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D9CFC7] gap-2">
          <div>
            <h3 className="text-xs font-bold font-mono tracking-wider text-[#1C1815] uppercase flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9B59C]" />
              <span>INDUSTRIAL QUALITY BENCHMARK PRESETS</span>
            </h3>
            <p className="text-[11px] text-[#6B5E55] mt-0.5">
              Select verified test components to evaluate autonomous defect recognition across high-throughput assemblies.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#6B5E55] bg-[#F9F8F6] px-2.5 py-1 rounded-lg border border-[#D9CFC7]">
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
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? 'border-[#C9B59C] bg-[#F9F8F6] ring-2 ring-[#C9B59C]'
                    : 'border-[#D9CFC7] bg-[#F9F8F6] hover:border-[#C9B59C]/60 hover:bg-[#EFE9E3]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    preset.expectedVerdict === 'PASS' 
                      ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30'
                      : preset.expectedVerdict === 'REWORK'
                      ? 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30'
                      : 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30'
                  }`}>
                    {preset.expectedVerdict}
                  </span>
                  <span className="text-[10px] text-[#8C7D73] font-mono">{preset.category}</span>
                </div>
                <div className="text-xs font-bold text-[#1C1815] truncate">{preset.title}</div>
                <div className="text-[10px] text-[#6B5E55] line-clamp-2 mt-0.5">{preset.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Image Feed & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="rounded-2xl border border-[#D9CFC7] bg-[#EFE9E3] p-4 shadow-sm">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="font-mono text-[#6B5E55] font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C9B59C] animate-pulse"></span>
                <span className="text-[#1C1815]">OPTICAL FEED SURFACE</span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F9F8F6] hover:bg-[#D9CFC7] border border-[#D9CFC7] text-[#1C1815] text-xs font-mono transition-colors cursor-pointer shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5 text-[#C9B59C]" />
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
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#C9B59C] hover:bg-[#B8A389] text-[#1C1815] text-xs font-bold shadow-sm cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Snap Feed</span>
                  </button>
                ) : (
                  <button
                    onClick={startWebcam}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F9F8F6] hover:bg-[#D9CFC7] border border-[#D9CFC7] text-[#1C1815] text-xs font-mono transition-colors cursor-pointer shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C9B59C]" />
                    <span>Live Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Webcam Live Stream View */}
            {isWebcamActive ? (
              <div className="relative rounded-xl overflow-hidden bg-[#F9F8F6] aspect-video flex items-center justify-center border border-[#C9B59C]">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#F9F8F6]/90 text-[#1C1815] text-[10px] font-mono border border-[#C9B59C]">
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
            <div className="mt-4 pt-4 border-t border-[#D9CFC7] space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-8">
                  <label className="text-[10px] font-mono text-[#6B5E55] block mb-1">
                    COMPONENT DESCRIPTION / SPECIFICATION HINT
                  </label>
                  <input
                    type="text"
                    value={componentHint}
                    onChange={(e) => setComponentHint(e.target.value)}
                    placeholder="e.g. Solder leads, Turbine blade, Hermetic seal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7] text-xs text-[#1C1815] placeholder-[#6B5E55]/50 focus:outline-none focus:border-[#C9B59C] font-mono"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-[10px] font-mono text-[#6B5E55] block mb-1">
                    TOLERANCE THRESHOLD
                  </label>
                  <select
                    value={toleranceLimit}
                    onChange={(e) => setToleranceLimit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#D9CFC7] text-xs text-[#1C1815] focus:outline-none focus:border-[#C9B59C] font-mono cursor-pointer"
                  >
                    <option value="0.05">±0.05 mm (Strict Class 3)</option>
                    <option value="0.10">±0.10 mm (Balanced SMT)</option>
                    <option value="0.25">±0.25 mm (Permissive Cast)</option>
                  </select>
                </div>
              </div>

              {/* Run Inspection Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-[#8C7D73] hidden sm:block">
                  Standards: IPC-A-610 Class 3 / ISO-9001:2015
                </div>

                <button
                  onClick={handleRunInspection}
                  disabled={isScanning}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#C9B59C] hover:bg-[#B8A389] disabled:opacity-50 text-[#1C1815] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-2 shrink-0 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#1C1815]" />
                      <span>Running Neural Inspection...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#1C1815]" />
                      <span>ANALYZE ANOMALIES</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
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
              <div className="flex items-center justify-between p-1 bg-[#EFE9E3] border border-[#D9CFC7] rounded-xl text-xs font-mono shadow-inner">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setActiveResultTab('report')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeResultTab === 'report'
                        ? 'bg-[#C9B59C] text-[#1C1815] font-bold shadow-sm'
                        : 'text-[#6B5E55] hover:text-[#1C1815]'
                    }`}
                  >
                    Diagnostic Report
                  </button>
                  <button
                    onClick={() => setActiveResultTab('json')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                      activeResultTab === 'json'
                        ? 'bg-[#C9B59C] text-[#1C1815] font-bold shadow-sm'
                        : 'text-[#6B5E55] hover:text-[#1C1815]'
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
                    className="p-1.5 text-[#6B5E55] hover:text-[#1C1815] hover:bg-[#D9CFC7]/50 rounded-lg transition-colors cursor-pointer"
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
                <div className="rounded-2xl border border-[#D9CFC7] bg-[#EFE9E3] p-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D9CFC7] text-xs font-mono text-[#6B5E55]">
                    <span>NEURAL PAYLOAD (REST JSON)</span>
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#F9F8F6] border border-[#D9CFC7] hover:border-[#C9B59C] text-[#1C1815] text-[11px] transition-colors cursor-pointer"
                    >
                      {copiedJson ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-[#1C1815] bg-[#F9F8F6] p-3 rounded-xl border border-[#D9CFC7] overflow-x-auto max-h-[460px] leading-relaxed">
                    {JSON.stringify(inspectionResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D9CFC7] bg-[#EFE9E3] p-8 text-center flex flex-col items-center justify-center min-h-[440px] shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#F9F8F6] border border-[#D9CFC7] flex items-center justify-center mb-4 text-[#C9B59C]">
                <Sparkles className="w-7 h-7 text-[#C9B59C] animate-pulse" />
              </div>
              <h4 className="text-base font-bold text-[#1C1815]">Awaiting Optical Inspection</h4>
              <p className="text-xs text-[#6B5E55] mt-2 max-w-xs leading-relaxed">
                Select a benchmark preset or upload your production image, then click <strong className="text-[#1C1815]">Analyze Anomalies</strong> to evaluate defects with Gemini 3.8.
              </p>
              <div className="mt-6 text-[11px] font-mono text-[#8C7D73] border border-[#D9CFC7] bg-[#F9F8F6] px-4 py-2 rounded-xl">
                STANDARDS: ISO-9001 / IPC-A-610 CLASS 3
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
