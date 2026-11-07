import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  Users, 
  TrendingUp, 
  Lock, 
  Layers, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  Award,
  ChevronRight,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import { useFunding } from '../context/FundingContext';
import { ArtisanCard } from '../components/ArtisanCard';
import { StatCounter } from '../components/StatCounter';
import { ContributionModal } from '../components/ContributionModal';
import { InfiniteArtisanGallery } from '../components/InfiniteArtisanGallery';
import { MotionReveal } from '../components/MotionReveal';

export const Home = () => {
  const { artisans, transactions } = useFunding();
  const [selectedArtisanForModal, setSelectedArtisanForModal] = useState(null);

  const featuredArtisans = artisans.slice(0, 3);

  // Subtle Mouse Parallax Effect for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxBg1X = useTransform(smoothMouseX, [-300, 300], [-15, 15]);
  const parallaxBg1Y = useTransform(smoothMouseY, [-300, 300], [-15, 15]);

  const parallaxBg2X = useTransform(smoothMouseX, [-300, 300], [20, -20]);
  const parallaxBg2Y = useTransform(smoothMouseY, [-300, 300], [20, -20]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  // Heading word-by-word animation variants
  const headingWordsPart1 = ['Empowering', 'Artisans.'];
  const headingWordsPart2 = ['Connecting', 'Opportunities.'];

  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const headingWordVariants = {
    hidden: { opacity: 0, y: 35, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-hidden" onMouseMove={handleMouseMove}>
      
      {/* 1. HERO SECTION WITH RICH PARALLAX & WORD-BY-WORD ANIMATION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        
        {/* Subtle Parallax Background Orbs */}
        <motion.div 
          style={{ x: parallaxBg1X, y: parallaxBg1Y }}
          className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-gradient-to-r from-[#C7794A]/12 via-[#D5B46A]/15 to-transparent blur-3xl pointer-events-none rounded-full" 
        />
        <motion.div 
          style={{ x: parallaxBg2X, y: parallaxBg2Y }}
          className="absolute top-1/3 right-10 w-[450px] h-[400px] bg-gradient-to-l from-[#173B35]/15 via-[#D5B46A]/12 to-transparent blur-3xl pointer-events-none rounded-full" 
        />

        {/* Decorative Traditional Jaali Motifs Floating */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-12 -right-12 w-64 h-64 border border-[#D5B46A]/15 rounded-full pointer-events-none opacity-40 hidden xl:block"
        >
          <div className="absolute inset-4 border border-dashed border-[#C7794A]/20 rounded-full" />
          <div className="absolute inset-10 border border-[#173B35]/10 rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text with Word-by-Word Reveal */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold shadow-2xs backdrop-blur-md"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#C7794A] animate-pulse" />
                <span className="tracking-wide uppercase text-[11px] text-[#C7794A]">Social Impact Micro-Lending</span>
                <span className="text-[#D5B46A]">✦</span>
                <span className="text-[#263B36]/80 font-medium">NOVEX Hackathon 2026</span>
              </motion.div>

              {/* Main Heading Word-by-Word */}
              <motion.h1 
                variants={headingContainerVariants}
                initial="hidden"
                animate="visible"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B35] leading-[1.12] tracking-tight"
              >
                <span className="inline-block mr-2">
                  {headingWordsPart1.map((word, i) => (
                    <motion.span 
                      key={`w1-${i}`} 
                      variants={headingWordVariants} 
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <br className="hidden sm:inline" />
                <span className="inline-block text-[#C7794A] underline decoration-[#D5B46A]/50 decoration-wavy decoration-2">
                  {headingWordsPart2.map((word, i) => (
                    <motion.span 
                      key={`w2-${i}`} 
                      variants={headingWordVariants} 
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg text-[#263B36]/85 leading-relaxed max-w-2xl font-normal"
              >
                KarigarConnect directly bridges rural Indian craftspeople with conscious urban supporters. Powered by Ethereum smart contracts, we eliminate predatory loan sharks charging 36–48% interest so master artisans retain 90%+ retail value and repay through flexible zero-interest installments.
              </motion.p>

              {/* Animated CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/explore"
                    className="group relative px-7 py-3.5 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm shadow-md shadow-[#C7794A]/30 hover:shadow-lg hover:shadow-[#C7794A]/40 transition-all flex items-center gap-2 overflow-hidden"
                  >
                    <span className="relative z-10">Explore Artisans</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Animated Shimmer Line */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/how-it-works"
                    className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FAF6F0] border border-[#173B35]/25 text-[#173B35] font-bold text-sm shadow-xs hover:border-[#173B35] transition-all flex items-center gap-2"
                  >
                    <Coins className="w-4 h-4 text-[#C7794A]" />
                    <span>Become a Supporter</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Mini Trust Highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-4 grid grid-cols-3 gap-3 border-t border-[#D5B46A]/35 max-w-lg"
              >
                <div>
                  <div className="font-serif font-bold text-xl text-[#173B35]">0%</div>
                  <div className="text-[11px] text-[#263B36]/70 leading-tight">Middlemen Cut</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-xl text-[#173B35]">100%</div>
                  <div className="text-[11px] text-[#263B36]/70 leading-tight">Direct Disbursement</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-xl text-[#173B35]">Smart Escrow</div>
                  <div className="text-[11px] text-[#263B36]/70 leading-tight">Ethereum Backed</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Visual Composition with Artisans & Multi-Layer Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Visual Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D5B46A]/50 bg-white group">
                  <img
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
                    alt="Indian artisan crafting traditional pottery"
                    className="w-full h-96 sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2622]/90 via-[#173B35]/30 to-transparent" />
                  
                  {/* Overlay text */}
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D5B46A] text-[#173B35] uppercase tracking-wider mb-2 inline-block shadow-xs">
                      GI Tagged Heritage Custodian
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Rameshwar Prajapati</h3>
                    <p className="text-xs text-[#FAF6F0]/90 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D5B46A]" />
                      <span>Gorakhpur, Uttar Pradesh • Master Terracotta Sculptor</span>
                    </p>
                  </div>
                </div>

                {/* Floating Card 1: Live Funding Progress (Top Left) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#D5B46A]/40 shadow-warm-lg max-w-[220px] hidden sm:block z-20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#173B35] flex items-center justify-center text-[#D5B46A] shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#263B36]/60 font-medium">Autonomous Escrow</div>
                      <div className="text-xs font-bold text-[#173B35]">₹33,500 Raised</div>
                    </div>
                  </div>
                  <div className="w-full bg-[#E7DEC9] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#C7794A] to-[#D5B46A] h-full w-[84%] rounded-full" />
                  </div>
                  <div className="text-[10px] text-[#C7794A] font-bold mt-1 text-right">
                    84% of ₹40,000 goal
                  </div>
                </motion.div>

                {/* Floating Card 2: Blockchain Verification (Bottom Right) */}
                <motion.div
                  animate={{ y: [0, 9, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#173B35] text-white p-4 rounded-2xl border border-[#D5B46A]/40 shadow-warm-lg max-w-[230px] z-20"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#D5B46A] shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#D5B46A]">Zero Moneylender Debt</div>
                      <div className="text-[10px] text-[#FAF6F0]/80">100% Repayment Guarantee</div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-[#FAF6F0]/60 font-mono flex items-center justify-between">
                    <span>{transactions.length > 0 ? `Block #${transactions[0].blockNumber}` : 'Autonomous Escrow (Demo)'}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Verified
                    </span>
                  </div>
                </motion.div>

                {/* Floating Card 3: Urban Patrons Community (Middle Left) */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  className="absolute top-1/2 -left-8 -translate-y-1/2 bg-[#FAF6F0] p-3 rounded-2xl border border-[#D5B46A]/40 shadow-warm-lg hidden md:flex items-center gap-3 max-w-[200px] z-20"
                >
                  <div className="flex -space-x-2 shrink-0">
                    <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="supporter" />
                    <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="supporter" />
                    <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="supporter" />
                  </div>
                  <div className="text-[10px] leading-tight text-[#173B35]">
                    <span className="font-bold block">3,840+ Supporters</span>
                    <span className="text-[#263B36]/60">Peer micro-lenders</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. INFINITE AUTO-SCROLLING ARTISAN IMAGE GALLERY (VERY IMPORTANT FEATURE) */}
      <InfiniteArtisanGallery />

      {/* 3. IMPACT STATISTICS SECTION WITH SPRING ANIMATIONS */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter
              value={4850000}
              prefix="₹"
              label="Capital Disbursed"
              subtext="Zero interest micro-advances"
              icon={Coins}
              delay={0}
            />
            <StatCounter
              value={99.2}
              suffix="%"
              label="Repayment Rate"
              subtext="Community peer-supported trust"
              icon={TrendingUp}
              delay={0.1}
            />
            <StatCounter
              value={520}
              suffix="+"
              label="Artisans Empowered"
              subtext="Across 14 cultural hubs"
              icon={Users}
              delay={0.2}
            />
            <StatCounter
              value={0}
              suffix="%"
              label="Middlemen Margin"
              subtext="Direct peer-to-peer routing"
              icon={Lock}
              delay={0.3}
            />
          </div>
        </section>
      </MotionReveal>

      {/* 4. FEATURED ARTISANS SECTION WITH STAGGERED REVEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <MotionReveal direction="up" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                Verified Craft Custodians
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173B35] mt-1">
                Featured Funding Requests
              </h2>
              <p className="text-sm text-[#263B36]/80 mt-1 max-w-xl">
                Meet the rural artisans seeking small working capital loans to procure authentic raw materials without loan-shark interest.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#C7794A] hover:text-[#B56738] group transition-colors"
            >
              <span>View all 8 craft categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtisans.map((artisan, index) => (
            <MotionReveal key={artisan.id} direction="up" delay={0.1 + index * 0.15}>
              <ArtisanCard
                artisan={artisan}
                onQuickSupport={(a) => setSelectedArtisanForModal(a)}
              />
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* 5. HOW KARIGARCONNECT WORKS (5-STEP VISUAL FLOW) */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="bg-[#173B35] text-[#FAF6F0] py-20 relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-warm-lg">
          <div className="absolute inset-0 bg-dark-weave opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D5B46A]">
                Streamlined 5-Step Model
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                How KarigarConnect Works
              </h2>
              <p className="text-sm text-[#FAF6F0]/80">
                Autonomous smart contracts replace exploitative moneylenders, ensuring transparency from contribution to full repayment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  step: '01',
                  title: 'Artisan Registration',
                  desc: 'Rural artisans register profiles with craft heritage details, location, and itemized raw material funding needs.'
                },
                {
                  step: '02',
                  title: 'Profile Verification',
                  desc: 'Community liaisons & GI certifications verify authenticity, creditworthiness, and craft lineage.'
                },
                {
                  step: '03',
                  title: 'Funding by Supporters',
                  desc: 'Urban patrons fund small amounts directly via UPI or Ethereum testnet without any administrative deductions.'
                },
                {
                  step: '04',
                  title: 'Blockchain Record',
                  desc: 'Loan escrow smart contract autonomously locks funds and disburses upon milestone readiness with immutable receipts.'
                },
                {
                  step: '05',
                  title: 'Repayment & Growth',
                  desc: 'Artisans repay through flexible sales installments. Capital recycles into new artisan clusters.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-[#0F2622]/80 backdrop-blur-md p-6 rounded-2xl border border-[#D5B46A]/20 hover:border-[#D5B46A]/60 transition-all space-y-3 group"
                >
                  <div className="text-2xl font-serif font-extrabold text-[#D5B46A] group-hover:text-[#C7794A] transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">{item.title}</h3>
                  <p className="text-xs text-[#FAF6F0]/75 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Complete 5-Step Visual Flow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 6. BLOCKCHAIN TRANSPARENCY PREVIEW */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/40 shadow-warm space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#FAF6F0] pb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173B35] text-[#D5B46A] text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Simulated Ethereum Sepolia Ledger</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#173B35]">
                  Tamper-Resistant Blockchain Transparency
                </h2>
                <p className="text-sm text-[#263B36]/80 mt-1 max-w-xl">
                  Every micro-loan contribution and repayment installment is cryptographically recorded. No hidden platform margins or altered ledger rows.
                </p>
              </div>

              <Link
                to="/blockchain"
                className="px-5 py-2.5 rounded-2xl bg-[#FAF6F0] hover:bg-[#E7DEC9] text-[#173B35] font-bold text-xs border border-[#D5B46A]/40 transition-colors flex items-center gap-2 self-start"
              >
                <span>Open Block Explorer</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C7794A]" />
              </Link>
            </div>

            {/* Live Recent Transactions Feed */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B35]">
                Live Smart Contract Event Stream
              </h4>
              <div className="divide-y divide-[#FAF6F0] border border-[#E7DEC9] rounded-2xl overflow-hidden bg-[#FAF6F0]/30">
                {transactions.length > 0 ? (
                  transactions.slice(0, 3).map((tx, idx) => (
                    <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#FAF6F0]/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider ${
                          tx.type === 'CONTRIBUTION' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tx.type}
                        </span>
                        <div>
                          <div className="font-mono text-[#173B35] font-semibold truncate max-w-xs sm:max-w-md">
                            {tx.txHash}
                          </div>
                          <div className="text-[#263B36]/60 text-[11px]">
                            From {tx.from} ➔ To {tx.to}
                          </div>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="font-bold text-[#173B35] text-sm">{tx.amount}</div>
                        <div className="text-[10px] text-[#263B36]/60">{tx.timestamp} • Block #{tx.blockNumber}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-[#263B36]/70">
                    No blockchain transactions yet. Transactions will appear here once funding or repayments are recorded.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 7. TESTIMONIALS */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
              Stories of Trust
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173B35]">
              Voices from the Loom & Wheel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Artisan Testimonial */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#D5B46A]/30 shadow-warm relative space-y-4"
            >
              <div className="text-4xl font-serif text-[#D5B46A]">“</div>
              <p className="text-sm text-[#263B36] italic leading-relaxed -mt-4">
                Before KarigarConnect, the local yarn trader took 70% of each Chanderi saree’s sale price because I borrowed for silk yarn at 36% annual interest. With this zero-interest micro-loan from urban supporters, I bought pure silk directly, repaid within 5 months, and enrolled my daughter in college.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#F5EFE4]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                  alt="Lakshmi Devi"
                  className="w-12 h-12 rounded-full object-cover border border-[#D5B46A]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#173B35]">Lakshmi Devi</h4>
                  <p className="text-xs text-[#263B36]/60">Master Chanderi Silk Weaver, Madhya Pradesh</p>
                </div>
              </div>
            </motion.div>

            {/* Supporter Testimonial */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#D5B46A]/30 shadow-warm relative space-y-4"
            >
              <div className="text-4xl font-serif text-[#C7794A]">“</div>
              <p className="text-sm text-[#263B36] italic leading-relaxed -mt-4">
                I’ve always loved Indian handicrafts, but traditional charity never gave visibility on where the money went. On KarigarConnect, I backed Kishanlal’s wooden toy workshop in Channapatna with ₹10,000. Seeing him repay each installment while training village youth has been deeply fulfilling.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#F5EFE4]">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
                  alt="Vikram Sen"
                  className="w-12 h-12 rounded-full object-cover border border-[#D5B46A]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#173B35]">Vikram Sen</h4>
                  <p className="text-xs text-[#263B36]/60">Technology Lead & Impact Supporter, Bengaluru</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </MotionReveal>

      {/* 8. FINAL CALL TO ACTION */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#173B35] to-[#23524B] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl border border-[#D5B46A]/40">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D5B46A]">
                Join the Movement
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Preserve Indian Craft Heritage with Transparent Micro-Capital
              </h2>
              <p className="text-sm text-[#FAF6F0]/85">
                Support verified rural artisans today. 100% of your contribution reaches their workshop without middlemen deductions.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/explore"
                  className="px-8 py-4 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm shadow-lg shadow-[#C7794A]/30 transition-all flex items-center gap-2"
                >
                  <span>Explore All Artisans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/about"
                  className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
                >
                  <span>Read Our Mission</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* Quick Contribution Modal */}
      <ContributionModal
        artisan={selectedArtisanForModal}
        isOpen={!!selectedArtisanForModal}
        onClose={() => setSelectedArtisanForModal(null)}
      />

    </div>
  );
};
