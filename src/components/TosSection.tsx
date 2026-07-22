import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, FileSearch, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TosSectionProps {
  onOpenTosModal: () => void;
}

export const TosSection: React.FC<TosSectionProps> = ({ onOpenTosModal }) => {
  const { t } = useLanguage();
  const icons = [RefreshCw, FileSearch, CreditCard, ShieldCheck];

  return (
    <section id="tos" className="py-24 bg-neutral-50 relative border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block">
              {t.tos.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
              {t.tos.title}<span className="text-blue-600">.</span>
            </h2>
          </div>

          <button
            onClick={onOpenTosModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-neutral-200 hover:border-neutral-950 text-neutral-800 text-xs font-mono font-semibold transition-all shadow-2xs"
          >
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span>{t.tos.fullDocumentCta}</span>
          </button>
        </div>

        {/* 4 Policy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.tos.points.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-neutral-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-neutral-950 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] font-mono text-neutral-400">
                  Transparansi 100%
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
