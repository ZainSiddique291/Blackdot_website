import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    id: 'shampoo',
    title: 'Advanced Shampoos',
    subtitle: '7-in-1 Restorative & Cleansing Solutions',
    image: '/images/hero_stage.png',
    itemsCount: '2 Formulations',
  },
  {
    id: 'treatment',
    title: 'Botanical Oils & Serums',
    subtitle: 'Virgin Argan, Biotin & Thermal Glass Shields',
    image: '/images/bottles_crop.png',
    itemsCount: '2 Formulations',
  },
  {
    id: 'bundles',
    title: 'Luxury Ritual Bundles',
    subtitle: 'Curated 3-Piece Transformations with Gold Scalp Massager',
    image: '/images/hero_full_reference.jpg',
    itemsCount: '1 Curated Box',
  },
];

export default function CategorySection({ onSelectCategory }) {
  return (
    <section className="bg-white py-20 border-b border-brand-border">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold-dark mb-2">
              DISCOVER BY RITUAL
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-black tracking-tight">
              SHOP BY <span className="text-brand-gold-dark">CATEGORY</span>
            </h2>
          </div>
        </div>

        {/* 3 Large Category Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
