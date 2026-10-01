import React, { useEffect, useRef } from 'react';

export default function DefectCanvas({ imageSrc, boundingBoxes = [], verdict = 'PASS', isScanning = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // Set canvas dimension based on image aspect ratio while keeping maximum width
      const maxWidth = 640;
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw base image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // If verdict is PASS or no bounding boxes, skip drawing defect overlays
      if (verdict === 'PASS' || !boundingBoxes || boundingBoxes.length === 0) {
        return;
      }

      // Determine bounding box stroke color using the warm terracotta & amber palette
      const isCritical = verdict === 'SCRAP';
      const boxColor = isCritical ? '#F43F5E' : '#E3845A'; // Red or Warm Amber
      const glowColor = isCritical ? 'rgba(244, 63, 94, 0.3)' : 'rgba(227, 132, 90, 0.3)';

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
        ctx.fillStyle = '#120704';
        ctx.fillText(labelText, x + 8, pillY + 15);
      });
    };
  }, [imageSrc, boundingBoxes, verdict]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#120704] border border-[#3D180C] flex items-center justify-center p-2 shadow-2xl">
      <canvas ref={canvasRef} className="max-w-full rounded-xl object-contain" />
      
      {/* Laser Scanning Overlay Animation */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#E3845A] to-transparent shadow-[0_0_20px_#E3845A] animate-scanline" />
          <div className="absolute inset-0 bg-[#E3845A]/10 flex items-center justify-center">
            <div className="px-4 py-2 rounded-xl bg-[#120704]/90 border border-[#E3845A]/50 text-[#E3845A] font-mono text-xs flex items-center space-x-2 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#E3845A] animate-ping"></span>
              <span className="font-bold">GEMINI 3.8 FLASH VISION SCANNING...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
