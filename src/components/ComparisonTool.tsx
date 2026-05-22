/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitCompare, 
  CheckCircle2, 
  X, 
  Info, 
  Star, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Scale, 
  Gem, 
  ChevronDown, 
  TrendingDown, 
  Award,
  Flame,
  Globe,
  Settings
} from 'lucide-react';

interface ComparisonToolProps {
  isLightTheme: boolean;
}

export interface ComparableDiamond {
  id: string;
  name: string;
  price: number;
  carat: number;
  cut: 'Ideal' | 'Excellent' | 'Very Good';
  color: string;
  colorGrade: string; // C1-C7 or D-F, etc.
  clarity: string;
  certification: 'GIA' | 'IGI' | 'HRD';
  type: 'Natural Earth Mined' | 'Lab-Grown CVD' | 'Lab-Grown HPHT';
  origin: string;
  originDetail: string; // Specific source mine or reactor details
  colorCause: string; // Geological cause of the color (deform, nitrogen, pure)
  fluorescence: 'None' | 'Faint' | 'Medium' | 'Strong Blue' | 'Medium Yellow';
  symmetry: 'Excellent' | 'Very Good';
  metalPairing: string;
  sizeVisual: number; // For scaling SVG
  imageUrl: string; // Real specimen image
  description: string;
}

