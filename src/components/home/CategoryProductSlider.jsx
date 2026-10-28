import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Eye, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function CategoryProductSlider({
  categoryTitle,
  categorySubtitle,
  categoryDescription,
  badgeText,
  categoryId,
  products = [],
  onNavigateShop,
}) {
  const { addToCart, setQuickViewProduct } = useCart();
  const sliderRef = useRef(null);
  const [addedProductId, setAddedProductId] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScrollBounds, 350);
  };

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1, product.volume || 'Standard');
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <section className="py-14 sm:py-18 border-b border-[#E5E1D8] relative overflow-hidden bg-white/40">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#E2C27A]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-xl">
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAD4] border border-[#C99A3B]/40 text-[#8C6219] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F29420]" />
                <span>{badgeText}</span>
              </div>
            )}
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#0B0B0B] tracking-tight">
              {categoryTitle}
            </h2>
            {categoryDescription && (
              <p className="mt-2 text-xs sm:text-sm text-[#55524D] leading-relaxed">
                {categoryDescription}
              </p>
            )}
          </div>

          {/* Controls: "View All" + Arrow Buttons */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            <button
              onClick={() => onNavigateShop?.(categoryId)}
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8C6219] hover:text-[#0B0B0B] transition-colors cursor-pointer mr-2"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous products"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  canScrollLeft
                    ? 'border-[#C99A3B]/50 bg-white text-[#0B0B0B] hover:bg-[#F5EAD4] shadow-xs active:scale-95'
                    : 'border-[#E5E1D8] bg-[#F7F5F0]/50 text-[#AAA7A0] cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next products"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  canScrollRight
                    ? 'border-[#C99A3B]/50 bg-white text-[#0B0B0B] hover:bg-[#F5EAD4] shadow-xs active:scale-95'
                    : 'border-[#E5E1D8] bg-[#F7F5F0]/50 text-[#AAA7A0] cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={sliderRef}
          onScroll={checkScrollBounds}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => {
            const isAdded = addedProductId === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setQuickViewProduct(product)}
                className="flex-shrink-0 w-[260px] sm:w-[290px] md:w-[320px] snap-start bg-white rounded-2xl border border-[#E5E1D8] hover:border-[#C99A3B]/60 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(11,11,11,0.07)] flex flex-col overflow-hidden cursor-pointer group"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-square bg-[#FBF9F5] overflow-hidden flex items-center justify-center p-4 sm:p-5">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#0B0B0B] text-[#C99A3B] border border-[#C99A3B]/40 rounded-full shadow-2xs">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Volume Tag */}
                  {product.volume && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider bg-white/90 text-[#333333] border border-[#E5E1D8] rounded-md shadow-2xs">
                        {product.volume}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-xl transition-transform duration-500 group-hover:scale-106 select-none"
                    loading="lazy"
                  />

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="flex-1 py-2 px-2.5 bg-white/95 hover:bg-white text-[#0B0B0B] text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-md border border-[#E5E1D8] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8C6219]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className="flex-1 py-2 px-2.5 bg-[#C99A3B] hover:bg-[#B3832B] text-[#0B0B0B] text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center text-amber-500 gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-[#0B0B0B] text-xs">{product.rating}</span>
                      </div>
                      <span className="text-[11px] text-[#777777]">
                        {product.reviewsCount} reviews
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-base font-semibold text-[#0B0B0B] group-hover:text-[#8C6219] transition-colors duration-200 line-clamp-1 leading-snug">
                      {product.name}
                    </h3>

                    {/* Subtitle */}
                    {product.subtitle && (
                      <p className="mt-1 text-xs text-[#66625D] line-clamp-1">
                        {product.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Price & Primary CTA */}
                  <div className="mt-4 pt-3 border-t border-[#E5E1D8]/70 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-bold text-[#0B0B0B]">
                        PKR {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#99948E] line-through">
                          PKR {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className="px-3 py-1.5 rounded-lg bg-[#F7F5F0] hover:bg-[#C99A3B] text-[#0B0B0B] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>Shop Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
