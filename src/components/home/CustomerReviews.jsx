import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../../data/products';

export default function CustomerReviews() {
  return (
    <section className="bg-brand-ivory py-20 border-b border-brand-border">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold-dark mb-2">
            PROVEN RESULTS &amp; LOVE
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight">
            VOICES OF <span className="text-brand-gold-dark">CONFIDENCE</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium text-brand-text">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 Average Rating Across Pakistan</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h3 className="font-heading text-base font-semibold text-brand-black mb-2">
                  "{rev.title}"
                </h3>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-brand-text leading-relaxed font-normal">
                  {rev.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-brand-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-brand-black">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-brand-muted">
                      {rev.city}, Pakistan
                    </p>
                  </div>
                  <span className="text-[10px] text-brand-muted">
                    {rev.date}
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-brand-gold-dark font-medium truncate">
                  Purchased: {rev.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
