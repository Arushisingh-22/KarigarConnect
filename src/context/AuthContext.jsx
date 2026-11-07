import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_SUPPORTER = {
  id: 'user-supporter-1',
  name: 'Vikram Sen',
  email: 'vikram.sen@bengaluru.tech',
  role: 'SUPPORTER',
  location: 'Bengaluru, Karnataka',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  walletAddress: '0x3A21...79b4',
  balanceEth: '2.45 ETH',
  totalContributedInr: 18500,
  artisansSupportedCount: 4,
  activeFundingCount: 3,
  token: 'mock-jwt-token-supporter-novex2026'
};

const DEFAULT_ARTISAN = {
  id: 'artisan-1',
  name: 'Lakshmi Devi',
  email: 'lakshmi.chanderi@karigarconnect.in',
  role: 'ARTISAN',
  craft: 'Chanderi Silk & Zari Weaving',
  location: 'Chanderi, Madhya Pradesh',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  walletAddress: '0x71C...49bE',
  loanGoal: 40000,
  loanReceived: 33500,
  repaidAmount: 13334,
  profileCompletion: 94,
  verificationStatus: 'GI Verified Master Weaver',
  token: 'mock-jwt-token-artisan-novex2026'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('karigar_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_SUPPORTER;
      }
    }
    return DEFAULT_SUPPORTER; // Start pre-authenticated with demo user for smooth testing
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (user) {
      localStorage.setItem('karigar_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('karigar_user');
    }
  }, [user]);

  const loginAs = (role) => {
    if (role === 'ARTISAN') {
      setUser(DEFAULT_ARTISAN);
    } else {
      setUser(DEFAULT_SUPPORTER);
    }
    setIsAuthModalOpen(false);
  };

  const loginWithCredentials = (email, password, role, fullName) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: fullName || (role === 'ARTISAN' ? 'Radha Bai' : email.split('@')[0]),
      isDemo: false,
      email,
      role: role || 'SUPPORTER',
      avatar: role === 'ARTISAN' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      walletAddress: '0x' + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('') + '...' + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      totalContributedInr: 0,
      artisansSupportedCount: 0,
      token: 'jwt-auth-' + Date.now()
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = () => {
    if (user?.role === 'ARTISAN') {
      setUser(DEFAULT_SUPPORTER);
    } else {
      setUser(DEFAULT_ARTISAN);
    }
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAs,
        loginWithCredentials,
        logout,
        switchRole,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
