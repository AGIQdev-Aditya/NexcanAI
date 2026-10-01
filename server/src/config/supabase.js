import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

let adminClient = null;
let publicClient = null;

if (env.SUPABASE_URL) {
  if (env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      adminClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      console.log('✅ Supabase Admin initialized (Service Role):', env.SUPABASE_URL);
    } catch (err) {
      console.warn('⚠️ Supabase admin client warning:', err.message);
    }
  }

  if (env.SUPABASE_ANON_KEY) {
    try {
      publicClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      console.log('✅ Supabase Public Client initialized (Anon Key)');
    } catch (err) {
      console.warn('⚠️ Supabase public client warning:', err.message);
    }
  }
}

export const supabase = adminClient || publicClient;
export const supabaseAdmin = adminClient;
export const supabasePublic = publicClient;
