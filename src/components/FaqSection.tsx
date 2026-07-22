import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 md:py-36 bg-white relative border-b border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block">
            {t.faq.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            {t.faq.title}<span className="text-blue-600">.</span>
          </h2>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-4">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-neutral-200/90 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-display font-bold text-base md:text-lg text-neutral-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-neutral-50/50"
                    >
                      <div className="p-6 pt-0 text-sm md:text-base text-neutral-600 leading-relaxed border-t border-neutral-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
