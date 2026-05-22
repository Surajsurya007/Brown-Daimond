/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Lazy-initialize Gemini API to prevent app crash if key is momentarily missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing from environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

function getLocalFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('champagne')) {
    return `### **Champagne Diamonds: Understated Elegance**\n\n` +
      `Champagne diamonds display light gold, straw, or champagne-colored undertones with a subtle yellow flash. Classified on the Argyle scale from **C1 (light champagne)** to **C4 (medium-gold champagne)**, they represent understated luxury.\n\n` +
      `**Key Merits:**\n` +
      `- **Unique Warm Aesthetic:** Their warm, blush-gold tint pairs exquisitely with yellow and rose golds.\n` +
      `- **Superb Sparkle:** Their lighter body tint lets in more light, creating a bright and soft sparkle.\n` +
      `- **Value Optimization:** Because warm tints mask microscopic inclusions exceptionally well, we recommend prioritizing an *Excellent Cut* while choosing an eye-clean *VS2* or *SI1 Clarity* to maximize your Carat size.\n\n` +
      `*Brown Daimond offers fully certified, premium Champagne gems to add warm brilliance to your custom bridal jewelry.*`;
  }
  
  if (msg.includes('cognac')) {
    return `### **Cognac Diamonds: Dramatic & Intense**\n\n` +
      `Cognac diamonds display deep brown body colors with secondary orange, reddish, or amber burning flashes. Ranked **C5 to C7** on the Argyle scale (C7 representing the deepest, most saturated cognac tone), they embody rich, vintage glamour.\n\n` +
      `**Core Characteristics:**\n` +
      `- **Dramatic Color Profile:** Resembling aged French brandy, they have an intense, moody depth.\n` +
      `- **Unmatched Durability:** They score 10 on the Mohs hardness scale, assuring their amber brilliance remains pristine forever.\n` +
      `- **Design Contrast:** They create a spectacular frame or center stone, particularly when accented with small colorless white diamond halo settings.\n\n` +
      `*Our master curators at Brown Daimond recommend choosing customized GIA/IGI certified cuts to unlock the true inner fiery flash of Cognac stones.*`;
  }
  
  if (msg.includes('chocolate')) {
    return `### **Chocolate Diamonds: Deep & Velvety**\n\n` +
      `"Chocolate diamonds" is a popular, highly coveted marketing term used to describe rich, medium-to-dark brown diamonds with delicious, velvety secondary warmth.\n\n` +
      `**Why They Are Coveted:**\n` +
      `- **Elegant Color:** They offer a deep brown tone resembling premium high-cocoa chocolate, which pairs wonderfully with 18k rose and yellow golds.\n` +
      `- **Astounding Value:** They generally afford a 20% to 30% price-per-carat advantage compared to traditional colorless white diamonds of identical weight.\n` +
      `- **Authenticity:** Genuine chocolate-colored diamonds are genuine minerals formed over a billion years under high pressure, maintaining top-tier refraction.\n\n` +
      `*Explore the Brown Daimond custom collection to view our premium velvety-brown and amber offerings.*`;
  }
  
  if (msg.includes('lab') || msg.includes('synthetic')) {
    return `### **Natural Mined vs. Lab-Grown Diamonds**\n\n` +
      `Modern technology has opened stunning doors. Here is the objective gemological breakdown between natural (geological) and lab-grown diamonds:\n\n` +
      `1. **Chemical & Physical Identity:** Lab-grown diamonds are *not* imitations—they are 100% chemically, physically, and optically identical to geological mined diamonds. Both are pure carbon crystal lattices scoring 10 on the Mohs hardness scale.\n` +
      `2. **Origin & Growth:** Natural diamonds crystallized deep in the Earth's mantle 1–3 billion years ago under immense geological heat. Lab-grown diamonds are synthesized over a few weeks using advanced plasma technology: **HPHT** (High-Pressure High-Temperature) or **CVD** (Chemical Vapor Deposition).\n` +
      `3. **Pricing:** Lab-grown diamonds are up to 70% to 80% more affordable, allowing you to maximize carat weight. Natural diamonds, however, carry high prestige, extreme geological rarity, and long-term heirloom resale value.\n\n` +
      `*At Brown Daimond, we provide pristine options of both natural mined gems with GIA grading and high-tech lab-grown diamonds marked with clear certifications.*`;
  }

  if (msg.includes('4cs') || msg.includes('carat') || msg.includes('clarity') || msg.includes('cut') || msg.includes('color')) {
    return `### **Maximizing the 4Cs (Carat, Cut, Color, Clarity) for Brown Diamonds**\n\n` +
      `To optimize your budget and secure the most magnificent diamond, our Elite Diamond Council recommends adjusting the 4Cs priorities specifically for colored/brown stones:\n\n` +
      `- **Color (Priority High):** In Champagne and Cognac diamonds, color intensity is your primary premium! Aim for rich, saturated tints from **C1 to C7** to match your personal style.\n` +
      `- **Cut (Priority Highest):** This is the most crucial choice. An **Excellent or Ideal cut** is mandatory to redirect light through the warm brown lattice and create brilliant golden flashes.\n` +
      `- **Clarity (Optimize Budget):** You can safely drop to **VS2 or eye-clean SI1/SI2**. Warm champagne and brandy body colors mask microscopic feathers and inclusions beautifully without impacting sparkle.\n` +
      `- **Carat (Enjoy Savings):** Since Champagne and Cognac stones are 20% to 30% more economical than colorless white diamonds, use your excess budget to scale up to larger, jaw-dropping carat sizes!\n\n` +
      `*Our online education sections include detailed interactive comparison matrices to help you find your sweet spot.*`;
  }
  
  if (msg.includes('certif') || msg.includes('gia') || msg.includes('igi') || msg.includes('hrd') || msg.includes('authentic')) {
    return `### **Independent Diamond Certifications**\n\n` +
      `Every fine jewelry purchase must be protected by an independent, scientific gemological evaluation report. Verified labs include:\n\n` +
      `- **GIA (Gemological Institute of America):** Globally respected as the gold-standard of diamond grading. They establish strict color, cut, and clarity scales.\n` +
      `- **IGI (International Gemological Institute):** Very popular for both natural and lab-grown diamonds, providing top-tier, highly transparent criteria reports.\n` +
      `- **HRD Antwerp:** Famous European registry, globally respected for advanced scientific stone structural analyses.\n\n` +
      `*Brown Daimond guarantees that every single centerpiece on our platform includes an authentic laboratory report with matching laser inscriptions.*`;
  }
  
  if (msg.includes('use') || msg.includes('industrial') || msg.includes('bort') || msg.includes('hardness') || msg.includes('laser')) {
    return `### **High-Tech & Industrial Diamond Applications**\n\n` +
      `Diamonds are not just for rings—they drive global technological breakthroughs. Over 80% of geological rough diamonds (called **Bort**) are unsuitable for jewelry but vital for high-tech industries:\n\n` +
      `- **Industrial Abrasives:** Diamond powder is utilized to tip concrete drills, mining saws, and marble smoothers.\n` +
      `- **Semiconductor Super-alloys:** Diamonds have the highest thermal conductivity of any natural substance, making them essential substrates for elite high-voltage microchips and space electronics.\n` +
      `- **Deep-Space Laser Optics:** High-purity synthetic diamonds are grown to serve as distortion-free optical output windows for ultra-powerful laser beams.\n\n` +
      `*At Brown Daimond, we celebrate both the gemstone beauty and the scientific engineering marvel of the pure carbon crystal structure.*`;
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('buy') || msg.includes('catalog') || msg.includes('shop') || msg.includes('product') || msg.includes('much') || msg.includes('ring')) {
    return `### **Exquisite Brown Daimond Catalog & Pricing**\n\n` +
      `Warm-toned colored diamonds provide exceptional luxury access. Here are some of our masterfully curated items in our current luxury inventory:\n\n` +
      `1. **The Argyle Monarch Solitaire**\n` +
      `   - *1.5 Carats, C5 Cognac Tone, VS2 Clarity, GIA Certified*\n` +
      `   - **Price:** $4,950\n` +
      `2. **The Laurentian Straw Champagne Halo**\n` +
      `   - *1.2 Carats, C2 Light Champagne tint, VVS2 Clarity, HRD Certified*\n` +
      `   - **Price:** $3,200\n` +
      `3. **The Obsidian Truffle Emerald-Cut**\n` +
      `   - *2.1 Carats, C7 Deep Brandy Cognac, VS1 Clarity, GIA Certified*\n` +
      `   - **Price:** $8,400\n` +
      `4. **Solaris Lab-Grown Golden Brilliance**\n` +
      `   - *1.8 Carats, C3 Medium Champagne, VS1 Clarity, IGI Certified*\n` +
      `   - **Price:** $1,850\n` +
      `5. **Classic Eternal Pristine White**\n` +
      `   - *1.5 Carats, F Colorless, VVS1 Clarity, ideal Cut, GIA Certified*\n` +
      `   - **Price:** $12,500\n\n` +
      `*Our customer concierge will happily schedule a bespoke viewing or direct virtual inspection for any of these masterworks.*`;
  }

  if (msg.includes('care') || msg.includes('clean') || msg.includes('maintain') || msg.includes('wash')) {
    return `### **Luxury Diamond Care & Maintenance**\n\n` +
      `To ensure your Brown Daimond centerpiece retains its vibrant warm-golden fire and scintillation forever, follow these professional care protocols:\n\n` +
      `- **The Golden Bath:** Soak your jewelry once a week in lukewarm water mixed with a few drops of mild dishwashing degreaser.\n` +
      `- **Gentle Polish:** Use a child's soft-bristled toothbrush to gently scrub behind the pavilion and facet edges where skin oils gather.\n` +
      `- **Microfiber Finish:** Dry thoroughly with a clean, lint-free jewelry microfiber cloth.\n` +
      `- **Avoid Ultrasonic:** We advise caution with ultrasonic cleaner machines if your stone is a natural brown diamond with high parallel graining lines, as sonic vibrations can stress lattice boundaries.\n\n` +
      `*Always store your diamond solitaire inside its velvet-lined box separate from other jewelry to prevent surface friction scratches.*`;
  }

  // General fallbacks
  return `### **Welcome to the Brown Daimond Council**\n\n` +
    `I am your exclusive gemological advisor. I would be honored to guide your journey through our curated champagne, cognac, and white diamond education.\n\n` +
    `Ask me anything about:\n` +
    `- **Champagne Diamonds (C1-C4)**: Our shimmering, soft golden-straw stones that offer incredible contemporary appeal.\n` +
    `- **Cognac Diamonds (C5-C7)**: Deep, intense, brandy-hued gems featuring beautiful fiery secondary flashes.\n` +
    `- **The GIA C1-C7 scale**: How miners grade warm-toned colored diamonds.\n` +
    `- **Natural vs. Lab-Grown**: Chemistry reviews, price advantages, and ethical sourcing standards.\n` +
    `- **Pricing & Inventory**: Information on pieces like the *Argyle Monarch*, *Laurentian Straw Halo*, or *Obsidian Truffle*.\n\n` +
    `Tell me what aspect of diamond lore or fine jewelry craft you wish to discover!`;
}

