import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics'>('overview');
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-white">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{t.hero.statusBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight text-neutral-950 leading-[0.95] mb-8"
            >
              {t.hero.headlinePart1}<br />
              <span className="text-blue-600">{t.hero.headlineAccent}</span><br />
              {t.hero.headlinePart2}<span className="text-neutral-400">.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 max-w-xl font-normal leading-relaxed mb-10"
            >
              {t.hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold text-sm tracking-wide hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-600/10 group"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm tracking-wide hover:border-neutral-950 hover:bg-neutral-50 active:scale-[0.98] transition-all"
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </motion.div>

            {/* Target Audience Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-neutral-100 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-medium"
            >
              <span className="text-neutral-400 font-mono">{t.hero.powering}</span>
              {t.hero.targets.map((target, idx) => (
                <React.Fragment key={target}>
                  <span className="hover:text-neutral-900 transition-colors">{target}</span>
                  {idx < t.hero.targets.length - 1 && <span className="text-neutral-300">•</span>}
                </React.Fragment>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Premium Interactive Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl bg-white border border-neutral-200/90 shadow-2xl overflow-hidden">
              
              {/* Browser Header Bar */}
              <div className="px-4 py-3 bg-neutral-950 flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                </div>

                <div className="flex-1 max-w-xs mx-4 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                  <span className="truncate text-neutral-300">aelsta.com/preview</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>

                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-md border border-neutral-800 text-neutral-400">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1 rounded ${deviceView === 'desktop' ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'}`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1 rounded ${deviceView === 'mobile' ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'}`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mockup Body */}
              <div className={`p-6 bg-slate-50 transition-all duration-300 ${deviceView === 'mobile' ? 'max-w-[280px] mx-auto py-8' : 'w-full'}`}>
                
                <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.png"
                      alt="Aelsta Core Engine"
                      className="w-9 h-9 rounded-lg object-contain bg-neutral-950 p-1"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{t.hero.mockupTitle}</h4>
                      <p className="text-[10px] text-neutral-500">React • Tailwind • Lenis</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono font-semibold border border-blue-100">
                    <Zap className="w-3 h-3 fill-blue-600 stroke-blue-600" />
                    <span>0.4s</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'overview'
                        ? 'bg-neutral-950 text-white'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {t.hero.visualCanvas}
                  </button>
                  <button
                    onClick={() => setActiveTab('metrics')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'metrics'
                        ? 'bg-neutral-950 text-white'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {t.hero.lighthouseScore}
                  </button>
                </div>

                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-24 h-3 bg-neutral-900 rounded-full" />
                        <span className="text-[10px] font-mono text-neutral-400">{t.hero.trustScore}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-blue-600 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                        <span>{t.hero.responsiveGrid}</span>
                        <span className="text-blue-600 font-semibold">Verified</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white border border-neutral-200">
                        <div className="text-[10px] font-mono text-neutral-400 mb-1">{t.hero.loadTime}</div>
                        <div className="text-base font-bold text-neutral-900 font-display">0.4s Ultra Fast</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-neutral-200">
                        <div className="text-[10px] font-mono text-neutral-400 mb-1">{t.hero.conversion}</div>
                        <div className="text-base font-bold text-blue-600 font-display">+180% High</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'metrics' && (
                  <div className="p-4 rounded-xl bg-white border border-neutral-200">
                    <div className="text-xs font-bold text-neutral-900 mb-3 flex items-center justify-between">
                      <span>Google Lighthouse Audit</span>
                      <span className="text-[10px] font-mono text-blue-600">PASSED</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { label: 'PERF', val: '100' },
                        { label: 'A11Y', val: '100' },
                        { label: 'BP', val: '100' },
                        { label: 'SEO', val: '100' },
                      ].map((item) => (
                        <div key={item.label} className="p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                          <div className="w-8 h-8 mx-auto mb-1 rounded-full border-2 border-blue-600 flex items-center justify-center text-xs font-bold text-blue-700">
                            {item.val}
                          </div>
                          <span className="text-[9px] font-mono text-neutral-600">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-600" /> Vercel / Netlify Ready
                  </span>
                  <span>SSL Active</span>
                </div>

              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xl hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">{t.hero.customCodeQuality}</div>
                <div className="text-[11px] text-neutral-500">{t.hero.codeDetails}</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
