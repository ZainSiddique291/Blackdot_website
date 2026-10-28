import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Building2 } from 'lucide-react';

const PARTNERS = [
  {
    id: 1,
    name: 'Black Dot Flagship',
    type: 'Exclusive Flagship Boutique',
    location: 'Lahore & Islamabad',
    monogram: 'BD',
  },
  {
    id: 2,
    name: 'Privé Salon & Spa Network',
    type: 'Luxury Salon Partner',
    location: 'Karachi · Lahore · Islamabad',
    monogram: 'PS',
  },
  {
    id: 3,
    name: 'Aura Wellness Boutique',
    type: 'Approved Skincare Stockist',
    location: 'Gulberg, Lahore',
    monogram: 'AW',
  },
  {
    id: 4,
    name: 'Elite Aesthetics Clinic',
    type: 'Dermal Care Center',
    location: 'F-7, Islamabad',
    monogram: 'EA',
  },
  {
    id: 5,
    name: 'Pure Botanica Labs',
    type: 'Formulation Research Facility',
    location: 'Certified ISO Lab',
    monogram: 'PB',
  },
  {
    id: 6,
    name: 'Velvet Lounge Parlour',
    type: 'Authorized Hair Spa',
    location: 'DHA, Karachi',
    monogram: 'VL',
  },
  {
    id: 7,
    name: 'Seraphic Dermal Care',
    type: 'Clinical Partner',
    location: 'Clifton, Karachi',
    monogram: 'SD',
  },
];

export default function TrustedPartners() {
  // Duplicate array for infinite seamless continuous scroll
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-14 sm:py-18 bg-[#F7F5F0] border-b border-[#E5E1D8] relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10 mb-8 sm:mb-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAD4] border border-[#C99A3B]/40 text-[#8C6219] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#8C6219]" />
          <span>AUTHORIZED DISTRIBUTION NETWORK</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#0B0B0B] tracking-tight">
          TRUSTED SALONS &amp;{' '}
          <span className="font-serif italic bg-gradient-to-r from-[#B8860B] via-[#C99A3B] to-[#9E7426] bg-clip-text text-transparent">
            STOCKIST PARTNERS
          </span>
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-[#55524D] max-w-xl mx-auto">
          Available across certified luxury salons, dermatological aesthetic centers, and official Black Dot flagship counters.
        </p>
      </div>

      {/* Smooth Continuous Marquee Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Edge Masks */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#F7F5F0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#F7F5F0] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee gap-5 sm:gap-6 py-2">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-[240px] sm:w-[270px] bg-white rounded-xl p-4 sm:p-5 border border-[#E5E1D8] hover:border-[#C99A3B]/50 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(201,154,59,0.12)] flex items-center gap-3.5 group cursor-default"
            >
              {/* Partner Monogram Crest */}
              <div className="w-11 h-11 rounded-lg bg-[#FAF7F0] border border-[#C99A3B]/30 text-[#8C6219] font-heading font-bold text-sm sm:text-base flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5EAD4] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                {partner.monogram}
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h4 className="font-heading text-sm font-semibold text-[#0B0B0B] group-hover:text-[#8C6219] transition-colors truncate">
                  {partner.name}
                </h4>
                <p className="text-[11px] text-[#66625D] truncate mt-0.5">
                  {partner.type}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-[#8C6219] mt-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{partner.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
