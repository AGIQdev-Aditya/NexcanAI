const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

/**
 * Health check
 */
export async function getHealthStatus() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

/**
 * Run Gemini Multimodal Vision Defect Inspection
 */
export async function inspectImage({ imageBase64, componentHint = '', category = 'General', mimeType = 'image/jpeg' }) {
  const res = await fetch(`${API_BASE}/inspect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64, componentHint, category, mimeType }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Inspection failed with status ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch historical inspection audit log
 */
export async function getAuditLogs({ limit = 50, verdict, category } = {}) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit);
  if (verdict) params.append('verdict', verdict);
  if (category) params.append('category', category);

  const res = await fetch(`${API_BASE}/audit?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch audit logs');
  return res.json();
}

/**
 * Fetch aggregate yield and defect analytics
 */
export async function getAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}
