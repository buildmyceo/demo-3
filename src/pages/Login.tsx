/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200"
      >
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center text-white">
          <Link to="/" className="mb-4 inline-block text-3xl font-bold tracking-tighter text-white">NexCart</Link>
          <h2 className="text-xl font-bold">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin ? 'Login to access your orders and wishlist' : 'Join thousands of happy shoppers today'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-bold text-black hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Login' : 'Sign Up'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Or continue with</span>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
              <Chrome size={18} className="text-red-500" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
              <Github size={18} />
              <span>GitHub</span>
            </button>
          </div>

          {/* Toggle */}
          <div className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-black hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
