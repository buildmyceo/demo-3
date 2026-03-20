/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones',
    description: 'Experience crystal clear sound with our premium noise-canceling headphones. Perfect for work, travel, and gaming.',
    price: 12999,
    discountPrice: 8999,
    rating: 4.5,
    reviewsCount: 1240,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['Active Noise Cancellation', '40-hour Battery Life', 'Bluetooth 5.2', 'Built-in Microphone'],
    isTrending: true,
  },
  {
    id: '2',
    title: 'Smart LED TV 42 inch',
    description: 'Immersive 4K Ultra HD display with built-in smart features and voice control. Stream your favorite shows effortlessly.',
    price: 45999,
    discountPrice: 38999,
    rating: 4.2,
    reviewsCount: 850,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['4K Ultra HD', 'Smart TV with Apps', '3 HDMI Ports', 'Dolby Audio'],
    isBestDeal: true,
  },
  {
    id: '3',
    title: 'Modern Kitchen Set',
    description: 'A complete 12-piece stainless steel cookware set for the modern chef. Durable, non-stick, and easy to clean.',
    price: 8999,
    discountPrice: 6499,
    rating: 4.8,
    reviewsCount: 420,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1584990344619-39110fe720a5?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['Stainless Steel', 'Non-stick Coating', 'Induction Friendly', 'Dishwasher Safe'],
    isTrending: true,
  },
  {
    id: '4',
    title: 'Premium Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID protection. Slim design with multiple card slots and a coin pocket.',
    price: 2499,
    discountPrice: 1499,
    rating: 4.6,
    reviewsCount: 2100,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1627123430984-713f1999b240?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606503176903-6217fca05881?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['Genuine Leather', 'RFID Protection', 'Slim Design', 'Multiple Card Slots'],
    isBestDeal: true,
  },
  {
    id: '5',
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches for a tactile typing experience. Durable and responsive.',
    price: 5999,
    discountPrice: 4499,
    rating: 4.4,
    reviewsCount: 1500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['Mechanical Blue Switches', 'RGB Backlighting', 'Anti-ghosting Keys', 'Ergonomic Design'],
  },
  {
    id: '6',
    title: 'Designer Sunglasses',
    description: 'Stylish polarized sunglasses with UV400 protection. Lightweight frame and comfortable fit for all-day wear.',
    price: 3999,
    discountPrice: 2499,
    rating: 4.3,
    reviewsCount: 680,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['Polarized Lenses', 'UV400 Protection', 'Lightweight Frame', 'Classic Design'],
    isTrending: true,
  },
  {
    id: '7',
    title: 'Smart Fitness Tracker',
    description: 'Track your steps, heart rate, and sleep with this sleek fitness band. Water-resistant and long battery life.',
    price: 4999,
    discountPrice: 2999,
    rating: 4.1,
    reviewsCount: 3200,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['Heart Rate Monitor', 'Sleep Tracking', 'Water Resistant', '10-day Battery Life'],
  },
  {
    id: '8',
    title: 'Cotton Casual Shirt',
    description: 'Breathable 100% cotton shirt for everyday comfort. Available in multiple colors and sizes.',
    price: 1999,
    discountPrice: 999,
    rating: 4.0,
    reviewsCount: 950,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1621072156002-e2fcced0b170?auto=format&fit=crop&w=600&q=80',
    ],
    features: ['100% Cotton', 'Regular Fit', 'Breathable Fabric', 'Machine Washable'],
  },
];

export const CATEGORIES = ['Electronics', 'Home & Kitchen', 'Fashion', 'Accessories'];

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    date: '2024-03-15',
    total: 9438,
    status: 'Delivered',
    items: [
      {
        id: '1',
        title: 'Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        price: 8999,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD-6542',
    date: '2024-02-28',
    total: 1499,
    status: 'Delivered',
    items: [
      {
        id: '4',
        title: 'Premium Leather Wallet',
        image: 'https://images.unsplash.com/photo-1627123430984-713f1999b240?auto=format&fit=crop&w=600&q=80',
        price: 1499,
        quantity: 1,
      },
    ],
  },
];

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'ADDR-1',
    type: 'Home',
    name: 'John Doe',
    street: '123, Blue Apartment, Sector 45',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    isDefault: true,
  },
  {
    id: 'ADDR-2',
    type: 'Work',
    name: 'John Doe',
    street: 'Tech Hub, Floor 4, Building B',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560001',
  },
];
