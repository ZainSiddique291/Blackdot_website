import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import Logo from '../common/Logo';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-12 border-t border-brand-gold/20">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none"
            >
              <Logo variant="dark" size="lg" />
            </button>

            <p className="mt-5 text-zinc-400 text-sm leading-relaxed max-w-sm">
              Black Dot is an uncompromising luxury haircare and personal wellness brand. One dot, one identity, infinite style. Handcrafted formulations engineered for transformative everyday results.
            </p>

            {/* Pakistan Official Verification */}
            <div className="mt-6 flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-lg max-w-sm">
              <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block">Official Pakistan Flagship Store</span>
                <span className="text-zinc-400">Nationwide Express Delivery • COD Available</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation & Collections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-brand-gold transition-colors"
                >
                  7-in-1 Advanced Shampoo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Restorative Argan Hair Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Keratin Silk Conditioner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Anti-Frizz Silk Serum
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Complete Luxury Bundles
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">
              CLIENT CARE
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Our Philosophy &amp; Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Contact &amp; WhatsApp Support
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-gold transition-colors">
                  Delivery &amp; Tracking (Pakistan)
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-gold transition-colors">
                  Authenticity Verification
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-gold transition-colors">
                  Returns &amp; Replacement Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Pakistan Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">
              DIRECT CONCIERGE
            </h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium block">WhatsApp Concierge:</span>
                  <a
                    href="https://wa.me/923000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand-gold text-xs"
                  >
                    +92 (300) BLACK-DOT
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium block">Email:</span>
                  <a
                    href="mailto:concierge@blackdot.pk"
                    className="hover:text-brand-gold text-xs"
                  >
                    concierge@blackdot.pk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-white font-medium block">Dispatch Center:</span>
                  <span>Sargodha, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Black Dot Pakistan. All Rights Reserved. Crafted with luxury precision.</p>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-300">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-300">
              Debit / Credit Card
            </span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-300">
              Bank Transfer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
