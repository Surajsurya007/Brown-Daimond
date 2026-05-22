/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProductItem, CartItem } from '../types';
import { LUXURY_CATALOG } from '../data/diamondsData';
import { Heart, ShoppingBag, Search, SlidersHorizontal, CheckCircle2, X, Star, CreditCard, Loader2, ArrowRight } from 'lucide-react';

interface EcommerceSectionProps {
  isLightTheme: boolean;
  addToCart: (product: ProductItem) => void;
  addToWishlist: (product: ProductItem) => void;
  wishlistIds: string[];
  openCart: () => void;
  openWishlist: () => void;
}

export default function EcommerceSection({
  isLightTheme,
  addToCart,
  addToWishlist,
  wishlistIds,
  openCart,
  openWishlist
}: EcommerceSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [minCarat, setMinCarat] = useState<number>(0.5);

  const productTypes = ['All', 'Champagne', 'Cognac', 'Chocolate', 'Lab-Grown', 'Natural'];

  // Filtering products
  const filteredProducts = LUXURY_CATALOG.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.cut.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || prod.type === selectedType;
    const matchesPrice = prod.price <= maxPrice;
    const matchesCarat = prod.carat >= minCarat;

    return matchesSearch && matchesType && matchesPrice && matchesCarat;
  });

  const cardBg = isLightTheme 
    ? 'bg-white border-stone-200 text-stone-900 shadow-sm' 
    : 'bg-[#0f0e0d] border-amber-900/15 text-stone-100';

  const titleColor = isLightTheme ? 'text-amber-950 font-serif' : 'text-amber-400 font-serif';
  const labelText = isLightTheme ? 'text-stone-500' : 'text-stone-400';

  return (
    <div className="space-y-8">
      
      {/* Title & Filter bar banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <h3 className={`text-3xl font-bold ${titleColor}`}>
            The Private Salon Collection & Vault
          </h3>
          <p className={`text-xs mt-1 ${isLightTheme ? 'text-stone-600' : 'text-stone-400'}`}>
            Acquire bespoke certified loose specimens and bespoke jewelry settings crafted to order.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={openCart}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600/10 border border-amber-500/20 text-amber-500 text-xs uppercase tracking-widest font-bold rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all"
          >
            <ShoppingBag className="h-4 w-4" /> Open Checkout Salon
          </button>
          <button 
            onClick={openWishlist}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-500/10 border border-stone-550/20 text-stone-300 text-xs uppercase tracking-widest font-bold rounded-xl cursor-pointer hover:bg-stone-500/20 transition-all"
          >
            <Heart className="h-4 w-4" /> View Private Wishlist
          </button>
        </div>
      </div>

      {/* Inputs grids */}
      <div className={`p-6 rounded-3xl border ${cardBg} grid grid-cols-1 md:grid-cols-4 gap-6 items-end`}>
        
        {/* Search */}
        <div>
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-2 font-mono">
            Search Specimen
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Solitaire, GIA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 border ${
                isLightTheme ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-stone-950 border-amber-900/20 text-stone-100'
              }`}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-500" />
          </div>
        </div>

        {/* Growth filter */}
        <div>
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-2 font-mono">
            Growth Selection
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 border ${
              isLightTheme ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-stone-955 bg-stone-950 border-amber-900/20 text-stone-100'
            }`}
          >
            {productTypes.map((t) => (
              <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block font-mono">
              Max Price limit
            </label>
            <span className="text-xs font-bold text-amber-500">${maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="15000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-amber-900/15 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Min Carat */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block font-mono">
              Minimum Carats
            </label>
            <span className="text-xs font-bold text-amber-500">{minCarat.toFixed(1)} ct+</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={minCarat}
            onChange={(e) => setMinCarat(parseFloat(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-amber-900/15 rounded-lg appearance-none cursor-pointer"
          />
        </div>

      </div>

      {/* Catalog Display */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center border border-dashed border-amber-900/15 rounded-3xl bg-stone-950/15">
          <SlidersHorizontal className="h-10 w-10 text-amber-500/50 mx-auto mb-3" />
          <p className="font-serif text-lg font-bold text-amber-500">No Premium Stones Match These Criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('All');
              setMaxPrice(15000);
              setMinCarat(0.5);
            }}
            className="mt-4 px-4 py-2 bg-amber-600 text-[10px] tracking-widest uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-amber-500 transition-colors"
          >
            Reset Vault Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const isWishlisted = wishlistIds.includes(prod.id);
            return (
              <div 
                key={prod.id} 
                className={`relative rounded-2xl border flex flex-col justify-between overflow-hidden group ${cardBg} transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1`}
              >
                {/* Image panel */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent pointer-events-none" />
                  
                  {/* Hearts Wishlist Toggled */}
                  <button
                    onClick={() => addToWishlist(prod)}
                    className="absolute top-3 right-3 p-2 bg-stone-950/70 border border-amber-900/20 rounded-full text-stone-250 cursor-pointer hover:bg-amber-600 hover:text-white transition-all transform hover:scale-110"
                    title={isWishlisted ? "Remove from wishlist" : "Add to Private Wishlist"}
                  >
                    <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'text-white fill-white' : ''}`} />
                  </button>

                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono tracking-widest text-amber-550 text-amber-400 font-bold uppercase backdrop-blur-sm">
                    {prod.certification} CERTIFIED
                  </span>
                </div>

                {/* Info block */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-amber-600 block font-mono font-bold">
                      {prod.type} Specimen — {prod.carat.toFixed(2)} CT
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-200 mt-1 hover:text-amber-500 duration-200 cursor-pointer">
                      {prod.name}
                    </h4>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-stone-400 font-mono">
                      <p><span className="text-stone-500">Color:</span> {prod.color}</p>
                      <p><span className="text-stone-500">Cut:</span> {prod.cut}</p>
                      <p><span className="text-stone-505">Clarity:</span> {prod.clarity}</p>
                      <p><span className="text-stone-505">Laborat:</span> {prod.certification}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-amber-900/10 pt-3 mt-4">
                    <span className="text-xl font-bold text-amber-400 font-mono">
                      ${prod.price.toLocaleString()} USD
                    </span>
                    <button
                      onClick={() => addToCart(prod)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 active:scale-95 text-stone-100 font-sans text-xs font-bold rounded-xl cursor-pointer duration-200 flex items-center gap-1.5 shadow-md"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Acquire Specimen
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Safeguard badge */}
      <div className={`p-4 rounded-xl border flex gap-3 items-center ${isLightTheme ? 'bg-stone-550/10 border-stone-200' : 'bg-stone-900/50 border-amber-950/20'} max-w-2xl text-[11px] leading-relaxed text-stone-405`}>
        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
        <span> All precious investments include a micro-etched GIA serialization stamp on the diamond girdle, valid laser certificate, and secure insured door-to-door armored transit delivery via Malca-Amit.</span>
      </div>

    </div>
  );
}
