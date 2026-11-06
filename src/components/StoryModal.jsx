import React from 'react';
import { X, MapPin, Sparkles, HeartHandshake, Image } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function StoryModal({ artisan, isOpen, onClose, onOpenLend }) {
  const { language, t } = useLanguage();
  if (!isOpen || !artisan) return null;
  const story = artisan.story?.trim() || t('No story details have been shared for this profile.');
  const amountNeeded = Number(artisan.loan_amount || 0);
  const hasValidRequest = Number.isFinite(amountNeeded) && amountNeeded > 0;
  const isFullyFunded = amountNeeded > 0 && Number(artisan.amount_raised || 0) >= amountNeeded;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Image */}
        <div className="relative h-48 sm:h-64 bg-stone-200">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-100 via-stone-100 to-orange-100 text-amber-800">
            <Image className="w-8 h-8 opacity-70" aria-hidden="true" />
            <span className="text-xs font-medium">{t('Photo not provided')}</span>
          </div>
          {artisan.photo_url && (
            <img
              src={artisan.photo_url}
              alt={artisan.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors"
            aria-label={t('Close')}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-md">
            {t(artisan.craft)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-1.5 text-stone-500 text-sm font-medium mb-1">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>{artisan.village}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 break-words">{artisan.name}</h2>
          </div>

          {/* Full Story */}
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              {t('About this artisan')}
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {t(story)}
            </p>
          </div>

          {/* Footer Call to Action */}
          <div className="pt-4 border-t border-stone-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-stone-500">{t('Requested amount')}</p>
              <p className="text-xl font-bold text-stone-900">₹{amountNeeded.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
            </div>
            {!hasValidRequest ? (
              <span className="text-sm font-bold text-stone-500">{t('No valid funding request')}</span>
            ) : isFullyFunded ? (
              <span className="text-sm font-bold text-emerald-700">{t('Fully Funded')}</span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenLend(artisan);
                }}
                className="w-full sm:w-auto justify-center px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{t('Support This Artisan')}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
