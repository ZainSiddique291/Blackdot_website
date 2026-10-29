import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Destructive Action',
  message = 'Are you sure you wish to proceed? This change cannot be undone.',
  confirmText = 'Confirm & Delete',
  cancelText = 'Cancel',
  isDanger = true,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1A1A1A] to-[#111111] border border-white/10 rounded-2xl shadow-2xl p-6 z-10 animate-fadeIn text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDanger
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                : 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white font-heading">{title}</h3>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/40'
                : 'bg-brand-gold hover:bg-brand-gold-dark text-brand-black shadow-gold-glow'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
