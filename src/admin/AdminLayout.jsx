import React, { useState } from 'react';
import { Check, AlertTriangle, Info } from 'lucide-react';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import ConfirmModal from './components/ConfirmModal';
import { useAdminData } from './context/AdminDataContext';
import { useAdminAuth } from './context/AdminAuthContext';

export default function AdminLayout({
  activeTab,
  setActiveTab,
  onViewLiveStore,
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { adminUser, logoutAdmin } = useAdminAuth();
  const { adminToast, orders, analytics } = useAdminData();

  const handleConfirmLogout = () => {
    logoutAdmin();
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-body selection:bg-brand-gold selection:text-brand-black">
      {/* 1. Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        pendingOrdersCount={analytics.pendingOrdersCount}
        lowStockCount={analytics.lowStockCount}
        onViewLiveStore={onViewLiveStore}
        onLogoutClick={() => setIsLogoutModalOpen(true)}
      />

      {/* 2. Main Content Area */}
      <div
        className={'flex-1 flex flex-col transition-all duration-300 ease-in-out ' +
          (isCollapsed ? 'lg:pl-20' : 'lg:pl-64')}
      >
        {/* Top Sticky Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          adminUser={adminUser}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
          onViewLiveStore={onViewLiveStore}
          onNavigateTab={setActiveTab}
          orders={orders}
          lowStockProducts={analytics.lowStockProducts}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 3. Global Luxury Admin Toast Notification */}
      {adminToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="px-5 py-3 rounded-2xl bg-brand-black/95 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-brand-gold/60 flex items-center gap-3 backdrop-blur-md">
            <span className={'w-6 h-6 rounded-full flex items-center justify-center ' +
              (adminToast.type === 'error'
                ? 'bg-rose-500 text-white'
                : adminToast.type === 'warning'
                ? 'bg-amber-500 text-black'
                : 'bg-brand-gold text-brand-black')}>
              {adminToast.type === 'error' ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
            </span>
            <span>{adminToast.message}</span>
          </div>
        </div>
      )}

      {/* 4. Logout Confirmation Dialog */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Sign Out Executive Session"
        message="Are you sure you wish to sign out of the Black Dot Administration Suite?"
        confirmText="Sign Out"
        isDanger={false}
      />
    </div>
  );
}
