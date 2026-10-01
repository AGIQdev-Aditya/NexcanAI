import { z } from 'zod';
import { supabase, supabaseAdmin, supabasePublic } from '../config/supabase.js';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(2, 'Full name is required').default('QA Inspector'),
  role: z.string().default('Lead QA Inspector'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Register a new operator / inspector
 */
export async function handleRegister(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: parsed.error.issues[0]?.message || 'Validation error' });
    }

    const { email, password, full_name, role } = parsed.data;

    if (!supabaseAdmin) {
      return res.status(500).json({ success: false, error: 'Database authentication service unavailable.' });
    }

    // Create user in Supabase Auth with auto-confirmed email (zero delay for hackathon)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        role,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      },
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // Now auto-sign in to return access token
    const client = supabasePublic || supabaseAdmin;
    const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return res.status(200).json({
        success: true,
        message: 'Registration successful. Please log in.',
        user: { id: data.user.id, email: data.user.email, full_name, role },
      });
    }

    return res.status(201).json({
      success: true,
      token: signInData.session?.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name,
        role,
        avatar_url: data.user.user_metadata?.avatar_url,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Standard Email/Password login
 */
export async function handleLogin(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: parsed.error.issues[0]?.message || 'Validation error' });
    }

    const { email, password } = parsed.data;
    const client = supabasePublic || supabaseAdmin;

    if (!client) {
      return res.status(500).json({ success: false, error: 'Authentication client unavailable.' });
    }

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ success: false, error: error.message || 'Invalid credentials' });
    }

    const user = data.user;
    return res.status(200).json({
      success: true,
      token: data.session?.access_token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || 'QA Inspector',
        role: user.user_metadata?.role || 'Lead QA Engineer',
        avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Google OAuth sync / profile save
 */
export async function handleGoogleAuth(req, res, next) {
  try {
    const { email, full_name, avatar_url, google_id } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Google email is required.' });
    }

    // Return authenticated profile session
    const userProfile = {
      id: `google-${google_id || Date.now()}`,
      email,
      full_name: full_name || 'Google Verified Operator',
      role: 'Certified Optical QA Inspector',
      avatar_url: avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      provider: 'google',
    };

    return res.status(200).json({
      success: true,
      token: `g-jwt-${Buffer.from(email).toString('base64')}`,
      user: userProfile,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get current operator session
 */
export async function handleGetMe(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Bearer token required' });
    }

    const token = authHeader.split(' ')[1];

    if (token.startsWith('demo-')) {
      return res.status(200).json({
        success: true,
        user: {
          id: 'demo-aditya-lead',
          email: 'aditya.sharma@nexcan.ai',
          full_name: 'Aditya Sharma',
          role: 'Lead QA Engineer & Plant Architect',
          station: 'Optical Inspection Station #4',
          avatar_url: 'https://avatars.githubusercontent.com/u/264315813?v=4',
        },
      });
    }

    if (supabase) {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data?.user) {
        return res.status(200).json({
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || 'QA Inspector',
            role: data.user.user_metadata?.role || 'Lead QA Engineer',
            avatar_url: data.user.user_metadata?.avatar_url,
          },
        });
      }
    }

    return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
  } catch (error) {
    next(error);
  }
}

/**
 * 1-Click Demo Login for Hackathon Judges
 */
export async function handleDemoLogin(req, res) {
  const role = req.body?.role || 'lead';

  const demoUsers = {
    lead: {
      id: 'demo-aditya-lead',
      email: 'aditya.sharma@nexcan.ai',
      full_name: 'Aditya Sharma',
      role: 'Lead QA Engineer & Plant Lead',
      station: 'Station #4 (High-Speed SMT Line)',
      badge: 'LEVEL-3 CERTIFIED AUDITOR',
      avatar_url: 'https://avatars.githubusercontent.com/u/264315813?v=4',
    },
    operator: {
      id: 'demo-operator-01',
      email: 'operator@nexcan.ai',
      full_name: 'Vivek Gajdhane',
      role: 'Line Optical Inspector',
      station: 'Station #1 (PCB In-Line AOI)',
      badge: 'IPC-A-610 OPERATOR',
      avatar_url: 'https://avatars.githubusercontent.com/u/200355176?v=4',
    },
  };

  const selected = demoUsers[role] || demoUsers.lead;

  return res.status(200).json({
    success: true,
    token: `demo-token-${selected.id}-${Date.now()}`,
    user: selected,
  });
}
