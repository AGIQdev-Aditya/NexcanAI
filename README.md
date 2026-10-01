# 🔬 Naxcan AI — Autonomous Industrial Computer Vision & Visual Quality Inspection Platform

[![Hackathon Project](https://img.shields.io/badge/Hackathon-Computer%20Vision%20%26%20Visual%20Intelligence-blue.svg)](https://github.com/AGIQdev-Aditya/NaxcanAI)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20Node.js%20%7C%20Supabase%20%7C%20Gemini%20Vision-emerald.svg)](https://github.com/AGIQdev-Aditya/NaxcanAI)
[![Security](https://img.shields.io/badge/Security-Zero--Leak%20Environment-success.svg)](https://github.com/AGIQdev-Aditya/NaxcanAI)

---

## 👥 Team Nexus Four

- **Aditya Sharma** ([@AGIQdev-Aditya](https://github.com/AGIQdev-Aditya)) — Team Lead & Full-Stack Architect
- **Vivek Gajdhane** ([@vivekgajdhane](https://github.com/vivekgajdhane)) — Frontend & UI/UX Engineer
- **Abhay Singh** ([@abhaysingh1230](https://github.com/abhaysingh1230)) — Backend & API Engineer
- **Rhugved** ([@rhugved2307](https://github.com/rhugved2307)) — AI Engine & Data Quality Engineer

---

## 🎯 Problem Statement
Manufacturing plants, electronics assembly lines, and infrastructure managers rely heavily on manual human visual inspection of parts and surfaces. Human inspectors suffer from rapid cognitive fatigue (accuracy drops 40% after 20 minutes), resulting in missed microscopic defects, **$50B+ in annual scrap/recalls**, and fatal structural failures.

---

## 💡 The Solution: Naxcan AI
**Naxcan AI** is an autonomous industrial visual intelligence platform powered by **Google Gemini 3.8 Flash Multimodal Vision** and **Supabase Cloud PostgreSQL**.

1. **Multimodal Defect Inspection**: Instant visual scanning of PCB circuit boards, metal welds, structural concrete, and packaging via file upload, webcam, or industrial presets.
2. **Defect Localization & Severity Analysis**: Identifies micro-anomalies, renders bounding box overlays, and assigns risk verdicts (`PASS`, `REWORK`, `SCRAP`).
3. **Automated Root-Cause Remediation**: Generates instant corrective rework action plans and engineering root causes.
4. **ISO-9001 Compliance Audit Trail**: Every inspection is logged in Supabase with high-resolution metadata and downloadable compliance audit certificates.

---

## 🏗️ Architecture

```
NaxcanAI/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/         # UI Components (Inspector, Canvas, Audit, Analytics)
│   │   ├── services/           # API integration client
│   │   ├── data/               # Industrial test presets & fallback data
│   │   ├── App.jsx             # Main application layout
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Industrial dark/light theme styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                     # Backend API (Node.js + Express + Gemini + Supabase)
│   ├── src/
│   │   ├── config/             # Environment, Gemini & Supabase clients
│   │   ├── controllers/        # Business logic (inspect, audit, analytics)
│   │   ├── routes/             # REST endpoints (/api/inspect, /api/audit, etc.)
│   │   ├── services/           # Gemini Vision Service & Supabase DB Service
│   │   ├── middleware/         # Validation, rate limiting & error handling
│   │   └── server.js           # Express app bootstrap
│   ├── package.json
│   └── .env.example
│
├── supabase/                   # Supabase PostgreSQL Database
│   └── schema.sql              # Table definitions, indexes & RLS policies
│
├── package.json                # Root orchestration scripts
├── .gitignore                  # Security-first ignore rules (protects all secrets)
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start for the Team

### 1. Clone the Repository
```bash
git clone https://github.com/AGIQdev-Aditya/NaxcanAI.git
cd NaxcanAI
```

### 2. Install Dependencies
```bash
npm run install:all
```
*(Or install manually: `cd client && npm install && cd ../server && npm install`)*

### 3. Environment Setup (Security First 🔒)
Copy the example `.env` files and add your credentials:
```bash
# Server environment
cp server/.env.example server/.env

# Client environment (optional)
cp client/.env.example client/.env
```

> **Security Note**: Never commit `.env` or API keys to git. `.gitignore` is pre-configured to strictly ignore all `.env` files.

### 4. Run the Full App
```bash
npm run dev
```
* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000`
* **API Health Check**: `http://localhost:5000/api/health`

---

## 📡 Core API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health & connection status of Gemini and Supabase |
| `POST` | `/api/inspect` | Send image base64/URL -> returns AI defect detection & verdict |
| `GET` | `/api/audit` | Fetch historical inspection logs with filtering & pagination |
| `GET` | `/api/analytics` | Yield rate %, defect breakdown, and scrap cost metrics |

---

## 📜 Database Schema (Supabase)
Run the SQL script located in `supabase/schema.sql` in your Supabase SQL Editor to initialize the database tables:
- `inspections`: Inspection records, verdict (`PASS`/`REWORK`/`SCRAP`), confidence %, defect metadata, bounding box coordinates, and root-cause notes.
