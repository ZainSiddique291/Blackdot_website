import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    id: 'creams',
    title: 'Beauty Creams',
    subtitle: 'Illuminating Day, Restorative Night & Peptide Creams',
    image: '/images/products/cream_day.jpg',
    itemsCount: '3 Formulations',
  },
  {
    id: 'serums',
    title: 'Signature Serums',
    subtitle: 'Stabilized Vitamin C, Hyaluronic Acid & Niacinamide',
    image: '/images/products/serum_vitc.jpg',
    itemsCount: '4 Formulations',
  },
  {
    id: 'lotions',
    title: 'Luxury Lotions',
    subtitle: 'Deep Hydration 48-Hour & Velvet Touch Body Emulsions',
    image: '/images/products/lotion_hydration.jpg',
    itemsCount: '3 Formulations',
  },
  {
    id: 'shampoo',
    title: 'Advanced Haircare',
    subtitle: '7-in-1 Botanical Restorative Shampoos & Oils',
    image: '/images/hero_stage.png',
    itemsCount: '2 Formulations',
  },
];

export default function CategorySection({ onSelectCategory }) {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-brand-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold-dark mb-2">
              DISCOVER BY RITUAL
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-black tracking-tight">
              SHOP BY <span className="text-brand-gold-dark">CATEGORY</span>
            </h2>
          </div>
        </div>

        {/* 4 Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-border hover:border-brand-gold/60 hover:-translate-y-1.5"
            >
              {/* Background Product Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent transition-opacity duration-300 group-hover:via-brand-black/50" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                {/* Top Badge */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-gold bg-brand-black/80 rounded-full border border-brand-gold/30 backdrop-blur-md shadow-xs">
                    {cat.itemsCount}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-brand-black group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Subtitle */}
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-white group-hover:text-brand-gold transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm mt-2 line-clamp-2">
                    {cat.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore Collection →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
