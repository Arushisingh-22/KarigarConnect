import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Heart, Globe, Sparkles } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#173B35] text-[#FAF6F0] border-t border-[#D5B46A]/30">
      {/* Decorative Traditional Border Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#C7794A] via-[#D5B46A] to-[#C7794A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#173B35] shadow-md">
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
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Karigar<span className="text-[#D5B46A]">Connect</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#D5B46A] font-semibold -mt-1">
                  Empowering Artisans Through Opportunity
                </p>
              </div>
            </div>

            <p className="text-sm text-[#FAF6F0]/80 leading-relaxed max-w-sm">
              A blockchain-backed micro-lending platform directly connecting rural Indian artisans with conscious urban supporters. Eliminating exploitative middlemen and preserving India's living cultural heritage.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#23524B] text-[#D5B46A] border border-[#D5B46A]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D5B46A]" />
                NOVEX Hackathon 2026 Project
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[#D5B46A] font-serif font-bold text-base tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              <li><Link to="/" className="hover:text-[#D5B46A] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#D5B46A] transition-colors">About Us</Link></li>
              <li><Link to="/explore" className="hover:text-[#D5B46A] transition-colors">Explore Artisans</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#D5B46A] transition-colors">How It Works</Link></li>
              <li><Link to="/impact" className="hover:text-[#D5B46A] transition-colors">Social Impact</Link></li>
              <li><Link to="/blockchain" className="hover:text-[#D5B46A] transition-colors">Blockchain Ledger</Link></li>
            </ul>
          </div>

          {/* Craft Categories */}
          <div className="space-y-3">
            <h4 className="text-[#D5B46A] font-serif font-bold text-base tracking-wide">
              Traditional Crafts
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              <li><Link to="/explore?category=Handloom" className="hover:text-[#D5B46A] transition-colors">Handloom & Weaving</Link></li>
              <li><Link to="/explore?category=Pottery" className="hover:text-[#D5B46A] transition-colors">Terracotta & Clay</Link></li>
              <li><Link to="/explore?category=Embroidery" className="hover:text-[#D5B46A] transition-colors">Chikankari & Zardozi</Link></li>
              <li><Link to="/explore?category=Woodcraft" className="hover:text-[#D5B46A] transition-colors">Channapatna Woodcraft</Link></li>
              <li><Link to="/explore?category=Handmade%20Jewellery" className="hover:text-[#D5B46A] transition-colors">Meenakari & Kundan</Link></li>
              <li><Link to="/explore?category=Traditional%20Crafts" className="hover:text-[#D5B46A] transition-colors">Pattachitra & Rogan</Link></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-3">
            <h4 className="text-[#D5B46A] font-serif font-bold text-base tracking-wide">
              Stay Connected
            </h4>
            <p className="text-xs text-[#FAF6F0]/80 leading-normal">
              Receive updates on newly verified artisan clusters and quarterly impact metrics.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#23524B] text-[#D5B46A] text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Thank you for joining our community!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-xs rounded-l-lg bg-[#0F2622] text-white border border-[#D5B46A]/30 focus:outline-hidden focus:border-[#D5B46A]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#C7794A] hover:bg-[#B56738] text-white rounded-r-lg text-xs font-semibold transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-[11px] text-[#FAF6F0]/60 space-y-1">
              <div>Contract: <span className="text-[#D5B46A] font-mono">0x742d...f44e</span></div>
              <div>Network: <span className="text-white font-medium">Ethereum Sepolia / Polygon</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D5B46A]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/70 gap-4">
          <p>© 2026 KarigarConnect. Built for NOVEX Hackathon 2026. Empowering Artisans Through Opportunity.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-[#D5B46A]">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 fill-[#C7794A] text-[#C7794A]" />
              <span>for Indian Artisans</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
