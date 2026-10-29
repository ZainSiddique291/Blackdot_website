import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PRODUCTS as BASE_PRODUCTS, CATEGORIES as BASE_CATEGORIES } from '../../data/products';
import {
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
  INITIAL_WEBSITE_CONTENT,
} from '../data/initialAdminData';

const AdminDataContext = createContext();

// Enhance base products with administrative fields if not already present
const ENHANCED_BASE_PRODUCTS = BASE_PRODUCTS.map((p, idx) => {
  const stockMap = {
    'bd-cream-day': 18,
    'bd-cream-night': 22,
    'bd-cream-peptide': 4, // low stock alert!
    'bd-cream-collagen': 12,
    'bd-serum-vitc': 28,
    'bd-serum-hyaluronic': 16,
    'bd-serum-niacinamide': 6, // low stock alert!
    'bd-serum-silk': 14,
    'bd-lotion-hydration': 20,
    'bd-lotion-velvet': 15,
    'bd-lotion-botanical': 9,
    'bd-lotion-silk': 11,
    'bd-shampoo-500': 35,
    'bd-shampoo-250': 24,
    'bd-oil-argan': 8, // low stock alert!
    'bd-conditioner-keratin': 19,
    'bd-scalp-scrub': 14,
    'bd-bundle-complete': 7, // low stock alert!
  };

  const salesMap = {
    'bd-cream-day': 142,
    'bd-cream-night': 128,
    'bd-cream-peptide': 94,
    'bd-serum-vitc': 186,
    'bd-serum-hyaluronic': 115,
    'bd-shampoo-500': 310,
    'bd-bundle-complete': 62,
    'bd-oil-argan': 88,
  };

  const categoryAbbr = (p.category || 'gen').substring(0, 3).toUpperCase();
  const skuNumber = String(idx + 1).padStart(3, '0');

  return {
    ...p,
    sku: p.sku || `BD-${categoryAbbr}-${skuNumber}`,
    stock: typeof p.stock === 'number' ? p.stock : (stockMap[p.id] ?? 15),
    salesCount: typeof p.salesCount === 'number' ? p.salesCount : (salesMap[p.id] ?? 35),
    status: p.status || 'Active',
    isFeatured: p.isFeatured ?? true,
    isBestseller: p.badge?.toLowerCase().includes('best') ?? false,
    createdAt: p.createdAt || '2026-01-10T00:00:00.000Z',
  };
});

