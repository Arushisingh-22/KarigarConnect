import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, ShieldCheck, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, loginAs, loginWithCredentials } = useAuth();
  
  const [tab, setTab] = useState(authModalTab || 'login');
  const [role, setRole] = useState('SUPPORTER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tab === 'register') {
      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password, role })
        });
        const data = await res.json();
        if (data.success) {
          loginWithCredentials(email, password, role);
        } else {
          alert(data.error || 'Registration failed');
        }
      } catch (err) {
        console.error(err);
        loginWithCredentials(email, password, role);
      }
    } else {
      loginWithCredentials(email, password, role);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FFFFFF] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#D5B46A]/40 relative"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F5EFE4] flex items-center justify-center text-[#263B36] hover:bg-[#C7794A] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#173B35] text-white p-6 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D5B46A] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NOVEX Hackathon 2026 Portal</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">
            Welcome to KarigarConnect
          </h2>
          <p className="text-xs text-[#FAF6F0]/80 mt-1">
            Sign in to manage artisan loans or monitor your social impact patronage.
          </p>

          {/* Quick 1-Click Demo Buttons for Hackathon Judges */}
          <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
            <p className="text-[11px] text-[#D5B46A] font-bold">
              ⚡ Instant 1-Click Demo Access for Judges:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAs('ARTISAN')}
                className="py-2 px-2.5 rounded-xl bg-[#FAF6F0] hover:bg-white text-[#173B35] text-xs font-bold text-left flex items-center gap-2 border border-[#D5B46A]/40 shadow-xs transition-transform active:scale-95"
              >
                <span className="text-base">🎨</span>
                <div className="leading-tight truncate">
                  <div className="truncate font-bold">Lakshmi Devi</div>
                  <div className="text-[10px] text-[#263B36]/60 font-normal">Rural Artisan</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => loginAs('SUPPORTER')}
                className="py-2 px-2.5 rounded-xl bg-[#C7794A] hover:bg-[#B56738] text-white text-xs font-bold text-left flex items-center gap-2 shadow-xs transition-transform active:scale-95"
              >
                <span className="text-base">🤝</span>
                <div className="leading-tight truncate">
                  <div className="truncate font-bold">Vikram Sen</div>
                  <div className="text-[10px] text-[#FAF6F0]/80 font-normal">Urban Supporter</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex rounded-xl bg-[#FAF6F0] p-1 mb-5 border border-[#D5B46A]/30">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'login' ? 'bg-[#173B35] text-white shadow-xs' : 'text-[#263B36]/70'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'register' ? 'bg-[#173B35] text-white shadow-xs' : 'text-[#263B36]/70'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="text-[11px] font-bold text-[#173B35] uppercase tracking-wider block mb-1">
                Account Type
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
{/* Full Name for Registration */}
{tab === 'register' && (
  <div>
    <label className="text-xs text-[#263B36]/70 block mb-1">Full Name</label>
    <input
      type="text"
      required
      placeholder="e.g. Shravani Sharma"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] text-[#173B35]"
    />
  </div>
)}
            {/* Email */}
            <div>
              <label className="text-xs text-[#263B36]/70 block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder={role === 'ARTISAN' ? 'artisan@karigarconnect.in' : 'supporter@gmail.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] text-[#173B35]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-[#263B36]/70 block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] text-[#173B35]"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#263B36]/70 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#C7794A]" />
                <span>Remember session</span>
              </label>
              <a href="#reset" onClick={(e) => e.preventDefault()} className="text-[#C7794A] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#173B35] hover:bg-[#0F2622] text-[#FAF6F0] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#173B35]/20"
            >
              <span>{tab === 'login' ? 'Sign In to KarigarConnect' : 'Register Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
