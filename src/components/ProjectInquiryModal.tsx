import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Business Website',
}) => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(initialService);
  const [targetMarket, setTargetMarket] = useState('UMKM');
  const [budgetRange, setBudgetRange] = useState('Starter (Rp150.000)');
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Halo Aelsta Studio,

Saya ingin memulai project pembuatan website dengan rincian:
• Nama/Bisnis: ${clientName || 'Calon Klien'}
• Jenis Project: ${selectedService}
• Segment/Target: ${targetMarket}
• Paket/Budget: ${budgetRange}
• Catatan Tambahan: ${notes || 'Tidak ada'}

Mohon informasi langkah selanjutnya. Terima kasih!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/6281234567890?text=${encodedText}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-200 z-10 my-8 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.modal.badge}</span>
            </div>
            <h3 className="font-display text-3xl font-extrabold text-neutral-950 tracking-tight">
              {t.modal.title}<span className="text-blue-600">.</span>
            </h3>
            <p className="text-neutral-500 text-sm mt-1">
              {t.modal.desc}
            </p>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                {t.modal.nameLabel}
              </label>
              <input
                type="text"
                required
                placeholder={t.modal.namePlaceholder}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                {t.modal.serviceLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Business Website',
                  'Landing Page',
                  'Company Profile',
                  'Portfolio Website',
                  'Custom Website',
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSelectedService(s)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedService === s
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                {t.modal.marketLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['UMKM', 'Startup', 'Personal Brand', 'Professional Services'].map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setTargetMarket(m)}
                    className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                      targetMarket === m
                        ? 'border-neutral-950 bg-neutral-950 text-white font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                {t.modal.budgetLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Starter (Rp150.000)', desc: 'Free Hosting Vercel/Netlify + SSL + Responsive' },
                  { name: 'Professional (Custom Quote)', desc: 'Custom Domain + Business Email + Advanced SEO' },
                ].map((b) => (
                  <button
                    type="button"
                    key={b.name}
                    onClick={() => setBudgetRange(b.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      budgetRange === b.name
                        ? 'border-blue-600 bg-blue-50/40 text-neutral-950'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-950">{b.name}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{b.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                {t.modal.notesLabel}
              </label>
              <textarea
                rows={2}
                placeholder={t.modal.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.modal.submitBtn}</span>
            </button>

          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
