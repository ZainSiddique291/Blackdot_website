import React, { useState } from 'react';
import { Eye, ShoppingBag, Star, Check } from 'lucide-react';
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
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white rounded-xl border border-brand-border/80 hover:border-brand-gold/50 transition-all duration-300 hover:shadow-luxury flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Stage */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-brand-ivory to-stone-100 overflow-hidden flex items-center justify-center p-6">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-brand-black text-brand-gold border border-brand-gold/30 rounded-full shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Volume Pill */}
        {product.volume && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-white/90 text-brand-black border border-brand-border rounded shadow-xs">
              {product.volume}
            </span>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-brand-black text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md border border-brand-border/60 flex items-center justify-center gap-1.5 transition-colors"
            title="Quick preview details"
          >
            <Eye className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>Details</span>
          </button>

          <button
            onClick={handleAdd}
            className="flex-1 py-2.5 px-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors"
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
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Category */}
          <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
            <span className="uppercase tracking-widest text-[10px] font-semibold text-brand-gold-dark">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-brand-black text-xs">{product.rating}</span>
              <span className="text-[11px] text-brand-muted">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading text-base sm:text-lg font-semibold text-brand-black group-hover:text-brand-gold-dark transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>

          {/* Short Subtitle */}
          {product.subtitle && (
            <p className="mt-1 text-xs text-brand-muted line-clamp-1">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Primary CTA */}
        <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-brand-black">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick Add icon button */}
          <button
            onClick={handleAdd}
            className="p-2 rounded-full bg-brand-ivory hover:bg-brand-gold text-brand-black transition-colors duration-200 shadow-xs"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-brand-black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
