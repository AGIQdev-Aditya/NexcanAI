-- ==========================================================
-- Nexcan AI: Industrial Computer Vision Quality Assurance Schema
-- ==========================================================

-- Enable pgcrypto extension for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: inspections
CREATE TABLE IF NOT EXISTS inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    batch_id TEXT NOT NULL DEFAULT ('BATCH-' || TO_CHAR(NOW(), 'YYYYMMDD-HH24MI')),
    component_name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    verdict TEXT NOT NULL CHECK (verdict IN ('PASS', 'REWORK', 'SCRAP')),
    confidence NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
    defect_detected BOOLEAN NOT NULL DEFAULT false,
    defect_type TEXT DEFAULT 'None',
    severity TEXT NOT NULL DEFAULT 'NONE' CHECK (severity IN ('NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    dimensions_mm TEXT DEFAULT '0.00 mm',
    bounding_boxes JSONB DEFAULT '[]'::jsonb,
    root_cause TEXT DEFAULT '',
    rework_instructions TEXT DEFAULT '',
    iso_standard TEXT DEFAULT 'ISO-9001:2015 Clause 8.5.1',
    inspector_id TEXT DEFAULT 'AUTONOMOUS-CV-01',
    image_url TEXT,
    raw_response JSONB DEFAULT '{}'::jsonb
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_inspections_created_at ON inspections(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inspections_verdict ON inspections(verdict);
CREATE INDEX IF NOT EXISTS idx_inspections_category ON inspections(category);

-- Enable Row Level Security (RLS)
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for hackathon demo & audit logs)
CREATE POLICY "Allow public read access"
    ON inspections FOR SELECT
    USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access"
    ON inspections FOR INSERT
    WITH CHECK (true);

-- Seed initial benchmark demonstration records
INSERT INTO inspections (
    component_name, category, verdict, confidence, defect_detected,
    defect_type, severity, dimensions_mm, bounding_boxes, root_cause,
    rework_instructions, iso_standard
) VALUES 
(
    'SMD Controller Board v3.2', 'PCB', 'SCRAP', 98.4, true,
    'Solder Bridge on QFP-48 Pin 14-15', 'CRITICAL', '0.42 mm bridge width',
    '[{"box_2d": [340, 420, 480, 560], "label": "Solder Bridge", "confidence": 0.98}]'::jsonb,
    'Excess stencil solder paste deposition during reflow stage 2.',
    'Scrap unit immediately. Flag reflow paste printer calibration #B4.',
    'IPC-A-610 Class 3 / ISO-9001:2015'
),
(
    'CNC Milled Aluminum Bracket', 'Metal', 'REWORK', 94.2, true,
    'Surface Burr on Chamfer Edge B', 'MEDIUM', '1.15 mm x 0.12 mm',
    '[{"box_2d": [210, 600, 290, 720], "label": "Machining Burr", "confidence": 0.94}]'::jsonb,
    'Worn carbide end-mill tooling on finishing pass #3.',
    'Perform manual deburring with Scotch-Brite rotary tool. Re-inspect before anodization.',
    'ISO-2768-m / ISO-9001:2015'
),
(
    'Precision Titanium Fastener M6', 'Aerospace', 'PASS', 99.8, false,
    'Clean / In-Tolerance', 'NONE', '0.00 mm deviation',
    '[]'::jsonb,
    'Nominal thread pitch and zero surface micro-fractures detected.',
    'No rework required. Direct release to packing queue.',
    'AS9100D / ISO-9001:2015'
)
ON CONFLICT DO NOTHING;
