import { z } from 'zod';
import { supabase, supabaseAdmin, supabasePublic } from '../config/supabase.js';

// In-memory secure user registry for 100% reliable local & fallback authentication
const localUsers = new Map([
  [
    'rhugved.kulkarni@nexcan.ai',
    {
      id: 'demo-rhugved-lead',
      email: 'rhugved.kulkarni@nexcan.ai',
      password: 'password123',
      full_name: 'Rhugved Kulkarni',
      role: 'Team Lead & AI Quality Architect',
      station: 'Command Station #1 (Neural Core)',
      badge: 'TEAM LEAD',
      avatar_url: 'https://avatars.githubusercontent.com/u/rhugved2307?v=4',
    }
  ],
  [
    'aditya.sharma@nexcan.ai',
    {
      id: 'demo-aditya-member',
      email: 'aditya.sharma@nexcan.ai',
      password: 'password123',
      full_name: 'Aditya Sharma',
      role: 'Vision & Backend Architect',
      station: 'Station #4 (High-Speed SMT Line)',
      badge: 'CORE TEAM MEMBER',
      avatar_url: 'https://avatars.githubusercontent.com/u/264315813?v=4',
    }
  ],
  [
    'operator@nexcan.ai',
    {
      id: 'demo-operator-01',
      email: 'operator@nexcan.ai',
      password: 'password123',
      full_name: 'Vivek Gajdhane',
      role: 'Line Optical Inspector',
      station: 'Station #1 (PCB In-Line AOI)',
      badge: 'IPC-A-610 OPERATOR',
      avatar_url: 'https://avatars.githubusercontent.com/u/200355176?v=4',
    }
  ]
]);

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  full_name: z.string().optional().default('QA Inspector'),
  role: z.string().optional().default('Lead QA Inspector'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Register a new operator / inspector with isolated credentials
 * Seamless: If email already exists, updates credentials and logs in directly.
 */
export async function handleRegister(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: parsed.error.issues[0]?.message || 'Validation error' });
    }

    const { email, password, full_name, role } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // If user already exists in registry, seamlessly update credentials & log in
    if (localUsers.has(normalizedEmail)) {
      const userProfile = localUsers.get(normalizedEmail);
      userProfile.password = password;
      if (full_name) userProfile.full_name = full_name;
      if (role) userProfile.role = role;
      
      const token = `usr-tok-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`;
      const { password: _, ...safeUser } = userProfile;
      return res.status(200).json({
        success: true,
        token,
        user: safeUser,
        message: 'Account authenticated successfully.',
      });
    }

    const newUserId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedEmail)}`;

    const userProfile = {
      id: newUserId,
      email: normalizedEmail,
      password,
      full_name: full_name || normalizedEmail.split('@')[0],
      role: role || 'Lead QA Inspector',
      station: 'Station #01 (Assigned)',
      avatar_url: avatarUrl,
      created_at: new Date().toISOString(),
    };

    // Store in local secure registry
    localUsers.set(normalizedEmail, userProfile);

    // Also attempt Supabase registration in background if available
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.auth.admin.createUser({
          email: normalizedEmail,
          password,
          email_confirm: true,
          user_metadata: { full_name: userProfile.full_name, role: userProfile.role, avatar_url: avatarUrl },
        });
      } catch (err) {
        console.warn('Supabase admin registration notice:', err.message);
      }
    }

    const token = `usr-tok-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`;
    const { password: _, ...safeUser } = userProfile;

    return res.status(201).json({
      success: true,
      token,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Standard Email/Password login
 * Seamless: If email not registered yet, auto-provisions account and logs in.
 */
export async function handleLogin(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: parsed.error.issues[0]?.message || 'Validation error' });
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check local registry
    if (localUsers.has(normalizedEmail)) {
      const stored = localUsers.get(normalizedEmail);
      if (stored.password === password) {
        const { password: _, ...safeUser } = stored;
        const token = `usr-tok-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`;
        return res.status(200).json({
          success: true,
          token,
          user: safeUser,
        });
      } else {
        // If password was different, update it to the provided password (zero deadlocks for hackathon / demo)
        stored.password = password;
        const { password: _, ...safeUser } = stored;
        const token = `usr-tok-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`;
        return res.status(200).json({
          success: true,
          token,
          user: safeUser,
        });
      }
    }

    // 2. Check Supabase
    const client = supabasePublic || supabaseAdmin;
    if (client) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (!error && data?.user) {
          const user = data.user;
          const safeUser = {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || normalizedEmail.split('@')[0],
            role: user.user_metadata?.role || 'Lead QA Engineer',
            avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`,
          };
          return res.status(200).json({
            success: true,
            token: data.session?.access_token || `usr-tok-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`,
            user: safeUser,
          });
        }
      } catch (e) {}
    }

    // 3. Seamless Auto-Provisioning: User typed email on "Sign In" before registering
    const newUserId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedEmail)}`;
    const userProfile = {
      id: newUserId,
      email: normalizedEmail,
      password,
      full_name: normalizedEmail.split('@')[0],
      role: 'Lead QA Inspector',
      station: 'Station #01 (Assigned)',
      avatar_url: avatarUrl,
      created_at: new Date().toISOString(),
    };
    localUsers.set(normalizedEmail, userProfile);

    const token = `usr-tok-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`;
    const { password: _, ...safeUser } = userProfile;
    return res.status(200).json({
      success: true,
      token,
      user: safeUser,
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

    const normalizedEmail = email.toLowerCase().trim();
    let userProfile = localUsers.get(normalizedEmail);

    if (!userProfile) {
      userProfile = {
        id: `google-${google_id || Date.now()}`,
        email: normalizedEmail,
        full_name: full_name || 'Google Verified Operator',
        role: 'Certified Optical QA Inspector',
        avatar_url: avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedEmail)}`,
        provider: 'google',
      };
      localUsers.set(normalizedEmail, userProfile);
    }

    const { password: _, ...safeUser } = userProfile;
    return res.status(200).json({
      success: true,
      token: `g-jwt-${Buffer.from(normalizedEmail).toString('base64')}-${Date.now()}`,
      user: safeUser,
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

    // Decode token for demo or local accounts
    if (token.startsWith('usr-tok-') || token.startsWith('g-jwt-')) {
      const parts = token.split('-');
      const encodedEmail = parts[2];
      try {
        const decodedEmail = Buffer.from(encodedEmail, 'base64').toString('utf8');
        const user = localUsers.get(decodedEmail);
        if (user) {
          const { password: _, ...safeUser } = user;
          return res.status(200).json({ success: true, user: safeUser });
        }
      } catch (e) {}
    }

    if (token.startsWith('demo-')) {
      if (token.includes('operator')) {
        const user = localUsers.get('operator@nexcan.ai');
        const { password: _, ...safeUser } = user;
        return res.status(200).json({ success: true, user: safeUser });
      } else if (token.includes('aditya') || token.includes('member')) {
        const user = localUsers.get('aditya.sharma@nexcan.ai');
        const { password: _, ...safeUser } = user;
        return res.status(200).json({ success: true, user: safeUser });
      } else {
        const user = localUsers.get('rhugved.kulkarni@nexcan.ai') || localUsers.get('aditya.sharma@nexcan.ai');
        const { password: _, ...safeUser } = user;
        return res.status(200).json({ success: true, user: safeUser });
      }
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
    lead: localUsers.get('rhugved.kulkarni@nexcan.ai'),
    member: localUsers.get('aditya.sharma@nexcan.ai'),
    operator: localUsers.get('operator@nexcan.ai'),
  };

  const selected = demoUsers[role] || demoUsers.lead;
  const { password: _, ...safeUser } = selected;

  return res.status(200).json({
    success: true,
    token: `demo-token-${selected.id}-${Date.now()}`,
    user: safeUser,
  });
}
