import React, { useState } from 'react';
import {
  Users,
  Search,
  Crown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import ConfirmModal from '../components/ConfirmModal';

export default function CustomersView() {
  const { customers, orders, addCustomer, updateCustomer, toggleCustomerStatus, deleteCustomer } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  // Modals
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    city: 'Lahore',
    address: '',
    tier: 'Black Dot PrivAc Circle',
    status: 'Active',
  };
  const [form, setForm] = useState(initialForm);

  // Filter customers
  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q) ||
      c.city?.toLowerCase().includes(q);

    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;

    return matchesSearch && matchesTier;
  });

  const handleOpenAddModal = () => {
    setCustomerToEdit(null);
    setForm(initialForm);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (cust) => {
    setCustomerToEdit(cust);
    setForm({
      name: cust.name || '',
      email: cust.email || '',
      phone: cust.phone || '',
      city: cust.city || 'Lahore',
      address: cust.address || '',
      tier: cust.tier || 'Black Dot PrivAc Circle',
      status: cust.status || 'Active',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (customerToEdit) {
      updateCustomer(customerToEdit.id, form);
    } else {
      addCustomer(form);
    }
    setIsEditModalOpen(false);
  };

  const handleOpenDetailModal = (cust) => {
    setSelectedCustomer(cust);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header & VIP Metrics */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
            <Crown className="w-3.5 h-3.5" />
            <span>Black Dot PrivAc Circle</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            VIP Client Directory &amp; Accounts
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Maintain privileged clientele relations, spending records, and tier assignments.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New VIP Member</span>
        </button>
      </div>

      {/* 2. Search & Tier Filter */}
      <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search VIP by name, email, phone, or city..."
            className="w-full bg-[#1A1A1A] text-xs text-white placeholder-zinc-500 pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-[#1A1A1A] text-xs text-zinc-300 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
          >
            <option value="all">All VIP Tiers</option>
            <option value="Black Dot PrivAc Circle">PrivAc Circle</option>
            <option value="VIP Obsidian Gold">Obsidian Gold</option>
            <option value="Platinum Member">Platinum</option>
            <option value="Silver Circle">Silver Circle</option>
          </select>
        </div>
      </div>

      {/* 3. Customers Table */}
      <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1B1B1B] text-zinc-400 border-b border-white/[0.08] text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Client Profile</th>
                <th className="py-3.5 px-4 font-semibold">Contact &amp; City</th>
                <th className="py-3.5 px-4 font-semibold">Privilege Tier</th>
                <th className="py-3.5 px-4 font-semibold">Orders Count</th>
                <th className="py-3.5 px-4 font-semibold">Lifetime Spend</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-zinc-400 text-xs">
                    No matching VIP clients found in directory.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const initial = cust.name ? cust.name.charAt(0).toUpperCase() : 'V';
                  const isSuspended = cust.status === 'Suspended';

                  return (
                    <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Avatar & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-xs flex-shrink-0">
                            {initial}
                          </div>
                          <div>
                            <p className="font-bold text-white text-xs group-hover:text-brand-gold transition-colors">
                              {cust.name}
                            </p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">
                              Joined {cust.registeredDate || '2026-01'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact & City */}
                      <td className="py-3.5 px-4">
                        <span className="text-zinc-200 block font-medium">{cust.email}</span>
                        <span className="text-[11px] text-zinc-400 block mt-0.5">
                          {cust.phone || 'Phone on file'} • {cust.city || 'Pakistan'}
                        </span>
                      </td>

                      {/* Tier */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                          <Crown className="w-3 h-3" />
                          <span>{cust.tier || 'PrivAc Circle'}</span>
                        </span>
                      </td>

                      {/* Orders */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white text-xs block">
                          {cust.ordersCount || (cust.orders?.length || 0)} Orders
                        </span>
                      </td>

                      {/* Spend */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-brand-gold text-xs block">
                          Rs. {(cust.totalSpent || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={'px-2 py-0.5 rounded-full text-[10px] font-bold border ' +
                            (isSuspended
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40')}
                        >
                          {cust.status || 'Active'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDetailModal(cust)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-zinc-300 transition-colors cursor-pointer"
                            title="Inspect Client Profile & Order History"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(cust)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-zinc-300 transition-colors cursor-pointer"
                            title="Edit VIP Profile"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleCustomerStatus(cust.id)}
                            className={'p-1.5 rounded-lg transition-colors cursor-pointer ' +
                              (isSuspended
                                ? 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-600 hover:text-white'
                                : 'bg-white/5 text-zinc-400 hover:bg-amber-600 hover:text-white')}
                            title={isSuspended ? 'Reactivate Client' : 'Suspend Account'}
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 bg-[#161616]">
          <span>Displaying {filteredCustomers.length} of {customers.length} VIP members</span>
          <span className="font-semibold text-brand-gold">
            Average Spend: Rs. {Math.round(customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0) / (customers.length || 1)).toLocaleString()}
          </span>
        </div>
      </div>

      {/* 4. Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedCustomer(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-fadeIn my-auto max-h-[92vh] overflow-y-auto text-white">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Summary Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-brand-gold font-bold text-xl flex-shrink-0 shadow-lg">
                {selectedCustomer.name ? selectedCustomer.name.charAt(0).toUpperCase() : 'V'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-heading text-white">{selectedCustomer.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                    {selectedCustomer.tier}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{selectedCustomer.email}</p>
                <p className="text-xs text-zinc-400">{selectedCustomer.phone || 'No phone'} • {selectedCustomer.city}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">
                  Lifetime Value
                </span>
                <span className="text-base font-bold text-brand-gold block mt-1">
                  Rs. {(selectedCustomer.totalSpent || 0).toLocaleString()}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">
                  Orders Completed
                </span>
                <span className="text-base font-bold text-white block mt-1">
                  {selectedCustomer.ordersCount || (selectedCustomer.orders?.length || 0)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">
                  Account Status
                </span>
                <span className="text-base font-bold text-emerald-400 block mt-1">
                  {selectedCustomer.status || 'Active'}
                </span>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-1">
                Verified Address On Record
              </span>
              <p className="text-xs text-zinc-200">
                {selectedCustomer.address || 'Address provided during checkout'}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">{selectedCustomer.city || 'Pakistan'}</p>
            </div>

            {/* Quick Concierge Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              {selectedCustomer.phone && (
                <a
                  href={'https://wa.me/' + selectedCustomer.phone.replace(/[^0-9]+/g, '')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition-colors cursor-pointer"
                >
                  WhatsApp VIP Concierge
                </a>
              )}
              <a
                href={'mailto:' + selectedCustomer.email}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors cursor-pointer"
              >
                Direct Email Dispatch
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add / Edit Customer Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setIsEditModalOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 z-10 animate-fadeIn my-auto text-white">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading text-white">
              {customerToEdit ? 'Modify VIP Client Account' : 'Register New VIP Member'}
            </h3>

            <form onSubmit={handleSaveCustomer} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Sarah Tariq"
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="client@luxury.pk"
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Lahore"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  VIP Privilege Tier
                </label>
                <select
                  value={form.tier}
                  onChange={(e) => setForm({ ...form, tier: e.target.value })}
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="Black Dot PrivAc Circle">Black Dot PrivAc Circle</option>
                  <option value="VIP Obsidian Gold">VIP Obsidian Gold</option>
                  <option value="Platinum Member">Platinum Member</option>
                  <option value="Silver Circle">Silver Circle</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
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
                  {customerToEdit ? 'Save Changes' : 'Register Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
