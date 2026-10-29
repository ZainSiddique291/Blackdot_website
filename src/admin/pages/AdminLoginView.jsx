import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Shield,
  KeyRound,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLoginView({ onReturnStore }) {
  const { loginAdmin } = useAdminAuth();

  const [email, setEmail] = useState('admin@blackdot.pk');
  const [password, setPassword] = useState('blackdot2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(async () => {
      const res = await loginAdmin(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials. Please verify your email and key.');
      }
    }, 450);
  };

  const handleFillDemo = () => {
    setEmail('admin@blackdot.pk');
    setPassword('blackdot2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-center items-center p-4 relative selection:bg-brand-gold selection:text-brand-black overflow-hidden">
      {/* Ambient background luxury lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] border border-brand-gold/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-7 sm:p-9 z-10 animate-fadeIn text-white">
        {/* Brand Emblem & Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white/95 p-[3px] shadow-[0_4px_25px_rgba(201,154,59,0.35)] border border-brand-gold flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <img
              src="/images/blackdot_official_emblem.png"
              alt="Black Dot Sovereign Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
            />
          </div>

          <h2 className="font-heading font-bold text-2xl tracking-tight text-white">
            Black Dot
          </h2>
          <span className="font-body uppercase tracking-[0.25em] text-[9.5px] font-semibold text-brand-gold mt-1 flex items-center gap-1.5">
            <span>ONE DOT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F29420] inline-block shadow-[0_0_6px_rgba(242,148,32,0.6)]" />
            <span>INFINITE VISION</span>
          </span>

          <p className="text-xs text-zinc-400 mt-3 font-medium">
            Executive Commerce Administration
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-5 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Executive Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blackdot.pk"
                className="w-full bg-[#181818] text-xs text-white placeholder-zinc-500 pl-10 pr-3 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Executive Master Key
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#181818] text-xs text-white placeholder-zinc-500 pl-10 pr-10 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded text-zinc-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-brand-gold w-3.5 h-3.5"
              />
              <span>Remember session</span>
            </label>

            <button
              type="button"
              onClick={handleFillDemo}
              className="text-brand-gold hover:underline text-[11px] font-semibold cursor-pointer"
            >
              Fill Credentials
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating Executive...</span>
            ) : (
              <>
                <span>Access Administration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Return to Boutique */}
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <button
            onClick={onReturnStore}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-brand-gold transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Return to Public Boutique</span>
          </button>
        </div>
      </div>

      {/* Security Footer Notice */}
      <p className="text-[11px] text-zinc-500 mt-6 text-center max-w-sm">
        Protected by Black Dot 256-bit Executive Encryption. Authorized administration personnel only.
      </p>
    </div>
  );
}
