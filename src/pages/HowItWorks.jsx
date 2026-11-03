import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, 
  ShieldCheck, 
  Coins, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ArrowDown,
  Repeat
} from 'lucide-react';
import { MotionReveal } from '../components/MotionReveal';

const STEPS = [
  {
    number: '01',
    title: 'Artisan Registration',
    subtitle: 'Profiles with craft heritage & authentic raw material goals',
    icon: UserCheck,
    description: 'Rural Indian artisans create simple, vernacular-enabled profiles showcasing their craft heritage, GI status, village location, and itemized working capital requirements (e.g. Mulberry silk yarn, electric potter’s wheel, vegetable dyes).',
    details: [
      'Zero paperwork friction with Aadhaar & UPI onboarding',
      'Itemized transparent breakdown of raw material bills',
      'Assisted by local craft clusters & self-help groups (SHGs)'
    ]
  },
  {
    number: '02',
    title: 'Profile Verification',
    subtitle: 'Authenticity validation & community credit assessment',
    icon: ShieldCheck,
    description: 'Every applicant is physically and digitally validated through verified master artisan credentials, Geographical Indication (GI) registries, and local craft NGO endorsements to prevent bad actors and maintain 100% trust.',
    details: [
      'Multi-sig community peer validation',
      'GI tag & master craftsperson badge verification',
      'Fraud-free artisan directory with geo-tagged workshop audits'
    ]
  },
  {
    number: '03',
    title: 'Funding by Supporters',
    subtitle: 'Urban patrons lend micro-capital directly without intermediaries',
    icon: Coins,
    description: 'Conscious urban supporters browse curated profiles and contribute small loans starting from ₹500 via instant UPI or Web3 testnet wallets. 100% of the capital is pooled into the escrow smart contract.',
    details: [
      '0% platform commission fee deduction',
      'Direct social impact: know the family you are empowering',
      'Real-time funding progress bars with instant cryptographic receipts'
    ]
  },
  {
    number: '04',
    title: 'Blockchain Record',
    subtitle: 'Autonomous escrow logic & tamper-resistant ledger',
    icon: Layers,
    description: 'The KarigarEscrow smart contract autonomously enforces terms: funds are unlocked upon funding completion and sent directly to the artisan’s verified bank/UPI account, logging an immutable audit record on the blockchain.',
    details: [
      'Solidity smart contract eliminates middleman discretion',
      'Publicly auditable on Ethereum Sepolia & Polygon testnets',
      'Zero risk of funds diversion or hidden administrative cuts'
    ]
  },
  {
    number: '05',
    title: 'Repayment & Growth',
    subtitle: 'Flexible seasonal installments & revolving community credit',
    icon: TrendingUp,
    description: 'Artisans purchase bulk raw materials, craft heirloom pieces, sell directly at fair prices (earning 3x higher profits), and repay in flexible monthly installments. Repaid funds return to supporter wallets or cycle forward.',
    details: [
      'Zero punitive penalties — built-in harvest grace periods',
      'Artisans build on-chain credit reputations for higher future loans',
      'Supporters can re-lend returned principal to foster perpetual impact'
    ]
  }
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-20 py-10 pb-24">
      
      {/* 1. Header */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C7794A]" />
            <span>Transparent 5-Step Architecture</span>
            <span className="text-[#D5B46A]">•</span>
            <span>From Loom to Patron</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B35]">
            How KarigarConnect Works
          </h1>

          <p className="text-base sm:text-lg text-[#263B36]/80 max-w-2xl mx-auto">
            A seamless, autonomous micro-lending model eliminating middlemen through verified peer-to-peer relationships and smart contract transparency.
          </p>
        </section>
      </MotionReveal>

      {/* 2. Interactive Five-Step Visual Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Step Selector Pills for Desktop */}
          <div className="hidden lg:grid grid-cols-5 gap-3">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#173B35] text-white border-[#173B35] shadow-md scale-102'
                      : 'bg-[#FFFFFF] text-[#263B36] border-[#D5B46A]/30 hover:bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${isActive ? 'text-[#D5B46A]' : 'text-[#C7794A]'}`}>
                      Step {step.number}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D5B46A]' : 'text-[#173B35]'}`} />
                  </div>
                  <div className="font-serif font-bold text-sm leading-tight truncate">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Box with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/40 shadow-warm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C7794A] font-bold text-xs border border-[#C7794A]/20">
                  <span>Phase {STEPS[activeStep].number} of 05</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#173B35]">
                  {STEPS[activeStep].title}
                </h2>
                <p className="text-xs font-semibold text-[#C7794A]">
                  {STEPS[activeStep].subtitle}
                </p>
                <p className="text-sm text-[#263B36]/85 leading-relaxed">
                  {STEPS[activeStep].description}
                </p>

                <div className="pt-2 space-y-2">
                  {STEPS[activeStep].details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#263B36]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-[#FAF6F0] rounded-3xl border border-[#D5B46A]/30 text-center space-y-3">
                <motion.div
                  key={`icon-${activeStep}`}
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  {React.createElement(STEPS[activeStep].icon, {
                    className: "w-16 h-16 text-[#C7794A]"
                  })}
                </motion.div>
                <div className="font-serif font-bold text-lg text-[#173B35]">
                  {STEPS[activeStep].title}
                </div>
                <p className="text-xs text-[#263B36]/70">
                  100% Automated by KarigarSmartEscrow protocol
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Connected Step Cards (Vertical Flow for Mobile / Full Overview) */}
          <div className="relative pt-6 space-y-8">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#D5B46A]/40 hidden md:block" />

            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <MotionReveal key={step.number} direction="up" delay={idx * 0.1}>
                  <div className="relative flex flex-col md:flex-row items-start gap-6">
                    {/* Step Circle Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#173B35] text-[#D5B46A] flex items-center justify-center font-serif font-bold text-lg shadow-md shrink-0 z-10 border border-[#D5B46A]/30">
                      {step.number}
                    </div>

                    {/* Step Card */}
                    <div className="flex-1 bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg font-bold text-[#173B35]">
                          {step.title}
                        </h3>
                        <Icon className="w-5 h-5 text-[#C7794A]" />
                      </div>
                      <p className="text-xs text-[#263B36]/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. The Lifecycle of ₹10,000 Micro-Loan */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-[#173B35] text-white rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/30 shadow-warm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D5B46A]">
                Impact Economics
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">
                The Lifecycle of a ₹10,000 Micro-Loan
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/80">
                See what happens when predatory middlemen are eliminated from the artisanal value chain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-2">
                <div className="text-2xl font-serif font-bold text-[#D5B46A]">₹10,000</div>
                <div className="text-xs font-bold text-white">Contributed by You</div>
                <p className="text-[11px] text-[#FAF6F0]/70">Zero deductions. Transferred via smart escrow contract.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-2">
                <div className="text-2xl font-serif font-bold text-[#C7794A]">₹10,000</div>
                <div className="text-xs font-bold text-white">Raw Material Purchase</div>
                <p className="text-[11px] text-[#FAF6F0]/70">Artisan buys bulk natural silk/clay directly from primary producers.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-2">
                <div className="text-2xl font-serif font-bold text-emerald-400">₹24,000</div>
                <div className="text-xs font-bold text-white">Direct Craft Realization</div>
                <p className="text-[11px] text-[#FAF6F0]/70">Artisan sells direct to customers, earning 2.5x more than broker wages.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F2622] border border-white/10 space-y-2">
                <div className="text-2xl font-serif font-bold text-[#D5B46A]">₹10,000</div>
                <div className="text-xs font-bold text-white">Principal Returned</div>
                <p className="text-[11px] text-[#FAF6F0]/70">Repaid in 4 installments of ₹2,500. Ready to fund the next artisan.</p>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 4. Bottom Action */}
      <MotionReveal direction="up" delay={0.15}>
        <section className="text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#173B35]">
            Ready to experience direct social impact?
          </h3>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <span>Find an Artisan to Back</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </MotionReveal>

    </div>
  );
};
