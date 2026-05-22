/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiamondInfo, DiamondShape, DiamondColorLevel, DiamondClarityLevel, FAQItem, ProductItem } from '../types';

export const COMPREHENSIVE_DIAMONDS: DiamondInfo[] = [
  {
    id: 'brown-diamonds',
    name: 'Brown Diamonds',
    type: 'brown',
    origin: 'Argyle Mine (Australia), South Africa, Siberia, and Brazil',
    rarity: 'Moderately Rare (though historically undervalued, now highly coveted)',
    priceFactor: 0.75, // Usually more affordable than pure white diamonds of equivalent size
    description: 'Brown diamonds are natural diamonds that exhibit a beautiful range of warm, golden, and honey-like tones. For decades, they were categorized as industrial grade, but visionaries rebranded them into Champagne, Cognac, and Chocolate diamonds. Their rich color is caused by plastic deformation in the crystal lattice during underground formation, creating parallel graining lines that absorb blue light and reflect captivating amber and brunette wavelengths.',
    pros: [
      'Stunning unique warm aesthetic that complements modern rose and yellow golds beautifully',
      'Significantly better value per carat than white diamonds of equivalent size',
      'Ethically sourced historical pedigree, especially those originating from Western Australia'
    ],
    cons: [
      'Color saturation can vary, requiring careful choosing to avoid grey/muddy hues',
      'Lattice deformations occasionally attract micro-fractures if not expertly cut'
    ],
    careGuide: 'Clean with lukewarm soapy water and a soft-bristled brush. Avoid ultrasonic cleaners if the diamond has significant parallel graining or inclusions.',
    gemstoneFacts: {
      hardness: '10 Mohs (Hardest natural substance on Earth)',
      refractiveIndex: '2.417',
      dispersion: '0.044',
      density: '3.52 g/cm³'
    }
  },
  {
    id: 'champagne-diamonds',
    name: 'Champagne Diamonds',
    type: 'champagne',
    origin: 'Argyle Mine (Western Australia) and Congo',
    rarity: 'Highly sought-after, designer favorite',
    priceFactor: 0.82,
    description: 'Champagne diamonds display light gold, straw, or champagne-colored undertones with a subtle yellow flash. Classified on the Argyle scale from C1 (light champagne) to C4 (medium-gold champagne), they represent understated luxury. They capture a brilliant sparkle due to their higher clarity and lighter tint, making them phenomenal centerpieces for avant-garde luxury engagement rings.',
    pros: [
      'Subtle, elegant blush-gold tint that blends seamlessly with neutral metals',
      'Creates a brilliant, soft sparkle that contrasts wonderfully with platinum settings',
      'Highly praised by top-tier modern jewelry designers for custom bespoke settings'
    ],
    cons: [
      'Often graded on local miner scales (like the Argyle C1-C7) rather than standard GIA scales, which requires buyer familiarity'
    ],
    careGuide: 'Handle with clean fingers to prevent skin oils from dulling the soft golden facet brilliance. Dry with a lint-free jewelry microfiber rag.',
    gemstoneFacts: {
      hardness: '10 Mohs',
      refractiveIndex: '2.417',
      dispersion: '0.044',
      density: '3.51 - 3.53 g/cm³'
    }
  },
  {
    id: 'cognac-diamonds',
    name: 'Cognac Diamonds',
    type: 'cognac',
    origin: 'Australia, South Africa, and Canada',
    rarity: 'Rare and deeply saturated',
    priceFactor: 0.9,
    description: 'Boasting deep brown colors with burning orange, reddish, or amber secondary hues, Cognac diamonds resemble the rich warmth of aged French brandy. Ranked C5 to C7 on the color saturation scale, they are intense, moody, and highly reflective. They possess a dramatic depth of color while retaining the high refractive index characteristic of premier natural diamonds.',
    pros: [
      'Deep, mysterious and dramatic color profile with fiery orange flashes',
      'Commands tremendous presence and prestige in heavy statement rings or cufflinks',
      'Extremely high hardness guarantees they maintain polished brilliance forever'
    ],
    cons: [
      'Very deep stones can appear dark in low-lighting settings unless expertly faceted to maximize light return'
    ],
    careGuide: 'Rinse occasionally in a mild professional degreasing solution to keep the deep-amber fire burning brightly.',
    gemstoneFacts: {
      hardness: '10 Mohs',
      refractiveIndex: '2.417',
      dispersion: '0.044',
      density: '3.52 g/cm³'
    }
  },
  {
    id: 'natural-diamonds',
    name: 'Natural White Diamonds',
    type: 'natural',
    origin: 'Congo, Botswana, Russia, Canada, and South Africa',
    rarity: 'Extremely Rare (takes billions of years to create under pure geological pressure)',
    priceFactor: 1.5,
    description: 'Formed deep in the Earth\'s mantle between 1 to 3 billion years ago, natural white diamonds are the ultimate symbol of endurance and pure carbon crystallinity. Erupted to the surface via ancient vertical volcanic channels called kimberlite pipes, they are mined under rigorous international regulations (such as the Kimberley Process) to ensure ethical supply chains. They set the global standard for sparkle, value retention, and luxury prestige.',
    pros: [
      'Incredible long-term investment asset and generational heirloom value',
      'Unsurpassed geological prestige and traditional collector demand',
      'Strict international GIA standards ensure objective quality verification'
    ],
    cons: [
      'Highest market cost among comparable diamonds',
      'Environmental footprint of mining operations requires careful ethical sourcing verification'
    ],
    careGuide: 'Store separately in velvet-lined boxes to prevent them from scratching other fine jewelry. Wipe down with a damp cloth after wearing.',
    gemstoneFacts: {
      hardness: '10 Mohs',
      refractiveIndex: '2.417',
      dispersion: '0.044',
      density: '3.52 g/cm³'
    }
  },
  {
    id: 'lab-grown-diamonds',
    name: 'Lab-Grown Diamonds',
    type: 'lab-grown',
    origin: 'State-of-the-art global plasma synthesis labs',
    rarity: 'Abundant (technological production is scalable, though high-clarity specimens require immense skill)',
    priceFactor: 0.35,
    description: 'Lab-grown diamonds are structurally, chemically, and optically identical to geological mined diamonds. Growing from a tiny carbon seed under High-Pressure High-Temperature (HPHT) or Chemical Vapor Deposition (CVD) environments, they compose identical carbon atoms arranged in the famous isometric-tetrahedral crystal system. They are recognized as genuine diamonds by the GIA and FTC, offering a spectacular, ethical, and highly accessible alternative.',
    pros: [
      'Up to 70% to 80% more affordable than geological mined diamonds of equal quality',
      'Completely conflict-free and can be manufactured utilizing 100% renewable energy grids',
      'Allows clients to purchase much larger carat sizes within standard budgets'
    ],
    cons: [
      'Virtually zero resale or long-term investment value due to unlimited manufacturing capacity'
    ],
    careGuide: 'Clean exactly like a natural diamond. They are impervious to scratches except by other diamonds.',
    gemstoneFacts: {
      hardness: '10 Mohs',
      refractiveIndex: '2.417',
      dispersion: '0.044',
      density: '3.52 g/cm³'
    }
  },
  {
    id: 'industrial-diamonds',
    name: 'Industrial Diamonds',
    type: 'industrial',
    origin: 'Primarily high-yield synthetic labs and massive alluvial deposits',
    rarity: 'Very Common (mined alongside gem-grade diamonds or mass-produced synthetically)',
    priceFactor: 0.1,
    description: 'Over 80% of mined diamonds are structurally unsuitable for luxury jewelry due to heavy opaque inclusions or structural irregularities, and are designated as industrial diamonds. Known as "Bort", these ultra-hard fragments drive global industry. They are crushed into abrasive powders, tipped onto heavy mining drill drills, integrated into high-power semiconductors, or used as state-of-the-art optical windows in cutting-edge deep space laser applications.',
    pros: [
      'Provides absolute cutting and grinding superiority across manufacturing industries',
      'Enables high thermal conductivity and chemical inertness in next-generation aerospace semiconductors',
      'Extremely economical due to high volume synthetic manufacturing'
    ],
    cons: [
      'Opaque, heavily fractured, or dark gray appearance without any gem-mineral beauty'
    ],
    careGuide: 'No special maintenance required; highly resilient to extreme thermal shock, corrosive acids, and high radiation.',
    gemstoneFacts: {
      hardness: '10 Mohs',
      refractiveIndex: '2.417',
      dispersion: '0.044',
      density: '3.50 g/cm³'
    }
  }
];

