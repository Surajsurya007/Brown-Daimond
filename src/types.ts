/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'about-diamonds'
  | 'brown-diamonds'
  | 'diamond-types'
  | 'shapes-cuts'
  | 'diamond-colors'
  | 'clarity-guide'
  | 'certification'
  | 'buying-guide'
  | 'diamond-uses'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'cookie-policy';

export interface DiamondInfo {
  id: string;
  name: string;
  type: 'natural' | 'lab-grown' | 'fancy-color' | 'brown' | 'champagne' | 'cognac' | 'industrial';
  origin: string;
  rarity: string;
  priceFactor: number; // For calculator / comparison
  description: string;
  pros: string[];
  cons: string[];
  careGuide: string;
  gemstoneFacts: {
    hardness: string;
    refractiveIndex: string;
    dispersion: string;
    density: string;
  };
}

export interface DiamondShape {
  id: string;
  name: string;
  description: string;
  brilliance: string;
  bestFor: string;
  history: string;
  imageUrl: string;
}

export interface DiamondColorLevel {
  grade: string;
  name: string;
  description: string;
  colorHex: string;
  marketPremium: string;
}

export interface DiamondClarityLevel {
  grade: string;
  name: string;
  description: string;
  visibility: string;
  rarity: string;
  premiumStatus: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | '4cs' | 'brown' | 'buying' | 'certification' | 'lab';
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  certification: 'GIA' | 'IGI' | 'HRD';
  type: 'Natural' | 'Lab-Grown' | 'Champagne' | 'Cognac' | 'Chocolate';
  imageUrl: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
