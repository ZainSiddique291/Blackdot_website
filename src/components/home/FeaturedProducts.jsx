import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../products/ProductCard';
import { PRODUCTS, CATEGORIES } from '../../data/products';

export default function FeaturedProducts({ onNavigateShop }) {
  // Filter out "All Products" from the Signature Collections category pills
  const categoriesWithoutAll = CATEGORIES.filter((cat) => cat.id !== 'all');
  const [activeCategory, setActiveCategory] = useState(categoriesWithoutAll[0]?.id || 'creams');
  const [showAllBoutique, setShowAllBoutique] = useState(false);

  // When "Explore Complete Boutique" is clicked, display all available products
  const filteredProducts = showAllBoutique
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleCategorySelect = (catId) => {
    setShowAllBoutique(false);
    setActiveCategory(catId);
  };

  const handleExploreBoutique = () => {
    setShowAllBoutique(true);
  };

  return (
    <section className="bg-brand-ivory py-20 border-b border-brand-border relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-brand-black tracking-tight">
            SIGNATURE <span className="text-brand-gold-dark italic">COLLECTION</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-brand-text max-w-xl mx-auto leading-relaxed">
            Every bottle is an ode to minimalism and efficacy. Hand-blended with high-performance botanical peptides and pure botanical oils.
          </p>
        </motion.div>

        {/* Category Filter Pills (Without "All Products") */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {categoriesWithoutAll.map((cat) => {
            const isActive = !showAllBoutique && activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-brand-black text-brand-gold shadow-md border border-brand-gold/40 scale-102'
                    : 'bg-white text-brand-muted hover:text-brand-black border border-brand-border hover:border-brand-gold/40'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-1 sm:ml-1.5 text-[9.5px] sm:text-[10px] ${isActive ? 'text-brand-gold' : 'text-zinc-400'}`}>
                  ({cat.count})
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Products Grid with smooth animation */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Catalog CTA */}
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExploreBoutique}
            className="inline-flex items-center justify-center gap-3 bg-brand-black hover:bg-brand-charcoal text-white hover:text-brand-gold font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 rounded-sm border border-brand-gold/30 hover:border-brand-gold transition-all duration-300 shadow-lg cursor-pointer"
          >
            <span>Explore Complete Boutique</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
