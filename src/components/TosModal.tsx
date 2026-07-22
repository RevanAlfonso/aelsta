import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, RefreshCw, FileSearch, CreditCard, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TosModal: React.FC<TosModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  const terms = [
    {
      icon: RefreshCw,
      number: '01',
      title: lang === 'ID' ? 'Ketentuan Revisi (Revision Policy)' : 'Revision Policy & Limits',
      badge: lang === 'ID' ? 'Maksimal 2x Revisi Gratis' : 'Max 2x Free Revisions',
      details: lang === 'ID' ? [
        'Setiap paket pembuatan website di Aelsta sudah mencakup maksimal 2 (dua) kali revisi minor gratis pada tahap pengembangan (Design & Development).',
        'Revisi minor meliputi penyesuaian teks, tata letak sederhana, penggantian warna/aset gambar, atau koreksi minor yang tidak merubah sitemap dasar.',
        'Jika klien meminta revisi di luar batas 2x gratis tersebut, atau meminta revisi setelah website resmi di-deploy / disetujui, maka akan dikenakan biaya tambahan (biaya revisi berbayar) yang dihitung per permintaan.',
      ] : [
        'Every website package at Aelsta includes up to 2 (two) free minor revisions during the development phase.',
        'Minor revisions cover text adjustments, simple layout tweaks, color/image swaps, or minor corrections that do not alter the base sitemap.',
        'Revisions requested beyond the 2x free limit, or requested after official deployment/approval, will incur additional paid revision fees per request.',
      ],
    },
    {
      icon: FileSearch,
      number: '02',
      title: lang === 'ID' ? 'Referensi Desain & Kejelasan Konten' : 'Design References & Content Scope',
      badge: lang === 'ID' ? 'Brief Wajib Jelas' : 'Clear Brief Required',
      details: lang === 'ID' ? [
        'Klien diperbolehkan membawa referensi desain / website inspirasi sendiri, atau menggunakan katalog referensi pilihan dari tim Aelsta.',
        'Klien wajib memberikan instruksi, teks/konten, serta penjelasan struktur website yang jelas dan lengkap pada saat pengisian brief awal.',
        'Perubahan total konsep desain atau perombakan sitemap setelah tahap desain disetujui akan dianggap sebagai permintaan fitur baru / pengerjaan ulang (re-work).',
      ] : [
        'Clients may bring custom reference websites or select from developer recommendations curated by Aelsta.',
        'Clients must provide clear copywriting, image assets, and structure guidance in the initial brief.',
        'Complete design overhauls or sitemap restructuring after initial approval will be treated as custom re-work/feature requests.',
      ],
    },
    {
      icon: CreditCard,
      number: '03',
      title: lang === 'ID' ? 'Alur Pembayaran & Serah Terima' : 'Payment Schedule & Handoff',
      badge: '50% Deposit + 50% Balance',
      details: lang === 'ID' ? [
        'Pengerjaan project dimulai setelah pembayaran Down Payment (DP) sebesar 50% dari total nilai kesepakatan.',
        'Pelunasan sisa 50% dilakukan setelah peninjauan akhir (final preview) dan sebelum penyerahan akses / publikasi ke domain utama.',
      ] : [
        'Project work commences immediately upon receipt of a 50% initial deposit.',
        'The remaining 50% balance is settled after final preview testing prior to primary domain deployment.',
      ],
    },
    {
      icon: ShieldCheck,
      number: '04',
      title: lang === 'ID' ? 'Infrastruktur Hosting & Garansi' : 'Hosting Infrastructure & Warranty',
      badge: 'SSL & Ultra-Fast CDN',
      details: lang === 'ID' ? [
        'Paket Starter memanfaatkan infrastruktur cloud hosting gratis berkinerja tinggi (Vercel / Netlify) lengkap dengan SSL seumur hidup.',
        'Aelsta memberikan garansi perbaikan bug teknis gratis selama 14 hari pertama setelah publikasi resmi.',
      ] : [
        'Starter packages leverage high-speed free cloud hosting (Vercel / Netlify) complete with lifetime SSL certificates.',
        'Aelsta provides a 14-day technical bug warranty following official site launch.',
      ],
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-200 z-10 my-8 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-8 border-b border-neutral-100 pb-6">
            <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-2 block font-semibold">
              {t.tos.badge}
            </span>
            <h3 className="font-display text-3xl font-extrabold text-neutral-950 tracking-tight">
              {t.tos.modalTitle}<span className="text-blue-600">.</span>
            </h3>
            <p className="text-neutral-500 text-sm mt-1">
              {t.tos.modalSubtitle}
            </p>
          </div>

          <div className="space-y-8">
            {terms.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-xs">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-neutral-950">
                        {item.title}
                      </h4>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-mono font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs md:text-sm text-neutral-600 leading-relaxed list-disc list-inside pt-2 border-t border-neutral-200/60">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">
                        <span className="text-neutral-800 font-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs text-blue-900">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">
                  {lang === 'ID' ? 'Catatan Penting Sebelum Memulai Project:' : 'Important Notice Before Starting Project:'}
                </span>
                {lang === 'ID'
                  ? 'Dengan menekan tombol Start a Project atau mengirimkan DP, Anda secara otomatis menyetujui Ketentuan Layanan di atas untuk menjaga transparansi dan kualitas pengerjaan.'
                  : 'By clicking Start a Project or submitting an initial deposit, you automatically agree to the Terms of Service above for transparency and build quality.'}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-neutral-950 hover:bg-blue-600 text-white text-xs font-semibold tracking-wide transition-colors"
            >
              {t.tos.understandCta}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
