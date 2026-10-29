import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  Package,
  Layers,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import ConfirmModal from '../components/ConfirmModal';

export default function CategoriesView({ onNavigateTab }) {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdminData();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState(null);

  const initialForm = {
    name: '',
    id: '',
    description: '',
    status: 'Active',
  };
  const [form, setForm] = useState(initialForm);

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setForm(initialForm);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name || '',
      id: cat.id || '',
      description: cat.description || '',
      status: cat.status || 'Active',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, form);
    } else {
      addCategory(form);
    }
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      {/* 1. Header Toolbar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            Formulation Categories &amp; Taxonomy
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Organize signature collections, product groupings, and customer navigation.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* 2. Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories
          .filter((c) => c.id !== 'all')
          .map((cat) => {
            const assignedProducts = products.filter((p) => p.category === cat.id);
            const totalStock = assignedProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
            const totalRevenue = assignedProducts.reduce(
              (sum, p) => sum + (p.salesCount || 0) * (p.price || 0),
              0
            );

            return (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] border border-white/[0.08] hover:border-brand-gold/40 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-xs border border-brand-gold/30">
                        <FolderTree className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                        slug: {cat.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(cat)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Edit Category Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setCategoryToDelete(cat)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Category Name & Description */}
                  <div className="mt-3">
                    <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors font-heading">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description || 'Exclusive signature collection formulated by Black Dot.'}
                    </p>
                  </div>

                  {/* Metrics Badge */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.06] text-xs">
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                        Formulations
                      </span>
                      <span className="font-bold text-white text-xs mt-0.5 block">
                        {assignedProducts.length} Products
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                        Total Stock
                      </span>
                      <span className="font-bold text-brand-gold text-xs mt-0.5 block">
                        {totalStock} units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCategoryProducts({ category: cat, products: assignedProducts })}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-brand-gold font-semibold transition-colors cursor-pointer"
                  >
                    <span>View Formulations ({assignedProducts.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* 3. Products in Category Inspection Drawer/Modal */}
      {selectedCategoryProducts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedCategoryProducts(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-xl bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 z-10 animate-fadeIn text-white max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCategoryProducts(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading text-white">
              {selectedCategoryProducts.category.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {selectedCategoryProducts.products.length} formulation(s) currently assigned.
            </p>

            <div className="mt-4 divide-y divide-white/[0.06]">
              {selectedCategoryProducts.products.length === 0 ? (
                <p className="py-8 text-center text-xs text-zinc-500">
                  No formulations currently assigned to this category.
                </p>
              ) : (
                selectedCategoryProducts.products.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || '/images/hero_stage.png'}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">{p.name}</p>
                        <p className="text-[11px] text-zinc-400">
                          {p.sku} • Rs. {p.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-gold">
                      {p.stock} units
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Add / Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsEditModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-md bg-gradient-to-b from-[#1C1C1C] to-[#111111] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 z-10 animate-fadeIn text-white">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading text-white">
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </h3>

            <form onSubmit={handleSaveCategory} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Luxury Hair Serums"
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Editorial summary describing this collection category..."
                  className="w-full bg-[#141414] text-xs text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-black text-xs font-bold transition-all shadow-gold-glow cursor-pointer"
                >
                  {editingCategory ? 'Save Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Safe Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(categoryToDelete)}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={
          categoryToDelete && products.filter((p) => p.category === categoryToDelete.id).length > 0
            ? 'Warning: This category currently has ' +
              products.filter((p) => p.category === categoryToDelete.id).length +
              ' active products assigned. Please reassign or delete these products first.'
            : 'Are you sure you wish to permanently remove "' +
              (categoryToDelete?.name || '') +
              '"? This cannot be reversed.'
        }
        confirmText="Confirm Delete"
      />
    </div>
  );
}
