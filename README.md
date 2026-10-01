# 🔬 DefectLens AI — Autonomous Computer Vision & Visual Quality Inspection Platform

> **Hackathon Track**: Computer Vision & Visual Intelligence  
> **Tech Stack**: React 18, Vite, Tailwind CSS, Node.js, Express.js, Supabase PostgreSQL, Google Gemini 3.8 Flash Vision

---

## 👥 Team Nexus Four

- **Aditya Sharma** ([@AGIQdev-Aditya](https://github.com/AGIQdev-Aditya)) — Team Lead & Full-Stack Architect
- **Vivek Gajdhane** ([@vivekgajdhane](https://github.com/vivekgajdhane)) — Frontend & UI/UX Engineer
- **Abhay Singh** ([@abhaysingh1230](https://github.com/abhaysingh1230)) — Backend & API Engineer
- **Rhugved** ([@rhugved2307](https://github.com/rhugved2307)) — AI Engine & Data Quality Engineer

---

## 🎯 Problem Statement
Manufacturing plants, electronics assembly lines, and infrastructure managers rely heavily on manual human visual inspection of parts and surfaces. Human inspectors suffer from rapid cognitive fatigue (accuracy drops 40% after 20 minutes), resulting in missed microscopic defects, \$50B+ in annual scrap/recalls, and fatal structural failures.

---

## 💡 The Solution: DefectLens AI
**DefectLens AI** is an autonomous industrial visual intelligence platform powered by **Google Gemini 3.8 Flash Vision** and **Supabase Cloud PostgreSQL**.

1. **Multimodal Defect Inspection**: Instant visual scanning of PCB circuit boards, metal welds, structural concrete, and packaging.
2. **Defect Localization & Severity Analysis**: Identifies micro-anomalies, estimates millimeter tolerance, and assigns risk severity (`PASS`, `REWORK`, `SCRAP`).
3. **Automated Root-Cause Remediation**: Provides immediate corrective actions and root-cause engineering breakdowns.
4. **ISO-9001 Compliance Audit Trail**: Every inspection is logged in Supabase with high-resolution metadata and downloadable compliance audit certificates.

---

## 🏗️ Architecture

- **Client**: React 18 + Vite + Tailwind CSS + Lucide Icons (Deploy: Vercel)
- **Server**: Node.js + Express.js + Zod Validation + CORS (Deploy: Render)
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **AI Core**: Google Gemini 3.8 Flash Multimodal Vision Engine
