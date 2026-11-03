import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Lock, 
  FileCode, 
  ArrowRight,
  Sparkles,
  Terminal
} from 'lucide-react';
import { useFunding } from '../context/FundingContext';
import { SMART_CONTRACT_CODE, BLOCKCHAIN_METRICS } from '../data/blockchain';
import { MotionReveal } from '../components/MotionReveal';

export const BlockchainTransparency = () => {
  const { transactions } = useFunding();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = filterType === 'ALL' || tx.type === filterType;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      tx.txHash.toLowerCase().includes(query) ||
      tx.from.toLowerCase().includes(query) ||
      tx.to.toLowerCase().includes(query) ||
      tx.craft.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SMART_CONTRACT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-16 py-10 pb-24">
      
      {/* 1. Header */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C7794A]" />
            <span>Autonomous Micro-Escrow Architecture</span>
            <span className="text-[#D5B46A]">•</span>
            <span>Ethereum & Smart Contracts</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B35]">
            Blockchain Transparency Ledger
          </h1>

          <p className="text-base sm:text-lg text-[#263B36]/80 max-w-2xl mx-auto">
            Every rupee contributed, disbursed, and repaid is immutably timestamped on the blockchain. Zero hidden cuts, zero unauthorized ledger tampering.
          </p>

          <div className="p-3 bg-[#FAF6F0] border border-[#D5B46A]/40 rounded-xl inline-block text-xs text-[#263B36]/70 shadow-2xs">
            <strong className="text-[#C7794A]">Demonstration Ledger:</strong> The records below represent simulated transactions against the deployed KarigarEscrow smart contract.
          </div>
        </section>
      </MotionReveal>

      {/* 2. Architecture & Blockchain Metrics Grid */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
              <span className="text-[11px] text-[#263B36]/60 font-semibold uppercase">Network Environment</span>
              <div className="font-serif font-bold text-lg text-[#173B35] mt-1">Ethereum Sepolia</div>
              <div className="text-[11px] text-[#C7794A] font-medium">Polygon PoS Bridge Ready</div>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
              <span className="text-[11px] text-[#263B36]/60 font-semibold uppercase">Smart Contract Audit</span>
              <div className="font-serif font-bold text-lg text-emerald-700 mt-1">Verified & Passing</div>
              <div className="text-[11px] text-[#263B36]/60 font-medium">Reentrancy Invariant Checked</div>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
              <span className="text-[11px] text-[#263B36]/60 font-semibold uppercase">Average Block Time</span>
              <div className="font-serif font-bold text-lg text-[#173B35] mt-1">2.1s Instant Finality</div>
              <div className="text-[11px] text-[#263B36]/60 font-medium">Sub-cent Gas Fees</div>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#D5B46A]/30 shadow-xs hover:shadow-warm transition-all">
              <span className="text-[11px] text-[#263B36]/60 font-semibold uppercase">Contract Address</span>
              <div className="font-mono font-bold text-xs text-[#173B35] truncate mt-2 bg-[#FAF6F0] p-1.5 rounded-lg border border-[#D5B46A]/20">
                0x742d...454e
              </div>
              <div className="text-[10px] text-[#C7794A] mt-1 font-semibold">Open Source MIT License</div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 3. Live Interactive Block Explorer */}
      <MotionReveal direction="up" delay={0.15}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/40 shadow-warm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FAF6F0] pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
                  Cryptographic Explorer
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173B35]">
                  Recent Ledger Transactions
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {['ALL', 'CONTRIBUTION', 'REPAYMENT', 'DISBURSEMENT'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      filterType === type
                        ? 'bg-[#173B35] text-white shadow-xs'
                        : 'bg-[#FAF6F0] text-[#263B36]/70 hover:bg-[#E7DEC9]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Tx Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3 text-[#173B35]/50" />
              <input
                type="text"
                placeholder="Filter by Transaction Hash (0x...), Artisan name, craft, or backer address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-xs rounded-xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden text-[#173B35] font-mono"
              />
            </div>

            {/* Transaction Table */}
            <div className="border border-[#E7DEC9] rounded-2xl overflow-hidden divide-y divide-[#FAF6F0]">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, idx) => (
                  <div key={idx} className="p-4 sm:p-5 hover:bg-[#FAF6F0]/50 transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                          tx.type === 'CONTRIBUTION' ? 'bg-emerald-100 text-emerald-800' :
                          tx.type === 'REPAYMENT' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {tx.type}
                        </span>
                        <span className="font-mono text-[#173B35] font-bold text-xs truncate max-w-[240px] sm:max-w-sm">
                          {tx.txHash}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-[#263B36]/70">
                        <span>Block #{tx.blockNumber}</span>
                        <span>•</span>
                        <span>{tx.timestamp}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs pt-1">
                      <div className="sm:col-span-8 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[11px] text-[#263B36]/80 font-mono">
                        <span className="truncate">From: {tx.from}</span>
                        <span className="text-[#C7794A]">➔</span>
                        <span className="truncate">To: {tx.to}</span>
                      </div>

                      <div className="sm:col-span-4 sm:text-right">
                        <span className="font-serif font-bold text-sm text-[#173B35]">{tx.amount}</span>
                        <span className="text-[10px] text-[#263B36]/60 font-mono ml-1.5">({tx.cryptoEquivalent})</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-[#263B36]/70">
                  No blockchain transactions matched your search query.
                </div>
              )}
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 4. Smart Contract Code Inspection */}
      <MotionReveal direction="up" delay={0.2}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#173B35] text-white rounded-3xl p-6 sm:p-10 border border-[#D5B46A]/30 shadow-warm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#D5B46A]">
                  Open Source Protocol
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  KarigarLoanEscrow.sol
                </h2>
                <p className="text-xs text-[#FAF6F0]/80 mt-1">
                  Solidity 0.8.20 autonomous escrow logic governing funding goals and repayment milestones.
                </p>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#23524B] hover:bg-[#2F675E] text-xs font-bold text-[#D5B46A] border border-[#D5B46A]/40 transition-colors self-start cursor-pointer active:scale-95"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Contract Source'}</span>
              </button>
            </div>

            {/* Code Viewer Container */}
            <div className="bg-[#0F2622] rounded-2xl p-4 sm:p-6 border border-white/10 font-mono text-xs overflow-x-auto max-h-[420px] text-[#FAF6F0]/90 leading-relaxed space-y-1">
              <pre>{SMART_CONTRACT_CODE}</pre>
            </div>
          </div>
        </section>
      </MotionReveal>

    </div>
  );
};
