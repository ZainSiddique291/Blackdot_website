import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  LogOut,
  ShieldCheck,
  Crown,
  Calendar,
  ExternalLink,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'orders'

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const orders = user.orders || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-brand-black text-white rounded-2xl shadow-[0_0_50px_rgba(201,154,59,0.2)] border border-brand-gold/30 overflow-hidden z-10 my-auto sm:my-8 animate-fadeIn">
        {/* Top Header */}
        <div className="p-4 sm:p-8 bg-gradient-to-b from-brand-charcoal to-brand-black border-b border-brand-gold/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold shadow-gold-glow"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center text-brand-gold font-bold text-xl shadow-gold-glow">
                {user.name ? user.name.charAt(0).toUpperCase() : 'B'}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white">
                  {user.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Crown className="w-3 h-3" />
                  VIP
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-brand-gold">
                <span>{user.tier || 'Black Dot Privé Circle'}</span>
                <span>•</span>
                <span>
                  Member since {user.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 sm:px-8 bg-brand-charcoal/50 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 mr-6 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>VIP Card &amp; Privileges</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Luxury Digital VIP Card */}
              <div className="relative rounded-2xl p-6 bg-gradient-to-br from-zinc-900 via-brand-charcoal to-brand-black border border-brand-gold/40 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-brand-gold font-bold">
                      OFFICIAL MEMBERSHIP PASS
                    </p>
                    <h4 className="font-heading text-xl font-bold text-white mt-0.5">
                      Black Dot Privé Circle
                    </h4>
                  </div>
                  <Logo variant="dark" size="sm" showTagline={false} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-white/10">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
                      Member Name
                    </span>
                    <span className="text-white font-semibold">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
                      Authentication
                    </span>
                    <span className="text-brand-gold font-semibold uppercase">
                      {user.provider === 'google' ? 'Google Verified' : 'Direct VIP'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-zinc-400">
                  <span>ID: {user.id}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Priority Pakistan Fulfillment Active
                  </span>
                </div>
              </div>

              {/* VIP Privileges List */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Your Active Concierge Privileges
                </h5>
                <ul className="text-xs text-zinc-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>10% VIP discount automatically applicable with code <strong className="text-brand-gold">BLACKDOT10</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>Free Express Courier delivery across Pakistan on orders PKR 3,000+</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>Direct WhatsApp Concierge access for personalized hair wellness guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            /* Order History Tab */
            <div>
              {orders.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mx-auto mb-3">
                    <Package className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-white">No Orders Placed Yet</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    Your luxury orders will appear here once confirmed at checkout.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord, idx) => (
                    <div
                      key={ord.orderNumber || idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-brand-gold" />
                          <span className="font-mono font-bold text-white">{ord.orderNumber}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">{ord.date}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                          {ord.status || 'Confirmed & Processing'}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="py-3 space-y-1.5 text-xs">
                        {(ord.items || []).map((item, i) => (
                          <div key={i} className="flex justify-between text-zinc-300">
                            <span className="truncate pr-2">
                              {item.name} {item.volume ? `(${item.volume})` : ''} × {item.quantity || 1}
                            </span>
                            <span className="font-semibold text-white whitespace-nowrap">
                              PKR {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Meta Footer */}
                      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-zinc-400">
                        <div className="flex items-center gap-3 text-[11px]">
                          {ord.city && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-brand-gold" />
                              {ord.city}
                            </span>
                          )}
                          {ord.paymentMethod && (
                            <span className="flex items-center gap-1">
                              <CreditCard className="w-3 h-3 text-brand-gold" />
                              {ord.paymentMethod}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-brand-gold">
                          Total: PKR {(ord.total || 0).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Sign Out */}
        <div className="p-4 sm:p-6 bg-brand-charcoal border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Black Dot Encrypted Session</span>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
