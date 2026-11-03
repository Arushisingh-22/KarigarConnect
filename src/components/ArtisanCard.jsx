import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Users, ArrowUpRight, Coins } from 'lucide-react';

export const ArtisanCard = ({ artisan, onQuickSupport }) => {
  const percentRaised = Math.min(100, Math.round((artisan.amountRaised / artisan.fundingGoal) * 100));

  return (
    <motion.div
      whileHover={{ y: -7, transition: { duration: 0.25 } }}
      className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#D5B46A]/35 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col group h-full"
    >
      {/* Image Container with Badges & Hover Zoom */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={artisan.craftImage || artisan.avatar}
          alt={artisan.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#173B35]/90 text-[#FAF6F0] backdrop-blur-md border border-[#D5B46A]/35 shadow-xs">
            {artisan.category}
          </span>
        </div>

        {/* Verification Tick */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F5EFE4]/95 text-[#173B35] backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7794A]" />
            Verified
          </span>
        </div>

        {/* Artisan Avatar & Name Overlay */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-3 z-10">
          <img
            src={artisan.avatar}
            alt={artisan.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#D5B46A] shadow-md shrink-0"
          />
          <div className="text-white min-w-0">
            <h3 className="font-serif text-lg font-bold leading-tight truncate text-white drop-shadow-sm group-hover:text-[#D5B46A] transition-colors">
              {artisan.name}
            </h3>
            <p className="text-xs text-[#FAF6F0]/90 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#D5B46A] shrink-0" />
              <span className="truncate">{artisan.location}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs font-bold text-[#C7794A] uppercase tracking-wider mb-1.5">
            {artisan.craft}
          </p>
          <p className="text-xs text-[#263B36]/80 line-clamp-2 leading-relaxed">
            {artisan.shortDesc}
          </p>
        </div>

        {/* Funding Progress Section */}
        <div className="space-y-2 pt-2 border-t border-[#F5EFE4]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#173B35] text-sm">
              ₹{artisan.amountRaised.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-[#263B36]/60"> raised</span>
            </span>
            <span className="text-xs font-bold text-[#C7794A] bg-[#C7794A]/10 px-2 py-0.5 rounded-full border border-[#C7794A]/20">
              {percentRaised}% of ₹{artisan.fundingGoal.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-[#E7DEC9] h-2.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentRaised}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-r from-[#C7794A] to-[#D5B46A] h-full rounded-full"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#263B36]/70 pt-0.5">
            <span className="flex items-center gap-1 font-medium">
              <Users className="w-3 h-3 text-[#173B35]" />
              {artisan.backersCount} supporters
            </span>
            <span className="font-medium text-emerald-800">{artisan.loanTermMonths} Mo. Term (0% Int)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Link
            to={`/artisan/${artisan.id}`}
            className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-2xl border border-[#173B35]/30 hover:border-[#173B35] text-[#173B35] hover:bg-[#FAF6F0] text-xs font-bold transition-all"
          >
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onQuickSupport ? onQuickSupport(artisan) : null}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <Coins className="w-3.5 h-3.5 text-[#FAF6F0]" />
            <span>Support Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
