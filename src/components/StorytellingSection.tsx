import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StorytellingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const icons = [Globe, ShieldCheck, Zap, TrendingUp];

  return (
    <section id="story" className="py-24 md:py-36 bg-white relative border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block">
            {t.story.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
            {t.story.title}<span className="text-blue-600">.</span>
          </h2>
        </div>

        {/* Story Progression Pipeline Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {t.story.steps.map((step, idx) => {
            const Icon = icons[idx];
            const isActive = activeStep === idx;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-blue-600' : 'text-neutral-400'}`}>
                    0{idx + 1}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-neutral-400'}`} />
                </div>
                <div className={`font-display font-bold text-lg ${isActive ? 'text-neutral-950' : 'text-neutral-600'}`}>
                  {step.title}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {step.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Focus Display Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.4 }}
          className="p-8 md:p-12 rounded-3xl bg-neutral-950 text-white relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-400 text-xs font-mono">
              <span>STEP 0{activeStep + 1} OF 04</span>
              <span>•</span>
              <span>{t.story.steps[activeStep].tagline}</span>
            </div>

            <h3 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.story.steps[activeStep].title}
            </h3>

            <p className="text-neutral-300 text-base md:text-xl font-normal leading-relaxed max-w-2xl">
              {t.story.steps[activeStep].description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm font-mono text-neutral-400">
              <span className="flex items-center gap-2 text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {t.story.steps[activeStep].highlight}
              </span>
              <span>•</span>
              <span>{t.story.steps[activeStep].metric}</span>
            </div>
          </div>

          {/* Right Column: Visual Graphic Block */}
          <div className="lg:col-span-4 relative z-10 flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
              {React.createElement(icons[activeStep], { className: 'w-8 h-8' })}
            </div>
            <div className="text-xl font-bold font-display text-white mb-1">
              {t.story.steps[activeStep].metric}
            </div>
            <div className="text-xs text-neutral-400 font-mono mb-6">
              {t.story.steps[activeStep].highlight}
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % t.story.steps.length)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
            >
              <span>{t.story.nextPhase}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
