import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentVolume = selectedVolume || product.volume || (product.sizes && product.sizes[0]) || 'Standard';

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVolume);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden z-10 my-auto sm:my-8 flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 hover:bg-brand-black hover:text-white text-brand-black transition-colors shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left Column: Image Gallery Stage */}
          <div className="bg-brand-ivory p-5 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-brand-border">
            {product.badge && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-1 bg-brand-black text-brand-gold text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full border border-brand-gold/40">
                {product.badge}
              </span>
            )}

            <div className="w-full max-w-xs aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-56 sm:max-h-72 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[11px] sm:text-xs text-brand-muted">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>100% Genuine Formula • Direct Laboratory Fresh</span>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                <span className="uppercase tracking-[0.2em] font-semibold text-brand-gold-dark">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-brand-black text-xs">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-black tracking-tight">
                {product.name}
              </h2>
              {product.subtitle && (
                <p className="text-xs sm:text-sm text-brand-gold-dark font-medium mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-brand-black">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-black rounded">
                    Save PKR {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-brand-text leading-relaxed">
                {product.description}
              </p>

              {/* Volume / Size Choices */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-2">
                    Select Size: <span className="text-brand-gold-dark">{currentVolume}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedVolume(sz)}
                        className={`px-4 py-2 text-xs font-semibold rounded border transition-all ${
                          currentVolume === sz
                            ? 'bg-brand-black text-brand-gold border-brand-black shadow-sm'
                            : 'bg-white text-brand-black border-brand-border hover:border-brand-gold'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Benefits Checklist */}
              {product.benefits && (
                <div className="mt-6 pt-5 border-t border-brand-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black mb-2.5 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <span>Formula Efficacy Highlights:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-brand-text">
                    {product.benefits.slice(0, 4).map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-brand-gold-dark mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="mt-8 pt-5 border-t border-brand-border flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center border border-brand-border rounded w-full sm:w-auto justify-between">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-brand-black hover:bg-black/5"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-brand-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-brand-black hover:bg-black/5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase rounded shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
