import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Banknote,
  Building,
  Lock,
  Crown,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Sargodha',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Other City',
];

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, subtotal, isFreeShipping, shippingFee, finalTotal, clearCart } = useCart();
  const { user, isAuthenticated, openAuthModal, recordUserOrder } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    paymentMethod: 'cod', // cod | card | bank
    couponCode: '',
  });

  // Automatically pre-fill authenticated user's details
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (form.couponCode.trim().toUpperCase() === 'BLACKDOT10') {
      const discountValue = Math.round(subtotal * 0.1);
      setDiscount(discountValue);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try BLACKDOT10');
    }
  };

  const calculatedTotal = Math.max(0, finalTotal - discount);

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Order Protection: enforce login before placing order
    if (!isAuthenticated) {
      openAuthModal({
        mode: 'login',
        redirectAction: 'checkout',
        message: 'VIP Checkout Protection: Please sign in or register to place your order.',
      });
      return;
    }

    if (!form.fullName || !form.phone || !form.address) {
      alert('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const orderNumber = `BD-${Math.floor(100000 + Math.random() * 900000)}`;

      const completedOrderData = {
        orderNumber,
        items: [...cart],
        total: calculatedTotal,
        customer: { ...form },
      };

      setOrderComplete(completedOrderData);

      // Record to authenticated user's order history
      if (recordUserOrder) {
        recordUserOrder(completedOrderData);
      }

      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C99A3B', '#E2C27A', '#0B0B0B'],
        });
      } catch (err) {
        // ignore
      }

      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-3xl max-h-[94vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden z-10 my-auto sm:my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-brand-black hover:text-white text-brand-black transition-colors shadow-md cursor-pointer"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* If guest somehow reached here, display luxury VIP barrier */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center bg-brand-ivory">
            <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-brand-gold-dark mx-auto mb-4 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold-dark mb-1">
              VIP PROTECTION
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-black">
              Sign In Required for Order Placement
            </h2>
            <p className="text-sm text-brand-text max-w-md mx-auto mt-2 leading-relaxed">
              Black Dot maintains an exclusive membership standard for order fulfillment, nationwide express courier dispatch, and authentic lifetime record tracking.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() =>
                  openAuthModal({
                    mode: 'login',
                    redirectAction: 'checkout',
                    message: 'Please sign in or create an account to proceed with your order.',
                  })
                }
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs tracking-[0.2em] uppercase rounded shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In or Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 border border-brand-border hover:bg-black/5 text-brand-black font-semibold text-xs tracking-wider uppercase rounded transition-colors cursor-pointer"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        ) : orderComplete ? (
          /* Order Confirmation View */
          <div className="p-8 sm:p-12 text-center bg-brand-ivory">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto mb-6 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold-dark mb-1">
              ORDER CONFIRMED
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-black">
              Thank You, {orderComplete.customer.fullName}
            </h2>
            <p className="text-sm text-brand-text max-w-md mx-auto mt-2">
              Your Black Dot order has been dispatched to our fulfillment team and recorded under your VIP account. You will receive an SMS and WhatsApp confirmation shortly.
            </p>

            <div className="mt-8 p-6 bg-white rounded-xl border border-brand-border/80 max-w-md mx-auto text-left shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-brand-border text-xs">
                <span className="text-brand-muted">Order Reference:</span>
                <span className="font-mono font-bold text-brand-black text-sm">
                  {orderComplete.orderNumber}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 text-xs">
                <span className="text-brand-muted">VIP Member:</span>
                <span className="font-semibold text-brand-black flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-brand-gold-dark" />
                  {user?.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 text-xs">
                <span className="text-brand-muted">Payment:</span>
                <span className="font-semibold text-brand-black uppercase">
                  {orderComplete.customer.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : 'Bank Transfer'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 text-xs">
                <span className="text-brand-muted">Destination:</span>
                <span className="font-semibold text-brand-black">
                  {orderComplete.customer.city}, Pakistan
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-brand-border text-sm font-bold text-brand-black">
                <span>Total Amount:</span>
                <span className="text-brand-gold-dark font-heading text-base">
                  PKR {orderComplete.total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 px-8 py-3.5 bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-colors shadow-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form & Summary */
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
            {/* Form Left Column */}
            <div className="md:col-span-7 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-brand-gold-dark" />
                <h3 className="font-heading text-2xl font-semibold text-brand-black">
                  Delivery Details
                </h3>
              </div>

              {/* VIP Member Identity Banner */}
              <div className="mb-5 p-3 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-black">
                  <Crown className="w-4 h-4 text-brand-gold-dark" />
                  <span>
                    Logged in as VIP: <strong>{user?.name}</strong> ({user?.email})
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark bg-brand-gold/20 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Asif Ali"
                    className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    City (Pakistan) *
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-gold focus:outline-none bg-white"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House/Apartment #, Street, Sector / Area"
                    className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>

                {/* Payment Options */}
                <div className="pt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                        form.paymentMethod === 'cod'
                          ? 'border-brand-gold bg-brand-gold-tint/40'
                          : 'border-brand-border hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={form.paymentMethod === 'cod'}
                          onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                          className="accent-brand-gold"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-brand-black block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-brand-muted">
                            Pay comfortably with cash when parcel arrives
                          </span>
                        </div>
                      </div>
                      <Banknote className="w-5 h-5 text-brand-gold-dark" />
                    </label>

                    <label
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                        form.paymentMethod === 'bank'
                          ? 'border-brand-gold bg-brand-gold-tint/40'
                          : 'border-brand-border hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={form.paymentMethod === 'bank'}
                          onChange={() => setForm({ ...form, paymentMethod: 'bank' })}
                          className="accent-brand-gold"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-brand-black block">
                            Direct Bank Transfer / Raast
                          </span>
                          <span className="text-brand-muted">
                            HBL, Meezan, Alfalah or Raast ID
                          </span>
                        </div>
                      </div>
                      <Building className="w-5 h-5 text-brand-gold-dark" />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase rounded shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>CONFIRMING ORDER...</span>
                  ) : (
                    <span>CONFIRM &amp; PLACE ORDER</span>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary Right Column */}
            <div className="md:col-span-5 bg-brand-ivory p-6 sm:p-8 border-t md:border-t-0 md:border-l border-brand-border flex flex-col justify-between">
              <div>
                <h4 className="font-heading text-lg font-semibold text-brand-black mb-4">
                  Order Summary
                </h4>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 divide-y divide-brand-border/60">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId || item.id}
                      className="pt-2 first:pt-0 flex items-center justify-between text-xs"
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-brand-black truncate">{item.name}</p>
                        <p className="text-[10px] text-brand-muted">
                          {item.volume} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-brand-black">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <form
                  onSubmit={handleApplyCoupon}
                  className="mt-6 pt-4 border-t border-brand-border"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.couponCode}
                      onChange={(e) => setForm({ ...form, couponCode: e.target.value })}
                      placeholder="Promo: BLACKDOT10"
                      className="flex-1 px-3 py-2 text-xs border border-brand-border rounded uppercase focus:outline-none focus:border-brand-gold"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-brand-black text-brand-gold text-xs font-bold uppercase rounded cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                      ✓ VIP 10% Discount Applied!
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">{couponError}</p>
                  )}
                </form>

                {/* Totals Breakdown */}
                <div className="mt-6 pt-4 border-t border-brand-border space-y-2 text-xs">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal:</span>
                    <span className="text-brand-black font-semibold">
                      PKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>VIP Discount (10%):</span>
                      <span>- PKR {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-muted">
                    <span>Courier Delivery:</span>
                    <span className="text-brand-black font-semibold">
                      {isFreeShipping ? 'FREE' : `PKR ${shippingFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-brand-border flex justify-between text-sm font-bold text-brand-black">
                    <span>Final Amount:</span>
                    <span className="font-heading text-lg text-brand-black">
                      PKR {calculatedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border text-center">
                <p className="text-[11px] text-brand-muted">
                  Encrypted checkout. 100% money-back satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
