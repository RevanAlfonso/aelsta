import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  onOpenInquiry: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-36 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="p-10 md:p-20 rounded-3xl bg-neutral-950 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.cta.badge}</span>
            </span>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t.cta.title}<span className="text-blue-500">?</span>
            </h2>

            <p className="text-neutral-300 text-base md:text-xl max-w-xl mx-auto font-normal">
              {t.cta.subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-600/25 group"
              >
                <span>{t.cta.buttonPrimary}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Aelsta,%20saya%20ingin%20konsultasi%20pembuatan%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold text-sm hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>{t.cta.buttonWhatsApp}</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
