import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: 'Complimentary Express Courier Across Pakistan on Orders Over PKR 3,000',
    highlight: 'FREE DELIVERY',
  },
  {
    icon: ShieldCheck,
    text: 'Discover the 7-in-1 Advanced Formula — Limited First Batch Now Live',
    highlight: 'SIGNATURE DROP',
  },
  {
    icon: ShieldCheck,
    text: '100% Genuine Luxury Hair Wellness — Handcrafted with Botanical Actives',
    highlight: 'PURE QUALITY',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-brand-black text-white border-b border-white/10 text-[11px] sm:text-xs py-1.5 px-4 transition-all duration-300">
      <div className="max-w-site mx-auto flex items-center justify-between">
        {/* Left subtle country indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-brand-muted text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Pakistan Official Store</span>
        </div>

        {/* Center Animated Announcement */}
        <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden text-center">
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest uppercase bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
            {current.highlight}
          </span>
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-wide text-zinc-300 transition-opacity duration-500">
            <Icon className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
            <span>{current.text}</span>
          </div>
        </div>

        {/* Right Help / Contact quick link */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-brand-muted">
          <a
            href="#contact"
            className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1"
          >
            <span>Need Help?</span>
            <ChevronRight className="w-3 h-3 text-brand-gold" />
          </a>
        </div>
      </div>
    </div>
  );
}
