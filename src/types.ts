/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  images: string[];
  features: string[];
  isTrending?: boolean;
  isBestDeal?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Electronics' | 'Home & Kitchen' | 'Fashion' | 'Accessories';
