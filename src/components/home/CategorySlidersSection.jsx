import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Eye, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

const SLIDES = [
  {
    id: 'creams',
    heading: 'Creams',
    subtitle: 'Intensive restorative beauty creams engineered for 24-hour hydration, deep cell renewal, and skin illumination.',
    categoryId: 'creams',
    filterCategory: 'creams',
  },
  {
    id: 'serums',
    heading: 'Serums',
    subtitle: 'High-potency active concentrates formulated with stabilized Vitamin C, multi-molecular Hyaluronic Acid, and Niacinamide.',
    categoryId: 'serums',
    filterCategory: 'serums',
  },
  {
    id: 'lotions',
    heading: 'Lotions',
    subtitle: 'Luxurious daily body hydrators and emulsions crafted with cold-pressed botanical oils, shea butter, and aloe.',
    categoryId: 'lotions',
    filterCategory: 'lotions',
  },
];

export default function CategorySlidersSection({ onNavigateShop }) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedProductId, setAddedProductId] = useState(null);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1, product.volume || 'Standard');
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const activeSlideData = SLIDES[currentSlide];

  return (
    <section className="py-16 sm:py-20 border-b border-[#E5E1D8] relative overflow-hidden bg-white/40">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E2C27A]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C99A3B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Slide Heading & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-xl">
            {/* Dynamic Animated Section Heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlideData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#0B0B0B] tracking-tight">
                  {activeSlideData.heading}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#55524D] leading-relaxed">
                  {activeSlideData.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: Slide Switcher Pills, "View All" + Arrows */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start md:self-auto">
            {/* Slide Navigation Pills */}
            <div className="flex items-center gap-1.5 bg-[#F7F5F0] p-1 rounded-full border border-[#E5E1D8]">
              {SLIDES.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0B0B0B] text-[#C99A3B] shadow-xs'
                        : 'text-[#66625D] hover:text-[#0B0B0B]'
                    }`}
                  >
                    {slide.heading}
                  </button>
                );
              })}
            </div>

            {/* View All Shop Link */}
            <button
              onClick={() => onNavigateShop?.(activeSlideData.categoryId)}
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8C6219] hover:text-[#0B0B0B] transition-colors cursor-pointer ml-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Slide Carousel Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C99A3B]/50 bg-white text-[#0B0B0B] hover:bg-[#F5EAD4] shadow-xs active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C99A3B]/50 bg-white text-[#0B0B0B] hover:bg-[#F5EAD4] shadow-xs active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Shared Slider / Carousel Container with 3 Separate Slides */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex w-full"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          >
            {SLIDES.map((slide) => {
              const slideProducts = PRODUCTS.filter((p) => p.category === slide.filterCategory);

              return (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0"
                >
                  {/* 4 product cards within each slide - 2 columns on mobile */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                    {slideProducts.map((product) => {
                      const isAdded = addedProductId === product.id;

                      return (
                        <motion.div
                          key={product.id}
                          whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                          onClick={() => setQuickViewProduct(product)}
                          className="bg-white rounded-2xl border border-[#E5E1D8] hover:border-[#C99A3B]/60 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(201,154,59,0.12)] flex flex-col overflow-hidden cursor-pointer group"
                        >
                          {/* Product Image Stage */}
                          <div className="relative aspect-square bg-[#FBF9F5] overflow-hidden">
                            {/* Image */}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-106 select-none"
                              loading="lazy"
                            />

                            {/* Top Oval Labels: Positioned, Aligned & Sized Perfectly Within Image */}
                            <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
                              {product.badge ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#0B0B0B]/90 backdrop-blur-xs text-[#C99A3B] border border-[#C99A3B]/40 rounded-full shadow-xs whitespace-nowrap">
                                  {product.badge}
                                </span>
                              ) : (
                                <span />
                              )}

                              {product.volume && (
                                <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-[#2B2927] border border-[#E5E1D8] rounded-full shadow-xs whitespace-nowrap ml-auto">
                                  {product.volume}
                                </span>
                              )}
                            </div>

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
                          <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Rating & Reviews */}
                              <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2">
                                <div className="flex items-center text-amber-500 gap-1">
                                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                                  <span className="font-bold text-[#0B0B0B] text-[11px] sm:text-xs">{product.rating}</span>
                                </div>
                                <span className="text-[10px] sm:text-[11px] text-[#777777]">
                                  {product.reviewsCount} reviews
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="font-heading text-xs sm:text-base font-semibold text-[#0B0B0B] group-hover:text-[#8C6219] transition-colors duration-200 line-clamp-1 leading-snug">
                                {product.name}
                              </h3>

                              {/* Subtitle */}
                              {product.subtitle && (
                                <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-[#66625D] line-clamp-1">
                                  {product.subtitle}
                                </p>
                              )}
                            </div>

                            {/* Price & Add to Bag */}
                            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E5E1D8] flex items-center justify-between">
                              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1.5">
                                <span className="text-xs sm:text-base font-bold text-[#0B0B0B]">
                                  PKR {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-[10px] sm:text-[11px] text-[#888888] line-through">
                                    PKR {product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={(e) => handleAdd(e, product)}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5EAD4] hover:bg-[#C99A3B] text-[#8C6219] hover:text-[#0B0B0B] transition-colors duration-200 shadow-2xs flex items-center justify-center flex-shrink-0 cursor-pointer"
                                aria-label={`Add ${product.name} to cart`}
                              >
                                {isAdded ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Slide Indicator Dots at Bottom */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? 'w-8 h-2 bg-[#C99A3B]'
                  : 'w-2 h-2 bg-[#D4CFBE] hover:bg-[#C99A3B]/60'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.heading}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
