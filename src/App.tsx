/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { CartProvider, useCart } from './context/CartContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Toast Notification Component
const Toast: React.FC = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const { cart } = useCart();
  const [prevCartLength, setPrevCartLength] = useState(cart.length);

  useEffect(() => {
    if (cart.length > prevCartLength) {
      const lastItem = cart[cart.length - 1];
      setMessage(`${lastItem.title} added to cart!`);
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
    setPrevCartLength(cart.length);
  }, [cart, prevCartLength]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] flex min-w-[300px] items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 text-white shadow-2xl ring-1 ring-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500 p-1 text-white">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-sm font-bold">{message}</span>
          </div>
          <button onClick={() => setShow(false)} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <AppContent />
      </CartProvider>
    </Router>
  );
}
