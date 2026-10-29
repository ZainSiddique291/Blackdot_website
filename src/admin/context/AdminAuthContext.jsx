import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ADMIN_PROFILE } from '../data/initialAdminData';

const AdminAuthContext = createContext();

const DEFAULT_ADMIN_PASSWORD = 'blackdot2026';

const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    action: 'Order Dispatched',
    details: 'Order BD-849121 marked as Shipped via TCS Air Express',
    admin: 'Black Dot Executive',
    timestamp: '2026-10-29T17:30:00.000Z',
    date: '2026-10-29',
    time: '17:30',
  },
  {
    id: 'log-2',
    action: 'Inventory Replenished',
    details: 'Added +20 units stock for 7-in-1 Advanced Shampoo 500ml',
    admin: 'Black Dot Executive',
    timestamp: '2026-10-29T14:15:00.000Z',
    date: '2026-10-29',
    time: '14:15',
  },
  {
    id: 'log-3',
    action: 'Promotion Activated',
    details: 'Coupon LUXURY20 (20% off) activated for VIP Tier',
    admin: 'Black Dot Executive',
    timestamp: '2026-10-28T20:00:00.000Z',
    date: '2026-10-28',
    time: '20:00',
  },
  {
    id: 'log-4',
    action: 'Content Published',
    details: 'Updated Announcement Bar text for nationwide free shipping threshold',
    admin: 'Black Dot Executive',
    timestamp: '2026-10-28T11:40:00.000Z',
    date: '2026-10-28',
    time: '11:40',
  },
];

export function AdminAuthProvider({ children }) {
  // Current admin session
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin password stored securely in localStorage
  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      return localStorage.getItem('blackdot_admin_pwd') || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  });

  // Admin Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('blackdot_admin_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem('blackdot_admin_session', JSON.stringify(adminUser));
      } else {
        localStorage.removeItem('blackdot_admin_session');
      }
    } catch (e) {
      console.warn('Failed to sync admin session:', e);
    }
  }, [adminUser]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_admin_pwd', adminPassword);
    } catch (e) {
      console.warn('Failed to sync admin password:', e);
    }
  }, [adminPassword]);

  useEffect(() => {
    try {
      localStorage.setItem('blackdot_admin_logs', JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed to sync audit logs:', e);
    }
  }, [auditLogs]);

  const recordAuditLog = (action, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      action,
      details,
      admin: adminUser?.name || 'Administrator',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]); // keep last 50
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
  };

  /**
   * Authenticate admin
   */
  const loginAdmin = async (email, password) => {
    const trimmedEmail = email?.trim().toLowerCase();
    const storedEmail = (INITIAL_ADMIN_PROFILE.email || 'admin@blackdot.pk').toLowerCase();

    if (!trimmedEmail || !password) {
      return { success: false, error: 'Please enter both your executive email and security key.' };
    }

    // Match admin credentials
    if (
      (trimmedEmail === storedEmail || trimmedEmail === 'admin@blackdot.pk') &&
      password === adminPassword
    ) {
      const sessionUser = {
        ...INITIAL_ADMIN_PROFILE,
        email: trimmedEmail,
        lastLogin: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setAdminUser(sessionUser);
      recordAuditLog('Executive Login', 'Signed in to Black Dot Administration Panel');
      return { success: true, user: sessionUser };
    }

    return {
      success: false,
      error: 'Invalid administrative credentials. Use admin@blackdot.pk with the official executive key.',
    };
  };

  /**
   * Log out admin
   */
  const logoutAdmin = () => {
    recordAuditLog('Executive Logout', 'Logged out of Black Dot Administration Panel');
    setAdminUser(null);
  };

  /**
   * Update Profile details
   */
  const updateAdminProfile = ({ name, email, phone }) => {
    if (!adminUser) return;
    const updated = {
      ...adminUser,
      name: name?.trim() || adminUser.name,
      email: email?.trim().toLowerCase() || adminUser.email,
      phone: phone?.trim() || adminUser.phone,
    };
    setAdminUser(updated);
    recordAuditLog('Profile Updated', `Updated administrator details to ${updated.name} (${updated.email})`);
    return updated;
  };

  /**
   * Change admin password
   */
  const changeAdminPassword = (currentPwd, newPwd) => {
    if (currentPwd !== adminPassword) {
      return { success: false, error: 'Current security password is incorrect.' };
    }
    if (!newPwd || newPwd.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    setAdminPassword(newPwd);
    recordAuditLog('Security Key Changed', 'Administrator security password was modified');
    return { success: true };
  };

  const isAdminAuthenticated = Boolean(adminUser);

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateAdminProfile,
        changeAdminPassword,
        auditLogs,
        recordAuditLog,
        clearAuditLogs,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
