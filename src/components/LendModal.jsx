import React, { useState } from 'react';
import { X, Heart, Shield, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n';

export default function LendModal({ artisan, isOpen, onClose, onContribute }) {
  const { language, t } = useLanguage();
  const remainingNeeded = artisan
    ? Math.max(0, Number(artisan.loan_amount || 0) - Number(artisan.amount_raised || 0))
    : 0;
  const [amount, setAmount] = useState(() => Math.min(1000, remainingNeeded));
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const predefinedAmounts = [500, 1000, 2000, 5000];
  const currentLendAmount = customAmount !== '' ? Number(customAmount) : amount;

  if (!isOpen || !artisan) return null;

  const handleLendSubmit = async (e) => {
    e.preventDefault();
    if (!Number.isInteger(currentLendAmount) || currentLendAmount <= 0) {
      setErrorMsg(t('Enter a support amount greater than zero.'));
      return;
    }
    if (currentLendAmount > remainingNeeded) {
      setErrorMsg(t('Support amount cannot exceed the remaining request.'));
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const result = await onContribute(artisan.id, currentLendAmount);
      if (result?.error) {
        setErrorMsg(result.error);
        return;
      }
      if (result?.success !== true) {
        setErrorMsg(t('Unable to update funding progress.'));
        return;
      }
      setSuccess(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : t('Unable to update funding progress.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90dvh] overflow-y-auto shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-amber-50/50">
          <div>
            <h3 className="font-bold text-lg text-stone-900">{t('Support')} {artisan.name}</h3>
            <p className="text-xs text-stone-500">{t(artisan.craft)} • {artisan.village}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label={t('Close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div role="status" className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">{t('Thank you for your support!')}</h4>
            <p className="text-stone-600 text-sm">
              {t('Your support of ₹')}{currentLendAmount.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}{t(' has been added to the funding total for ')}{artisan.name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLendSubmit} className="p-6 space-y-5">
            
            {/* Quick Amount Selector */}
            <div>
              <label htmlFor="support-custom-amount" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t('Choose support amount (₹)')}
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {predefinedAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    disabled={amt > remainingNeeded}
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                      setErrorMsg('');
                    }}
                    aria-pressed={amount === amt && !customAmount}
                    className={`py-2 px-3 text-sm font-bold rounded-xl border transition-all ${
                      amount === amt && !customAmount
                        ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <input
                id="support-custom-amount"
                type="number"
                min="1"
                step="1"
                max={remainingNeeded}
                placeholder={t('Or enter custom amount in ₹')}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  const value = Number(e.target.value);
                  setErrorMsg(e.target.value && (!Number.isInteger(value) || value <= 0)
                    ? t('Enter a support amount greater than zero.')
                    : value > remainingNeeded
                      ? t('Support amount cannot exceed the remaining request.')
                      : '');
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <p className="text-xs text-stone-500 mt-1.5">
                {t('Remaining to be funded:')} <span className="font-semibold text-amber-800">₹{remainingNeeded.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
              </p>
            </div>

            {/* Transparency Note */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-start gap-2.5">
              <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-600 leading-relaxed">
                <span className="font-bold text-stone-800">{t('Prototype contribution:')}</span> {t('This updates the displayed funding total only. No payment or repayment is processed.')}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-800"
              >
                {t('Cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !Number.isFinite(currentLendAmount) || currentLendAmount <= 0 || currentLendAmount > remainingNeeded}
                className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isSubmitting ? t('Processing...') : `${t('Record support ₹')}${currentLendAmount.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}`}</span>
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                {errorMsg}
              </p>
            )}

          </form>
        )}

      </div>
    </div>
  );
}
