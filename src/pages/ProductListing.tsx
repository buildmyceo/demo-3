/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, Star, Search, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { cn } from '../utils';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryFilter = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'popularity';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 100000;

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    result = result.filter(p => {
      const price = p.discountPrice || p.price;
      return price >= minPrice && price <= maxPrice;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryFilter, searchQuery, sortBy, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs & Results Info */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">
              {categoryFilter === 'All' ? 'All Products' : categoryFilter}
            </span>
          </div>
          <p className="text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> results
            {searchQuery && <span> for "<span className="font-bold text-slate-900">{searchQuery}</span>"</span>}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-6 bg-white p-5 rounded-sm shadow-sm border border-slate-200">
              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', 'All')}
                    className={cn(
                      "block w-full text-left text-sm transition-colors hover:text-black",
                      categoryFilter === 'All' ? "font-bold text-black" : "text-slate-600"
                    )}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => updateFilter('category', cat)}
                      className={cn(
                        "block w-full text-left text-sm transition-colors hover:text-black",
                        categoryFilter === cat ? "font-bold text-black" : "text-slate-600"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">Customer Review</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <button key={rating} className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500">
                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span>& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">Price</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full rounded border border-slate-300 py-1.5 pl-5 pr-2 text-xs focus:border-black focus:outline-none"
                        value={minPrice || ''}
                        onChange={(e) => updateFilter('minPrice', e.target.value)}
                      />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full rounded border border-slate-300 py-1.5 pl-5 pr-2 text-xs focus:border-black focus:outline-none"
                        value={maxPrice === 100000 ? '' : maxPrice}
                        onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="w-full rounded border border-slate-300 py-1 text-xs font-medium hover:bg-slate-50">Go</button>
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              <button
                onClick={clearFilters}
                className="flex w-full items-center justify-center gap-2 rounded bg-slate-100 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
              >
                <X size={14} />
                <span>Clear All Filters</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="mb-6 flex items-center justify-between bg-white p-3 rounded-sm shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 lg:hidden"
                >
                  <Filter size={14} />
                  <span>Filters</span>
                </button>
                <h2 className="hidden text-sm font-bold text-slate-900 md:block">
                  {filteredProducts.length} Results
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="appearance-none rounded border border-slate-300 bg-slate-50 px-3 py-1.5 pr-8 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="popularity">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-sm shadow-sm border border-slate-200">
                <div className="mb-4 rounded-full bg-slate-100 p-6 text-slate-400">
                  <Search size={48} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No results for "{searchQuery}"</h3>
                <p className="mb-6 text-slate-500">Try checking your spelling or use more general terms</p>
                <button
                  onClick={clearFilters}
                  className="rounded-md bg-black px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 z-[70] w-full rounded-t-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8 pb-8">
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...CATEGORIES].map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateFilter('category', cat)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          categoryFilter === cat
                            ? "bg-black text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      value={minPrice || ''}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      value={maxPrice === 100000 ? '' : maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={clearFilters}
                  className="flex-1 rounded-lg bg-slate-100 py-4 text-sm font-bold text-slate-600"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 rounded-lg bg-black py-4 text-sm font-bold text-white"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListing;
