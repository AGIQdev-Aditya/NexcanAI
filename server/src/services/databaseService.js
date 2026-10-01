import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

// In-memory fallback cache to ensure 100% uptime even if database migration is pending
const memoryInspections = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    batch_id: 'BATCH-20261001-0940',
    component_name: 'High-Density GPU Interposer Board',
    category: 'PCB',
    verdict: 'SCRAP',
    confidence: 98.6,
    defect_detected: true,
    defect_type: 'Micro-Bridging on BGA Ball Grid Array',
    severity: 'CRITICAL',
    dimensions_mm: '0.28 mm bridge width',
    bounding_boxes: [{ box_2d: [350, 410, 520, 580], label: 'BGA Solder Bridge', confidence: 0.98 }],
    root_cause: 'Thermal profile overshoot during secondary convection zone #4.',
    rework_instructions: 'Non-reworkable high-density array. Route to metallurgical failure analysis.',
    iso_standard: 'IPC-A-610 Class 3 / ISO-9001:2015',
    inspector_id: 'NEXCAN-OPTICAL-01',
    image_url: null,
  },
  {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    batch_id: 'BATCH-20261001-0925',
    component_name: 'Aero-Turbine Compressor Blade Chamfer',
    category: 'Aerospace',
    verdict: 'REWORK',
    confidence: 95.1,
    defect_detected: true,
    defect_type: 'Edge Micro-Burr on Leading Edge',
    severity: 'MEDIUM',
    dimensions_mm: '0.85 mm x 0.09 mm',
    bounding_boxes: [{ box_2d: [210, 620, 310, 740], label: 'Micro-Burr', confidence: 0.95 }],
    root_cause: 'Excess tool wear index (>85%) on 5-axis CNC endmill.',
    rework_instructions: 'Precision automated micro-abrasive rotary buffing at Station 4B.',
    iso_standard: 'AS9100D Clause 8.4 / ISO-9001:2015',
    inspector_id: 'NEXCAN-OPTICAL-01',
    image_url: null,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    batch_id: 'BATCH-20261001-0900',
    component_name: 'Medical Syringe Blister Seal Pack',
    category: 'Packaging',
    verdict: 'PASS',
    confidence: 99.4,
    defect_detected: false,
    defect_type: 'None (Hermetic Seal Intact)',
    severity: 'NONE',
    dimensions_mm: '0.00 mm',
    bounding_boxes: [],
    root_cause: 'Heat seal thermal cycle within optimal 145°C tolerance.',
    rework_instructions: 'Direct automated feed into primary sterile packing crate.',
    iso_standard: 'ISO 13485 / ISO-9001:2015',
    inspector_id: 'NEXCAN-OPTICAL-01',
    image_url: null,
  },
];

/**
 * Uploads an inspection image to Supabase Storage and returns its public CDN URL.
 */
