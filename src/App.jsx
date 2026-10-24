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
import { Check, Crown } from 'lucide-react';
import './App.css';

function MainStore() {
  const [activePage, setActivePage] = useState('home');
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
