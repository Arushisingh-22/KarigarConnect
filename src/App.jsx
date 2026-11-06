import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtisanCard from './components/ArtisanCard';
import LendModal from './components/LendModal';
import StoryModal from './components/StoryModal';
import AddArtisanModal from './components/AddArtisanModal';
import DatabaseSettingsModal from './components/DatabaseSettingsModal';
import AuthModal from './components/AuthModal';
import { getSupabaseClient, getSupabaseConfig, fetchArtisans, insertArtisan, contributeToArtisan, signOut } from './lib/supabase';
import { ShieldCheck, RefreshCw, Layers, AlertCircle, PlusCircle } from 'lucide-react';
import { useLanguage } from './i18n';

export default function App() {
  const { t } = useLanguage();
  const [artisans, setArtisans] = useState([]);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoadError, setDataLoadError] = useState('');
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState(null);
  const loadRequestId = useRef(0);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals state
  const [selectedArtisanForLend, setSelectedArtisanForLend] = useState(null);
  const [selectedArtisanForStory, setSelectedArtisanForStory] = useState(null);
  const [isAddArtisanOpen, setIsAddArtisanOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load configuration and data
  const loadData = useCallback(async () => {
    const requestId = ++loadRequestId.current;
    const config = getSupabaseConfig();
    setIsSupabaseConfigured(config.isConfigured);

    if (!config.isConfigured) {
      setIsLoading(false);
      setArtisans([]);
      setDataLoadError('');
      setUser(null);
      return;
    }

    if (!getSupabaseClient()) setUser(null);
    setIsLoading(true);
    setDataLoadError('');
    try {
      const { data, error } = await fetchArtisans();
      if (requestId !== loadRequestId.current) return;
      if (error || !data) {
        setDataLoadError(error || 'Unable to load artisan profiles.');
        return;
      }
      setArtisans(data);
    } catch (error) {
      if (requestId !== loadRequestId.current) return;
      setDataLoadError(error instanceof Error ? error.message : 'Unable to load artisan profiles.');
    } finally {
      if (requestId === loadRequestId.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      return undefined;
    }

    let isActive = true;
    client.auth.getSession().then(({ data, error }) => {
      if (!isActive) return;
      if (error) {
        setAuthMessage({ type: 'error', text: error.message });
        return;
      }
      setUser(data.session?.user || null);
    }).catch((error) => {
      if (isActive) setAuthMessage({
        type: 'error',
        text: error instanceof Error ? error.message : t('Unable to restore your session.')
      });
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [isSupabaseConfigured, t]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      setAuthMessage(error
        ? { type: 'error', text: error }
        : { type: 'success', text: t('You have signed out.') });
    } catch (error) {
      setAuthMessage({
        type: 'error',
        text: error instanceof Error ? error.message : t('Unable to sign out.')
      });
    }
  };

  // Handle adding a new artisan
  const handleAddArtisan = async (newArtisanData) => {
    if (isSupabaseConfigured) {
      const { data, error } = await insertArtisan(newArtisanData);
      if (error) {
        return { error: `Supabase Error: ${error}` };
      }
      setArtisans((prev) => [data, ...prev]);
      return { success: true };
    } else {
      // Session-only profile when no database is configured.
      const localProfile = {
        ...newArtisanData,
        id: Date.now()
      };
      setArtisans((prev) => [localProfile, ...prev]);
      return { success: true };
    }
  };

  // Handle contributing a micro-loan
  const handleContribute = async (artisanId, amount) => {
    const target = artisans.find((a) => a.id === artisanId);
    if (!target) return { error: t('Unable to find this artisan profile.') };
    const requestedAmount = Number(amount);
    const remaining = Math.max(0, Number(target.loan_amount || 0) - Number(target.amount_raised || 0));
    if (!Number.isInteger(requestedAmount) || requestedAmount <= 0 || requestedAmount > remaining) {
      return { error: t('Enter a valid support amount within the remaining request.') };
    }

    const res = await contributeToArtisan(
      artisanId,
      target.amount_raised || 0,
      amount
    );

    if (!res.success) {
      return { error: res.error || t('Unable to update funding progress.') };
    }

    // Update local state so UI reflects new amount immediately
    setArtisans((prev) =>
      prev.map((item) =>
        item.id === artisanId
          ? {
              ...item,
              amount_raised: res.newRaised,
            }
          : item
      )
    );
    return { success: true };
  };

  // Filter artisans by category and search query
  const filteredArtisans = artisans.filter((artisan) => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const matchesSearch =
      !query ||
      artisan.name?.toLocaleLowerCase().includes(query) ||
      artisan.craft?.toLocaleLowerCase().includes(query) ||
      artisan.village?.toLocaleLowerCase().includes(query);

    const categoryTerms = [selectedCategory, t(selectedCategory)].map((term) => term.toLocaleLowerCase());
    const craft = artisan.craft?.toLocaleLowerCase() || '';
    const category = artisan.category?.toLocaleLowerCase() || '';
    const matchesCategory = selectedCategory === 'All' || categoryTerms.some((term) => (
      craft.includes(term) || category === term
    ));

    return matchesSearch && matchesCategory;
  });

  // Calculate platform totals
  const totalPledged = artisans.reduce((sum, artisan) => sum + Number(artisan.amount_raised || 0), 0);
  const hasActiveFilters = Boolean(searchQuery.trim()) || selectedCategory !== 'All';

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-stone-900 selection:bg-amber-200">
      
      {/* Navigation Bar */}
      <Navbar
        isConfigured={isSupabaseConfigured}
        user={user}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAddArtisan={() => setIsAddArtisanOpen(true)}
        onOpenAuth={() => {
          setAuthMessage(null);
          setIsAuthOpen(true);
        }}
        onSignOut={handleSignOut}
      />
      {authMessage && (
        <div
          role={authMessage.type === 'error' ? 'alert' : 'status'}
          className={`border-b px-4 py-2 text-center text-xs ${
            authMessage.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          {authMessage.text}
        </div>
      )}

      {/* Hero Header & Search Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalPledged={totalPledged}
        activeArtisansCount={artisans.length}
      />

      {/* Main Artisan Cards Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Section Title & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              {t('Artisan funding requests')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {t('Browse artisan profiles and review their craft and funding request.')}
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={isLoading}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg shadow-2xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{t('Sync Data')}</span>
          </button>
        </div>

        {/* Artisan Cards Grid */}
        {dataLoadError ? (
          <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-center max-w-xl mx-auto my-8" role="alert">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-bold text-red-900 mb-1">{t('Unable to load artisan profiles')}</h3>
            <p className="text-sm text-red-800 break-words">{dataLoadError}</p>
            <button
              onClick={loadData}
              disabled={isLoading}
              className="mt-4 px-3 py-1.5 text-xs font-bold text-red-900 bg-white border border-red-200 hover:bg-red-100 rounded-lg disabled:opacity-50"
            >
              {t('Try again')}
            </button>
          </div>
        ) : isLoading ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8" role="status">
            <RefreshCw className="w-8 h-8 text-amber-700 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-stone-600">{t('Loading artisan profiles...')}</p>
          </div>
        ) : filteredArtisans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <Layers className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-bold text-stone-800 text-lg mb-1">
              {hasActiveFilters ? t('No Artisans Found') : t('No artisan profiles yet')}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {hasActiveFilters
                ? t('Try adjusting your search query or category filter.')
                : isSupabaseConfigured
                  ? t('Register the first artisan profile to get started.')
                  : t('Connect a database to load published profiles. You can also add a profile for this session.')}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg"
              >
                {t('Reset Filters')}
              </button>
            ) : (
              <button
                onClick={() => setIsAddArtisanOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 px-3 py-1.5 rounded-lg"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {t('Register Artisan')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                onSelectForLend={(a) => setSelectedArtisanForLend(a)}
                onSelectForStory={(a) => setSelectedArtisanForStory(a)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-base mb-2">{t('KarigarConnect Artisan Community Support')}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t('Discover artisan profiles and review the funding needs they have shared. Follow each request’s progress and choose whether to support a maker.')}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-2">{t('How It Works')}</h4>
              <ul className="text-xs text-stone-400 space-y-1.5">
                <li>{t('• Browse artisan profiles and their funding requests.')}</li>
                <li>{t('• Choose a contribution amount to update funding progress.')}</li>
                <li>{t('• Connect Supabase to load and save profile totals.')}</li>
                <li>{t('• This prototype does not process payments or repayments.')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-2">{t('About KarigarConnect')}</h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">
                {t('Profiles and stories use details shared during registration. Funding totals show recorded support only; payments and repayments are not processed.')}
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-800 border border-stone-700 text-[11px] text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('Prototype • No payment processing')}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-500">
            {t('KarigarConnect • Community Support Prototype')}
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LendModal
        key={selectedArtisanForLend?.id || 'closed'}
        artisan={selectedArtisanForLend}
        isOpen={Boolean(selectedArtisanForLend)}
        onClose={() => setSelectedArtisanForLend(null)}
        onContribute={handleContribute}
      />

      <StoryModal
        artisan={selectedArtisanForStory}
        isOpen={Boolean(selectedArtisanForStory)}
        onClose={() => setSelectedArtisanForStory(null)}
        onOpenLend={(a) => setSelectedArtisanForLend(a)}
      />

      <AddArtisanModal
        isOpen={isAddArtisanOpen}
        onClose={() => setIsAddArtisanOpen(false)}
        onAddArtisan={handleAddArtisan}
        isConfigured={isSupabaseConfigured}
      />

      {isSettingsOpen && (
        <DatabaseSettingsModal
          isOpen
          onClose={() => setIsSettingsOpen(false)}
          onConfigSaved={loadData}
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        isConfigured={isSupabaseConfigured}
        onOpenSettings={() => {
          setIsAuthOpen(false);
          setIsSettingsOpen(true);
        }}
        onAuthSuccess={(session) => setUser(session.user)}
      />

    </div>
  );
}
