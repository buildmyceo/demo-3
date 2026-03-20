/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Globe, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-black border-t border-slate-200">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-slate-50 py-4 text-sm font-bold transition-colors hover:bg-slate-100 flex items-center justify-center gap-2 border-b border-slate-200"
      >
        <ChevronUp size={18} /> Back to top
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Get to Know Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Get to Know Us</h3>
            <nav className="flex flex-col gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-black hover:underline">About Us</Link>
              <Link to="/" className="hover:text-black hover:underline">Careers</Link>
              <Link to="/" className="hover:text-black hover:underline">Press Releases</Link>
              <Link to="/" className="hover:text-black hover:underline">NexCart Science</Link>
            </nav>
          </div>

          {/* Connect with Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Connect with Us</h3>
            <nav className="flex flex-col gap-2 text-sm text-slate-500">
              <Link to="/" className="flex items-center gap-2 hover:text-black hover:underline">
                <Facebook size={16} /> Facebook
              </Link>
              <Link to="/" className="flex items-center gap-2 hover:text-black hover:underline">
                <Twitter size={16} /> Twitter
              </Link>
              <Link to="/" className="flex items-center gap-2 hover:text-black hover:underline">
                <Instagram size={16} /> Instagram
              </Link>
              <Link to="/" className="flex items-center gap-2 hover:text-black hover:underline">
                <Youtube size={16} /> Youtube
              </Link>
            </nav>
          </div>

          {/* Make Money with Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Make Money with Us</h3>
            <nav className="flex flex-col gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-black hover:underline">Sell on NexCart</Link>
              <Link to="/" className="hover:text-black hover:underline">Sell under NexCart Accelerator</Link>
              <Link to="/" className="hover:text-black hover:underline">Protect and Build Your Brand</Link>
              <Link to="/" className="hover:text-black hover:underline">NexCart Global Selling</Link>
              <Link to="/" className="hover:text-black hover:underline">Become an Affiliate</Link>
              <Link to="/" className="hover:text-black hover:underline">Fulfilment by NexCart</Link>
            </nav>
          </div>

          {/* Let Us Help You */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Let Us Help You</h3>
            <nav className="flex flex-col gap-2 text-sm text-slate-500">
              <Link to="/profile" className="hover:text-black hover:underline">Your Account</Link>
              <Link to="/profile" className="hover:text-black hover:underline">Returns Centre</Link>
              <Link to="/profile" className="hover:text-black hover:underline">100% Purchase Protection</Link>
              <Link to="/" className="hover:text-black hover:underline">NexCart App Download</Link>
              <Link to="/" className="hover:text-black hover:underline">Help</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 h-px bg-slate-200"></div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black font-black text-white">
              N
            </div>
            <span className="text-xl font-black tracking-tighter">
              Nex<span className="text-black">Cart</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <button className="flex items-center gap-1 rounded border border-slate-300 px-3 py-1.5 hover:border-black">
              <Globe size={14} /> English
            </button>
            <button className="rounded border border-slate-300 px-3 py-1.5 hover:border-black">
              ₹ INR - Indian Rupee
            </button>
            <button className="rounded border border-slate-300 px-3 py-1.5 hover:border-black">
              India
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] text-slate-500">
          <div className="mb-2 flex justify-center gap-4">
            <Link to="/" className="hover:underline">Conditions of Use & Sale</Link>
            <Link to="/" className="hover:underline">Privacy Notice</Link>
            <Link to="/" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <p>© 2024-2026, NexCart.com, Inc. or its affiliates</p>
          <p className="mt-2 font-medium text-slate-400">sampel by buildmyceo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
