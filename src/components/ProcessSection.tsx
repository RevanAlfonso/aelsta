import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Search, FileText, Palette, Code2, Rocket, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const icons = [Search, FileText, Palette, Code2, Rocket, HeartHandshake];

  return (
    <section id="process" className="py-24 md:py-36 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-blue-500 mb-3 block">
            {t.process.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.process.title}<span className="text-blue-500">.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg mt-4">
            {t.process.subtitle}
          </p>
        </div>

        {/* Timeline Horizontal Progress Bar */}
        <div className="relative mb-16 hidden md:block">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2 z-0" />

          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0"
            animate={{ width: `${((activeStep + 1) / t.process.steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />

          <div className="relative z-10 flex justify-between">
            {t.process.steps.map((_, idx) => {
              const isPastOrCurrent = idx <= activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                    isPastOrCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-neutral-950 shadow-lg shadow-blue-600/20'
                      : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  0{idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.process.steps.map((step, idx) => {
            const Icon = icons[idx];
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setActiveStep(idx)}
                className={`p-8 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? 'bg-neutral-900 border-blue-600 shadow-xl'
                    : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                    PHASE 0{idx + 1}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-neutral-500'}`} />
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>

                <div className="text-xs font-mono text-blue-400 mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.deliverable}</span>
                </div>

                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
