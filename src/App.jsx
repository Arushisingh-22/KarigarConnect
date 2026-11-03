import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { ExploreArtisans } from './pages/ExploreArtisans';
import { ArtisanDetail } from './pages/ArtisanDetail';
import { Funding } from './pages/Funding';
import { HowItWorks } from './pages/HowItWorks';
import { BlockchainTransparency } from './pages/BlockchainTransparency';
import { Dashboard } from './pages/Dashboard';
import { Impact } from './pages/Impact';
import { Login } from './pages/Login';

// Automatically scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5EFE4] text-[#263B36] selection:bg-[#C7794A] selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<ExploreArtisans />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/blockchain" element={<BlockchainTransparency />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.div>
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

export default App;
