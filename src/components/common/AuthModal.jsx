import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';
import GoogleAuthDialog from './GoogleAuthDialog';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const {
    login,
    signup,
    loginWithGoogle,
    authMode,
    setAuthMode,
    authRedirectReason,
    authPromptMessage,
    showAuthToast,
  } = useAuth();

  const [isLogin, setIsLogin] = useState(authMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Reset form errors when switching tabs
  const handleSwitchTab = (toLogin) => {
    setIsLogin(toLogin);
    setAuthMode(toLogin ? 'login' : 'signup');
    setErrorMessage('');
  };

  if (!isOpen) return null;

  const handleFinishSuccess = (authenticatedUser) => {
    setIsSuccess(true);
    setSuccessUser(authenticatedUser);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onAuthSuccess) {
        onAuthSuccess(authenticatedUser);
      }
    }, 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Authentication failed. Please try again.');
          setIsSubmitting(false);
          return;
        }
        handleFinishSuccess(res.user);
      } else {
        const res = await signup(name, email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Registration failed. Please check your details.');
          setIsSubmitting(false);
          return;
        }
        handleFinishSuccess(res.user);
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuthSuccess = async (googleUser) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await loginWithGoogle(googleUser);
      if (res.success) {
        handleFinishSuccess(res.user);
      } else {
        setErrorMessage(res.error || 'Google authentication failed.');
        setIsSubmitting(false);
      }
    } catch {
      setErrorMessage('Google authentication could not be completed.');
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoFill = () => {
    setIsLogin(true);
    setAuthMode('login');
    setEmail('vip@blackdot.pk');
    setPassword('password123');
    setErrorMessage('');
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      showAuthToast(`Password reset ritual link dispatched to ${forgotEmail}`);
    }, 1800);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <div className="relative w-full max-w-md bg-brand-black text-white rounded-2xl shadow-[0_0_50px_rgba(201,154,59,0.2)] border border-brand-gold/30 p-6 sm:p-8 z-10 animate-fadeIn my-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-brand-gold transition-colors rounded-full hover:bg-white/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Checkout Guard Notice Banner */}
          {authRedirectReason === 'checkout' && !isSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-brand-gold/10 border border-brand-gold/40 flex items-start gap-3 animate-fadeIn">
              <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  VIP Access Required for Checkout
                </p>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {authPromptMessage ||
                    'Please sign in or register to complete your order. Your shopping bag will be preserved.'}
                </p>
              </div>
            </div>
          )}

          {/* Brand Monogram Header */}
          <div className="text-center mb-6">
            <div className="inline-block mx-auto mb-2">
              <Logo variant="dark" size="sm" showTagline={false} />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-white tracking-tight">
              {isLogin ? 'VIP Member Login' : 'VIP Member Sign In'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              {isLogin
                ? 'Enter your credentials to access your luxury profile, orders, and benefits.'
                : 'Sign in to create your VIP membership and receive invitations to private rituals.'}
            </p>
          </div>

          {/* Success Celebratory View */}
          {isSuccess ? (
            <div className="py-8 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-brand-gold mx-auto mb-4 shadow-gold-glow animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold mb-1">
                ACCESS GRANTED
              </p>
              <h4 className="font-heading text-xl sm:text-2xl font-semibold text-white">
                {isLogin ? `Welcome Back, ${successUser?.name || 'VIP Member'}` : 'Membership Activated!'}
              </h4>
              <p className="text-xs text-zinc-400 mt-2">
                {authRedirectReason === 'checkout'
                  ? 'Redirecting to your secure checkout...'
                  : 'Opening your VIP luxury suite...'}
              </p>
            </div>
          ) : (
            <div>
              {/* Luxury Tab Switcher */}
              <div className="flex border-b border-white/10 mb-6 text-xs uppercase tracking-wider font-semibold">
                <button
                  type="button"
                  onClick={() => handleSwitchTab(true)}
                  className={`flex-1 py-3 text-center border-b-2 transition-all duration-300 cursor-pointer ${
                    isLogin
                      ? 'border-brand-gold text-brand-gold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchTab(false)}
                  className={`flex-1 py-3 text-center border-b-2 transition-all duration-300 cursor-pointer ${
                    !isLogin
                      ? 'border-brand-gold text-brand-gold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* 1. Google Authentication Button (Luxury styled) */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setIsGoogleModalOpen(true)}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-brand-gold/60 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-xs sm:text-sm font-medium shadow-sm hover:shadow-gold-glow group cursor-pointer"
                >
                  {/* Google 'G' Multi-color SVG */}
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span className="text-zinc-200 group-hover:text-white">
                    {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                  </span>
                </button>
              </div>

              {/* Or Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-brand-black px-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  or with email
                </span>
                <div className="border-t border-white/10 w-full" />
              </div>

              {/* Main Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name (Sign Up only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-brand-gold/70 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asif Ali"
                        className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] border border-white/15 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-brand-gold/70 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] border border-white/15 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                      Password *
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-[11px] text-zinc-400 hover:text-brand-gold transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-brand-gold/70 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
                      className="w-full pl-9 pr-10 py-2.5 bg-white/[0.04] border border-white/15 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Must be at least 6 characters with secure credentials.
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs uppercase tracking-[0.2em] rounded-lg shadow-lg hover:shadow-gold-glow transition-all duration-300 mt-5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>AUTHENTICATING...</span>
                  ) : isLogin ? (
                    <>
                      <span>LOGIN TO VIP PORTAL</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>SIGN IN / CREATE MEMBERSHIP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* VIP Demo Helper Pill */}
              <div className="mt-5 pt-4 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 rounded-full text-[11px] text-brand-gold transition-colors cursor-pointer"
                  title="Click to auto-fill demo VIP credentials"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Quick Demo: vip@blackdot.pk</span>
                </button>
              </div>

              {/* Bottom Switcher */}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => handleSwitchTab(!isLogin)}
                  className="text-xs text-zinc-400 hover:text-brand-gold transition-colors"
                >
                  {isLogin
                    ? "Don't have an account yet? Sign in here"
                    : 'Already registered? Login to portal'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Google Sign-In Dialog */}
      <GoogleAuthDialog
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onGoogleSuccess={handleGoogleAuthSuccess}
      />

      {/* Forgot Password Sub-Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowForgotModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-sm bg-brand-black text-white rounded-xl border border-brand-gold/40 p-6 z-10 animate-fadeIn">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="font-heading text-lg font-semibold text-white mb-2">
              VIP Password Concierge
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              Enter your registered Black Dot email to receive a secure recovery code.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded bg-brand-gold/10 border border-brand-gold text-center">
                <CheckCircle2 className="w-6 h-6 text-brand-gold mx-auto mb-1" />
                <p className="text-xs font-semibold text-white">Instructions Dispatched</p>
                <p className="text-[11px] text-zinc-300 mt-1">Please check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-sm text-white focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold uppercase tracking-wider rounded"
                >
                  Send Recovery Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