export const DIAMOND_SHAPES: DiamondShape[] = [
  {
    id: 'round',
    name: 'Round Brilliant',
    description: 'The standard of diamond shapes, optimized with exactly 57 or 58 facets to return over 99% of entering light back to the eye.',
    brilliance: 'Maximum (Highest optical performance)',
    bestFor: 'Classic solitaire rings, luxury studs, and classic fine pendants',
    history: 'Refined in 1919 by mathematician Marcel Tolkowsky, who calculated the perfect dimensions for maximum sparkle.',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'princess',
    name: 'Princess Cut',
    description: 'An elegant square shape defined by clean, sharp, architectural lines and high facet counts in the chevron pattern.',
    brilliance: 'Very High (Modern geometric sparkle)',
    bestFor: 'Contemporary engagement rings, modern channel settings',
    history: 'Created in 1979 by Betzalel Ambar and Israel Itzkowitz, saving diamond cutters from wasted rough stone edges.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cushion',
    name: 'Cushion Cut',
    description: 'Often called the "candlelight cut," this antique square shape features soft, rounded pillow-like corners and large facets.',
    brilliance: 'High (Romantic antique fire)',
    bestFor: 'Vintage halo rings and colored gemstone settings like Champagne diamonds',
    history: 'A direct descendant of the legendary 19th-century Mine Cut, which dominated the Victorian and Edwardian eras.',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'emerald',
    name: 'Emerald Cut',
    description: 'A rectangular step-cut featuring concentric long facets that mimic a hall of mirrors, showcasing color and clarity over raw sparkle.',
    brilliance: 'Moderate (Elegant flashes and deep luster)',
    bestFor: 'Art deco vintage clusters, high-clarity large gemstones',
    history: 'Originating from stone-cutters working on fragile emerald blocks to prevent structural corner cracking.',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=400'
  }
];

