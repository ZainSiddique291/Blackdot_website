import React from 'react';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export default function PromoBanner({ onNavigateShop }) {
  const { addToCart } = useCart();
  const bundleProduct = PRODUCTS.find((p) => p.id === 'bd-bundle-complete') || PRODUCTS[0];

  return (
    <section className="bg-gradient-to-r from-brand-black via-brand-charcoal to-brand-black text-white py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
      {/* Decorative Gold Rings with subtle ambient breathing motion */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-gold/15 pointer-events-none animate-pulse-slow" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-brand-gold/10 pointer-events-none animate-float-gentle" />

      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Gift className="w-3.5 h-3.5 text-brand-gold-light" />
              <span>LIMITED EDITION OFFER</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              The Complete Hair <span className="text-brand-gold italic">Transformation Ritual</span>
            </h2>

            <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Experience the synergistic power of our 7-in-1 Advanced Shampoo, Keratin Silk Conditioner, and Restorative Argan Oil. Includes a complimentary gold scalp stimulating massager.
            </p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                PKR 5,499
              </span>
              <span className="text-base text-zinc-400 line-through">
                PKR 6,550
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-brand-gold text-brand-black shadow-xs">
                Save PKR 1,051
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => addToCart(bundleProduct, 1, 'Full Ritual Set')}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 rounded-sm shadow-lg transition-all duration-300 hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>CLAIM LUXURY BUNDLE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNavigateShop}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-brand-gold text-zinc-300 hover:text-brand-gold text-xs sm:text-sm tracking-[0.2em] uppercase px-6 py-4 rounded-sm transition-colors"
              >
                <span>Browse All Sets</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl p-2 bg-white/5 group">
              <img
                src="/images/hero_stage.png"
                alt="Black Dot Luxury Ritual Set"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-5 right-5 px-3 py-1 bg-brand-black/90 text-brand-gold border border-brand-gold/40 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                Full 3-Step Routine
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
