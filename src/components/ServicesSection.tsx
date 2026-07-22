import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Tag, Building2, Rocket, Briefcase, UserCheck, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { t } = useLanguage();
  const icons = [Building2, Rocket, Briefcase, UserCheck, Layers];

  return (
    <section id="services" className="py-24 md:py-36 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block">
            {t.services.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
            {t.services.title}<span className="text-blue-600">.</span>
          </h2>
          <p className="text-neutral-600 text-lg mt-4 font-normal">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.cards.map((service, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-950 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-xl relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-neutral-950 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {service.timeline}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-neutral-950">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      {service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-neutral-50 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 text-xs font-semibold text-neutral-800"
                  >
                    <span>{t.services.requestBrief}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
