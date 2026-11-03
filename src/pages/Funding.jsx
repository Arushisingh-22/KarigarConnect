import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  Layers, 
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useFunding } from '../context/FundingContext';
import { useAuth } from '../context/AuthContext';
import { MotionReveal } from '../components/MotionReveal';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

export const Funding = () => {
  const { artisans, contribute } = useFunding();
  const { user } = useAuth();

  const [selectedArtisanId, setSelectedArtisanId] = useState(artisans[0]?.id || 'artisan-1');
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [backerName, setBackerName] = useState(user?.name || 'Vikram Sen');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const selectedArtisan = artisans.find((a) => a.id === selectedArtisanId) || artisans[0];
  const percentRaised = selectedArtisan ? Math.min(100, Math.round((selectedArtisan.amountRaised / selectedArtisan.fundingGoal) * 100)) : 0;

  const handlePresetSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val)) {
      setAmount(Number(val));
    }
  };

  const handleConfirmSupport = (e) => {
    e.preventDefault();
    if (amount <= 0 || !selectedArtisan) return;

    setIsProcessing(true);
    setTimeout(() => {
      const res = contribute(selectedArtisan.id, amount, paymentMethod, backerName);
      setIsProcessing(false);
      setReceipt(res);
    }, 1300);
  };

  return (
    <div className="space-y-12 py-10 pb-24">
      
      {/* 1. Header */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C7794A]" />
            <span>Micro-Patronage Terminal</span>
            <span className="text-[#D5B46A]">•</span>
            <span>Zero Middlemen Escrow</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#173B35]">
            Direct Micro-Capital Funding Experience
          </h1>

          <p className="text-sm sm:text-base text-[#263B36]/80 max-w-2xl mx-auto">
            Choose a verified artisan, select your micro-loan contribution amount, and execute the transparent smart contract transaction.
          </p>

          <div className="p-3 bg-[#FAF6F0] border border-[#D5B46A]/40 rounded-xl inline-block text-xs text-[#263B36]/70 shadow-2xs">
            <strong className="text-[#C7794A]">Demonstration Mode:</strong> All transactions are executed against the mock Ethereum Sepolia ledger without deducting real funds.
          </div>
        </section>
      </MotionReveal>

      {/* 2. Main Funding Flow Container */}
      <MotionReveal direction="up" delay={0.15}>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {receipt ? (
            /* Receipt Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#D5B46A]/40 shadow-warm text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#173B35] text-[#D5B46A] flex items-center justify-center mx-auto shadow-xl shadow-[#173B35]/25 animate-bounce">
                <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                  Transaction Confirmed on Blockchain
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#173B35]">
                  Thank You, {backerName}!
                </h2>
                <p className="text-sm text-[#263B36]/80 max-w-md mx-auto">
                  Your direct micro-contribution of <strong className="text-[#173B35]">₹{receipt.amount.toLocaleString('en-IN')}</strong> has been autonomously routed to <strong>{receipt.artisanName}</strong> for {receipt.craft}.
                </p>
              </div>

              {/* Cryptographic Proof Details */}
              <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#D5B46A]/30 text-left max-w-lg mx-auto space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7DEC9]">
                  <span className="font-bold text-[#173B35] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C7794A]" />
                    Verified Ledger Record
                  </span>
                  <span className="font-mono text-[#263B36]/70">Block #{receipt.blockNumber}</span>
                </div>

                <div>
                  <span className="text-[11px] text-[#263B36]/60">Transaction Hash:</span>
                  <div className="font-mono text-[11px] text-[#173B35] bg-white p-2 rounded-lg border border-[#D5B46A]/30 break-all mt-1">
                    {receipt.txHash}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-[#263B36]/60">Platform Deduction:</span>
                    <p className="font-bold text-emerald-700">₹0 (Zero Fees)</p>
                  </div>
                  <div>
                    <span className="text-[#263B36]/60">Estimated Repayment:</span>
                    <p className="font-bold text-[#173B35]">Flexible Installments</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setReceipt(null)}
                  className="px-6 py-3 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] text-white font-bold text-sm transition-all cursor-pointer"
                >
                  Fund Another Artisan
                </button>
                <a
                  href="#dashboard"
                  onClick={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}
                  className="px-6 py-3 rounded-2xl bg-[#173B35] hover:bg-[#0F2622] text-[#FAF6F0] font-bold text-sm transition-all cursor-pointer"
                >
                  View in Supporter Dashboard
                </a>
              </div>
            </motion.div>
          ) : (
            /* Multi-Step Interactive Form */
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/30 shadow-warm">
              <form onSubmit={handleConfirmSupport} className="space-y-8">
                
                {/* Step 1: Select Artisan */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#173B35] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="font-serif text-lg font-bold text-[#173B35]">
                      Select Verified Artisan to Fund
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {artisans.map((artisan) => (
                      <button
                        type="button"
                        key={artisan.id}
                        onClick={() => setSelectedArtisanId(artisan.id)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          selectedArtisanId === artisan.id
                            ? 'border-[#C7794A] bg-[#FAF6F0] shadow-sm ring-2 ring-[#C7794A]/20'
                            : 'border-[#E7DEC9] hover:bg-[#FAF6F0]'
                        }`}
                      >
                        <img
                          src={artisan.avatar}
                          alt={artisan.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#D5B46A]"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#173B35] truncate">{artisan.name}</div>
                          <div className="text-[10px] text-[#C7794A] truncate">{artisan.craft}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Artisan Summary Strip */}
                {selectedArtisan && (
                  <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedArtisan.craftImage || selectedArtisan.avatar}
                        alt={selectedArtisan.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="font-serif text-base font-bold text-[#173B35]">{selectedArtisan.name}</div>
                        <div className="text-xs text-[#263B36]/70 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C7794A]" />
                          <span>{selectedArtisan.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right space-y-1">
                      <div className="text-xs font-bold text-[#173B35]">
                        ₹{selectedArtisan.amountRaised.toLocaleString('en-IN')} / ₹{selectedArtisan.fundingGoal.toLocaleString('en-IN')}
                      </div>
                      <div className="w-48 bg-[#E7DEC9] h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentRaised}%` }}
                          transition={{ duration: 0.8 }}
                          className="bg-[#C7794A] h-full rounded-full"
                        />
                      </div>
                      <div className="text-[10px] text-[#C7794A] font-semibold">{percentRaised}% Funded</div>
                    </div>
                  </div>
                )}

                {/* Step 2: Choose Contribution Amount */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#173B35] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h3 className="font-serif text-lg font-bold text-[#173B35]">
                      Choose Micro-Loan Amount (INR)
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {PRESET_AMOUNTS.map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => handlePresetSelect(val)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                          amount === val && !customAmount
                            ? 'bg-[#C7794A] text-white shadow-md'
                            : 'bg-[#FAF6F0] text-[#173B35] border border-[#D5B46A]/40 hover:bg-[#E7DEC9]'
                        }`}
                      >
                        ₹{val.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  {/* Custom Input */}
                  <div className="pt-1">
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-sm font-bold text-[#173B35]">₹</span>
                      <input
                        type="number"
                        placeholder="Or enter any custom amount..."
                        value={customAmount}
                        onChange={handleCustomChange}
                        min="100"
                        className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] font-bold text-[#173B35]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Method & Backer Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#173B35] text-white text-xs font-bold flex items-center justify-center">3</span>
                    <h3 className="font-serif text-lg font-bold text-[#173B35]">
                      Simulated Payment Rail & Identity
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 cursor-pointer ${
                        paymentMethod === 'UPI' ? 'border-[#173B35] bg-[#173B35] text-white' : 'border-[#E7DEC9] bg-[#FAF6F0] text-[#173B35]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">UPI / QR Payment</div>
                        <div className="text-[10px] opacity-80">Instant INR routing</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ETH')}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 cursor-pointer ${
                        paymentMethod === 'ETH' ? 'border-[#173B35] bg-[#173B35] text-white' : 'border-[#E7DEC9] bg-[#FAF6F0] text-[#173B35]'
                      }`}
                    >
                      <Layers className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">Web3 Sepolia Testnet</div>
                        <div className="text-[10px] opacity-80">Smart Contract Escrow</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 cursor-pointer ${
                        paymentMethod === 'CARD' ? 'border-[#173B35] bg-[#173B35] text-white' : 'border-[#E7DEC9] bg-[#FAF6F0] text-[#173B35]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">NetBanking / Card</div>
                        <div className="text-[10px] opacity-80">Indian Gateway</div>
                      </div>
                    </button>
                  </div>

                  {/* Backer Name */}
                  <div className="pt-2">
                    <label className="text-xs text-[#263B36]/70 block mb-1">
                      Your Name (as displayed on the patronage ledger)
                    </label>
                    <input
                      type="text"
                      value={backerName}
                      onChange={(e) => setBackerName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden text-[#173B35] font-semibold"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing || amount <= 0}
                  className="w-full py-4 rounded-2xl bg-[#C7794A] hover:bg-[#B56738] disabled:opacity-50 text-white font-bold text-base shadow-md shadow-[#C7794A]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Broadcasting Demo Smart Contract Transaction...</span>
                    </>
                  ) : (
                    <>
                      <Coins className="w-5 h-5" />
                      <span>Confirm ₹{amount.toLocaleString('en-IN')} Micro-Loan Contribution</span>
                    </>
                  )}
                </motion.button>

              </form>
            </div>
          )}
        </section>
      </MotionReveal>

    </div>
  );
};
