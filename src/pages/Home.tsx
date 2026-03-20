/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, TrendingUp, ShieldCheck, Truck, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { cn } from '../utils';

const CATEGORY_IMAGES: Record<string, string> = {
  'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
  'Accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
};

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80',
    title: 'Upgrade Your Lifestyle',
    subtitle: 'Discover the latest in electronics, fashion, and home essentials.',
    cta: 'Shop Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Audio Experience',
    subtitle: 'Up to 40% off on top-brand headphones and speakers.',
    cta: 'View Offers',
  },
  {
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80',
    title: 'Modern Kitchen Essentials',
    subtitle: 'Transform your cooking with our curated kitchen collection.',
    cta: 'Explore More',
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trendingProducts = PRODUCTS.filter(p => p.isTrending);
  const bestDeals = PRODUCTS.filter(p => p.isBestDeal);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-16 bg-white">
      {/* Hero Carousel */}
      <section className="relative h-[300px] w-full overflow-hidden md:h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt="Hero"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
            <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-xl"
              >
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="mb-8 text-lg text-slate-200">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-block rounded-md bg-white px-8 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100 active:scale-95"
                >
                  {HERO_SLIDES[currentSlide].cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentSlide === i ? "w-6 bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </section>

      {/* Quick Category Circles */}
      <section className="container mx-auto px-4 -mt-16 relative z-30">
        <div className="flex justify-between gap-4 overflow-x-auto no-scrollbar bg-white p-6 rounded-xl shadow-lg ring-1 ring-slate-200">
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`} className="flex flex-col items-center gap-2 min-w-[80px] group">
              <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-slate-100 transition-all group-hover:ring-blue-500">
                <img src={CATEGORY_IMAGES[cat]} alt={cat} className="h-full w-full object-cover" />
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">{cat}</span>
            </Link>
          ))}
          <Link to="/products" className="flex flex-col items-center gap-2 min-w-[80px] group">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-slate-100 transition-all group-hover:ring-blue-500">
              <ChevronRight size={24} className="text-slate-400 group-hover:text-blue-600" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">All</span>
          </Link>
        </div>
      </section>

      {/* Multi-Card Sections (Amazon Style) */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slate-900">Trending in Electronics</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRODUCTS.filter(p => p.category === 'Electronics').slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="flex flex-col gap-1">
                <img src={p.image} alt={p.title} className="aspect-square object-cover rounded-sm" />
                <span className="text-[10px] font-medium text-slate-600 truncate">{p.title}</span>
              </Link>
            ))}
          </div>
          <Link to="/products?category=Electronics" className="mt-auto text-xs font-bold text-blue-600 hover:underline">See more</Link>
        </div>

        <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slate-900">Best Deals for Home</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRODUCTS.filter(p => p.category === 'Home & Kitchen').slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="flex flex-col gap-1">
                <img src={p.image} alt={p.title} className="aspect-square object-cover rounded-sm" />
                <span className="text-[10px] font-medium text-slate-600 truncate">{p.title}</span>
              </Link>
            ))}
          </div>
          <Link to="/products?category=Home & Kitchen" className="mt-auto text-xs font-bold text-blue-600 hover:underline">See more</Link>
        </div>

        <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slate-900">Latest in Fashion</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRODUCTS.filter(p => p.category === 'Fashion').slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="flex flex-col gap-1">
                <img src={p.image} alt={p.title} className="aspect-square object-cover rounded-sm" />
                <span className="text-[10px] font-medium text-slate-600 truncate">{p.title}</span>
              </Link>
            ))}
          </div>
          <Link to="/products?category=Fashion" className="mt-auto text-xs font-bold text-blue-600 hover:underline">See more</Link>
        </div>

        <div className="bg-black p-5 rounded-sm shadow-sm flex flex-col gap-4 text-white">
          <h3 className="text-xl font-bold">Sign in for the best experience</h3>
          <p className="text-sm text-slate-400">Personalized recommendations, track orders and more.</p>
          <Link to="/login" className="w-full bg-white py-2.5 rounded-md text-black font-bold text-center text-sm hover:bg-slate-100 transition-colors">Sign in securely</Link>
          <div className="mt-auto">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80" alt="Promo" className="rounded-md" />
          </div>
        </div>
      </section>

      {/* Trending Products Horizontal Scroll */}
      <section className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
            <Link to="/products" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
            {trendingProducts.map(product => (
              <div key={product.id} className="min-w-[200px] max-w-[200px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹999' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% safe transactions' },
            { icon: Zap, title: 'Fast Support', desc: '24/7 customer assistance' },
            { icon: TrendingUp, title: 'Best Quality', desc: 'Handpicked premium products' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
