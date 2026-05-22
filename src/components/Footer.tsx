/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gem, Mail, Shield, ShieldCheck, MapPin, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  isLightTheme: boolean;
}

export default function Footer({ setCurrentPage, isLightTheme }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerBg = isLightTheme 
    ? 'bg-amber-950/5 text-stone-800 border-t border-amber-900/10' 
    : 'bg-[#060504] text-stone-300 border-t border-amber-950/40';

  const footerHeading = isLightTheme ? 'text-amber-950 font-serif' : 'text-amber-400 font-serif';
  const secondaryText = isLightTheme ? 'text-stone-600' : 'text-stone-400';

  return (
    <footer className={`${footerBg} pt-16 pb-8 font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner */}
        <div className={`p-8 sm:p-12 mb-16 rounded-3xl relative overflow-hidden backdrop-blur-md border ${
          isLightTheme 
            ? 'bg-[#ffffff]/60 border-amber-900/15 text-stone-900' 
            : 'bg-stone-950/60 border-amber-900/20 text-stone-100'
        }`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-700/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-amber-500">
                Join the Circle of Brown Daimond Collectors
              </h3>
              <p className={`mt-2 text-sm max-w-lg ${secondaryText}`}>
                Subscribe to our quarterly chronicle describing newly unlocked colored cuts, Argyle Mine news, and advanced luxury diamond certification updates.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 bg-amber-500/15 border border-amber-500/30 p-4 rounded-xl text-amber-500">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Privileged Access Granted</p>
                    <p className="text-xs opacity-90">An authentication link has been dispatched to your primary private inbox.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none border ${
                      isLightTheme 
                        ? 'bg-stone-50 border-stone-200 text-stone-900' 
                        : 'bg-stone-900 border-amber-900/30 text-stone-100'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-xs tracking-widest font-bold uppercase rounded-xl transition-all text-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gem className="h-6 w-6 text-amber-500" />
              <span className={`text-xl font-bold font-serif tracking-wider ${isLightTheme ? 'text-amber-950' : 'text-stone-100'}`}>
                Brown Daimond
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${secondaryText}`}>
              Brown Daimond represents the pinnacle of contemporary colored gemological knowledge. We illuminate the organic depth, mathematical cuts, and physical superiority of rare luxury brown and fancy diamonds.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-full transition-colors" aria-label="Instagram">
                <Gem className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-full transition-colors" aria-label="LinkedIn">
                <ShieldCheck className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-full transition-colors" aria-label="Exclusive">
                <Shield className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Education Links */}
          <div>
            <h4 className={`text-sm font-semibold tracking-wider uppercase mb-4 ${footerHeading}`}>
              Diamond Education
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('about-diamonds')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Diamond Formation & Science
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('brown-diamonds')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Brown, Champagne & Cognac
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('diamond-types')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Natural vs Lab-Grown Diamonds
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shapes-cuts')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Modern & Step Cut Facets
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('diamond-colors')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Color Grading (Champagne Scale)
                </button>
              </li>
            </ul>
          </div>

          {/* Verification & Guides */}
          <div>
            <h4 className={`text-sm font-semibold tracking-wider uppercase mb-4 ${footerHeading}`}>
              Buyer Verification
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('clarity-guide')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  The Diamond Clarity Standard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('certification')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  GIA, IGI, & HRD Certifications
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('buying-guide')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  4Cs Smarter Investment Guide
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('diamond-uses')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Quantum & Industrial Uses
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('faq')} className={`hover:text-amber-500 transition-colors cursor-pointer ${secondaryText}`}>
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className={`text-sm font-semibold tracking-wider uppercase mb-4 ${footerHeading}`}>
              Headquarters Liaison
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <a href="mailto:support@browndaimond.com" className={`hover:text-amber-500 transition-colors ${secondaryText}`}>
                  support@browndaimond.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                <span className={secondaryText}>Mayfair luxury district, London & Argyle Office, Sydney</span>
              </li>
              <li className="pt-2">
                <div className={`p-4 rounded-xl text-[11px] leading-relaxed border ${
                  isLightTheme 
                    ? 'bg-amber-950/5 border-amber-900/10' 
                    : 'bg-stone-900/50 border-amber-900/20'
                }`}>
                  <span className="font-semibold text-amber-500 flex items-center gap-1 mb-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> GIA Registered Portal
                  </span>
                  Full integration with genuine GIA Report Check API registers for buyer safety.
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator line */}
        <div className={`h-[1px] my-8 ${isLightTheme ? 'bg-amber-900/10' : 'bg-amber-900/15'}`} />

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className={secondaryText}>
            © {currentYear} Brown Daimond Fine Jewelry Education. Securely published under GIA Diamond Syndicate standard charter. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a href="https://browndaimond.com/" target="_blank" rel="noreferrer" className="text-amber-500 hover:underline flex items-center gap-1">
              browndaimond.com <ExternalLink className="h-3 w-3" />
            </a>
            <span className="opacity-30">|</span>
            <button onClick={() => setCurrentPage('privacy-policy')} className={`hover:text-amber-500 hover:underline transition-all cursor-pointer ${secondaryText}`}>
              Privacy Policy
            </button>
            <span className="opacity-30">|</span>
            <button onClick={() => setCurrentPage('terms-of-service')} className={`hover:text-amber-500 hover:underline transition-all cursor-pointer ${secondaryText}`}>
              Terms of Service
            </button>
            <span className="opacity-30">|</span>
            <button onClick={() => setCurrentPage('cookie-policy')} className={`hover:text-amber-500 hover:underline transition-all cursor-pointer ${secondaryText}`}>
              Cookie Disclosure
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
