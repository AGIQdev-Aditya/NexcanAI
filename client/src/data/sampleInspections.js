// SVG-based high-res industrial test images encoded as Data URIs for instant testing

// 1. PCB with obvious solder bridge short circuit defect
const pcbDefectSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#0d47a1"/>
  <!-- Circuit Traces -->
  <path d="M 50 100 L 200 100 L 250 150 L 250 300" stroke="#ffd54f" stroke-width="8" fill="none"/>
  <path d="M 50 150 L 180 150 L 220 190 L 220 300" stroke="#ffd54f" stroke-width="8" fill="none"/>
  <path d="M 50 200 L 160 200 L 190 230 L 190 300" stroke="#ffd54f" stroke-width="8" fill="none"/>
  <!-- IC Chip Body -->
  <rect x="250" y="220" width="180" height="180" rx="8" fill="#212121" stroke="#424242" stroke-width="4"/>
  <text x="340" y="315" fill="#eeeeee" font-family="monospace" font-size="16" text-anchor="middle" font-weight="bold">ARM STM32F4</text>
  <!-- Pins Left -->
  <rect x="220" y="240" width="30" height="8" fill="#e0e0e0"/>
  <rect x="220" y="260" width="30" height="8" fill="#e0e0e0"/>
  <rect x="220" y="280" width="30" height="8" fill="#e0e0e0"/>
  <rect x="220" y="300" width="30" height="8" fill="#e0e0e0"/>
  <rect x="220" y="320" width="30" height="8" fill="#e0e0e0"/>
  <rect x="220" y="340" width="30" height="8" fill="#e0e0e0"/>
  <!-- DEFECT: Solder Bridge between Pin 280 & 300 -->
  <circle cx="232" cy="290" r="14" fill="#cfd8dc" stroke="#b0bec5" stroke-width="2"/>
  <path d="M 220 278 Q 238 290 220 302 Z" fill="#b0bec5"/>
  <text x="210" y="270" fill="#ff1744" font-family="monospace" font-size="12" font-weight="bold">SOLDER BRIDGE</text>
</svg>`;

// 2. Metal Turbine Blade with Fracture Crack
const metalCrackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78909c" />
      <stop offset="50%" stop-color="#b0bec5" />
      <stop offset="100%" stop-color="#546e7a" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="#263238"/>
  <!-- Milled Alloy Chamfer -->
  <path d="M 100 120 C 250 80, 400 90, 500 160 L 460 480 C 350 510, 200 490, 120 440 Z" fill="url(#metalGrad)" stroke="#37474f" stroke-width="4"/>
  <!-- Machining lines -->
  <path d="M 130 180 Q 300 150 470 200" stroke="#cfd8dc" stroke-width="1.5" opacity="0.4" fill="none"/>
  <path d="M 125 240 Q 290 220 460 260" stroke="#cfd8dc" stroke-width="1.5" opacity="0.4" fill="none"/>
  <path d="M 120 300 Q 280 290 450 320" stroke="#cfd8dc" stroke-width="1.5" opacity="0.4" fill="none"/>
  <!-- DEFECT: Surface fatigue fracture crack -->
  <path d="M 280 250 L 295 270 L 290 295 L 315 320 L 310 345 L 325 365" stroke="#ff1744" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <text x="330" y="320" fill="#ff1744" font-family="monospace" font-size="14" font-weight="bold">FATIGUE CRACK (4.8mm)</text>
</svg>`;

