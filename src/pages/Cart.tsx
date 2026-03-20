/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="mb-6 rounded-full bg-slate-100 p-8 text-slate-400">
          <ShoppingBag size={64} />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="mb-8 text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="rounded-lg bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-black hover:underline">
          <ChevronLeft size={16} />
          Continue Shopping
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold text-slate-900">Shopping Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:gap-6"
                >
                  <Link to={`/product/${item.id}`} className="aspect-square w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-32">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="mb-1 flex items-start justify-between gap-4">
                      <Link to={`/product/${item.id}`} className="text-lg font-bold text-slate-900 hover:text-black">
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="mb-4 text-sm text-slate-500 line-clamp-1">{item.category}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-slate-900">
                          {formatCurrency((item.discountPrice || item.price) * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-slate-400">
                            {formatCurrency(item.discountPrice || item.price)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Order Summary</h2>

            <div className="space-y-4 border-b border-slate-100 pb-6">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax (GST)</span>
                <span className="font-semibold text-slate-900">{formatCurrency(totalPrice * 0.18)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between text-lg font-bold text-slate-900">
              <span>Total Amount</span>
              <span>{formatCurrency(totalPrice * 1.18)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck size={16} className="text-black" />
                <span>Secure checkout with SSL encryption</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Truck size={16} className="text-black" />
                <span>Free delivery on all orders today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Truck: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.235-2.794a1 1 0 0 0-.78-.382H15" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export default Cart;
