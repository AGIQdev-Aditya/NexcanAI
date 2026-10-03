# NEXCAN AI — MASTER PROJECT HANDOVER & AI CONTINUATION PROMPT
> **Repository:** `https://github.com/AGIQdev-Aditya/NexcanAI.git`  
> **Production URL:** `https://client-ruby-nine-87.vercel.app`  
> **Branch:** `main`  
> **Target Audience:** Next AI Model / Lead Engineering Agent / Human Collaborator

---

## 1. IDENTITY, ROLES & USER WORKING STYLE
- **Project Name:** **NexcanAI** (Developed by Team Nexus Four).
- **Core Domain:** High-precision Automated Optical Inspection (AOI), sub-millimeter industrial defect detection, and quality telemetry for high-volume automated manufacturing (beverage cans, semiconductors, automotive stamping, aerospace machining).
- **Design Philosophy:** *"Swiss Architectural Instrument"* meets *"Lusion / Oryzo.ai Tactile Physics"*.
  - Dark, soothing, calming, and deeply readable (never stressful or jarring).
  - High-precision typography, metric engineering annotations, and micro-interactions.
  - Zero tolerance for laggy animations, broken event handling, or generic template designs.
- **User Standards & Preferences:**
  - Expects luxury-tier, polished execution (references: `oryzo.ai`, `lusion.co`, Apple Pro product pages).
  - Always verify code with a production build (`npm --prefix client run build`) before declaring completion.
  - Test interactions (mouse wheel, cursors, sliders, 3D tilt) to ensure natural feel across both mouse and trackpad.
  - Maintain the established luxury architectural palette across all new components.

---

## 2. LUXURY ARCHITECTURAL COLOR PALETTE & ATMOSPHERE
Always adhere to these exact hexadecimal color codes:
- **Obsidian / Deep Ink:** `#1C1815` — Primary dark background, creates depth without harsh pure black.
- **Camel / Champagne Gold:** `#C9B59C` — Primary accent, glowing borders, active state indicator.
- **Sandstone:** `#D9CFC7` — Subtle borders, secondary labels, structural grid lines.
- **Pearl / Cream White:** `#EFE9E3` — Primary readable text, hero headlines, high contrast labels.
- **Emerald Laser:** `#16A34A` / `#22C55E` — Inspection pass indicator, laser reticle, calibrated measurements.
- **Alert Copper / Red:** `#E3845A` / `#EF4444` — Critical defect indicator, fracture alerts.

---

## 3. MONOREPO STRUCTURE & ARCHITECTURE
```
NexcanAI/
├── api/
│   └── index.js                 # Vercel serverless API wrapper
├── client/
│   ├── index.html
│   ├── vite.config.js           # Vite 6 config with React plugin
│   ├── tailwind.config.js       # Custom animations, keyframes, and palette
│   ├── src/
│   │   ├── main.jsx             # React root mount
│   │   ├── App.jsx              # Main application shell & tab routing
│   │   ├── index.css            # Custom scrollbars, glassmorphism, scanlines
│   │   └── components/
│   │       ├── OryzoShowcase.jsx # 8-Stage Lusion/Oryzo tactile 3D inspection studio
│   │       ├── CustomCursor.jsx  # Zero-lag RAF optical laser reticle + live HUD
│   │       ├── Hero.jsx          # Landing hero, defect carousel, stats, metrics
│   │       ├── Inspector.jsx     # Live image inspection & AI defect scanning
│   │       ├── DefectCanvas.jsx  # Interactive canvas with zoom, pan, bounding boxes
│   │       ├── AuditLog.jsx      # Historical compliance log, filters, CSV exports
│   │       ├── Navbar.jsx        # Glassmorphic header, live system status badge
│   │       └── Spotlight.jsx     # Aceternity UI dynamic radial spotlight glow
├── server/
│   └── src/
│       ├── server.js            # Express backend (port 5000)
│       ├── config/supabase.js   # Supabase client credentials & connection
│       ├── routes/              # Defect analysis, auth, and audit endpoints
│       └── services/            # Defect simulation, image preprocessing
├── vercel.json                  # Vercel monorepo routing & build configuration
├── package.json                 # Monorepo root scripts
└── .env.local                   # Environment credentials (Supabase, API keys)
```

---

## 4. CHRONOLOGICAL JOURNEY: WHAT WE STARTED, TRIED & COMPLETED

### Phase 1: The Initial State
- Started with a functional but standard SaaS dashboard (Navbar, Hero, Image Upload, Canvas Bounding Boxes, and Audit Log).
- **Shortcomings Identified by User:**
  - The UI felt standard, cold, and lacked fluid kinetic animations.
  - The Defect Sample Carousel had a severe UX bug: scrolling with a standard mouse wheel either didn't work horizontally, or scrolled backward on trackpads.
  - The cursor was a basic CSS dot with noticeable micro-stutter.
  - The page lacked the tactile, high-precision industrial magic of reference sites like `oryzo.ai`.

