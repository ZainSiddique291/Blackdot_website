import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import CartDrawer from './components/cart/CartDrawer';
import ProductModal from './components/products/ProductModal';
import CheckoutModal from './components/checkout/CheckoutModal';
import SearchModal from './components/common/SearchModal';
import AuthModal from './components/common/AuthModal';
import UserProfileModal from './components/common/UserProfileModal';
import AdminPortal from './admin/AdminPortal';
import { Check, Crown } from 'lucide-react';
import './App.css';

// Robust detection for admin route across paths, hashes, and parameters
const checkIsAdminRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = (window.location.pathname || '').toLowerCase();
  const hash = (window.location.hash || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#admin' ||
    hash.startsWith('#admin/') ||
    hash.startsWith('#/admin') ||
    search.includes('admin')
  );
};

function MainStore() {
  // Immediately initialize to 'admin' if the admin route is accessed
  const [activePage, setActivePage] = useState(() => {
    if (checkIsAdminRoute()) {
      return 'admin';
    }
    return 'home';
  });

  // Listen for hash and history popstate changes, ensuring the admin route opens immediately
  // and never accidentally redirects to the storefront
  React.useEffect(() => {
    const syncRoute = () => {
      if (checkIsAdminRoute()) {
        setActivePage('admin');
      } else {
        const hash = window.location.hash.toLowerCase();
        if (hash === '#shop') {
          setActivePage('shop');
        } else if (hash === '#about') {
          setActivePage('about');
        } else if (hash === '#contact') {
          setActivePage('contact');
        } else if (hash === '#home') {
          setActivePage('home');
        }
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);
  const [initialShopCategory, setInitialShopCategory] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isCheckoutOpen, setIsCheckoutOpen, toastMessage } = useCart();
  const {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    authRedirectReason,
    clearAuthRedirect,
    isProfileModalOpen,
    closeProfileModal,
    authToast,
    isAuthenticated,
    authMode,
  } = useAuth();

  const handleNavigateShop = (category = 'all') => {
    setInitialShopCategory(category);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    setActivePage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    // If user attempted checkout before authenticating, resume checkout seamlessly
    if (authRedirectReason === 'checkout') {
      setIsCheckoutOpen(true);
      clearAuthRedirect();
    }
  };

  const activeToast = toastMessage || authToast;

  if (activePage === 'admin') {
    return (
      <AdminPortal
        onViewLiveStore={() => {
          if (window.location.pathname.toLowerCase().startsWith('/admin')) {
            window.history.pushState(null, '', '/');
          }
          window.location.hash = '';
          setActivePage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-black selection:bg-brand-gold selection:text-brand-black">
      {/* 1. Sticky Luxury Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(options) => openAuthModal(options || { mode: 'login' })}
      />

      {/* 3. Main Dynamic Page View */}
      <div className="flex-1">
        {activePage === 'home' && (
          <Home
            onNavigateShop={handleNavigateShop}
            onNavigateAbout={handleNavigateAbout}
          />
        )}
        {activePage === 'shop' && (
          <Shop
            initialCategory={initialShopCategory}
            onNavigateHome={handleNavigateHome}
          />
        )}
        {activePage === 'about' && (
          <About
            onNavigateShop={handleNavigateShop}
            onNavigateHome={handleNavigateHome}
          />
        )}
        {activePage === 'contact' && (
          <Contact onNavigateHome={handleNavigateHome} />
        )}
      </div>

      {/* 4. Luxury Footer */}
      <Footer
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. Drawers & Modals */}
      <CartDrawer
        onProceedCheckout={() => {
          if (isAuthenticated) {
            setIsCheckoutOpen(true);
          } else {
            openAuthModal({
              mode: 'login',
              redirectAction: 'checkout',
              message: 'VIP Checkout Protection: Please sign in or register to place your order.',
            });
          }
        }}
      />
      <ProductModal />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <AuthModal
        key={`${isAuthModalOpen ? 'open' : 'closed'}-${authMode}`}
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />

      {/* Floating Executive Admin Switcher Button */}
      <button
        onClick={() => {
          window.location.hash = '#admin';
          setActivePage('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-brand-black/90 hover:bg-brand-black text-brand-gold border border-brand-gold/50 shadow-2xl backdrop-blur-md text-xs font-bold tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer group"
        title="Access Black Dot Executive Admin Dashboard"
      >
        <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
        <Crown className="w-3.5 h-3.5 text-brand-gold" />
        <span className="text-zinc-200 group-hover:text-white">Admin Suite</span>
      </button>

      {/* 6. Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="px-5 py-3 rounded-xl bg-brand-black text-white text-xs sm:text-sm font-medium shadow-2xl border border-brand-gold/50 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-black flex items-center justify-center font-bold">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{activeToast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainStore />
      </CartProvider>
    </AuthProvider>
  );
}
