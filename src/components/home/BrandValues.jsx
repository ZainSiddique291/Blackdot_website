import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Heart, Search, Microscope, Droplets, CheckCircle } from 'lucide-react';

const VALUES = [
  {
    icon: Sparkles,
    number: '01',
    title: 'Uncompromising Product Quality',
    description:
      'We formulate with concentrated active percentages rather than marketing dust. Every batch undergoes rigorous texture, viscosity, and potency calibration for noticeable daily results.',
  },
  {
    icon: Droplets,
    number: '02',
    title: 'Carefully Selected Botanicals',
    description:
      'From cold-pressed Moroccan Argan and Jojoba esters to multi-weight Hyaluronic Acid, our ingredients are sustainably harvested and verified for absolute biological purity.',
  },
  {
    icon: Microscope,
    number: '03',
    title: 'Research & Modern Formulation',
    description:
      'Our development harmonizes rich botanical traditions with modern cosmetic science—utilizing targeted peptide delivery and stabilized Vitamin C complexes.',
  },
  {
    icon: Search,
    number: '04',
    title: 'Absolute Product Transparency',
    description:
      'No proprietary ingredient masks or hidden fillers. Full, honest disclosure on every box and bottle so you know exactly what touches your skin and hair.',
  },
  {
    icon: Heart,
    number: '05',
    title: 'Customer Satisfaction First',
    description:
      'A dedicated WhatsApp concierge team and nationwide dispatch ensure that our clients across Pakistan experience attentive, VIP-level customer care.',
  },
  {
    icon: Shield,
    number: '06',
    title: 'Safety & Stability Standards',
    description:
      'Every formula is pH-optimized and temperature-stress tested for long-lasting efficacy, preserving gentle compatibility with reactive and sensitive skin.',
  },
];

export default function BrandValues() {
  return (
    <section className="py-16 sm:py-22 bg-[#F7F5F0] border-b border-[#E5E1D8] relative overflow-hidden">
      {/* Background ambient gold accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#E2C27A]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C99A3B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAD4] border border-[#C99A3B]/40 text-[#8C6219] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F29420]" />
            <span>OUR CORE PHILOSOPHY</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#0B0B0B] tracking-tight">
            THE BLACK DOT{' '}
            <span className="font-serif italic bg-gradient-to-r from-[#B8860B] via-[#C99A3B] to-[#9E7426] bg-clip-text text-transparent">
              VALUES &amp; QUALITIES
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#55524D] leading-relaxed">
            Where minimalism meets potent performance. Built on authenticity, safety, and an uncompromising dedication to high-grade wellness.
          </p>
        </motion.div>

        {/* 6 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map((val, index) => {
            const Icon = val.icon;

            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E1D8] hover:border-[#C99A3B]/60 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(201,154,59,0.12)] flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Gold Top Accent Line on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C99A3B] via-[#E2C27A] to-[#C99A3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header with Icon & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF9F5] border border-[#C99A3B]/30 flex items-center justify-center text-[#8C6219] group-hover:bg-[#F5EAD4] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="font-heading text-xl font-bold text-[#C99A3B]/40 group-hover:text-[#8C6219] transition-colors">
                      {val.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-semibold text-[#0B0B0B] group-hover:text-[#8C6219] transition-colors mb-2.5 leading-snug">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#55524D] leading-relaxed">
                    {val.description}
                  </p>
                </div>

                {/* Subtle verified checkmark footer */}
                <div className="mt-6 pt-4 border-t border-[#E5E1D8]/60 flex items-center gap-2 text-[11px] font-semibold text-[#8C6219]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C99A3B]" />
                  <span>Black Dot Quality Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
