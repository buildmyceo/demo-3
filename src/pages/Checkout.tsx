/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !isOrderPlaced) {
    navigate('/products');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {isOrderPlaced ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-6 rounded-full bg-emerald-100 p-8 text-emerald-600">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Order Placed Successfully!</h2>
            <p className="mb-8 text-slate-500">Thank you for shopping with NexCart. Your order ID is #NC-98234.</p>
            <p className="text-sm text-slate-400">Redirecting you to the home page...</p>
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8 flex items-center gap-2">
              <Link to="/cart" className="flex items-center gap-1 text-sm font-semibold text-black hover:underline">
                <ChevronLeft size={16} />
                Back to Cart
              </Link>
            </div>

            <h1 className="mb-8 text-3xl font-bold text-slate-900">Checkout</h1>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Shipping Info */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-full bg-slate-50 p-2 text-black">
                        <Truck size={20} />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">Shipping Information</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Street Address</label>
                        <input
                          required
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main St"
                          className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">City</label>
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                          className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Zip Code</label>
                        <input
                          required
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-full bg-slate-50 p-2 text-black">
                        <CreditCard size={20} />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-slate-50 p-4 font-bold text-black">
                          <CreditCard size={20} />
                          <span>Card</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-100 bg-slate-50 p-4 font-bold text-slate-400">
                          <span>UPI</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-slate-700">Card Number</label>
                          <input
                            required
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Expiry Date</label>
                          <input
                            required
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">CVV</label>
                          <input
                            required
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="***"
                            className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
                  >
                    <span>Place Order</span>
                    <CheckCircle2 size={18} />
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="mb-6 text-xl font-bold text-slate-900">Order Summary</h2>

                  <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex flex-1 flex-col overflow-hidden">
                          <span className="truncate text-sm font-bold text-slate-900">{item.title}</span>
                          <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {formatCurrency((item.discountPrice || item.price) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

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

                  <div className="mt-8 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3 text-xs font-medium text-black">
                      <ShieldCheck size={18} />
                      <span>Your payment information is encrypted and secure.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
