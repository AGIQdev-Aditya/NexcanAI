import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

let supabaseClient = null;

if (env.SUPABASE_URL && (env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY)) {
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
  try {
    supabaseClient = createClient(env.SUPABASE_URL, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('✅ Supabase client initialized:', env.SUPABASE_URL);
  } catch (err) {
    console.warn('⚠️ Supabase client initialization warning:', err.message);
  }
} else {
  console.warn('⚠️ Supabase credentials missing; running with fallback storage');
}

export const supabase = supabaseClient;
