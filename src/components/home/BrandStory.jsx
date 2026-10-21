import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Feather } from 'lucide-react';
import Logo from '../common/Logo';

export default function BrandStory({ onNavigateAbout }) {
  return (
    <section className="bg-brand-black text-white py-24 border-b border-white/10 relative overflow-hidden">
      {/* Decorative Gold Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Composition & Monogram */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-brand-gold/30 p-2 bg-gradient-to-tr from-white/5 to-white/10 shadow-2xl">
              <img
                src="/images/hero_full_reference.jpg"
                alt="Black Dot Brand Essence and Philosophy"
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
              
              {/* Gold Crest floating stamp */}
              <div className="absolute bottom-6 right-6 p-4 rounded-xl glass-dark border border-brand-gold/40 shadow-2xl flex items-center gap-3">
                <Logo variant="dark" size="sm" showTagline={false} />
                <div className="border-l border-white/20 pl-3">
                  <p className="text-[10px] tracking-widest uppercase text-brand-gold font-bold">ESTABLISHED</p>
                  <p className="text-xs text-zinc-300 font-medium">Original Formulas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              <Feather className="w-4 h-4" />
              <span>THE PHILOSOPHY OF BLACK DOT</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              One Dot. One Identity.{' '}
              <span className="text-brand-gold italic">Infinite Style.</span>
            </h2>

            <p className="mt-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              In a world flooded with complicated routines and synthetic fillers, <strong className="text-white font-semibold">Black Dot</strong> was born from a singular conviction: genuine luxury lies in uncompromising efficacy and elemental purity.
            </p>

            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Inspired by monochrome minimalism and modern Pakistani lifestyle needs, each formula marries clinically potent actives—like hydrolyzed keratin and pure biotin—with cold-pressed botanical nectars. The result is transformative hair wellness that elevates your morning ritual into an exquisite personal sanctuary.
            </p>

            {/* 3 Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-brand-gold font-heading text-xl font-medium">Purity First</h4>
                <p className="text-xs text-zinc-400 mt-1">Free from parabens, harsh sulfates, and artificial silicones.</p>
              </div>
              <div>
                <h4 className="text-brand-gold font-heading text-xl font-medium">Bespoke Care</h4>
                <p className="text-xs text-zinc-400 mt-1">Calibrated for regional water hardness and humidity levels.</p>
              </div>
              <div>
                <h4 className="text-brand-gold font-heading text-xl font-medium">Conscious Art</h4>
                <p className="text-xs text-zinc-400 mt-1">Cruelty-free, Halal certified, and ethically crafted.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                onClick={onNavigateAbout}
                className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-brand-gold hover:text-white transition-colors group"
              >
                <span>Read Full Brand Memoir</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
