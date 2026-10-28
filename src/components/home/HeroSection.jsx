import React, { useRef } from 'react';
import { Truck, ShieldCheck, Leaf, ShoppingBag } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

// Staggered luxury entrance animations for typography & CTA
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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
      className="relative overflow-hidden bg-[#F7F5F0] border-b border-[#E5E1D8] min-h-[calc(100vh-56px)] flex items-center select-none py-6 sm:py-8 lg:py-4"
    >
      {/* 1. Full-Width Clean Backdrop with Empty Luxury Granite Stage */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/blackdot_hero_bg_empty.jpg"
          alt="Black Dot Luxury Haircare Architectural Stage"
          className="w-full h-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-center"
          fetchPriority="high"
        />

        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-10 left-4 sm:left-12 w-80 h-80 bg-[#E2C27A]/18 rounded-full blur-3xl pointer-events-none" />

        {/* Desktop Gradient: Horizontal feathering on left to guarantee 100% typography contrast */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#F7F5F0] via-[#F7F5F0]/85 via-45% to-transparent w-[58%]" />

        {/* Mobile & Tablet Gradient: Vertical wash to ensure pristine contrast over top content while keeping bottom stage visible */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#F7F5F0] via-[#F7F5F0]/94 via-55% to-[#F7F5F0]/45" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#F7F5F0]/95 via-[#F7F5F0]/80 to-transparent" />
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
            {/* 1. Main Editorial Headline with Cinematic Mask Reveal */}
            <h1 className="font-heading text-[22px] xs:text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] leading-[1.18] sm:leading-[1.2] text-[#0B0B0B] tracking-tight pb-2 overflow-visible select-none break-words">
              {/* Line 1: AMAZING BLACK DOT */}
              <span className="cinematic-mask-wrapper block">
                <span className="cinematic-line-1">
                  AMAZING{' '}
                  <span className="font-serif font-semibold bg-gradient-to-r from-[#B8860B] via-[#D4A346] to-[#9E7426] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(201,154,59,0.25)]">
                    BLACK DOT
                  </span>
                </span>
              </span>

              {/* Line 2: SIGNATURE */}
              <span className="cinematic-mask-wrapper block">
                <span className="cinematic-line-2 text-[#0B0B0B]">
                  SIGNATURE
                </span>
              </span>

              {/* Line 3: COLLECTIONS */}
              <span className="cinematic-mask-wrapper block">
                <span className="cinematic-line-3 text-[#0B0B0B]">
                  COLLECTIONS
                </span>
              </span>
            </h1>

            {/* 2. Description Subtitle with Coordinated Cinematic Reveal */}
            <div className="cinematic-mask-wrapper">
              <p className="cinematic-subtitle mt-3 sm:mt-3.5 text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed text-[#2B2927] max-w-lg font-normal">
                Black Dot represents mystery, elegance, and minimal power. Inspired by monochrome fashion and modern culture, the brand was built to create pieces that feel bold, refined, and unforgettable.
              </p>
            </div>

            {/* 4. Slogan */}
            <motion.div
              variants={itemVariants}
              className="mt-2 sm:mt-2.5 flex items-center gap-2"
            >
              <span className="h-[1px] w-5 sm:w-8 bg-[#B8860B]/60 inline-block" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#8C6219]">
                ONE DOT. ONE IDENTITY. INFINITE STYLE.
              </span>
            </motion.div>

            {/* 5. Primary Gold CTA Button & Secondary Link */}
            <motion.div variants={itemVariants} className="mt-3.5 sm:mt-4 flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(mainProduct, 1, '500ml')}
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4A346] via-[#C99A3B] to-[#B3832B] hover:brightness-105 text-[#0B0B0B] font-bold text-xs tracking-[0.16em] uppercase px-6 sm:px-7 py-2.5 sm:py-3 rounded-xs shadow-[0_6px_20px_rgba(201,154,59,0.3)] hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[42px]"
              >
                <span>SHOP NOW</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShopClick}
                className="inline-flex items-center justify-center text-xs font-semibold tracking-[0.16em] uppercase text-[#66625D] hover:text-[#0B0B0B] px-3 py-2.5 transition-colors cursor-pointer min-h-[42px]"
              >
                <span>Explore Rituals</span>
              </motion.button>
            </motion.div>

            {/* 6. 3 Compact Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-3.5 sm:mt-4 pt-3 border-t border-[#E5E1D8]"
            >
              <div className="grid grid-cols-3 gap-1 sm:gap-3 p-1.5 sm:p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-[#E5E1D8] shadow-xs">
                {/* Indicator 1 */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#F5EAD4] border border-[#C99A3B]/40 flex items-center justify-center flex-shrink-0 text-[#8C6219] shadow-xs">
                    <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] leading-tight">
                      <span className="hidden sm:inline">FAST &amp; RELIABLE</span>
                      <span className="sm:hidden">FAST COURIER</span>
                    </h4>
                    <p className="text-[8.5px] sm:text-[10px] text-[#55524D] mt-0.5 leading-tight truncate">
                      <span className="hidden sm:inline">Delivery Across Pakistan</span>
                      <span className="sm:hidden">All Pakistan</span>
                    </p>
                  </div>
                </div>

                {/* Indicator 2 */}
                <div className="flex items-center gap-1.5 sm:gap-2 border-x border-[#E5E1D8] px-1 sm:px-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#F5EAD4] border border-[#C99A3B]/40 flex items-center justify-center flex-shrink-0 text-[#8C6219] shadow-xs">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] leading-tight">
                      <span className="hidden sm:inline">PREMIUM QUALITY</span>
                      <span className="sm:hidden">100% PURE</span>
                    </h4>
                    <p className="text-[8.5px] sm:text-[10px] text-[#55524D] mt-0.5 leading-tight truncate">
                      <span className="hidden sm:inline">Trusted by Thousands</span>
                      <span className="sm:hidden">Authentic Formula</span>
                    </p>
                  </div>
                </div>

                {/* Indicator 3 */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#F5EAD4] border border-[#C99A3B]/40 flex items-center justify-center flex-shrink-0 text-[#8C6219] shadow-xs">
                    <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] leading-tight">
                      <span className="hidden sm:inline">NATURAL CARE</span>
                      <span className="sm:hidden">NATURAL CARE</span>
                    </h4>
                    <p className="text-[8.5px] sm:text-[10px] text-[#55524D] mt-0.5 leading-tight truncate">
                      <span className="hidden sm:inline">For Healthy Hair</span>
                      <span className="sm:hidden">Healthy Hair</span>
                    </p>
                  </div>
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
                {/* Product Bottle Image - Razor Sharp & Crystal Clear */}
                <div className="relative">
                  <motion.img
                    src="/images/blackdot_luxury_bottles_3d_crisp.png"
                    alt="Black Dot Luxury Haircare Shampoo Bottles"
                    className="relative z-10 w-auto h-[36vh] sm:h-[44vh] lg:h-[48vh] xl:h-[54vh] max-h-[290px] sm:max-h-[360px] lg:max-h-[430px] xl:max-h-[480px] object-contain select-none pointer-events-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                    draggable={false}
                    fetchPriority="high"
                  />

                  {/* Specular Diagonal Light Sweep / Sheen Glint */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl opacity-30 mix-blend-screen">
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
                <div className="px-3.5 py-1.5 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md text-[#C99A3B] text-[10px] font-bold tracking-wider uppercase border border-[#C99A3B]/40 shadow-xl flex items-center justify-center">
                  <span>Experience Ritual</span>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
