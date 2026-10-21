import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 3000;
const STANDARD_SHIPPING_FEE = 190;

export function CartProvider({ children }) {
  // Initialize cart from localStorage if present
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_cart');
      return saved ? JSON.parse(saved) : [
        // Pre-load with the signature 7-in-1 shampoo 500ml for delightful initial experience
        {
          id: 'bd-shampoo-500',
          name: 'Black Dot 7-in-1 Advanced Hair Shampoo (500ml)',
          price: 2450,
          originalPrice: 2950,
          volume: '500ml',
          image: '/images/hero_stage.png',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('blackdot_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [cart]);

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const addToCart = (product, quantity = 1, selectedVolume = null) => {
    const itemVolume = selectedVolume || product.volume || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${itemVolume}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId || item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          (item.cartItemId === cartItemId || item.id === product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            cartItemId,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            volume: itemVolume,
            image: product.image,
            quantity,
          },
        ];
      }
    });

    showToast(`Added ${product.shortName || product.name} to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.cartItemId === cartItemId || item.id === cartItemId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId && item.id !== cartItemId));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE);
  const finalTotal = subtotal + shippingFee;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        isFreeShipping,
        shippingFee,
        finalTotal,
        freeShippingRemaining,
        freeShippingProgress,
        FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
