import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Zap, ChevronRight, Sparkles, Compass, Package, Scissors } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      id: 'enjinlab',
      title: 'Enjin Lab',
      category: 'Pricelist & Commission Studio',
      badge: 'Flagship Project',
      description: 'Platform pricelist commission & layanan digital dengan layout modern, struktur komisi transparan, dan integrasi pemesanan langsung.',
      metrics: { perf: '100', load: '0.3s', conversion: '+240%' },
      tech: ['React', 'Tailwind CSS', 'Vercel'],
      previewUrl: 'https://enjinlab.vercel.app',
      icon: Sparkles,
      uiMockup: (
        <div className="w-full h-full bg-neutral-950 p-6 text-white rounded-xl flex flex-col justify-between border border-neutral-800">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">E</div>
              <span className="font-display font-bold text-base tracking-tight">ENJIN LAB</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 text-[10px] font-mono border border-blue-800">COMMISSION STUDIO</span>
          </div>
          <div className="space-y-4 my-6">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-white leading-tight">
              DIGITAL COMMISSION & SERVICES PRICELIST.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-400">STARTER PACK</div>
                <div className="text-base font-bold text-blue-400">High Conversion</div>
              </div>
              <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-400">SPEED</div>
                <div className="text-base font-bold text-white">Sub-Second Renders</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>LIVE AT ENJINLAB.VERCEL.APP</span>
            <span className="text-blue-400 font-bold">VERIFIED PRODUCTION →</span>
          </div>
        </div>
      ),
    },
    {
      id: 'kerentravel',
      title: 'Keren Travel',
      category: 'Travel & Tour Agency Portal',
      badge: 'Featured Case Study',
      description: 'Website agen perjalanan & paket wisata dengan tampilan katalog destinasi yang menarik, responsif, dan tombol WhatsApp booking instan.',
      metrics: { perf: '98', load: '0.4s', conversion: '+195%' },
      tech: ['React', 'Netlify CDN', 'WhatsApp API'],
      previewUrl: 'https://kerentravel.netlify.app',
      icon: Compass,
      uiMockup: (
        <div className="w-full h-full bg-slate-900 p-6 text-white rounded-xl flex flex-col justify-between border border-blue-900/40">
          <div className="flex justify-between items-center">
            <span className="font-display font-bold text-base text-blue-400">KEREN TRAVEL & TOUR</span>
            <span className="text-[10px] font-mono text-emerald-400">BOOKING ACTIVE</span>
          </div>
          <div className="space-y-3 my-6">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-[10px] font-mono text-slate-400 mb-1">PAKET WISATA POPULER</div>
              <div className="text-xl font-bold font-display text-white">EXPLORE DESTINASI IMPIAN</div>
              <div className="text-xs text-blue-300 mt-2">Daftar Paket Lengkap • Reservasi Cepat via WhatsApp</div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>KERENTRAVEL.NETLIFY.APP</span>
            <span className="text-blue-400">MOBILE READY</span>
          </div>
        </div>
      ),
    },
    {
      id: 'afcsesrika',
      title: 'AFC Sesrika',
      category: 'Health Product Showcase',
      badge: 'Direct Sales Site',
      description: 'Landing page produk kesehatan premium dengan fokus pada kepercayaan merek, manfaat produk, testimoni, serta alur pemesanan produk.',
      metrics: { perf: '99', load: '0.35s', conversion: '+280%' },
      tech: ['React', 'Tailwind', 'Vercel'],
      previewUrl: 'https://afcsesrika.vercel.app',
      icon: Package,
      uiMockup: (
        <div className="w-full h-full bg-stone-900 p-6 text-stone-100 rounded-xl flex flex-col justify-between border border-stone-800">
          <div className="flex justify-between items-center">
            <span className="font-bold text-base text-amber-300">AFC SESRIKA PRODUCT</span>
            <span className="text-[10px] font-mono text-stone-400">HEALTH & WELLNESS</span>
          </div>
          <div className="my-6 space-y-2 text-center">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">ORIGINAL PRODUCT</div>
            <div className="text-2xl font-bold font-display text-white">PRODUK KESEHATAN TERPERCAYA</div>
            <p className="text-[11px] text-stone-400 max-w-xs mx-auto">Informasi lengkap, sertifikasi, dan kemudahan konsultasi.</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-700/40 text-center text-xs font-bold text-amber-200">
            AFCSESRIKA.VERCEL.APP →
          </div>
        </div>
      ),
    },
    {
      id: 'keizatailor',
      title: 'Keiza Tailor',
      category: 'Bespoke Tailoring Atelier',
      badge: 'Service Portfolio',
      description: 'Website portofolio jasa jahit & busana kustom dengan estetika elegan, panduan harga layanan, serta form jadwal pembuatan baju.',
      metrics: { perf: '97', load: '0.45s', conversion: '+175%' },
      tech: ['React', 'Vercel CDN', 'Minimal CSS'],
      previewUrl: 'https://keizatailor.vercel.app',
      icon: Scissors,
      uiMockup: (
        <div className="w-full h-full bg-neutral-950 p-6 text-white rounded-xl flex flex-col justify-between border border-neutral-800">
          <div className="flex justify-between items-center">
            <span className="font-serif italic text-lg text-neutral-200">Keiza Tailor Atelier</span>
            <span className="text-[10px] font-mono text-neutral-400">CUSTOM TAILORING</span>
          </div>
          <div className="space-y-3 my-6">
            <div className="text-xl font-bold font-display text-white">JASA JAHIT & BUSANA KUSTOM</div>
            <p className="text-xs text-neutral-400">Jahitan rapi, presisi tinggi, dan konsultasi desain pakaian sesuai selera Anda.</p>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-neutral-400 pt-3 border-t border-neutral-800">
            <span>KEIZATAILOR.VERCEL.APP</span>
            <span className="text-blue-400 font-bold">PORTOFOLIO JASA →</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-white relative border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block">
            Real Works & Case Studies
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
            Portofolio project nyata yang telah dirancang<span className="text-blue-600">.</span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg mt-3 font-normal">
            Hasil pengerjaan website berkinerja tinggi, responsif, dan terbukti membantu bisnis klien tumbuh.
          </p>
        </div>

        {/* Interactive Showcase Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {projects.map((proj, idx) => {
              const isSelected = selectedProject === idx;
              const Icon = proj.icon;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(idx)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-xl'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-blue-400' : 'text-neutral-400'}`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`}>
                      {proj.badge}
                    </span>
                  </div>

                  <h3 className={`font-display text-xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-neutral-950'}`}>
                    {proj.title}
                  </h3>

                  <div className={`text-xs font-mono mb-2 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {proj.category}
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {proj.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-neutral-800/40 flex items-center justify-between text-xs font-mono">
                    <span className={isSelected ? 'text-blue-400' : 'text-blue-600'}>
                      Perf {proj.metrics.perf}/100
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-white' : 'text-neutral-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Mockup & External Link Launcher */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full min-h-[460px] rounded-3xl bg-neutral-950 p-6 sm:p-8 border border-neutral-800 flex flex-col justify-between shadow-2xl relative overflow-hidden"
              >
                {/* Top Toolbar */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>

                  {/* Clickable URL */}
                  <a
                    href={projects[selectedProject].previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300 hover:text-white hover:border-blue-500 transition-colors flex items-center gap-1.5"
                  >
                    <span>{projects[selectedProject].previewUrl}</span>
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </a>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400">
                    <Zap className="w-3 h-3 fill-blue-500" />
                    <span>{projects[selectedProject].metrics.load}</span>
                  </div>
                </div>

                {/* Main Preview Screen */}
                <div className="flex-1 rounded-2xl overflow-hidden mb-6 min-h-[260px]">
                  {projects[selectedProject].uiMockup}
                </div>

                {/* Bottom Tech & Direct Open Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    {projects[selectedProject].tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={projects[selectedProject].previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs font-sans transition-colors shadow-md shadow-blue-600/20"
                  >
                    <span>Kunjungi Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
