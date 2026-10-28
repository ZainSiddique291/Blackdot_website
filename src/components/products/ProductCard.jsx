import React, { useState } from 'react';
import { Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.volume || 'Standard');

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white rounded-2xl border border-brand-border/80 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(201,154,59,0.12)] flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Stage */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-brand-ivory to-stone-100 overflow-hidden flex items-center justify-center p-3 sm:p-6">
        {/* Top Oval Labels Bar */}
        <div className="absolute top-2 sm:top-3 inset-x-2 sm:inset-x-3 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
          {product.badge ? (
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-brand-black/90 backdrop-blur-xs text-brand-gold border border-brand-gold/30 rounded-full shadow-xs whitespace-nowrap">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {product.volume && (
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-black border border-brand-border rounded-full shadow-xs whitespace-nowrap ml-auto">
              {product.volume}
            </span>
          )}
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-108 select-none"
          loading="lazy"
        />

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 z-20 flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 sm:py-2.5 px-2 sm:px-3 bg-white/95 hover:bg-white text-brand-black text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md border border-brand-border/60 flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
            title="Quick preview details"
          >
            <Eye className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>Details</span>
          </button>

          <button
            onClick={handleAdd}
            className="flex-1 py-2 sm:py-2.5 px-2 sm:px-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
            title="Add directly to bag"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Category */}
          <div className="flex items-center justify-between text-xs text-brand-muted mb-1.5 sm:mb-2">
            <span className="uppercase tracking-widest text-[9.5px] sm:text-[10px] font-semibold text-brand-gold-dark truncate mr-1">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 flex-shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span className="font-semibold text-brand-black text-[11px] sm:text-xs">{product.rating}</span>
              <span className="text-[10px] sm:text-[11px] text-brand-muted">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading text-xs sm:text-base lg:text-lg font-semibold text-brand-black group-hover:text-brand-gold-dark transition-colors duration-200 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Short Subtitle */}
          {product.subtitle && (
            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-brand-muted line-clamp-1">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Primary CTA */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-brand-border/60 flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-2">
            <span className="text-xs sm:text-base lg:text-lg font-bold text-brand-black">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-zinc-400 line-through">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick Add icon button */}
          <button
            onClick={handleAdd}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-ivory hover:bg-brand-gold text-brand-black transition-colors duration-200 shadow-xs flex items-center justify-center flex-shrink-0 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 text-brand-black" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
