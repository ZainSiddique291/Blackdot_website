import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Default pre-seeded users for immediate testing and demonstration
const DEFAULT_PRE_SEEDED_USERS = [
  {
    id: 'usr_vip_demo',
    name: 'Zain VIP Member',
    email: 'vip@blackdot.pk',
    password: 'password123',
    provider: 'local',
    tier: 'Black Dot Privé Circle',
    avatar: null,
    createdAt: '2024-01-15T00:00:00.000Z',
    orders: [
      {
        orderNumber: 'BD-849120',
        date: '2024-10-18',
        items: [
          { name: 'Black Dot 7-in-1 Advanced Hair Shampoo (500ml)', quantity: 1, price: 2450 }
        ],
        total: 2450,
        status: 'Delivered',
        city: 'Lahore',
        paymentMethod: 'Cash on Delivery',
      }
    ],
  }
];

export function AuthProvider({ children }) {
  // Initialize registered users database from localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_users_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      localStorage.setItem('blackdot_users_db', JSON.stringify(DEFAULT_PRE_SEEDED_USERS));
      return DEFAULT_PRE_SEEDED_USERS;
    } catch {
      return DEFAULT_PRE_SEEDED_USERS;
    }
  });

  // Current authenticated user session
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('blackdot_auth_user');
      const savedToken = localStorage.getItem('blackdot_auth_token');
      if (savedUser && savedToken) {
        return JSON.parse(savedUser);
      }
      return null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('blackdot_auth_token') || null;
    } catch {
      return null;
    }
  });

  // Modal and redirect states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRedirectReason, setAuthRedirectReason] = useState(null); // 'checkout' | null
  const [authPromptMessage, setAuthPromptMessage] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authToast, setAuthToast] = useState(null);

  // Sync users database changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('blackdot_users_db', JSON.stringify(users));
    } catch (err) {
      console.warn('Failed to sync users database:', err);
    }
  }, [users]);

  // Sync active user to localStorage
  useEffect(() => {
    try {
      if (user && token) {
        localStorage.setItem('blackdot_auth_user', JSON.stringify(user));
        localStorage.setItem('blackdot_auth_token', token);
      } else {
        localStorage.removeItem('blackdot_auth_user');
        localStorage.removeItem('blackdot_auth_token');
      }
    } catch (err) {
      console.warn('Failed to sync auth session:', err);
    }
  }, [user, token]);

  // Auth Toast auto-dismiss
  useEffect(() => {
    if (authToast) {
      const timer = setTimeout(() => setAuthToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [authToast]);

  const showAuthToast = (msg) => {
    setAuthToast(msg);
  };

  /**
   * Open the luxury authentication modal
   * @param {Object} options
   * @param {'login'|'signup'} options.mode
   * @param {'checkout'|null} options.redirectAction
   * @param {string} options.message
   */
  const openAuthModal = ({ mode = 'login', redirectAction = null, message = '' } = {}) => {
    setAuthMode(mode);
    setAuthRedirectReason(redirectAction);
    setAuthPromptMessage(message);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthPromptMessage('');
    // Notice: we do not automatically wipe authRedirectReason here if user just toggled or if success will trigger
  };

  const clearAuthRedirect = () => {
    setAuthRedirectReason(null);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  /**
   * Log in with Email and Password
   */
  const login = async (email, password) => {
    const trimmedEmail = email?.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      return { success: false, error: 'Please enter both your email address and password.' };
    }

    const foundUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (!foundUser) {
      return {
        success: false,
        error: 'No account found with this email. Please check your credentials or create an account.',
      };
    }

    if (foundUser.provider === 'google' && !foundUser.password) {
      return {
        success: false,
        error: 'This account was created with Google. Please use "Continue with Google" to sign in.',
      };
    }

    if (foundUser.password !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please verify your password and try again.',
      };
    }

    const sessionToken = `bd_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const sessionUser = {
      ...foundUser,
      lastLogin: new Date().toISOString(),
    };

    // Update in users array
    setUsers((prev) => prev.map((u) => (u.id === foundUser.id ? sessionUser : u)));
    setUser(sessionUser);
    setToken(sessionToken);
    showAuthToast(`Welcome back, ${sessionUser.name}`);

    return { success: true, user: sessionUser };
  };

  /**
   * Register a new user with Name, Email, and Password
   */
  const signup = async (name, email, password) => {
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: 'Please enter your full name (at least 2 characters).' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      };
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: trimmedName,
      email: trimmedEmail,
      password: password,
      provider: 'local',
      tier: 'Black Dot Privé Circle',
      avatar: null,
      createdAt: new Date().toISOString(),
      orders: [],
    };

    const sessionToken = `bd_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    setUsers((prev) => [newUser, ...prev]);
    setUser(newUser);
    setToken(sessionToken);
    showAuthToast(`Welcome to Black Dot Privé, ${newUser.name}`);

    return { success: true, user: newUser };
  };

  /**
   * Sign In / Sign Up with Google profile
   */
  const loginWithGoogle = async ({ name, email, avatar, googleId }) => {
    const trimmedEmail = email?.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: 'Invalid Google account information.' };
    }

    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    const sessionToken = `bd_google_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    if (existingUser) {
      const updatedUser = {
        ...existingUser,
        name: existingUser.name || name || 'VIP Member',
        avatar: avatar || existingUser.avatar,
        googleId: googleId || existingUser.googleId,
        lastLogin: new Date().toISOString(),
      };

      setUsers((prev) => prev.map((u) => (u.id === existingUser.id ? updatedUser : u)));
      setUser(updatedUser);
      setToken(sessionToken);
      showAuthToast(`Signed in with Google as ${updatedUser.name}`);

      return { success: true, user: updatedUser };
    } else {
      const newUser = {
        id: `usr_g_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: name?.trim() || 'Google Member',
        email: trimmedEmail,
        password: null,
        provider: 'google',
        googleId: googleId || `gid_${Date.now()}`,
        avatar: avatar || null,
        tier: 'Black Dot Privé Circle',
        createdAt: new Date().toISOString(),
        orders: [],
      };

      setUsers((prev) => [newUser, ...prev]);
      setUser(newUser);
      setToken(sessionToken);
      showAuthToast(`Welcome to Black Dot Privé, ${newUser.name}`);

      return { success: true, user: newUser };
    }
  };

  /**
   * Log out current user session
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthRedirectReason(null);
    setIsProfileModalOpen(false);
    showAuthToast('Signed out of your VIP session.');
  };

  /**
   * Save a completed order to the authenticated user's account
   */
  const recordUserOrder = (orderData) => {
    if (!user) return;

    const formattedOrder = {
      orderNumber: orderData.orderNumber,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      items: orderData.items || [],
      total: orderData.total,
      status: 'Confirmed & Processing',
      city: orderData.customer?.city || 'Pakistan',
      address: orderData.customer?.address || '',
      paymentMethod: orderData.customer?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer',
    };

    const updatedUser = {
      ...user,
      orders: [formattedOrder, ...(user.orders || [])],
    };

    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    return formattedOrder;
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        registeredUsers: users,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        authRedirectReason,
        authPromptMessage,
        openAuthModal,
        closeAuthModal,
        clearAuthRedirect,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        login,
        signup,
        loginWithGoogle,
        logout,
        recordUserOrder,
        authToast,
        showAuthToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
