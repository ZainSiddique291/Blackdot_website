import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import AdminLayout from './AdminLayout';
import AdminLoginView from './pages/AdminLoginView';
import DashboardView from './pages/DashboardView';
import ProductsView from './pages/ProductsView';
import OrdersView from './pages/OrdersView';
import CustomersView from './pages/CustomersView';
import CategoriesView from './pages/CategoriesView';
import WebsiteContentView from './pages/WebsiteContentView';
import DiscountsView from './pages/DiscountsView';
import ReportsView from './pages/ReportsView';
import AdminProfileView from './pages/AdminProfileView';

function AdminPortalContent({ onViewLiveStore }) {
  const { isAdminAuthenticated } = useAdminAuth();
  // Always defaults and opens to the Admin Dashboard immediately
  const [activeTab, setActiveTab] = useState('dashboard');

  // If authentication is required, display admin login first and immediately redirect
  // to the Admin Dashboard after successful authentication
  if (!isAdminAuthenticated) {
    return (
      <AdminLoginView
        onReturnStore={onViewLiveStore}
        onLoginSuccess={() => setActiveTab('dashboard')}
      />
    );
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onViewLiveStore={onViewLiveStore}
    >
      {activeTab === 'dashboard' && (
        <DashboardView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'products' && (
        <ProductsView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'orders' && (
        <OrdersView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'customers' && (
        <CustomersView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'categories' && (
        <CategoriesView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'content' && (
        <WebsiteContentView onViewLiveStore={onViewLiveStore} />
      )}
      {activeTab === 'discounts' && (
        <DiscountsView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'reports' && (
        <ReportsView onNavigateTab={setActiveTab} />
      )}
      {activeTab === 'profile' && (
        <AdminProfileView onLogoutClick={() => {}} />
      )}
    </AdminLayout>
  );
}

export default function AdminPortal({ onViewLiveStore }) {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <AdminPortalContent onViewLiveStore={onViewLiveStore} />
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}
