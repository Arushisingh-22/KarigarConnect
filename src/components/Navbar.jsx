import React from 'react';
import { Database, PlusCircle, HeartHandshake, LogIn, LogOut } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Navbar({ isConfigured, onOpenSettings, onOpenAddArtisan, user, onOpenAuth, onSignOut }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-2 sm:h-18 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          
          {/* Logo & Platform Name */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white shadow-md shadow-orange-900/20">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-xl tracking-tight text-stone-900">Karigar<span className="text-amber-700">Connect</span></span>
                <span className="hidden xl:inline-flex text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full border border-amber-200">{t('Community support')}</span>
              </div>
              <p className="text-xs text-stone-500 hidden lg:block">{t('Connecting communities with Indian artisans')}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full shrink-0 items-center justify-end gap-1 sm:w-auto sm:gap-3">
            <label className="sr-only" htmlFor="language-select">{t('Language')}</label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-[4.5rem] min-w-0 shrink-0 rounded-lg border border-stone-200 bg-white px-1 sm:w-auto sm:px-2 py-1.5 text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
              aria-label={t('Select language')}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>

            {/* Database Connection Status Button */}
            <button
              onClick={onOpenSettings}
              className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all ${
                isConfigured 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
              title={t('Configure Supabase Database')}
              aria-label={t('Configure Supabase Database')}
            >
              <div className={`w-2 h-2 rounded-full animate-pulse ${isConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <Database className="w-4 h-4 text-stone-600" />
              <span className="hidden md:inline">
                {isConfigured ? t('Supabase Configured') : t('Database Settings')}
              </span>
            </button>

            <button
              onClick={user ? onSignOut : onOpenAuth}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition-all"
              aria-label={user ? t('Sign out') : t('Sign in')}
              title={user?.email || t('Sign in')}
            >
              {user ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span className="hidden lg:inline">{user ? t('Sign out') : t('Sign in')}</span>
            </button>

            {/* Register Artisan Button */}
            <button
              onClick={onOpenAddArtisan}
              className="flex items-center gap-2 px-2 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-amber-700 hover:bg-amber-800 text-white shadow-sm transition-all"
              aria-label={t('Register Artisan')}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('Register Artisan')}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
