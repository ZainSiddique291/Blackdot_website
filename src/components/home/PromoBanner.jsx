import React, { useState, useEffect } from 'react';
import { ArrowRight, Gift, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export default function PromoBanner({ onNavigateShop }) {
  const { addToCart } = useCart();
  const bundleProduct = PRODUCTS.find((p) => p.id === 'bd-bundle-complete') || PRODUCTS[0];

  // Dynamic luxury countdown timer (persisted simulated countdown)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="bg-gradient-to-r from-[#0B0B0B] via-[#141414] to-[#0B0B0B] text-white py-16 sm:py-20 border-b border-[#C99A3B]/20 relative overflow-hidden">
      {/* Ambient Gold Radial Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C99A3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#C99A3B]/15 pointer-events-none animate-pulse-slow" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#C99A3B]/10 pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text & Animated Countdown */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Limited Edition Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C99A3B]/15 text-[#E2C27A] border border-[#C99A3B]/30 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Gift className="w-3.5 h-3.5 text-[#E2C27A]" />
              <span>LIMITED-TIME LUXURY OFFER</span>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              The Complete Hair{' '}
              <span className="font-serif italic bg-gradient-to-r from-[#E2C27A] via-[#C99A3B] to-[#9E7426] bg-clip-text text-transparent">
                Transformation Ritual
              </span>
            </h2>

            <p className="mt-3 sm:mt-4 text-zinc-300 text-xs sm:text-base max-w-xl leading-relaxed">
              Experience the synergistic power of our 7-in-1 Advanced Shampoo, Keratin Silk Conditioner, and Restorative Argan Oil. Includes a complimentary gold scalp stimulating massager and bespoke presentation gift box.
            </p>

            {/* Countdown Timer Block */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C99A3B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Special Price Closes In:</span>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                <span className="px-2 py-1 rounded bg-white/10 border border-white/15">
                  {formatNumber(timeLeft.hours)}h
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded bg-white/10 border border-white/15">
                  {formatNumber(timeLeft.minutes)}m
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded bg-[#C99A3B]/25 border border-[#C99A3B]/40 text-[#E2C27A]">
                  {formatNumber(timeLeft.seconds)}s
                </span>
              </div>
            </div>

            {/* Pricing Section with Animated Pill */}
            <div className="mt-5 sm:mt-6 flex items-baseline gap-3 sm:gap-4 flex-wrap">
              <span className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                PKR 5,499
              </span>
              <span className="text-sm sm:text-base text-zinc-400 line-through">
                PKR 6,550
              </span>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4A346] to-[#C99A3B] text-[#0B0B0B] shadow-[0_4px_12px_rgba(201,154,59,0.3)]"
              >
                Save PKR 1,051
              </motion.span>
            </div>

            {/* Actions */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(bundleProduct, 1, 'Full Ritual Set')}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4A346] via-[#C99A3B] to-[#B3832B] hover:brightness-105 text-[#0B0B0B] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase px-7 sm:px-8 py-3.5 sm:py-4 rounded-sm shadow-[0_8px_24px_rgba(201,154,59,0.3)] transition-all duration-300 cursor-pointer min-h-[46px]"
              >
                <span>CLAIM LUXURY BUNDLE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <button
                onClick={onNavigateShop}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#C99A3B] text-zinc-300 hover:text-[#C99A3B] text-xs sm:text-sm tracking-[0.2em] uppercase px-6 py-3.5 sm:py-4 rounded-sm transition-colors cursor-pointer min-h-[46px]"
              >
                <span>Browse All Sets</span>
              </button>
            </div>
          </motion.div>

          {/* Right Visual Image with Subtle Floating and Sheen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Interactive Floating Container */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-[#C99A3B]/35 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2.5 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md group"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/hero_stage.png"
                  alt="Black Dot Luxury Transformation Ritual Set"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-106 select-none"
                />

                {/* Diagonal Specular Sheen Pass */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-35 mix-blend-overlay">
                  <motion.div
                    animate={{
                      x: ['-140%', '180%'],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1],
                      repeatDelay: 3,
                    }}
                    className="w-[50%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg]"
                  />
                </div>
              </div>

              {/* Luxury Badge Pills */}
              <div className="absolute top-5 right-5 px-3 py-1 bg-[#0B0B0B]/90 text-[#C99A3B] border border-[#C99A3B]/40 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E2C27A]" />
                <span>Complete 3-Piece Set</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
