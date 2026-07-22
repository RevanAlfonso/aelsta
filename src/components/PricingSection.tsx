import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageSquare, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PricingSectionProps {
  onOpenInquiry: (planName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 md:py-36 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest uppercase text-blue-500 mb-3 block font-semibold"
          >
            {t.pricing.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            {t.pricing.title}<span className="text-blue-500">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-base md:text-lg font-normal"
          >
            {t.pricing.subtitle}
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Starter */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest uppercase text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-950 border border-blue-800">
                  {t.pricing.starterTitle}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Fast Delivery</span>
              </div>

              <div className="mb-6">
                <div className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {t.pricing.starterPrice}
                </div>
                <div className="text-xs text-blue-400 font-mono mt-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>{t.pricing.oneTime}</span>
                </div>
              </div>

              <p className="text-neutral-300 text-sm mb-8 leading-relaxed">
                {t.pricing.starterDesc}
              </p>

              <div className="space-y-4 mb-10">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                  {t.pricing.includesHeader}
                </div>
                {t.pricing.starterItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-neutral-200">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Explicit Complexity Disclaimer Note */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-300 font-mono mb-6 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{t.pricing.note}</span>
              </div>

              <button
                onClick={() => onOpenInquiry(`Starter (${t.pricing.starterPrice})`)}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-100 transition-colors group"
              >
                <span>{t.pricing.starterCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

          {/* Card 2: Professional */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 md:p-12 rounded-3xl bg-blue-950/40 border border-blue-600/40 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-600/5"
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-mono tracking-widest uppercase px-4 py-1.5 rounded-bl-xl font-bold">
              Recommended for Growth
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest uppercase text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-900/60 border border-blue-600">
                  {t.pricing.proTitle}
                </span>
              </div>

              <div className="mb-6">
                <div className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {t.pricing.proPrice}
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-2">
                  {t.pricing.proSubtitle}
                </div>
              </div>

              <p className="text-neutral-300 text-sm mb-8 leading-relaxed">
                {t.pricing.proDesc}
              </p>

              <div className="space-y-4 mb-10">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                  {t.pricing.includesHeader}
                </div>
                {t.pricing.proItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-neutral-100">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] text-neutral-400 font-mono mb-6">
                {t.pricing.proNote}
              </p>

              <button
                onClick={() => onOpenInquiry(`Professional (${t.pricing.proPrice})`)}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 group"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.pricing.proCta}</span>
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
