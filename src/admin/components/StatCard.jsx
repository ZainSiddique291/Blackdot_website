import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  trend = null, // { value: 14.2, positive: true, label: 'vs last month' }
  subtitle = '',
  onClick = null,
  badge = null,
  isAlert = false,
}) {
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth numerical counter animation
  useEffect(() => {
    const numericTarget = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;
    
    if (numericTarget === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeProgress * numericTarget);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value]);

  const formattedDisplay = displayValue.toLocaleString();

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300 group ${
        onClick ? 'cursor-pointer' : ''
      } ${
        isAlert
          ? 'bg-gradient-to-b from-rose-950/30 to-[#141414] border border-rose-500/30 hover:border-rose-500/50 shadow-[0_4px_24px_rgba(180,35,24,0.15)]'
          : 'bg-gradient-to-b from-[#181818] via-[#141414] to-[#0E0E0E] border border-white/[0.08] hover:border-brand-gold/40 shadow-xl hover:shadow-[0_8px_30px_rgba(201,154,59,0.12)]'
      }`}
    >
      {/* Ambient background gold sheen on hover */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-gold/15 transition-all duration-500 pointer-events-none" />

      {/* Top Header: Title & Icon */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 group-hover:text-zinc-200 transition-colors">
          {title}
        </span>

        {Icon && (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              isAlert
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/25 shadow-[0_0_15px_rgba(201,154,59,0.1)]'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Metric Main Value */}
      <div className="flex items-baseline gap-1 my-1">
        {prefix && (
          <span className="text-sm sm:text-base font-semibold text-brand-gold/90 mr-0.5">
            {prefix}
          </span>
        )}
        <span
          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isAlert ? 'text-rose-400' : 'text-white'
          }`}
        >
          {formattedDisplay}
        </span>
        {suffix && (
          <span className="text-xs text-zinc-400 font-medium ml-1">
            {suffix}
          </span>
        )}
      </div>

      {/* Footer: Trend, Badge or Context */}
      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/[0.05]">
        {trend ? (
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                trend.positive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}
            >
              {trend.positive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {trend.value}%
            </span>
            <span className="text-zinc-400 text-[11px] truncate">{trend.label || 'vs last cycle'}</span>
          </div>
        ) : (
          <span className="text-zinc-400 text-[11px] truncate">
            {subtitle || 'Real-time verified data'}
          </span>
        )}

        {badge && (
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
