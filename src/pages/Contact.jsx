import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does delivery take within Pakistan?',
    a: 'Orders shipped to major cities (Lahore, Karachi, Islamabad, Rawalpindi) typically arrive within 2–3 business days. Other cities and rural regions take 3–4 business days via verified express couriers.',
  },
  {
    q: 'Can I pay via Cash on Delivery (COD)?',
    a: 'Yes, Cash on Delivery is gladly accepted nationwide across Pakistan. You can pay the courier rider upon delivery of your parcel.',
  },
  {
    q: 'What is the shipping fee?',
    a: 'We offer FREE courier delivery across Pakistan on all orders of PKR 3,000 or more. For orders below PKR 3,000, a flat nominal delivery fee of PKR 190 applies.',
  },
  {
    q: 'Is the 7-in-1 Advanced Shampoo suitable for colored or chemically treated hair?',
    a: 'Absolutely. Black Dot formulas are sulfate-free, paraben-free, and pH balanced, making them safe for keratin-treated, bleached, and color-treated hair.',
  },
];

export default function Contact({ onNavigateHome }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <button onClick={onNavigateHome} className="hover:text-brand-black transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-brand-gold-dark font-medium uppercase tracking-wider">
            Client Concierge
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold-dark mb-2">
            WE ARE AT YOUR SERVICE
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-brand-black tracking-tight">
            Client <span className="text-brand-gold-dark">Concierge</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            Have questions regarding formulation suitability, order dispatch status, or boutique partnerships? Our dedicated hair wellness advisors are here to assist.
          </p>
        </div>

        {/* 2-Column: Direct Contact Channels & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Card */}
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noreferrer"
              className="block p-6 rounded-2xl bg-brand-black text-white border border-brand-gold/30 hover:border-brand-gold shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold block mb-1">
                    FASTEST RESPONSE
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-white group-hover:text-brand-gold transition-colors">
                    WhatsApp Concierge
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Instant chat assistance for orders, product recommendations &amp; dispatch tracking.
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-bold text-brand-gold uppercase tracking-wider">
                    Message Us on WhatsApp →
                  </span>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-brand-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold-tint text-brand-gold-dark flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold block mb-1">
                    OFFICIAL CORRESPONDENCE
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-brand-black">
                    Email Desk
                  </h3>
                  <a
                    href="mailto:concierge@blackdot.pk"
                    className="text-xs sm:text-sm font-medium text-brand-gold-dark hover:underline block mt-1"
                  >
                    concierge@blackdot.pk
                  </a>
                  <p className="text-xs text-brand-muted mt-1">
                    Inquiries answered within 4 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Dispatch Hub */}
            <div className="p-6 rounded-2xl bg-white border border-brand-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold-tint text-brand-gold-dark flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold block mb-1">
                    DISPATCH HUB
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-brand-black">
                    Central Dispatch Center
                  </h3>
                  <p className="text-xs text-brand-text mt-1 leading-relaxed">
                    Main Dispatch Center: Sargodha, Pakistan.<br />
                    Nationwide express delivery to all cities and regions across Pakistan.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-sm">
            <h3 className="font-heading text-2xl font-semibold text-brand-black mb-2">
              Send an Advisory Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mb-8">
              Fill in your details below and a personal hair advisor will respond promptly.
            </p>

            {submitted ? (
              <div className="py-12 text-center bg-brand-ivory rounded-2xl border border-brand-border">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-heading text-xl font-semibold text-brand-black">
                  Inquiry Dispatched
                </h4>
                <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto">
                  Thank you, {form.name}. We have received your inquiry and will reach out to you within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-brand-black text-brand-gold text-xs font-bold uppercase rounded"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Fatima Tariq"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you with your hair wellness routine?"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase rounded shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-heading text-2xl sm:text-3xl text-brand-black">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              Everything you need to know about deliveries, payment, and authentic formula care in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-brand-ivory border border-brand-border">
                <h4 className="font-heading text-base font-semibold text-brand-black mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-gold-dark mt-1 flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-brand-text leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
