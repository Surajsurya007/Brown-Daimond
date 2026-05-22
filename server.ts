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
      const replyText = response.text || "I apologize, I am unable to elaborate on that specific diamond profile at this moment.";

      res.json({
        reply: replyText,
        history: [
          ...(history || []),
          { role: 'user', parts: [{ text: message }] },
          { role: 'model', parts: [{ text: replyText }] }
        ]
      });
    } catch (err: any) {
      console.error('Gemini proxy server error:', err);
      res.status(500).json({
        error: 'Failed to consult the luxury diamond advisor.',
        details: err.message,
        missingKey: !process.env.GEMINI_API_KEY,
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
