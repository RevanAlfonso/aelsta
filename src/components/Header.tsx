import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.whyUs, href: '#why-us' },
    { name: t.nav.story, href: '#story' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.work, href: '#portfolio' },
    { name: t.nav.process, href: '#process' },
    { name: 'Blog', href: '#blog' },
    { name: t.nav.tos, href: '#tos' },
    { name: t.nav.faq, href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-white/80 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Aelsta Studio Logo"
              className="w-9 h-9 rounded-xl object-contain bg-neutral-950 p-1 group-hover:scale-105 transition-transform duration-300 shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-neutral-900 leading-none">
                Aelsta<span className="text-blue-600">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono mt-0.5">
                Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide uppercase text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Actions: Language Switcher & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 bg-white hover:border-neutral-950 text-xs font-mono font-semibold text-neutral-800 transition-all shadow-2xs"
              title="Switch Language (ID / EN)"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang}</span>
              <span className="text-[10px] text-neutral-400 font-normal">
                ({lang === 'ID' ? 'EN' : 'ID'})
              </span>
            </button>

            {/* Start Project Button */}
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-neutral-950 hover:bg-blue-600 transition-all duration-300 group shadow-xs"
            >
              <span>{t.nav.startProject}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-full border border-neutral-200 text-xs font-mono font-bold text-neutral-800 bg-white"
            >
              {lang}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-neutral-200 px-6 py-8 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-neutral-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 hover:text-blue-600 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                </a>
              ))}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Language / Bahasa</span>
                <button
                  onClick={toggleLang}
                  className="px-4 py-1.5 rounded-full border border-neutral-300 text-xs font-mono font-bold text-neutral-900 bg-neutral-50"
                >
                  {lang === 'ID' ? 'Bahasa Indonesia (ID)' : 'English (EN)'}
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-xs tracking-wider"
              >
                <span>{t.nav.startProject}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
