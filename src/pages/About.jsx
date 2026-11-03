import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Coins,
  Users
} from 'lucide-react';
import { MotionReveal } from '../components/MotionReveal';

export const About = () => {
  return (
    <div className="space-y-24 py-10 pb-24">
      
      {/* 1. Header Banner */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C7794A]" />
            <span>Our Mission & Story</span>
            <span className="text-[#D5B46A]">•</span>
            <span>NOVEX Hackathon 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B35] max-w-4xl mx-auto leading-tight">
            Protecting India’s Living Crafts from the Predatory Middleman Trap
          </h1>

          <p className="text-base sm:text-lg text-[#263B36]/80 max-w-2xl mx-auto leading-relaxed">
            India is home to over 7 million traditional artisans, yet over 80% live below the subsistence line. KarigarConnect replaces centuries of exploitative middlemen with direct, zero-interest peer micro-loans.
          </p>
        </section>
      </MotionReveal>

      {/* 2. The Problem Statement & Challenges */}
      <MotionReveal direction="up" delay={0.15}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/30 shadow-warm space-y-10">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                The Crisis at the Grassroots
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173B35]">
                Challenges Faced by Rural Indian Artisans
              </h2>
              <p className="text-sm text-[#263B36]/80 leading-relaxed">
                Centuries of oral knowledge and GI-certified craftsmanship are disappearing because rural creators cannot access honest working capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/20 space-y-3 hover:border-[#C7794A]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#173B35]">
                  Predatory Moneylenders
                </h3>
                <p className="text-xs text-[#263B36]/80 leading-relaxed">
                  Without formal credit scores or land titles as collateral, village weavers and potters are forced to borrow raw material funds from local moneylenders at <strong>36% to 48% annual interest</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/20 space-y-3 hover:border-[#C7794A]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#173B35]">
                  Middlemen Siphoning 60–80%
                </h3>
                <p className="text-xs text-[#263B36]/80 leading-relaxed">
                  Wholesale brokers and city boutique traders pay artisans meager daily wages of ₹120–₹180, while reselling authentic handlooms and handicrafts at 4x to 8x markup in urban metro markets.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/20 space-y-3 hover:border-[#C7794A]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#173B35]">
                  Generational Craft Abandonment
                </h3>
                <p className="text-xs text-[#263B36]/80 leading-relaxed">
                  Frustrated by persistent poverty and debt bondage, the younger generation is forced to migrate to urban construction sites, leaving ancient GI arts like Rogan, Pattachitra, and Kani weaving in peril.
                </p>
              </div>
            </div>

            {/* Before vs After Comparison Table */}
            <div className="pt-6 border-t border-[#FAF6F0] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173B35]">
                Economic Reality: Traditional vs KarigarConnect Model
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Old Broken Model */}
                <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    Old Middleman Supply Chain
                  </div>
                  <ul className="space-y-2 text-xs text-rose-950/80">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Artisan receives only 20–25% of retail price.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Moneylenders demand 36%+ annual interest compounding monthly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Zero direct relationship between craft lover and artisan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Consignment delays: payment withheld for 90–120 days.</span>
                    </li>
                  </ul>
                </div>

                {/* KarigarConnect Solution */}
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    KarigarConnect Direct Micro-Lending
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-950/80">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Artisan retains 90–95% of customer market value.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>0% interest micro-advances funded directly by urban patrons.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Cryptographic proof on Ethereum testnet guarantees 100% transparency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Instant UPI/crypto disbursement with flexible installment grace windows.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 3. Mission & Vision */}
      <MotionReveal direction="up" delay={0.2}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-[#173B35] text-white p-8 sm:p-10 rounded-3xl space-y-4 border border-[#D5B46A]/30 shadow-warm">
              <div className="w-12 h-12 rounded-2xl bg-[#D5B46A]/20 flex items-center justify-center text-[#D5B46A]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Our Mission
              </h2>
              <p className="text-sm text-[#FAF6F0]/85 leading-relaxed">
                To democratize access to honest working capital for rural Indian master artisans, dismantling monopolistic middleman structures through transparent blockchain micro-lending, while connecting conscious urban supporters directly to cultural heritage custodians.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#C7794A] text-white p-8 sm:p-10 rounded-3xl space-y-4 shadow-warm">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Our Vision
              </h2>
              <p className="text-sm text-white/90 leading-relaxed">
                An India where every GI-certified artisan community thrives with sovereign dignity, fair living wages, and financial resilience — where traditional handicraft is recognized not as museum relics, but as an economically vibrant, sustainable pillar of India's global heritage.
              </p>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 4. Financial Inclusion & Cultural Impact */}
      <MotionReveal direction="up" delay={0.25}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-[#FAF6F0] p-8 sm:p-12 rounded-3xl border border-[#D5B46A]/40 text-center max-w-4xl mx-auto space-y-6 shadow-2xs">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
              Social & Cultural Impact
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173B35]">
              Revitalizing Village Clusters, One Loom at a Time
            </h2>
            <p className="text-sm text-[#263B36]/80 leading-relaxed max-w-2xl mx-auto">
              When you fund a weaver in Chanderi, a potter in Gorakhpur, or an embroiderer in Lucknow, your capital goes 100% to certified raw materials and tool upgrades. As loans are repaid in modest installments, the repaid capital replenishes the pool to empower new artisans.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-2xl bg-[#173B35] hover:bg-[#0F2622] text-[#FAF6F0] font-bold text-sm transition-all"
              >
                Meet Our Artisans
              </Link>
              <Link
                to="/how-it-works"
                className="px-6 py-3 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>
      </MotionReveal>

    </div>
  );
};
