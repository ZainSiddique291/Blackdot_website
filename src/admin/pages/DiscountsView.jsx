import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Percent,
  Calendar,
  CheckCircle2,
  X,
  Edit,
  Trash2,
  Copy,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import ConfirmModal from '../components/ConfirmModal';

export default function DiscountsView() {
  const { coupons, addCoupon, updateCoupon, toggleCouponStatus, deleteCoupon } = useAdminData();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const initialForm = {
    code: '',
    type: 'percentage', // 'percentage' | 'fixed'
    value: 10,
    minOrder: 0,
    maxDiscount: 2000,
    description: '',
    usageLimit: 500,
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: '2026-12-31',
    status: 'Active',
  };
  const [form, setForm] = useState(initialForm);

  const handleOpenAddModal = () => {
    setEditingCoupon(null);
    setForm(initialForm);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      type: coupon.type || 'percentage',
      value: coupon.value,
      minOrder: coupon.minOrder || 0,
      maxDiscount: coupon.maxDiscount || 2000,
      description: coupon.description || '',
      usageLimit: coupon.usageLimit || 500,
      startDate: coupon.startDate || '',
      expiryDate: coupon.expiryDate || '',
      status: coupon.status || 'Active',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return;

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, form);
    } else {
      addCoupon(form);
    }
    setIsEditModalOpen(false);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header Toolbar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Black Dot Promotional Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Discounts &amp; Privilege Coupons
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Calibrate promotional vouchers, tier discounts, and checkout savings rules.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Privilege Coupon</span>
        </button>
      </div>

      {/* 2. Promo Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.08] shadow-md">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Active Campaigns
          </span>
          <span className="text-2xl font-bold text-brand-gold block mt-1">
            {coupons.filter((c) => c.status === 'Active').length} Active
          </span>
          <span className="text-[11px] text-zinc-400 mt-1 block">Live at checkout</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.08] shadow-md">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Total Client Redemptions
          </span>
          <span className="text-2xl font-bold text-white block mt-1">
            {coupons.reduce((sum, c) => sum + (c.timesUsed || 0), 0)} Applied
          </span>
          <span className="text-[11px] text-zinc-400 mt-1 block">Across all promo codes</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.08] shadow-md">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Primary Signature Voucher
          </span>
          <span className="text-xl font-mono font-bold text-brand-gold block mt-1">
            BLACKDOT10
          </span>
          <span className="text-[11px] text-zinc-400 mt-1 block">10% VIP Privilege discount</span>
        </div>
      </div>

      {/* 3. Coupons Table */}
      <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1B1B1B] text-zinc-400 border-b border-white/[0.08] text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Promo Code</th>
                <th className="py-3.5 px-4 font-semibold">Discount Value</th>
                <th className="py-3.5 px-4 font-semibold">Min Order Requirement</th>
                <th className="py-3.5 px-4 font-semibold">Validity Period</th>
                <th className="py-3.5 px-4 font-semibold">Redemptions</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {coupons.map((coupon) => {
                const isActive = coupon.status === 'Active';

                return (
                  <tr key={coupon.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Code */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-gold text-xs px-2.5 py-1 rounded bg-white/[0.04] border border-brand-gold/30">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy Code"
                        >
                          {copiedCode === coupon.code ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1 max-w-xs truncate">
                        {coupon.description}
                      </p>
                    </td>

                    {/* Value */}
                    <td className="py-3.5 px-4 font-bold text-white text-xs">
                      {coupon.type === 'percentage'
                        ? coupon.value + '% Discount'
                        : 'Rs. ' + coupon.value.toLocaleString() + ' Flat Off'}
                    </td>

                    {/* Min Order */}
                    <td className="py-3.5 px-4 text-zinc-300">
                      {coupon.minOrder > 0
                        ? 'Rs. ' + coupon.minOrder.toLocaleString()
                        : 'No Minimum'}
                    </td>

                    {/* Validity */}
                    <td className="py-3.5 px-4 text-zinc-300 text-[11px]">
                      <span>{coupon.startDate || '2026-01-01'}</span>
                      <span className="text-zinc-500 block">to {coupon.expiryDate}</span>
                    </td>

                    {/* Usage */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white block">
                        {coupon.timesUsed || 0} used
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        limit: {coupon.usageLimit || 'Unlimited'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleCouponStatus(coupon.id)}
                        className={'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ' +
                          (isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40 hover:bg-zinc-500/30')}
                      >
                        {coupon.status}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(coupon)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-zinc-300 transition-colors cursor-pointer"
                          title="Edit Coupon"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCouponToDelete(coupon)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white text-zinc-300 transition-colors cursor-pointer"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Add / Edit Coupon Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsEditModalOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-md bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 z-10 animate-fadeIn text-white">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading text-white">
              {editingCoupon ? 'Modify Coupon' : 'Create Privilege Code'}
            </h3>

            <form onSubmit={handleSaveCoupon} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. LUXURY25"
                  className="w-full bg-[#141414] text-xs font-mono font-bold text-brand-gold p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Value *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                    placeholder="15"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Min Order (PKR)
                  </label>
                  <input
                    type="number"
                    value={form.minOrder}
                    onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Max Discount (PKR)
                  </label>
                  <input
                    type="number"
                    value={form.maxDiscount}
                    onChange={(e) => setForm({ ...form, maxDiscount: Number(e.target.value) })}
                    placeholder="2500"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    value={form.usageLimit}
                    onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })}
                    placeholder="500"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. VIP Festive Privilege Code"
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
                >
                  {editingCoupon ? 'Update Coupon' : 'Publish Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Confirm Modal */}
      <ConfirmModal
        isOpen={Boolean(couponToDelete)}
        onClose={() => setCouponToDelete(null)}
        onConfirm={() => {
          if (couponToDelete) {
            deleteCoupon(couponToDelete.id);
            setCouponToDelete(null);
          }
        }}
        title="Delete Privilege Code"
        message={'Are you sure you wish to permanently delete promotional code "' + (couponToDelete?.code || '') + '"?'}
        confirmText="Confirm Delete"
      />
    </div>
  );
}