export const COMPARABLE_DIAMONDS: ComparableDiamond[] = [
  {
    id: 'specimen-01',
    name: 'The Argyle Royal Cognac',
    price: 5250,
    carat: 1.84,
    cut: 'Ideal',
    color: 'C6 Saturated Cognac',
    colorGrade: 'C6',
    clarity: 'VS1',
    certification: 'GIA',
    type: 'Natural Earth Mined',
    origin: 'Argyle Mine, Western Australia',
    originDetail: 'Erupted in the ancient Kimberley craton 1.1 billion years ago. Sourced from the now-closed legendary Argyle mine.',
    colorCause: 'Natural plastic deformation slides layers of carbon atoms, creating graining that absorbs blue light spectra.',
    fluorescence: 'None',
    symmetry: 'Excellent',
    metalPairing: '18K Yellow Gold or Rose Gold',
    sizeVisual: 7.9,
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=500',
    description: 'A spectacular natural collector heirloom. Yields deep crimson-amber internal fire and extreme scintillation.'
  },
  {
    id: 'specimen-02',
    name: 'The Queen Straw Pear',
    price: 7800,
    carat: 2.10,
    cut: 'Excellent',
    color: 'C3 Medium Champagne',
    colorGrade: 'C3',
    clarity: 'VVS2',
    certification: 'GIA',
    type: 'Natural Earth Mined',
    origin: 'Ekati Mine, NWT, Canada',
    originDetail: 'Ethically excavated from frozen sub-arctic volcanic pipes in northern Canada under rigid environmental protocols.',
    colorCause: 'Subtle nitrogen trace elements coupled with minor lattice strain yielding golden wheat colors.',
    fluorescence: 'Faint',
    symmetry: 'Very Good',
    metalPairing: '18K Yellow Gold or 950 Platinum',
    sizeVisual: 8.5,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=500',
    description: 'Boasts an incredible eye-clean crystalline body with soft amber sparks. Pear-cut elongated format maximizes hand presence.'
  },
  {
    id: 'specimen-03',
    name: 'The Plasma Honey Brilliance',
    price: 2100,
    carat: 2.50,
    cut: 'Ideal',
    color: 'C2 Light Champagne',
    colorGrade: 'C2',
    clarity: 'VS2',
    certification: 'IGI',
    type: 'Lab-Grown CVD',
    origin: 'Plasma Technology Lab, Tokyo',
    originDetail: 'Sustainably synthesis using 100% solar energy CVD methane-plasma reaction chambers.',
    colorCause: 'Controlled Nitrogen gases added to the plasma cloud to replicate Argyle honey profiles atomically.',
    fluorescence: 'None',
    symmetry: 'Excellent',
    metalPairing: '950 Platinum or Yellow Gold',
    sizeVisual: 9.0,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=500',
    description: 'Optically, chemically and physically identical to mined gems. Delivers huge visual scale at a fraction of natural pricing.'
  },
  {
    id: 'specimen-04',
    name: 'The Sovereign Flawless White',
    price: 14900,
    carat: 1.50,
    cut: 'Ideal',
    color: 'D Pure Colorless',
    colorGrade: 'D',
    clarity: 'FL',
    certification: 'GIA',
    type: 'Natural Earth Mined',
    origin: 'Karowe Mine, Botswana',
    originDetail: 'Extracted from major South African ancient shield pipes. Checked for complete conflict-free Kimberley standards.',
    colorCause: 'Absolute chemical purity. Total absence of nitrogen or boron atoms ensures complete crystal transparency.',
    fluorescence: 'None',
    symmetry: 'Excellent',
    metalPairing: '950 Platinum or 18K White Gold',
    sizeVisual: 7.4,
    imageUrl: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=500',
    description: 'The ultimate investment-grade masterpiece. Completely inclusion-free under standard 10x binocular gemological microscope.'
  },
  {
    id: 'specimen-05',
    name: 'The Chocolate Truffle Cushion',
    price: 9650,
    carat: 3.02,
    cut: 'Excellent',
    color: 'C7 Deep Cognac / Chocolate',
    colorGrade: 'C7',
    clarity: 'SI1',
    certification: 'HRD',
    type: 'Natural Earth Mined',
    origin: 'Kimberley Fields, South Africa',
    originDetail: 'Alluvial extraction from the ancient Orange River flood gravels featuring heavily rounded exterior crusts.',
    colorCause: 'High-density internal plastic distortion lines occurring under extreme continental volcanic pressure.',
    fluorescence: 'Medium Yellow',
    symmetry: 'Excellent',
    metalPairing: '18K Rose Gold with dark tungsten accents',
    sizeVisual: 9.8,
    imageUrl: 'https://images.unsplash.com/photo-1588444839799-eb6cd7798019?auto=format&fit=crop&q=80&w=500',
    description: 'A heavy, commanding cushion cut exhibiting deep espresso and cocoa-tinted fire with brilliant amber luster.'
  },
  {
    id: 'specimen-06',
    name: 'The Eco-Pristine Solitaire',
    price: 3400,
    carat: 2.05,
    cut: 'Ideal',
    color: 'F Pure Colorless',
    colorGrade: 'F',
    clarity: 'VVS1',
    certification: 'IGI',
    type: 'Lab-Grown CVD',
    origin: 'Silicon Valley Reactor, California',
    originDetail: 'Constructed by layering molecular carbon lattices over seed plates under high laser activation.',
    colorCause: 'Ultra-clean methane reactor environment eliminates impurities, achieving high chemical diamond ranks.',
    fluorescence: 'None',
    symmetry: 'Excellent',
    metalPairing: '18K White Gold',
    sizeVisual: 8.2,
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=500',
    description: 'Perfect for modern minimalists. Massive optical performance and crisp colorless dispersion at a beautiful value.'
  },
  {
    id: 'specimen-07',
    name: 'The Kimberley Amber Marquise',
    price: 3150,
    carat: 1.25,
    cut: 'Very Good',
    color: 'C4 Medium Champagne',
    colorGrade: 'C4',
    clarity: 'VS2',
    certification: 'GIA',
    type: 'Natural Earth Mined',
    origin: 'Alluvial Vault, South Africa',
    originDetail: 'Uncovered from river-bed deposits. Hand-chosen for its deep orange-gold refraction highlights.',
    colorCause: 'Concentrated atomic alignment slipping combined with minor trace mineral lattices.',
    fluorescence: 'Faint',
    symmetry: 'Very Good',
    metalPairing: '18K Yellow Gold',
    sizeVisual: 7.1,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500',
    description: 'Classic marquise cut which elongates the finger visually. Radiates warm honey sparkles under room lighting.'
  },
  {
    id: 'specimen-08',
    name: 'The Indian Sunspark Cushion',
    price: 1650,
    carat: 1.70,
    cut: 'Excellent',
    color: 'C5 Warm Cognac',
    colorGrade: 'C5',
    clarity: 'VS1',
    certification: 'IGI',
    type: 'Lab-Grown HPHT',
    origin: 'Surat Tech Reactor, India',
    originDetail: 'Grown via massive cubic presses replicating physical mantle conditions with iron-nickel catalysts.',
    colorCause: 'High pressure thermal treatment creates stabilized warm cognac hues inside the lab environment.',
    fluorescence: 'None',
    symmetry: 'Excellent',
    metalPairing: '18K Rose Gold',
    sizeVisual: 7.7,
    imageUrl: 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&q=80&w=500',
    description: 'Extremely fiery cushion cut. Highly recommended for custom copper-gold vintage-halo mount rings.'
  },
  {
    id: 'specimen-09',
    name: 'The Siberian Blue-Ice Solitaire',
    price: 7200,
    carat: 1.05,
    cut: 'Excellent',
    color: 'E Near Colorless',
    colorGrade: 'E',
    clarity: 'VVS2',
    certification: 'HRD',
    type: 'Natural Earth Mined',
    origin: 'Mir Pipe, Yakutia, Siberia',
    originDetail: 'Extracted from one of the deepest open-pit diamond mines on Earth under extreme sub-zero permafrost.',
    colorCause: 'Pure carbon structures with absolutely minimal chemical disruption.',
    fluorescence: 'Strong Blue',
    symmetry: 'Very Good',
    metalPairing: '950 Platinum',
    sizeVisual: 6.5,
    imageUrl: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=500',
    description: 'Displays a gorgeous icy-violet luminescence when exposed to ambient sunlight UV waves. Truly mystical.'
  },
  {
    id: 'specimen-10',
    name: 'The Argyle Honey Marquise',
    price: 4200,
    carat: 1.62,
    cut: 'Excellent',
    color: 'C1 Very Light Champagne',
    colorGrade: 'C1',
    clarity: 'VS1',
    certification: 'GIA',
    type: 'Natural Earth Mined',
    origin: 'Argyle Mine, Western Australia',
    originDetail: 'Premium certified specimen recovered during the final years of mining operation in Australia.',
    colorCause: 'Gentle volcanic compression strain creating a premium warm white/straw color flash.',
    fluorescence: 'Faint',
    symmetry: 'Excellent',
    metalPairing: '18K White Gold',
    sizeVisual: 7.5,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500',
    description: 'Subtle champagne undertone provides outstanding character. Possesses fantastic fire performance equal to pure white.'
  }
];

