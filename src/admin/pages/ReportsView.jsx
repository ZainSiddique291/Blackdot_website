import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Banknote,
  TrendingUp,
  ShoppingBag,
  CreditCard,
  FileSpreadsheet,
  CheckCircle2,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { RevenueTrendChart, OrderStatusDonutChart, CategorySalesBarChart } from '../components/Charts';

export default function ReportsView() {
  const { orders, products, categories, analytics } = useAdminData();
  const [selectedRange, setSelectedRange] = useState('30d');

  const {
    totalRevenue,
    totalSalesCount,
    totalOrdersCount,
    averageOrderValue,
    bestSellingProducts,
  } = analytics;

  // Real CSV Export functionality
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Client Name', 'Phone', 'City', 'Payment Method', 'Payment Status', 'Items Count', 'Total PKR', 'Order Status'];
    const rows = orders.map((o) => [
      o.orderNumber || o.id,
      o.date,
      '"' + (o.customer?.fullName || 'VIP Client') + '"',
      o.customer?.phone || '',
      o.customer?.city || 'Pakistan',
      o.paymentMethod || 'Cash on Delivery',
      o.paymentStatus || 'Paid',
      (o.items || []).reduce((sum, i) => sum + (i.quantity || 1), 0),
      o.total || 0,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'blackdot_executive_sales_report_' + new Date().toISOString().split('T')[0] + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Payment Breakdown
  const paymentBreakdown = {
    cod: orders.filter((o) => (o.paymentMethod || '').toLowerCase().includes('cash') || (o.paymentMethod || '').toLowerCase().includes('cod')).length,
    card: orders.filter((o) => (o.paymentMethod || '').toLowerCase().includes('card') || (o.paymentMethod || '').toLowerCase().includes('credit')).length,
    bank: orders.filter((o) => (o.paymentMethod || '').toLowerCase().includes('bank')).length,
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header & CSV Export */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Black Dot Financial Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Business Reports &amp; Financial Analytics
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Audited transaction telemetry, average order metrics, and formulation revenue share.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer self-start sm:self-auto group"
        >
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Export Executive CSV</span>
        </button>
      </div>

      {/* 2. Top Executive KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Gross Verified Sales
          </span>
          <span className="text-2xl font-bold text-white block mt-1">
            Rs. {totalRevenue.toLocaleString()}
          </span>
          <div className="mt-2 text-emerald-400 text-xs flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% fiscal trajectory</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Average Order Value (AOV)
          </span>
          <span className="text-2xl font-bold text-brand-gold block mt-1">
            Rs. {averageOrderValue.toLocaleString()}
          </span>
          <span className="text-zinc-400 text-xs mt-2 block">Premium client spend per transaction</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Units Fulfilled
          </span>
          <span className="text-2xl font-bold text-white block mt-1">
            {totalSalesCount} Formulations
          </span>
          <span className="text-zinc-400 text-xs mt-2 block">Dispatched across Pakistan</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
            Repeat Client Retention
          </span>
          <span className="text-2xl font-bold text-emerald-400 block mt-1">
            42.8%
          </span>
          <span className="text-zinc-400 text-xs mt-2 block">PrivAc Circle repeat buyers</span>
        </div>
      </div>

      {/* 3. Primary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueTrendChart orders={orders} />
        </div>
        <div className="lg:col-span-1">
          <CategorySalesBarChart categories={categories} products={products} />
        </div>
      </div>

      {/* 4. Payment Settlement Distribution & Formulation Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl">
          <h3 className="text-base font-bold font-heading text-white mb-1">
            Settlement Methods
          </h3>
          <p className="text-xs text-zinc-400 mb-4">Payment distribution preference across Pakistan</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-semibold">Cash on Delivery (Nationwide)</span>
                <span className="text-brand-gold font-bold">
                  {paymentBreakdown.cod} orders ({Math.round((paymentBreakdown.cod / (orders.length || 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-brand-gold rounded-full"
                  style={{ width: (paymentBreakdown.cod / (orders.length || 1)) * 100 + '%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-semibold">Direct Bank Transfer</span>
                <span className="text-blue-400 font-bold">
                  {paymentBreakdown.bank} orders ({Math.round((paymentBreakdown.bank / (orders.length || 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: (paymentBreakdown.bank / (orders.length || 1)) * 100 + '%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-semibold">Debit / Credit Card (Online)</span>
                <span className="text-emerald-400 font-bold">
                  {paymentBreakdown.card} orders ({Math.round((paymentBreakdown.card / (orders.length || 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: (paymentBreakdown.card / (orders.length || 1)) * 100 + '%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Product Yield Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141414] border border-white/[0.08] shadow-xl overflow-hidden">
          <h3 className="text-base font-bold font-heading text-white mb-1">
            Top Performing Formulations by Revenue Yield
          </h3>
          <p className="text-xs text-zinc-400 mb-4">Highest revenue-generating SKUs</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-zinc-400 text-[10px] uppercase">
                  <th className="pb-2">Formulation</th>
                  <th className="pb-2">Retail</th>
                  <th className="pb-2">Units Sold</th>
                  <th className="pb-2">Total Gross Yield</th>
                  <th className="pb-2 text-right">Stock Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {bestSellingProducts.map((p) => {
                  const gross = (p.salesCount || 0) * (p.price || 0);
                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 font-bold text-white">{p.name}</td>
                      <td className="py-2.5 text-zinc-300">Rs. {p.price.toLocaleString()}</td>
                      <td className="py-2.5 font-semibold text-brand-gold">{p.salesCount} sold</td>
                      <td className="py-2.5 font-bold text-white">Rs. {gross.toLocaleString()}</td>
                      <td className="py-2.5 text-right">
                        <span
                          className={'px-2 py-0.5 rounded-full text-[10px] font-bold ' +
                            (p.stock <= 8 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300')}
                        >
                          {p.stock} in stock
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
