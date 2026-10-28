import React, { useState, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export default function LuxuryCampaignAd({ onNavigateShop }) {
  const { setQuickViewProduct } = useCart();
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Selected ritual products for the advertisement
  const heroProduct = PRODUCTS.find((p) => p.id === 'bd-shampoo-500') || PRODUCTS[0];
  const creamProduct = PRODUCTS.find((p) => p.id === 'bd-cream-day') || PRODUCTS[1];
  const serumProduct = PRODUCTS.find((p) => p.id === 'bd-serum-silk') || PRODUCTS.find((p) => p.id === 'bd-serum-hyaluronic');
  const lotionProduct = PRODUCTS.find((p) => p.id === 'bd-lotion-hydration') || PRODUCTS[3];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0A09] text-white py-16 sm:py-20 lg:py-24 border-y border-[#C99A3B]/25">
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

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* 1. Editorial Header (Centered Luxury Typography) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Brand Kicker with Official Logo Dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#C99A3B]/30 backdrop-blur-md mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F29420] shadow-[0_0_8px_#F29420]" />
            <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#E2C27A]">
              THE SIGNATURE EDITORIAL
            </span>
          </div>

          {/* Main Advertisement Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white leading-[1.12] tracking-tight">
            Elevate Your{' '}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#F5DEB3] via-[#E2C27A] to-[#C99A3B] bg-clip-text text-transparent">
              Everyday Ritual.
            </span>
          </h2>

          {/* Concise Supporting Line */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-[#C7C3B9] leading-relaxed max-w-xl font-light">
            Discover the art of luxurious skincare and haircare with Black Dot.
          </p>
        </motion.div>

        {/* 2. Full-Screen-Width Cinematic Video Showcase (Main Visual Focus) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 sm:mt-10 lg:mt-12 w-full max-w-[1360px] mx-auto group"
          ref={videoContainerRef}
        >
          {/* Luxury Golden Ambient Back-Glow */}
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#C99A3B]/25 via-[#E2C27A]/15 to-[#C99A3B]/25 rounded-2xl sm:rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />

          {/* Video Container with 16:9 Aspect Ratio */}
          <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C99A3B]/40 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(201,154,59,0.18)]">
            <video
              ref={videoRef}
              src="/videos/BlackDot_Ad_Clip.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Soft Luxury Edge Vignette */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl shadow-[inset_0_0_40px_rgba(0,0,0,0.55)] border border-[#C99A3B]/20" />

            {/* Luxury Top Bar Inside Video */}
            <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-6 flex items-center justify-between pointer-events-none z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C99A3B]/30 text-[10px] sm:text-xs font-semibold tracking-wider text-[#E2C27A] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F29420] animate-pulse" />
                Official Campaign Film
              </div>
              <div className="text-[10px] sm:text-xs font-mono tracking-widest text-white/60 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 hidden sm:block">
                4K UHD • 16:9
              </div>
            </div>

            {/* Luxury Floating Controls in Bottom Bar */}
            <div className="absolute bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-6 flex items-center justify-between pointer-events-auto z-20">
              {/* Left: Brand Watermark */}
              <div className="hidden sm:flex items-center gap-2 text-white/70 text-xs tracking-wider">
                <span className="text-[#C99A3B] font-bold">BLACK DOT</span>
                <span className="text-white/30">•</span>
                <span className="text-[#A8A49A]">Signature Ritual Series</span>
              </div>

              {/* Right: Interactive Audio & Playback Controls */}
              <div className="flex items-center gap-2 ml-auto">
                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#C99A3B]/40 hover:border-[#E2C27A] text-[#E2C27A] hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                  aria-label={isPlaying ? 'Pause campaign video' : 'Play campaign video'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
                  )}
                </button>

                {/* Sound / Mute Toggle Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#C99A3B]/40 hover:border-[#E2C27A] text-[#E2C27A] hover:text-white text-xs font-medium tracking-wide transition-all cursor-pointer shadow-lg active:scale-95"
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-[#A8A49A]" />
                      <span className="text-[11px] sm:text-xs text-[#C7C3B9]">Sound Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#E2C27A]" />
                      <span className="text-[11px] sm:text-xs text-[#E2C27A]">Sound On</span>
                    </>
                  )}
                </button>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#C99A3B]/40 hover:border-[#E2C27A] text-[#E2C27A] hover:text-white transition-all cursor-pointer shadow-lg active:scale-95 hidden sm:block"
                  aria-label="Toggle Fullscreen"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Campaign Features & Editorial Product Showcase Below Video */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Attributes & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
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

            <div className="mt-6 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigateShop?.('all')}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4A346] via-[#C99A3B] to-[#B3832B] hover:brightness-110 text-[#0B0B0B] font-bold text-xs sm:text-sm tracking-[0.18em] uppercase px-8 py-3.5 rounded-xs shadow-[0_8px_24px_rgba(201,154,59,0.32)] transition-all duration-300 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>

          {/* Right: Signature Ritual Product Cards (Interactive) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Haircare Shampoo */}
              {heroProduct && (
                <div
                  onClick={() => setQuickViewProduct(heroProduct)}
                  className="group cursor-pointer rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#C99A3B]/30 hover:border-[#E2C27A] p-3 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  title="Click to view details"
                >
                  <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src="/images/blackdot_luxury_bottles_3d_crisp.png"
                      alt="Black Dot Haircare"
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-md select-none"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2C27A] truncate w-full">
                    Signature Shampoo
                  </span>
                  <span className="text-[10px] text-[#A8A49A] mt-0.5">7-in-1 Care</span>
                </div>
              )}

              {/* Beauty Cream */}
              {creamProduct && (
                <div
                  onClick={() => setQuickViewProduct(creamProduct)}
                  className="group cursor-pointer rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#C99A3B]/30 hover:border-[#E2C27A] p-3 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  title="Click to view details"
                >
                  <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={creamProduct.image}
                      alt={creamProduct.name}
                      className="max-h-full max-w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-108 select-none"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2C27A] truncate w-full">
                    Beauty Cream
                  </span>
                  <span className="text-[10px] text-[#A8A49A] mt-0.5">Radiance Glow</span>
                </div>
              )}

              {/* Active Serum */}
              {serumProduct && (
                <div
                  onClick={() => setQuickViewProduct(serumProduct)}
                  className="group cursor-pointer rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#C99A3B]/30 hover:border-[#E2C27A] p-3 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  title="Click to view details"
                >
                  <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={serumProduct.image}
                      alt={serumProduct.name}
                      className="max-h-full max-w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-108 select-none"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2C27A] truncate w-full">
                    Active Serum
                  </span>
                  <span className="text-[10px] text-[#A8A49A] mt-0.5">Pure Renewal</span>
                </div>
              )}

              {/* Body Lotion */}
              {lotionProduct && (
                <div
                  onClick={() => setQuickViewProduct(lotionProduct)}
                  className="group cursor-pointer rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#C99A3B]/30 hover:border-[#E2C27A] p-3 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  title="Click to view details"
                >
                  <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={lotionProduct.image}
                      alt={lotionProduct.name}
                      className="max-h-full max-w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-108 select-none"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2C27A] truncate w-full">
                    Body Lotion
                  </span>
                  <span className="text-[10px] text-[#A8A49A] mt-0.5">Deep Hydration</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
