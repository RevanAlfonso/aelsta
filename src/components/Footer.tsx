import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white border-t border-neutral-200/80 text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Aelsta Logo"
            className="w-9 h-9 rounded-xl object-contain bg-neutral-950 p-1"
          />
          <div>
            <span className="font-display font-bold text-lg text-neutral-950 tracking-tight">
              Aelsta<span className="text-blue-600">.</span>
            </span>
            <p className="text-[11px] text-neutral-400 font-mono">
              Crafting Modern Websites.
            </p>
          </div>
        </div>

        {/* Center: Minimal Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono font-medium text-neutral-600">
          <a
            href="mailto:hello@aelsta.com"
            className="hover:text-blue-600 transition-colors"
          >
            hello@aelsta.com
          </a>
          <a
            href="#tos"
            className="hover:text-blue-600 transition-colors"
          >
            {t.footer.termsLink}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
          <span>© {new Date().getFullYear()} Aelsta. {t.footer.rights}</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-950 hover:text-white transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
