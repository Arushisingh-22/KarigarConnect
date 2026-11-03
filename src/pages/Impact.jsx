import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Coins, 
  Heart, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { MotionReveal } from '../components/MotionReveal';

const IMPACT_AREAS = [
  {
    title: '1. Financial Inclusion',
    icon: Coins,
    desc: 'Connecting unbanked and collateral-poor rural artisans to formal zero-interest micro-credit, eliminating reliance on loan sharks charging 36–48% interest.',
    metrics: '0% Predatory Interest • Zero Collateral Required'
  },
  {
    title: '2. Artisan Business Growth',
    icon: TrendingUp,
    desc: 'Artisans procure pure, GI-certified raw materials in bulk at 30% lower cost, doubling production output and retaining 90%+ retail margins.',
    metrics: '2–3x Income Increase • Bulk Purchasing Power'
  },
  {
    title: '3. Social & Cultural Impact',
    icon: Heart,
    desc: 'Preventing the loss of ancient Indian craft lineages (like Rogan, Kani weaving, Pattachitra) by turning craft into dignified, profitable livelihoods for the youth.',
    metrics: '14 Traditional Crafts Safeguarded • Youth Apprenticeship'
  },
  {
    title: '4. Transparency & Trust',
    icon: ShieldCheck,
    desc: 'Autonomous Ethereum smart contract escrow guarantees that 100% of contributed capital reaches artisan bank accounts without intermediary leakage.',
    metrics: '100% Cryptographic Audit Trail • Zero Commission'
  }
];

const GEOGRAPHIC_CLUSTERS = [
  { state: 'Madhya Pradesh', hub: 'Chanderi', craft: 'Chanderi Silk & Zari Weaving', artisans: '64 Artisans' },
  { state: 'Uttar Pradesh', hub: 'Gorakhpur & Lucknow', craft: 'Terracotta Sculptures & Chikankari', artisans: '112 Artisans' },
  { state: 'Karnataka', hub: 'Channapatna', craft: 'Natural Lacquer Wooden Toys', artisans: '48 Artisans' },
  { state: 'Rajasthan', hub: 'Jaipur & Barmer', craft: 'Meenakari Jewellery & Ajrakh', artisans: '86 Artisans' },
  { state: 'Odisha', hub: 'Raghurajpur Heritage Village', craft: 'Pattachitra & Palm Leaf Inscription', artisans: '42 Artisans' },
  { state: 'Jammu & Kashmir', hub: 'Srinagar Valley', craft: 'Kani Shawl & Pashmina Weaving', artisans: '35 Artisans' },
  { state: 'Gujarat', hub: 'Kutch & Nirona', craft: 'Rogan Painting & Extra-Weft Kala Cotton', artisans: '53 Artisans' }
];

export const Impact = () => {
  return (
    <div className="space-y-20 py-10 pb-24">
      
      {/* 1. Header */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C7794A]" />
            <span>NOVEX Hackathon 2026 Impact Framework</span>
            <span className="text-[#D5B46A]">•</span>
            <span>Social Impact Category</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B35]">
            Empowering Communities. Preserving Culture.
          </h1>

          <p className="text-base sm:text-lg text-[#263B36]/80 max-w-2xl mx-auto leading-relaxed">
            How direct, transparent micro-patronage creates sustainable generational livelihoods across India’s traditional handicraft clusters.
          </p>

          {/* Clear Projected Outcomes Disclaimer */}
          <div className="p-3 bg-[#FAF6F0] border border-[#D5B46A]/40 rounded-xl inline-block text-xs text-[#263B36]/80 max-w-xl shadow-2xs">
            <strong className="text-[#C7794A]">Note on Metrics:</strong> Targets and impact statistics presented on this page are <strong>projected outcomes</strong> modeled for the NOVEX Hackathon presentation, not verified live financial audits.
          </div>
        </section>
      </MotionReveal>

      {/* 2. Projected Hackathon Outcomes Banner */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#173B35] text-white rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/30 shadow-warm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D5B46A]">
                Projected Horizons (Phase 1 Target)
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">
                Target Outcomes by 2026
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
              <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-1">
                <div className="text-3xl font-serif font-bold text-[#D5B46A]">500+</div>
                <div className="text-xs font-bold text-white">Artisans Funded</div>
                <p className="text-[10px] text-[#FAF6F0]/70">Projected Phase 1</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-1">
                <div className="text-3xl font-serif font-bold text-emerald-400">2–3x</div>
                <div className="text-xs font-bold text-white">Income Increase</div>
                <p className="text-[10px] text-[#FAF6F0]/70">Zero moneylender interest</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-1">
                <div className="text-3xl font-serif font-bold text-[#C7794A]">100%</div>
                <div className="text-xs font-bold text-white">Craft Preservation</div>
                <p className="text-[10px] text-[#FAF6F0]/70">GI lineage safeguarding</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-1">
                <div className="text-3xl font-serif font-bold text-[#D5B46A]">14+</div>
                <div className="text-xs font-bold text-white">Craft Clusters</div>
                <p className="text-[10px] text-[#FAF6F0]/70">Across 8 Indian states</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-1">
                <div className="text-3xl font-serif font-bold text-emerald-400">0%</div>
                <div className="text-xs font-bold text-white">Middlemen Cut</div>
                <p className="text-[10px] text-[#FAF6F0]/70">Immutable smart contracts</p>
              </motion.div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 3. Four Major Impact Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <MotionReveal direction="up" delay={0.1}>
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
              Core Strategic Pillars
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173B35]">
              Four Major Impact Dimensions
            </h2>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {IMPACT_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <MotionReveal key={idx} direction="up" delay={0.1 + idx * 0.1}>
                <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#D5B46A]/30 shadow-warm space-y-4 hover:border-[#C7794A]/60 transition-all h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] flex items-center justify-center text-[#C7794A] shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#173B35]">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#263B36]/80 leading-relaxed">
                    {area.desc}
                  </p>
                  <div className="pt-2 text-xs font-bold text-[#C7794A]">
                    {area.metrics}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* 4. Geographic Craft Map & State Distribution */}
      <MotionReveal direction="up" delay={0.15}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/30 shadow-warm space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                Grassroots Reach
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173B35]">
                Geographic Clusters Across India
              </h2>
              <p className="text-xs sm:text-sm text-[#263B36]/80">
                Verified artisan hubs active on the KarigarConnect protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {GEOGRAPHIC_CLUSTERS.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/20 space-y-1.5 transition-colors hover:border-[#C7794A]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#173B35] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C7794A]" />
                      {item.state}
                    </span>
                    <span className="text-[10px] font-bold text-[#C7794A] bg-[#C7794A]/10 px-2 py-0.5 rounded-full border border-[#C7794A]/20">
                      {item.artisans}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#173B35]">{item.hub}</div>
                  <div className="text-[11px] text-[#263B36]/70">{item.craft}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 5. Bottom Call to Action */}
      <MotionReveal direction="up" delay={0.2}>
        <section className="text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#173B35]">
            Be part of India's artisanal renaissance
          </h3>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <span>Support a Traditional Artisan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </MotionReveal>

    </div>
  );
};
