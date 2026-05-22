/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Gem, HelpCircle, Loader2, RefreshCw } from 'lucide-react';

interface ChatbotProps {
  isLightTheme: boolean;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

const parseBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-amber-500 font-bold font-sans">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderMessageText = (text: string) => {
  const segments = text.split('\n');
  return segments.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={idx} className="h-1.5" />;
    }

    if (trimmed.startsWith('###')) {
      const headerText = trimmed.replace(/^###\s*/, '');
      return (
        <h5
          key={idx}
          className="font-serif font-semibold text-amber-500 mt-2.5 mb-1 text-sm tracking-tight"
        >
          {parseBoldText(headerText)}
        </h5>
      );
    } else if (trimmed.startsWith('#')) {
      const headerText = trimmed.replace(/^#+\s*/, '');
      return (
        <h4
          key={idx}
          className="font-serif font-bold text-amber-500 mt-3 mb-1 text-sm tracking-tight"
        >
          {parseBoldText(headerText)}
        </h4>
      );
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.substring(2);
      return (
        <div key={idx} className="flex gap-1.5 pl-1.5 py-0.5 leading-relaxed items-start">
          <span className="text-amber-500 shrink-0 select-none">•</span>
          <span className="flex-1">{parseBoldText(itemText)}</span>
        </div>
      );
    }

    const matchNumbered = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (matchNumbered) {
      const num = matchNumbered[1];
      const itemText = matchNumbered[2];
      return (
        <div key={idx} className="flex gap-1.5 pl-1.5 py-0.5 leading-relaxed items-start">
          <span className="text-amber-500 font-mono font-bold shrink-0 select-none">{num}.</span>
          <span className="flex-1">{parseBoldText(itemText)}</span>
        </div>
      );
    }

    return (
      <p key={idx} className="py-0.5 leading-relaxed">
        {parseBoldText(line)}
      </p>
    );
  });
};

export default function Chatbot({ isLightTheme }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recommendedPrompts = [
    "What are Champagne vs Cognac diamonds?",
    "Why are brown diamonds becoming popular?",
    "What is the GIA C1-C7 color scale?",
    "Natural vs Lab Grown: What are the trade-offs?"
  ];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setErrorText(null);
    setIsLoading(true);

    const userMsg: ChatMessage = { role: 'user', parts: [{ text: textToSend }] };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect to the advisor server.');
      }

      setMessages(data.history || [...messages, userMsg, { role: 'model', parts: [{ text: data.reply }] }]);
    } catch (err: any) {
      console.error('Chat advice failed:', err);
      setErrorText(err.message || 'Apologies, our concierge is momentarily offline.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const sidebarBg = isLightTheme
    ? 'bg-[#ffffff] border-amber-900/10 text-stone-900 shadow-2xl'
    : 'bg-[#0a0908] border-amber-900/20 text-stone-100 shadow-2xl';

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-100 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer active:scale-95"
          title="Consult Luxury Advisor"
        >
          <div className="absolute -inset-1.5 rounded-full bg-amber-500/30 blur opacity-75 group-hover:opacity-100 transition duration-300" />
          <div className="relative flex items-center gap-1.5">
            <MessageSquare className="h-6 w-6" />
            <span className="hidden md:inline text-xs uppercase font-bold tracking-widest font-mono pr-1">
              {isOpen ? 'Close Advisor' : 'Consult Advisor'}
            </span>
          </div>
        </button>
      </div>

      {/* Sidebar Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[410px] h-[520px] rounded-3xl border z-50 flex flex-col overflow-hidden backdrop-blur-md ${sidebarBg}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-amber-900/15 flex items-center justify-between bg-amber-500/5">
              <div className="flex items-center gap-2">
                <Gem className="h-5 w-5 text-amber-500 animate-pulse" />
                <div>
                  <h4 className="font-serif text-sm font-bold tracking-tight text-amber-500">
                    Brown Daimond Concierge
                  </h4>
                  <p className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">
                    Official Gemological Liaison
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-amber-900/10 rounded-full text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Core */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 Scrollbar scroll-smooth">
              
              {/* Introduction statement from system */}
              <div className="flex gap-2 items-start bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10 text-xs">
                <Gem className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-stone-300">
                  Welcome to <strong className="text-amber-500">Brown Daimond</strong> fine education. I am your exclusive gemological advisor. Ask me anything on Argyle mines, natural brown shades (Champagne C1-C7), lab synthetics, certifications, GIA authenticity, or jewelry mount combinations.
                </p>
              </div>

              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-amber-600 text-stone-100 rounded-tr-none'
                          : 'bg-stone-900/80 border border-amber-900/10 text-stone-200 rounded-tl-none'
                      }`}
                    >
                      {renderMessageText(msg.parts[0].text)}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-2xl bg-stone-900/80 border border-amber-905/10 text-stone-400 text-xs rounded-tl-none flex items-center gap-2">
                    <Loader2 className="h-4.5 w-4.5 text-amber-500 animate-spin" />
                    <span>Liaison is reading certificates...</span>
                  </div>
                </div>
              )}

              {errorText && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3 text-xs text-rose-455 space-y-2">
                  <p className="font-semibold">{errorText}</p>
                  <p className="text-[10px] opacity-80 leading-snug">
                    Make sure your <strong>Secrets</strong> panel has a valid <strong>GEMINI_API_KEY</strong> set.
                  </p>
                  <button
                    onClick={() => handleSendMessage("Re-attempt connection")}
                    className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 font-bold uppercase tracking-wider text-[9px] rounded-lg cursor-pointer text-rose-300"
                  >
                    <RefreshCw className="h-3 w-3" /> Retry Consultation
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Recommended quick clicks (only show if chat is relative short or empty) */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 py-2 border-t border-amber-900/10 bg-amber-950/5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-stone-500 block mb-1.5 font-mono">
                  Suggested inquiries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recommendedPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p)}
                      className="px-2.5 py-1 bg-stone-900/90 hover:bg-amber-500/10 border border-amber-900/15 duration-200 text-[10px] text-stone-300 hover:text-amber-400 rounded-full text-left font-medium cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-amber-900/15 bg-stone-950/40 flex gap-2">
              <input
                type="text"
                placeholder="Ask our diamond council..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className={`flex-1 px-3.5 py-2 rounded-xl text-xs border focus:ring-1 focus:ring-amber-500 focus:outline-none ${
                  isLightTheme
                    ? 'bg-white border-stone-200 text-stone-900'
                    : 'bg-stone-900 border-amber-900/30 text-stone-100 placeholder-stone-500'
                }`}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl cursor-pointer transition-colors"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
