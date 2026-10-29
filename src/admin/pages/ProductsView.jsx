import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Sparkles,
  Flame,
  Check,
  X,
  AlertTriangle,
  UploadCloud,
  ChevronDown,
  Layers,
  ArrowUpDown,
  SlidersHorizontal,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import ConfirmModal from '../components/ConfirmModal';

export default function ProductsView() {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductFeatured,
    toggleProductBestseller,
  } = useAdminData();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'inStock' | 'lowStock' | 'outOfStock'
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc' | 'price-asc' | 'price-desc' | 'stock-asc'

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    shortName: '',
    subtitle: '',
    category: 'creams',
    price: '',
    originalPrice: '',
    stock: 15,
    inStock: true,
    isFeatured: false,
    isBestseller: false,
    image: '/images/hero_stage.png',
    description: '',
    benefits: '',
    usage: '',
    ingredients: '',
    volume: '50ml',
    badge: '',
  };
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    let matchesStock = true;
    if (stockFilter === 'lowStock') {
      matchesStock = (p.stock || 0) > 0 && (p.stock || 0) <= 8;
    } else if (stockFilter === 'outOfStock') {
      matchesStock = (p.stock || 0) === 0;
    } else if (stockFilter === 'inStock') {
      matchesStock = (p.stock || 0) > 0;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Sorting
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'stock-asc') return (a.stock || 0) - (b.stock || 0);
    return (a.name || '').localeCompare(b.name || '');
  });

  // Handlers for Add/Edit
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || '',
      shortName: product.shortName || '',
      subtitle: product.subtitle || '',
      category: product.category || 'creams',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      stock: product.stock ?? 10,
      inStock: product.inStock ?? true,
      isFeatured: product.isFeatured ?? false,
      isBestseller: product.isBestseller ?? false,
      image: product.image || '/images/hero_stage.png',
      description: product.description || '',
      benefits: Array.isArray(product.benefits) ? product.benefits.join('\n') : product.benefits || '',
      usage: product.usage || '',
      ingredients: product.ingredients || '',
      volume: product.volume || '50ml',
      badge: product.badge || '',
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = 'Formulation title is required';
    if (!form.price || Number(form.price) <= 0) errors.price = 'Valid retail price is required';
    if (form.stock === '' || Number(form.stock) < 0) errors.stock = 'Stock count cannot be negative';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const formattedBenefits = form.benefits
        ? form.benefits.split('\n').filter((b) => b.trim().length > 0)
        : [];

      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : Number(form.price),
        stock: Number(form.stock),
        inStock: Number(form.stock) > 0,
        benefits: formattedBenefits,
      };

      if (editingProduct) {
        updateProduct(editingProduct.id, payload);
      } else {
        addProduct(payload);
      }

      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 400);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Product Specifications &amp; Inventory
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Manage formulations, pricing, stock levels, and store visibility.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer self-start sm:self-auto group"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Add New Formulation</span>
        </button>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by formulation name, SKU, or category..."
            className="w-full bg-[#1A1A1A] text-xs text-white placeholder-zinc-500 pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1A1A1A] text-xs text-zinc-300 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-[#1A1A1A] text-xs text-zinc-300 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
          >
            <option value="all">All Stock Levels</option>
            <option value="inStock">In Stock (&gt; 0)</option>
            <option value="lowStock">Low Stock (&lt;= 8)</option>
            <option value="outOfStock">Out of Stock (0)</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1A1A1A] text-xs text-zinc-300 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
          >
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock-asc">Stock: Lowest First</option>
          </select>
        </div>
      </div>

      {/* 3. Products Table */}
      <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1B1B1B] text-zinc-400 border-b border-white/[0.08] text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Formulation</th>
                <th className="py-3.5 px-4 font-semibold">SKU &amp; Family</th>
                <th className="py-3.5 px-4 font-semibold">Retail Price</th>
                <th className="py-3.5 px-4 font-semibold">Stock Level</th>
                <th className="py-3.5 px-4 font-semibold text-center">Featured</th>
                <th className="py-3.5 px-4 font-semibold text-center">Bestseller</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-zinc-400 text-xs">
                    No matching luxury formulations located. Try adjusting filters or search query.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = (p.stock || 0) > 0 && (p.stock || 0) <= 8;
                  const isOut = (p.stock || 0) === 0;

                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Product Name & Image */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image || '/images/hero_stage.png'}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0 bg-black/40 group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <p className="font-bold text-white text-xs group-hover:text-brand-gold transition-colors">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-zinc-400 truncate max-w-xs mt-0.5">
                              {p.subtitle || p.shortName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU & Category */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] text-zinc-300 block font-semibold">
                          {p.sku || 'BD-GEN-001'}
                        </span>
                        <span className="text-[10px] text-brand-gold uppercase tracking-wider capitalize font-medium">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-white text-xs">
                            Rs. {(p.price || 0).toLocaleString()}
                          </span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-[10px] text-zinc-500 line-through">
                              Rs. {p.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Level with Luxury Alert Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={'px-2 py-0.5 rounded-full text-[10px] font-bold border ' +
                              (isOut
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : isLow
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40')}
                          >
                            {isOut ? 'Out of Stock' : (p.stock + ' units')}
                          </span>
                        </div>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleProductFeatured(p.id)}
                          className={'p-1.5 rounded-lg border transition-all cursor-pointer ' +
                            (p.isFeatured
                              ? 'bg-brand-gold/20 text-brand-gold border-brand-gold/40'
                              : 'bg-white/5 text-zinc-500 border-white/5 hover:text-white')}
                          title="Toggle Featured Catalog"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </td>

                      {/* Bestseller Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleProductBestseller(p.id)}
                          className={'p-1.5 rounded-lg border transition-all cursor-pointer ' +
                            (p.isBestseller
                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                              : 'bg-white/5 text-zinc-500 border-white/5 hover:text-white')}
                          title="Toggle Bestseller Badge"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-zinc-300 transition-colors cursor-pointer"
                            title="Edit Formulation"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setProductToDelete(p);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white text-zinc-300 transition-colors cursor-pointer"
                            title="Delete Formulation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="p-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 bg-[#161616]">
          <span>Displaying {filteredProducts.length} of {products.length} formulations</span>
          <span className="font-semibold text-brand-gold">
            Catalog Inventory Health: {products.filter((p) => (p.stock || 0) > 8).length} Healthy
          </span>
        </div>
      </div>

      {/* 4. Add / Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setIsEditModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/30 rounded-2xl shadow-2xl p-6 z-10 animate-fadeIn my-auto max-h-[92vh] overflow-y-auto text-white">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading text-white tracking-wide">
              {editingProduct ? 'Modify Formulation Specifications' : 'Introduce New Luxury Formulation'}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Updates persist directly into active storefront catalog.
            </p>

            <form onSubmit={handleSaveProduct} className="mt-5 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Full Formulation Title *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Black Dot Radiance Day Beauty Cream (50g)"
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
                {formErrors.name && (
                  <p className="text-rose-400 text-[10px] mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Subtitle & Short Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Editorial Subtitle
                  </label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="e.g. Daily Illuminating & Protective Moisture"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Category Family
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Retail Price (PKR) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="2250"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                  {formErrors.price && (
                    <p className="text-rose-400 text-[10px] mt-1">{formErrors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Original Price (Pre-discount)
                  </label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    placeholder="2700"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="25"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                  {formErrors.stock && (
                    <p className="text-rose-400 text-[10px] mt-1">{formErrors.stock}</p>
                  )}
                </div>
              </div>

              {/* Image URL & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Image Asset Path or URL
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/images/products/cream_day.jpg"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Volume / Size
                  </label>
                  <input
                    type="text"
                    value={form.volume}
                    onChange={(e) => setForm({ ...form, volume: e.target.value })}
                    placeholder="50g or 250ml"
                    className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Luxury Narrative / Description
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Formulation philosophy, active compounds, and clinical sensory notes..."
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              {/* Key Benefits */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Key Benefits (one per line)
                </label>
                <textarea
                  rows="2"
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  placeholder="24-hour hydration\nFades dullness and enhances natural glow"
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="rounded accent-brand-gold w-4 h-4"
                  />
                  <span>Mark as Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isBestseller}
                    onChange={(e) => setForm({ ...form, isBestseller: e.target.checked })}
                    className="rounded accent-brand-gold w-4 h-4"
                  />
                  <span>Flag as Bestseller</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Persisting Changes...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingProduct ? 'Save Specifications' : 'Publish Formulation'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Formulation"
        message={'Are you sure you wish to delete "' + (productToDelete?.name || '') + '" from the boutique catalog? This action will remove it from customer view.'}
        confirmText="Confirm Delete"
      />
    </div>
  );
}
