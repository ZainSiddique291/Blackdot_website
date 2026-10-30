import React, { useState } from 'react';
import {
  Globe,
  Save,
  RotateCcw,
  Layout,
  MessageSquare,
  ShieldCheck,
  Megaphone,
  Check,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function WebsiteContentView({ onViewLiveStore }) {
  const { siteContent, updateSiteContent, updateTestimonials, resetSiteContent } = useAdminData();

  const [activeSubTab, setActiveSubTab] = useState('announcement'); // 'announcement' | 'hero' | 'campaign' | 'testimonials'

  // Local editable copies
  const [announcementForm, setAnnouncementForm] = useState({
    enabled: siteContent.announcementBar?.enabled ?? true,
    text: siteContent.announcementBar?.text || '',
    badge: siteContent.announcementBar?.badge || 'VIP PRIVILEGE',
  });

  const [heroForm, setHeroForm] = useState({
    eyebrow: siteContent.heroSection?.eyebrow || 'ONE DOT • INFINITE LUXURY',
    headline: siteContent.heroSection?.headline || '',
    subtitle: siteContent.heroSection?.subtitle || '',
    primaryBtnText: siteContent.heroSection?.primaryBtnText || 'Explore Collections',
    secondaryBtnText: siteContent.heroSection?.secondaryBtnText || 'Brand Heritage',
    ratingText: siteContent.heroSection?.ratingText || '',
  });

  const [campaignForm, setCampaignForm] = useState({
    tag: siteContent.promoCampaign?.tag || 'EDITORIAL EXCLUSIVE',
    title: siteContent.promoCampaign?.title || '',
    discountBadge: siteContent.promoCampaign?.discountBadge || '',
    description: siteContent.promoCampaign?.description || '',
    buttonText: siteContent.promoCampaign?.buttonText || 'Acquire Collection',
  });

  const [testimonials, setTestimonials] = useState(siteContent.testimonials || []);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    city: 'Lahore',
    rating: 5,
    review: '',
  });
  const [isAddingReview, setIsAddingReview] = useState(false);

  // Save actions
  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    updateSiteContent('announcementBar', announcementForm);
  };

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateSiteContent('heroSection', heroForm);
  };

  const handleSaveCampaign = (e) => {
    e.preventDefault();
    updateSiteContent('promoCampaign', campaignForm);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewForm.name.trim() || !newReviewForm.review.trim()) return;

    const updated = [
      {
        id: 't-' + Date.now(),
        name: newReviewForm.name,
        city: newReviewForm.city,
        rating: Number(newReviewForm.rating),
        review: newReviewForm.review,
        date: 'Just now',
        verified: true,
        active: true,
      },
      ...testimonials,
    ];

    setTestimonials(updated);
    updateTestimonials(updated);
    setNewReviewForm({ name: '', city: 'Lahore', rating: 5, review: '' });
    setIsAddingReview(false);
  };

  const handleDeleteReview = (id) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    updateTestimonials(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header Toolbar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Black Dot Live Content Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Storefront Editorial &amp; CMS
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Edit live announcement messages, hero copy, promotional banners, and client reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetSiteContent}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Reset to default luxury editorial copy"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={onViewLiveStore}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gold text-brand-black text-xs font-bold hover:bg-brand-gold-dark transition-all shadow-gold-glow cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Live Store</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        {[
          { id: 'announcement', label: 'Announcement Bar', icon: Megaphone },
          { id: 'hero', label: 'Hero Section', icon: Layout },
          { id: 'campaign', label: 'Campaign Promo', icon: ShieldCheck },
          { id: 'testimonials', label: 'Client Reviews', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ' +
                (isActive
                  ? 'bg-brand-gold text-brand-black shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5')}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB A: Announcement Bar */}
      {activeSubTab === 'announcement' && (
        <form onSubmit={handleSaveAnnouncement} className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold font-heading text-white">
                Top Announcement Bar
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Displays nationwide shipping thresholds, COD alerts, or VIP privileges.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={announcementForm.enabled}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, enabled: e.target.checked })}
                className="rounded accent-brand-gold w-4 h-4"
              />
              <span className="font-semibold text-white">Enable Bar on Storefront</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Announcement Message Text *
              </label>
              <textarea
                rows="3"
                value={announcementForm.text}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Gold Badge Label
              </label>
              <input
                type="text"
                value={announcementForm.badge}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, badge: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold max-w-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Announcement</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB B: Hero Section */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl space-y-5">
          <div className="pb-4 border-b border-white/10">
            <h3 className="text-base font-bold font-heading text-white">
              Homepage Hero Section Headlines
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              The primary luxury gateway seen by first-time and returning visitors.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Eyebrow Badge Text
              </label>
              <input
                type="text"
                value={heroForm.eyebrow}
                onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Main Sovereign Headline *
              </label>
              <textarea
                rows="2"
                value={heroForm.headline}
                onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Editorial Narrative / Subtitle *
              </label>
              <textarea
                rows="3"
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroForm.primaryBtnText}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryBtnText: e.target.value })}
                  className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={heroForm.secondaryBtnText}
                  onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnText: e.target.value })}
                  className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Hero Copy</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB C: Campaign Promo */}
      {activeSubTab === 'campaign' && (
        <form onSubmit={handleSaveCampaign} className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl space-y-5">
          <div className="pb-4 border-b border-white/10">
            <h3 className="text-base font-bold font-heading text-white">
              Promotional Campaign Editorial
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Mid-page featured campaign banner highlighted across the boutique.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Campaign Tag
                </label>
                <input
                  type="text"
                  value={campaignForm.tag}
                  onChange={(e) => setCampaignForm({ ...campaignForm, tag: e.target.value })}
                  className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Discount / Privilege Badge
                </label>
                <input
                  type="text"
                  value={campaignForm.discountBadge}
                  onChange={(e) => setCampaignForm({ ...campaignForm, discountBadge: e.target.value })}
                  className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Campaign Title *
              </label>
              <input
                type="text"
                value={campaignForm.title}
                onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Campaign Description *
              </label>
              <textarea
                rows="3"
                value={campaignForm.description}
                onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Button Call to Action
              </label>
              <input
                type="text"
                value={campaignForm.buttonText}
                onChange={(e) => setCampaignForm({ ...campaignForm, buttonText: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold max-w-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Campaign</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB D: Client Testimonials & Reviews */}
      {activeSubTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold font-heading text-white">
                  Client Reviews &amp; Testimonials
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Manage verified customer testimonials showcased on the flagship homepage.
                </p>
              </div>
              <button
                onClick={() => setIsAddingReview(!isAddingReview)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gold text-brand-black text-xs font-bold hover:bg-brand-gold-dark transition-all shadow-gold-glow cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Verified Review</span>
              </button>
            </div>

            {/* Add Review Form */}
            {isAddingReview && (
              <form onSubmit={handleAddReview} className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-brand-gold/30 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewForm.name}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                      placeholder="e.g. Dr. Sarah Tariq"
                      className="w-full bg-[#1A1A1A] text-xs text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={newReviewForm.city}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, city: e.target.value })}
                      placeholder="Islamabad"
                      className="w-full bg-[#1A1A1A] text-xs text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      Rating (1-5)
                    </label>
                    <select
                      value={newReviewForm.rating}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: e.target.value })}
                      className="w-full bg-[#1A1A1A] text-xs text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold"
                    >
                      <option value="5">5 Stars (Supreme)</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Review Text *
                  </label>
                  <textarea
                    rows="2"
                    required
                    value={newReviewForm.review}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, review: e.target.value })}
                    placeholder="Testimonial details and sensory experience..."
                    className="w-full bg-[#1A1A1A] text-xs text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-brand-gold text-brand-black text-xs font-bold"
                  >
                    Save &amp; Publish Review
                  </button>
                </div>
              </form>
            )}

            {/* Existing Reviews List */}
            <div className="mt-4 space-y-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{t.name}</span>
                      <span className="text-[10px] text-zinc-400">({t.city})</span>
                      <span className="text-brand-gold text-xs">{'★'.repeat(t.rating)}</span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 italic leading-relaxed">
                      "{t.review}"
                    </p>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      Published {t.date}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(t.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
