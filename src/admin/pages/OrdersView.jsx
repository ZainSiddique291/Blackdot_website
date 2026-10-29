import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  X,
  Printer,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  ShieldCheck,
  FileText,
  Save,
  ArrowRight,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function OrdersView({ selectedOrderInitial = null }) {
  const { orders, updateOrderStatus, updatePaymentStatus, updateOrderNotes } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState(selectedOrderInitial);
  const [isInvoiceView, setIsInvoiceView] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');

  // Synchronize when an order is opened
  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setInternalNotes(order.notes || '');
    setIsInvoiceView(false);
  };

  const handleCloseOrder = () => {
    setSelectedOrder(null);
    setIsInvoiceView(false);
  };

  // Status transitions
  const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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
      <span className={'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ' + config}>
        {status}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const config = {
      Paid: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      Pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      Refunded: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    }[status] || 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30';

    return (
      <span className={'px-2 py-0.5 rounded-full text-[10px] font-semibold border ' + config}>
        {status}
      </span>
    );
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (o.orderNumber || o.id)?.toLowerCase().includes(query) ||
      o.customer?.fullName?.toLowerCase().includes(query) ||
      o.customer?.phone?.toLowerCase().includes(query) ||
      o.customer?.city?.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || o.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header & Status Tabs */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              Client Order Pipeline &amp; Fulfillment
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Verify orders, track dispatches across Pakistan, and update logistics telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Total pipeline:</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
              {orders.length} Orders
            </span>
          </div>
        </div>

        {/* Quick Status Filter Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 border-t border-white/[0.06] pt-4">
          {[
            { id: 'all', label: 'All Orders (' + orders.length + ')' },
            { id: 'Pending', label: 'Pending (' + orders.filter((o) => o.status === 'Pending').length + ')' },
            { id: 'Confirmed', label: 'Confirmed (' + orders.filter((o) => o.status === 'Confirmed').length + ')' },
            { id: 'Processing', label: 'Processing (' + orders.filter((o) => o.status === 'Processing').length + ')' },
            { id: 'Shipped', label: 'Shipped (' + orders.filter((o) => o.status === 'Shipped').length + ')' },
            { id: 'Delivered', label: 'Delivered (' + orders.filter((o) => o.status === 'Delivered').length + ')' },
            { id: 'Cancelled', label: 'Cancelled (' + orders.filter((o) => o.status === 'Cancelled').length + ')' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ' +
                (statusFilter === tab.id
                  ? 'bg-brand-gold text-brand-black shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Search & Payment Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID (e.g. BD-849120), Client Name, Phone, or City..."
            className="w-full bg-[#1A1A1A] text-xs text-white placeholder-zinc-500 pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-[#1A1A1A] text-xs text-zinc-300 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
          >
            <option value="all">All Payment States</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Payment Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* 3. Orders Table */}
      <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1B1B1B] text-zinc-400 border-b border-white/[0.08] text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Order ID</th>
                <th className="py-3.5 px-4 font-semibold">Client Details</th>
                <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                <th className="py-3.5 px-4 font-semibold">Purchased Items</th>
                <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                <th className="py-3.5 px-4 font-semibold">Payment</th>
                <th className="py-3.5 px-4 font-semibold">Order Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-zinc-400 text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const itemCount = (order.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0);

                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-gold">
                        {order.orderNumber || order.id}
                      </td>

                      {/* Customer Name & City */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-white text-xs group-hover:text-brand-gold transition-colors">
                          {order.customer?.fullName || 'VIP Client'}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {order.customer?.phone} • {order.customer?.city || 'Pakistan'}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-zinc-300">
                        <span className="block font-medium">{order.date}</span>
                        <span className="text-[10px] text-zinc-500">{order.time || '12:00'}</span>
                      </td>

                      {/* Items Preview */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-zinc-200">
                          {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </span>
                        <span className="text-[10px] text-zinc-400 block truncate max-w-[150px]">
                          {order.items?.map((i) => i.name).slice(0, 1).join(', ')}
                          {(order.items?.length || 0) > 1 ? '...' : ''}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white text-xs block">
                          Rs. {(order.total || 0).toLocaleString()}
                        </span>
                        {order.discount > 0 && (
                          <span className="text-[10px] text-brand-gold">
                            Saved Rs. {order.discount.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          {getPaymentBadge(order.paymentStatus || 'Pending')}
                          <span className="text-[10px] text-zinc-400 block">
                            {order.paymentMethod || 'Cash on Delivery'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenOrder(order)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-zinc-300 font-semibold text-xs transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 bg-[#161616]">
          <span>Displaying {filteredOrders.length} of {orders.length} orders</span>
          <span className="font-semibold text-brand-gold">
            Verified Total Value: Rs. {filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* 4. Order Details & Lifecycle Stepper Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            onClick={handleCloseOrder}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-fadeIn my-auto max-h-[92vh] overflow-y-auto text-white">
            {/* Close Button */}
            <button
              onClick={handleCloseOrder}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Order Number, Date, Print */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                    {selectedOrder.orderNumber || selectedOrder.id}
                  </span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Placed on {selectedOrder.date} at {selectedOrder.time || '12:00'}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsInvoiceView(!isInvoiceView)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-brand-gold" />
                  <span>{isInvoiceView ? 'Back to Order View' : 'Packing Slip / Invoice'}</span>
                </button>
              </div>
            </div>

            {/* If in Invoice Preview Mode */}
            {isInvoiceView ? (
              <div className="mt-6 p-6 rounded-2xl bg-white text-brand-black shadow-2xl">
                {/* Invoice Top */}
                <div className="flex justify-between items-start pb-6 border-b border-zinc-200">
                  <div>
                    <h2 className="font-heading font-bold text-xl text-black">BLACK DOT</h2>
                    <p className="text-[10px] tracking-widest uppercase font-semibold text-zinc-500">
                      ONE DOT • INFINITE VISION
                    </p>
                    <p className="text-xs text-zinc-600 mt-1">Official Pakistan Flagship Store</p>
                    <p className="text-xs text-zinc-600">concierge@blackdot.pk • +92 (300) BLACK-DOT</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold uppercase tracking-wider text-black block">
                      OFFICIAL PACKING SLIP
                    </span>
                    <span className="font-mono text-sm font-bold text-brand-gold-dark block mt-1">
                      {selectedOrder.orderNumber || selectedOrder.id}
                    </span>
                    <span className="text-xs text-zinc-500 block">{selectedOrder.date}</span>
                  </div>
                </div>

                {/* Recipient & Payment */}
                <div className="grid grid-cols-2 gap-6 py-6 border-b border-zinc-200 text-xs">
                  <div>
                    <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block mb-1">
                      CLIENT DISPATCH ADDRESS
                    </span>
                    <p className="font-bold text-black text-sm">{selectedOrder.customer?.fullName}</p>
                    <p className="text-zinc-700">{selectedOrder.customer?.address}</p>
                    <p className="text-zinc-700 font-semibold">{selectedOrder.customer?.city}, Pakistan</p>
                    <p className="text-zinc-700 mt-1">{selectedOrder.customer?.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block mb-1">
                      PAYMENT INFORMATION
                    </span>
                    <p className="font-bold text-black">{selectedOrder.paymentMethod}</p>
                    <p className="text-zinc-700">Status: {selectedOrder.paymentStatus}</p>
                    {selectedOrder.couponCode && (
                      <p className="text-brand-gold-dark font-medium mt-1">
                        Privilege Code: {selectedOrder.couponCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Itemized Table */}
                <table className="w-full text-left text-xs my-6">
                  <thead>
                    <tr className="border-b border-zinc-300 text-zinc-500 text-[10px] uppercase">
                      <th className="pb-2">Formulation</th>
                      <th className="pb-2 text-center">Volume</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Unit Price</th>
                      <th className="pb-2 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {selectedOrder.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 font-semibold text-black">{item.name}</td>
                        <td className="py-2.5 text-center text-zinc-600">{item.volume || 'Standard'}</td>
                        <td className="py-2.5 text-center font-bold text-black">{item.quantity}</td>
                        <td className="py-2.5 text-right text-zinc-600">
                          Rs. {item.price.toLocaleString()}
                        </td>
                        <td className="py-2.5 text-right font-bold text-black">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Summary */}
                <div className="border-t border-zinc-200 pt-4 flex justify-end">
                  <div className="w-64 space-y-1.5 text-xs">
                    <div className="flex justify-between text-zinc-600">
                      <span>Subtotal:</span>
                      <span>Rs. {(selectedOrder.subtotal || selectedOrder.total).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Express Shipping:</span>
                      <span>
                        {selectedOrder.shippingFee === 0 ? 'FREE' : 'Rs. ' + selectedOrder.shippingFee}
                      </span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>VIP Privilege Discount:</span>
                        <span>- Rs. {selectedOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-black border-t border-zinc-300 pt-2">
                      <span>Final Total:</span>
                      <span className="text-brand-gold-dark">Rs. {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-200 text-center text-[10px] text-zinc-500">
                  Thank you for placing your trust in Black Dot Sovereign Luxury Formulations.
                </div>
              </div>
            ) : (
              /* Standard Order Management View */
              <div className="mt-6 space-y-6">
                {/* 1. Interactive Lifecycle Status Stepper */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-3">
                    Order Status Lifecycle Transition
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {ORDER_STATUSES.map((statusName) => {
                      const isActive = selectedOrder.status === statusName;
                      return (
                        <button
                          key={statusName}
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, statusName);
                            setSelectedOrder({ ...selectedOrder, status: statusName });
                          }}
                          className={'px-2 py-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ' +
                            (isActive
                              ? 'bg-brand-gold text-brand-black border-brand-gold shadow-gold-glow'
                              : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:border-brand-gold/50')}
                        >
                          {statusName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Client & Delivery Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Info */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block">
                      Client Contact Details
                    </span>
                    <p className="text-sm font-bold text-white">{selectedOrder.customer?.fullName}</p>
                    <div className="text-xs text-zinc-300 space-y-1">
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{selectedOrder.customer?.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{selectedOrder.customer?.email}</span>
                      </p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block">
                      Delivery Destination
                    </span>
                    <p className="text-xs font-bold text-white">{selectedOrder.customer?.city}, Pakistan</p>
                    <p className="text-xs text-zinc-300 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>{selectedOrder.customer?.address}</span>
                    </p>
                  </div>
                </div>

                {/* 3. Purchased Items Itemized Table */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-3">
                    Purchased Formulations ({selectedOrder.items?.length || 0})
                  </span>

                  <div className="divide-y divide-white/[0.06]">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || '/images/hero_stage.png'}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-bold text-white">{item.name}</p>
                            <p className="text-[11px] text-zinc-400">
                              Volume: {item.volume || 'Standard'} • Unit: Rs. {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-white block">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-brand-gold">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Financials Breakdown */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-xs text-right">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal:</span>
                      <span>Rs. {(selectedOrder.subtotal || selectedOrder.total).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Shipping Fee:</span>
                      <span>{selectedOrder.shippingFee === 0 ? 'FREE' : 'Rs. ' + selectedOrder.shippingFee}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-brand-gold font-medium">
                        <span>Privilege Discount ({selectedOrder.couponCode}):</span>
                        <span>- Rs. {selectedOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-2">
                      <span>Grand Total:</span>
                      <span className="text-brand-gold">Rs. {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Payment Status & Internal Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Payment Status Switcher */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
                      Payment Verification ({selectedOrder.paymentMethod})
                    </span>
                    <div className="flex items-center gap-2">
                      {['Pending', 'Paid', 'Refunded'].map((payStatus) => (
                        <button
                          key={payStatus}
                          onClick={() => {
                            updatePaymentStatus(selectedOrder.id, payStatus);
                            setSelectedOrder({ ...selectedOrder, paymentStatus: payStatus });
                          }}
                          className={'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ' +
                            (selectedOrder.paymentStatus === payStatus
                              ? 'bg-brand-gold text-brand-black border-brand-gold font-bold'
                              : 'bg-white/5 text-zinc-300 border-white/10 hover:border-brand-gold/40')}
                        >
                          {payStatus}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Internal Notes */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
                      Internal Dispatch Notes
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        placeholder="e.g. Courier tracking # or dispatch instructions..."
                        className="flex-1 bg-[#141414] text-xs text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold"
                      />
                      <button
                        onClick={() => {
                          updateOrderNotes(selectedOrder.id, internalNotes);
                          setSelectedOrder({ ...selectedOrder, notes: internalNotes });
                        }}
                        className="px-3 py-2 rounded-lg bg-brand-gold text-brand-black text-xs font-bold hover:bg-brand-gold-dark transition-all cursor-pointer flex-shrink-0"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
