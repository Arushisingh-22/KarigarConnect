import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, LogIn, UserPlus, X } from 'lucide-react';
import { signInWithPassword, signUpWithPassword } from '../lib/supabase';
import { useLanguage } from '../i18n';

export default function AuthModal({ isOpen, onClose, isConfigured, onOpenSettings, onAuthSuccess }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!isConfigured) {
      setErrorMessage(t('Connect Supabase before signing in or creating an account.'));
      return;
    }

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrorMessage(t('Enter a valid email address.'));
      return;
    }
    if (password.length < 6) {
      setErrorMessage(t('Password must be at least 6 characters.'));
      return;
    }

    setIsSubmitting(true);
    try {
      const result = mode === 'signin'
        ? await signInWithPassword(normalizedEmail, password)
        : await signUpWithPassword(normalizedEmail, password);

      if (result.error) {
        setErrorMessage(result.error);
      } else if (mode === 'signup' && !result.data?.session) {
        setSuccessMessage(t('Account created. Check your email to confirm it, then sign in.'));
      } else if (result.data?.session) {
        onAuthSuccess(result.data.session);
        onClose();
      } else {
        setErrorMessage(t('Authentication completed without an active session. Please try signing in.'));
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('Unable to complete authentication.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90dvh] overflow-y-auto shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-amber-50/50">
          <div>
            <h2 className="font-bold text-lg text-stone-900">
              {mode === 'signin' ? t('Sign in to KarigarConnect') : t('Create a KarigarConnect account')}
            </h2>
            <p className="text-xs text-stone-500">{t('Authentication is handled by your configured Supabase project.')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label={t('Close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isConfigured && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-xl">
              <p>{t('Connect a Supabase project to use account registration and sign in.')}</p>
              <button
                type="button"
                onClick={onOpenSettings}
                className="mt-2 text-xs font-bold underline"
              >
                {t('Open database settings')}
              </button>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              {t('Email address')}
            </label>
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              {t('Password')}
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength="6"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          {errorMessage && (
            <div role="alert" className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div role="status" className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isConfigured}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            {isSubmitting
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : mode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            {isSubmitting ? t('Please wait...') : mode === 'signin' ? t('Sign in') : t('Create account')}
          </button>

          <p className="text-center text-xs text-stone-600">
            {mode === 'signin' ? t('Need an account?') : t('Already have an account?')}{' '}
            <button
              type="button"
              onClick={() => changeMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-bold text-amber-800 hover:underline"
            >
              {mode === 'signin' ? t('Create account') : t('Sign in')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