export async function uploadInspectionImage(id, imageBufferOrBase64, mimeType = 'image/jpeg') {
  if (!supabase) return null;

  try {
    let buffer;
    if (Buffer.isBuffer(imageBufferOrBase64)) {
      buffer = imageBufferOrBase64;
    } else if (typeof imageBufferOrBase64 === 'string') {
      let clean = imageBufferOrBase64;
      if (clean.includes(';base64,')) {
        clean = clean.split(';base64,')[1];
      }
      buffer = Buffer.from(clean, 'base64');
    } else {
      return null;
    }

    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg';
    const filePath = `${id}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('inspection-images')
      .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.warn('⚠️ Supabase image upload notice:', uploadError.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('inspection-images')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.warn('⚠️ Image upload exception:', err.message);
    return null;
  }
}

export async function saveInspectionRecord(record) {
  const item = {
    id: record.id || uuidv4(),
    created_at: record.created_at || new Date().toISOString(),
    batch_id: record.batch_id || `BATCH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Date.now().toString().slice(-4)}`,
    component_name: record.component_name || 'Industrial Component',
    category: record.category || 'General',
    verdict: record.verdict || 'PASS',
    confidence: Number(record.confidence) || 95.0,
    defect_detected: Boolean(record.defect_detected),
    defect_type: record.defect_type || 'None',
    severity: record.severity || 'NONE',
    dimensions_mm: record.dimensions_mm || '0.00 mm',
    bounding_boxes: record.bounding_boxes || [],
    root_cause: record.root_cause || '',
    rework_instructions: record.rework_instructions || '',
    iso_standard: record.iso_standard || 'ISO-9001:2015 Clause 8.5.1',
    inspector_id: record.inspector_id || record.user_email || 'NEXCAN-CV-01',
    user_id: record.user_id || 'guest',
    user_email: record.user_email || record.inspector_id || 'guest@nexcan.ai',
    image_url: record.image_url || null,
    raw_response: record.raw_response || {},
  };

  // Always save to memory store
  memoryInspections.unshift(item);

  // If Supabase is connected, attempt persistence to PostgreSQL
  if (supabase) {
    try {
      const payload = {
        id: item.id,
        created_at: item.created_at,
        batch_id: item.batch_id,
        component_name: item.component_name,
        category: item.category,
        verdict: item.verdict,
        confidence: item.confidence,
        defect_detected: item.defect_detected,
        defect_type: item.defect_type,
        severity: item.severity,
        dimensions_mm: item.dimensions_mm,
        bounding_boxes: item.bounding_boxes,
        root_cause: item.root_cause,
        rework_instructions: item.rework_instructions,
        iso_standard: item.iso_standard,
        inspector_id: item.user_email || item.inspector_id,
        image_url: item.image_url,
      };

      const { data, error } = await supabase
        .from('inspections')
        .insert([payload])
        .select();

      if (error) {
        console.warn('⚠️ Supabase persistence notice (using memory fallback):', error.message);
      } else if (data?.[0]) {
        return data[0];
      }
    } catch (err) {
      console.warn('⚠️ Supabase insert exception:', err.message);
    }
  }

  return item;
}

export async function getInspectionHistory({ limit = 50, verdict, category, userEmail, userId } = {}) {
  if (supabase) {
    try {
      let query = supabase
        .from('inspections')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (verdict) query = query.eq('verdict', verdict);
      if (category) query = query.eq('category', category);
      if (userEmail && userEmail !== 'all') {
        query = query.eq('inspector_id', userEmail);
      }

      const { data, error } = await query;
      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('⚠️ Supabase fetch warning, serving local cache:', err.message);
    }
  }

  // Filter local memory store
  let filtered = [...memoryInspections];
  if (verdict) filtered = filtered.filter((i) => i.verdict === verdict);
  if (category) filtered = filtered.filter((i) => i.category === category);
  if (userEmail && userEmail !== 'all') {
    // Strictly isolate to the requesting user's private records
    filtered = filtered.filter((i) => i.user_email === userEmail || i.inspector_id === userEmail);
  }
  return filtered.slice(0, limit);
}

export async function getAnalyticsMetrics() {
  const list = await getInspectionHistory({ limit: 100 });
  const total = list.length;

  if (total === 0) {
    return {
      total_inspections: 0,
      pass_count: 0,
      rework_count: 0,
      scrap_count: 0,
      yield_rate: 100.0,
      defect_rate: 0.0,
      cost_saved_usd: 0,
      defect_breakdown: {},
    };
  }

  const passCount = list.filter((i) => i.verdict === 'PASS').length;
  const reworkCount = list.filter((i) => i.verdict === 'REWORK').length;
  const scrapCount = list.filter((i) => i.verdict === 'SCRAP').length;

  const yieldRate = Number(((passCount / total) * 100).toFixed(1));
  const defectRate = Number((((reworkCount + scrapCount) / total) * 100).toFixed(1));

  // Estimate scrap prevention cost savings ($450 avg per defect caught early)
  const costSavedUsd = (reworkCount + scrapCount) * 450;

  const defectBreakdown = {};
  for (const item of list) {
    if (item.defect_detected && item.defect_type && item.defect_type !== 'None') {
      const type = item.defect_type;
      defectBreakdown[type] = (defectBreakdown[type] || 0) + 1;
    }
  }

  return {
    total_inspections: total,
    pass_count: passCount,
    rework_count: reworkCount,
    scrap_count: scrapCount,
    yield_rate: yieldRate,
    defect_rate: defectRate,
    cost_saved_usd: costSavedUsd,
    defect_breakdown: defectBreakdown,
  };
}
