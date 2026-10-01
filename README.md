# 🔬 Nexcan AI — Autonomous Industrial Computer Vision & Visual Quality Inspection Platform

[![Hackathon Track](https://img.shields.io/badge/Hackathon-Computer%20Vision%20%26%20Visual%20Intelligence-blue.svg)](https://github.com/AGIQdev-Aditya/NexcanAI)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20Gemini%203.8%20Flash%20Vision-emerald.svg)](https://github.com/AGIQdev-Aditya/NexcanAI)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL%20(Cloud)-blueviolet.svg)](https://github.com/AGIQdev-Aditya/NexcanAI)
[![Security](https://img.shields.io/badge/Security-Zero--Leak%20Environment-success.svg)](https://github.com/AGIQdev-Aditya/NexcanAI)

---

## 👥 Team Nexus Four

- **Aditya Sharma** ([@AGIQdev-Aditya](https://github.com/AGIQdev-Aditya)) — Team Lead & Backend/Vision Architect
- **Vivek Gajdhane** ([@vivekgajdhane](https://github.com/vivekgajdhane)) — Frontend & UI/UX Engineer
- **Abhay Singh** ([@abhaysingh1230](https://github.com/abhaysingh1230)) — Cloud & API Integration
- **Rhugved** ([@rhugved2307](https://github.com/rhugved2307)) — AI Quality & Computer Vision

---

## 🎯 Problem Statement
Manufacturing plants, electronics assembly lines, and infrastructure managers rely heavily on manual human visual inspection of parts and surfaces. Human inspectors suffer from rapid cognitive fatigue (accuracy drops 40% after 20 minutes), resulting in missed microscopic defects, **$50B+ in annual scrap/recalls**, and fatal structural failures.

---

## 💡 The Solution: Nexcan AI
**Nexcan AI** is an autonomous industrial visual intelligence platform powered by **Google Gemini 3.8 Flash Multimodal Vision** and **Supabase Cloud PostgreSQL**.

1. **Multimodal Defect Inspection**: Instant visual scanning of PCB circuit boards, metal welds, structural components, and packaging via image upload or live camera feeds.
2. **Defect Localization & Severity Analysis**: Identifies micro-anomalies, generates normalized bounding box coordinates (`[ymin, xmin, ymax, xmax]`), and assigns risk verdicts (`PASS`, `REWORK`, `SCRAP`).
3. **Automated Root-Cause Remediation**: Generates instant corrective rework action plans and engineering root causes.
4. **ISO-9001 Compliance Audit Trail**: Every inspection is logged in Supabase Cloud with high-resolution metadata and downloadable compliance audit certificates.

---

## 🏗️ Repository Architecture

```
NexcanAI/
├── server/                     # Backend API (Node.js + Express + Gemini + Supabase)
│   ├── src/
│   │   ├── config/             # Environment, Gemini & Supabase clients
│   │   ├── controllers/        # Business logic (inspect, audit, analytics)
│   │   ├── routes/             # REST endpoints (/api/inspect, /api/audit, /api/health)
│   │   ├── services/           # Gemini Vision Service & Supabase DB Service
│   │   ├── middleware/         # Error handling & Multer upload support
│   │   └── server.js           # Express app bootstrap
│   ├── package.json
│   └── .env.example
│
├── supabase/                   # Supabase PostgreSQL Database
│   └── schema.sql              # Table definitions, indexes & RLS policies
│
├── package.json                # Server startup scripts
├── .gitignore                  # Security-first ignore rules (protects all secrets)
└── README.md                   # Full documentation & API guide
```

---

## 📡 REST API Reference for Frontend (Vivek)

The backend runs at `http://localhost:5000` (or the deployed backend URL).

### 1. Health & Status
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

### 2. Operator Authentication & 1-Click Demo Login
A complete drop-in React login component is available in `templates/LoginPage.jsx`.

#### A. 1-Click Hackathon Demo Login (For Judges)
```http
POST /api/auth/demo
Content-Type: application/json

{ "role": "lead" } // or "operator"
```
**Response:**
```json
{
  "success": true,
  "token": "demo-token-demo-aditya-lead-...",
  "user": {
    "id": "demo-aditya-lead",
    "email": "aditya.sharma@nexcan.ai",
    "full_name": "Aditya Sharma",
    "role": "Lead QA Engineer & Plant Lead",
    "station": "Station #4 (High-Speed SMT Line)"
  }
}
```

#### B. Standard Sign In (Supabase Auth)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "operator@nexcan.ai",
  "password": "Password123!"
}
```

#### C. Register Inspector
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "operator@nexcan.ai",
  "password": "Password123!",
  "full_name": "Aditya Sharma",
  "role": "Lead QA Inspector"
}
```

#### D. Google Sign-In Profile Sync
```http
POST /api/auth/google
Content-Type: application/json

{
  "email": "judge@gmail.com",
  "full_name": "Hackathon Judge",
  "google_id": "123456"
}
```

---

### 3. Autonomous Defect Inspection
```http
POST /api/inspect
```

Supports **BOTH** formats:
- **Option A (File Upload)**: `multipart/form-data` with field `image`
- **Option B (Base64 JSON)**: `application/json` with `{ "imageBase64": "...", "componentHint": "PCB" }`

**Example Request (Axios / Fetch):**
```javascript
// Example using FormData (File Upload)
const formData = new FormData();
formData.append('image', file); // from <input type="file">
formData.append('componentHint', 'SMD Controller Board');
formData.append('category', 'PCB');

const res = await fetch('http://localhost:5000/api/inspect', {
  method: 'POST',
  body: formData,
});
const data = await res.json();
```

**Example Response:**
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

> **Note on `bounding_boxes`**: `box_2d` is normalized from `0` to `1000` (`[ymin, xmin, ymax, xmax]`). To draw on a `<canvas>` of width `W` and height `H`:
> - `x = (xmin / 1000) * W`
> - `y = (ymin / 1000) * H`
> - `width = ((xmax - xmin) / 1000) * W`
> - `height = ((ymax - ymin) / 1000) * H`

---

### 4. Historical Audit Trail
```http
GET /api/audit?verdict=SCRAP&limit=20
```
Fetches historical inspection records directly from Supabase PostgreSQL.

---

### 5. Yield & Production Analytics
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
      "Surface Burr": 1
    }
  }
}
```

---

## 🚀 Quick Start for the Team

```bash
git clone https://github.com/AGIQdev-Aditya/NexcanAI.git
cd NexcanAI
cd server && npm install
npm run dev
```

Server starts on `http://localhost:5000` with hot-reloading.
