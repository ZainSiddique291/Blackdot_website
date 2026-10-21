import React, { useState } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { setQuickViewProduct } = useCart();

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center gap-3 bg-brand-ivory">
          <Search className="w-5 h-5 text-brand-gold-dark flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search haircare formulas, shampoo, oils, bundles..."
            className="flex-1 bg-transparent text-sm sm:text-base text-brand-black placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-brand-muted hover:text-brand-black"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-brand-muted hover:text-brand-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-5 max-h-96 overflow-y-auto divide-y divide-brand-border/60">
          <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-3">
            {query.trim() === '' ? 'TRENDING LUXURY FORMULATIONS' : `FOUND ${results.length} MATCHES`}
          </p>

          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-brand-muted">
              No products found for "{query}". Try searching for "shampoo", "oil", or "serum".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setQuickViewProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between hover:bg-brand-ivory/60 px-3 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-brand-ivory border border-brand-border flex items-center justify-center p-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-semibold text-brand-black">
                      {product.name}
                    </h4>
                    <p className="text-xs text-brand-gold-dark font-medium">
                      PKR {product.price.toLocaleString()} • {product.volume}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-brand-muted">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
