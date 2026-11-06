import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  totalPledged,
  activeArtisansCount
}) {
  const { language, t } = useLanguage();
  const categories = ['All', 'Pottery', 'Weaving', 'Metal Craft', 'Woodwork', 'Painting'];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-amber-50/60 via-stone-50 to-[#fbf9f5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {t('Community support • Transparent funding progress')}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            {t("Support India's Craft Heritage")} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800">
              {t('Discover artisan funding requests')}
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t('Explore artisan profiles and support the working-capital requests they have shared. Track each profile’s funding progress.')}
          </p>
        </div>

        {/* Live Impact Counters */}
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs text-center">
            <p className="text-xs font-medium text-stone-500 uppercase">{t('Community support tracked')}</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-800 mt-0.5">₹{(totalPledged || 0).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs text-center">
            <p className="text-xs font-medium text-stone-500 uppercase">{t('Artisan profiles')}</p>
            <p className="text-xl sm:text-2xl font-bold text-stone-800 mt-0.5">{activeArtisansCount}</p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('Search artisans')}
              placeholder={t('Search by artisan name, village, or craft...')}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent shadow-xs text-sm sm:text-base"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
