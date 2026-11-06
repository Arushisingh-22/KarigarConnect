import React from 'react';
import { MapPin, Image, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function ArtisanCard({ artisan, onSelectForLend, onSelectForStory }) {
  const { language, t } = useLanguage();
  const story = artisan.story?.trim() || t('No story details have been shared for this profile.');
  const amountNeeded = Number(artisan.loan_amount || 0);
  const amountRaised = Number(artisan.amount_raised || 0);
  const percentRaised = amountNeeded > 0
    ? Math.min(100, Math.round((amountRaised / amountNeeded) * 100))
    : 0;
  const hasValidRequest = Number.isFinite(amountNeeded) && amountNeeded > 0;
  const isFullyFunded = amountNeeded > 0 && percentRaised >= 100;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
      
      {/* Image Banner */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-100 via-stone-100 to-orange-100 text-amber-800">
          <Image className="w-8 h-8 opacity-70" aria-hidden="true" />
          <span className="text-xs font-medium">{t('Photo not provided')}</span>
        </div>
        {artisan.photo_url && (
          <img
            src={artisan.photo_url}
            alt={artisan.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className="absolute top-3 left-3 bg-stone-900/75 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
          {t(artisan.craft)}
        </div>
        {isFullyFunded && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('Fully Funded')}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Name */}
          <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>{artisan.village}</span>
          </div>

          <h3 className="text-xl font-bold text-stone-900 mb-2 break-words">{artisan.name}</h3>

          {/* Story Preview */}
          <p className="text-stone-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {t(story)}
          </p>
        </div>

        {/* Loan Progress Section */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-1 mb-1.5">
            <span className="text-xs font-semibold text-stone-500">{t('Funded')}</span>
            <span className="text-xs font-bold text-stone-900">
              ₹{amountRaised.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')} <span className="font-normal text-stone-500">{t('of ')}₹{amountNeeded.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFullyFunded ? 'bg-emerald-600' : 'bg-gradient-to-r from-amber-600 to-orange-500'
              }`}
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex justify-end items-center text-xs text-stone-500 mb-4 font-medium">
            <span>{percentRaised}% {t('Funded')}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectForStory(artisan)}
              aria-label={`${t('Read Story')}: ${artisan.name}`}
              className="w-full py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              {t('Read Story')}
            </button>
            <button
              onClick={() => onSelectForLend(artisan)}
              aria-label={`${!hasValidRequest ? t('No valid request') : isFullyFunded ? t('Completed') : t('Support Now')}: ${artisan.name}`}
              disabled={!hasValidRequest || isFullyFunded}
              className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                !hasValidRequest || isFullyFunded
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-amber-700 hover:bg-amber-800 text-white shadow-xs'
              }`}
            >
              <span>{!hasValidRequest ? t('No valid request') : isFullyFunded ? t('Completed') : t('Support Now')}</span>
              {hasValidRequest && !isFullyFunded && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
