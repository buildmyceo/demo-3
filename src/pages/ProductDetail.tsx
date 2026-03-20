/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, ChevronRight, Heart, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { formatCurrency, cn } from '../utils';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Product Not Found</h2>
        <p className="mb-8 text-slate-500">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="rounded-lg bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">
          Back to Products
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-black">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <button className="rounded-full bg-white p-2 text-slate-400 shadow-md transition-colors hover:text-red-500">
                <Heart size={20} />
              </button>
              <button className="rounded-full bg-white p-2 text-slate-400 shadow-md transition-colors hover:text-black">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[product.image, ...product.images].map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-2 transition-all",
                  selectedImage === img ? "ring-black" : "ring-transparent hover:ring-slate-300"
                )}
              >
                <img src={img} alt={`Thumbnail ${i}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-black">{product.category}</span>
            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 md:text-4xl">{product.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-bold text-orange-500">
                <Star size={16} fill="currentColor" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-medium">({product.reviewsCount} reviews)</span>
              </div>
              <span className="h-4 w-px bg-slate-200"></span>
              <span className="text-sm font-bold text-emerald-600">In Stock</span>
            </div>
          </div>

          <div className="mb-8 flex items-baseline gap-4">
            <span className="text-4xl font-extrabold text-slate-900">
              {formatCurrency(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <>
                <span className="text-xl text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600">
                  Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mb-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Key Features</h3>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
              >
                -
              </button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-bold text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-8 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
            >
              <Zap size={20} />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 p-6 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck className="text-black" size={24} />
              <span className="text-xs font-bold text-slate-900">Free Delivery</span>
              <span className="text-[10px] text-slate-500">Delivered by Tomorrow</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw className="text-black" size={24} />
              <span className="text-xs font-bold text-slate-900">Easy Returns</span>
              <span className="text-[10px] text-slate-500">30-day return policy</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck className="text-black" size={24} />
              <span className="text-xs font-bold text-slate-900">1 Year Warranty</span>
              <span className="text-[10px] text-slate-500">Brand authorized warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Related Products</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