export default function ComparisonTool({ isLightTheme }: ComparisonToolProps) {
  // We allow comparing up to 3 diamonds. Under the hood, we track IDs for three slots: slot-1, slot-2, slot-3.
  // Setting a slot to null renders an elegant luxury invite to select a specimen.
  const [slot1, setSlot1] = useState<string | null>('specimen-01');
  const [slot2, setSlot2] = useState<string | null>('specimen-03');
  const [slot3, setSlot3] = useState<string | null>('specimen-04');
  const [vaultTypeFilter, setVaultTypeFilter] = useState<'All' | 'Natural' | 'Lab'>('All');
  const [vaultColorFilter, setVaultColorFilter] = useState<'All' | 'Champagne' | 'Colorless'>('All');

  const d1 = COMPARABLE_DIAMONDS.find(d => d.id === slot1) || null;
  const d2 = COMPARABLE_DIAMONDS.find(d => d.id === slot2) || null;
  const d3 = COMPARABLE_DIAMONDS.find(d => d.id === slot3) || null;

  const handleSelectSlot = (slotIndex: 1 | 2 | 3, id: string | null) => {
    if (slotIndex === 1) setSlot1(id);
    else if (slotIndex === 2) setSlot2(id);
    else if (slotIndex === 3) setSlot3(id);
  };

  const getAvailableOptions = (currentSlotId: string | null) => {
    // Return options, marking already selected ids in other slots as unavailable or just letting them select
    return COMPARABLE_DIAMONDS;
  };

  // Helper colors
  const labelColorClass = isLightTheme ? 'text-stone-500' : 'text-stone-450 text-stone-400';
  const itemBgClass = isLightTheme ? 'bg-amber-500/5 border border-stone-200' : 'bg-[#0f0d0a]/60 border border-amber-900/15';
  const lineSeparatorClass = isLightTheme ? 'border-amber-900/10' : 'border-amber-900/15';

  // Dynamic educational insight advisor calculation
  const generateComparisonAdvice = () => {
    const selected = [d1, d2, d3].filter((d): d is ComparableDiamond => d !== null);
    if (selected.length === 0) {
      return "Select diamond specimens above to consult the GIA-trained advisory council and evaluate structural, price, and color trade-offs.";
    }

    if (selected.length === 1) {
      return `Detailed Analysis of ${selected[0].name}: This specimen is a ${selected[0].carat} carat ${selected[0].type} stone. Sourced from ${selected[0].origin}, it has a ${selected[0].cut} cut. Pro-tip for colored stones: pair with ${selected[0].metalPairing} to dramatically enhance the internal color fire.`;
    }

    // Has 2 or 3 compared items
    let advice = "";
    const hasNatural = selected.some(d => d.type.startsWith('Natural'));
    const hasLab = selected.some(d => d.type.startsWith('Lab-Grown'));
    const hasChampagne = selected.some(d => d.colorGrade.startsWith('C'));
    const hasColorless = selected.some(d => ['D','E','F'].includes(d.colorGrade[0]));

    if (hasNatural && hasLab) {
      advice += "⚖️ **Geological Rarity vs. Plasma Value**: You are contrasting natural earth-mined gems with plasma-grown CVD stones. While they are atomically identical, note that the natural specimens (e.g. Botswana/Argyle mines) retain robust generational resell prestige, whereas CVD options (CVD Plasma) deliver up to a 75% carat-for-carat savings, allowing you to maximize size within standard luxury budgets. ";
    }

    if (hasChampagne && hasColorless) {
      advice += "✨ **Colorless Clearness vs. Golden Warmth**: You are contrasting D-E-F colorless diamonds with C1-C7 Champagne/Cognac stones. With white diamonds, clarity is key. But with Champagne and Cognac diamonds, color saturation is the premium! Choosing VS1/VS2 in champagne hides microscopic inclusions easily, allowing you to focus budget on rich saturation levels and Excellent cuts. ";
    }

    // High carat comparison
    const maxCarat = Math.max(...selected.map(d => d.carat));
    const minPrice = Math.min(...selected.map(d => d.price));
    if (maxCarat >= 2.5 && minPrice <= 3000) {
      advice += "💰 **Smart Carat optimization**: The lab specimens in your comparison list offer exceptional carat weights with VS1/VS2 clarity. This lets you acquire a massive presence without the exponential price leaps of round natural carat markers. ";
    }

    if (!advice) {
      advice = `📚 **Curator Verdict**: This curation contrasts multiple high-performance specimens. Pay supreme attention to the Certifications (GIA certificates command the highest standard premium, whereas IGI is the leader in cutting-edge laboratory verification reports). Set champagne elements in warm yellow or rose gold to make their copper and honey atoms sparkle.`;
    }

    return advice;
  };

  const getSlotColorSwatch = (colorGrade: string): string => {
    switch (colorGrade) {
      case 'D': return 'bg-white/90 border border-stone-250';
      case 'E': return 'bg-white/80 border border-stone-250';
      case 'F': return 'bg-white/70 border border-stone-250';
      case 'C1': return 'bg-[#F2EBD4]';
      case 'C2': return 'bg-[#EDDFB0]';
      case 'C3': return 'bg-[#E5D298]';
      case 'C4': return 'bg-[#D6BD81]';
      case 'C5': return 'bg-[#BFA063]';
      case 'C6': return 'bg-[#A88647]';
      case 'C7': return 'bg-[#845E2B]';
      default: return 'bg-amber-600';
    }
  };

  return (
    <div className="space-y-12">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <GitCompare className="h-5 w-5 text-amber-500" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-500 font-bold block">
              Bespoke Interactive Lab
            </span>
          </div>
          <h3 className={`text-2xl sm:text-4xl font-bold font-serif ${isLightTheme ? 'text-amber-950' : 'text-stone-100'}`}>
            The Ultimate Gemstone Comparer
          </h3>
          <p className={`text-xs ${isLightTheme ? 'text-stone-600' : 'text-stone-400'}`}>
            Select up to three certified specimens from our private vault to evaluate 4Cs, geological origin, metal pairing, and market value.
          </p>
        </div>

        {/* Floating instructions badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[11px] text-stone-300">
          <ShieldCheck className="h-4 w-4 text-amber-500" />
          <span>GIA & IGI Verified Parameters</span>
        </div>
      </div>

      {/* Main 3-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((slotIdx) => {
          const slotValue = slotIdx === 1 ? slot1 : slotIdx === 2 ? slot2 : slot3;
          const currentDiamond = slotIdx === 1 ? d1 : slotIdx === 2 ? d2 : d3;
          const availableList = getAvailableOptions(slotValue);

          return (
            <div 
              key={slotIdx}
              className={`rounded-3xl border transition-all duration-300 flex flex-col h-full min-h-[500px] overflow-hidden ${
                currentDiamond 
                  ? isLightTheme ? 'bg-white border-stone-200 shadow-sm' : 'bg-[#0f0d0a]/60 border-amber-900/15'
                  : 'border-dashed border-2 border-amber-900/15 bg-stone-950/10'
              }`}
            >
              {/* Slot Header Control */}
              <div className="p-4 bg-amber-500/5 border-b border-amber-900/10 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Specimen Slot 0{slotIdx}
                </span>

                <div className="flex items-center gap-1.5">
                  {currentDiamond && (
                    <button
                      onClick={() => handleSelectSlot(slotIdx as 1 | 2 | 3, null)}
                      className="p-1 px-1.5 hover:bg-stone-900 rounded-lg text-stone-500 hover:text-stone-100 transition-colors text-[9px] uppercase font-mono tracking-widest cursor-pointer border border-transparent hover:border-amber-900/20"
                      title="Clear this comparison slot"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Slot Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                {/* Selector input when loading / empty / editing item */}
                <div className="relative">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-stone-550 text-stone-500 block mb-2 font-mono">
                    Select Specimen
                  </label>
                  <div className="relative">
                    <select
                      value={slotValue || ''}
                      onChange={(e) => handleSelectSlot(slotIdx as 1 | 2 | 3, e.target.value || null)}
                      className={`w-full py-2.5 pl-3.5 pr-8 text-xs font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 border appearance-none cursor-pointer ${
                        isLightTheme 
                          ? 'bg-stone-50 border-stone-200 text-stone-900' 
                          : 'bg-stone-950 border-amber-900/20 text-stone-100'
                      }`}
                    >
                      <option value="">-- Choose Diamond --</option>
                      {availableList.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.carat.toFixed(2)}ct {option.colorGrade} ({option.cut}) — ${option.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-amber-500 pointer-events-none" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {currentDiamond ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                    >
                      {/* Name & Quick stats */}
                      <div className="space-y-3">
                        <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border uppercase ${
                          currentDiamond.type.startsWith('Natural') 
                            ? 'bg-amber-600/10 border-amber-500/20 text-amber-500' 
                            : 'bg-emerald-600/10 border-emerald-500/20 text-emerald-500'
                        }`}>
                          {currentDiamond.type}
                        </span>
                        
                        {/* Real High-Fidelity Specimen Photo */}
                        <div className="relative h-40 w-full rounded-xl overflow-hidden bg-stone-950 border border-amber-900/15 group">
                          <img
                            src={currentDiamond.imageUrl}
                            alt={`${currentDiamond.name} Specimen`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute bottom-2 right-2.5 text-[8px] font-mono uppercase tracking-widest text-amber-400/80 bg-stone-950/70 py-0.5 px-2 rounded-full backdrop-blur-xs">
                            Private Vault Photo
                          </span>
                        </div>

                        <h4 className="font-serif text-lg font-bold text-stone-100 hover:text-amber-500 duration-200 cursor-pointer pt-1">
                          {currentDiamond.name}
                        </h4>
                        <p className={`text-[11px] leading-relaxed line-clamp-3 ${isLightTheme ? 'text-stone-600' : 'text-stone-300'}`}>
                          {currentDiamond.description}
                        </p>
                      </div>

                      {/* Visual Carat Scale Illustrator */}
                      <div className={`p-4 rounded-2xl ${itemBgClass} flex items-center justify-between gap-4`}>
                        <div>
                          <span className={`${labelColorClass} block text-[9px] uppercase font-mono tracking-wider`}>
                            Carat Scale
                          </span>
                          <strong className="text-xl font-mono text-stone-100 block">{currentDiamond.carat.toFixed(2)} ct</strong>
                          <span className="text-[10px] text-stone-500 font-sans block">Face size est. {currentDiamond.sizeVisual}mm</span>
                        </div>
                        {/* Dynamic SVG Diamond Scaler */}
                        <div className="relative w-16 h-16 flex items-center justify-center bg-stone-950/20 border border-amber-900/10 rounded-xl overflow-hidden shrink-0">
                          <svg 
                            viewBox="0 0 100 100" 
                            className="text-amber-500 fill-amber-500/10 drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                            style={{ 
                              width: `${Math.min(100, Math.max(30, currentDiamond.sizeVisual * 7.5))}%`,
                              height: `${Math.min(100, Math.max(30, currentDiamond.sizeVisual * 7.5))}%`
                            }}
                          >
                            <polygon points="50,15 80,35 70,85 30,85 20,35" stroke="currentColor" strokeWidth="3" />
                            <polyline points="50,15 50,85" stroke="currentColor" strokeWidth="2" strokeDasharray="1,1" />
                            <polyline points="20,35 80,35" stroke="currentColor" strokeWidth="2.5" />
                            <polyline points="30,85 50,35 70,85" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="20,35 30,85" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="80,35 70,85" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>

                      {/* Side-by-Side Specific Characteristics checklist */}
                      <div className="space-y-4">
                        
                        {/* The 4Cs breakdown section */}
                        <div className={`border-t ${lineSeparatorClass} pt-4`}>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#d67b27] font-mono block mb-2.5">
                            The Precise 4Cs Profile
                          </span>
                          <div className="grid grid-cols-2 gap-2.5 text-xs">
                            <div className="p-2 rounded-xl bg-stone-900/40 border border-amber-900/5 space-y-0.5">
                              <span className={`${labelColorClass} block text-[9px] font-mono`}>Carats (Weight)</span>
                              <span className="font-bold text-stone-200">{currentDiamond.carat} ct</span>
                            </div>
                            <div className="p-2 rounded-xl bg-stone-900/40 border border-amber-900/5 space-y-0.5">
                              <span className={`${labelColorClass} block text-[9px] font-mono`}>Clarity (Purity)</span>
                              <span className="font-bold text-stone-200 font-mono">{currentDiamond.clarity}</span>
                            </div>
                            <div className="p-2 rounded-xl bg-stone-900/40 border border-amber-900/5 space-y-0.5">
                              <span className={`${labelColorClass} block text-[9px] font-mono`}>Cut (Brilliance)</span>
                              <span className="font-bold text-stone-200">{currentDiamond.cut}</span>
                            </div>
                            <div className="p-2 rounded-xl bg-stone-900/40 border border-amber-900/5 space-y-0.5">
                              <span className={`${labelColorClass} block text-[9px] font-mono`}>Color (Saturation)</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${getSlotColorSwatch(currentDiamond.colorGrade)}`} />
                                <span className="font-bold text-stone-200 font-mono truncate">{currentDiamond.colorGrade}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Geological Origin breakdown */}
                        <div className={`border-t ${lineSeparatorClass} pt-4 space-y-2`}>
                          <div>
                            <div className="flex items-center gap-1 text-[9px] uppercase font-bold font-mono text-amber-500">
                              <Globe className="h-3 w-3" />
                              <span>Geological Origin Zone</span>
                            </div>
                            <p className="text-xs font-semibold text-stone-200 mt-0.5">{currentDiamond.origin}</p>
                            <p className={`text-[10px] ${isLightTheme ? 'text-stone-500' : 'text-stone-400'} mt-0.5 leading-relaxed`}>
                              {currentDiamond.originDetail}
                            </p>
                          </div>
                          <div>
                            <span className={`${labelColorClass} text-[9px] uppercase font-semibold font-mono block`}>
                              Color Genesis Physics
                            </span>
                            <p className={`text-[10px] ${isLightTheme ? 'text-stone-605' : 'text-stone-400'} leading-relaxed mt-0.5`}>
                              {currentDiamond.colorCause}
                            </p>
                          </div>
                        </div>

                        {/* Certification & Measurements details */}
                        <div className={`border-t ${lineSeparatorClass} pt-4 text-[11px] leading-relaxed font-mono space-y-1.5 text-stone-300`}>
                          <div className="flex justify-between items-center bg-stone-950/20 p-2 rounded-xl border border-amber-900/5">
                            <span className={`${labelColorClass} text-[10px] pl-1 font-sans`}>Laboratory Cert</span>
                            <span className="bg-amber-600/10 border border-amber-600/20 px-2.5 py-0.5 rounded-full text-amber-400 font-bold text-[10px]">
                              {currentDiamond.certification} CERTIFIED
                            </span>
                          </div>
                          <p className="flex justify-between pl-1 pr-1"><span className="text-stone-500">Symmetry Polish:</span> <span className="text-stone-200">{currentDiamond.symmetry}</span></p>
                          <p className="flex justify-between pl-1 pr-1"><span className="text-stone-500">Fluorescence:</span> <span className="text-stone-200">{currentDiamond.fluorescence}</span></p>
                          <p className="flex justify-between pl-1 pr-1"><span className="text-stone-500 font-sans">Ideal Metal mount:</span> <span className="font-sans text-stone-200 text-right">{currentDiamond.metalPairing}</span></p>
                        </div>

                        {/* Price summary block */}
                        <div className="pt-4 border-t border-amber-950 flex items-center justify-between">
                          <span className={`${labelColorClass} font-mono text-[9px] uppercase tracking-wide`}>Est. Private Price</span>
                          <span className="text-2xl font-serif font-bold text-amber-400 tracking-tight font-mono">
                            ${currentDiamond.price.toLocaleString()} <span className="text-[10px] text-stone-500 font-sans font-normal font-mono">USD</span>
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  ) : (
                    // Empty Slot luxury Placeholder
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-amber-900/15 rounded-2xl bg-stone-950/10 space-y-4 py-16">
                      <div className="w-12 h-12 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center">
                        <Plus className="h-6 w-6 text-amber-500" />
                      </div>
                      <div className="space-y-1 max-w-[200px]">
                        <p className="font-serif text-sm font-bold text-amber-500/90">Slot Unoccupied</p>
                        <p className="text-[10px] text-stone-450 text-stone-500 leading-relaxed">
                          Contrast up to 3 individual diamonds. Pick a specimen from the vault menu above.
                        </p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Private Vault Specimen Showcase */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${isLightTheme ? 'bg-amber-500/5 border-amber-900/10' : 'bg-[#0f0d0a]/80 border-amber-900/15'} space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-mono uppercase tracking-widest font-bold">
              <Sparkles className="h-3.5 w-3.5" /> Luxury Specimen Showcase
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-105 text-amber-500/90 mt-1">
              Private Vault Visual Catalog
            </h4>
            <p className="text-xs text-stone-400 mt-1">
              Browse professional photographs of colored and colorless diamond specimens. Click slot actions to compare side-by-side.
            </p>
          </div>

          {/* Quick Filter Controls */}
          <div className="flex flex-wrap gap-2.5">
            <div className="flex rounded-lg overflow-hidden border border-amber-900/20 text-[10px] font-mono">
              {(['All', 'Natural', 'Lab'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setVaultTypeFilter(t)}
                  className={`px-3 py-1.5 cursor-pointer font-bold uppercase transition-all ${
                    vaultTypeFilter === t
                      ? 'bg-amber-600 text-stone-100'
                      : 'bg-stone-900/40 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {t} Origin
                </button>
              ))}
            </div>

            <div className="flex rounded-lg overflow-hidden border border-amber-900/20 text-[10px] font-mono">
              {(['All', 'Champagne', 'Colorless'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setVaultColorFilter(c)}
                  className={`px-3 py-1.5 cursor-pointer font-bold uppercase transition-all ${
                    vaultColorFilter === c
                      ? 'bg-amber-600 text-stone-100'
                      : 'bg-stone-900/40 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {c === 'All' ? 'All Colors' : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vault Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COMPARABLE_DIAMONDS.filter((d) => {
            const matchesType =
              vaultTypeFilter === 'All' ||
              (vaultTypeFilter === 'Natural' && d.type.startsWith('Natural')) ||
              (vaultTypeFilter === 'Lab' && d.type.startsWith('Lab'));

            const matchesColor =
              vaultColorFilter === 'All' ||
              (vaultColorFilter === 'Champagne' && d.colorGrade.startsWith('C')) ||
              (vaultColorFilter === 'Colorless' && ['D', 'E', 'F'].includes(d.colorGrade[0]));

            return matchesType && matchesColor;
          }).map((d) => {
            const isSelectedInAny = slot1 === d.id || slot2 === d.id || slot3 === d.id;
            return (
              <div
                key={d.id}
                className={`group relative rounded-xl border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isSelectedInAny
                    ? 'border-amber-550/40 bg-amber-500/5 shadow-md'
                    : isLightTheme
                      ? 'border-stone-200 bg-white hover:border-amber-900/20'
                      : 'border-amber-900/10 bg-stone-950/60 hover:border-amber-900/30'
                }`}
              >
                {/* Photo frame */}
                <div className="relative h-28 w-full overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  {/* Absolute Badge */}
                  <span className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider ${
                    d.type.startsWith('Natural') ? 'bg-amber-600/20 text-amber-400' : 'bg-emerald-600/20 text-emerald-400'
                  }`}>
                    {d.carat.toFixed(2)} CT
                  </span>
                </div>

                {/* Specs Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h5 className="font-serif text-[11px] font-bold text-stone-200 truncate group-hover:text-amber-500 transition-colors">
                      {d.name}
                    </h5>
                    <div className="flex items-center justify-between text-[9px] font-mono text-stone-450 text-stone-400">
                      <span>{d.colorGrade} | {d.cut}</span>
                      <span className="font-bold text-amber-500">${d.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Slot Allocation Quick Controls */}
                  <div className="mt-3 pt-2.5 border-t border-amber-900/10 flex flex-col gap-1">
                    <span className="text-[7.5px] uppercase font-mono tracking-wider text-stone-500 text-center font-bold block mb-0.5">
                      Load Into Slot
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3].map((slotNum) => {
                        const isSlotOccupiedByMe = (slotNum === 1 ? slot1 : slotNum === 2 ? slot2 : slot3) === d.id;
                        return (
                          <button
                            key={slotNum}
                            onClick={() => handleSelectSlot(slotNum as 1 | 2 | 3, d.id)}
                            className={`py-1 text-[8.5px] font-mono rounded cursor-pointer transition-colors text-center font-bold ${
                              isSlotOccupiedByMe
                                ? 'bg-amber-600 text-stone-100'
                                : 'bg-stone-900/60 hover:bg-amber-500/20 text-stone-400 hover:text-amber-500 border border-amber-900/5'
                            }`}
                          >
                            #{slotNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Advisory Insights Box matching user request */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${isLightTheme ? 'bg-amber-500/5 border-amber-900/10' : 'bg-[#0f0d0a]/80 border-amber-900/15'} space-y-4`}>
        <div className="flex gap-2.5 items-start">
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 shrink-0">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-amber-400">
              Gold Sovereign Diamond Council Advisory
            </h4>
            <p className="text-[10px] uppercase font-mono tracking-widest text-stone-500 mt-0.5">
              Refined educational comparative analysis
            </p>
          </div>
        </div>

        {/* Advisory Text Output with responsive rendering */}
        <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isLightTheme ? 'text-stone-700' : 'text-stone-300'} max-w-4xl pt-2`}>
          {generateComparisonAdvice()}
        </p>

        {/* Fast education metrics references */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-900/10 mt-4 text-[11px] leading-relaxed text-stone-400 font-mono">
          <div className="space-y-1">
            <strong className="text-stone-200 block">💎 Clarity Threshold</strong>
            <span>Champagne and Cognac diamonds possess warm natural hues that organically camouflage minor SI1-SI2 carbon crystals, enabling massive pricing allowances.</span>
          </div>
          <div className="space-y-1">
            <strong className="text-stone-200 block">🌟 Cut Precision First</strong>
            <span>Never save budget on the Cut parameter. If facet geometry is poor, even flawless GIA gems refract flat, returning zero fire sparkle.</span>
          </div>
          <div className="space-y-1">
            <strong className="text-stone-200 block">🛡️ Verification Stamp</strong>
            <span>Verify the standard GIA micro-laser inscription on the diamond girdle with an expert 10x jewelry lens to secure structural investment pedigree.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
