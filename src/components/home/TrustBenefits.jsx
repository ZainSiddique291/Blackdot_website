import React from 'react';
import { Truck, ShieldCheck, Sparkles, Award, RotateCcw, Clock } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Fast, secure courier delivery across all cities in Pakistan within 2-4 business days.',
    tag: 'Reliable Shipping',
  },
  {
    icon: ShieldCheck,
    title: '100% Authentic Formula',
    description: 'Direct from Black Dot laboratories. Sulfate-free, paraben-free & certified pure.',
    tag: 'Guaranteed Pure',
  },
  {
    icon: Sparkles,
    title: 'Proven 7-in-1 Results',
    description: 'Fortified with hydrolyzed keratin, biotin & pure cold-pressed Moroccan argan oil.',
    tag: 'Clinically Backed',
  },
  {
    icon: RotateCcw,
    title: 'Stress-Free Experience',
    description: 'Cash on Delivery (COD) available with dedicated customer care support via WhatsApp.',
    tag: 'Pay on Delivery',
  },
];

export default function TrustBenefits() {
  return (
    <section className="bg-brand-black text-white py-14 border-y border-white/10 relative overflow-hidden">
      {/* Subtle gold gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gold tag */}
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gold inline-block mb-3">
                  {item.tag}
                </span>

                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-medium text-white tracking-wide">
                    {item.title}
                  </h3>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
