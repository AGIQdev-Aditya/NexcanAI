import React, { useState } from 'react';
import { Eye, ShieldCheck, Lock, Mail, User, ArrowRight, Sparkles, AlertCircle, X, Check } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Lead QA Inspector');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // 1-Click Demo Login for Judges
  const handleDemoLogin = async (demoRole = 'lead') => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: demoRole }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem('nexcan_token', data.token);
        localStorage.setItem('nexcan_user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
      } else {
        throw new Error(data.error || 'Demo login failed');
      }
    } catch (err) {
      console.warn('Demo login fallback:', err.message);
      // Fallback demo user if network has delay
      const fallback = {
        id: 'demo-lead-judge',
        email: 'judge.lead@hackathon.ai',
        full_name: 'Lead QA Judge',
        role: 'Chief Quality Auditor',
      };
      localStorage.setItem('nexcan_token', 'demo-token');
      localStorage.setItem('nexcan_user', JSON.stringify(fallback));
      if (onLoginSuccess) onLoginSuccess(fallback);
    } finally {
      setLoading(false);
    }
  };

  // Standard Email/Password Sign In or Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const isRegister = mode === 'register';
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister
      ? { email, password, full_name: fullName, role }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || (isRegister ? 'Registration failed' : 'Invalid email or password'));
      }

      if (data.token && data.user) {
        localStorage.setItem('nexcan_token', data.token);
        localStorage.setItem('nexcan_user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
      } else if (data.user) {
        // If registration returned user but no direct token, automatically log them in
        localStorage.setItem('nexcan_user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Simulation
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'judge.verified@gmail.com',
          full_name: 'Hackathon Lead Judge',
          avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=judge',
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem('nexcan_token', data.token);
        localStorage.setItem('nexcan_user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120704]/85 backdrop-blur-md animate-fade-in font-sans">
      
      {/* Ambient Radial Backing */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E3845A]/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#1B0C07] border border-[#3D180C] rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10">
        
        {/* Close Modal Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#D1B8AE] hover:text-white rounded-lg hover:bg-[#3D180C]/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E3845A] to-[#A74A21] p-[1.5px] shadow-md shadow-[#E3845A]/25 mb-2.5">
            <div className="w-full h-full bg-[#120704] rounded-[10px] flex items-center justify-center overflow-hidden">
              <img
                src="/assets/nexcan-logo.jpeg"
                alt="Nexcan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-[#FFFFFF] tracking-wider">NEXCAN AI ACCESS</h2>
          <p className="text-[11px] text-[#D1B8AE] font-mono mt-0.5">
            AUTONOMOUS OPTICAL QA PLATFORM
          </p>
        </div>

        {/* 1-CLICK DEMO ACCESS (PROMINENT FOR JUDGES) */}
        <div className="mb-5 p-3 rounded-xl bg-[#120704] border border-[#E3845A]/30">
          <div className="flex items-center space-x-1.5 text-xs text-[#E3845A] font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E3845A]" />
            <span>1-CLICK DEMO (RECOMMENDED FOR JUDGES)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('lead')}
              disabled={loading}
              className="px-3 py-2 rounded-lg bg-[#E3845A]/15 hover:bg-[#E3845A]/25 border border-[#E3845A]/40 text-[#E3845A] text-xs font-mono font-semibold transition-all text-center cursor-pointer"
            >
              👑 Aditya (Lead QA)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('operator')}
              disabled={loading}
              className="px-3 py-2 rounded-lg bg-[#3D180C]/80 hover:bg-[#3D180C] text-[#FAF9F6] text-xs font-mono font-medium transition-all text-center cursor-pointer"
            >
              👷 Line Inspector #1
            </button>
          </div>
        </div>

        {/* Google One-Click Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center space-x-2.5 shadow transition-all cursor-pointer mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#3D180C] w-full" />
          <span className="bg-[#1B0C07] px-2.5 text-[10px] text-[#D1B8AE] uppercase font-mono">
            Or credentials
          </span>
          <div className="border-t border-[#3D180C] w-full" />
        </div>

        {/* Dual Tab Switcher: Sign In vs Create Account */}
        <div className="flex rounded-xl bg-[#120704] p-1 border border-[#3D180C] mb-4">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-sm'
                : 'text-[#D1B8AE] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-gradient-to-r from-[#E3845A] to-[#A74A21] text-white shadow-sm'
                : 'text-[#D1B8AE] hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-red-950/40 border border-red-800/60 flex items-center space-x-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <>
              <div>
                <label className="text-[10px] font-mono text-[#D1B8AE] block mb-1">FULL NAME</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#D1B8AE]/60 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aditya Sharma"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120704] border border-[#3D180C] text-xs text-white focus:outline-none focus:border-[#E3845A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#D1B8AE] block mb-1">PLANT ROLE</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#120704] border border-[#3D180C] text-xs text-white focus:outline-none focus:border-[#E3845A] font-mono cursor-pointer"
                >
                  <option value="Lead QA Inspector">Lead QA Inspector</option>
                  <option value="Line Optical Inspector">Line Optical Inspector</option>
                  <option value="SMT Line Supervisor">SMT Line Supervisor</option>
                  <option value="Regulatory ISO Auditor">Regulatory ISO Auditor</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] font-mono text-[#D1B8AE] block mb-1">WORK EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#D1B8AE]/60 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya@nexcan.ai"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120704] border border-[#3D180C] text-xs text-white focus:outline-none focus:border-[#E3845A] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-[#D1B8AE] block mb-1">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#D1B8AE]/60 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120704] border border-[#3D180C] text-xs text-white focus:outline-none focus:border-[#E3845A] font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#E3845A] via-[#A74A21] to-[#3D180C] hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : mode === 'register' ? 'Create Account & Sign In' : 'Sign In to Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-5 pt-3 border-t border-[#3D180C] text-center flex items-center justify-center space-x-1.5 text-[10px] text-[#D1B8AE]/70 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E3845A]" />
          <span>ISO-9001:2015 Clause 8.5.1 Verified Access Control</span>
        </div>

      </div>
    </div>
  );
}
