import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search, Sparkles, ChevronRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function Shop({ initialCategory = 'all', onNavigateHome }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(6000);

  // Filter logic
  let filtered = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-14 border-b border-brand-border">
      <div className="max-w-site mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <button onClick={onNavigateHome} className="hover:text-brand-black transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-brand-gold-dark font-medium uppercase tracking-wider">
            Boutique Catalog
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-brand-border/80 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold-dark mb-2">
              CURATED HAIR WELLNESS
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl text-brand-black tracking-tight">
              The Black Dot <span className="text-brand-gold-dark">Boutique</span>
            </h1>
          </div>
          <p className="text-sm text-brand-muted max-w-md mt-4 md:mt-0">
            Formulated for lasting vitality, strength, and unmistakable elegance. Hand-inspected and shipped directly from our official laboratories.
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-border/80 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas by name or type..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-brand-border rounded-lg focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-muted flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold-dark" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs font-medium border border-brand-border rounded-lg bg-white focus:outline-none focus:border-brand-gold"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-brand-border/60">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-black text-brand-gold shadow border border-brand-gold/40'
                      : 'bg-brand-ivory text-brand-muted hover:text-brand-black border border-brand-border'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-brand-muted">
          <span>Showing {filtered.length} of {PRODUCTS.length} signature products</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-brand-gold-dark underline hover:text-brand-black"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-brand-border">
            <Sparkles className="w-10 h-10 text-brand-gold mx-auto mb-3" />
            <h3 className="font-heading text-xl font-semibold text-brand-black">No Products Match Your Criteria</h3>
            <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto mb-6">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-brand-black text-brand-gold text-xs font-bold uppercase rounded"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