// 3. Blister Pack Puncture Defect
const blisterDefectSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#1a237e"/>
  <rect x="80" y="80" width="440" height="440" rx="16" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="4"/>
  <!-- Blister Pockets -->
  <rect x="120" y="120" width="140" height="150" rx="20" fill="#e0f2f1" stroke="#80cbc4" stroke-width="3"/>
  <rect x="340" y="120" width="140" height="150" rx="20" fill="#e0f2f1" stroke="#80cbc4" stroke-width="3"/>
  <rect x="120" y="330" width="140" height="150" rx="20" fill="#e0f2f1" stroke="#80cbc4" stroke-width="3"/>
  <rect x="340" y="330" width="140" height="150" rx="20" fill="#e0f2f1" stroke="#80cbc4" stroke-width="3"/>
  <!-- Pills inside -->
  <rect x="155" y="165" width="70" height="60" rx="30" fill="#ffffff" stroke="#00897b" stroke-width="2"/>
  <rect x="375" y="165" width="70" height="60" rx="30" fill="#ffffff" stroke="#00897b" stroke-width="2"/>
  <rect x="155" y="375" width="70" height="60" rx="30" fill="#ffffff" stroke="#00897b" stroke-width="2"/>
  <rect x="375" y="375" width="70" height="60" rx="30" fill="#ffffff" stroke="#00897b" stroke-width="2"/>
  <!-- DEFECT: Foil seal rupture / puncture on pocket 2 -->
  <path d="M 400 185 L 420 205 M 420 185 L 400 205" stroke="#d50000" stroke-width="5"/>
  <circle cx="410" cy="195" r="15" fill="none" stroke="#d50000" stroke-width="2" stroke-dasharray="4"/>
  <text x="360" y="240" fill="#d50000" font-family="monospace" font-size="12" font-weight="bold">FOIL PUNCTURE</text>
</svg>`;

// 4. Clean Aerospace Bearing (Flawless PASS)
const cleanPassSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#b0bec5"/>
      <stop offset="70%" stop-color="#78909c"/>
      <stop offset="100%" stop-color="#37474f"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="#102027"/>
  <!-- Outer race -->
  <circle cx="300" cy="300" r="220" fill="url(#ringGrad)" stroke="#cfd8dc" stroke-width="6"/>
  <!-- Inner groove -->
  <circle cx="300" cy="300" r="160" fill="#263238" stroke="#eceff1" stroke-width="3"/>
  <!-- Ball bearings -->
  <circle cx="300" cy="155" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="405" cy="195" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="445" cy="300" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="405" cy="405" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="300" cy="445" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="195" cy="405" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="155" cy="300" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <circle cx="195" cy="195" r="28" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/>
  <!-- Center shaft bore -->
  <circle cx="300" cy="300" r="90" fill="#102027" stroke="#80cbc4" stroke-width="4"/>
  <text x="300" y="306" fill="#80cbc4" font-family="monospace" font-size="15" text-anchor="middle" font-weight="bold">NOMINAL SPEC</text>
</svg>`;

export const SAMPLE_PRESETS = [
  {
    id: 'pcb-bridge',
    title: 'PCB Solder Bridge',
    category: 'PCB',
    expectedVerdict: 'SCRAP',
    hint: 'SMD Circuit Board Controller - Solder Pitch Inspection',
    svgData: `data:image/svg+xml;base64,${btoa(pcbDefectSvg)}`,
    description: 'High-density micro-controller lead bridging causing direct power rails short-circuit.',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
  },
  {
    id: 'metal-crack',
    title: 'Aero-Turbine Crack',
    category: 'Metal',
    expectedVerdict: 'REWORK',
    hint: 'CNC Machined Turbine Blade - Stress Fracture Detection',
    svgData: `data:image/svg+xml;base64,${btoa(metalCrackSvg)}`,
    description: 'Surface fatigue micro-fracture along leading aerodynamic chamfer edge.',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  {
    id: 'blister-puncture',
    title: 'Pharma Seal Puncture',
    category: 'Packaging',
    expectedVerdict: 'SCRAP',
    hint: 'Pharmaceutical Sterile Blister Pack Seal Integrity',
    svgData: `data:image/svg+xml;base64,${btoa(blisterDefectSvg)}`,
    description: 'Micro-puncture in aluminum hermetic seal compromising sterile barrier.',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
  },
  {
    id: 'clean-bearing',
    title: 'Precision Bearing (Pass)',
    category: 'Aerospace',
    expectedVerdict: 'PASS',
    hint: 'Precision High-Speed Radial Ball Bearing Assembly',
    svgData: `data:image/svg+xml;base64,${btoa(cleanPassSvg)}`,
    description: 'Flawless circularity, zero surface pitting, radial tolerance within 0.005 mm.',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
];
