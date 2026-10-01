import { env } from '../config/env.js';

/**
 * Analyzes an industrial component image using Google Gemini 3.8 Flash Vision.
 * Returns structured inspection diagnosis, bounding boxes, severity, and ISO compliance.
 */
export async function analyzeInspectionImage({ imageBase64, mimeType = 'image/jpeg', componentHint = 'General Industrial Component' }) {
  if (!env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  // Strip prefix if user passed full data URI (e.g. data:image/png;base64,...)
  let cleanBase64 = imageBase64;
  if (cleanBase64.includes(';base64,')) {
    const parts = cleanBase64.split(';base64,');
    cleanBase64 = parts[1];
    const mimeMatch = parts[0].match(/data:(.*?)$/);
    if (mimeMatch) mimeType = mimeMatch[1];
  }

  const prompt = `You are NEXCAN AI, an expert industrial computer vision quality assurance system certified to ISO-9001, AS9100D, and IPC-A-610 standards.
Analyze the provided high-resolution manufacturing/component image.
Component Hint: ${componentHint}

Inspect for microscopic or macroscopic defects such as:
- Solder bridges, cold solder joints, lifted pins, missing components (PCB/Electronics)
- Surface cracks, burrs, pitting, voids, porosity, weld splatter (Metal/Machining)
- Micro-fractures, delamination, foreign material, dimensional warping (Aerospace/Composite)
- Seal breaches, punctures, contamination (Packaging/Pharma)

Return STRICTLY a JSON object matching this schema (do NOT include Markdown ticks outside the JSON):
{
  "component_name": "string (detected or specified component name)",
  "category": "PCB" | "Metal" | "Aerospace" | "Packaging" | "General",
  "verdict": "PASS" | "REWORK" | "SCRAP",
  "confidence": number (between 70.0 and 99.9),
  "defect_detected": boolean,
  "defect_type": "string (e.g. 'Solder Bridge QFP Pin 12-13', 'Fatigue Micro-Crack', 'None')",
  "severity": "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "dimensions_mm": "string (e.g. '0.35 mm x 0.12 mm' or '0.00 mm')",
  "bounding_boxes": [
    {
      "box_2d": [ymin, xmin, ymax, xmax],
      "label": "string",
      "confidence": number
    }
  ],
  "root_cause": "string (technical diagnosis of manufacturing root-cause)",
  "rework_instructions": "string (concrete engineering step or disposal disposition)",
  "iso_standard": "string (e.g. 'ISO-9001:2015 Clause 8.5.1 / IPC-A-610 Class 3')"
}

Note on coordinates: box_2d must be normalized integers from 0 to 1000 where [ymin, xmin, ymax, xmax] define the box (0 = top/left, 1000 = bottom/right). If verdict is PASS, bounding_boxes should be [].`;

  // Candidate models: primary 3.8-flash, auto-fallback to 3.7-flash and 3.5-flash if high demand
  const candidateModels = [env.GEMINI_MODEL || 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.5-flash'];
  let lastError;

  for (let attempt = 0; attempt < candidateModels.length; attempt++) {
    const currentModel = candidateModels[attempt];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent`;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000); // 25s timeout

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': env.GEMINI_API_KEY,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: cleanBase64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        }),
      });

      clearTimeout(timeout);

      if (response.status === 503 || response.status === 429) {
        const errBody = await response.text();
        console.warn(`Gemini API ${currentModel} returned ${response.status}:`, errBody);
        lastError = new Error(`Gemini ${currentModel} returned ${response.status}`);
        continue; // Try next candidate model
      }

      if (!response.ok) {
        const errBody = await response.text();
        console.error(`Gemini Vision API error with ${currentModel} (${response.status}):`, errBody);
        throw new Error(`Gemini Vision API returned ${response.status}: ${errBody}`);
      }

      const json = await response.json();
      const candidate = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidate) {
        throw new Error(`Gemini Vision ${currentModel} did not return candidate text content`);
      }

      // Clean any markdown formatting if present
      const cleanJson = candidate.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        success: true,
        data: parsed,
        model: currentModel,
        raw: json,
      };
    } catch (error) {
      lastError = error;
      console.warn(`Attempt with ${currentModel} failed:`, error.message);
    }
  }

  throw lastError;
}
