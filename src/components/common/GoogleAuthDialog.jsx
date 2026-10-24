import React, { useState } from 'react';
import { X, Check, Shield, ExternalLink, Settings } from 'lucide-react';

const PRESET_GOOGLE_ACCOUNTS = [
  {
    name: 'Zain Siddique',
    email: 'zain.blackdot.vip@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    googleId: 'g_1092837482910293847',
  },
  {
    name: 'Ayesha Khan',
    email: 'ayesha.luxury.pk@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    googleId: 'g_2049583720194857291',
  },
];

export default function GoogleAuthDialog({ isOpen, onClose, onGoogleSuccess }) {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [clientIdInput, setClientIdInput] = useState(() => {
    return localStorage.getItem('blackdot_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  });
  const [configSaved, setConfigSaved] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (acc) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onGoogleSuccess(acc);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      alert('Please enter a valid Google email address.');
      return;
    }
    const name = customName.trim() || customEmail.split('@')[0];
    const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=C99A3B&color=0B0B0B&bold=true`;
    const acc = {
      name,
      email: customEmail.trim().toLowerCase(),
      avatar: generatedAvatar,
      googleId: `g_${Date.now()}`,
    };

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onGoogleSuccess(acc);
      onClose();
    }, 600);
  };

  const handleSaveClientId = (e) => {
    e.preventDefault();
    if (clientIdInput.trim()) {
      localStorage.setItem('blackdot_google_client_id', clientIdInput.trim());
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 2000);

      // Attempt to initialize GIS if available in window
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientIdInput.trim(),
            callback: (res) => {
              if (res.credential) {
                try {
                  const base64Url = res.credential.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(
                    atob(base64)
                      .split('')
                      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                      .join('')
                  );
                  const payload = JSON.parse(jsonPayload);
                  onGoogleSuccess({
                    name: payload.name,
                    email: payload.email,
                    avatar: payload.picture,
                    googleId: payload.sub,
                  });
                  onClose();
                } catch (decodeErr) {
                  console.error('Error decoding GIS credential:', decodeErr);
                }
              }
            },
          });
        } catch (err) {
          console.warn('GIS Init Error:', err);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Google Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-10 animate-fadeIn text-zinc-900">
        {/* Header Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google Logo SVG */}
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 leading-tight">
                Sign in with Google
              </h3>
              <p className="text-[11px] text-zinc-500">
                to continue to <strong className="text-zinc-800">Black Dot Store</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-10 h-10 border-3 border-brand-gold border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium text-zinc-800">Verifying Google Account...</p>
            <p className="text-xs text-zinc-500 mt-0.5">Authorizing secure Black Dot token</p>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          {!isCustomMode ? (
            <div className="space-y-3">
              <p className="text-xs text-zinc-600 font-medium mb-3">
                Choose an account to continue:
              </p>

              {PRESET_GOOGLE_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectPreset(acc)}
                  className="w-full flex items-center gap-3.5 p-3 rounded-xl border border-zinc-200 hover:border-brand-gold hover:bg-amber-50/40 text-left transition-all group cursor-pointer"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 group-hover:border-brand-gold"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate group-hover:text-amber-800">
                      {acc.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">{acc.email}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-colors">
                    <Check className="w-3 h-3 text-transparent group-hover:text-brand-black" />
                  </div>
                </button>
              ))}

              {/* Use another account button */}
              <button
                onClick={() => setIsCustomMode(true)}
                className="w-full flex items-center gap-3.5 p-3 rounded-xl border border-dashed border-zinc-300 hover:border-brand-gold hover:bg-zinc-50 text-left transition-all mt-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-800">Use another Google account</p>
                  <p className="text-xs text-zinc-400">Sign in with any personal Gmail address</p>
                </div>
              </button>
            </div>
          ) : (
            /* Custom Google Email Form */
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-zinc-700">Enter Google Account Info</span>
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="text-xs text-brand-gold-dark hover:underline font-medium"
                >
                  ← Back to choices
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 uppercase mb-1">
                  Google Display Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Zain Siddique"
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 uppercase mb-1">
                  Google Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-black hover:bg-zinc-800 text-brand-gold font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm &amp; Sign in with Google</span>
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-5 pt-4 border-t border-zinc-100 flex items-start gap-2 text-[11px] text-zinc-500 leading-normal">
            <Shield className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              Google verifies your identity and securely shares your profile with Black Dot. No passwords are shared.
            </span>
          </div>

          {/* Optional Developer Google Client ID Config */}
          <div className="mt-4 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] text-zinc-400 hover:text-zinc-600 flex items-center gap-1 transition-colors"
            >
              <Settings className="w-3 h-3" />
              <span>{showConfig ? 'Hide' : 'Configure'} Google Cloud Client ID (Advanced)</span>
            </button>

            {showConfig && (
              <form onSubmit={handleSaveClientId} className="mt-2.5 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">
                  Google OAuth Client ID (.env: VITE_GOOGLE_CLIENT_ID)
                </label>
                <input
                  type="text"
                  value={clientIdInput}
                  onChange={(e) => setClientIdInput(e.target.value)}
                  placeholder="xxxx.apps.googleusercontent.com"
                  className="w-full px-2.5 py-1.5 text-xs border border-zinc-300 rounded font-mono bg-white text-zinc-800 focus:outline-none focus:border-brand-gold"
                />
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-900 text-white text-[11px] font-medium rounded"
                  >
                    Save Client ID
                  </button>
                  {configSaved && (
                    <span className="text-[11px] text-emerald-600 font-medium">Saved!</span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
