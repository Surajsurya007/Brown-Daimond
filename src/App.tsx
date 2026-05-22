/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Interactive4Cs from './components/Interactive4Cs';
import DiamondCalculator from './components/Calculator';
import ComparisonTool, { COMPARABLE_DIAMONDS } from './components/ComparisonTool';
import Chatbot from './components/Chatbot';
import EcommerceSection from './components/EcommerceSection';
import { PageId, ProductItem, CartItem } from './types';
import { COMPREHENSIVE_DIAMONDS, DIAMOND_SHAPES, DIAMOND_COLORS, DIAMOND_CLARITY_LEVELS, EDUCATION_FAQS } from './data/diamondsData';
import { COMPREHENSIVE_BLOGS } from './data/blogData';
import { motion, AnimatePresence } from 'motion/react';
import { Gem, ArrowRight, ShieldCheck, HelpCircle, Calendar, Send, Compass, User, Sparkles, MapPin, Phone, Mail, FileText, Check, Award, AlertCircle, ShoppingBag, Heart, Trash2, ShieldAlert, Star, X, Loader2, CreditCard, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<ProductItem[]>([]);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // Checkout & Booking simulated forms
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<{ orderId: string; trackingNumber: string } | null>(null);
  
  const [faqCategory, setFaqCategory] = useState<'all' | 'general' | '4cs' | 'brown' | 'buying' | 'certification' | 'lab'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Cookie and GDPR Consent states for AdSense eligibility
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('brown_diamond_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCookieConsent = (level: 'all' | 'essential') => {
    localStorage.setItem('brown_diamond_cookie_consent', level);
    setShowCookieBanner(false);
  };

  // Gallery slider state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
      title: 'Besboke Amber Radiance',
      desc: 'An exquisite C5-C6 Cognac Diamond ring surrounded by micro-paved brilliant white diamonds.'
    },
    {
      url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200',
      title: 'The Argyle Monarch Suite',
      desc: 'Hand-certified C3 Champagne diamonds radiating deep warmth.'
    },
    {
      url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200',
      title: 'Art Deco Step Cut',
      desc: 'An emerald-cut Chocolate diamond demonstrating extraordinary linear clarity and reflections.'
    }
  ];

  // Appointment scheduler state
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingLounge, setBookingLounge] = useState('Mayfair London Lounge');
  const [isBooked, setIsBooked] = useState(false);

  // Contact form state
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  // Bespoke Custom Jewelry builder state
  const [customSpecimenId, setCustomSpecimenId] = useState('specimen-01');
  const [customStyle, setCustomStyle] = useState<'ring' | 'necklace' | 'earrings' | 'bracelet' | 'pendant'>('ring');
  const [customMetal, setCustomMetal] = useState<'rose_gold' | 'yellow_gold' | 'white_gold' | 'platinum'>('rose_gold');
  const [isBespokeAdded, setIsBespokeAdded] = useState(false);

  // Cart actions
  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += 1;
        return next;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const changeCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          const nextQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  // Wishlist actions
  const addToWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartTotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

  // Simulated live checkout route handler
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail.trim() || cart.length === 0) return;
    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalAmount: cartTotal,
          email: checkoutEmail
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setCheckoutResult({
          orderId: data.orderId,
          trackingNumber: data.trackingNumber
        });
        setCart([]); // Clear cart
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Search handler from navbar
  const handleSearch = (term: string) => {
    alert(`Searching GIA report check and articles library for: "${term}"...`);
  };

  const pageWrapperClass = isLightTheme 
    ? 'bg-[#fcfaf7] text-stone-900 font-sans min-h-screen pt-20 transition-all duration-300' 
    : 'bg-[#0a0807] text-stone-100 font-sans min-h-screen pt-20 transition-all duration-300';

  const headingClass = isLightTheme ? 'text-amber-950 font-serif' : 'text-[#f5f5f4] font-serif';
  const subheadingClass = isLightTheme ? 'text-stone-600' : 'text-stone-400';
  const borderClass = isLightTheme ? 'border-amber-900/10' : 'border-amber-900/15';
  const premiumCardBg = isLightTheme 
    ? 'bg-white border border-stone-200 shadow-sm rounded-3xl p-6 sm:p-8' 
    : 'bg-[#0f0d0a]/80 border border-amber-900/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md';

  return (
    <div className={pageWrapperClass}>
      
      {/* Background Star Particles (Aesthetic Black + Gold Theme) */}
      {!isLightTheme && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-sparkle-slow" />
          <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full animate-sparkle-fast" />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse" />
          <div className="absolute top-1/10 right-1/10 w-1 h-1 bg-amber-550 rounded-full animate-sparkle-slow" />
        </div>
      )}

      {/* Primary Global Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isLightTheme={isLightTheme}
        setIsLightTheme={setIsLightTheme}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        onSearch={handleSearch}
      />

      {/* Main Body Pages router */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div className="space-y-24">
            
            {/* Hero Section */}
            <div className="relative text-center py-16 sm:py-24 space-y-8 max-w-4xl mx-auto">
              
              {/* Animated Floating Gem decor */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-700 p-0.5 shadow-xl shadow-amber-500/10 animate-spin-slow flex items-center justify-center transform transition duration-500 hover:rotate-90">
                <Gem className="h-8 w-8 text-white" />
              </div>

              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-[0.35em] text-amber-500 font-mono">
                  The Sovereign colored gemstone institution
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                  Discover the Beauty of <span className="text-amber-500">Brown Diamonds</span>
                </h1>
                <p className="mt-4 text-base sm:text-xl text-stone-300 font-sans max-w-2.5xl mx-auto leading-relaxed">
                  Learn everything about diamonds, certification, quality, colors, and luxury jewelry. Explore the warm golden matrix of Champagne and deep-amber Cognac stones.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentPage('diamond-types')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-100 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-amber-500/15 cursor-pointer flex items-center justify-center gap-2"
                >
                  Explore Diamonds <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('buying-guide')}
                  className="w-full sm:w-auto px-8 py-4 bg-stone-900 hover:bg-stone-850 text-amber-500 border border-amber-900/40 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Learn the 4Cs <Compass className="h-4 w-4" />
                </button>
              </div>

            </div>

            {/* Interactive Image Gallery slider */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="font-serif text-3xl font-bold text-amber-550 text-amber-500">
                  The Private Vault Portfolio
                </h2>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-mono">
                  Curated custom diamond designs
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden h-96 sm:h-[480px] group border border-amber-950/40">
                <img
                  src={galleryImages[activeGalleryIndex].url}
                  alt={galleryImages[activeGalleryIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Visual Glass overlay card info */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent flex flex-col justify-end">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">
                    {galleryImages[activeGalleryIndex].title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-300 max-w-xl">
                    {galleryImages[activeGalleryIndex].desc}
                  </p>
                  
                  {/* Slider index tags */}
                  <div className="flex gap-2.5 mt-6">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i)}
                        className={`h-1.5 transition-all rounded-full cursor-pointer ${
                          activeGalleryIndex === i ? 'w-8 bg-amber-500' : 'w-2 bg-stone-600 hover:bg-amber-500/50'
                        }`}
                        aria-label={`View slider frame ${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Categories Grid */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className={headingClass}>Featured Gemological Coordinates</h2>
                <p className={`${subheadingClass} mt-2 text-xs uppercase tracking-widest font-mono`}>Comprehensive Education Verticals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    id: 'natural-diamonds',
                    title: 'Natural White',
                    desc: 'Geological pure crystalline carbon erupted 1.5 billion years ago.',
                    href: 'about-diamonds',
                    type: 'natural'
                  },
                  {
                    id: 'brown-diamonds',
                    title: 'Luxe Brown',
                    desc: 'The masterclass on warm, golden parallel crystalline grain deformation.',
                    href: 'brown-diamonds',
                    type: 'brown'
                  },
                  {
                    id: 'lab-grown-diamonds',
                    title: 'Lab-Grown',
                    desc: 'CVD Plasma technological diamonds optically identical to earth mined.',
                    href: 'diamond-types',
                    type: 'lab'
                  },
                  {
                    id: 'champagne-diamonds',
                    title: 'Fancy Colored',
                    desc: 'Vibrant yellow, pink, and majestic orange-brown natural varieties.',
                    href: 'diamond-colors',
                    type: 'fancy'
                  },
                  {
                    id: 'industrial-diamonds',
                    title: 'Industrial Spec',
                    desc: 'Cutting-edge aerospace thermal conductors and drill surfaces.',
                    href: 'diamond-uses',
                    type: 'industrial'
                  }
                ].map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setCurrentPage(cat.href as PageId)}
                    className="p-6 rounded-2xl border border-amber-900/10 bg-[#0f0e0d]/50 hover:bg-amber-950/20 duration-300 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 block mb-1">
                        {cat.type} Category
                      </span>
                      <h4 className="font-serif text-lg font-bold text-stone-250 group-hover:text-amber-500 duration-200">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-stone-450 text-stone-400 mt-2 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-550 uppercase tracking-widest mt-6 group-hover:text-amber-400 duration-200">
                      Explore Spec <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-1 duration-200" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Block */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className={headingClass}>The Global Collector Review</h2>
                <p className={`${subheadingClass} mt-2 text-xs uppercase tracking-widest font-mono`}>Elite diamond curators from around the world</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "The G1-C7 Champagne classification parameters published by Brown Daimond have rewritten my custom ring design strategies. My client loved the rich warmth of C4 honey tones.",
                    author: "Charlotte Du Mond",
                    role: "Creative Jewelry Architect, Paris"
                  },
                  {
                    quote: "An absolute educational masterpiece. Tracing carbon diamond formation down in the mantle of Argyle was described so scientifically. Unbelievably high quality resources.",
                    author: "Dr. Arthur Pendelton",
                    role: "Earth Science Collector, London"
                  },
                  {
                    quote: "Saving $4000 purchasing a 2 carat custom Cognac setting made possible because of their transparent luxury wholesale budget estimate charts. Unmatched integrity.",
                    author: "Vikram Mehta",
                    role: "Collector, Mumbai Salon"
                  }
                ].map((test, idx) => (
                  <div key={idx} className={premiumCardBg}>
                    <div className="flex gap-1 mb-4 text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-stone-300 italic">
                      &ldquo;{test.quote}&rdquo;
                    </p>
                    <div className="border-t border-amber-900/15 pt-4 mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center font-mono text-amber-500 text-xs font-bold">
                        {test.author[0]}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-stone-200">{test.author}</h5>
                        <p className="text-[10px] text-stone-450 text-stone-500">{test.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* PAGE 2: ABOUT DIAMONDS */}
        {currentPage === 'about-diamonds' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>Diamond Science & Geological Formation</h2>
              <p className={subheadingClass}>Explore the ancient high-pressure genesis of deep earth crystals.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-sm leading-relaxed text-stone-300">
                <h3 className="font-serif text-xl text-amber-500 font-bold">1. geological Genesis</h3>
                <p>
                  Every natural diamond represents the pristine crystallization of pure carbon atoms deep within the Earth's mantle, approximately 90 to 120 miles below the surface. These geological ovens operate at temperatures exceeding 2,200° Fahrenheit (1,200°C) with constant physical pressures starting at 725,000 pounds per square inch.
                </p>
                <p>
                  Under these forces, carbon molecules align into an extremely dense isometric-tetrahedral cubic crystal lattice structure. This chemical covalent framework establishes the supreme physics characteristics of diamonds, making them the hardest naturally occurring material on the planet.
                </p>

                <h3 className="font-serif text-xl text-amber-500 font-bold mt-6">2. Volcano Eruptions</h3>
                <p>
                  How do diamonds travel to the surface where they are recovered? They survive rapid vertical volcanic explosions called Kimberlite eruptions. These gas-rich magma pipes blast chunks of ancient crust upwards at speed approaching Mach 2, creating massive, deeply rooted cone formations. This speedy transit is vital—if the diamonds rose slowly, they would convert back into graphite due to pressure release.
                </p>
              </div>

              <div className={premiumCardBg}>
                <h4 className="font-serif text-lg text-amber-500 font-bold mb-4">The Manufacturing Process Journey</h4>
                <div className="space-y-4 text-xs">
                  {[
                    { step: 'A. Recovery extraction', desc: 'Kimberlite ore is systematically blasted or alluvial gravel is sieved with heavy dense media cyclonic gravity separators.' },
                    { step: 'B. Laser Mapping scan', desc: 'Expert cutters analyze raw rough diamond inclusions in 3D using computer tomography to optimize the maximum reflection profile.' },
                    { step: 'C. Laser Cleaving saw', desc: 'Phosphorous bronze rotary saws spinning at 8,000 RPM slicing along precise crystalline boundaries.' },
                    { step: 'D. Girdling Bruting', desc: 'Two diamonds are spun rapidly skin-to-skin, using their friction to mold perfectly circular outer girdles.' },
                    { step: 'E. Blocking Facet polish', desc: 'Placing the fundamental 17 crown and pavilion facets which set the framework for optical brilliance.' }
                  ].map((proc, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="font-mono text-amber-500 font-bold tracking-wider shrink-0">{proc.step}</span>
                      <p className="text-stone-300">{proc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: SPECIALIZED BROWN DIAMONDS */}
        {currentPage === 'brown-diamonds' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Majestic Universe of Brown Diamonds</h2>
              <p className={subheadingClass}>Understand Champagne, Cognac, and Chocolate color classifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Champagne Diamonds', 
                  grades: 'C1 - C4 Argyle scale', 
                  desc: 'Soft golden honey, straw, and yellow-wheat highlights. These stones return immense sparkles while showing delightful organic warmth. They look magical mounted in 18K yellow gold settings.' 
                },
                { 
                  name: 'Cognac Diamonds', 
                  grades: 'C5 - C7 Argyle scale', 
                  desc: 'Deep warm amber, burnt copper, and red-orange flashes. Highly saturated, brooding, and extremely popular for statement rings and custom design cufflinks because of their undeniable commanding depth.' 
                },
                { 
                  name: 'Chocolate Diamonds', 
                  grades: 'Trademarked Commercial Designation', 
                  desc: 'Medium-dark saturated brown tones popular in national jewelry brands. They pair brilliantly with modern Rose Gold which amplifies their natural copper-rich color molecules.' 
                }
              ].map((b, idx) => (
                <div key={idx} className={premiumCardBg}>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center font-mono text-amber-500 font-bold mb-4">
                    C{idx + 1}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-100">{b.name}</h4>
                  <span className="text-[10px] font-mono font-bold text-amber-500 tracking-wider uppercase block mt-1">{b.grades}</span>
                  <p className="text-xs text-stone-300 mt-3 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className={premiumCardBg}>
              <h4 className="font-serif text-lg text-amber-550 text-amber-500 font-bold mb-4">What Determines the Natural Origin of Brown?</h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
                Unlike nitrogen-caused yellow diamonds or boron-caused blue diamonds, brown diamonds owe their warm tones to a physical marvel: **plastic deformation**. Over structural geological epochs, tectonic compression forces slipped parallel sheets of carbon atoms within the diamond lattice. This atomic shift created graining lines that absorb blue light wavelengths, leaving our eyes to marvel at spectacular amber, gold, and brunette frequencies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-xs text-stone-400">
                <div className="p-4 rounded-xl bg-stone-900 border border-amber-900/10">
                  <span className="text-amber-500 font-mono font-bold uppercase tracking-wider block">Relative price valuation</span>
                  <span>Generally 30% to 40% less expensive than standard white geological diamonds of comparable size. Great for larger carats!</span>
                </div>
                <div className="p-4 rounded-xl bg-stone-900 border border-amber-900/10">
                  <span className="text-amber-500 font-mono font-bold uppercase tracking-wider block">Luxury Fashion Trends</span>
                  <span>Modern jewelers (such as Tiffany, Buccellati, Cartier) increasingly specify high-C7 Cognac stones for specialized collection sets.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: DIAMOND TYPES */}
        {currentPage === 'diamond-types' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>Diamond Growth Origin Types</h2>
              <p className={subheadingClass}>Natural Earth Mined vs Plasma Laboratory Grown.</p>
            </div>

            <ComparisonTool isLightTheme={isLightTheme} />
          </div>
        )}

        {/* PAGE 5: SHAPES & CUTS */}
        {currentPage === 'shapes-cuts' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Architecture of Facet Shapes</h2>
              <p className={subheadingClass}>Understand standard mathematical cutting formats.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DIAMOND_SHAPES.map((sh) => (
                <div key={sh.id} className={`${premiumCardBg} flex flex-col sm:flex-row gap-6 items-center`}>
                  <div className="w-full sm:w-1/3 h-44 rounded-2xl overflow-hidden bg-stone-900">
                    <img src={sh.imageUrl} alt={sh.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-serif text-lg font-bold text-amber-500">{sh.name}</h4>
                    <p className="text-xs text-stone-350 text-stone-350 text-stone-350 text-stone-300 leading-relaxed">{sh.description}</p>
                    <div className="text-[11px] font-mono text-stone-400 space-y-1 pt-2">
                      <p><span className="text-stone-500">Reflective Fire:</span> {sh.brilliance}</p>
                      <p><span className="text-stone-550 text-stone-500">Optimal Setting:</span> {sh.bestFor}</p>
                      <p><span className="text-stone-500 font-sans italic">&ldquo;{sh.history}&rdquo;</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 6: DIAMOND COLORS */}
        {currentPage === 'diamond-colors' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>Colored Grading (D-Z vs Champagne Scales)</h2>
              <p className={subheadingClass}>Demystifying how nitrogen and lattice slip define the colors.</p>
            </div>

            <div className="space-y-6">
              {DIAMOND_COLORS.map((col, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-[#0f0d0a]/60 border border-amber-900/10">
                  <div className="w-16 h-16 rounded-xl shadow-md border border-stone-800 flex items-center justify-center shrink-0 font-mono text-xs font-bold" style={{ backgroundColor: col.colorHex, color: idx <= 2 ? '#1c1917' : '#fafafa' }}>
                    {col.grade}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif text-base font-bold text-amber-500">{col.name}</h4>
                    <p className="text-xs text-stone-300 leading-relaxed">{col.description}</p>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 inline-block font-bold">Estimated Market Adjustment: {col.marketPremium}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 7: CLARITY GUIDE */}
        {currentPage === 'clarity-guide' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Diamond Clarity Standard</h2>
              <p className={subheadingClass}>How microscopic crystal inclusions are scientific identifiers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {DIAMOND_CLARITY_LEVELS.map((lvl, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-900/60 border border-amber-900/10 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-amber-550 text-amber-500 text-sm font-mono font-bold">{lvl.grade}</strong>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500">{lvl.premiumStatus}</span>
                    </div>
                    <p className="text-stone-300 font-serif font-bold text-stone-200 mt-1">{lvl.name}</p>
                    <p className="text-stone-400 mt-2 leading-relaxed">{lvl.description}</p>
                    <p className="text-[10.5px] font-mono text-stone-500 mt-1.5"><span className="text-stone-505">Laboratory Rarity:</span> {lvl.rarity}</p>
                  </div>
                ))}
              </div>

              <div className={premiumCardBg}>
                <h4 className="font-serif text-lg text-amber-500 font-bold mb-4">Understanding Blemishes vs. Inclusions</h4>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Clarity is graded under a highly standardized **10x binocular stereomicroscope** by GIA gemologists. Any flaws enclosed *inside* the gemstone lattice are termed "Inclusions", whereas imperfections limited to the *outside* facet planes are classified as "Blemishes".
                </p>
                <div className="space-y-3.5 text-xs">
                  <p><span className="text-amber-500 font-bold">Pinpoint:</span> A tiny enclosed mineral crystal (often olivine or diamond itself) resembling a star speck.</p>
                  <p><span className="text-amber-500 font-bold">Feather:</span> A microscopic structural fracture plane within the diamond lattice which can catch light reflection.</p>
                  <p><span className="text-amber-500 font-bold">Cloud:</span> A cluster of extremely tiny micro-pinpoints situated closely together resembling hazy gray patterns.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 8: CERTIFICATION */}
        {currentPage === 'certification' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Diamond Certification Audit</h2>
              <p className={subheadingClass}>How leading laboratories verify chemical authenticity and grades.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'GIA',
                  fullname: 'Gemological Institute of America',
                  origin: 'Carlsbad, California',
                  desc: 'The global gold standard of gemology. Creator of the 4Cs. Their grading is the most conservative and globally trusted, commanding high premium evaluations.'
                },
                {
                  name: 'IGI',
                  fullname: 'International Gemological Institute',
                  origin: 'Antwerp, Belgium',
                  desc: 'The leading lab for technological Lab-Grown certified reports. Extremely fast high-precision evaluations supporting modern jewelry brands.'
                },
                {
                  name: 'HRD Antwerp',
                  fullname: 'Hoge Raad voor Diamant',
                  origin: 'Antwerp, Belgium',
                  desc: 'Highly esteemed official European standard organization certifying diamonds. Legendary precision since 1973 focusing heavily on cut parameters.'
                }
              ].map((lab, idx) => (
                <div key={idx} className={premiumCardBg}>
                  <Award className="h-8 w-8 text-amber-500 mb-4 animate-bounce" />
                  <h4 className="font-serif text-lg font-bold text-stone-100">{lab.name}</h4>
                  <span className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider block mt-1">{lab.fullname}</span>
                  <p className="text-xs text-stone-350 text-stone-300 mt-3 leading-relaxed">{lab.desc}</p>
                  <div className="pt-4 border-t border-amber-900/10 mt-4 text-[10px] font-mono text-stone-500">
                    Liaison Headquarter: {lab.origin}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
              <h4 className="font-serif text-sm font-bold text-amber-500 mb-2">How to Verify Authenticity Steps:</h4>
              <ul className="list-decimal list-inside text-xs leading-relaxed text-stone-350 text-stone-300 space-y-2">
                <li>Check the diamond girdle plane with a 30x professional jewelers loupe to locate the GIA Serial laser etching.</li>
                <li>Visit the GIA Report Check portal (reportcheck.gia.edu) and input the serial index code.</li>
                <li>Confirm the digital plotting diagram of inclusions matches the physical inclusions map of the stone perfectly.</li>
              </ul>
            </div>
          </div>
        )}

        {/* PAGE 9: BUYING GUIDE */}
        {currentPage === 'buying-guide' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Smarter Diamond Buying Guide</h2>
              <p className={subheadingClass}>Maximize your purchase budget utilizing interactive scientific selections.</p>
            </div>

            <Interactive4Cs isLightTheme={isLightTheme} />

            <div className="p-8 rounded-3xl bg-[#0f0d0a]/60 border border-amber-900/10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-amber-500 font-bold">Smart Spec Optimizations</h4>
                <div className="space-y-3.5 text-xs text-stone-300 leading-relaxed">
                  <p><strong className="text-amber-500 block mb-0.5">Avoid 1.0 or 2.0 exactly:</strong> Diamonds priced exponentially jump exactly at round caret metrics. Save up to 25% by selecting a **0.93 carat or 1.91 carat** specimen—virtually identical face-up but mathematically cheaper!</p>
                  <p><strong className="text-amber-500 block mb-0.5">Cut is Absolute King:</strong> A diamond with perfect clarity will look flat if poorly sliced. Always demand **Excellent or Ideal cut** to optimize sparkle dispersion.</p>
                </div>
              </div>
              <DiamondCalculator isLightTheme={isLightTheme} />
            </div>
          </div>
        )}

        {/* PAGE 10: USES */}
        {currentPage === 'diamond-uses' && (() => {
          // Dynamic calculation constants for custom builder
          const selectedDiamond = COMPARABLE_DIAMONDS.find(d => d.id === customSpecimenId) || COMPARABLE_DIAMONDS[0];
          
          let mountCost = 1200;
          let styleName = 'Solitaire Ring';
          let stylePhoto = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600';
          
          if (customStyle === 'necklace') {
            mountCost = 3500;
            styleName = 'Tennis Eternity Necklace';
            stylePhoto = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600';
          } else if (customStyle === 'earrings') {
            mountCost = 1800;
            styleName = 'Fine Stud Earrings';
            stylePhoto = 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600';
          } else if (customStyle === 'bracelet') {
            mountCost = 2500;
            styleName = 'Symmetric Eternity Bracelet';
            stylePhoto = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600';
          } else if (customStyle === 'pendant') {
            mountCost = 1000;
            styleName = 'Classic Halo Pendant';
            stylePhoto = 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600';
          }

          let metalLabel = '18K Rose Gold';
          if (customMetal === 'yellow_gold') metalLabel = '18K Yellow Gold';
          else if (customMetal === 'white_gold') metalLabel = '18K White Gold';
          else if (customMetal === 'platinum') metalLabel = '950 Platinum';

          const totalCost = selectedDiamond.price + mountCost;

          // Custom expert recommendation engine
          const getBespokeAdvice = () => {
            const isChampagne = selectedDiamond.colorGrade.startsWith('C') && parseInt(selectedDiamond.colorGrade[1]) <= 4;
            const isCognac = selectedDiamond.colorGrade.startsWith('C') && parseInt(selectedDiamond.colorGrade[1]) >= 5;
            const isColorless = ['D', 'E', 'F'].includes(selectedDiamond.colorGrade[0]);

            if (isCognac && customMetal === 'rose_gold') {
              return "✨ Master Pairing: Saturated cognac gems set in 18K Rose Gold trigger a deeply harmonious, copper-crimson visual flame. Highly recommended by our senior gemstone curators.";
            }
            if (isChampagne && customMetal === 'yellow_gold') {
              return "⭐ Gold Rush: Setting champagne honey tones in 18K Yellow Gold maximizes the color saturation, turning the diamond body into a rich, golden-wheat halo.";
            }
            if (isColorless && (customMetal === 'white_gold' || customMetal === 'platinum')) {
              return "❄️ Mirror Reflection: Colorless flawless stones in Platinum reflect the raw, cold dispersion rays without refracting unwanted warm metal hue tinting.";
            }
            if (isCognac && (customMetal === 'white_gold' || customMetal === 'platinum')) {
              return "⚖️ Modern Contrast: White high-reflectivity precious alloys elevate the warm chocolate depths of Cognac diamonds, producing a bold, contemporary Art Deco look.";
            }
            return "💎 Curator Tip: Champagne and Cognac diamonds are best matched with warm gold bases, while colorless specimens command white metal mounts to emphasize absolute cold crystalline refraction.";
          };

          const handleAddCustomSuite = () => {
            const productItem: ProductItem = {
              id: `bespoke-${Date.now()}`,
              name: `${selectedDiamond.name} Bespoke ${styleName} (${metalLabel})`,
              price: totalCost,
              carat: selectedDiamond.carat,
              cut: selectedDiamond.cut,
              color: selectedDiamond.color,
              clarity: selectedDiamond.clarity,
              certification: selectedDiamond.certification,
              type: selectedDiamond.colorGrade.startsWith('C') 
                ? (parseInt(selectedDiamond.colorGrade[1]) >= 5 ? 'Cognac' : 'Champagne') 
                : 'Natural',
              imageUrl: stylePhoto
            };
            addToCart(productItem);
            setIsBespokeAdded(true);
            setTimeout(() => {
              setIsBespokeAdded(false);
            }, 2500);
          };

          const handleWishlistCustomSuite = () => {
            const productItem: ProductItem = {
              id: `bespoke-${Date.now()}`,
              name: `${selectedDiamond.name} Bespoke ${styleName} (${metalLabel})`,
              price: totalCost,
              carat: selectedDiamond.carat,
              cut: selectedDiamond.cut,
              color: selectedDiamond.color,
              clarity: selectedDiamond.clarity,
              certification: selectedDiamond.certification,
              type: selectedDiamond.colorGrade.startsWith('C') 
                ? (parseInt(selectedDiamond.colorGrade[1]) >= 5 ? 'Cognac' : 'Champagne') 
                : 'Natural',
              imageUrl: stylePhoto
            };
            addToWishlist(productItem);
          };

          const usesTitleColor = isLightTheme ? 'text-amber-950 font-serif' : 'text-amber-400 font-serif';

          return (
            <div className="space-y-16 animate-fade-in">
              {/* Header */}
              <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <Compass className="h-4.5 w-4.5 text-amber-500 animate-spin-slow" />
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-500 font-bold block">
                    Style, Artistry & Application
                  </span>
                </div>
                <h2 className={headingClass}>The Multi-Spectral Uses of Diamonds</h2>
                <p className={subheadingClass}>Explore the majestic transformation of raw carbon into elite customized high jewelry and cutting-edge extreme science.</p>
              </div>

              {/* SECTION 1: Luxury Jewelry Settings Showcase */}
              <div className="space-y-8">
                <div className="space-y-1">
                  <h3 className={`text-2xl font-bold ${usesTitleColor}`}>
                    1. High-Precision Fine Jewelry Usages
                  </h3>
                  <p className="text-xs text-stone-400">
                    With an incomparable refractive index of 2.417 and dispersion density of 0.044, diamonds split light rays into breathtaking rainbow fires.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Photo Card 1: Rings */}
                  <div className={`overflow-hidden rounded-2xl border group flex flex-col justify-between ${premiumCardBg}`}>
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400" 
                        alt="Solitaire Ring" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/40" />
                    </div>
                    <div className="p-4 space-y-2">
                      <strong className="text-amber-500 font-serif text-sm block">Solitaire Engagement Rings</strong>
                      <p className="text-[11px] leading-relaxed text-stone-400">
                        The ultimate romantic setting that lets light flood the stone from every diagonal plane, accentuating center-stone clarity.
                      </p>
                    </div>
                  </div>

                  {/* Photo Card 2: Necklaces */}
                  <div className={`overflow-hidden rounded-2xl border group flex flex-col justify-between ${premiumCardBg}`}>
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400" 
                        alt="Eternity Necklace" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/40" />
                    </div>
                    <div className="p-4 space-y-2">
                      <strong className="text-amber-500 font-serif text-sm block">Eternity Tennis Necklaces</strong>
                      <p className="text-[11px] leading-relaxed text-stone-400">
                        Uniform graduated strands designed to lay softly against the chest, casting continuous reflective halos with every movement.
                      </p>
                    </div>
                  </div>

                  {/* Photo Card 3: Earrings */}
                  <div className={`overflow-hidden rounded-2xl border group flex flex-col justify-between ${premiumCardBg}`}>
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=400" 
                        alt="Earrings" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/40" />
                    </div>
                    <div className="p-4 space-y-2">
                      <strong className="text-amber-500 font-serif text-sm block">Fine Drop & Stud Earrings</strong>
                      <p className="text-[11px] leading-relaxed text-stone-400">
                        Meticulously matched twin crystals aligned perfectly in symmetric four-prong baskets for maximum light return.
                      </p>
                    </div>
                  </div>

                  {/* Photo Card 4: Bracelets */}
                  <div className={`overflow-hidden rounded-2xl border group flex flex-col justify-between ${premiumCardBg}`}>
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" 
                        alt="Bracelet" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/40" />
                    </div>
                    <div className="p-4 space-y-2">
                      <strong className="text-amber-500 font-serif text-sm block">Symmetric Eternity Bracelets</strong>
                      <p className="text-[11px] leading-relaxed text-stone-400">
                        Flexible masterfully-linked links lined with certified diamonds, flowing dynamically around the wrist with effortless grace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: The Bespoke Styling & Design Chamber */}
              <div className={`p-6 sm:p-8 rounded-3xl border ${premiumCardBg} space-y-8`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold block">
                      Exquisite Digital Atelier
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-400 mt-1">
                      The Virtual Custom Mount Studio
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      Integrate one of our private vault specimens into a luxury mount. Check real-time pricing and metal pairings.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" /> 1-on-1 Masterpiece Builder
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Selector Controls */}
                  <div className="space-y-6">
                    {/* Controls Grid */}
                    <div className="space-y-4">
                      {/* Control 1: Select Diamond Specimen */}
                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-wider text-stone-450 block mb-2 font-mono">
                          1. Select Certified Diamond Specimen
                        </label>
                        <select
                          value={customSpecimenId}
                          onChange={(e) => setCustomSpecimenId(e.target.value)}
                          className={`w-full px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 border ${
                            isLightTheme ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-stone-950 border-amber-900/20 text-stone-100'
                          }`}
                        >
                          {COMPARABLE_DIAMONDS.map((spec) => (
                            <option key={spec.id} value={spec.id}>
                              {spec.name} ({spec.carat.toFixed(2)}ct {spec.colorGrade} {spec.clarity}) — ${spec.price.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Control 2: Select Style / Structure */}
                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-wider text-stone-450 block mb-2 font-mono">
                          2. Select Jewelry Mount Mounting Style
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {([
                            { id: 'ring', label: 'Ring', price: 1200 },
                            { id: 'necklace', label: 'Necklace', price: 3500 },
                            { id: 'earrings', label: 'Earrings', price: 1800 },
                            { id: 'bracelet', label: 'Bracelet', price: 2500 },
                            { id: 'pendant', label: 'Pendant', price: 1000 }
                          ] as const).map((style) => (
                            <button
                              key={style.id}
                              onClick={() => setCustomStyle(style.id)}
                              className={`py-2 px-2 text-[10px] font-semibold tracking-wider font-mono uppercase rounded-xl border cursor-pointer text-center flex flex-col items-center justify-center transition-all ${
                                customStyle === style.id
                                  ? 'bg-amber-600 border-amber-600 text-stone-100'
                                  : isLightTheme
                                    ? 'bg-white border-stone-205 hover:bg-amber-500/5 hover:border-amber-900/20 text-stone-700'
                                    : 'bg-stone-950 border-amber-900/10 hover:bg-amber-500/5 text-stone-300'
                              }`}
                            >
                              <span>{style.label}</span>
                              <span className="text-[8px] opacity-70 mt-0.5">+${style.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Control 3: Select Precious Metal Base */}
                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-wider text-stone-450 block mb-2 font-mono">
                          3. Select Premium Metal Alloy Base
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'rose_gold', label: '18K Rose Gold', color: 'bg-[#eccbb2] border-amber-900/30' },
                            { id: 'yellow_gold', label: '18K Yellow Gold', color: 'bg-[#ebdfb5] border-amber-950/30' },
                            { id: 'white_gold', label: '18K White Gold', color: 'bg-[#e5e5e0] border-amber-900/30' },
                            { id: 'platinum', label: '950 Platinum', color: 'bg-[#dfdfdf] border-neutral-300' }
                          ].map((metal) => (
                            <button
                              key={metal.id}
                              onClick={() => setCustomMetal(metal.id as any)}
                              className={`p-2 rounded-xl text-[10px] font-bold text-center border cursor-pointer font-sans transition-all flex items-center justify-center gap-1.5 ${
                                customMetal === metal.id
                                  ? 'bg-amber-500/15 border-amber-550 border-2 text-amber-500'
                                  : isLightTheme
                                    ? 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                                    : 'bg-stone-950 border-amber-900/10 hover:bg-stone-900 text-stone-305'
                              }`}
                            >
                              <span className={`w-3 h-3 rounded-full shrink-0 ${metal.color}`} />
                              <span>{metal.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Advisor Box */}
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 text-[11px] leading-relaxed text-stone-300 font-sans">
                      {getBespokeAdvice()}
                    </div>

                    {/* Costing Breakdowns */}
                    <div className="p-4 rounded-xl bg-stone-950/50 border border-amber-900/5 space-y-2 text-[11.5px] font-mono text-stone-400">
                      <div className="flex justify-between">
                        <span>Loose Diamond ({selectedDiamond.name}):</span>
                        <span className="font-bold text-stone-200">${selectedDiamond.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-stone-450">
                        <span>Bespoke Mounting fabrication:</span>
                        <span className="font-bold text-stone-200">+ ${mountCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-amber-900/10 pt-2 text-sm text-stone-200">
                        <span className="font-serif">Estimated Retail Luxury Suite Total:</span>
                        <strong className="text-amber-400 text-base font-bold">${totalCost.toLocaleString()} USD</strong>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleAddCustomSuite}
                        disabled={isBespokeAdded}
                        className={`flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-stone-100 font-sans text-xs uppercase tracking-widest font-bold rounded-xl cursor-pointer duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-75`}
                      >
                        {isBespokeAdded ? (
                          <>
                            <Check className="h-4.5 w-4.5 text-emerald-400" /> Custom Suite Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-4.5 w-4.5" /> Acquire Custom Built Suite
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleWishlistCustomSuite}
                        className="p-3 bg-stone-900 border border-amber-900/15 rounded-xl hover:bg-stone-900/80 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="Save Bespoke Build to Private Wishlist"
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup Showcase Sheet */}
                  <div className="flex flex-col justify-between rounded-2xl border border-amber-900/15 bg-stone-950/40 overflow-hidden min-h-[460px] relative group shadow-inner">
                    {/* Primary Jewelry Render Container */}
                    <div className="relative h-64 w-full overflow-hidden bg-stone-900">
                      <img 
                        src={stylePhoto} 
                        alt="Bespoke Jewelry Custom Setting Rendering" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />
                      
                      {/* Floating Specimen Holographic Watermark */}
                      <div className="absolute top-4 left-4 p-3.5 bg-stone-950/80 rounded-xl border border-amber-900/20 backdrop-blur-sm max-w-xs space-y-1">
                        <span className="text-[8.5px] uppercase font-mono tracking-widest font-bold text-amber-500 block">
                          Incorporated Center Stone
                        </span>
                        <h4 className="font-serif text-[11px] font-bold text-stone-100 truncate">
                          {selectedDiamond.name}
                        </h4>
                        <div className="flex justify-between text-[9px] font-mono text-stone-400 gap-4">
                          <span>{selectedDiamond.carat} ct | {selectedDiamond.colorGrade} | {selectedDiamond.clarity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rendering Specification Metadata Certificate Sheet */}
                    <div className="p-4 sm:p-6 bg-stone-950 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#cf7d31] font-bold">
                            Official Design Spec Sheet — Vault Built
                          </span>
                          <h4 className="font-serif text-base font-bold text-stone-105 text-stone-200 mt-1">
                            Bespoke Diamond {styleName} Concept
                          </h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-[9px] font-mono tracking-widest text-amber-400 font-bold uppercase shrink-0">
                          {selectedDiamond.certification} Serialized
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-mono text-stone-400 border-t border-amber-900/10 pt-3">
                        <p className="flex justify-between"><span className="text-stone-500">Center Carat:</span> <span className="font-bold text-stone-200 font-mono">{selectedDiamond.carat} ct</span></p>
                        <p className="flex justify-between"><span className="text-stone-500">Precious Metal:</span> <span className="font-bold text-stone-200">{metalLabel}</span></p>
                        <p className="flex justify-between"><span className="text-stone-500">Center Cut:</span> <span className="font-bold text-stone-200 font-mono">{selectedDiamond.cut}</span></p>
                        <p className="flex justify-between"><span className="text-stone-450">Diamond Grade:</span> <span className="font-bold text-stone-200 font-mono">{selectedDiamond.colorGrade} ({selectedDiamond.clarity})</span></p>
                        <p className="flex justify-between"><span className="text-stone-550">Mount Frame:</span> <span className="font-bold text-stone-205 text-stone-200">{customStyle.toUpperCase()} SET</span></p>
                        <p className="flex justify-between"><span className="text-stone-550">Transit Insured:</span> <span className="font-bold text-amber-500">Yes via Armoured Carrier</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Industrial, Aerospace & Quantum Computing */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className={`text-2xl font-bold ${usesTitleColor}`}>
                    2. Aerospace, Semiconductors & Quantum Sciences
                  </h3>
                  <p className="text-xs text-stone-400">
                    Diamonds transcend absolute luxury — they are the super-material of the modern scientific horizon, facilitating key technical quantum performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Quantum */}
                  <div className={`p-5 rounded-2xl border space-y-3.5 ${premiumCardBg}`}>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <strong className="text-amber-500 font-serif text-sm block">1. Quantum Computing Qubits</strong>
                    <p className="text-xs text-stone-405 text-stone-300 leading-relaxed font-sans">
                      Nitrogen-Vacancy (NV) centers inside specialized synthetic diamonds create isolated electronic spin states capable of operating as high-coherence qubits. These serve in quantum cryptography, room-temperature computing hubs, and deep-matter subatomic magnetometers.
                    </p>
                  </div>

                  {/* Card 2: Thermal */}
                  <div className={`p-5 rounded-2xl border space-y-3.5 ${premiumCardBg}`}>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-amber-500" />
                    </div>
                    <strong className="text-amber-500 font-serif text-sm block">2. High-Frequency Thermal Management</strong>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      With a thermal conductivity of **2200 W/(m·K)** — over five times greater than pure chemical copper — synthetic CVD diamond layers act as state-of-the-art heat spreaders inside semiconductor chips, high-intensity laser tubes, and super-transistor amplifiers.
                    </p>
                  </div>

                  {/* Card 3: Optics */}
                  <div className={`p-5 rounded-2xl border space-y-3.5 ${premiumCardBg}`}>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Star className="h-5 w-5 text-amber-500" />
                    </div>
                    <strong className="text-amber-500 font-serif text-sm block">3. Heavy-Duty Optical & Cutting</strong>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      Diamond drill segments, laser exit windows, and high-intensity extreme environment infrared optics leverage diamonds to survive huge temperature pressures, deep subsea crust boring, aerospace flight friction, and abrasive high-atmosphere radiation blocks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* PAGE 11: BLOG */}
        {currentPage === 'blog' && (
          <div className="space-y-12 animate-fade-in">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Chronicle of Diamonds</h2>
              <p className={subheadingClass}>Read contemporary analyses on geological, investment, and fashion aspects of diamonds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {COMPREHENSIVE_BLOGS.map((post) => (
                <div key={post.id} className={`${premiumCardBg} flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    <div className="h-52 rounded-xl overflow-hidden bg-stone-900">
                      <img src={post.imageUrl} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500 block font-bold">{post.category}</span>
                    <h4 className="font-serif text-lg font-bold text-stone-100 hover:text-amber-500 duration-200 cursor-pointer">
                      {post.title}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-amber-900/10 mt-6 flex justify-between items-center text-[10px] font-mono text-stone-500">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Private Catalog Display in case of ecomm exploration */}
            <div className="pt-10 border-t border-amber-900/15">
              <EcommerceSection
                isLightTheme={isLightTheme}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                wishlistIds={wishlist.map(p => p.id)}
                openCart={() => setIsCartOpen(true)}
                openWishlist={() => setIsWishlistOpen(true)}
              />
            </div>
          </div>
        )}

        {/* PAGE 12: FAQ */}
        {currentPage === 'faq' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>Frequently Asked Questions Handbook</h2>
              <p className={subheadingClass}>Explore instant scientific answers verified by our gemological council.</p>
            </div>

            {/* Accordion List */}
            <div className="max-w-3xl mx-auto space-y-4">
              {EDUCATION_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className="rounded-xl border border-amber-905/10 bg-stone-900/40 border-amber-900/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left font-serif text-sm sm:text-base font-bold text-amber-500/90 hover:text-amber-400 transition-colors flex justify-between items-center"
                    >
                      <span>{faq.question}</span>
                      <span className="text-xs font-mono font-bold text-amber-600">{isOpen ? '▼' : '►'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-amber-900/10 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PAGE 13: CONTACT US */}
        {currentPage === 'contact' && (
          <div className="space-y-12">
            <div className="border-b border-amber-900/10 pb-6 max-w-3xl">
              <h2 className={headingClass}>The Private Liaison Council</h2>
              <p className={subheadingClass}>Reserve private consultation chambers in London Mayfair or Western Australia.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-sans">
              
              {/* Form Block */}
              <div className={premiumCardBg}>
                <h4 className="font-serif text-lg text-amber-500 font-bold mb-4">Book Private Viewing/Appointment</h4>
                {isBooked ? (
                  <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-3">
                    <Check className="h-10 w-10 text-emerald-500 mx-auto" />
                    <p className="font-serif text-lg font-bold text-amber-400">Appointment Provisioned</p>
                    <p className="text-xs text-stone-300">An invitation ticket with e-courier credentials has been dispatched to yours.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setIsBooked(true); }} className="space-y-4 text-xs text-stone-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Your Full Name</label>
                        <input type="text" required value={bookingName} onChange={(e) => setBookingName(e.target.value)} className="w-full p-2.5 rounded-lg bg-stone-900 border border-amber-900/20 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Email Address</label>
                        <input type="email" required value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} className="w-full p-2.5 rounded-lg bg-stone-900 border border-amber-900/20 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Preferred viewing lounge</label>
                      <select value={bookingLounge} onChange={(e) => setBookingLounge(e.target.value)} className="w-full p-2.5 rounded-lg bg-stone-900 border border-amber-900/20 focus:outline-none">
                        <option>Mayfair Luxury District, London</option>
                        <option>Argyle Corporate Liaison, Sydney</option>
                        <option>CVD Laboratory tour, Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Viewing Target Appointment Date</label>
                      <input type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full p-2.5 rounded-lg bg-stone-900 border border-amber-900/20 focus:outline-none text-stone-350" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-500 font-bold uppercase tracking-wider text-white text-[10px] rounded-xl cursor-pointer">
                      Lock Private Appoint Slot
                    </button>
                  </form>
                )}
              </div>

              {/* Subject Liaison Details */}
              <div className="space-y-6 text-sm text-stone-300 leading-relaxed">
                <div className="flex gap-4 items-start">
                  <MapPin className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h5 className="font-serif text-base text-stone-200 font-bold">1. Mayfair London Vault Lounge</h5>
                    <p className="text-xs text-stone-400 mt-1">42 Bond Street, Mayfair, London W1S 2UR, United Kingdom</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h5 className="font-serif text-base text-stone-200 font-bold">2. Direct Telephone Line</h5>
                    <p className="text-xs text-stone-400 mt-1">Liaison Desk: +44 20 7946 0958 (Mon-Sat 10 AM - 6 PM GMT)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h5 className="font-serif text-base text-stone-200 font-bold">3. Primary Support Liaison</h5>
                    <p className="text-xs text-amber-500 mt-1">support@browndaimond.com</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PAGE 14: PRIVACY POLICY */}
        {currentPage === 'privacy-policy' && (
          <div className="space-y-12 animate-fade-in max-w-4xl mx-auto font-sans">
            <div className="border-b border-amber-900/10 pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">DATA PRIVACY & COMPLIANCE</span>
              <h2 className={headingClass}>Privacy Policy & Ad Disclosure Charter</h2>
              <p className={subheadingClass}>Last Updated: May 22, 2026. This policy describes how we collect, store, and utilize user telemetry data.</p>
            </div>

            <div className="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                <h4 className="font-serif text-amber-500 font-bold text-sm">Google AdSense Third-Party Cookie Disclosure</h4>
                <p>
                  This website utilizes Google AdSense and other third-party vendor marketing protocols. Please read carefully:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-400">
                  <li><strong>Third-Party Vendors:</strong> Google, as a third-party advertising vendor, uses tracking cookies to serve ads on this application based on your visits here and other web domains.</li>
                  <li><strong>The DoubleClick DART Cookie:</strong> Google's use of the DART cookie enables it and its advertising partners to serve customized ads to you based on your browsing pattern data.</li>
                  <li><strong>Opting Out:</strong> You can opt out of the use of specialized DART or personalized advertising cookies by visiting the Google Ad Settings page or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline inline-flex items-center gap-1">Ad Choices Portal <ExternalLink className="h-3 w-3" /></a>.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">1. Information Collection and Telemetry Logs</h3>
                <p>
                  We follow a standard procedure of utilizing server log files. These files automatically log visitors when they access this educational portal. The information analyzed includes Internet Protocol (IP) addresses, browser brand types, Internet Service Provider (ISP), date/time stamps, referring or exit pages, and cumulative click coordinate volumes. These details are not linked to any personally identifiable elements.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">2. Cookies, Web Beacons & Ad Serving</h3>
                <p>
                  Like any other website, our platform utilizes "cookies" to store tracking indicators including visitor preferences, site customization settings, and pages visited. We utilize this to tailor educational features and optimize your experience. Third-party ad servers also inject customized script technologies (like JavaScript or Beacons) which are sent directly to your web browser. They automatically retrieve your IP address when serving advertisements to measure ad campaign efficiency.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">3. GDPR Consent & CCPA Compliance</h3>
                <p>
                  Under international digital privacy mandates (including European General Data Protection Regulation and California Consumer Privacy Act), users are entitled to the following rights:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-900 border border-amber-900/10">
                    <strong className="text-amber-500 block mb-1">European GDPR Rights</strong>
                    <ul className="list-disc list-inside space-y-1 text-stone-400 text-xs">
                      <li>Right to access personal records</li>
                      <li>Right to file a rectification edit</li>
                      <li>Right to request data deletion/erasure</li>
                      <li>Right to request data portability</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-900 border border-amber-900/10">
                    <strong className="text-amber-500 block mb-1">CCPA California Opt-Out</strong>
                    <ul className="list-disc list-inside space-y-1 text-stone-400 text-xs">
                      <li>Right to know what data is captured</li>
                      <li>Right to request personal data deletion</li>
                      <li>Right to explicitly ban sales of data</li>
                      <li>Right of non-discriminatory service</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">4. Data Protection Liaison</h3>
                <p>
                  If you have detailed queries or wish to request immediate removal of cached local data sessions or cookies, please reach our Data Protection Officer immediately at <a href="mailto:privacy@browndaimond.com" className="text-amber-500 hover:underline">privacy@browndaimond.com</a>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 15: TERMS OF SERVICE */}
        {currentPage === 'terms-of-service' && (
          <div className="space-y-12 animate-fade-in max-w-4xl mx-auto font-sans text-stone-300">
            <div className="border-b border-amber-900/10 pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">LEGAL TERMS AGREEMENT</span>
              <h2 className={headingClass}>Terms of Service Charter</h2>
              <p className={subheadingClass}>Last Revised: May 22, 2026. Please read this terms of service agreement carefully before exploring our digital catalog.</p>
            </div>

            <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">1. Agreement to Terms & Conditions</h3>
                <p>
                  By accessing the digital portals, tools, GIA report checkers, and calculators hosted on this platform, you agree to be bound by our standard Terms of Service, licensing charters, and international regulations. If you do not agree, you are restricted from using this site.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">2. Educational & Simulation Disclaimer</h3>
                <p>
                  This portal operates as a luxury jewelry educational source. All diamond calculations, price factor projections, and GIA API data logs provided by our algorithms are verified educational assessments. While we strive for extreme diamond grading accuracy, our simulated prices reflect indicative market estimations rather than legal binding retail offers unless directly authorized in a written purchase invoice.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">3. Intellectual Property Protections</h3>
                <p>
                  The original literary texts, interactive calculators, custom-layered cognac color rendering algorithms, mock-up visual builders, and logos are the exclusive property of we and are protected under international copyright regulations. No portion of this site may be duplicated or reverse-engineered for external corporate gain.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">4. User Conduct Guidelines</h3>
                <p>
                  Users may not engage in denial-of-service blockages, scrap materials or blog texts via headless bots, or feed malicious query script injections to our integrated Liaison chatbot. Failure to adhere results in IP blockages and reporting to law enforcement portals.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">5. Governing Law</h3>
                <p>
                  These agreements are governed exclusively under the laws of the United Kingdom (London courts) and standard GIA regulatory boards, without looking to conflicting state statutes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 16: COOKIE POLICY */}
        {currentPage === 'cookie-policy' && (
          <div className="space-y-12 animate-fade-in max-w-4xl mx-auto font-sans text-stone-300">
            <div className="border-b border-amber-905/10 pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">TRANSPARENCY & TRACKING</span>
              <h2 className={headingClass}>Comprehensive Cookie Disclosure</h2>
              <p className={subheadingClass}>Explanation of how caching, beacons, and tracking scripts are deployed on your browser.</p>
            </div>

            <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
              <p>
                Our educational platform utilizes cookies to ensure extreme layout performance. Third-party partners (such as Google AdSense and analytics frameworks) may also serve persistent tracking cookies.
              </p>

              <div className="space-y-6">
                <h3 className="font-serif text-lg text-amber-400 font-bold">How We Use Cookies</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[#0f0d0a]/60 border border-amber-900/10 space-y-2">
                    <span className="text-amber-500 font-bold font-mono text-xs uppercase tracking-wider block">1. Core Essential</span>
                    <p className="text-xs text-stone-400 leading-normal">
                      Required to sustain login state, save comparison data items under custom slots, remember theme selections (Black-Gold or Cream), and protect e-acquisition carts.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0f0d0a]/60 border border-amber-900/10 space-y-2">
                    <span className="text-amber-500 font-bold font-mono text-xs uppercase tracking-wider block">2. Analytical Tracking</span>
                    <p className="text-xs text-stone-400 leading-normal">
                      Monitors page popularity, chatbot request loads, and scroll metrics. These cookies compile anonymous analytics data used solely to improve site speed.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0f0d0a]/60 border border-amber-900/10 space-y-2">
                    <span className="text-amber-500 font-bold font-mono text-xs uppercase tracking-wider block">3. Commercial Marketing</span>
                    <p className="text-xs text-stone-400 leading-normal">
                      Deployed by Google AdSense and marketing channels. These cookies read browsing indicators to display relevant luxury ads and prevent spam.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg text-amber-400 font-bold">How to Control Your Cookie Choices</h3>
                <p>
                  Most browsers allow you to block cookies entirely through their privacy configuration menus. Refer to your browser's Help tab for setup directions. Note that disabling cookies will turn off features such as comparison slots and local dark theme states on your device.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER BLOCK */}
      <Footer setCurrentPage={setCurrentPage} isLightTheme={isLightTheme} />

      {/* FLOATING CONCIERGE CHAT ADVISOR */}
      <Chatbot isLightTheme={isLightTheme} />

      {/* MODAL WINDOW A: SHOPPING CART SLIDER DRAW ER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-stone-950 border-l border-amber-900/20 text-stone-100 flex flex-col justify-between">
            
            {/* Header */}
            <div className="p-6 border-b border-amber-900/15 flex justify-between items-center">
              <h4 className="font-serif text-lg font-bold text-amber-500 flex items-center gap-1.5">
                <ShoppingBag className="h-5 w-5" /> Private Acquisition Invoice
              </h4>
              <button onClick={() => setIsCartOpen(false)} className="p-1 text-stone-400 hover:text-stone-200 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart list */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-500 text-xs">
                  <ShoppingBag className="h-10 w-10 text-stone-700 mx-auto mb-2" />
                  <p>Your Private selection is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-stone-900/60 border border-amber-905/10 rounded-xl relative">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-800">
                      <img src={item.product.imageUrl} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 text-xs">
                      <h5 className="font-bold text-stone-200">{item.product.name}</h5>
                      <p className="text-stone-500">{item.product.color} // {item.product.carat} ct</p>
                      <p className="text-amber-400 font-mono font-bold">${item.product.price.toLocaleString()}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 pt-2">
                        <button onClick={() => changeCartQuantity(item.product.id, -1)} className="px-1.5 py-0.5 bg-stone-850 rounded text-stone-300 text-[10px] font-mono cursor-pointer">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeCartQuantity(item.product.id, 1)} className="px-1.5 py-0.5 bg-stone-850 rounded text-stone-300 text-[10px] font-mono cursor-pointer">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="absolute top-2 right-2 text-stone-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}

              {/* Simulated Razorpay response status */}
              {checkoutResult && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3 mt-4 text-xs font-sans">
                  <p className="font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Invoice Settlement Confirmed
                  </p>
                  <p className="text-[11px] text-stone-300 leading-normal">
                    Payment authorized safely via simulated **Razorpay gateway ledger**. GIA vaults have logged this allocation.
                  </p>
                  <div className="p-2.5 bg-stone-900 rounded-lg text-[10px] font-mono text-stone-400 space-y-1">
                    <p><span className="text-stone-500">Order ID:</span> {checkoutResult.orderId}</p>
                    <p><span className="text-stone-505">Logistics ID:</span> {checkoutResult.trackingNumber}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-500 font-mono block mb-1">Armored Transit Stage</span>
                    <div className="flex gap-1.5 items-center text-[10px] text-stone-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span>Vaulting armored vehicle packing (Malca-Amit)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed invoice checkout controller */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-amber-900/15 bg-stone-950">
                <div className="flex justify-between mb-4 text-sm font-sans font-semibold">
                  <span>Subtotal Invoice Amount:</span>
                  <span className="font-mono text-amber-400 text-base">${cartTotal.toLocaleString()} USD</span>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-stone-400 mb-1">Client Email Invoice Delivery</label>
                    <input
                      type="email"
                      required
                      placeholder="curator@luxury.com"
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-stone-900 border border-amber-900/20 text-stone-200"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-xs font-bold uppercase tracking-widest font-mono text-white rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Authorizing Ledger...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" /> Settle payment via Razorpay
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL WINDOW B: WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setIsWishlistOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-stone-950 border-l border-amber-900/20 text-stone-100 flex flex-col justify-between">
            
            {/* Header */}
            <div className="p-6 border-b border-amber-900/15 flex justify-between items-center">
              <h4 className="font-serif text-lg font-bold text-amber-500 flex items-center gap-1.5 font-bold">
                <Heart className="h-5 w-5 fill-amber-500 text-amber-500" /> Private Curate Wishlist
              </h4>
              <button onClick={() => setIsWishlistOpen(false)} className="p-1 text-stone-400 hover:text-stone-200 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 text-stone-500 text-xs text-stone-500 font-sans leading-relaxed">
                  <Heart className="h-10 w-10 text-stone-700 mx-auto mb-2" />
                  <p>No investment pieces have been transferred to your private wishlist yet.</p>
                </div>
              ) : (
                wishlist.map((prod) => (
                  <div key={prod.id} className="flex gap-4 p-3 bg-stone-900/60 border border-amber-905/10 rounded-xl relative">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-800">
                      <img src={prod.imageUrl} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 text-xs">
                      <h5 className="font-bold text-stone-200">{prod.name}</h5>
                      <p className="text-amber-400 font-mono font-bold">${prod.price.toLocaleString()}</p>
                      
                      <button
                        onClick={() => {
                          addToCart(prod);
                          addToWishlist(prod); // Remove from wishlist after moving to cart
                        }}
                        className="mt-2 text-[10px] uppercase font-bold tracking-wider text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Acquire Piece <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <button onClick={() => addToWishlist(prod)} className="absolute top-2 right-2 text-stone-500 hover:text-rose-450 cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* FLOATING GDPR & GOOGLE ADSENSE COOKIE CONSENT BANNER */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-45 font-sans"
          >
            <div className="p-5 sm:p-6 rounded-2xl border bg-[#0f0d0a]/95 border-amber-900/40 text-stone-200 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-amber-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-500">Cookie Consent & Ad Options</h4>
                  <p className="text-[11px] leading-relaxed text-stone-400 mt-1">
                    This certified portal triggers cookie logging, GIA reports cache tracking, and third-party advertising algorithms (Google AdSense) to deliver tailored luxury diamond recommendations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1.5 text-[10.5px]">
                <button
                  onClick={() => handleCookieConsent('all')}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 active:scale-95 transition-all text-stone-100 font-bold uppercase tracking-wider rounded-lg cursor-pointer text-center"
                >
                  Accept All
                </button>
                <button
                  onClick={() => handleCookieConsent('essential')}
                  className="flex-1 py-2 bg-stone-900 hover:bg-stone-850 active:scale-95 border border-amber-900/10 transition-all text-stone-300 font-bold uppercase tracking-wider rounded-lg cursor-pointer text-center"
                >
                  Essential Only
                </button>
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono border-t border-amber-900/15 pt-2.5">
                <button 
                  onClick={() => {
                    setCurrentPage('cookie-policy');
                    setShowCookieBanner(false);
                  }}
                  className="text-stone-500 hover:text-amber-500 hover:underline cursor-pointer"
                >
                  Read Cookie Disclosure
                </button>
                <button 
                  onClick={() => {
                    setCurrentPage('privacy-policy');
                    setShowCookieBanner(false);
                  }}
                  className="text-stone-500 hover:text-amber-500 hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
