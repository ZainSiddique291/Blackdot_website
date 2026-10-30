import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import { Check } from 'lucide-react';
import './App.css';

// Get initial customer-facing page based on current URL path or hash
const getInitialActivePage = () => {
  if (typeof window === 'undefined') return 'home';
  const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
  const hash = (window.location.hash || '').toLowerCase();

  // If user visits /admin on the client deployment, sanitize URL cleanly to root
  if (path === '/admin' || path.startsWith('/admin/')) {
    try {
      window.history.replaceState(null, '', '/');
    } catch {}
    return 'home';
  }

  if (path === '/shop' || hash === '#shop') return 'shop';
  if (path === '/about' || hash === '#about') return 'about';
  if (path === '/contact' || hash === '#contact') return 'contact';

  // Root route ('/' or empty) and all other customer paths load homepage
  return 'home';
};

function MainStore() {
  const [activePage, setActivePage] = useState(getInitialActivePage);
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

  // Keep state in sync with browser back / forward navigation and hash changes
  useEffect(() => {
    const handleRouteChange = () => {
      const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
      const hash = (window.location.hash || '').toLowerCase();

      if (path === '/admin' || path.startsWith('/admin/')) {
        try {
          window.history.replaceState(null, '', '/');
        } catch {}
        setActivePage('home');
        return;
      }

      if (path === '/shop' || hash === '#shop') {
        setActivePage('shop');
      } else if (path === '/about' || hash === '#about') {
        setActivePage('about');
      } else if (path === '/contact' || hash === '#contact') {
        setActivePage('contact');
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigateTo = (page, category = 'all') => {
    const pathMap = {
      home: '/',
      shop: '/shop',
      about: '/about',
      contact: '/contact',
    };
    const targetPath = pathMap[page] || '/';
    try {
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    } catch {}

    if (page === 'shop') {
      setInitialShopCategory(category);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = (category = 'all') => navigateTo('shop', category);
  const handleNavigateAbout = () => navigateTo('about');
  const handleNavigateHome = () => navigateTo('home');

  const handleAuthSuccess = () => {
    // If user attempted checkout before authenticating, resume checkout seamlessly
    if (authRedirectReason === 'checkout') {
      setIsCheckoutOpen(true);
      clearAuthRedirect();
    }
  };

  const activeToast = toastMessage || authToast;

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-black selection:bg-brand-gold selection:text-brand-black">
      {/* 1. Sticky Luxury Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => navigateTo(page)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(options) => openAuthModal(options || { mode: 'login' })}
      />

      {/* 2. Main Dynamic Page View */}
      <main className="flex-1">
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
      </main>

      {/* 3. Luxury Footer */}
      <Footer
        onNavigate={(page) => navigateTo(page)}
      />

      {/* 4. Drawers & Modals */}
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

      {/* 5. Toast Notification */}
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
