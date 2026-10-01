import { Router } from 'express';
import { env } from '../config/env.js';
import { supabase } from '../config/supabase.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Nexcan AI Visual Intelligence Engine',
    timestamp: new Date().toISOString(),
    gemini_connected: Boolean(env.GEMINI_API_KEY),
    supabase_connected: Boolean(supabase),
    model: env.GEMINI_MODEL,
    version: '1.0.0',
  });
});

export default router;
