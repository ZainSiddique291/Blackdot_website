import React from 'react';
import { ShieldCheck, Award, Heart, Droplets, CheckCircle, ChevronRight } from 'lucide-react';
import Logo from '../components/common/Logo';

export default function About({ onNavigateShop, onNavigateHome }) {
  return (
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <button onClick={onNavigateHome} className="hover:text-brand-black transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-brand-gold-dark font-medium uppercase tracking-wider">
            Brand Philosophy
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-brand-black text-white rounded-3xl p-6 sm:p-14 lg:p-20 relative overflow-hidden border border-brand-gold/30 shadow-2xl mb-12 sm:mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-block mb-4">
              <Logo variant="dark" size="sm" showTagline={false} />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold mb-2">
              OUR HERITAGE &amp; MISSION
            </p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
              One Dot. One Identity.{' '}
              <span className="text-brand-gold italic">Infinite Style.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-zinc-300 text-sm sm:text-lg leading-relaxed">
              Black Dot is an intentional departure from over-marketed, generic haircare. We believe genuine personal luxury should feel elemental, effortless, and visibly restorative from the very first lather.
            </p>
          </div>
        </div>

        {/* 2-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-brand-border shadow-luxury">
              <img
                src="/images/hero_stage.png"
                alt="Black Dot Artisanal Formulation"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-black">
              The Origin of the Dot
            </h2>
            <p className="text-sm sm:text-base text-brand-text leading-relaxed">
              In geometry and classic fine art, the dot represents the beginning of all creation—a single point of absolute focus from which infinite beauty unfolds.
            </p>
            <p className="text-sm sm:text-base text-brand-text leading-relaxed">
              When designing Black Dot, our formulators set out to solve a specific regional reality: Pakistani tap water is often mineral-heavy, while intense summer heat and humidity strips moisture from hair cuticles. Generic imported shampoos failed to address these specific stresses.
            </p>
            <p className="text-sm sm:text-base text-brand-text leading-relaxed">
              We engineered the signature <strong className="text-brand-black font-semibold">7-in-1 Advanced Hair Shampoo</strong> with cold-pressed Moroccan Argan Oil, bioactive Keratin peptides, and pure Biotin. It gently chelates harsh minerals while depositing a featherweight shield that locks in natural hydration for days.
            </p>
          </div>
        </div>

        {/* 4 Standards */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-brand-border shadow-sm mb-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl text-brand-black">
              The Black Dot Formulation Charter
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              Uncompromising benchmarks set for every bottle bearing the Black Dot seal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-brand-ivory border border-brand-border text-center">
              <Droplets className="w-8 h-8 text-brand-gold-dark mx-auto mb-3" />
              <h4 className="font-heading text-base font-semibold text-brand-black">Zero Harsh Sulfates</h4>
              <p className="text-xs text-brand-muted mt-2">Gentle micro-foaming agents that respect the scalp’s natural lipid barrier.</p>
            </div>

            <div className="p-6 rounded-xl bg-brand-ivory border border-brand-border text-center">
              <CheckCircle className="w-8 h-8 text-brand-gold-dark mx-auto mb-3" />
              <h4 className="font-heading text-base font-semibold text-brand-black">Fortified Keratin</h4>
              <p className="text-xs text-brand-muted mt-2">Micro-peptides bond to fractured cuticles for remarkable tensile strength.</p>
            </div>

            <div className="p-6 rounded-xl bg-brand-ivory border border-brand-border text-center">
              <ShieldCheck className="w-8 h-8 text-brand-gold-dark mx-auto mb-3" />
              <h4 className="font-heading text-base font-semibold text-brand-black">Halal &amp; Pure</h4>
              <p className="text-xs text-brand-muted mt-2">Cruelty-free, Halal certified, and completely free from animal by-products.</p>
            </div>

            <div className="p-6 rounded-xl bg-brand-ivory border border-brand-border text-center">
              <Award className="w-8 h-8 text-brand-gold-dark mx-auto mb-3" />
              <h4 className="font-heading text-base font-semibold text-brand-black">Bespoke Fragrance</h4>
              <p className="text-xs text-brand-muted mt-2">Subtle notes of warm amber and botanical cedarwood that linger gently.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <button
            onClick={onNavigateShop}
            className="px-8 py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase rounded shadow-lg transition-colors"
          >
            Experience the Signature Collection
          </button>
        </div>
      </div>
    </div>
  );
}
