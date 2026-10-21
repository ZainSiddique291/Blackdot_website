import React from 'react';

export default function Logo({
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = true,
}) {
  const isDark = variant === 'dark'; // Dark navbar/footer: white text
  
  const emblemSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size] || 'w-10 h-10';

  const titleSize = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  }[size] || 'text-xl';

  const subtitleSize = {
    sm: 'text-[8px]',
    md: 'text-[9px] md:text-[10px]',
    lg: 'text-xs',
  }[size] || 'text-[9px]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Gold Circular BD Emblem */}
      <div className={`relative ${emblemSize} flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(201,154,59,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2C27A" />
              <stop offset="50%" stopColor="#C99A3B" />
              <stop offset="100%" stopColor="#9E7426" />
            </linearGradient>
            <linearGradient id="goldGradientLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F3E8D0" />
              <stop offset="50%" stopColor="#C99A3B" />
              <stop offset="100%" stopColor="#805B17" />
            </linearGradient>
          </defs>

          {/* Outer circle with gold border */}
          <circle cx="50" cy="50" r="47" stroke="url(#goldGradient)" strokeWidth="3" fill="#0B0B0B" />
          {/* Inner accent ring */}
          <circle cx="50" cy="50" r="41" stroke="url(#goldGradientLight)" strokeWidth="1" strokeDasharray="3 2" />
          
          {/* BD Monogram Typography */}
          <text
            x="50"
            y="61"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="40"
            fontWeight="bold"
            letterSpacing="-1"
            fill="url(#goldGradient)"
            textAnchor="middle"
          >
            BD
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-heading font-semibold tracking-wide ${titleSize} ${
            isDark ? 'text-white' : 'text-brand-black'
          }`}
        >
          Black Dot
        </span>
        {showTagline && (
          <span
            className={`font-body uppercase tracking-[0.25em] font-medium mt-1 text-brand-gold ${subtitleSize}`}
          >
            ONE DOT · INFINITE VISION
          </span>
        )}
      </div>
    </div>
  );
}
