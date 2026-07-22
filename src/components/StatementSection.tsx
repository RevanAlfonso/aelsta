import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const StatementSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24 md:py-36 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest uppercase text-blue-500 mb-4 block"
          >
            {t.statement.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
          >
            {t.statement.title}<span className="text-blue-500">.</span>
          </motion.h2>
        </div>

        {/* 3 Pure Typography Columns (Each paragraph max 3 lines) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-neutral-800 pt-16">
          {t.statement.points.map((point, index) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-4">
                  {point.label}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
                  {point.title}
                </h3>

                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                  {point.desc}
                </p>
              </div>

              <div className="mt-8 w-12 h-0.5 bg-blue-600" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
