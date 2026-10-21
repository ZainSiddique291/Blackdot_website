import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    // Simulate immediate VIP welcome coupon delivery
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="bg-brand-charcoal text-white py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3">
          BLACK DOT PRIVÉ CLUB
        </p>

        <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
          Unlock 10% Off Your First Ritual
        </h2>

        <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          Subscribe to receive VIP access to limited small-batch formulations, haircare advice, and special private promotional offers.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-6 rounded-xl bg-white/[0.05] border border-brand-gold/40 text-center animate-fadeIn">
            <CheckCircle2 className="w-8 h-8 text-brand-gold mx-auto mb-2" />
            <h4 className="font-heading text-lg font-semibold text-white">Welcome to the Black Dot Circle</h4>
            <p className="text-zinc-300 text-xs sm:text-sm mt-1">
              Use code <strong className="text-brand-gold font-mono px-2 py-0.5 bg-brand-black rounded border border-brand-gold/40">BLACKDOT10</strong> at checkout for 10% off.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3.5 bg-brand-black border border-white/20 focus:border-brand-gold rounded-sm text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                  aria-label="Email Address"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors shadow-md"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-400 mt-2 text-left">{errorMessage}</p>
            )}

            <p className="text-[11px] text-zinc-400 mt-3">
              We respect your privacy. Unsubscribe anytime with one click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
