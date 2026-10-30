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

// Robust check for whether the current URL represents a dedicated customer store route
const isCustomerStoreRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
  const hash = (window.location.hash || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();

  // If URL explicitly targets admin, it is NOT customer store
  if (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#admin' ||
    hash.startsWith('#admin/') ||
    hash.startsWith('#/admin') ||
    search.includes('admin')
  ) {
    return false;
  }

  // Dedicated customer-facing routes: /store, /shop, /about, /contact, or corresponding hashes
  if (
    path === '/store' ||
    path.startsWith('/store/') ||
    path === '/shop' ||
    path === '/about' ||
    path === '/contact' ||
    path === '/home' ||
    hash === '#store' ||
    hash === '#shop' ||
    hash === '#about' ||
    hash === '#contact' ||
    hash === '#home' ||
    search.includes('store')
  ) {
    return true;
  }

  // Default: root route ('/' or empty) and any unknown path belongs to the Admin Panel landing
  return false;
};

// Initial page state: defaults to 'admin' unless explicitly accessing dedicated store routes
const getInitialActivePage = () => {
  if (typeof window === 'undefined') return 'admin';
  const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
  const hash = (window.location.hash || '').toLowerCase();

  if (isCustomerStoreRoute()) {
    if (path === '/shop' || hash === '#shop') return 'shop';
    if (path === '/about' || hash === '#about') return 'about';
    if (path === '/contact' || hash === '#contact') return 'contact';
    return 'home';
  }

  // Root route '/' automatically redirects to '/admin'
  if (path === '' || path === '/') {
    try {
      window.history.replaceState(null, '', '/admin');
    } catch {
      // Safe fallback if history API is restricted
    }
  }

  return 'admin';
};

function MainStore() {
  // Defaults to 'admin' so the Admin Panel is the default landing page across localhost and Vercel
  const [activePage, setActivePage] = useState(getInitialActivePage);

  // Sync route on mount, hash changes, and history popstate
  React.useEffect(() => {
    const syncRoute = () => {
      const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
      const hash = (window.location.hash || '').toLowerCase();

      // Explicit Admin route
      if (
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === '#admin' ||
        hash.startsWith('#admin/') ||
        hash.startsWith('#/admin') ||
        window.location.search.toLowerCase().includes('admin')
      ) {
        setActivePage('admin');
        return;
      }

      // Root route '/' automatically redirects to /admin
      if (path === '' || path === '/') {
        try {
          window.history.replaceState(null, '', '/admin');
        } catch {}
        setActivePage('admin');
        return;
      }

      // Dedicated Customer Store routes
      if (path === '/shop' || hash === '#shop') {
        setActivePage('shop');
      } else if (path === '/about' || hash === '#about') {
        setActivePage('about');
      } else if (path === '/contact' || hash === '#contact') {
        setActivePage('contact');
      } else if (path === '/store' || path === '/home' || hash === '#store' || hash === '#home') {
        setActivePage('home');
      } else {
        // Any unknown path defaults to admin panel
        try {
          window.history.replaceState(null, '', '/admin');
        } catch {}
        setActivePage('admin');
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

  // Admin Portal landing
  if (activePage === 'admin') {
    return (
      <AdminPortal
        onViewLiveStore={() => {
          try {
            window.history.pushState(null, '', '/store');
          } catch {}
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
          try {
            window.history.pushState(null, '', '/admin');
          } catch {}
          window.location.hash = '';
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
