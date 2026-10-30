import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ChevronDown,
  User,
  Shield,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

export default function AdminHeader({
  activeTab,
  onOpenMobileSidebar,
  adminUser,
  onLogoutClick,
  onViewLiveStore,
  onNavigateTab,
  orders = [],
  lowStockProducts = [],
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const pageTitles = {
    dashboard: 'Executive Overview',
    products: 'Product Specifications & Inventory',
    orders: 'Client Order Pipeline',
    customers: 'VIP Client Directory',
    categories: 'Formulation Categories',
    content: 'Website CMS & Brand Content',
    discounts: 'Promotions & Privilege Coupons',
    reports: 'Financial Reports & Intelligence',
    profile: 'Executive Profile & Security',
  };

  const currentTitle = pageTitles[activeTab] || 'Administration';
  const unreadCount = (lowStockProducts?.length || 0) + (orders?.filter((o) => o.status === 'Pending')?.length || 0);

  return (
    <header className="sticky top-0 z-30 h-16 bg-brand-black/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between text-white">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold font-heading text-white tracking-wide truncate">
            {currentTitle}
          </h1>
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:block">
            Black Dot Flagship • Infinite Vision
          </p>
        </div>
      </div>

      {/* Center/Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Live Boutique Switcher */}
        <button
          onClick={onViewLiveStore}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-brand-gold hover:text-brand-black border border-brand-gold/30 text-zinc-200 transition-all duration-200 text-xs font-semibold cursor-pointer shadow-sm group"
        >
          <ExternalLink className="w-3.5 h-3.5 text-brand-gold group-hover:text-brand-black transition-colors" />
          <span>Live Boutique</span>
        </button>

        {/* Notifications Trigger */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-xl text-zinc-300 hover:text-brand-gold hover:bg-white/[0.06] transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_8px_#C99A3B] animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          <NotificationDrawer
            isOpen={notifOpen}
            onClose={() => setNotifOpen(false)}
            orders={orders}
            lowStockProducts={lowStockProducts}
            onNavigateOrder={(orderId) => {
              if (onNavigateTab) onNavigateTab('orders');
            }}
            onNavigateProduct={(prodId) => {
              if (onNavigateTab) onNavigateTab('products');
            }}
          />
        </div>

        {/* Admin Profile Pill */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all text-left cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-brand-gold font-bold text-xs shadow-sm">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </div>

            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-xs font-bold text-white group-hover:text-brand-gold transition-colors truncate max-w-[110px]">
                {adminUser?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-zinc-400 truncate mt-0.5">
                Chief Executive
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-gold transition-transform duration-200" />
          </button>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-brand-black/95 border border-brand-gold/30 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn text-white backdrop-blur-xl">
              <div className="p-3 border-b border-white/10 bg-white/[0.03] rounded-xl mb-1">
                <p className="text-xs font-bold text-white truncate">
                  {adminUser?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                  {adminUser?.email || 'admin@blackdot.pk'}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-brand-gold uppercase tracking-wider">
                  <Shield className="w-3 h-3" />
                  <span>Super Admin Privilege</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (onNavigateTab) onNavigateTab('profile');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-brand-gold" />
                <span>Executive Profile</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onViewLiveStore();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-brand-gold" />
                <span>Visit Client Store</span>
              </button>

              <div className="my-1 border-t border-white/10" />

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (onLogoutClick) onLogoutClick();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
