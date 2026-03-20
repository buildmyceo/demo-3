/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Zap, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency, cn } from '../utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md"
    >
      {/* Badges */}
      <div className="absolute left-0 top-2 z-10 flex flex-col gap-1">
        {product.isBestDeal && (
          <div className="bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider rounded-r-sm">
            Limited Time Deal
          </div>
        )}
        {product.isTrending && (
          <div className="bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider rounded-r-sm">
            Best Seller
          </div>
        )}
      </div>

      {/* Wishlist Icon */}
      <button className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 text-slate-400 backdrop-blur-sm transition-colors hover:text-red-500">
        <Heart size={18} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-3">
        <Link to={`/product/${product.id}`} className="mb-1 line-clamp-2 text-sm font-medium text-slate-800 hover:text-blue-600">
          {product.title}
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-blue-600">{product.reviewsCount}</span>
        </div>

        <div className="mt-auto flex flex-col gap-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <>
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs font-bold text-orange-600">
                  ({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)
                </span>
              </>
            )}
          </div>
          <p className="text-[10px] text-slate-500 flex items-center gap-1">
            <Truck size={12} className="text-blue-500" /> FREE delivery by Tomorrow
          </p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-black py-1.5 text-xs font-bold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-sm"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
