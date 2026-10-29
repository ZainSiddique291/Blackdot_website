import React, { useState } from 'react';
import { TrendingUp, Calendar, ChevronRight } from 'lucide-react';

/**
 * 1. Revenue & Sales Trend Chart (Interactive SVG Area Chart)
 */
export function RevenueTrendChart({ orders = [] }) {
  const [timeRange, setTimeRange] = useState('7d'); // '7d' | '30d' | '12m'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Generate realistic dataset depending on timeRange
  const dataMap = {
    '7d': [
      { label: 'Oct 23', revenue: 14200, orders: 4 },
      { label: 'Oct 24', revenue: 18500, orders: 5 },
      { label: 'Oct 25', revenue: 16900, orders: 4 },
      { label: 'Oct 26', revenue: 24500, orders: 7 },
      { label: 'Oct 27', revenue: 21800, orders: 6 },
      { label: 'Oct 28', revenue: 32400, orders: 9 },
      { label: 'Oct 29', revenue: 38200, orders: 11 },
    ],
    '30d': [
      { label: 'Week 1', revenue: 98000, orders: 28 },
      { label: 'Week 2', revenue: 114000, orders: 34 },
      { label: 'Week 3', revenue: 135000, orders: 39 },
      { label: 'Week 4', revenue: 168000, orders: 48 },
    ],
    '12m': [
      { label: 'Nov', revenue: 180000, orders: 52 },
      { label: 'Dec', revenue: 290000, orders: 84 },
      { label: 'Jan', revenue: 210000, orders: 61 },
      { label: 'Feb', revenue: 240000, orders: 70 },
      { label: 'Mar', revenue: 310000, orders: 89 },
      { label: 'Apr', revenue: 360000, orders: 98 },
      { label: 'May', revenue: 390000, orders: 104 },
      { label: 'Jun', revenue: 420000, orders: 112 },
      { label: 'Jul', revenue: 440000, orders: 118 },
      { label: 'Aug', revenue: 480000, orders: 130 },
      { label: 'Sep', revenue: 510000, orders: 142 },
      { label: 'Oct', revenue: 585000, orders: 164 },
    ],
  };

  const currentData = dataMap[timeRange] || dataMap['7d'];
  const maxRevenue = Math.max(...currentData.map((d) => d.revenue), 10000);
  const totalPeriodRevenue = currentData.reduce((acc, d) => acc + d.revenue, 0);

  // SVG dimensions
  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  // Compute point coordinates
  const points = currentData.map((item, index) => {
    const x = paddingX + (index / (currentData.length - 1)) * innerWidth;
    const y = height - paddingY - (item.revenue / maxRevenue) * innerHeight;
    return { ...item, x, y };
  });

  // Construct SVG Path
  const linePath = points.reduce((acc, p, i) => {
    if (i === 0) return 'M ' + p.x + ',' + p.y;
    const prev = points[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (p.x - prev.x) / 2;
    const cp2y = p.y;
    return acc + ' C ' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + ' ' + p.x + ',' + p.y;
  }, '');

  const areaPath = linePath + ' L ' + points[points.length - 1].x + ',' + (height - paddingY) + ' L ' + points[0].x + ',' + (height - paddingY) + ' Z';

  return (
    <div className="bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
            <h3 className="text-base font-bold text-white tracking-wide font-heading">
              Sales &amp; Revenue Velocity
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Total period volume:{' '}
            <span className="text-brand-gold font-semibold">
              Rs. {totalPeriodRevenue.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Timeframe selector pills */}
        <div className="flex items-center bg-white/[0.05] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '12m', label: '12 Months' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeRange === tab.id
                  ? 'bg-brand-gold text-brand-black shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Visualization Canvas */}
      <div className="relative mt-4 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-56 select-none overflow-visible"
        >
          <defs>
            <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C99A3B" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#C99A3B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#C99A3B" stopOpacity="0.0" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#C99A3B" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
            const y = height - paddingY - r * innerHeight;
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray={i === 0 ? '0' : '4 4'}
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#71717A"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  {Math.round((r * maxRevenue) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Area under curve */}
          <path d={areaPath} fill="url(#goldAreaGrad)" />

          {/* The main bezier line */}
          <path
            d={linePath}
            fill="none"
            stroke="#C99A3B"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
          />

          {/* Points */}
          {points.map((p, index) => {
            const isHovered = hoveredPoint?.label === p.label;
            return (
              <g
                key={index}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Invisible hover target */}
                <circle cx={p.x} cy={p.y} r="14" fill="transparent" />

                {/* Point ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  fill="#0B0B0B"
                  stroke={isHovered ? '#FFFFFF' : '#C99A3B'}
                  strokeWidth={isHovered ? 2.5 : 2}
                  className="transition-all duration-200"
                />

                {/* X-axis Label */}
                <text
                  x={p.x}
                  y={height - 8}
                  textAnchor="middle"
                  fill={isHovered ? '#C99A3B' : '#A1A1AA'}
                  fontSize="10"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Popup */}
        {hoveredPoint && (
          <div
            className="absolute -top-3 pointer-events-none transform -translate-x-1/2 bg-brand-black/95 text-white border border-brand-gold/60 rounded-xl px-3 py-2 shadow-2xl backdrop-blur-md z-20 text-center animate-fadeIn"
            style={{
              left: ((hoveredPoint.x / width) * 100) + '%',
            }}
          >
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
              {hoveredPoint.label}
            </p>
            <p className="text-xs font-bold text-brand-gold mt-0.5">
              Rs. {hoveredPoint.revenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-zinc-400">
              {hoveredPoint.orders} orders fulfilled
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 2. Order Status Donut Chart (Segmented Ring Chart)
 */
export function OrderStatusDonutChart({ statusBreakdown = [], totalOrders = 0 }) {
  const [hoveredStatus, setHoveredStatus] = useState(null);

  const radius = 58;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const validStatuses = statusBreakdown.filter((s) => s.count > 0);
  const totalCount = validStatuses.reduce((acc, s) => acc + s.count, 0) || 1;

  let accumulatedOffset = 0;

  return (
    <div className="bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] border border-white/[0.08] rounded-2xl p-4 sm:p-5 xl:p-5 shadow-xl flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="pb-3 border-b border-white/[0.06] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white tracking-wide font-heading truncate">
            Fulfillment Distribution
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">Order pipeline statuses</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold flex-shrink-0">
          {totalOrders} Orders
        </span>
      </div>

      <div className="my-auto py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 xl:gap-5 w-full min-w-0">
        {/* SVG Donut */}
        <div className="relative w-32 h-32 sm:w-32 sm:h-32 xl:w-34 xl:h-34 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Segment arcs */}
            {validStatuses.map((item, idx) => {
              const strokeDasharray = (item.count / totalCount) * circumference;
              const strokeDashoffset = -accumulatedOffset;
              accumulatedOffset += strokeDasharray;

              const isHovered = hoveredStatus?.name === item.name;

              return (
                <circle
                  key={idx}
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray + ' ' + circumference}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredStatus(item)}
                  onMouseLeave={() => setHoveredStatus(null)}
                />
              );
            })}
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
            <span className="text-2xl font-bold text-white tracking-tight leading-none">
              {hoveredStatus ? hoveredStatus.count : totalOrders}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold max-w-[85px] truncate mt-1">
              {hoveredStatus ? hoveredStatus.name : 'Total Orders'}
            </span>
          </div>
        </div>

        {/* Legend List with Clean Tabular Column Alignment */}
        <div className="space-y-1 w-full flex-1 min-w-0">
          {validStatuses.map((item, idx) => {
            const percentage = Math.round((item.count / totalCount) * 100);
            const isHovered = hoveredStatus?.name === item.name;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredStatus(item)}
                onMouseLeave={() => setHoveredStatus(null)}
                className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-zinc-300 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {/* Status Indicator */}
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />

                {/* Status Label */}
                <span className="text-xs font-medium truncate pr-1">
                  {item.name}
                </span>

                {/* Order Count */}
                <span className="text-xs font-semibold text-zinc-100 font-mono text-right min-w-[1.25rem]">
                  {item.count}
                </span>

                {/* Percentage */}
                <span className="text-[11px] text-zinc-400 font-mono text-right min-w-[2.5rem]">
                  ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Category Sales Share Bar
 */
export function CategorySalesBarChart({ categories = [], products = [] }) {
  // Aggregate sales by category
  const categoryStats = categories
    .filter((c) => c.id !== 'all')
    .map((cat) => {
      const catProducts = products.filter((p) => p.category === cat.id);
      const totalSales = catProducts.reduce((sum, p) => sum + (p.salesCount || 0), 0);
      const totalRevenue = catProducts.reduce(
        (sum, p) => sum + (p.salesCount || 0) * (p.price || 0),
        0
      );
      return {
        id: cat.id,
        name: cat.name,
        productsCount: catProducts.length,
        totalSales,
        totalRevenue,
      };
    })
    .sort((a, b) => b.totalRevenue - a.totalRevenue);

  const highestRevenue = Math.max(...categoryStats.map((c) => c.totalRevenue), 1);

  return (
    <div className="bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="pb-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-wide font-heading">
            Category Revenue Yield
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Performance by formulation family</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {categoryStats.map((cat) => {
          const percentage = Math.round((cat.totalRevenue / highestRevenue) * 100);
          return (
            <div key={cat.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-200">{cat.name}</span>
                <span className="text-brand-gold font-bold">
                  Rs. {cat.totalRevenue.toLocaleString()}{' '}
                  <span className="text-[10px] text-zinc-400 font-normal">
                    ({cat.totalSales} sold)
                  </span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light transition-all duration-700"
                  style={{ width: percentage + '%' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
