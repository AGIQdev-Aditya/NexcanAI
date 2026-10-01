const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('nexcan_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Health check
 */
export async function getHealthStatus() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

export async function inspectImage({
  imageBase64,
  image,
  componentHint = '',
  component_name = '',
  category = 'General',
  mimeType = 'image/jpeg',
  userEmail,
  userId,
  tolerance_limit_mm,
} = {}) {
  const payloadImage = imageBase64 || image;
  const payloadHint = componentHint || component_name || 'General Industrial Component';

  const res = await fetch(`${API_BASE}/inspect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(userEmail ? { 'x-user-email': userEmail } : {}),
      ...(userId ? { 'x-user-id': userId } : {}),
    },
    body: JSON.stringify({
      imageBase64: payloadImage,
      image: payloadImage,
      componentHint: payloadHint,
      component_name: payloadHint,
      category,
      mimeType,
      userEmail,
      userId,
      tolerance_limit_mm,
    }),
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
export async function getAuditLogs({ limit = 50, verdict, category, userEmail } = {}) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit);
  if (verdict) params.append('verdict', verdict);
  if (category) params.append('category', category);
  if (userEmail) params.append('userEmail', userEmail);

  const res = await fetch(`${API_BASE}/audit?${params.toString()}`, {
    headers: { ...getAuthHeaders() }
  });
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
