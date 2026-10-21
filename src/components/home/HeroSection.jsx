import React, { useRef } from 'react';
import { Truck, ShieldCheck, Leaf, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

// Staggered luxury entrance animations for typography & CTA
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroSection({ onShopClick }) {
  const { addToCart } = useCart();
  const mainProduct = PRODUCTS.find((p) => p.id === 'bd-shampoo-500') || PRODUCTS[0];

  // Mouse 3D parallax tilt state
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery-smooth luxury springs for cursor reaction
  const springConfig = { damping: 26, stiffness: 100, mass: 0.7 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotations responding gently to mouse position
  const mouseRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const mouseRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const mouseTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const mouseTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#F7F5F0] border-b border-[#E5E1D8] min-h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] lg:max-h-[calc(100vh-56px)] flex items-center select-none py-6 lg:py-0"
    >
      {/* 1. Full-Width Clean Backdrop with Empty Luxury Granite Stage */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/blackdot_hero_bg_empty.jpg"
          alt="Black Dot Luxury Haircare Architectural Stage"
          className="w-full h-full object-cover object-right lg:object-center"
          fetchPriority="high"
        />
        {/* Soft gradient feathering on left to guarantee 100% typography contrast on any screen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F0]/98 via-[#F7F5F0]/80 lg:via-[#F7F5F0]/60 to-[#F7F5F0]/30 lg:to-transparent w-full lg:w-[58%]" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="max-w-site mx-auto px-4 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-center py-2 sm:py-3 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full">
          
          {/* Left Column: Editorial Typography & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-6 z-20 flex flex-col justify-center my-auto pt-2 lg:pt-0"
          >
            {/* 1. Eyebrow Tagline */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-1 sm:mb-2">
              <span className="text-[10px] sm:text-xs lg:text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#9E7426]">
                QUICK TO YOU. STRESS-FREE DELIVERY.
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-[#9E7426]/50 inline-block" />
            </motion.div>

            {/* 2. Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-2xl sm:text-3xl lg:text-[34px] xl:text-[42px] leading-[1.08] text-[#0B0B0B] tracking-tight"
            >
              AMAZING{' '}
              <span style={{ color: '#C99A3B' }} className="font-serif italic font-medium">
                BLACK DOT
              </span>
              <br />
              SIGNATURE
              <br />
              COLLECTIONS
            </motion.h1>

            {/* 3. Description */}
            <motion.p
              variants={itemVariants}
              className="mt-2 sm:mt-2.5 text-xs sm:text-[13px] lg:text-[13.5px] leading-snug text-[#444444] max-w-lg font-normal"
            >
              Black Dot represents mystery, elegance, and minimal power. Inspired by monochrome fashion and modern culture, the brand was built to create pieces that feel bold, refined, and unforgettable.
            </motion.p>

            {/* 4. Slogan */}
            <motion.p
              variants={itemVariants}
              className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7426]"
            >
              ONE DOT. ONE IDENTITY. INFINITE STYLE.
            </motion.p>

            {/* 5. Primary Gold CTA Button */}
            <motion.div variants={itemVariants} className="mt-3 sm:mt-4">
              <button
                onClick={() => addToCart(mainProduct, 1, '500ml')}
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4A346] via-[#C99A3B] to-[#B3832B] hover:brightness-105 text-[#0B0B0B] font-bold text-xs tracking-[0.16em] uppercase px-7 py-2.5 sm:py-3 rounded-xs shadow-md transition-all duration-300 hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>SHOP NOW</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </motion.div>

            {/* 6. 3 Compact Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-3.5 sm:mt-5 pt-2.5 sm:pt-3 border-t border-[#E5E1D8] grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
            >
              {/* Indicator 1 */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3E8D0] border border-[#C99A3B]/40 flex items-center justify-center flex-shrink-0 text-[#9E7426] shadow-xs">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] leading-tight">
                    FAST &amp; RELIABLE
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-[#777777] mt-0.5 leading-tight">
                    Delivery Across Pakistan
                  </p>
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3E8D0] border border-[#C99A3B]/40 flex items-center justify-center flex-shrink-0 text-[#9E7426] shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] leading-tight">
                    PREMIUM QUALITY
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-[#777777] mt-0.5 leading-tight">
                    Trusted by Thousands
                  </p>
                </div>
              </div>

              {/* Indicator 3 */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3E8D0] border border-[#C99A3B]/40 flex items-center justify-center flex-shrink-0 text-[#9E7426] shadow-xs">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] leading-tight">
                    NATURAL CARE
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-[#777777] mt-0.5 leading-tight">
                    For Healthy Hair
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive Luxury 3D Animated Bottles Stage */}
          <div className="lg:col-span-5 xl:col-span-6 relative h-full flex items-end justify-center lg:justify-end pb-5 sm:pb-8 lg:pb-10 xl:pb-12">
            
            {/* Outer Interactive Mouse Parallax Container with 3D perspective */}
            <motion.div
              style={{
                rotateX: mouseRotateX,
                rotateY: mouseRotateY,
                translateX: mouseTranslateX,
                translateY: mouseTranslateY,
                transformPerspective: 1200,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px] flex flex-col items-center justify-end cursor-pointer group lg:mr-2 xl:mr-6"
              onClick={() => addToCart(mainProduct, 1, '500ml')}
              title="Click to add Black Dot Signature Shampoo to cart"
            >
              
              {/* Golden Ambient Reflection Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 5.0,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 -m-8 bg-gradient-to-r from-[#E2C27A]/20 via-[#C99A3B]/25 to-transparent rounded-full blur-3xl pointer-events-none"
              />

              {/* Floating Micro-Sparkles Gold Dust Particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-12, 12, -12],
                    x: [i % 2 === 0 ? -10 : 10, i % 2 === 0 ? 10 : -10, i % 2 === 0 ? -10 : 10],
                    opacity: [0.2, 0.9, 0.2],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 3.2 + i * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#E2C27A] shadow-[0_0_10px_#C99A3B] pointer-events-none z-30"
                  style={{
                    top: `${14 + i * 16}%`,
                    left: `${15 + (i * 20) % 70}%`,
                  }}
                />
              ))}

              {/* Continuous Luxury Floating Bottle Layer */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotateZ: [0, 0.7, -0.5, 0],
                  rotateX: [0, 1.5, -1, 0],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex flex-col items-center justify-end w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Product Bottle Image */}
                <div className="relative">
                  <motion.img
                    src="/images/blackdot_luxury_bottles_3d.png"
                    alt="Black Dot Luxury Haircare Shampoo Bottles"
                    className="relative z-10 w-auto h-[48vh] sm:h-[54vh] max-h-[340px] sm:max-h-[390px] lg:max-h-[430px] xl:max-h-[480px] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] select-none pointer-events-none"
                    draggable={false}
                    fetchPriority="high"
                  />

                  {/* Specular Diagonal Light Sweep / Sheen Glint */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl opacity-40 mix-blend-overlay">
                    <motion.div
                      animate={{
                        x: ['-140%', '180%'],
                      }}
                      transition={{
                        duration: 5.2,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                        repeatDelay: 2.0,
                      }}
                      className="w-[50%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg]"
                    />
                  </div>
                </div>

                {/* Dynamic Realistic Soft Contact Shadow on Granite Surface */}
                <motion.div
                  animate={{
                    scaleX: [1, 0.88, 1],
                    scaleY: [1, 0.84, 1],
                    opacity: [0.8, 0.45, 0.8],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-[84%] h-4 sm:h-5 rounded-full -mt-2 sm:-mt-2.5 pointer-events-none z-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(10,10,10,0.85) 0%, rgba(20,20,20,0.48) 50%, transparent 80%)',
                    filter: 'blur(5px)',
                  }}
                />

              </motion.div>

              {/* Hover Luxury Interactive Tag Pill */}
              <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-30 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md text-[#C99A3B] text-[10px] font-bold tracking-wider uppercase border border-[#C99A3B]/40 shadow-xl flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#E2C27A]" />
                  <span>Click to Experience Ritual</span>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
