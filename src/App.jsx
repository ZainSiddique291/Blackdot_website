import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
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
import { Sparkles, Check } from 'lucide-react';
import './App.css';

function MainStore() {
  const [activePage, setActivePage] = useState('home');
  const [initialShopCategory, setInitialShopCategory] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { isCheckoutOpen, setIsCheckoutOpen, toastMessage } = useCart();

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
        onOpenAuth={() => setIsAuthOpen(true)}
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
      <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />
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
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* 6. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="px-5 py-3 rounded-xl bg-brand-black text-white text-xs sm:text-sm font-medium shadow-2xl border border-brand-gold/50 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-black flex items-center justify-center font-bold">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStore />
    </CartProvider>
  );
}
