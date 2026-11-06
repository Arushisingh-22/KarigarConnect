import React, { useState } from 'react';
import { X, Plus, Wand2, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function AddArtisanModal({ isOpen, onClose, onAddArtisan, isConfigured }) {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    craft: '',
    village: '',
    loan_amount: '',
    photo_url: '',
    story: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const createStoryDraft = () => {
    const name = formData.name.trim();
    const craft = formData.craft.trim();
    const village = formData.village.trim();
    const amount = Number(formData.loan_amount);

    return language === 'hi'
      ? `${name} ${village} में ${craft} का काम करते हैं।${amount > 0 ? ` उनकी अनुरोधित राशि ₹${amount.toLocaleString('en-IN')} है।` : ''}`
      : `${name} is an artisan based in ${village}, working in ${craft}.${amount > 0 ? ` Their funding request is ₹${amount.toLocaleString('en-IN')}.` : ''}`;
  };

  const handleDraftStory = () => {
    if (!formData.name.trim() || !formData.craft.trim() || !formData.village.trim()) {
      setErrorMsg(t('Please enter the artisan’s name, craft, and village first.'));
      return;
    }

    setErrorMsg('');
    setFormData((prev) => ({ ...prev, story: createStoryDraft() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanAmount = Number(formData.loan_amount);
    if (!formData.name.trim() || !formData.craft.trim() || !formData.village.trim()) {
      setErrorMsg(t('Please complete all required fields.'));
      return;
    }
    if (!Number.isInteger(loanAmount) || loanAmount <= 0) {
      setErrorMsg(t('Enter a funding amount greater than zero.'));
      return;
    }
    const photoUrl = formData.photo_url.trim();
    if (photoUrl) {
      try {
        const parsedPhotoUrl = new URL(photoUrl);
        if (!['http:', 'https:'].includes(parsedPhotoUrl.protocol)) throw new Error('Invalid URL protocol');
      } catch {
        setErrorMsg(t('Enter a valid http or https photo URL.'));
        return;
      }
    }
    if (!e.currentTarget.reportValidity()) {
      setErrorMsg(t('Please correct the highlighted fields.'));
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newArtisan = {
      name: formData.name.trim(),
      craft: formData.craft.trim(),
      village: formData.village.trim(),
      loan_amount: loanAmount,
      amount_raised: 0,
      photo_url: photoUrl || null,
      story: formData.story.trim() || createStoryDraft()
    };

    try {
      const res = await onAddArtisan(newArtisan);
      if (res?.error) {
        setErrorMsg(res.error.startsWith('Supabase Error: ')
          ? `${t('Supabase Error: ')}${res.error.slice('Supabase Error: '.length)}`
          : res.error);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : t('Unable to save artisan profile.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-amber-50/50">
          <div>
            <h3 className="font-bold text-lg text-stone-900">{t('Register Rural Artisan')}</h3>
            <p className="text-xs text-stone-500">{t('Create a profile to share a funding request')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label={t('Close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div role="status" className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">{t('Profile added')}</h4>
            <p className="text-stone-600 text-sm">
              {isConfigured
                ? t('The record has been saved to your database and is now live on the platform.')
                : t('This profile is available for this session only. Connect Supabase to keep it after refresh.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {errorMsg && (
              <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="artisan-name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t('Artisan Full Name *')}
                </label>
                <input
                  id="artisan-name"
                  type="text"
                  required
                  placeholder={t('Enter the artisan’s full name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label htmlFor="artisan-craft" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t('Craft / Artform *')}
                </label>
                <input
                  id="artisan-craft"
                  type="text"
                  required
                  placeholder={t('Enter the artisan’s craft')}
                  value={formData.craft}
                  onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="artisan-village" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t('Village & State')} *
                </label>
                <input
                  id="artisan-village"
                  type="text"
                  required
                  placeholder={t('Enter the artisan’s village and state')}
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label htmlFor="artisan-loan-amount" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t('Funding request (₹) *')}
                </label>
                <input
                  id="artisan-loan-amount"
                  type="number"
                  required
                  min="1"
                  step="1"
                  placeholder={t('Enter the requested amount')}
                  value={formData.loan_amount}
                  onChange={(e) => setFormData({ ...formData, loan_amount: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            <div>
              <label htmlFor="artisan-photo-url" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('Artisan / Craft Photo URL')}
              </label>
              <input
                id="artisan-photo-url"
                type="url"
                placeholder={t('Paste a photo URL (optional)')}
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700 mb-2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="artisan-story" className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  {t('Artisan Story & Funding Request')}
                </label>
                <button
                  type="button"
                  onClick={handleDraftStory}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{t('Draft story')}</span>
                </button>
              </div>

              <textarea
                id="artisan-story"
                rows={4}
                placeholder={t('Describe the craft and how the requested funds will be used. Add only details confirmed by the artisan.')}
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-800"
              >
                {t('Cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isSubmitting ? t('Saving...') : t('Register profile')}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
