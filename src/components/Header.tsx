/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../constants';
import { cn } from '../utils';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col border-b border-slate-200">
      {/* Top Bar - Main Header */}
      <div className="bg-white py-2.5 text-black">
        <div className="container mx-auto flex items-center gap-4 px-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black font-black text-white shadow-lg shadow-black/20">
              N
            </div>
            <span className="hidden text-2xl font-black tracking-tighter md:block">
              Nex<span className="text-black">Cart</span>
            </span>
          </Link>

          {/* Deliver To (Desktop) */}
          <div className="hidden cursor-pointer items-center gap-1 hover:ring-1 hover:ring-black p-1.5 rounded-sm lg:flex shrink-0">
            <MapPin size={18} className="text-slate-500" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-slate-500">Deliver to</span>
              <span className="text-xs font-bold">Mumbai 400001</span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-1 items-center overflow-hidden rounded-md bg-slate-50 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-black">
            <div className="relative hidden h-full items-center bg-slate-100 px-3 text-[11px] font-bold text-slate-600 hover:bg-slate-200 lg:flex cursor-pointer border-r border-slate-300 group">
              <span className="whitespace-nowrap">All Categories</span>
              <ChevronDown size={14} className="ml-1" />
              <div className="absolute left-0 top-full hidden w-48 flex-col bg-white py-2 text-slate-700 shadow-xl group-hover:flex">
                {['All Categories', ...CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => navigate(cat === 'All Categories' ? '/products' : `/products?category=${encodeURIComponent(cat)}`)}
                    className="px-4 py-2 text-left text-xs hover:bg-slate-100"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full bg-transparent px-4 py-2 text-sm text-slate-900 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-black p-2.5 text-white transition-colors hover:bg-slate-800">
              <Search size={22} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link to="/profile" className="hidden flex-col leading-none hover:ring-1 hover:ring-black p-1.5 rounded-sm md:flex">
              <span className="text-[10px] text-slate-500">Hello, Sign in</span>
              <span className="flex items-center gap-1 text-sm font-bold">
                Account & Lists <ChevronDown size={12} />
              </span>
            </Link>

            <Link to="/profile" className="hidden flex-col leading-none hover:ring-1 hover:ring-black p-1.5 rounded-sm md:flex">
              <span className="text-[10px] text-slate-500">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            <Link to="/cart" className="relative flex items-center gap-1 hover:ring-1 hover:ring-black p-1.5 rounded-sm">
              <div className="relative">
                <ShoppingCart size={28} />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden text-sm font-bold md:block self-end pb-1">Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="text-black md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub Header - Navigation Links */}
      <div className="bg-slate-50 py-1.5 text-black border-b border-slate-200">
        <div className="container mx-auto flex items-center gap-5 px-4 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-1 text-sm font-bold hover:ring-1 hover:ring-black px-2 py-1 rounded-sm whitespace-nowrap">
            <Menu size={18} /> All
          </button>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="text-sm font-medium hover:ring-1 hover:ring-black px-2 py-1 rounded-sm whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
          <Link to="/products" className="text-sm font-medium hover:ring-1 hover:ring-black px-2 py-1 rounded-sm whitespace-nowrap">Best Sellers</Link>
          <Link to="/products" className="text-sm font-medium hover:ring-1 hover:ring-black px-2 py-1 rounded-sm whitespace-nowrap">Today's Deals</Link>
          <Link to="/products" className="text-sm font-medium hover:ring-1 hover:ring-black px-2 py-1 rounded-sm whitespace-nowrap">Customer Service</Link>
          <Link to="/products" className="text-sm font-medium hover:ring-1 hover:ring-black px-2 py-1 rounded-sm whitespace-nowrap">New Releases</Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] flex md:hidden"
          >
            <div className="w-4/5 bg-white text-slate-900 shadow-2xl">
              <div className="bg-black p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <span className="text-lg font-bold">Hello, Sign in</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-6">
                <div>
                  <h3 className="mb-3 text-sm font-bold text-slate-400 uppercase tracking-widest">Shop By Category</h3>
                  <nav className="flex flex-col gap-4">
                    <Link to="/products" className="text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>All Products</Link>
                    {CATEGORIES.map(cat => (
                      <Link key={cat} to={`/products?category=${cat}`} className="text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{cat}</Link>
                    ))}
                  </nav>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div>
                  <h3 className="mb-3 text-sm font-bold text-slate-400 uppercase tracking-widest">Help & Settings</h3>
                  <nav className="flex flex-col gap-4">
                    <Link to="/profile" className="text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Your Account</Link>
                    <Link to="/login" className="text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                    <Link to="/products" className="text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Customer Service</Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
