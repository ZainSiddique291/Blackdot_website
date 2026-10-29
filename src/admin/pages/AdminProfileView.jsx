import React, { useState } from 'react';
import {
  UserCheck,
  Shield,
  KeyRound,
  History,
  Save,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Mail,
  Phone,
  Clock,
  Trash2,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminData } from '../context/AdminDataContext';
import ConfirmModal from '../components/ConfirmModal';

export default function AdminProfileView({ onLogoutClick }) {
  const {
    adminUser,
    updateAdminProfile,
    changeAdminPassword,
    auditLogs,
    clearAuditLogs,
  } = useAdminAuth();

  const { showAdminToast } = useAdminData();

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || 'Black Dot Executive',
    email: adminUser?.email || 'admin@blackdot.pk',
    phone: adminUser?.phone || '+92 300 0000000',
  });

  // Password Form State
  const [pwdForm, setPwdForm] = useState({
    currentPwd: '',
    newPwd: '',
    confirmPwd: '',
  });
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');

  const [isConfirmClearLogs, setIsConfirmClearLogs] = useState(false);

  // Handle Profile Update
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateAdminProfile(profileForm);
    showAdminToast('Executive profile updated successfully.');
  };

  // Handle Password Change
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (pwdForm.newPwd !== pwdForm.confirmPwd) {
      setPwdError('New security keys do not match.');
      return;
    }

    const res = changeAdminPassword(pwdForm.currentPwd, pwdForm.newPwd);
    if (res.success) {
      setPwdSuccess('Security password updated successfully.');
      setPwdForm({ currentPwd: '', newPwd: '', confirmPwd: '' });
      showAdminToast('Security password modified.');
    } else {
      setPwdError(res.error || 'Failed to update security password.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white max-w-5xl">
      {/* 1. Header Toolbar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Black Dot Sovereign Identity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Executive Profile &amp; Security Controls
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Manage administrative credentials, security parameters, and inspection audit logs.
          </p>
        </div>

        <button
          onClick={onLogoutClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-600 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Profile Details Card */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <div className="flex items-center gap-4 pb-5 border-b border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-brand-gold font-bold text-xl shadow-lg">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">{adminUser?.name}</h3>
              <p className="text-xs text-brand-gold font-medium mt-0.5">
                {adminUser?.role || 'Super Administrator & Store Owner'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Last authenticated: {adminUser?.lastLogin || 'Today'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Executive Administrator Name
              </label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Primary Administrative Email
              </label>
              <input
                type="email"
                required
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Security Verification Phone
              </label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Details</span>
              </button>
            </div>
          </form>
        </div>

        {/* 3. Security Key & Password Modification Card */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <div className="flex items-center gap-3 pb-5 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Security Password &amp; Keys
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Update master administrative key for system access.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
            {pwdError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                {pwdError}
              </div>
            )}
            {pwdSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs">
                {pwdSuccess}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={pwdForm.currentPwd}
                onChange={(e) => setPwdForm({ ...pwdForm, currentPwd: e.target.value })}
                placeholder="Enter current master password"
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                New Security Password *
              </label>
              <input
                type="password"
                required
                value={pwdForm.newPwd}
                onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={pwdForm.confirmPwd}
                onChange={(e) => setPwdForm({ ...pwdForm, confirmPwd: e.target.value })}
                placeholder="Repeat new password"
                className="w-full bg-[#1A1A1A] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Update Master Key</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 4. Executive Security Audit Log */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 text-brand-gold flex items-center justify-center border border-white/10">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">
                Administrative Audit Trail
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Chronological log of executive actions, order transitions, and inventory updates.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsConfirmClearLogs(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log Trail</span>
          </button>
        </div>

        <div className="mt-4 divide-y divide-white/[0.05]">
          {auditLogs.length === 0 ? (
            <p className="py-6 text-center text-xs text-zinc-500">
              No recent audit trail entries logged.
            </p>
          ) : (
            auditLogs.slice(0, 15).map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-white block truncate">{log.action}</span>
                    <span className="text-[11px] text-zinc-400 block truncate">{log.details}</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-zinc-400 flex-shrink-0">
                  <span className="block font-medium text-zinc-300">{log.admin}</span>
                  <span>{log.date} {log.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Clear Logs Confirm */}
      <ConfirmModal
        isOpen={isConfirmClearLogs}
        onClose={() => setIsConfirmClearLogs(false)}
        onConfirm={clearAuditLogs}
        title="Clear Audit History"
        message="Are you sure you wish to wipe the administrative inspection trail? This log cannot be recovered."
        confirmText="Confirm Wipe"
      />
    </div>
  );
}
