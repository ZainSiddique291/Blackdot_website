import React, { useState } from 'react';
import {
  Banknote,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Users,
  Package,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Eye,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { RevenueTrendChart, OrderStatusDonutChart } from '../components/Charts';
import { useAdminData } from '../context/AdminDataContext';

export default function DashboardView({ onNavigateTab, onSelectOrder }) {
  const { analytics, orders, products, customers } = useAdminData();
  const [dateRange, setDateRange] = useState('30d');

  const {
    totalRevenue,
    totalSalesCount,
    totalOrdersCount,
    pendingOrdersCount,
    completedOrdersCount,
    totalCustomersCount,
    totalProductsCount,
    lowStockCount,
    lowStockProducts,
    bestSellingProducts,
    statusBreakdown,
  } = analytics;

  // Status badge helper
  const getStatusBadge = (status) => {
    const config = {
      Delivered: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      Shipped: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
      Processing: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      Confirmed: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      Pending: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
      Cancelled: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    }[status] || 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30';

    return (
      <span className={'px-2 py-0.5 rounded-full text-[10px] font-semibold border ' + config}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      {/* 1. Executive Welcome & Quick Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-brand-gold/20 shadow-xl relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
            <span>Black Dot Sovereign Commerce</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Executive Performance Overview
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time telemetry across nationwide flagship boutique operations.
          </p>
        </div>

        {/* Date Filter selector */}
        <div className="flex items-center gap-2 bg-white/[0.05] p-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-brand-gold ml-1.5" />
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: '7D' },
            { id: '30d', label: '30D' },
            { id: 'all', label: 'All Time' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={'px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ' +
                (dateRange === range.id
                  ? 'bg-brand-gold text-brand-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white')}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Critical Low-Stock Warning Banner (If Any) */}
      {lowStockCount > 0 && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-500/40 shadow-lg text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300">
                Inventory Replenishment Notice: {lowStockCount} Product(s) Below Threshold
              </p>
              <p className="text-[11px] text-zinc-300 mt-0.5">
                Items including{' '}
                <span className="text-white font-semibold">
                  {lowStockProducts.map((p) => p.name.split('(')[0].trim()).slice(0, 2).join(', ')}
                </span>{' '}
                have low stock levels and require batch restocking.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('products')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all cursor-pointer flex-shrink-0"
          >
            <span>Manage Stock</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. The 8 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Total Sales */}
        <StatCard
          title="Total Units Sold"
          value={totalSalesCount}
          suffix="items"
          icon={ShoppingBag}
          trend={{ value: 16.8, positive: true, label: 'vs last cycle' }}
          subtitle="Customer items dispatched"
        />

        {/* 2. Total Revenue */}
        <StatCard
          title="Gross Revenue"
          value={totalRevenue}
          prefix="Rs. "
          icon={Banknote}
          trend={{ value: 21.4, positive: true, label: 'vs last cycle' }}
          subtitle="Net verified earnings"
        />

        {/* 3. Total Orders */}
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          icon={TrendingUp}
          trend={{ value: 12.5, positive: true, label: 'vs last cycle' }}
          onClick={() => onNavigateTab('orders')}
          subtitle="Across Pakistan"
        />

        {/* 4. Pending Orders */}
        <StatCard
          title="Pending Orders"
          value={pendingOrdersCount}
          icon={Clock}
          badge={pendingOrdersCount > 0 ? 'Requires Action' : 'Cleared'}
          onClick={() => onNavigateTab('orders')}
          subtitle="Awaiting dispatch or COD"
        />

        {/* 5. Completed Orders */}
        <StatCard
          title="Completed Orders"
          value={completedOrdersCount}
          icon={CheckCircle2}
          trend={{ value: 9.2, positive: true, label: 'success rate' }}
          onClick={() => onNavigateTab('orders')}
          subtitle="Delivered to clientele"
        />

        {/* 6. Registered Customers */}
        <StatCard
          title="Registered Clients"
          value={totalCustomersCount}
          icon={Users}
          trend={{ value: 14.0, positive: true, label: 'VIP growth' }}
          onClick={() => onNavigateTab('customers')}
          subtitle="PrivAc Circle members"
        />

        {/* 7. Total Products */}
        <StatCard
          title="Active Formulations"
          value={totalProductsCount}
          icon={Package}
          onClick={() => onNavigateTab('products')}
          subtitle="In boutique catalog"
        />

        {/* 8. Low-Stock Products */}
        <StatCard
          title="Low Stock Warning"
          value={lowStockCount}
          icon={AlertTriangle}
          isAlert={lowStockCount > 0}
          badge={lowStockCount > 0 ? 'Critical' : 'Healthy'}
          onClick={() => onNavigateTab('products')}
          subtitle="Threshold: <= 8 units"
        />
      </div>

      {/* 4. Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left: Revenue Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 min-w-0">
          <RevenueTrendChart orders={orders} />
        </div>

        {/* Right: Order Status Donut Chart (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 min-w-0">
          <OrderStatusDonutChart
            statusBreakdown={statusBreakdown}
            totalOrders={totalOrdersCount}
          />
        </div>
      </div>

      {/* 5. Recent Orders Table & Best Sellers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 min-w-0 bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-bold text-white tracking-wide font-heading">
                Recent Client Orders
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">Latest boutique transactions</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="flex items-center gap-1 text-xs font-semibold text-brand-gold hover:text-white transition-colors cursor-pointer"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-400 border-b border-white/[0.06] text-[11px] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Destination</th>
                  <th className="pb-3 font-semibold">Total (PKR)</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3 font-mono font-bold text-brand-gold">
                      {order.orderNumber || order.id}
                    </td>
                    <td className="py-3 font-medium text-white truncate max-w-[140px]">
                      {order.customer?.fullName || 'VIP Client'}
                    </td>
                    <td className="py-3 text-zinc-400">
                      {order.customer?.city || 'Pakistan'}
                    </td>
                    <td className="py-3 font-semibold text-zinc-200">
                      Rs. {(order.total || 0).toLocaleString()}
                    </td>
                    <td className="py-3">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          if (onSelectOrder) onSelectOrder(order);
                          onNavigateTab('orders');
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-zinc-300 transition-colors cursor-pointer"
                        title="Inspect Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Formulations (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 min-w-0 bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide font-heading">
                  Flagship Bestsellers
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Top performing items by volume</p>
              </div>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs text-brand-gold hover:underline"
              >
                Catalog
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {bestSellingProducts.map((prod, index) => (
                <div
                  key={prod.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.04] transition-all group"
                >
                  <span className="w-5 text-center font-bold text-xs text-brand-gold/70 group-hover:text-brand-gold">
                    #{index + 1}
                  </span>

                  <img
                    src={prod.image || '/images/hero_stage.png'}
                    alt={prod.name}
                    className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate group-hover:text-brand-gold transition-colors">
                      {prod.name}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-400">
                      <span>Rs. {prod.price.toLocaleString()}</span>
                      <span className="text-brand-gold font-bold">
                        {prod.salesCount} sold
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
            <span>Overall Inventory Health</span>
            <span className="text-emerald-400 font-semibold">96.4% Optimum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
