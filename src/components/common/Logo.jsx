import React from 'react';

export default function Logo({
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = true,
  displayType = 'standard', // 'standard' (emblem + text), 'emblemOnly', 'officialImage'
}) {
  const isDark = variant === 'dark';

  const emblemSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  }[size] || 'w-10 h-10';

  const titleSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl md:text-2xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  }[size] || 'text-xl';

  const subtitleSize = {
    sm: 'text-[7.5px] sm:text-[8px]',
    md: 'text-[8.5px] sm:text-[9.5px]',
    lg: 'text-[9px] sm:text-[9.5px]',
    xl: 'text-xs',
  }[size] || 'text-[9px]';

  if (displayType === 'officialImage') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/images/blackdot_official_logo_transparent.png"
          alt="Black Dot - One Dot Infinite Vision"
          className="h-auto max-h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Circular BD 3D Emblem with luxury protection badge */}
      <div
        className={`relative ${emblemSize} flex-shrink-0 rounded-full transition-transform duration-300 hover:scale-105 flex items-center justify-center ${
          isDark
            ? 'bg-white/95 p-[3px] shadow-[0_2px_10px_rgba(201,154,59,0.25)] border border-brand-gold/40'
            : 'bg-transparent p-0'
        }`}
      >
        <img
          src="/images/blackdot_official_emblem.png"
          alt="Black Dot Official Emblem"
          className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Brand Name & Tagline */}
      {displayType !== 'emblemOnly' && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-heading font-bold tracking-tight ${titleSize} ${
              isDark ? 'text-white' : 'text-brand-black'
            }`}
          >
            Black Dot
          </span>
          {showTagline && (
            <span
              className={`font-body uppercase tracking-[0.24em] font-semibold mt-1 flex items-center gap-1.5 ${
                isDark ? 'text-brand-gold' : 'text-brand-gold-dark'
              } ${subtitleSize}`}
            >
              <span>ONE DOT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F29420] inline-block shadow-[0_0_6px_rgba(242,148,32,0.5)]" />
              <span>INFINITE VISION</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