export const DIAMOND_COLORS: DiamondColorLevel[] = [
  { grade: 'D-F', name: 'Colorless', description: 'The absolute pinnacle of chemical purity. Completely translucent, showing absolute white and magnificent dispersion with zero yellow or brown tint.', colorHex: '#FFFFFF', marketPremium: 'Ultra Premium (+100% standard baseline)' },
  { grade: 'G-J', name: 'Near Colorless', description: 'Face-up, these diamonds look perfectly white to the naked eye. Tints of warmth are only detectable by certified gemologists looking at the stone upside-down.', colorHex: '#FBF9EA', marketPremium: 'Standard-High baseline' },
  { grade: 'K-M', name: 'Faint Warmth', description: 'Displays an accommodating, visible hint of warm straw coloration. Excellent when mounted in yellow gold or rose gold rings.', colorHex: '#F6F0CC', marketPremium: '-20% baseline discount' },
  { grade: 'C1-C2', name: 'Light Champagne', description: 'A gorgeous, soft, shimmering gold reminiscent of white wine. Perfect for delicate, radiant bridal settings.', colorHex: '#EDDFB0', marketPremium: 'Highly Affordable' },
  { grade: 'C3-C4', name: 'Medium Champagne', description: 'Rich honey tones that command attention. Possesses high optical reflection and a wonderful unique personality.', colorHex: '#D6BD81', marketPremium: 'Highly Affordable' },
  { grade: 'C5-C6', name: 'Dark Champagne / Light Cognac', description: 'Intense and amber-like. Offers outstanding contrast when paired alongside tiny pavé colorless diamonds.', colorHex: '#B29150', marketPremium: 'Unique Designer Premium' },
  { grade: 'C7', name: 'Cognac', description: 'A magnificent, highly saturated dark brown diamond pulsing with golden, orange-red luster and deep vintage aesthetics.', colorHex: '#845E2B', marketPremium: 'True Premium Artisan Grade' }
];

export const DIAMOND_CLARITY_LEVELS: DiamondClarityLevel[] = [
  { grade: 'FL/IF', name: 'Flawless / internally Flawless', description: 'No inclusions or blemishes are visible under 10x magnification. Unbelievably rare and considered mathematically complete.', visibility: 'Perfect under microscope', rarity: 'Top 0.5% of gem diamonds', premiumStatus: 'Astronomical Premium' },
  { grade: 'VVS1/VVS2', name: 'Very Very Slightly Included', description: 'Inclusions are so microscopic that even trained gemologists struggle to locate them under professional focus.', visibility: 'Virtually flawless to eyes', rarity: 'Extremely rare', premiumStatus: 'High Prestige Premium' },
  { grade: 'VS1/VS2', name: 'Very Slightly Included', description: 'Contains minor crystals or feathers, which remain 100% invisible to the naked eye. The absolute sweet-spot for brilliant jewelry.', visibility: 'Eye-Clean guaranteed', rarity: 'Above average quality', premiumStatus: 'Optimized Standard Value' },
  { grade: 'SI1/SI2', name: 'Slightly Included', description: 'Inclusions are noticeable under 10x magnification, and may occasionally be seen upon extreme scrutiny in specific lighting.', visibility: 'Generally Eye-Clean, except large facets', rarity: 'Moderate abundance', premiumStatus: 'Affordable Selection' },
  { grade: 'I1-I3', name: 'Included', description: 'Inclusions are obvious to the unaided naked eye, which can affect brilliance, fire, and the stone\'s durability.', visibility: 'Visible inclusions throughout', rarity: 'Highly abundant', premiumStatus: 'Deep discount values' }
];

