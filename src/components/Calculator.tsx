/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, Sparkles, AlertCircle, ShieldAlert, Check } from 'lucide-react';

interface CalculatorProps {
  isLightTheme: boolean;
}

export default function DiamondCalculator({ isLightTheme }: CalculatorProps) {
  const [origin, setOrigin] = useState<'natural' | 'lab-grown'>('natural');
  const [shape, setShape] = useState('round');
  const [carat, setCarat] = useState(1.0);
  const [clarity, setClarity] = useState('VS2');
  const [color, setColor] = useState('C3-C4');

  const shapes = [
    { id: 'round', name: 'Round Brilliant', factor: 1.15 },
    { id: 'princess', name: 'Princess Cut', factor: 1.0 },
    { id: 'cushion', name: 'Cushion Cut', factor: 0.92 },
    { id: 'emerald', name: 'Emerald Cut', factor: 0.88 },
    { id: 'oval', name: 'Oval Brilliant', factor: 0.98 }
  ];

  const colors = [
    { code: 'D-F', name: 'Super Premium Colorless', factor: 2.1 },
    { code: 'G-J', name: 'Near Colorless Clear', factor: 1.45 },
    { code: 'K-M', name: 'Faint Straw Warmth', factor: 1.05 },
    { code: 'C1-C2', name: 'Light Champagne', factor: 0.75 },
    { code: 'C3-C4', name: 'Medium Champagne', factor: 0.85 },
    { code: 'C5-C6', name: 'Dark Champagne / Cognac', factor: 0.95 },
    { code: 'C7', name: 'Deep Cognac Premium', factor: 1.15 }
  ];

  const clarities = [
    { code: 'FL/IF', name: 'Flawless pristine', factor: 1.6 },
    { code: 'VVS2', name: 'Very Very Minor', factor: 1.3 },
    { code: 'VS2', name: 'Eye-Clean Sweetspot', factor: 1.0 },
    { code: 'SI1', name: 'Inexpensive Eye-Clean', factor: 0.82 },
    { code: 'I1', name: 'Abrasive/Drill Grade', factor: 0.5 }
  ];

  // Base price
  const basePricePerCarat = origin === 'natural' ? 3200 : 750;

  // Selected details
  const currentShape = shapes.find(s => s.id === shape) || shapes[0];
  const currentColor = colors.find(c => c.code === color) || colors[4];
  const currentClarity = clarities.find(c => c.code === clarity) || clarities[2];

  // Exponential scale for carat sizes
  const sizeFactor = Math.pow(carat, 1.38);

  const priceResult = Math.round(
    basePricePerCarat * 
    sizeFactor * 
    currentShape.factor * 
    currentColor.factor * 
    currentClarity.factor
  );

  // Suggested setting gold
  const suggestedMetal = color.startsWith('C') 
    ? '18K Rose Gold or 22K Yellow Gold (amplifies warm copper & honey tones)' 
    : 'Platinum or 18K Palladium White Gold (contrasts colorless diamonds perfectly)';

  const retailMarkupEstimation = Math.round(priceResult * 1.85);
  const potentialSavings = retailMarkupEstimation - priceResult;

  const cardStyle = isLightTheme 
    ? 'bg-stone-50 border-stone-200 text-stone-900 shadow-sm' 
    : 'bg-stone-950/40 border-amber-900/10 text-stone-100';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-6 w-6 text-amber-500" />
        <h4 className="font-serif text-2xl font-bold text-amber-500">
          Wholesale Valuation Calculator
        </h4>
      </div>

      <p className={`text-xs leading-relaxed ${isLightTheme ? 'text-stone-600' : 'text-stone-400'}`}>
        Estimate the raw value of loose certified diamonds. Our algorithm estimates current global market benchmarks based on GIA, IGI, and Argyle primary trading books.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Left Col: Selections */}
        <div className={`p-6 rounded-2xl border ${cardStyle} space-y-4`}>
          
          {/* Origin Selection */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2 font-mono">
              Growth Origin
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrigin('natural')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  origin === 'natural'
                    ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                    : isLightTheme ? 'bg-white border-stone-200 text-stone-800' : 'bg-stone-900 border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Geological Natural (Mined)
              </button>
              <button
                type="button"
                onClick={() => setOrigin('lab-grown')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  origin === 'lab-grown'
                    ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                    : isLightTheme ? 'bg-white border-stone-200 text-stone-800' : 'bg-stone-900 border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Plasma Lab-Grown (CVD/HPHT)
              </button>
            </div>
          </div>

          {/* Carat Target */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block font-mono">
                Target Carat weight
              </span>
              <span className="text-xs font-bold text-amber-500">{carat} Carat</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.1"
                max="15"
                step="0.05"
                value={carat}
                onChange={(e) => setCarat(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-mono font-bold ${
                  isLightTheme ? 'bg-white border-stone-200 text-stone-900' : 'bg-stone-900 border-amber-900/20 text-stone-100'
                }`}
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCarat(prev => Math.max(0.1, +(prev - 0.1).toFixed(2)))}
                  className="px-2.5 py-1.5 rounded bg-stone-500/10 hover:bg-stone-500/20 text-stone-200 text-xs font-bold font-mono cursor-pointer"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setCarat(prev => +(prev + 0.1).toFixed(1))}
                  className="px-2.5 py-1.5 rounded bg-stone-500/10 hover:bg-stone-500/20 text-stone-200 text-xs font-bold font-mono cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Shape Selection */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2 font-mono">
              Shape & Facet Cut
            </span>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-semibold ${
                isLightTheme ? 'bg-white border-stone-200 text-stone-900' : 'bg-stone-900 border-amber-900/20 text-stone-100'
              }`}
            >
              {shapes.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2 font-mono">
              Color Saturation Target
            </span>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-semibold ${
                isLightTheme ? 'bg-white border-stone-200 text-stone-900' : 'bg-stone-900 border-amber-900/20 text-stone-100'
              }`}
            >
              {colors.map(c => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
          </div>

          {/* Clarity */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2 font-mono">
              Clarity Purity Grade
            </span>
            <select
              value={clarity}
              onChange={(e) => setClarity(e.target.value)}
              className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-semibold ${
                isLightTheme ? 'bg-white border-stone-200 text-stone-900' : 'bg-stone-900 border-amber-900/20 text-stone-100'
              }`}
            >
              {clarities.map(cl => (
                <option key={cl.code} value={cl.code}>{cl.code} — {cl.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Right Col: Valuation Results */}
        <div className={`p-6 rounded-2xl border ${cardStyle} flex flex-col justify-between`}>
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-[#000000]/30 text-amber-500 border border-amber-900/20">
              Wholesale Valuation Benchmark
            </span>

            <div className="my-6">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-amber-400">
                ${priceResult.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500 font-semibold block mt-1 font-mono">
                loose gem value (Excl. VAT / Tax)
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex border-b border-amber-900/10 pb-2 justify-between">
                <span className="text-stone-500 font-sans">Carat Rate:</span>
                <span className="font-mono font-semibold">${Math.round(priceResult / carat).toLocaleString()} / ct</span>
              </div>
              <div className="flex border-b border-amber-900/10 pb-2 justify-between">
                <span className="text-stone-500 font-sans">Simulated Retail Store:</span>
                <span className="font-mono text-red-500 line-through">${retailMarkupEstimation.toLocaleString()}</span>
              </div>
              <div className="flex border-b border-amber-900/10 pb-2 justify-between">
                <span className="text-stone-500 font-sans">Traditional Middleman Saving:</span>
                <span className="font-mono text-emerald-500 font-bold">+${potentialSavings.toLocaleString()} (54% Saved)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-900/15 space-y-3">
            <div>
              <span className="text-[10px] text-amber-500 uppercase font-bold tracking-wider block font-mono">Metal Setting Advisor</span>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-0.5">
                {suggestedMetal}
              </p>
            </div>
            {origin === 'natural' && (
              <div className="flex gap-1.5 items-start bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 text-[10px] text-stone-400 leading-normal">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>An additional GIA submission charge of approximately $120–$180 applies for actual microscopic verification checks.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
