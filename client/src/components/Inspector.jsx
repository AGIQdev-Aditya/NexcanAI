import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, AlertCircle, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import DefectCanvas from './DefectCanvas.jsx';
import DiagnosticResult from './DiagnosticResult.jsx';
import { SAMPLE_PRESETS } from '../data/sampleInspections.js';
import { inspectImage } from '../services/api.js';

export default function Inspector({ onInspectionComplete, onOpenCertModal, currentUser }) {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PRESETS[0].svgData);
  const [componentHint, setComponentHint] = useState(SAMPLE_PRESETS[0].hint);
  const [category, setCategory] = useState(SAMPLE_PRESETS[0].category);
  const [isScanning, setIsScanning] = useState(false);
  const [inspectionResult, setInspectionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

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
        componentHint: componentHint,
        category: category,
        userEmail: currentUser?.email || 'operator@nexcan.ai',
        userId: currentUser?.id || 'operator-default',
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

  return (
    <div className="space-y-6">
      
      {/* Test Presets Selector */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-xs font-bold font-mono tracking-wider text-emerald-400 uppercase">
              1-CLICK INDUSTRIAL BENCHMARK PRESETS
            </h3>
            <p className="text-[11px] text-slate-400">
              Select verified test components to evaluate autonomous defect recognition.
            </p>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Powered by Gemini 3.8 Flash Vision
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = componentHint === preset.hint;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-950/40'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${preset.badgeColor}`}>
                    {preset.expectedVerdict}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{preset.category}</span>
                </div>
                <div className="text-xs font-bold text-white truncate">{preset.title}</div>
                <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{preset.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Image Feed & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="font-mono text-slate-300 font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>OPTICAL FEED SURFACE</span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
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
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Snap Feed</span>
                  </button>
                ) : (
                  <button
                    onClick={startWebcam}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Live Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Webcam Live Stream View */}
            {isWebcamActive ? (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-emerald-500/40">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
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

            {/* Component Metadata Input & Inspect Trigger */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  COMPONENT DESCRIPTION / SPECIFICATION HINT
                </label>
                <input
                  type="text"
                  value={componentHint}
                  onChange={(e) => setComponentHint(e.target.value)}
                  placeholder="e.g. Solder leads, Turbine blade, Hermetic seal"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <button
                onClick={handleRunInspection}
                disabled={isScanning}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 shrink-0 transition-all cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing Anomaly...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>ANALYZE ANOMALIES</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/30 border border-red-800/50 flex items-center space-x-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>

        </div>

        {/* Right: Real-Time Diagnostic Result (5 cols) */}
        <div className="lg:col-span-5">
          {inspectionResult ? (
            <DiagnosticResult
              result={inspectionResult}
              onOpenCertModal={onOpenCertModal}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-center mb-3 text-slate-400">
                <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Awaiting Optical Inspection</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Select a preset or upload a component feed, then click <strong className="text-emerald-400">Analyze Anomalies</strong>.
              </p>
              <div className="mt-5 text-[11px] font-mono text-slate-500 border border-slate-800 bg-slate-950 px-3 py-1.5 rounded-lg">
                READY: ISO-9001 / IPC-A-610 AUDITOR
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
