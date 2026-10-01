# 🔬 Nexcan AI — Autonomous Industrial Computer Vision & Visual Quality Inspection Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-success?style=for-the-badge&logo=vercel)](https://client-ruby-nine-87.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20TailwindCSS-06B6D4.svg)](https://client-ruby-nine-87.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Vercel%20Serverless%20%7C%20Node.js%20ESM-339933.svg)](https://client-ruby-nine-87.vercel.app)
[![Vision AI](https://img.shields.io/badge/Vision%20AI-Google%20Gemini%20Multimodal-4285F4.svg)](https://ai.google.dev/)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL%20%26%20Storage-3ECF8E.svg)](https://supabase.com)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20Live-000000.svg)](https://client-ruby-nine-87.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](./LICENSE)

> 🚀 **Live Production Application**: **[https://client-ruby-nine-87.vercel.app](https://client-ruby-nine-87.vercel.app)**
> ⚡ High-speed serverless deployment with sub-second response times, 24/7 cloud persistence, and instant defect inspection.

---

## 👥 Team Nexus Four

- **Rhugved Kulkarni** ([@rhugved2307](https://github.com/rhugved2307)) — Team Lead & AI Quality / Computer Vision
- **Aditya Sharma** ([@AGIQdev-Aditya](https://github.com/AGIQdev-Aditya)) — Team Member & Backend/Vision Architect
- **Vivek Gajdhane** ([@vivekgajdhane](https://github.com/vivekgajdhane)) — Team Member & Frontend/UI Engineer
- **Abhay Singh** ([@abhaysingh1230](https://github.com/abhaysingh1230)) — Team Member & Cloud/API Integration

---

## 🎯 Problem Statement

Manufacturing plants, electronics assembly lines (SMT/PCB), and aerospace/defense contractors face critical bottlenecks in manual visual inspection:
- **Rapid Cognitive Fatigue**: Inspector accuracy drops over 40% after just 20 minutes of continuous inspection.
- **Microscopic Defect Escapes**: Micro-cracks, cold solder joints, lifted pins, and seal leaks are difficult for the naked eye to detect consistently.
- **Massive Financial Losses**: Over **$50B+ in annual global scrap, warranty recalls, and production line halts**.
- **Audit Non-Compliance**: Lack of automated, tamper-evident digital records compliant with ISO-9001 and IPC-A-610 standards.

---

## 💡 The Solution: Nexcan AI

**Nexcan AI** is a full-stack, autonomous industrial computer vision platform that replaces subjective visual checks with sub-millimeter visual intelligence powered by **Google Gemini 3.8 Flash Multimodal Vision** and **Supabase Cloud PostgreSQL**.

```
[ High-Res Camera / Upload ] 
            │
            ▼
[ Vite + React UI Console ] ──► [ Express Backend API ]
            │                               │
            ▼                               ▼
[ HTML5 Bounding Box Canvas ]     [ Gemini 3.8 Flash Vision ]
            ▲                               │
            │                               ▼
[ ISO-9001 Audit Certificate ] ◄── [ Supabase PostgreSQL & CDN ]
```

---

## ✨ Core Web App & Platform Capabilities

### 1. 🔍 Autonomous Optical Inspection Console
- **Dual Input Modes**: Supports high-resolution drag-and-drop image uploads and **real-time live camera feeds** directly through the browser.
- **Factory-Floor Presets**: Preloaded sample test images across PCB electronics, CNC machined metal, aerospace composites, and sterile medical packaging.
- **Flexible Component Classification**: Select component categories (PCB, Metal, Aerospace, Packaging, General) and tune confidence thresholds in real time.

### 2. 🎯 Precision Defect Localization & Interactive Canvas
- **Normalized Bounding Box Projection**: Renders exact defect bounding boxes (`[ymin, xmin, ymax, xmax]`) dynamically scaled onto an HTML5 canvas.
- **Interactive Inspection Overlays**: Hover over detected anomalies to view real-time confidence scores, defect classifications, and dimensional estimates.
- **Tri-State Quality Verdicts**:
  - `PASS` (Green) — Component satisfies all structural and cosmetic tolerances.
  - `REWORK` (Amber) — Non-critical defect that can be remedied via secondary machining or touch-up.
  - `SCRAP` (Red) — Critical structural breach; immediate isolation required.

### 3. 🛠️ Root-Cause Engineering & Remediation Plans
- Instant technical diagnosis of the manufacturing failure mechanism (e.g., reflow thermal profile overshoot, CNC endmill tool wear).
- Actionable engineering corrective instructions dispatched to operators in real time.

### 4. 📜 ISO-9001:2015 & IPC-A-610 Compliance Certification
- Dynamic generation of **Digital Quality Assurance Certificates**.
- Includes unique Batch ID, inspection timestamp, operator attribution, defect diagnostics, and an official ISO compliance stamp.
- One-click printable and exportable format for line audits and regulatory reviews.

### 5. 📊 Real-Time Yield & Financial Savings Analytics
- Live dashboard displaying:
  - **Overall Yield Rate (%)** vs **Defect Rate (%)**
  - **Pass / Rework / Scrap Distribution**
  - **Estimated Financial Savings ($USD)** calculated from early-stage defect interception.
  - **Pareto Defect Breakdown** categorizing recurring anomalies across production batches.

### 6. 📋 Operator Audit Trail & Session History
- Cloud-backed searchable audit log of all inspection records.
- Filter by verdict (`PASS`, `REWORK`, `SCRAP`), component category, or operator.
- Click any past inspection to reload it directly into the inspection console with full bounding boxes and diagnostic metrics.

### 7. ⚡ 1-Click Judge & Operator Demo Authentication
- Built-in **1-Click Demo Login** tailored for hackathon evaluators and line managers (`Rhugved Kulkarni — Team Lead`, `Aditya Sharma — Core Team Member`, or `Vivek Gajdhane — Line Operator`).
- Full Supabase Auth support (Email/Password registration and login) with persistent session tokens.

### 8. 🛡️ Zero-Downtime Fallback Architecture
- Nexcan AI includes an intelligent **in-memory mock fallback engine**. If Gemini or Supabase API keys are not supplied, the app gracefully operates using simulated industrial datasets so that all features, charts, and canvases can be evaluated immediately without friction.

---

## 🏗️ Repository Architecture

```
NexcanAI/
├── client/                         # Modern React Frontend (Vite + Tailwind CSS)
│   ├── public/                     # Static media & assets
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── AnalyticsDashboard.jsx  # Yield metrics & savings charts
│   │   │   ├── AuditLog.jsx            # Filterable historical inspection logs
│   │   │   ├── DefectCanvas.jsx        # HTML5 canvas bounding box overlay
│   │   │   ├── DiagnosticResult.jsx    # Defect verdict & remediation card
│   │   │   ├── Hero.jsx                # Cinematic landing page & 3D twin theater
│   │   │   ├── Inspector.jsx           # Main optical inspection workbench
│   │   │   ├── IsoCertificateModal.jsx # ISO-9001 compliance certificate generator
│   │   │   ├── LoginPage.jsx           # Supabase & 1-Click Demo authentication
│   │   │   └── Navbar.jsx              # Status indicators & view switcher
│   │   ├── data/                   # Default inspection presets & samples
│   │   ├── services/               # Frontend API client (api.js)
│   │   ├── App.jsx                 # Main application state & routing controller
│   │   ├── index.css               # Architectural luxury palette styling (#F9F8F6, #EFE9E3, #D9CFC7, #C9B59C)
│   │   └── main.jsx                # React DOM entry point
│   ├── .env.example                # Client environment template
│   ├── index.html                  # HTML5 application shell
│   ├── package.json                # Client dependencies & scripts
│   ├── tailwind.config.js          # Tailwind CSS theme configuration
│   └── vite.config.js              # Vite server & API proxy config
│
├── server/                         # Backend API (Node.js + Express ESM)
│   ├── src/
│   │   ├── config/                 # Env configuration & Supabase client
│   │   ├── controllers/            # Inspection, auth, audit, analytics handlers
│   │   ├── middleware/             # Error handling & Multer upload processing
│   │   ├── routes/                 # REST endpoints (/inspect, /audit, /auth, etc.)
│   │   ├── services/
│   │   │   ├── databaseService.js  # Supabase PostgreSQL & in-memory cache
│   │   │   └── visionService.js    # Google Gemini 3.8 Flash Vision API engine
│   │   └── server.js               # Express application entry point
│   ├── .env.example                # Server environment template
│   └── package.json                # Backend dependencies & scripts
│
├── supabase/                       # Cloud Database Definitions
│   └── schema.sql                  # PostgreSQL table definitions, indexes & RLS
│
├── templates/                      # Standalone templates
│   └── LoginPage.jsx               # Drop-in login template
│
├── render.yaml                     # Render backend deployment manifest
├── vercel.json                     # Vercel frontend deployment manifest
├── package.json                    # Root orchestration scripts
├── .gitignore                      # Security-hardened gitignore
└── README.md                       # Comprehensive platform documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **Git**: Installed and configured

### 1. Clone the Repository
```bash
git clone https://github.com/AGIQdev-Aditya/NexcanAI.git
cd NexcanAI
```

### 2. Install All Dependencies (Single Command)
Run the root setup command to install dependencies across root, server, and client:
```bash
npm run install:all
```

### 3. Configure Environment Variables (Optional)
Copy the example environment files:
```bash
# In the root directory:
cp server/.env.example server/.env
cp client/.env.example client/.env
```
*(On Windows PowerShell, use `Copy-Item server/.env.example server/.env` and `Copy-Item client/.env.example client/.env`)*

> **Note**: Nexcan AI runs seamlessly **even without API keys** thanks to its built-in fallback engine. When ready for live vision and cloud persistence, fill in your keys in `server/.env`.

### 4. Start the Application
Start both the backend server and frontend development server concurrently:
```bash
npm run dev
```

- **Frontend Web App**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Environment Variables Reference

### Backend (`server/.env`)
| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port for Express API server |
| `NODE_ENV` | No | `development` | Node environment |
| `GEMINI_API_KEY` | Optional* | `""` | Google Gemini API key for multimodal vision |
| `GEMINI_MODEL` | No | `gemini-flash-latest` | Gemini model variant |
| `SUPABASE_URL` | Optional* | `""` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional* | `""` | Supabase service role key (backend operations) |
| `SUPABASE_ANON_KEY` | Optional* | `""` | Supabase anonymous public key |
| `CORS_ORIGIN` | No | `http://localhost:5173` | Allowed CORS origin |

*\*If omitted, the server operates in safe fallback mode using in-memory demo data.*

### Frontend (`client/.env`)
| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | No | `http://localhost:5000` | Target URL for backend API (automatically proxied in local dev) |

---

## 📡 REST API Reference

The backend exposes a REST API at `http://localhost:5000/api`.

### 1. System Health
```http
GET /api/health
```
**Response:**
```json
{
  "status": "ok",
  "service": "Nexcan AI Visual Intelligence Engine",
  "gemini_connected": true,
  "supabase_connected": true,
  "model": "gemini-flash-latest",
  "version": "1.0.0"
}
```

---

### 2. Autonomous Defect Inspection
```http
POST /api/inspect
```
Supports both **`multipart/form-data`** (file upload) and **`application/json`** (Base64).

**Parameters:**
- `image`: Image file (in FormData) OR `imageBase64`: Base64 string (in JSON)
- `componentHint`: Label hint (e.g., `"SMD Controller Board"`)
- `category`: `"PCB"` | `"Metal"` | `"Aerospace"` | `"Packaging"` | `"General"`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "15e1273a-4493-461d-9675-93b0ecc10704",
    "created_at": "2026-10-01T05:53:22.272Z",
    "batch_id": "BATCH-20261001-0553",
    "component_name": "SMD Controller Board v3.2",
    "category": "PCB",
    "verdict": "SCRAP",
    "confidence": 98.4,
    "defect_detected": true,
    "defect_type": "Solder Bridge on QFP-48 Pin 14-15",
    "severity": "CRITICAL",
    "dimensions_mm": "0.42 mm bridge width",
    "bounding_boxes": [
      {
        "box_2d": [340, 420, 480, 560],
        "label": "Solder Bridge",
        "confidence": 0.98
      }
    ],
    "root_cause": "Excess stencil solder paste deposition during reflow stage 2.",
    "rework_instructions": "Scrap unit immediately. Flag reflow paste printer calibration #B4.",
    "iso_standard": "IPC-A-610 Class 3 / ISO-9001:2015"
  }
}
```

> **Bounding Box Coordinate System**: `box_2d` values are normalized integers from `0` to `1000` in the format `[ymin, xmin, ymax, xmax]`. The frontend canvas calculates exact pixel placements using `(ymin / 1000) * height`, `(xmin / 1000) * width`, etc.

---

### 3. Authentication & Operator Sessions
- `POST /api/auth/demo` — Instant 1-click evaluation login (`{ "role": "lead" }` or `{ "role": "operator" }`).
- `POST /api/auth/login` — Standard Supabase operator authentication.
- `POST /api/auth/register` — Register a new QA inspector account.
- `POST /api/auth/google` — Sync Google OAuth profile.

---

### 4. Audit Trail & Inspection History
```http
GET /api/audit?verdict=SCRAP&category=PCB&limit=20
```
Returns chronological historical inspection records with full diagnostic results and bounding boxes.

---

### 5. Production Yield Analytics
```http
GET /api/analytics
```
**Response:**
```json
{
  "success": true,
  "data": {
    "total_inspections": 15,
    "pass_count": 10,
    "rework_count": 3,
    "scrap_count": 2,
    "yield_rate": 66.7,
    "defect_rate": 33.3,
    "cost_saved_usd": 2250,
    "defect_breakdown": {
      "Solder Bridge on QFP-48": 2,
      "Edge Micro-Burr": 1
    }
  }
}
```

---

## 🚢 Cloud Deployment (Vercel Full-Stack)

Nexcan AI is deployed on **Vercel** as a unified full-stack serverless platform:
- **Production URL**: [https://client-ruby-nine-87.vercel.app](https://client-ruby-nine-87.vercel.app)
- **Frontend SPA**: React 18 + Vite compiled to optimized static assets delivered across Vercel's Global Edge CDN.
- **Backend API**: Node.js Express Serverless Functions (`api/index.js`) handling `/api/*` with sub-second execution, 60s max duration, and 1GB memory.
- **Cloud Database**: Persistent Supabase PostgreSQL with real-time inspection records and Supabase Storage bucket for visual defect archival.

### Environment Variables Configured on Vercel:
| Variable | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `GEMINI_MODEL` | `gemini-2.0-flash` (or `gemini-3.8-flash`) |
| `SUPABASE_URL` | Cloud Supabase PostgreSQL URL |
| `SUPABASE_ANON_KEY` | Public client authentication key |
| `SUPABASE_SERVICE_ROLE_KEY` | Administrative service role key |
| `NODE_ENV` | `production` |

---

## 📜 License

This project is licensed under the **MIT License**.

Built with precision by **Team Nexus Four** for industrial quality assurance.
