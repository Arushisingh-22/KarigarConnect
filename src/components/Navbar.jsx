import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Menu, 
  X, 
  User, 
  Layers, 
  Coins, 
  ShieldCheck, 
  HeartHandshake, 
  Repeat,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, switchRole, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Explore Artisans', path: '/explore' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Impact', path: '/impact' },
    { name: 'Blockchain', path: '/blockchain' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#F5EFE4]/95 backdrop-blur-md shadow-warm border-b border-[#D5B46A]/30 py-0' 
        : 'bg-[#F5EFE4]/80 backdrop-blur-sm border-b border-[#D5B46A]/20'
    }`}>
      {/* Top Banner for Hackathon Context */}
      <div className="bg-[#173B35] text-[#FAF6F0] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 tracking-wide">
        <span className="inline-block w-2 h-2 rounded-full bg-[#D5B46A] animate-pulse"></span>
        <span>NOVEX Hackathon 2026 Project Showcase</span>
        <span className="text-[#D5B46A]">✦</span>
        <span className="hidden sm:inline">Blockchain-Backed Social Impact Micro-Lending</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#173B35] flex items-center justify-center text-[#D5B46A] shadow-md group-hover:scale-105 group-hover:bg-[#23524B] transition-all">
              <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#173B35] group-hover:text-[#C7794A] transition-colors">
                Karigar<span className="text-[#C7794A]">Connect</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-[#263B36]/70 font-semibold -mt-1">
                Empowering Artisans
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links with animated active pill */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    active ? 'text-[#173B35]' : 'text-[#263B36]/75 hover:text-[#173B35]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navActivePill"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className="absolute inset-0 bg-[#E7DEC9] rounded-xl -z-10 shadow-2xs border border-[#D5B46A]/25"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Quick Role Switcher for Hackathon Judges */}
            {user && (
              <button
                onClick={switchRole}
                title="Toggle between Supporter and Artisan demo persona"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] hover:bg-[#E7DEC9] transition-all shadow-2xs active:scale-95"
              >
                <Repeat className="w-3.5 h-3.5 text-[#C7794A]" />
                <span className="text-[#263B36]/60">Role:</span>
                <span className="text-[#173B35] capitalize">
                  {user.role === 'ARTISAN' ? '🎨 Artisan' : '🤝 Supporter'}
                </span>
              </button>
            )}

            {/* Auth Button or User Pill */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/30 text-xs font-semibold text-[#173B35] hover:border-[#C7794A] transition-all shadow-2xs"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#D5B46A]"
                  />
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-[#263B36]/70 hover:text-[#C7794A] px-2 py-1 transition-colors"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="text-xs font-bold text-[#173B35] hover:text-[#C7794A] px-3 py-2 transition-colors"
              >
                Log In
              </button>
            )}

            {/* Support / Get Started CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/funding"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C7794A] hover:bg-[#B56738] text-white text-xs font-bold shadow-md shadow-[#C7794A]/25 hover:shadow-lg transition-all"
              >
                <Coins className="w-4 h-4 text-[#FAF6F0]" />
                <span>Fund an Artisan</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#173B35] hover:bg-[#E7DEC9] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden bg-[#FAF6F0] border-b border-[#D5B46A]/30 px-4 pt-2 pb-6 space-y-2 shadow-lg"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive(link.path)
                    ? 'text-[#173B35] bg-[#E7DEC9] font-bold'
                    : 'text-[#263B36] hover:bg-[#F5EFE4]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#D5B46A]/20 flex flex-col gap-2.5">
            {user ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-sm font-bold text-[#173B35]">{user.name}</span>
                </div>
                <button
                  onClick={switchRole}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#E7DEC9] font-bold text-[#173B35]"
                >
                  Switch Role
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full text-center py-2.5 rounded-xl border border-[#173B35] text-[#173B35] font-bold text-sm"
              >
                Log In / Register
              </button>
            )}

            <Link
              to="/funding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C7794A] text-white font-bold text-sm shadow-md"
            >
              <Coins className="w-4 h-4" />
              <span>Fund an Artisan</span>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};
