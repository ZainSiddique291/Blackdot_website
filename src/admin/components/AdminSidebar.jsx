import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FolderTree,
  Globe,
  Tag,
  BarChart3,
  UserCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  pendingOrdersCount = 0,
  lowStockCount = 0,
  onViewLiveStore,
  onLogoutClick,
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      badge: lowStockCount > 0 ? (lowStockCount + ' Low') : null,
      badgeVariant: 'warning',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? String(pendingOrdersCount) : null,
      badgeVariant: 'gold',
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: FolderTree,
    },
    {
      id: 'content',
      label: 'Website Content',
      icon: Globe,
    },
    {
      id: 'discounts',
      label: 'Discounts & Promotions',
      icon: Tag,
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
    },
    {
      id: 'profile',
      label: 'Admin Profile',
      icon: UserCheck,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      isAction: true,
    },
  ];

  const handleNav = (item) => {
    if (item.isAction) {
      if (item.id === 'logout' && onLogoutClick) {
        onLogoutClick();
      }
    } else {
      setActiveTab(item.id);
      if (mobileOpen) setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={'fixed top-0 bottom-0 left-0 z-40 bg-brand-black border-r border-white/10 flex flex-col justify-between transition-all duration-300 ease-in-out ' +
          (mobileOpen ? 'translate-x-0 w-72 ' : '-translate-x-full lg:translate-x-0 ') +
          (isCollapsed ? 'lg:w-20' : 'lg:w-64')}
      >
        {/* Top Header: Brand Logo & Collapse Toggle */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-3 overflow-hidden select-none">
              {/* Official BD Circular Emblem */}
              <div className="w-9 h-9 rounded-full bg-white/95 p-[2px] shadow-[0_2px_12px_rgba(201,154,59,0.3)] border border-brand-gold/50 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/images/blackdot_official_emblem.png"
                  alt="Black Dot Emblem"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title & Tagline when expanded */}
              {!isCollapsed && (
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-bold text-white text-base tracking-tight truncate">
                    Black Dot
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.24em] font-semibold text-brand-gold mt-0.5 truncate">
                    Executive Suite
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item)}
                  title={isCollapsed ? item.label : undefined}
                  className={'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer group relative ' +
                    (item.id === 'logout'
                      ? 'text-rose-400 hover:text-rose-200 hover:bg-rose-950/30 '
                      : isActive
                      ? 'bg-gradient-to-r from-brand-gold/20 to-brand-gold/5 text-brand-gold font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-brand-gold/30 '
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05] ') +
                    (isCollapsed ? 'justify-center px-0' : '')}
                >
                  <Icon
                    className={'w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ' +
                      (isActive ? 'text-brand-gold' : item.id === 'logout' ? 'text-rose-400' : 'text-zinc-400 group-hover:text-white')}
                  />

                  {/* Label & Badge */}
                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between text-left truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ' +
                            (item.badgeVariant === 'warning'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                              : 'bg-brand-gold/20 text-brand-gold border border-brand-gold/40')}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Active Indicator Bar on collapsed view */}
                  {isCollapsed && isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-gold rounded-r-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer of Sidebar: Live Store Link & Security Badge */}
        <div className="p-3 border-t border-white/[0.08] space-y-2">
          {/* Quick "View Customer Boutique" */}
          <button
            onClick={onViewLiveStore}
            title={isCollapsed ? 'View Live Customer Store' : undefined}
            className={'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-brand-gold hover:text-brand-black text-zinc-300 transition-all border border-white/10 hover:border-brand-gold shadow-sm cursor-pointer group ' +
              (isCollapsed ? 'justify-center px-0' : '')}
          >
            <ExternalLink className="w-4 h-4 text-brand-gold group-hover:text-brand-black flex-shrink-0" />
            {!isCollapsed && <span className="truncate">View Customer Store</span>}
          </button>

          {/* Verification Badge */}
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span className="truncate">Black Dot PrivAc Enterprise</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