export const LUXURY_CATALOG: ProductItem[] = [
  {
    id: 'prod-01',
    name: 'The Argyle Monarch Solitaire',
    price: 4950,
    carat: 1.5,
    cut: 'Excellent',
    color: 'C5 (Cognac)',
    clarity: 'VS2',
    certification: 'GIA',
    type: 'Cognac',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'prod-02',
    name: 'Laurentian Straw Champagne Halo',
    price: 3200,
    carat: 1.2,
    cut: 'Ideal',
    color: 'C2 (Champagne)',
    clarity: 'VVS2',
    certification: 'HRD',
    type: 'Champagne',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'prod-03',
    name: 'The Obsidian Truffle Emerald-Cut',
    price: 8400,
    carat: 2.1,
    cut: 'Excellent',
    color: 'C7 (Deep Cognac)',
    clarity: 'VS1',
    certification: 'GIA',
    type: 'Chocolate',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'prod-04',
    name: 'Solaris Lab-Grown Golden Brilliance',
    price: 1850,
    carat: 1.8,
    cut: 'Excellent',
    color: 'C3 (Champagne)',
    clarity: 'VS1',
    certification: 'IGI',
    type: 'Lab-Grown',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'prod-05',
    name: 'Classic Eternal Pristine White',
    price: 12500,
    carat: 1.5,
    cut: 'Ideal',
    color: 'F (Colorless)',
    clarity: 'VVS1',
    certification: 'GIA',
    type: 'Natural',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'prod-06',
    name: 'The Cognac Empress Cushion Setter',
    price: 6100,
    carat: 1.7,
    cut: 'Ideal',
    color: 'C4 (Medium Champagne)',
    clarity: 'VS2',
    certification: 'GIA',
    type: 'Champagne',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500'
  }
];

export const EDUCATION_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Are Brown Diamonds real diamonds?',
    answer: 'Absolutely. Brown diamonds are 100% natural geological diamonds made of pure carbon atoms crystallized in an isometric structure. They have exactly the same hardness (10 Mohs), refractive index, and chemical traits as white diamonds. Their color is simply the beautiful result of natural structural graining formed over billions of years deep inside the geological mantle.'
  },
  {
    id: 'faq-2',
    category: 'brown',
    question: 'What is the difference between Champagne, Cognac, and Chocolate diamonds?',
    answer: 'These refer to different color saturations and marketing designations for brown/colored diamonds. Champagne diamonds display light golden-straw tints (ranked C1-C4). Cognac diamonds showcase deep brown with secondary orange or amber flashes (ranked C5-C7). Chocolate diamonds is a trademarked branding term popular for medium-dark chocolate colored stones.'
  },
  {
    id: 'faq-3',
    category: 'lab',
    question: 'How do Lab-Grown Diamonds differ from Natural Mined Diamonds?',
    answer: 'Optically, physically, and chemically they are identical. The only difference is their origin. Mined diamonds form in the geological mantle over 1-3 billion years and are excavated, whereas lab-grown diamonds are grown in plasma chambers simulating carbon-crystallizing environments using HPHT or CVD. Under a jeweler\'s loupe they look identical, though professional spectroscopy can distinguish their crystal growth structures.'
  },
  {
    id: 'faq-4',
    category: 'certification',
    question: 'Why is GIA, IGI, or HRD Antwerp certification crucial?',
    answer: 'Certification provides an objective, scientific laboratory report verifying the diamond\'s carat weight, color grade, clarity level, and cut perfection. Without standard independent laboratory testing, buyers run the risk of overpaying for synthetic alternatives or artificial treatments which are hard to detect visually.'
  },
  {
    id: 'faq-5',
    category: '4cs',
    question: 'How should I prioritize the 4Cs when buying a Champagne or Cognac diamond?',
    answer: 'Unlike white diamonds (where you want to avoid Color), in Champagne and Cognac diamonds, Color is the premium! You should prioritize highly saturated, rich colors (C3 to C7 grades) and excellent Cuts (which maximize the diamond\'s golden fire and luster). Because these warm colors hide microscopic blemishes very well, you can safely drop the Clarity to VS2 or SI1 to maximize your Carat budget!'
  }
];
