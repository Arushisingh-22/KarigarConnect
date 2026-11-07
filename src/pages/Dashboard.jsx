
import React, { useState } from 'react';
import {
  Coins,
  Repeat,
  Download,
  Sparkles,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useFunding } from '../context/FundingContext';
import { MotionReveal } from '../components/MotionReveal';

export const Dashboard = () => {
  const { user, switchRole } = useAuth();
  const { artisans, userContributions, makeRepayment } = useFunding();

  // Dynamic user calculations
  const isCustomUser = user && user.isDemo === false;

  const myContributions = isCustomUser
    ? userContributions.filter(c => !c.isDefault)
    : userContributions;

  const totalContributed = isCustomUser
    ? myContributions.reduce(
        (sum, c) => sum + Number(c.amount || 0),
        0
      )
    : 18500;

  const [activeRoleView, setActiveRoleView] = useState(
    user?.role || 'SUPPORTER'
  );

  const [repaymentMessage, setRepaymentMessage] = useState(null);

  // Synchronize with user role
  const currentRole = user?.role || activeRoleView;

  // Primary demo artisan
  const artisanProfile = artisans[0];

  // Dynamic supporter metrics
  const uniqueArtisansBacked = new Set(
    myContributions.map(c => c.artisanId).filter(Boolean)
  ).size;

  const totalRepaidToWallet = myContributions.reduce(
    (sum, c) => sum + Number(c.repaidSoFar || 0),
    0
  );

  const estimatedLivesImpacted = uniqueArtisansBacked * 4;

  // Demo repayment handler
  const handleDemoRepayment = async () => {
    if (!artisanProfile) return;

    const res = await makeRepayment(artisanProfile.id, 6667);

    if (res) {
      setRepaymentMessage(
        `Repayment of ₹6,667 successfully submitted and recorded on escrow ledger (Demo Mode • Tx: ${res.txHash.slice(0, 10)}...)!`
      );

      setTimeout(() => setRepaymentMessage(null), 5000);
    }
  };

  // Certificate handler
  const handleDownloadCertificate = (artisanName, craft) => {
    alert(
      `📜 Certificate of Micro-Patronage downloaded!\n\nPatron: ${user?.name || 'Supporter'}\nBeneficiary: ${artisanName}\nCraft: ${craft}\nStatus: Certified on KarigarSmartEscrow.`
    );
  };

  return (
    <div className="space-y-12 py-10 pb-24">

      {/* 1. Header & Dual-Role Switcher */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#D5B46A]/40 shadow-warm flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-center gap-4">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
                }
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D5B46A] shadow-md shrink-0"
              />

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl font-bold text-[#173B35]">
                    {user?.name ||
                      (currentRole === 'ARTISAN'
                        ? 'Lakshmi Devi'
                        : 'Vikram Sen')}
                  </h1>

                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF6F0] text-[#C7794A] border border-[#D5B46A]/40">
                    {currentRole === 'ARTISAN'
                      ? 'Master Artisan'
                      : 'Urban Impact Supporter'}
                  </span>
                </div>

                <p className="text-xs text-[#263B36]/70 mt-1 font-mono">
                  Ethereum Wallet: {user?.walletAddress || '0x3A21...79b4'}
                </p>
              </div>
            </div>

            {/* Quick Dual Switch for Judges */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-[#173B35] block">
                  Dashboard View
                </span>

                <span className="text-[10px] text-[#263B36]/60">
                  Switch to test both personas
                </span>
              </div>

              <button
                onClick={switchRole}
                className="px-4 py-2.5 rounded-2xl bg-[#173B35] hover:bg-[#0F2622] text-[#FAF6F0] text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
              >
                <Repeat className="w-4 h-4 text-[#D5B46A]" />

                <span>
                  Switch to {currentRole === 'ARTISAN' ? 'Supporter' : 'Artisan'} View
                </span>
              </button>
            </div>

          </div>
        </section>
      </MotionReveal>

      {/* 2. ROLE BASED DASHBOARD CONTENT */}
      {currentRole === 'ARTISAN' ? (

        /* ================= ARTISAN DASHBOARD ================= */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Notification Alert if Repayment made */}
          <AnimatePresence>
            {repaymentMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{repaymentMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top KPI Metrics */}
          <MotionReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Profile Verification
                </span>

                <div className="font-serif text-3xl font-bold text-[#173B35] mt-1">
                  94% Complete
                </div>

                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  GI Registry Authenticated
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Micro-Loan Funding
                </span>

                <div className="font-serif text-3xl font-bold text-[#173B35] mt-1">
                  ₹{(artisanProfile?.amountRaised || 0).toLocaleString('en-IN')}
                </div>

                <p className="text-[11px] text-[#C7794A] font-semibold mt-1">
                  Goal: ₹{(artisanProfile?.fundingGoal || 0).toLocaleString('en-IN')}
                  {' '}
                  ({artisanProfile?.fundingGoal
                    ? Math.round(
                        (artisanProfile.amountRaised / artisanProfile.fundingGoal) * 100
                      )
                    : 0}%)
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Active Micro-Loans
                </span>

                <div className="font-serif text-3xl font-bold text-[#173B35] mt-1">
                  1 Active
                </div>

                <p className="text-[11px] text-[#263B36]/70 mt-1">
                  6-Month Zero-Interest Term
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Moneylender Cut Saved
                </span>

                <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">
                  ₹14,400
                </div>

                <p className="text-[11px] text-[#263B36]/70 mt-1">
                  Direct from 29 supporters
                </p>
              </div>

            </div>
          </MotionReveal>

          {/* Active Loan & Repayment Management Card */}
          <MotionReveal direction="up" delay={0.15}>
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/30 shadow-warm space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FAF6F0] pb-6">

                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                    Active Micro-Loan Escrow
                  </span>

                  <h2 className="font-serif text-2xl font-bold text-[#173B35]">
                    Chanderi Silk Warp & Zari Procurement Loan
                  </h2>

                  <p className="text-xs text-[#263B36]/70 mt-0.5">
                    Autonomous Smart Contract: {artisanProfile?.smartContractAddress || 'Not available'}
                  </p>
                </div>

                {/* Demo Action to Record Repayment */}
                <button
                  onClick={handleDemoRepayment}
                  disabled={!artisanProfile}
                  className="px-5 py-3 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Coins className="w-4 h-4" />

                  <span>Submit Demo Repayment (₹6,667)</span>
                </button>

              </div>

              {/* Repayment Progress Bar */}
              <div className="space-y-2">

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#173B35]">
                    Repayment Status: {artisanProfile?.repaymentStatus || 'Pending'}
                  </span>

                  <span className="text-[#C7794A]">
                    {artisanProfile?.repaymentProgressPercent || 33}% Completed
                  </span>
                </div>

                <div className="w-full bg-[#E7DEC9] h-3.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${artisanProfile?.repaymentProgressPercent || 33}%`
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-[#173B35] to-[#C7794A] h-full rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#263B36]/60">
                  <span>Next installment due in 18 days</span>

                  <span>Monthly Installment: ₹6,667 • 0% Interest</span>
                </div>

              </div>

              {/* Itemized Materials Status */}
              <div className="pt-4 border-t border-[#FAF6F0] space-y-3">

                <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B35]">
                  Raw Material Procurement & Workshop Inventory
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">

                  <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/20 flex items-center justify-between">
                    <span>Mulberry Silk Yarn (Grade A)</span>

                    <span className="font-bold text-emerald-700">
                      Delivered & Looped
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/20 flex items-center justify-between">
                    <span>Silver Electroplated Zari Bobbins</span>

                    <span className="font-bold text-emerald-700">
                      Stocked
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </MotionReveal>

        </section>

      ) : (

        /* ================= SUPPORTER DASHBOARD ================= */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Top Metrics */}
          <MotionReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Total Contributed */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Total Contributed
                </span>

                <div className="font-serif text-3xl font-bold text-[#173B35] mt-1">
                  ₹{totalContributed.toLocaleString('en-IN')}
                </div>

                <p className="text-[11px] text-[#C7794A] font-semibold mt-1">
                  Across {uniqueArtisansBacked} Craft{' '}
                  {uniqueArtisansBacked === 1 ? 'Cluster' : 'Clusters'}
                </p>
              </div>

              {/* Artisans Backed */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Artisans Backed
                </span>

                <div className="font-serif text-3xl font-bold text-[#173B35] mt-1">
                  {uniqueArtisansBacked}{' '}
                  {uniqueArtisansBacked === 1
                    ? 'Master Artisan'
                    : 'Master Artisans'}
                </div>

                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Zero-Interest Direct Escrow
                </p>
              </div>

              {/* Repaid to Wallet */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Repaid to Wallet
                </span>

                <div className="font-serif text-3xl font-bold text-[#173B35] mt-1">
                  ₹{totalRepaidToWallet.toLocaleString('en-IN')}
                </div>

                <p className="text-[11px] text-[#263B36]/60 mt-1">
                  {totalContributed > 0
                    ? `${Math.round(
                        (totalRepaidToWallet / totalContributed) * 100
                      )}% Principal Returned`
                    : 'Awaiting first contribution'}
                </p>
              </div>

              {/* Direct Social Impact */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
                <span className="text-xs text-[#263B36]/60 font-semibold uppercase">
                  Direct Social Impact
                </span>

                <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">
                  {estimatedLivesImpacted} Lives
                </div>

                <p className="text-[11px] text-[#263B36]/70 mt-1">
                  Apprentices & Family Members
                </p>
              </div>

            </div>
          </MotionReveal>

          {/* Supported Artisans Cards & History */}
          <MotionReveal direction="up" delay={0.15}>
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/30 shadow-warm space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FAF6F0] pb-6">

                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                    Patronage Portfolio
                  </span>

                  <h2 className="font-serif text-2xl font-bold text-[#173B35]">
                    Your Micro-Loans & Patronage Certificates
                  </h2>
                </div>

                <a
                  href="/explore"
                  className="px-4 py-2.5 rounded-2xl bg-[#FAF6F0] hover:bg-[#E7DEC9] text-[#173B35] text-xs font-bold border border-[#D5B46A]/40 transition-colors flex items-center gap-1.5 self-start shadow-2xs"
                >
                  <PlusCircle className="w-4 h-4 text-[#C7794A]" />

                  <span>Fund New Artisan</span>
                </a>

              </div>

              {/* List of Contributions / Empty State */}
              <div className="divide-y divide-[#FAF6F0] border border-[#E7DEC9] rounded-2xl overflow-hidden">

                {myContributions.length === 0 ? (

                  /* Empty State */
                  <div className="p-10 text-center space-y-3 bg-[#FAF6F0]/20">

                    <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#C7794A] flex items-center justify-center mx-auto">
                      <Coins className="w-5 h-5" />
                    </div>

                    <p className="font-serif font-bold text-base text-[#173B35]">
                      No micro-loans funded yet.
                    </p>

                    <p className="text-xs text-[#263B36]/70 max-w-sm mx-auto">
                      Explore verified rural artisans to provide zero-interest working capital and track your impact portfolio here.
                    </p>

                    <div className="pt-1">
                      <a
                        href="/explore"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C7794A] hover:bg-[#B56738] text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <span>Explore Artisans</span>

                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>

                ) : (

                  /* Contributions List */
                  myContributions.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-[#FAF6F0]/50 transition-colors"
                    >

                      <div className="space-y-1">

                        <div className="font-serif text-base font-bold text-[#173B35]">
                          {c.artisanName}
                        </div>

                        <div className="text-[#C7794A] font-semibold">
                          {c.craft}
                        </div>

                        <div className="text-[11px] text-[#263B36]/60 font-mono">
                          Tx Hash: {c.txHash || 'Not available'} • Backed on {c.date || 'Date unavailable'}
                        </div>

                      </div>

                      <div className="flex items-center gap-4">

                        <div className="text-right">

                          <div className="font-serif font-bold text-base text-[#173B35]">
                            ₹{Number(c.amount || 0).toLocaleString('en-IN')}
                          </div>

                          <div className="text-[10px] text-emerald-700 font-semibold">
                            ₹{Number(c.repaidSoFar || 0).toLocaleString('en-IN')} repaid
                          </div>

                        </div>

                        <button
                          onClick={() =>
                            handleDownloadCertificate(c.artisanName, c.craft)
                          }
                          className="px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#173B35] hover:text-white text-[#173B35] border border-[#D5B46A]/40 transition-colors flex items-center gap-1.5 font-bold text-[11px] cursor-pointer shadow-2xs active:scale-95"
                          title="Download Cryptographic Certificate"
                        >
                          <Download className="w-3.5 h-3.5" />

                          <span>Certificate</span>
                        </button>

                      </div>

                    </div>
                  ))

                )}

              </div>

            </div>
          </MotionReveal>

        </section>

      )}

    </div>
  );
};
