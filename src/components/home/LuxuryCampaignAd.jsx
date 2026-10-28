import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import Logo from '../common/Logo';

export default function LuxuryCampaignAd({ onNavigateShop }) {
  const { setQuickViewProduct } = useCart();

  // Selected hero & ritual products for the advertisement
  const heroProduct = PRODUCTS.find((p) => p.id === 'bd-shampoo-500') || PRODUCTS[0];
  const creamProduct = PRODUCTS.find((p) => p.id === 'bd-cream-day') || PRODUCTS[1];
  const serumProduct = PRODUCTS.find((p) => p.id === 'bd-serum-silk') || PRODUCTS.find((p) => p.id === 'bd-serum-hyaluronic');
  const lotionProduct = PRODUCTS.find((p) => p.id === 'bd-lotion-hydration') || PRODUCTS[3];

  return (
    <section className="relative overflow-hidden bg-[#0A0A09] text-white py-20 sm:py-24 lg:py-28 border-y border-[#C99A3B]/25">
      {/* 1. Cinematic Ambient Lighting & Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C99A3B]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#E2C27A]/8 rounded-full blur-[130px] pointer-events-none translate-y-1/3" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,9,0.85)_100%)] pointer-events-none" />

      {/* Subtle Luxury Geometric Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #C99A3B 1px, transparent 1px), linear-gradient(to bottom, #C99A3B 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Editorial Typography & Brand Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Brand Kicker with Official Logo Dot */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#C99A3B]/30 backdrop-blur-md self-start mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F29420] shadow-[0_0_8px_#F29420]" />
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#E2C27A]">
                THE SIGNATURE EDITORIAL
              </span>
            </div>

            {/* Main Advertisement Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl xl:text-[54px] text-white leading-[1.12] tracking-tight">
              Elevate Your{' '}
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#F5DEB3] via-[#E2C27A] to-[#C99A3B] bg-clip-text text-transparent">
                Everyday Ritual.
              </span>
            </h2>

            {/* Concise Supporting Line */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#C7C3B9] leading-relaxed max-w-lg font-light">
              Discover the art of luxurious skincare and haircare with Black Dot.
            </p>

            {/* Campaign Attributes */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div className="flex flex-col">
                <span className="text-[#C99A3B] text-lg sm:text-xl font-heading font-semibold">100%</span>
                <span className="text-[11px] sm:text-xs text-[#A8A49A] uppercase tracking-wider mt-0.5">
                  Pure Botanicals
                </span>
              </div>
              <div className="flex flex-col border-x border-white/10 px-3 sm:px-4">
                <span className="text-[#C99A3B] text-lg sm:text-xl font-heading font-semibold">7-in-1</span>
                <span className="text-[11px] sm:text-xs text-[#A8A49A] uppercase tracking-wider mt-0.5">
                  Active Matrix
                </span>
              </div>
              <div className="flex flex-col pl-1 sm:pl-2">
                <span className="text-[#C99A3B] text-lg sm:text-xl font-heading font-semibold">24H</span>
                <span className="text-[11px] sm:text-xs text-[#A8A49A] uppercase tracking-wider mt-0.5">
                  Deep Hydration
                </span>
              </div>
            </div>

            {/* "Explore Collection" Button */}
            <div className="mt-9 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigateShop?.('all')}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4A346] via-[#C99A3B] to-[#B3832B] hover:brightness-110 text-[#0B0B0B] font-bold text-xs sm:text-sm tracking-[0.18em] uppercase px-8 sm:px-9 py-3.5 sm:py-4 rounded-xs shadow-[0_8px_24px_rgba(201,154,59,0.32)] transition-all duration-300 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Editorial Product Still-Life Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-8 lg:py-0"
          >
            {/* Architectural Ambient Stage Ring */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              {/* Concentric Luxury Halo Rings */}
              <div className="absolute inset-4 rounded-full border border-[#C99A3B]/20 pointer-events-none" />
              <div className="absolute inset-14 rounded-full border border-[#C99A3B]/10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C99A3B]/15 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Main Centerpiece Hero Product (Black Dot 7-in-1 Shampoo Bottles) */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateZ: [0, 0.4, 0],
                }}
                transition={{
                  duration: 5.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onClick={() => setQuickViewProduct(heroProduct)}
                className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
                title="Black Dot 7-in-1 Hair Shampoo - Click for Details"
              >
                <div className="relative">
                  <img
                    src="/images/blackdot_luxury_bottles_3d_crisp.png"
                    alt="Black Dot 7-in-1 Advanced Haircare Bottles"
                    className="w-auto h-[260px] sm:h-[320px] md:h-[350px] object-contain transition-transform duration-500 group-hover:scale-104 select-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.7)]"
                    loading="lazy"
                  />
                  {/* Subtle Floating Label Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md border border-[#C99A3B]/40 text-[#E2C27A] text-[10px] font-bold uppercase tracking-widest shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    Signature Haircare
                  </div>
                </div>

                {/* Soft Contact Shadow */}
                <div
                  className="w-40 sm:w-48 h-4 rounded-full mt-2 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 75%)',
                    filter: 'blur(4px)',
                  }}
                />
              </motion.div>

              {/* Supporting Product 1: Radiance Day Beauty Cream (Top-Left Floating Pod) */}
              {creamProduct && (
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                    x: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  onClick={() => setQuickViewProduct(creamProduct)}
                  className="absolute top-2 sm:top-6 left-0 sm:left-2 z-30 cursor-pointer group"
                  title={`${creamProduct.name} - Click for Details`}
                >
                  <div className="relative w-24 sm:w-28 md:w-32 aspect-square rounded-2xl overflow-hidden border border-[#C99A3B]/40 bg-[#161513] shadow-[0_12px_28px_rgba(0,0,0,0.6)] p-2 transition-all duration-300 group-hover:border-[#E2C27A] group-hover:scale-106">
                    <img
                      src={creamProduct.image}
                      alt={creamProduct.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1.5 inset-x-1.5 bg-[#0B0B0B]/85 backdrop-blur-xs py-0.5 px-1 rounded text-center">
                      <span className="text-[9px] font-bold text-[#E2C27A] tracking-wider uppercase truncate block">
                        Beauty Cream
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Supporting Product 2: Glass Silk / Active Serum (Top-Right Floating Pod) */}
              {serumProduct && (
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.4,
                  }}
                  onClick={() => setQuickViewProduct(serumProduct)}
                  className="absolute top-4 sm:top-8 right-0 sm:right-2 z-30 cursor-pointer group"
                  title={`${serumProduct.name} - Click for Details`}
                >
                  <div className="relative w-24 sm:w-28 md:w-32 aspect-square rounded-2xl overflow-hidden border border-[#C99A3B]/40 bg-[#161513] shadow-[0_12px_28px_rgba(0,0,0,0.6)] p-2 transition-all duration-300 group-hover:border-[#E2C27A] group-hover:scale-106">
                    <img
                      src={serumProduct.image}
                      alt={serumProduct.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1.5 inset-x-1.5 bg-[#0B0B0B]/85 backdrop-blur-xs py-0.5 px-1 rounded text-center">
                      <span className="text-[9px] font-bold text-[#E2C27A] tracking-wider uppercase truncate block">
                        Active Serum
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Supporting Product 3: Deep Hydration Body Lotion (Bottom-Right Pod) */}
              {lotionProduct && (
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8,
                  }}
                  onClick={() => setQuickViewProduct(lotionProduct)}
                  className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8 z-30 cursor-pointer group"
                  title={`${lotionProduct.name} - Click for Details`}
                >
                  <div className="relative w-22 sm:w-26 md:w-28 aspect-square rounded-2xl overflow-hidden border border-[#C99A3B]/40 bg-[#161513] shadow-[0_12px_28px_rgba(0,0,0,0.6)] p-2 transition-all duration-300 group-hover:border-[#E2C27A] group-hover:scale-106">
                    <img
                      src={lotionProduct.image}
                      alt={lotionProduct.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1.5 inset-x-1.5 bg-[#0B0B0B]/85 backdrop-blur-xs py-0.5 px-1 rounded text-center">
                      <span className="text-[9px] font-bold text-[#E2C27A] tracking-wider uppercase truncate block">
                        Body Lotion
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
