import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  Smartphone,
  CreditCard,
  Layers
} from 'lucide-react';
import { useFunding } from '../context/FundingContext';
import { useAuth } from '../context/AuthContext';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export const ContributionModal = ({ artisan, isOpen, onClose }) => {
  const { contribute } = useFunding();
  const { user } = useAuth();

  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'ETH' | 'CARD'
  const [supporterName, setSupporterName] = useState(user?.name || 'Vikram Sen');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!isOpen || !artisan) return null;

  const handlePresetClick = (val) => {
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

  const getImpactDescription = (amt) => {
    if (amt < 1000) {
      return `Covers direct local courier packaging and natural needle kits for 3 craft pieces.`;
    } else if (amt < 3000) {
      return `Procures 2.5kg pure natural mineral pigments and high-grade unadulterated raw materials.`;
    } else if (amt < 5000) {
      return `Funds artisan workshop upgrades and eliminates 1 full month of local moneylender debt.`;
    } else {
      return `Major micro-capital contribution sponsoring raw materials for an entire bridal/festival collection!`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) return;

    setIsProcessing(true);

    // Simulate smart contract confirmation delay
    setTimeout(() => {
      const result = contribute(artisan.id, amount, paymentMethod, supporterName);
      setIsProcessing(false);
      setReceipt(result);
    }, 1200);
  };

  const handleClose = () => {
    setReceipt(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#FFFFFF] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#D5B46A]/40 relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F5EFE4] flex items-center justify-center text-[#263B36] hover:bg-[#C7794A] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {receipt ? (
          /* Success Receipt View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#173B35] text-[#D5B46A] flex items-center justify-center mx-auto shadow-lg shadow-[#173B35]/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                Smart Contract Executed
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#173B35]">
                Contribution Confirmed!
              </h3>
              <p className="text-xs text-[#263B36]/80 max-w-sm mx-auto">
                Your direct micro-loan of <strong className="text-[#173B35]">₹{receipt.amount.toLocaleString('en-IN')}</strong> has been autonomously routed to <strong>{receipt.artisanName}</strong>.
              </p>
            </div>

            {/* Blockchain Receipt Card */}
            <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#D5B46A]/30 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7DEC9]">
                <span className="font-bold text-[#173B35] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C7794A]" />
                  Cryptographic Proof
                </span>
                <span className="text-[11px] font-mono text-[#263B36]/70">
                  Block #{receipt.blockNumber}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#263B36]/60">Tx Hash (Sepolia / Polygon):</span>
                <p className="font-mono text-[10px] text-[#173B35] break-all bg-white p-1.5 rounded border border-[#D5B46A]/30 mt-0.5">
                  {receipt.txHash}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div>
                  <span className="text-[#263B36]/60">Middleman Cut:</span>
                  <p className="font-bold text-[#173B35]">₹0 (0%)</p>
                </div>
                <div>
                  <span className="text-[#263B36]/60">Repayment Mode:</span>
                  <p className="font-bold text-[#173B35]">Flexible Installments</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#E7DEC9]/40 rounded-xl text-[11px] text-[#263B36]/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C7794A] shrink-0" />
              <span>A certificate of micro-patronage has been added to your Supporter Dashboard.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#173B35] hover:bg-[#0F2622] text-[#FAF6F0] font-semibold text-sm transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Contribution Form */
          <div>
            {/* Header */}
            <div className="bg-[#173B35] text-white p-6 pb-5">
              <div className="flex items-center gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D5B46A]"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    Support {artisan.name}
                  </h3>
                  <p className="text-xs text-[#D5B46A]">
                    {artisan.craft} • {artisan.location}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-[11px] bg-[#FAF6F0]/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between">
                <span>Current Goal: ₹{artisan.fundingGoal.toLocaleString('en-IN')}</span>
                <span className="text-[#D5B46A] font-bold">
                  ₹{(artisan.fundingGoal - artisan.amountRaised).toLocaleString('en-IN')} remaining
                </span>
              </div>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#173B35] uppercase tracking-wider block">
                  Select Contribution Amount (INR)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handlePresetClick(val)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                        amount === val && !customAmount
                          ? 'bg-[#C7794A] text-white shadow-md'
                          : 'bg-[#FAF6F0] text-[#173B35] border border-[#D5B46A]/40 hover:bg-[#E7DEC9]'
                      }`}
                    >
                      ₹{val.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Custom Amount input */}
                <div className="pt-1">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-[#173B35]">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount (e.g. 1500)"
                      value={customAmount}
                      onChange={handleCustomChange}
                      min="100"
                      className="w-full pl-7 pr-3 py-2 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] font-semibold text-[#173B35]"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Impact Calculator Note */}
              <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#C7794A] font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Craft Impact
                </div>
                <p className="text-[#263B36]/80 text-[11px] leading-relaxed">
                  {getImpactDescription(amount)}
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#173B35] uppercase tracking-wider block">
                  Payment Method (Simulated Testnet)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-[#173B35] text-white'
                        : 'bg-[#FAF6F0] text-[#173B35] border border-[#D5B46A]/30'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ETH')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'ETH'
                        ? 'bg-[#173B35] text-white'
                        : 'bg-[#FAF6F0] text-[#173B35] border border-[#D5B46A]/30'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Web3 ETH
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'CARD'
                        ? 'bg-[#173B35] text-white'
                        : 'bg-[#FAF6F0] text-[#173B35] border border-[#D5B46A]/30'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    NetBanking
                  </button>
                </div>
              </div>

              {/* Supporter Name field */}
              <div>
                <label className="text-[11px] text-[#263B36]/70 block mb-1">
                  Backer Name (For Blockchain Registry)
                </label>
                <input
                  type="text"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden text-[#173B35] font-medium"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-[#263B36]/60 leading-tight">
                *Demo Simulation: This transaction routes through the mock Ethereum Sepolia smart contract escrow without deducting real bank funds.
              </p>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || amount <= 0}
                className="w-full py-3.5 rounded-xl bg-[#C7794A] hover:bg-[#B56738] disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-[#C7794A]/25 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Broadcasting to Smart Contract...</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4" />
                    <span>Confirm ₹{amount.toLocaleString('en-IN')} Support</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
