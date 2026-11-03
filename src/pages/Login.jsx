import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { loginAs, loginWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('SUPPORTER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (r) => {
    loginAs(r);
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithCredentials(email || 'demo@karigarconnect.in', password, role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFFFFF] w-full max-w-lg rounded-3xl overflow-hidden shadow-warm-lg border border-[#D5B46A]/40">
        
        {/* Header */}
        <div className="bg-[#173B35] text-white p-8 pb-6 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0]/10 text-[#D5B46A] text-xs font-bold border border-white/10 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NOVEX Hackathon 2026 Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-bold">
            Sign In to KarigarConnect
          </h1>
          <p className="text-xs text-[#FAF6F0]/80">
            Access your artisan micro-loan records or supporter impact patronage dashboard.
          </p>

          {/* 1-Click Judge Access */}
          <div className="pt-4 border-t border-white/15 space-y-2">
            <div className="text-[11px] font-bold text-[#D5B46A]">
              ⚡ 1-Click Demo Login for Hackathon Judges:
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('ARTISAN')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-white text-[#173B35] text-xs font-bold text-left flex items-center gap-2 border border-[#D5B46A]/40 shadow-xs transition-transform active:scale-95"
              >
                <span className="text-lg">🎨</span>
                <div className="truncate">
                  <div className="font-bold">Lakshmi Devi</div>
                  <div className="text-[10px] text-[#263B36]/60 font-normal">Rural Artisan</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('SUPPORTER')}
                className="p-2.5 rounded-xl bg-[#C7794A] hover:bg-[#B56738] text-white text-xs font-bold text-left flex items-center gap-2 shadow-xs transition-transform active:scale-95"
              >
                <span className="text-lg">🤝</span>
                <div className="truncate">
                  <div className="font-bold">Vikram Sen</div>
                  <div className="text-[10px] text-[#FAF6F0]/80 font-normal">Urban Supporter</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <div className="flex rounded-xl bg-[#FAF6F0] p-1 border border-[#D5B46A]/30">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'login' ? 'bg-[#173B35] text-white shadow-xs' : 'text-[#263B36]/70'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'register' ? 'bg-[#173B35] text-white shadow-xs' : 'text-[#263B36]/70'
              }`}
            >
              Register New Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-[#173B35] uppercase tracking-wider block mb-1">
                Account Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('SUPPORTER')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    role === 'SUPPORTER'
                      ? 'border-[#C7794A] bg-[#C7794A]/10 text-[#C7794A] font-bold'
                      : 'border-[#E7DEC9] text-[#263B36]/70'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Supporter / Backer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ARTISAN')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    role === 'ARTISAN'
                      ? 'border-[#173B35] bg-[#173B35]/10 text-[#173B35] font-bold'
                      : 'border-[#E7DEC9] text-[#263B36]/70'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Rural Artisan
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#263B36]/70 block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder={role === 'ARTISAN' ? 'artisan@karigarconnect.in' : 'supporter@gmail.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden text-[#173B35]"
              />
            </div>

            <div>
              <label className="text-xs text-[#263B36]/70 block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden text-[#173B35]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#173B35] hover:bg-[#0F2622] text-[#FAF6F0] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>{tab === 'login' ? 'Sign In to Dashboard' : 'Create & Verify Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
