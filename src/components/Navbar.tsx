/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Gem, ShoppingBag, Heart, Search, Sun, Moon, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cartCount: number;
  wishlistCount: number;
  isLightTheme: boolean;
  setIsLightTheme: (val: boolean) => void;
  openCart: () => void;
  openWishlist: () => void;
  onSearch: (searchTerm: string) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cartCount,
  wishlistCount,
  isLightTheme,
  setIsLightTheme,
  openCart,
  openWishlist,
  onSearch,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setCurrentPage('blog'); // Redirect to search/posts page
    }
  };

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about-diamonds', label: 'About Diamonds' },
    { id: 'brown-diamonds', label: 'Brown Diamonds' },
    { id: 'diamond-types', label: 'Types' },
    { id: 'shapes-cuts', label: 'Shapes & Cuts' },
    { id: 'diamond-colors', label: 'Colors' },
    { id: 'clarity-guide', label: 'Clarity' },
    { id: 'certification', label: 'Certification' },
    { id: 'buying-guide', label: 'Buying Guide' },
    { id: 'diamond-uses', label: 'Uses' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const themeClasses = isLightTheme
    ? 'bg-[#faf6f0]/90 border-amber-900/10 text-stone-900'
    : 'bg-[#0f0d0a]/90 border-amber-900/20 text-stone-100';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${themeClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <Gem className="h-7 w-7 text-amber-500 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-amber-500">
                Brown Daimond
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-600/70 -mt-1 font-mono">
                Luxury Education
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-200 relative group cursor-pointer ${
                    isActive 
                      ? 'text-amber-500 font-semibold' 
                      : isLightTheme 
                        ? 'text-stone-700 hover:text-amber-600' 
                        : 'text-stone-300 hover:text-amber-400'
                  }`}
                >
                  {item.label}
                  {/* Indicator Line */}
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 transition-transform duration-300 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-70'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {showSearchInput && (
                <form onSubmit={handleSearchSubmit} className="absolute right-10">
                  <input
                    type="text"
                    placeholder="Search diamonds, 4Cs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-40 sm:w-56 px-3 py-1.5 text-xs rounded-full border focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all ${
                      isLightTheme 
                        ? 'bg-white border-stone-200 text-stone-900' 
                        : 'bg-stone-900/95 border-amber-900/30 text-stone-100'
                    }`}
                  />
                </form>
              )}
              <button 
                onClick={() => setShowSearchInput(!showSearchInput)}
                className={`p-2 rounded-full cursor-pointer transition-colors ${
                  isLightTheme ? 'hover:bg-amber-900/5 text-stone-700' : 'hover:bg-amber-500/10 text-stone-300'
                }`}
                title="Search topics"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsLightTheme(!isLightTheme)}
              className={`p-2 rounded-full cursor-pointer transition-colors ${
                isLightTheme ? 'hover:bg-amber-900/5 text-stone-700' : 'hover:bg-amber-500/10 text-stone-300'
              }`}
              title={isLightTheme ? "Switch to Royal Black-Gold Theme" : "Switch to Cream Champagne Theme"}
            >
              {isLightTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative p-2 rounded-full cursor-pointer transition-colors hover:bg-amber-500/10"
              title="View Wishlist"
            >
              <Heart className={`h-5 w-5 ${wishlistCount > 0 ? 'text-amber-500 fill-amber-500' : isLightTheme ? 'text-stone-700' : 'text-stone-300'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-stone-100 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-sans">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full cursor-pointer transition-colors hover:bg-amber-500/10"
              title="Shopping Cart"
            >
              <ShoppingBag className={`h-5 w-5 ${isLightTheme ? 'text-stone-700' : 'text-stone-300'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-stone-100 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-sans">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-full cursor-pointer hover:bg-amber-500/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`xl:hidden border-t py-4 px-4 ${isLightTheme ? 'bg-[#faf6f0] border-amber-900/10' : 'bg-[#0f0d0a] border-amber-900/20'} max-h-[80vh] overflow-y-auto`}>
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-lg cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-amber-500/10 text-amber-500' 
                      : isLightTheme 
                        ? 'text-stone-700 hover:bg-amber-950/5' 
                        : 'text-stone-300 hover:bg-amber-500/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
