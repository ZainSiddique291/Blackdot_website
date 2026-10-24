import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock, Crown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function CartDrawer({ onProceedCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
    shippingFee,
    finalTotal,
    freeShippingRemaining,
    freeShippingProgress,
  } = useCart();

  const { isAuthenticated, user, openAuthModal } = useAuth();

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      openAuthModal({
        mode: 'login',
        redirectAction: 'checkout',
        message: 'VIP Checkout Protection: Please sign in or create an account to proceed with your order.',
      });
    } else {
      setIsCartOpen(false);
      onProceedCheckout();
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-brand-black shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-ivory">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-gold-dark" />
              <h2 className="font-heading text-xl font-semibold text-brand-black">
                Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-brand-muted hover:text-brand-black transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-brand-black text-white text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-3.5 h-3.5 text-brand-gold" />
                {isFreeShipping ? (
                  <span className="text-brand-gold font-bold">FREE Delivery Unlocked across Pakistan!</span>
                ) : (
                  <span>Add <strong className="text-brand-gold">PKR {freeShippingRemaining.toLocaleString()}</strong> for Free Delivery</span>
                )}
              </span>
              <span className="text-brand-gold font-bold">{freeShippingProgress}%</span>
            </div>
            {/* Progress track */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-light rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-brand-border/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-ivory flex items-center justify-center text-brand-gold-dark mb-4 border border-brand-gold/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brand-black">
                  Your Bag is Currently Empty
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mt-1 mb-6">
                  Experience the transformative power of Black Dot hair wellness.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white text-xs font-bold tracking-widest uppercase rounded transition-colors"
                >
                  Explore Signature Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId || item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-brand-ivory border border-brand-border overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-heading text-sm font-semibold text-brand-black line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId || item.id)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-brand-gold-dark font-medium mt-0.5">
                        Volume: {item.volume}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-brand-border rounded">
                        <button
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                          className="p-1 hover:bg-black/5 text-brand-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-brand-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                          className="p-1 hover:bg-black/5 text-brand-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Price for Item */}
                      <span className="text-sm font-bold text-brand-black">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brand-border bg-brand-ivory/50">
              <div className="space-y-2 text-xs text-brand-text mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-black">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery (Pakistan)</span>
                  <span className="font-semibold text-brand-black">
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-bold uppercase tracking-wider">FREE</span>
                    ) : (
                      `PKR ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-brand-border flex justify-between text-base font-bold text-brand-black">
                  <span>Total Amount</span>
                  <span className="text-brand-black font-heading text-lg">
                    PKR {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* VIP Auth Status / Guard Indicator */}
              <div className="mb-3 p-2 rounded bg-brand-gold/10 border border-brand-gold/25 text-[11px] flex items-center justify-between">
                {isAuthenticated ? (
                  <span className="text-brand-black flex items-center gap-1.5 font-medium">
                    <Crown className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <span>Logged in as: <strong className="text-brand-gold-dark">{user?.name}</strong></span>
                  </span>
                ) : (
                  <span className="text-brand-black flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <span>Sign in required before placing order</span>
                  </span>
                )}
                {!isAuthenticated && (
                  <button
                    onClick={handleCheckoutClick}
                    className="text-brand-gold-dark hover:underline font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase rounded shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-gold-glow cursor-pointer"
              >
                <span>{isAuthenticated ? 'PROCEED TO SECURE CHECKOUT' : 'SIGN IN & PROCEED TO CHECKOUT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-brand-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>Cash on Delivery &amp; Bank Transfer Available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
