import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Grid } from 'lucide-react';

export default function DefectCanvas({ imageSrc, boundingBoxes = [], verdict = 'PASS', isScanning = false }) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const maxWidth = 640;
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw base image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Optional Telecentric Coordinate Grid
      if (showGrid) {
        ctx.strokeStyle = 'rgba(201, 181, 156, 0.4)';
        ctx.lineWidth = 1;
        const step = 40;
        for (let x = 0; x < canvas.width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // If verdict is PASS or no bounding boxes, skip drawing defect overlays
      if (verdict === 'PASS' || !boundingBoxes || boundingBoxes.length === 0) {
        return;
      }

      // Determine bounding box stroke color using the luxury palette
      const isCritical = verdict === 'SCRAP';
      const boxColor = isCritical ? '#DC2626' : '#C9B59C'; // Crimson or Camel Gold
      const glowColor = isCritical ? 'rgba(220, 38, 38, 0.25)' : 'rgba(201, 181, 156, 0.28)';

      boundingBoxes.forEach((item, index) => {
        const coords = item.box_2d; // [ymin, xmin, ymax, xmax] in 0-1000 scale
        if (!coords || coords.length !== 4) return;

        const [ymin, xmin, ymax, xmax] = coords;
        const x = (xmin / 1000) * canvas.width;
        const y = (ymin / 1000) * canvas.height;
        const w = ((xmax - xmin) / 1000) * canvas.width;
        const h = ((ymax - ymin) / 1000) * canvas.height;

        // Bounding box fill
        ctx.fillStyle = glowColor;
        ctx.fillRect(x, y, w, h);

        // Bounding box stroke
        ctx.lineWidth = 3;
        ctx.strokeStyle = boxColor;
        ctx.strokeRect(x, y, w, h);

        // Corner reticle accents
        const cornerSize = Math.min(w, h, 14);
        ctx.lineWidth = 4;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(x, y + cornerSize);
        ctx.lineTo(x, y);
        ctx.lineTo(x + cornerSize, y);
        ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(x + w - cornerSize, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + cornerSize);
        ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(x, y + h - cornerSize);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x + cornerSize, y + h);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(x + w - cornerSize, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + w, y + h - cornerSize);
        ctx.stroke();

        // Label pill background
        const labelText = `${item.label || 'Defect'} (${Math.round((item.confidence || 0.95) * 100)}%)`;
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        const textWidth = ctx.measureText(labelText).width;
        const pillY = Math.max(y - 24, 6);

        ctx.fillStyle = boxColor;
        ctx.beginPath();
        ctx.roundRect(x, pillY, textWidth + 16, 22, 4);
        ctx.fill();

        // Text inside pill
        ctx.fillStyle = isCritical ? '#FFFFFF' : '#1C1815';
        ctx.fillText(labelText, x + 8, pillY + 15);
      });
    };
  }, [imageSrc, boundingBoxes, verdict, showGrid]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#D9CFC7] flex flex-col items-center justify-center p-3 shadow-xs">
      
      {/* Precision Reticle Frame Accents (Microscope Alignment Marks) */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C9B59C]/40 pointer-events-none z-10" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C9B59C]/40 pointer-events-none z-10" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C9B59C]/40 pointer-events-none z-10" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C9B59C]/40 pointer-events-none z-10" />

      {/* Interactive Canvas Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-[#F9F8F6]/95 border border-[#D9CFC7] p-1.5 rounded-xl backdrop-blur-md shadow-xs">
        <button
          onClick={() => setShowGrid(!showGrid)}
          title="Toggle Optical Measurement Grid"
          className={`px-2 py-1 rounded-lg text-xs font-mono transition-all flex items-center space-x-1 cursor-pointer ${
            showGrid ? 'bg-[#C9B59C] text-[#1C1815] font-bold shadow-2xs' : 'text-[#6B5E55] hover:text-[#1C1815] hover:bg-[#EFE9E3]'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span className="text-[10px] hidden sm:inline">Grid</span>
        </button>
        <button
          onClick={() => setZoom((prev) => Math.min(prev + 0.25, 2.5))}
          title="Zoom In"
          className="p-1.5 rounded-lg text-[#6B5E55] hover:text-[#1C1815] hover:bg-[#EFE9E3] transition-colors cursor-pointer"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoom((prev) => Math.max(prev - 0.25, 1))}
          title="Zoom Out"
          className="p-1.5 rounded-lg text-[#6B5E55] hover:text-[#1C1815] hover:bg-[#EFE9E3] transition-colors cursor-pointer"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        {zoom !== 1 && (
          <button
            onClick={() => setZoom(1)}
            title="Reset Zoom"
            className="p-1.5 rounded-lg text-[#1C1815] hover:bg-[#EFE9E3] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
        <span className="text-[10px] font-mono text-[#6B5E55] px-1 font-semibold">{zoom.toFixed(1)}x</span>
      </div>

      {/* Viewport with Zoom capability */}
      <div className="w-full overflow-hidden flex items-center justify-center rounded-xl min-h-[380px] bg-[#F9F8F6]">
        <canvas
          ref={canvasRef}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          className="max-w-full rounded-xl object-contain transition-transform duration-200"
        />
      </div>

      {/* Status Badges on Canvas */}
      {!isScanning && (
        <div className="w-full flex items-center justify-between px-2 pt-2 text-[10px] font-mono text-[#8C7D73]">
          <div className="flex items-center space-x-1.5">
            {verdict === 'PASS' && boundingBoxes.length === 0 ? (
              <span className="flex items-center space-x-1 text-[#16A34A] font-semibold bg-[#16A34A]/10 px-2 py-0.5 rounded-md border border-[#16A34A]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                <span>ZERO ANOMALIES DETECTED</span>
              </span>
            ) : boundingBoxes.length > 0 ? (
              <span className="flex items-center space-x-1 text-[#DC2626] font-semibold bg-[#DC2626]/10 px-2 py-0.5 rounded-md border border-[#DC2626]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                <span>{boundingBoxes.length} DEFECT REGION{boundingBoxes.length > 1 ? 'S' : ''} LOCALIZED</span>
              </span>
            ) : (
              <span>SURFACE READY FOR INSPECTION</span>
            )}
          </div>
          <span className="hidden sm:inline">OPTICAL 1:1 TELECENTRIC • 1080P</span>
        </div>
      )}
      
      {/* Calm Precision Laser Scanning Overlay */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {/* Sweeping Laser Beam */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9B59C] to-transparent shadow-[0_0_15px_rgba(201,181,156,0.9)] animate-calm-laser">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#C9B59C]/15 to-transparent pointer-events-none -translate-y-full" />
          </div>
          {/* Center Notification Pill */}
          <div className="absolute inset-0 bg-[#1C1815]/5 backdrop-blur-[1px] flex items-center justify-center">
            <div className="px-5 py-2.5 rounded-2xl bg-[#FFFFFF]/95 border border-[#C9B59C] text-[#1C1815] font-mono text-xs flex items-center space-x-2.5 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9B59C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9B59C]"></span>
              </span>
              <span className="font-bold tracking-wide">ANALYZING SPECIMEN TOPOLOGY...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
