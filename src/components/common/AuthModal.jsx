import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md bg-brand-black text-white rounded-2xl shadow-2xl border border-brand-gold/30 p-8 z-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Monogram */}
        <div className="text-center mb-6">
          <div className="inline-block mx-auto mb-2">
            <Logo variant="dark" size="sm" showTagline={false} />
          </div>
          <h3 className="font-heading text-2xl font-semibold text-white">
            {isLogin ? 'VIP Member Concierge' : 'Join the Black Dot Circle'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {isLogin
              ? 'Access private reservations, order history, and exclusive benefits.'
              : 'Sign up to receive 10% off your initial ritual and invitations.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-brand-gold mx-auto mb-3">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="font-heading text-lg font-semibold text-white">
              {isLogin ? 'Welcome Back!' : 'Account Created!'}
            </h4>
            <p className="text-xs text-zinc-400 mt-1">Authenticating your session...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Asif Ali"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs uppercase tracking-[0.2em] rounded shadow-md transition-colors mt-6"
            >
              {isLogin ? 'Sign In to Portal' : 'Create VIP Membership'}
            </button>

            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-zinc-400 hover:text-brand-gold transition-colors"
              >
                {isLogin
                  ? "Don't have an account yet? Create one here"
                  : 'Already a member? Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
