import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../../data/products';

export default function CustomerReviews() {
  return (
    <section className="bg-[#F7F5F0] py-20 border-b border-[#E5E1D8] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E2C27A]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAD4] border border-[#C99A3B]/40 text-[#8C6219] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F29420]" />
            <span>PROVEN RESULTS &amp; LOVE</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#0B0B0B] tracking-tight">
            VOICES OF{' '}
            <span className="font-serif italic bg-gradient-to-r from-[#B8860B] via-[#C99A3B] to-[#9E7426] bg-clip-text text-transparent">
              CONFIDENCE
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2.5 mt-4 text-xs sm:text-sm font-medium text-[#4A4641]">
            <div className="flex items-center text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 Average Rating Across Pakistan</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E1D8] hover:border-[#C99A3B]/60 shadow-sm hover:shadow-[0_16px_36px_rgba(201,154,59,0.12)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle gold top border line on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C99A3B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Quote Icon */}
                <Quote className="w-5 h-5 text-[#C99A3B]/30 mb-2 rotate-180" />

                {/* Review Title */}
                <h3 className="font-heading text-base font-semibold text-[#0B0B0B] mb-2 leading-snug">
                  "{rev.title}"
                </h3>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-[#4A4641] leading-relaxed font-normal">
                  {rev.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-[#E5E1D8]/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#F5EAD4] border border-[#C99A3B]/30 text-[#8C6219] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B0B0B] leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-[10.5px] text-[#777777] leading-tight mt-0.5">
                        {rev.city}, Pakistan
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#888888]">
                    {rev.date}
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-[#8C6219] font-medium truncate">
                  Purchased: {rev.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
