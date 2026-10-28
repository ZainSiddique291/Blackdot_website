import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FlaskConical, HeartHandshake, QrCode, CheckCircle2 } from 'lucide-react';

const VERIFICATION_PILLARS = [
  {
    icon: FlaskConical,
    title: 'Dermatologically Tested',
    subtitle: 'Safety & Tolerance Evaluation',
    description: 'Every formula undergoes patch-testing to ensure gentle compatibility with sensitive skin types and delicate scalps.',
    badge: 'Lab Tested',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Harsh Sulfates & Parabens',
    subtitle: 'Clean Beauty Standard',
    description: '100% free of SLS, SLES, parabens, phthalates, and formaldehyde donors. Pure nourishment without stripping.',
    badge: '100% Clean',
  },
  {
    icon: Award,
    title: 'GMP & ISO Facility Standards',
    subtitle: 'Pharmaceutical-Grade Production',
    description: 'Compounded under strict Good Manufacturing Practices and ISO quality assurance controls to guarantee sterility and batch purity.',
    badge: 'Certified Facility',
  },
  {
    icon: HeartHandshake,
    title: 'Ethical & Cruelty-Free',
    subtitle: 'Never Tested on Animals',
    description: 'We strictly refuse animal testing. All botanical extracts and active oils are sustainably and ethically harvested.',
    badge: 'Cruelty Free',
  },
  {
    icon: QrCode,
    title: 'Official Anti-Counterfeit Seal',
    subtitle: 'Direct Authenticity Guarantee',
    description: 'Each Black Dot box comes with a verifiable security seal and batch code, assuring direct authenticity from our laboratory.',
    badge: 'Genuine Batch',
  },
];

export default function VerifiedBy() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E5E1D8] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#E2C27A]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAD4] border border-[#C99A3B]/40 text-[#8C6219] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6219]" />
            <span>QUALITY &amp; SAFETY ASSURANCE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-[#0B0B0B] tracking-tight">
            VERIFIED BY{' '}
            <span className="font-serif italic bg-gradient-to-r from-[#B8860B] via-[#C99A3B] to-[#9E7426] bg-clip-text text-transparent">
              AUTHENTIC STANDARDS
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#55524D] leading-relaxed">
            Our commitment to purity, dermatological safety, and laboratory excellence is verified at every stage of formulation.
          </p>
        </motion.div>

        {/* Verification Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {VERIFICATION_PILLARS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E5E1D8] hover:border-[#C99A3B]/60 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(201,154,59,0.12)] flex flex-col justify-between group"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#C99A3B]/30 flex items-center justify-center text-[#8C6219] group-hover:bg-[#F5EAD4] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#8C6219] bg-[#F5EAD4]/80 px-2 py-0.5 rounded-full border border-[#C99A3B]/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-base font-semibold text-[#0B0B0B] group-hover:text-[#8C6219] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium text-[#8C6219] mt-0.5">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-[#55524D] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Verified Mark */}
                <div className="mt-5 pt-3 border-t border-[#E5E1D8]/70 flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Officially Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