const SYSTEM_INSTRUCTION = `You are the exclusive luxury diamond counselor and educator for the prestigious brand:
  Website Name: Brown Daimond
  Website URL: https://browndaimond.com/
  Support Email: support@browndaimond.com

Your personality is sophisticated, highly educated, elegant, and warm. You provide authoritative expertise regarding diamonds including:
- Natural Diamonds (ethical sourcing, GIA certifications, valuation)
- Lab-Grown Diamonds (HPHT, CVD, chemical identity, value differences)
- Brown Diamonds, Champagne Diamonds (C1-C4 ranks), Cognac Diamonds (C5-C7 deep tones), and Chocolate Diamonds. Highlight their gorgeous warm aesthetics, suitability with yellow/rose gold, and excellent price-to-size value.
- The 4Cs (Carat, Cut, Color, Clarity) and how to optimize them.
- Certification agencies (GIA, IGI, HRD Antwerp) and authenticating verification checks.
- Creative and high-tech Industrial Diamond uses (laser optics, cutting edges, superalloys).

Keep your answers elegantly structured, helpful, objective, and luxury-tier. Avoid robotic listings, use bullet points for readability, and speak like an elite jewelry curator. Ensure you spell the brand name "Brown Daimond" as configured, but always answer with pristine gemological terminology.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Gemini advisor
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message payload is required.' });
      }

      let replyText = "";
      let usedFallback = false;

      try {
        const ai = getGeminiClient();

        // Start sequential chat
        const chat = ai.chats.create({
          model: 'gemini-3.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
          history: history || [],
        });

        const response = await chat.sendMessage({ message });
        replyText = response.text || "I apologize, I am unable to elaborate on that specific diamond profile at this moment.";
      } catch (gemError: any) {
        console.warn('Unable to query Gemini API (potentially expired/invalid key). Triggering local educational council fallback.', gemError.message);
        replyText = getLocalFallbackResponse(message);
        usedFallback = true;
      }

      res.json({
        reply: replyText,
        history: [
          ...(history || []),
          { role: 'user', parts: [{ text: message }] },
          { role: 'model', parts: [{ text: replyText }] }
        ],
        isFallback: usedFallback
      });
    } catch (err: any) {
      console.error('Core chat route failure:', err);
      // Even if core throws, do a guaranteed local backup response with 200 OK
      const backupText = getLocalFallbackResponse(req.body?.message || "");
      res.json({
        reply: backupText,
        history: [
          ...(req.body?.history || []),
          { role: 'user', parts: [{ text: req.body?.message || "Re-attempt" }] },
          { role: 'model', parts: [{ text: backupText }] }
        ],
        isFallback: true
      });
    }
  });

  // API Route: Mock checkout simulation
  app.post('/api/checkout', (req, res) => {
    const { items, totalAmount, email } = req.body;
    
    if (!items || !totalAmount || !email) {
      return res.status(400).json({ error: 'Incomplete transaction parameters.' });
    }

    const orderId = `BD-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `TRACK-${Math.floor(10000000 + Math.random() * 90000000)}`;
    
    res.json({
      success: true,
      orderId,
      trackingNumber,
      message: 'Luxury invoice processed successfully via simulated Razorpay ledger.',
      amountSecured: totalAmount,
      emailReceipt: email,
    });
  });

  // Vite development vs. compiled production middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Luxury Full-Stack Server online at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Fatal server boot failure:', error);
});
