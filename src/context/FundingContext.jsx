import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ARTISANS_DATA, PLATFORM_STATS } from '../data/artisans';
import { INITIAL_TRANSACTIONS } from '../data/blockchain';

const FundingContext = createContext();

export const FundingProvider = ({ children }) => {
  const [artisans, setArtisans] = useState(() => {
    const saved = localStorage.getItem('karigar_artisans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ARTISANS_DATA;
      }
    }
    return ARTISANS_DATA;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('karigar_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [userContributions, setUserContributions] = useState(() => {
    const saved = localStorage.getItem('karigar_user_contributions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'contrib-1',
        artisanId: 'artisan-1',
        artisanName: 'Lakshmi Devi',
        craft: 'Chanderi Silk & Zari Weaving',
        amount: 5000,
        date: '2026-10-24',
        status: 'Active (Installments on track)',
        repaidSoFar: 1667,
        txHash: '0x8f2a...1b857'
      },
      {
        id: 'contrib-2',
        artisanId: 'artisan-3',
        artisanName: 'Fatima Begum',
        craft: 'Heritage Chikankari & Zardozi',
        amount: 3500,
        date: '2026-10-12',
        status: 'Active (Installments on track)',
        repaidSoFar: 1750,
        txHash: '0x992b...8f11'
      },
      {
        id: 'contrib-3',
        artisanId: 'artisan-4',
        artisanName: 'Kishanlal Suthar',
        craft: 'Channapatna Wooden Toys',
        amount: 10000,
        date: '2026-09-04',
        status: 'Near Completion (80% Repaid)',
        repaidSoFar: 8000,
        txHash: '0x21c8...a0b3'
      }
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('karigar_artisans', JSON.stringify(artisans));
  }, [artisans]);

  useEffect(() => {
    localStorage.setItem('karigar_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('karigar_user_contributions', JSON.stringify(userContributions));
  }, [userContributions]);

  // Generate realistic Ethereum transaction hash
  const generateTxHash = () => {
    const hex = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += hex[Math.floor(Math.random() * hex.length)];
    }
    return hash;
  };

  // Contribute to Artisan
  const contribute = (artisanId, amount, paymentMethod = 'UPI', supporterName = 'Vikram Sen') => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) return null;

    let targetArtisan = null;

    // 1. Update Artisan Raised Amount
    setArtisans((prev) =>
      prev.map((artisan) => {
        if (artisan.id === artisanId) {
          targetArtisan = artisan;
          const newRaised = Math.min(artisan.fundingGoal, artisan.amountRaised + numAmount);
          return {
            ...artisan,
            amountRaised: newRaised,
            backersCount: artisan.backersCount + 1
          };
        }
        return artisan;
      })
    );

    // 2. Generate Blockchain Record
    const txHash = generateTxHash();
    const blockNumber = 19842100 + Math.floor(Math.random() * 50);
    const ethEquivalent = (numAmount / 300000).toFixed(4) + ' ETH';

    const newTx = {
      txHash,
      blockNumber,
      timestamp: 'Just now',
      type: 'CONTRIBUTION',
      from: `0x3A21...79b4 (${supporterName})`,
      to: targetArtisan ? `${targetArtisan.smartContractAddress} (${targetArtisan.name})` : '0x71C...49bE',
      amount: `₹${numAmount.toLocaleString('en-IN')}`,
      cryptoEquivalent: ethEquivalent,
      craft: targetArtisan ? targetArtisan.craft : 'Traditional Handcraft',
      status: 'Confirmed (1 Block Confirmation)',
      gasUsed: '21,432 Gwei'
    };

    setTransactions((prev) => [newTx, ...prev]);

    // 3. Add to Supporter Contributions
    const newContribution = {
      id: `contrib-${Date.now()}`,
      artisanId,
      artisanName: targetArtisan ? targetArtisan.name : 'Master Artisan',
      craft: targetArtisan ? targetArtisan.craft : 'Traditional Craft',
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Active (Funds Transferred via Escrow)',
      repaidSoFar: 0,
      txHash: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
    };

    setUserContributions((prev) => [newContribution, ...prev]);

    // 4. Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C7794A', '#D5B46A', '#173B35', '#FAF6F0']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    return {
      txHash,
      blockNumber,
      amount: numAmount,
      artisanName: targetArtisan ? targetArtisan.name : 'Artisan',
      craft: targetArtisan ? targetArtisan.craft : 'Craft'
    };
  };

  // Artisan Repayment Action (For Artisan Dashboard demo)
  const makeRepayment = (artisanId, installmentAmount = 6667) => {
    let updatedArtisan = null;

    setArtisans((prev) =>
      prev.map((artisan) => {
        if (artisan.id === artisanId) {
          const newRepaid = Math.min(artisan.fundingGoal, (artisan.amountRaised * (artisan.repaymentProgressPercent || 33) / 100) + installmentAmount);
          const newPercent = Math.min(100, Math.round((newRepaid / artisan.amountRaised) * 100));
          updatedArtisan = {
            ...artisan,
            repaymentProgressPercent: newPercent,
            repaymentStatus: newPercent >= 100 ? 'Fully Repaid' : `On Schedule (${Math.ceil(newPercent / 20)} installments completed)`
          };
          return updatedArtisan;
        }
        return artisan;
      })
    );

    const txHash = generateTxHash();
    const newTx = {
      txHash,
      blockNumber: 19842100 + Math.floor(Math.random() * 50),
      timestamp: 'Just now',
      type: 'REPAYMENT',
      from: updatedArtisan ? `${updatedArtisan.smartContractAddress} (${updatedArtisan.name})` : '0x71C...49bE',
      to: 'KarigarEscrow Contract',
      amount: `₹${installmentAmount.toLocaleString('en-IN')}`,
      cryptoEquivalent: (installmentAmount / 300000).toFixed(4) + ' ETH',
      craft: updatedArtisan ? updatedArtisan.craft : 'Craft',
      status: 'Confirmed (1 Block Confirmation)',
      gasUsed: '34,120 Gwei'
    };

    setTransactions((prev) => [newTx, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D5B46A', '#173B35']
      });
    } catch (e) {}

    return { txHash, installmentAmount };
  };

  const getArtisanById = (id) => {
    return artisans.find((a) => a.id === id) || artisans[0];
  };

  // Reset to default demo data if desired
  const resetDemoData = () => {
    setArtisans(ARTISANS_DATA);
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.removeItem('karigar_artisans');
    localStorage.removeItem('karigar_transactions');
    localStorage.removeItem('karigar_user_contributions');
  };

  return (
    <FundingContext.Provider
      value={{
        artisans,
        transactions,
        userContributions,
        stats: PLATFORM_STATS,
        contribute,
        makeRepayment,
        getArtisanById,
        resetDemoData
      }}
    >
      {children}
    </FundingContext.Provider>
  );
};

export const useFunding = () => {
  const context = useContext(FundingContext);
  if (!context) {
    throw new Error('useFunding must be used within a FundingProvider');
  }
  return context;
};