export function AdminDataProvider({ children }) {
  // 1. PRODUCTS STATE
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_products_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem('blackdot_products_db', JSON.stringify(ENHANCED_BASE_PRODUCTS));
      return ENHANCED_BASE_PRODUCTS;
    } catch {
      return ENHANCED_BASE_PRODUCTS;
    }
  });

  // 2. CATEGORIES STATE
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_categories_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const initialCats = BASE_CATEGORIES.map((c) => ({
        ...c,
        description: `Exclusive Black Dot signature collection of luxury ${c.name.toLowerCase()}.`,
        status: 'Active',
      }));
      localStorage.setItem('blackdot_categories_db', JSON.stringify(initialCats));
      return initialCats;
    } catch {
      return BASE_CATEGORIES;
    }
  });

  // 3. ORDERS STATE
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_orders_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem('blackdot_orders_db', JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 4. CUSTOMERS STATE
  const [customers, setCustomers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('blackdot_users_db');
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with INITIAL_CUSTOMERS details
          const merged = [...parsed];
          INITIAL_CUSTOMERS.forEach((initCust) => {
            if (!merged.some((u) => u.email?.toLowerCase() === initCust.email?.toLowerCase())) {
              merged.push(initCust);
            }
          });
          return merged;
        }
      }
      localStorage.setItem('blackdot_users_db', JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  // 5. COUPONS STATE
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_coupons_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem('blackdot_coupons_db', JSON.stringify(INITIAL_COUPONS));
      return INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // 6. WEBSITE CONTENT STATE
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_content_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
      localStorage.setItem('blackdot_content_db', JSON.stringify(INITIAL_WEBSITE_CONTENT));
      return INITIAL_WEBSITE_CONTENT;
    } catch {
      return INITIAL_WEBSITE_CONTENT;
    }
  });

  // 7. TOAST NOTIFICATIONS
  const [adminToast, setAdminToast] = useState(null);

  const showAdminToast = (message, type = 'success') => {
    setAdminToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (adminToast) {
      const timer = setTimeout(() => setAdminToast(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [adminToast]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('blackdot_products_db', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_categories_db', JSON.stringify(categories));
    } catch (e) {
      console.warn('Failed to save categories:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_orders_db', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_users_db', JSON.stringify(customers));
    } catch (e) {
      console.warn('Failed to save customers:', e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_coupons_db', JSON.stringify(coupons));
    } catch (e) {
      console.warn('Failed to save coupons:', e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_content_db', JSON.stringify(siteContent));
    } catch (e) {
      console.warn('Failed to save site content:', e);
    }
  }, [siteContent]);

  // ==========================================
  // PRODUCT MANAGEMENT ACTIONS
  // ==========================================
  const addProduct = (newProduct) => {
    const id = newProduct.id || `bd-${Date.now()}`;
    const category = newProduct.category || 'creams';
    const categoryAbbr = category.substring(0, 3).toUpperCase();
    const sku = newProduct.sku || `BD-${categoryAbbr}-${Math.floor(100 + Math.random() * 900)}`;

    const productToAdd = {
      ...newProduct,
      id,
      sku,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) || 0,
      salesCount: 0,
      status: newProduct.status || 'Active',
      createdAt: new Date().toISOString(),
      image: newProduct.image || '/images/hero_stage.png',
      gallery: newProduct.gallery || [newProduct.image || '/images/hero_stage.png'],
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 0,
    };

    setProducts((prev) => [productToAdd, ...prev]);
    showAdminToast(`Product "${productToAdd.name}" successfully created.`);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedFields,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
            originalPrice:
              updatedFields.originalPrice !== undefined
                ? Number(updatedFields.originalPrice)
                : p.originalPrice,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );
    showAdminToast('Product specifications updated successfully.');
  };

  const deleteProduct = (id) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showAdminToast(`Product "${target?.name || id}" removed from boutique catalog.`, 'warning');
  };

  const toggleProductFeatured = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    showAdminToast('Featured catalog status toggled.');
  };

  const toggleProductBestseller = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestseller: !p.isBestseller } : p))
    );
    showAdminToast('Bestseller badge updated.');
  };

  // ==========================================
  // ORDER MANAGEMENT ACTIONS
  // ==========================================
  const addOrder = (orderData) => {
    const orderNumber = orderData.orderNumber || `BD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      ...orderData,
      id: orderNumber,
      orderNumber,
      date: orderData.date || new Date().toISOString().split('T')[0],
      time:
        orderData.time ||
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      timestamp: new Date().toISOString(),
      status: orderData.status || 'Pending',
      paymentStatus: orderData.paymentStatus || 'Pending',
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      notes: orderData.notes || 'Order placed via Black Dot Boutique Checkout.',
    };

    // Deduct stock and increment salesCount
    if (Array.isArray(orderData.items)) {
      setProducts((prev) =>
        prev.map((p) => {
          const item = orderData.items.find((i) => i.id === p.id);
          if (item) {
            const newStock = Math.max(0, p.stock - (item.quantity || 1));
            const newSales = (p.salesCount || 0) + (item.quantity || 1);
            return { ...p, stock: newStock, salesCount: newSales };
          }
          return p;
        })
      );
    }

    setOrders((prev) => [newOrder, ...prev]);
    showAdminToast(`New order ${orderNumber} logged successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o))
    );
    showAdminToast(`Order ${orderId} status changed to "${newStatus}".`);
  };

  const updatePaymentStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId || o.orderNumber === orderId ? { ...o, paymentStatus: newStatus } : o
      )
    );
    showAdminToast(`Payment status for ${orderId} updated to "${newStatus}".`);
  };

  const updateOrderNotes = (orderId, notes) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId || o.orderNumber === orderId ? { ...o, notes } : o
      )
    );
    showAdminToast('Internal dispatch notes saved.');
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    showAdminToast(`Order ${orderId} deleted.`, 'warning');
  };

  // ==========================================
  // CUSTOMER MANAGEMENT ACTIONS
  // ==========================================
  const addCustomer = (customerData) => {
    const newCust = {
      ...customerData,
      id: `usr_${Date.now()}`,
      registeredDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0,
      status: customerData.status || 'Active',
      tier: customerData.tier || 'Black Dot PrivAc Circle',
    };
    setCustomers((prev) => [newCust, ...prev]);
    showAdminToast(`Customer "${newCust.name}" added to VIP Directory.`);
    return newCust;
  };

  const updateCustomer = (id, updatedFields) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    showAdminToast('Customer profile updated.');
  };

  const toggleCustomerStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' } : c
      )
    );
    showAdminToast('Customer account status updated.');
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    showAdminToast('Customer profile removed.', 'warning');
  };

  // ==========================================
  // CATEGORY MANAGEMENT ACTIONS
  // ==========================================
  const addCategory = (catData) => {
    const slug = (catData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCat = {
      ...catData,
      id: catData.id || slug,
      count: 0,
      status: 'Active',
    };
    setCategories((prev) => [...prev, newCat]);
    showAdminToast(`Category "${newCat.name}" created.`);
    return newCat;
  };

  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    showAdminToast('Category updated.');
  };

  const deleteCategory = (id) => {
    // Safety check: count products in this category
    const assignedProducts = products.filter((p) => p.category === id);
    if (assignedProducts.length > 0) {
      showAdminToast(
        `Cannot delete category: ${assignedProducts.length} product(s) currently assigned.`,
        'error'
      );
      return false;
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showAdminToast('Category deleted successfully.', 'warning');
    return true;
  };

  // ==========================================
  // COUPON MANAGEMENT ACTIONS
  // ==========================================
  const addCoupon = (couponData) => {
    const newCoupon = {
      ...couponData,
      id: `cpn-${Date.now()}`,
      code: couponData.code.trim().toUpperCase(),
      timesUsed: 0,
      status: couponData.status || 'Active',
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showAdminToast(`Coupon "${newCoupon.code}" created successfully.`);
    return newCoupon;
  };

  const updateCoupon = (id, updatedFields) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updatedFields,
              code: updatedFields.code ? updatedFields.code.trim().toUpperCase() : c.code,
            }
          : c
      )
    );
    showAdminToast('Promotion updated.');
  };

  const toggleCouponStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
      )
    );
    showAdminToast('Promotion status toggled.');
  };

  const deleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showAdminToast('Promotion deleted.', 'warning');
  };

  // Live validator used by checkout
  const validateCoupon = (code, subtotal) => {
    const trimmed = (code || '').trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed && c.status === 'Active');

    if (!found) {
      return { valid: false, discount: 0, message: 'Invalid or expired promotional code.' };
    }

    if (found.minOrder && subtotal < found.minOrder) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount of Rs. ${found.minOrder.toLocaleString()} required for this code.`,
      };
    }

    let discount = 0;
    if (found.type === 'percentage') {
      discount = Math.round((subtotal * found.value) / 100);
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = Math.min(subtotal, found.value);
    }

    return {
      valid: true,
      discount,
      coupon: found,
      message: `Privilege code "${found.code}" applied: Rs. ${discount.toLocaleString()} savings.`,
    };
  };

  // ==========================================
  // WEBSITE CONTENT ACTIONS
  // ==========================================
  const updateSiteContent = (section, newFields) => {
    setSiteContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        ...newFields,
      },
    }));
    showAdminToast('Website content published live!');
  };

  const updateTestimonials = (updatedTestimonials) => {
    setSiteContent((prev) => ({
      ...prev,
      testimonials: updatedTestimonials,
    }));
    showAdminToast('Client reviews updated live!');
  };

  const resetSiteContent = () => {
    setSiteContent(INITIAL_WEBSITE_CONTENT);
    showAdminToast('Website content restored to initial luxury defaults.');
  };

  // ==========================================
  // COMPUTED METRICS & ANALYTICS
  // ==========================================
  const analytics = useMemo(() => {
    // Total Revenue from valid orders (non-cancelled)
    const validOrders = orders.filter((o) => o.status !== 'Cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalSalesCount = validOrders.reduce((sum, o) => {
      const itemsCount = (o.items || []).reduce((iSum, item) => iSum + (item.quantity || 1), 0);
      return sum + itemsCount;
    }, 0);

    const totalOrdersCount = orders.length;
    const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
    const completedOrdersCount = orders.filter((o) => o.status === 'Delivered').length;
    const processingOrdersCount = orders.filter(
      (o) => o.status === 'Processing' || o.status === 'Confirmed' || o.status === 'Shipped'
    ).length;
    const cancelledOrdersCount = orders.filter((o) => o.status === 'Cancelled').length;

    const totalCustomersCount = customers.length;
    const totalProductsCount = products.length;
    const lowStockProducts = products.filter((p) => (p.stock || 0) <= 8);
    const outOfStockProducts = products.filter((p) => (p.stock || 0) === 0);

    // Average Order Value (AOV)
    const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

    // Top selling products sorted by salesCount
    const bestSellingProducts = [...products]
      .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
      .slice(0, 5);

    // Order status breakdown for donut chart
    const statusBreakdown = [
      { name: 'Delivered', count: completedOrdersCount, color: '#287A4B' },
      { name: 'Shipped', count: orders.filter((o) => o.status === 'Shipped').length, color: '#C99A3B' },
      { name: 'Processing', count: orders.filter((o) => o.status === 'Processing').length, color: '#E2C27A' },
      { name: 'Confirmed', count: orders.filter((o) => o.status === 'Confirmed').length, color: '#9E7426' },
      { name: 'Pending', count: pendingOrdersCount, color: '#F29420' },
      { name: 'Cancelled', count: cancelledOrdersCount, color: '#B42318' },
    ];

    return {
      totalRevenue,
      totalSalesCount,
      totalOrdersCount,
      pendingOrdersCount,
      completedOrdersCount,
      processingOrdersCount,
      cancelledOrdersCount,
      totalCustomersCount,
      totalProductsCount,
      lowStockProducts,
      lowStockCount: lowStockProducts.length,
      outOfStockCount: outOfStockProducts.length,
      averageOrderValue,
      bestSellingProducts,
      statusBreakdown,
      validOrders,
    };
  }, [orders, products, customers]);

  return (
    <AdminDataContext.Provider
      value={{
        products,
        categories,
        orders,
        customers,
        coupons,
        siteContent,
        adminToast,
        showAdminToast,
        analytics,
        // Product Actions
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductFeatured,
        toggleProductBestseller,
        // Order Actions
        addOrder,
        updateOrderStatus,
        updatePaymentStatus,
        updateOrderNotes,
        deleteOrder,
        // Customer Actions
        addCustomer,
        updateCustomer,
        toggleCustomerStatus,
        deleteCustomer,
        // Category Actions
        addCategory,
        updateCategory,
        deleteCategory,
        // Coupon Actions
        addCoupon,
        updateCoupon,
        toggleCouponStatus,
        deleteCoupon,
        validateCoupon,
        // Content Actions
        updateSiteContent,
        updateTestimonials,
        resetSiteContent,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
