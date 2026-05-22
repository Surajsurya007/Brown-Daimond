/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Info, ShieldCheck, AlertCircle } from 'lucide-react';

interface Interactive4CsProps {
  isLightTheme: boolean;
}

export default function Interactive4Cs({ isLightTheme }: Interactive4CsProps) {
  const [carat, setCarat] = useState(1.5);
  const [cut, setCut] = useState('Excellent');
  const [colorGrade, setColorGrade] = useState('C3-C4');
  const [clarity, setClarity] = useState('VS2');

  const cuts = [
    { title: 'Ideal', desc: 'Maximum light return. Over 99% of light is reflected directly through the crown.', sparkleCount: 5, multiplier: 1.35 },
    { title: 'Excellent', desc: 'Superior sparkle. Excellent fire and brilliant balance of patterns.', sparkleCount: 4, multiplier: 1.20 },
    { title: 'Very Good', desc: 'Highly reflective. Minimizes light leakage while being structurally optimized.', sparkleCount: 3, multiplier: 1.05 },
    { title: 'Good', desc: 'Slight light escaping from sides. Nice luster at moderate price bounds.', sparkleCount: 2, multiplier: 0.90 },
    { title: 'Fair', desc: 'Noticeable light leakage from bottom, appearing slightly flat in dim slots.', sparkleCount: 1, multiplier: 0.70 }
  ];

  const colorLevels = [
    { title: 'Colorless (D-F)', hex: '#ffffff', desc: 'Chemically pure. Complete icy brilliance.', premium: '+105%', multiplier: 2.2 },
    { title: 'Near Colorless (G-J)', hex: '#faf9f0', desc: 'Perfect white looking. Minimal face-up tint.', premium: 'Standard baseline', multiplier: 1.5 },
    { title: 'Faint Warmth (K-M)', hex: '#f7eecc', desc: 'Subtle yellowish warmth.', premium: '-25% Discount', multiplier: 1.1 },
    { title: 'Light Champagne (C1-C2)', hex: '#eadba4', desc: 'Sweet soft golden glow.', premium: '-35% Discount', multiplier: 0.8 },
    { title: 'Medium Champagne (C3-C4)', hex: '#d4b770', desc: 'Rich glowing honey tone.', premium: '-40% High Value', multiplier: 0.9 },
    { title: 'Dark Champagne (C5-C6)', hex: '#b28f4c', desc: 'Aromatic warm cedar tone.', premium: '-30% Designer Demand', multiplier: 1.0 },
    { title: 'Deep Cognac (C7)', hex: '#875d27', desc: 'Dark amber brandy. Mystical & rare.', premium: 'Artisan Premium', multiplier: 1.2 }
  ];

  const clarityLevels = [
    { title: 'FL/IF', desc: 'No inclusions under 10x magnification. Pure crystalline structure.', multiplier: 1.6 },
    { title: 'VVS1/VVS2', desc: 'Almost impossible to find tiny pinpoints even under microscope.', multiplier: 1.35 },
    { title: 'VS1/VS2', desc: '100% Eye-Clean to the naked eye. The smartest luxury value pairing.', multiplier: 1.1 },
    { title: 'SI1/SI2', desc: 'Microscopic crystals. Generally invisible except in rare angles.', multiplier: 0.85 },
    { title: 'I1', desc: 'Noticeable inclusions. Reduces brilliance and light bouncing.', multiplier: 0.55 }
  ];

  // Pricing calculator formula
  const selectedCut = cuts.find(c => c.title === cut) || cuts[1];
  const selectedColor = colorLevels.find(c => c.title.includes(colorGrade)) || colorLevels[4];
  const selectedClarity = clarityLevels.find(c => c.title === clarity) || clarityLevels[2];

  const estimatedBasePricePerCarat = 2500;
  // Dynamic pricing calculation
  const calculatedPrice = Math.round(
    estimatedBasePricePerCarat *
    Math.pow(carat, 1.4) * // Carat price exponential scale (larger is much more expensive)
    selectedCut.multiplier *
    selectedColor.multiplier *
    selectedClarity.multiplier
  );

  const themeCard = isLightTheme 
    ? 'bg-white border-amber-900/10 text-stone-900 shadow-sm' 
    : 'bg-stone-900/60 border-amber-900/20 text-stone-100';

  // SVG representation size of diamond based on carat
  // Map carat (0.1 to 10) to radius (20px to 80px)
  const scaleRatio = Math.min(22 + (carat * 5.2), 85);

  return (
    <div id="interactive-4cs" className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="font-serif text-3xl font-bold text-amber-500">
          The Luxury Interactive 4Cs Spec-Maker
        </h3>
        <p className={`mt-2 text-sm ${isLightTheme ? 'text-stone-600' : 'text-stone-400'}`}>
          Simulate a diamond cuts environment in real-time. Understand how scale, molecular clarity, and champagne color depth influence aesthetic posture and global pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Side: Interactive Inputs */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${themeCard} flex flex-col justify-between`}>
          <div className="space-y-6">
            
            {/* 1. Carat Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  1. Carat Weight (Size)
                </label>
                <span className="text-lg font-mono font-bold text-amber-405">{carat.toFixed(2)} ct</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="8.0"
                step="0.1"
                value={carat}
                onChange={(e) => setCarat(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-amber-900/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                <span>0.2ct (Petite)</span>
                <span>1.0ct (Classic)</span>
                <span>2.0ct (Elite)</span>
                <span>5.0ct (Statement)</span>
                <span>8.0ct (Royal Heirloom)</span>
              </div>
            </div>

            {/* 2. Cut Quality */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
                2. Cut Precision (Brilliance)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {cuts.map((c) => (
                  <button
                    key={c.title}
                    onClick={() => setCut(c.title)}
                    className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                      cut === c.title
                        ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                        : isLightTheme
                          ? 'border-stone-200 hover:border-amber-500/55 bg-stone-50 text-stone-850'
                          : 'border-amber-900/30 hover:border-amber-500/55 bg-stone-950/40 text-stone-400'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-stone-400 mt-2 italic font-sans">
                &ldquo;{selectedCut.desc}&rdquo;
              </p>
            </div>

            {/* 3. Color Depth (argyle champagne focus) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
                3. Color Scale (High-End Champagne)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {colorLevels.map((lvl) => {
                  const tag = lvl.title.includes('D-F') ? 'D-F' : lvl.title.includes('G-J') ? 'G-J' : lvl.title.includes('K-M') ? 'K-M' : lvl.title.split(' ')[2] || 'C1';
                  
                  return (
                    <button
                      key={lvl.title}
                      onClick={() => {
                        if (lvl.title.includes('D-F')) setColorGrade('D-F');
                        else if (lvl.title.includes('G-J')) setColorGrade('G-J');
                        else if (lvl.title.includes('K-M')) setColorGrade('K-M');
                        else if (lvl.title.includes('C1')) setColorGrade('C1-C2');
                        else if (lvl.title.includes('C3')) setColorGrade('C3-C4');
                        else if (lvl.title.includes('C5')) setColorGrade('C5-C6');
                        else setColorGrade('C7');
                      }}
                      className={`py-1.5 rounded-lg border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        colorGrade === (lvl.title.includes('D-F') ? 'D-F' : lvl.title.includes('G-J') ? 'G-J' : lvl.title.includes('K-M') ? 'K-M' : lvl.title.includes('C1') ? 'C1-C2' : lvl.title.includes('C3') ? 'C3-C4' : lvl.title.includes('C5') ? 'C5-C6' : 'C7')
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-transparent hover:border-amber-500/30'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-md border border-stone-700 shadow-inner" style={{ backgroundColor: lvl.hex }} />
                      <span className="text-[9px] font-bold font-mono text-stone-400 uppercase tracking-widest">{tag}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-400 mt-2 font-sans italic">
                {selectedColor.title}: {selectedColor.desc} <span className="text-amber-500 font-semibold md:ml-2">({selectedColor.premium})</span>
              </p>
            </div>

            {/* 4. Clarity Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
                4. Clarity Grading (Purity)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {clarityLevels.map((lvl) => (
                  <button
                    key={lvl.title}
                    onClick={() => setClarity(lvl.title)}
                    className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                      clarity === lvl.title
                        ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                        : isLightTheme
                          ? 'border-stone-200 hover:border-amber-500/55 bg-stone-50 text-stone-850'
                          : 'border-amber-900/30 hover:border-amber-500/55 bg-stone-950/40 text-stone-400'
                    }`}
                  >
                    {lvl.title}
                  </button>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-stone-400 mt-2 italic font-sans col-span-5">
                &ldquo;{selectedClarity.desc}&rdquo;
              </p>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-amber-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-sans">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              GIA Grading Compliant
            </div>
            <div className="text-right">
              <span className="text-[9px] text-stone-500 uppercase tracking-widest block font-mono">Simulated Valuation</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">${calculatedPrice.toLocaleString()} USD</span>
            </div>
          </div>

        </div>

        {/* Right Side: Virtual Diamond Facet Visualizer */}
        <div className={`p-8 rounded-3xl border ${themeCard} flex flex-col justify-between items-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          <div className="w-full flex justify-between items-center z-10">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
              Interactive Blueprint
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
              Facet Resolution: 57 Lines
            </span>
          </div>

          {/* SVG Diamond Render */}
          <div className="my-10 relative flex items-center justify-center h-48 w-48 bg-stone-950/10 rounded-full border border-amber-900/5 shadow-inner">
            
            {/* Ambient Shadow glow */}
            <div className="absolute blur-2xl rounded-full transition-all duration-300 pointer-events-none" 
              style={{
                width: `${scaleRatio * 1.5}px`,
                height: `${scaleRatio * 1.5}px`,
                backgroundColor: selectedColor.hex,
                opacity: 0.25,
              }}
            />

            {/* Sparkle icons */}
            {selectedCut.sparkleCount >= 1 && (
              <Sparkles className="absolute -top-1 -right-2 h-5 w-5 text-amber-300 animate-sparkle-fast pointer-events-none" />
            )}
            {selectedCut.sparkleCount >= 3 && (
              <Sparkles className="absolute -bottom-2 -left-1 h-4 w-4 text-amber-400 animate-sparkle-slow pointer-events-none" />
            )}
            {selectedCut.sparkleCount >= 4 && (
              <Sparkles className="absolute top-1/2 -left-6 h-5.5 w-5.5 text-white animate-pulse pointer-events-none" />
            )}

            {/* Diamond shape SVG vector */}
            <svg
              width={scaleRatio * 2}
              height={scaleRatio * 2}
              viewBox="0 0 100 100"
              className="transition-all duration-300 transform scale-100 hover:scale-105"
            >
              {/* Outer Crown facets */}
              <polygon points="50,10 70,25 78,35 60,35" fill={selectedColor.hex} opacity="0.45" stroke="#be9c6e" strokeWidth="0.5" />
              <polygon points="50,10 30,25 22,35 40,35" fill={selectedColor.hex} opacity="0.45" stroke="#be9c6e" strokeWidth="0.5" />
              
              {/* Upper Grindle facets */}
              <polygon points="78,35 90,45 78,55 60,35" fill={selectedColor.hex} opacity="0.65" stroke="#be9c6e" strokeWidth="0.5" />
              <polygon points="22,35 10,45 22,55 40,35" fill={selectedColor.hex} opacity="0.65" stroke="#be9c6e" strokeWidth="0.5" />
              
              {/* Main Table facet */}
              <polygon points="40,35 60,35 50,55" fill={selectedColor.hex} opacity="0.80" stroke="#be9c6e" strokeWidth="0.6" />
              <polygon points="60,35 78,55 50,55" fill={selectedColor.hex} opacity="0.55" stroke="#be9c6e" strokeWidth="0.5" />
              <polygon points="40,35 22,55 50,55" fill={selectedColor.hex} opacity="0.55" stroke="#be9c6e" strokeWidth="0.5" />
              
              {/* Lower pavilion facets */}
              <polygon points="22,55 50,55 50,90" fill={selectedColor.hex} opacity="0.7" stroke="#be9c6e" strokeWidth="0.5" />
              <polygon points="78,55 50,55 50,90" fill={selectedColor.hex} opacity="0.85" stroke="#be9c6e" strokeWidth="0.5" />
              <polygon points="10,45 22,55 50,90" fill={selectedColor.hex} opacity="0.5" stroke="#be9c6e" strokeWidth="0.5" />
              <polygon points="90,45 78,55 50,90" fill={selectedColor.hex} opacity="0.5" stroke="#be9c6e" strokeWidth="0.5" />
            </svg>

            {/* Spec readout label */}
            <div className="absolute bottom-1 bg-stone-950/85 px-2 py-0.5 rounded border border-amber-900/30 text-[9px] font-mono font-bold tracking-widest text-amber-500">
              {(0.083 * scaleRatio).toFixed(1)} mm
            </div>
          </div>

          <div className="w-full space-y-4 z-10">
            <h4 className="font-serif text-lg text-center font-bold text-amber-500">
              Geological Spec Sheet
            </h4>
            
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 rounded-xl bg-[#000000]/30 border border-amber-900/10">
                <span className="text-stone-500 block text-[9px] uppercase tracking-wider font-mono">Optical Fire</span>
                <span className="font-semibold text-stone-200">{selectedCut.title === 'Ideal' ? 'Extreme (Dispersion 0.044)' : 'Exceptional'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#000000]/30 border border-amber-900/10">
                <span className="text-stone-500 block text-[9px] uppercase tracking-wider font-mono">Blemish Status</span>
                <span className="font-semibold text-stone-200">{selectedClarity.title === 'FL/IF' ? 'Internally Flawless' : 'Eye-Clean Compound'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] leading-relaxed text-stone-400">
              <div className="flex gap-1.5 items-start">
                <Info className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Advise for Champagne Buyers:</strong> Champagne diamonds are richly colored, hiding imperfections incredibly well. We suggest choosing a **VS2 or SI1 Clarity** and putting your saved budget into a larger **Carat weight** to maximize dramatic presence!
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
