import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import Logo from '../common/Logo';
import { useCart } from '../../context/CartContext';

export default function Navbar({ activePage, setActivePage, onOpenSearch, onOpenAuth }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 h-14 sm:h-16 flex items-center ${
        isScrolled
          ? 'bg-brand-black/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-b border-brand-gold/15'
          : 'bg-brand-black border-b border-white/10'
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded py-1"
          aria-label="Black Dot Home"
        >
          <Logo variant="dark" size="md" />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`group relative text-sm tracking-wider uppercase font-medium transition-colors duration-200 py-1 ${
                  isActive ? 'text-brand-gold' : 'text-zinc-300 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {/* Gold active dot & underline */}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Account, Cart, Mobile Toggle) */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-300 hover:text-brand-gold transition-colors duration-200 rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            aria-label="Search collection"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Icon */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:inline-flex p-2 text-zinc-300 hover:text-brand-gold transition-colors duration-200 rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            aria-label="Account profile"
            title="VIP Member Login"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart / Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-zinc-300 hover:text-brand-gold transition-colors duration-200 rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            aria-label={`Shopping bag with ${totalItemsCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-brand-gold text-brand-black text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-200 hover:text-brand-gold transition-colors rounded focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 px-6 py-6 transition-all duration-300 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between text-base uppercase tracking-wider font-medium py-2.5 border-b border-white/5 text-left ${
                    isActive ? 'text-brand-gold font-semibold' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
                </button>
              );
            })}
            <div className="pt-4 flex items-center justify-between text-sm text-brand-muted">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth?.();
                }}
                className="flex items-center gap-2 text-zinc-300 hover:text-brand-gold"
              >
                <User className="w-4 h-4 text-brand-gold" />
                <span>VIP Member Portal</span>
              </button>
              <span className="text-xs text-brand-gold">Pakistan Store</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