### Phase 2: What Was Tried, Debugged & Fixed
1. **Mouse Wheel Carousel Fix:**
   - *Problem:* Browser treated wheel events as passive vertical scrolls. React synthetic `onWheel` couldn't call `preventDefault()`.
   - *Fix:* Attached a native non-passive `{ passive: false }` event listener directly to the carousel container ref in `Hero.jsx`. Normalizes `deltaY` and `deltaX` into smooth horizontal glide (`scrollLeft += delta`), giving mouse wheels natural horizontal glides while preserving trackpad physics.
2. **Cursor Micro-Stutter Fix:**
   - *Problem:* CSS `transition: all 0.15s` was clashing with 60fps `requestAnimationFrame` updates, causing lag and rubber-banding.
   - *Fix:* Stripped CSS transitions in `CustomCursor.jsx`. Position is driven exclusively by hardware-accelerated RAF transforms.
   - *Enhancement:* Added an outer optical reticle with hashmarks (`[ + ]`), a central pulsing laser dot, and a real-time `[X, Y] · MEASURE` coordinate HUD overlay that activates over inspection zones.
3. **8-Stage Lusion Oryzo.ai Studio (`OryzoShowcase.jsx`):**
   - Built a comprehensive, tactile inspection laboratory:
     - **Stage 1 (Precision Cutting Mat & 3D Wafer):** Self-healing green mat with metric grid lines, calibrated millimeter tick rulers ($0\text{mm} \to 280\text{mm}$), 3D mouse perspective tilt on a $300\text{mm}$ silicon wafer with concentric gold traces, and a frosted glass badge (*"DESIGNED BY TEAM NEXUS FOUR"*).
     - **Stage 2 (Autonomous Condensed Typography):** *"SO PRECISE, IT'S AUTONOMOUS"* typography, central crosshair reticle, continuous rotating 3D specimen, and interactive prompt bar.
     - **Stage 3 (Circularity Blueprint Hologram):** Vector blueprint visualizer with chromatic aberration glow, 8-point interactive bounding handles, live dimensional metrics, and circularity formula:
       $$C = \frac{4\pi A}{P^2} = 0.9984$$
     - **Stage 4 (Dynamic AI Sensitivity & Tolerance Slider):** Multi-step tolerance switcher ($T = 0.05\text{mm}$, $0.10\text{mm}$, $0.25\text{mm}$) dynamically adjusting a live sensitivity matrix gauge and defect thresholds.
     - **Stage 5 (Neural Anomaly 3D Flip Card):** 3D card flip with real-time cryptographic cipher text scramble effect that decrypts on hover to reveal confidence scores ($99.8\%$).
     - **Stage 6 (Telecentric Micro-Flaw Zoom Reticle):** Optical zoom slider ($10\text{X} \to 100\text{X}$) with interactive magnifying loupe reticle.
     - **Stage 7 (Industrial Inspection Formulations):** Scientific formulation cards for Bounding Box IoU, Neyman-Pearson Anomaly Detection, and Ra Surface Profilometry.
     - **Stage 8 (Enterprise Verification & Barcode Footer):** 5.0-star audit reviews and high-density industrial barcode footer.

---

## 5. CURRENT OPERATIONAL STATUS
- **Vercel Production Deployment:** Active and healthy (`HTTP/2 200 OK`).
  - Production URL: `https://client-ruby-nine-87.vercel.app`
- **Git State:** `main` branch synced with `origin/main` (`https://github.com/AGIQdev-Aditya/NexcanAI.git`).
- **Build Command:** `npm --prefix client run build` (vite v6.4.3, transforms 1912 modules in ~1.7s, zero errors).
- **Local Dev Servers:** Cleanly stopped (port 5000 backend, port 5173 frontend). Run `npm run dev` to restart locally when needed.

---

## 6. FUTURE ROADMAP & UPCOMING INITIATIVES
When resuming work on NexcanAI, prioritize these enhancements:
1. **Live Camera & RTSP Stream Integration:** Wire real-time industrial camera feeds (or simulated RTSP canvas streams) directly into `Inspector.jsx` and `DefectCanvas.jsx`.
2. **Client-Side Edge AI Inference:** Integrate ONNX Runtime Web (`onnxruntime-web`) to run quantized YOLOv8/v11 models directly in the browser for zero-latency offline edge inspection.
3. **Cryptographically Signed Compliance Exports:** Enhance `AuditLog.jsx` with PDF export functionality including SHA-256 batch integrity hashes, ISO 9001 compliance headers, and auditor signature fields.
4. **Multi-User Collaborative Inspection:** Connect Supabase Realtime to broadcast live bounding box annotations and defect flags between multiple quality control operators simultaneously.

---

## 7. GOLDEN RULES FOR ANY AI ASSISTANT WORKING ON THIS REPO
1. **Never Break the Build:** Always run `npm --prefix client run build` before pushing to `main` or concluding a task.
2. **Preserve the Palette:** Never introduce generic bright primary colors or unstyled white cards. Use the Obsidian (`#1C1815`), Camel (`#C9B59C`), Sandstone (`#D9CFC7`), and Pearl (`#EFE9E3`) tokens.
3. **Protect Event Listeners:** Keep the native `{ passive: false }` event listener on the carousel to maintain the smooth horizontal wheel glide.
4. **Maintain Cursor Performance:** Never add CSS transition rules to `#custom-cursor` or its direct coordinate transforms; keep it on hardware-accelerated RAF.
