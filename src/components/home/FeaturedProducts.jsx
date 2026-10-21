import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { PRODUCTS, CATEGORIES } from '../../data/products';

export default function FeaturedProducts({ onNavigateShop }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-brand-ivory py-20 border-b border-brand-border">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-tint border border-brand-gold/40 text-brand-gold-dark text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Formulations</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight">
            SIGNATURE <span className="text-brand-gold-dark">COLLECTION</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-brand-text max-w-xl mx-auto leading-relaxed">
            Every bottle is an ode to minimalism and efficacy. Hand-blended with high-performance botanical peptides and pure botanical oils.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-black text-brand-gold shadow-md border border-brand-gold/40'
                    : 'bg-white text-brand-muted hover:text-brand-black border border-brand-border hover:border-brand-gold/40'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-1.5 text-[10px] ${isActive ? 'text-brand-gold' : 'text-zinc-400'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View Full Catalog CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onNavigateShop}
            className="inline-flex items-center justify-center gap-3 bg-brand-black hover:bg-brand-charcoal text-white hover:text-brand-gold font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 rounded-sm border border-brand-gold/30 hover:border-brand-gold transition-all duration-300 shadow-lg"
          >
            <span>Explore Complete Boutique</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </button>
        </div>
      </div>
    </section>
  );
}
