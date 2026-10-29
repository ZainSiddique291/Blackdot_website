import React from 'react';
import { Bell, Package, AlertTriangle, Tag, CheckCircle2, X } from 'lucide-react';

export default function NotificationDrawer({
  isOpen,
  onClose,
  orders = [],
  lowStockProducts = [],
  onNavigateOrder,
  onNavigateProduct,
}) {
  if (!isOpen) return null;

  // Build real-time alert items
  const recentOrders = orders.slice(0, 4).map((o) => ({
    id: 'order-' + o.id,
    type: 'order',
    title: 'New VIP Order ' + (o.orderNumber || o.id),
    subtitle: o.customer?.fullName + ' • Rs. ' + (o.total || 0).toLocaleString(),
    time: o.date + ' ' + (o.time || ''),
    status: o.status,
    raw: o,
  }));

  const stockAlerts = lowStockProducts.slice(0, 4).map((p) => ({
    id: 'stock-' + p.id,
    type: 'stock',
    title: 'Low Stock: ' + p.name,
    subtitle: 'Only ' + p.stock + ' units remaining in inventory',
    time: 'Immediate attention required',
    status: 'Critically Low',
    raw: p,
  }));

  const allAlerts = [...stockAlerts, ...recentOrders];

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-brand-black/95 border border-brand-gold/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl p-4 z-50 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-gold" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Operational Alerts ({allAlerts.length})
          </h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Alert List */}
      <div className="mt-3 max-h-80 overflow-y-auto space-y-2 pr-1">
        {allAlerts.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 text-xs">
            No active operational warnings. All systems optimal.
          </div>
        ) : (
          allAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (alert.type === 'order' && onNavigateOrder) {
                  onNavigateOrder(alert.raw.id);
                  onClose();
                } else if (alert.type === 'stock' && onNavigateProduct) {
                  onNavigateProduct(alert.raw.id);
                  onClose();
                }
              }}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] hover:border-brand-gold/40 transition-all cursor-pointer group flex items-start gap-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  alert.type === 'stock'
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                }`}
              >
                {alert.type === 'stock' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Package className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-white group-hover:text-brand-gold truncate">
                    {alert.title}
                  </p>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                      alert.type === 'stock'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-brand-gold/20 text-brand-gold'
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 truncate mt-0.5">{alert.subtitle}</p>
                <p className="text-[10px] text-zinc-400 mt-1">{alert.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
