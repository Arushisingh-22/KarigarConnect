import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useFunding } from '../context/FundingContext';
import { CRAFT_CATEGORIES } from '../data/artisans';
import { ArtisanCard } from '../components/ArtisanCard';
import { ContributionModal } from '../components/ContributionModal';
import { MotionReveal } from '../components/MotionReveal';

export const ExploreArtisans = () => {
  const { artisans } = useFunding();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('funded_desc'); // 'funded_desc' | 'goal_asc' | 'backers_desc'
  const [selectedArtisanForModal, setSelectedArtisanForModal] = useState(null);

  const handleCategoryChange = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter and Sort Artisans
  const filteredArtisans = useMemo(() => {
    return artisans
      .filter((artisan) => {
        // Category Filter
        const matchesCategory =
          currentCategory === 'All' ||
          artisan.category.toLowerCase() === currentCategory.toLowerCase();

        // Search Filter
        const query = searchTerm.toLowerCase();
        const matchesSearch =
          artisan.name.toLowerCase().includes(query) ||
          artisan.craft.toLowerCase().includes(query) ||
          artisan.location.toLowerCase().includes(query) ||
          artisan.state.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'funded_desc') {
          const pctA = (a.amountRaised / a.fundingGoal);
          const pctB = (b.amountRaised / b.fundingGoal);
          return pctB - pctA;
        } else if (sortBy === 'goal_asc') {
          return a.fundingGoal - b.fundingGoal;
        } else if (sortBy === 'backers_desc') {
          return b.backersCount - a.backersCount;
        }
        return 0;
      });
  }, [artisans, currentCategory, searchTerm, sortBy]);

  return (
    <div className="space-y-12 py-10 pb-24">
      
      {/* 1. Header Section */}
      <MotionReveal direction="up" delay={0.05}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C7794A]">
            Direct Grassroots Marketplace
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#173B35]">
            Explore Verified Artisans
          </h1>
          <p className="text-sm sm:text-base text-[#263B36]/80 max-w-2xl mx-auto">
            Discover traditional Indian handcraft masters seeking zero-interest micro-working capital. Support directly with zero middlemen fees.
          </p>
        </section>
      </MotionReveal>

      {/* 2. Controls & Search Bar */}
      <MotionReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-3xl border border-[#D5B46A]/30 shadow-warm space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Input */}
              <div className="md:col-span-8 relative">
                <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#173B35]/50" />
                <input
                  type="text"
                  placeholder="Search by artisan name, craft (e.g. Chanderi, Terracotta), or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] text-[#173B35] font-medium transition-colors"
                />
              </div>

              {/* Sorting Dropdown */}
              <div className="md:col-span-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C7794A] shrink-0" />
                <span className="text-xs font-bold text-[#173B35] shrink-0">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-3 text-xs rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/40 focus:outline-hidden focus:border-[#C7794A] text-[#173B35] font-semibold cursor-pointer"
                >
                  <option value="funded_desc">Funding Progress (Highest %)</option>
                  <option value="backers_desc">Most Supporters</option>
                  <option value="goal_asc">Smallest Goal First</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="pt-2 border-t border-[#FAF6F0] flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CRAFT_CATEGORIES.map((cat) => {
                const active =
                  currentCategory.toLowerCase() === cat.toLowerCase() ||
                  (cat === 'All' && !currentCategory);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      active
                        ? 'bg-[#173B35] text-white shadow-xs'
                        : 'bg-[#FAF6F0] text-[#263B36]/80 hover:bg-[#E7DEC9]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-[#263B36]/70 px-2">
            <span>
              Showing <strong>{filteredArtisans.length}</strong> verified artisan profiles
            </span>
            <span className="flex items-center gap-1 text-[#C7794A] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              100% Peer-to-Peer Verified
            </span>
          </div>
        </section>
      </MotionReveal>

      {/* 3. Artisan Cards Grid with Staggered Fade */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArtisans.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredArtisans.map((artisan, index) => (
                <motion.div
                  key={artisan.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ArtisanCard
                    artisan={artisan}
                    onQuickSupport={(a) => setSelectedArtisanForModal(a)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FFFFFF] rounded-3xl p-12 text-center border border-[#D5B46A]/30 max-w-md mx-auto space-y-4 shadow-warm"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#C7794A]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#173B35]">
              No Artisans Found
            </h3>
            <p className="text-xs text-[#263B36]/70">
              We couldn't find any artisans matching "{searchTerm}". Try clearing filters or searching for another craft.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#C7794A] text-white text-xs font-bold hover:bg-[#B56738] transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Quick Contribution Modal */}
      <ContributionModal
        artisan={selectedArtisanForModal}
        isOpen={!!selectedArtisanForModal}
        onClose={() => setSelectedArtisanForModal(null)}
      />

    </div>
  );
};
