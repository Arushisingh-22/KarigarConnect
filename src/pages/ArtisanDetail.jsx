import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  ShieldCheck, 
  Coins, 
  Users, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  PieChart, 
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useFunding } from '../context/FundingContext';
import { ContributionModal } from '../components/ContributionModal';
import { MotionReveal } from '../components/MotionReveal';

export const ArtisanDetail = () => {
  const { id } = useParams();
  const { getArtisanById } = useFunding();
  const artisan = getArtisanById(id);

  const [activeImage, setActiveImage] = useState(artisan?.gallery?.[0] || artisan?.craftImage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!artisan) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#173B35]">Artisan Not Found</h2>
        <Link to="/explore" className="text-[#C7794A] mt-4 inline-block font-bold">
          ← Back to Explore Artisans
        </Link>
      </div>
    );
  }

  const percentRaised = Math.min(100, Math.round((artisan.amountRaised / artisan.fundingGoal) * 100));

  return (
    <div className="space-y-12 py-8 pb-24">
      
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-[#263B36]/70">
          <Link to="/" className="hover:text-[#173B35]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D5B46A]" />
          <Link to="/explore" className="hover:text-[#173B35]">Artisans</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D5B46A]" />
          <span className="text-[#173B35] font-bold">{artisan.name}</span>
        </div>
      </div>

      {/* 2. Top Profile Showcase */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/30 shadow-warm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Gallery Left (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden border border-[#D5B46A]/30 shadow-md">
                  <img
                    src={activeImage}
                    alt={artisan.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#173B35]/90 text-white backdrop-blur-md border border-[#D5B46A]/40">
                      {artisan.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FAF6F0]/95 text-[#173B35] backdrop-blur-md shadow-xs">
                      <ShieldCheck className="w-4 h-4 text-[#C7794A]" />
                      {artisan.verificationBadge || 'Verified Master Artisan'}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {artisan.gallery && artisan.gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {artisan.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          activeImage === img ? 'border-[#C7794A] scale-105 shadow-md' : 'border-[#E7DEC9] opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Funding Status & Quick Action (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="flex items-center gap-3">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D5B46A] shadow-md shrink-0"
                  />
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173B35] leading-tight">
                      {artisan.name}
                    </h1>
                    <p className="text-xs text-[#263B36]/80 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C7794A]" />
                      <span>{artisan.location}</span>
                    </p>
                    <p className="text-xs text-[#C7794A] font-semibold mt-0.5">
                      {artisan.familyHeritage} • {artisan.experience}
                    </p>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#263B36]/80 leading-relaxed bg-[#FAF6F0] p-4 rounded-2xl border border-[#D5B46A]/20">
                  {artisan.shortDesc}
                </p>

                {/* Funding Progress Card */}
                <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/30 space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-[#263B36]/60 font-semibold uppercase tracking-wider">
                        Amount Raised
                      </div>
                      <div className="font-serif text-3xl font-extrabold text-[#173B35]">
                        ₹{artisan.amountRaised.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#263B36]/60 font-semibold uppercase tracking-wider">
                        Goal
                      </div>
                      <div className="text-sm font-bold text-[#263B36]">
                        ₹{artisan.fundingGoal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-[#E7DEC9] h-3 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentRaised}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-[#C7794A] to-[#D5B46A] h-full rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#C7794A]">
                      <span>{percentRaised}% Funded</span>
                      <span>₹{(artisan.fundingGoal - artisan.amountRaised).toLocaleString('en-IN')} needed</span>
                    </div>
                  </div>

                  {/* Micro Loan Key Specs */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E7DEC9] text-center text-xs">
                    <div>
                      <div className="text-[10px] text-[#263B36]/60">Supporters</div>
                      <div className="font-bold text-[#173B35] text-sm">{artisan.backersCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#263B36]/60">Loan Term</div>
                      <div className="font-bold text-[#173B35] text-sm">{artisan.loanTermMonths} Mo.</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#263B36]/60">Interest</div>
                      <div className="font-bold text-emerald-700 text-sm">0% Direct</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-base shadow-md shadow-[#C7794A]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Coins className="w-5 h-5 text-[#FAF6F0]" />
                  <span>Fund This Artisan</span>
                </motion.button>

                <div className="flex items-center justify-between text-[11px] text-[#263B36]/60 px-1">
                  <span className="flex items-center gap-1 font-mono">
                    Smart Contract: {artisan.smartContractAddress}
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    No Platform Fees
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 3. Detailed Story & Background */}
      <MotionReveal direction="up" delay={0.15}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Story Left (8 Cols) */}
            <div className="lg:col-span-8 bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/30 shadow-warm space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                  Living Heritage & Background
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173B35]">
                  The Story Behind the Craft
                </h2>
              </div>

              <p className="text-sm text-[#263B36]/90 leading-relaxed whitespace-pre-line">
                {artisan.fullStory}
              </p>

              {/* Community Impact Callout */}
              <div className="p-5 rounded-2xl bg-[#FAF6F0] border-l-4 border-[#C7794A] space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#173B35] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C7794A]" />
                  Community & Apprentice Impact
                </h4>
                <p className="text-xs text-[#263B36]/80 leading-relaxed">
                  {artisan.communityImpact}
                </p>
              </div>

              {/* Itemized Use of Funds Breakdown */}
              <div className="pt-6 border-t border-[#FAF6F0] space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#173B35] flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#C7794A]" />
                  Exact Use of Funds (Itemized Breakdown)
                </h3>
                <p className="text-xs text-[#263B36]/70">
                  Supporters know exactly where every rupee goes. Funds are milestone-released upon vendor invoice validation.
                </p>

                <div className="space-y-3">
                  {artisan.useOfFunds?.map((fund, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/20 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#173B35]">{fund.item}</span>
                        <span className="font-serif font-bold text-[#C7794A]">
                          ₹{fund.amount.toLocaleString('en-IN')} ({fund.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#E7DEC9] h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fund.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="bg-[#173B35] h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Repayment & Terms Right (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Repayment Terms Card */}
              <div className="bg-[#173B35] text-white p-6 sm:p-8 rounded-3xl border border-[#D5B46A]/30 shadow-warm space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#D5B46A]">
                    Zero-Interest Terms
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Repayment Logic
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-[#FAF6F0]/85">
                  <div className="pb-2 border-b border-white/10">
                    <div className="text-[10px] text-[#D5B46A]">Installment Schedule</div>
                    <div className="font-bold text-white mt-0.5">{artisan.repaymentTerms?.schedule}</div>
                  </div>

                  <div className="pb-2 border-b border-white/10">
                    <div className="text-[10px] text-[#D5B46A]">Grace Period</div>
                    <div className="font-bold text-white mt-0.5">{artisan.repaymentTerms?.gracePeriod}</div>
                  </div>

                  <div className="pb-2 border-b border-white/10">
                    <div className="text-[10px] text-[#D5B46A]">Collateral Requirement</div>
                    <div className="font-bold text-white mt-0.5">{artisan.repaymentTerms?.collateral}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#D5B46A]">Middleman Disintermediation</div>
                    <div className="font-bold text-white mt-0.5">{artisan.repaymentTerms?.middlemanSavings}</div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#FAF6F0]/70 leading-relaxed bg-[#0F2622] p-3 rounded-xl border border-white/10">
                  Repayments are recorded autonomously on the smart contract. Returned funds are available for supporters to re-lend or withdraw.
                </div>
              </div>

              {/* Trust and Safety Badges */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-warm space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#173B35]">
                  Verification & Trust Badges
                </h4>
                <ul className="space-y-2 text-xs text-[#263B36]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Physical cluster verified by local craft NGO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Aadhaar & Bank Account e-KYC completed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>GI-Tag Geographical Indication Authenticated</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>
      </MotionReveal>

      {/* Contribution Modal */}
      <ContributionModal
        artisan={artisan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
