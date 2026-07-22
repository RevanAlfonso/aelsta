import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Code2, Search, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StatsSection: React.FC = () => {
  const { t } = useLanguage();
  const icons = [Zap, Smartphone, Search, CheckCircle2, Code2];

  return (
    <section className="py-24 bg-neutral-50 relative border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block">
              {t.stats.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
              {t.stats.title}<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-mono shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>{t.stats.targetScore}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.stats.items.map((stat, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-blue-600/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white text-neutral-800 flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="font-display text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight mb-2">
                    {stat.value}
                  </div>

                  <div className="text-sm font-bold text-neutral-800 mb-1">
                    {stat.label}
                  </div>
                </div>

                <div className="text-xs text-neutral-500 pt-4 border-t border-neutral-100 font-normal leading-relaxed">
                  {stat.subText}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scorecard Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg font-mono">
              95+
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.stats.guaranteeTitle}</div>
              <div className="text-xs text-neutral-400">{t.stats.guaranteeDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Performance: 95+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Accessibility: 100</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>SEO: 100</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
