import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Crown,
  LogOut,
  Package,
  ChevronDown,
} from 'lucide-react';
import Logo from '../common/Logo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ activePage, setActivePage, onOpenSearch, onOpenAuth }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout, openProfileModal } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-brand-black/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-b border-brand-gold/15'
          : 'bg-brand-black border-b border-white/10'
      }`}
    >
      <div className="h-14 sm:h-16 flex items-center">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded py-1 cursor-pointer"
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
                className={`group relative text-sm tracking-wider uppercase font-medium transition-colors duration-200 py-1 cursor-pointer ${
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
            className="p-2 text-zinc-300 hover:text-brand-gold transition-colors duration-200 rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer"
            aria-label="Search collection"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Profile / VIP Menu */}
          {isAuthenticated ? (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-brand-gold/40 text-white transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer group"
                aria-label="VIP Member Account"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-brand-gold"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold font-bold text-xs flex items-center justify-center border border-brand-gold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
                  </div>
                )}
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-brand-gold max-w-[90px] truncate">
                  {user?.name?.split(' ')[0] || 'VIP'}
                </span>
                <Crown className="w-3.5 h-3.5 text-brand-gold" />
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-gold transition-transform duration-200" />
              </button>

              {/* Luxury Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-brand-black border border-brand-gold/30 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn text-white">
                  {/* Dropdown Header */}
                  <div className="p-3 border-b border-white/10 bg-white/[0.03] rounded-lg mb-1">
                    <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] text-brand-gold font-semibold uppercase tracking-wider">
                      <Crown className="w-3 h-3" />
                      <span>{user?.tier || 'Black Dot Privé'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      openProfileModal();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-brand-gold" />
                    <span>VIP Account &amp; Orders ({user?.orders?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      try {
                        window.history.pushState(null, '', '/admin');
                      } catch {}
                      window.location.hash = '';
                      setActivePage('admin');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-brand-gold hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Crown className="w-4 h-4 text-brand-gold" />
                    <span>Executive Admin Panel</span>
                  </button>

                  <div className="my-1 border-t border-white/10" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => onOpenAuth?.({ mode: 'login' })}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-brand-gold px-3 py-1.5 rounded transition-colors duration-200 cursor-pointer"
                title="Login to VIP Account"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth?.({ mode: 'signup' })}
                className="text-xs font-semibold uppercase tracking-wider bg-brand-gold hover:bg-brand-gold-dark text-brand-black px-3.5 py-1.5 rounded shadow-sm hover:shadow-gold-glow transition-all duration-200 cursor-pointer"
                title="Sign In / Create Account"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Cart / Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-zinc-300 hover:text-brand-gold transition-colors duration-200 rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer"
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
            className="md:hidden p-2 text-zinc-200 hover:text-brand-gold transition-colors rounded focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 px-5 sm:px-6 py-5 max-h-[calc(100dvh-3.5rem)] overflow-y-auto transition-all duration-300 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between text-base uppercase tracking-wider font-medium py-2.5 border-b border-white/5 text-left cursor-pointer ${
                    isActive ? 'text-brand-gold font-semibold' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
                </button>
              );
            })}

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-gold"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold font-bold text-sm flex items-center justify-center border border-brand-gold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{user?.name}</span>
                      <Crown className="w-3.5 h-3.5 text-brand-gold" />
                    </p>
                    <p className="text-xs text-zinc-400">{user?.email}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openProfileModal();
                    }}
                    className="flex-1 py-2 px-3 bg-white/5 border border-brand-gold/30 rounded text-xs text-brand-gold font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>My Orders ({user?.orders?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="py-2 px-3 bg-rose-950/40 border border-rose-500/30 rounded text-xs text-rose-300 font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <span className="uppercase tracking-wider font-medium text-zinc-400">VIP Portal Access</span>
                  <span className="text-brand-gold">Pakistan Store</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth?.({ mode: 'login' });
                    }}
                    className="flex-1 py-2.5 px-3 border border-white/20 hover:border-brand-gold text-zinc-200 hover:text-brand-gold text-xs font-semibold uppercase tracking-wider rounded text-center transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth?.({ mode: 'signup' });
                    }}
                    className="flex-1 py-2.5 px-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-semibold uppercase tracking-wider rounded text-center transition-colors shadow-sm cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
