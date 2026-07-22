import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Sparkles } from 'lucide-react';
import { getAllPosts } from '../lib/blog';
import { useLanguage } from '../context/LanguageContext';

interface BlogDetailPageProps {
  slug: string;
  onNavigateBack: () => void;
  onNavigateToPost: (newSlug: string) => void;
  onOpenInquiry: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  slug,
  onNavigateBack,
  onNavigateToPost,
  onOpenInquiry,
}) => {
  const { lang } = useLanguage();
  const allPosts = getAllPosts();
  const post = allPosts.find((p) => p.slug === slug) || allPosts[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return null;

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Estimate reading time
  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'ID' ? 'Link artikel telah disalin ke clipboard!' : 'Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-28 pb-24 selection:bg-blue-600 selection:text-white">

      {/* Top Banner Navigation Bar */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between py-4 border-b border-neutral-200/80">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-950 hover:text-white text-xs font-mono font-semibold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'ID' ? 'Kembali ke Blog' : 'Back to Articles'}</span>
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Aelsta Studio</span>
            <span>/</span>
            <span>Blog</span>
            <span>/</span>
            <span className="text-neutral-950 font-bold truncate max-w-[200px]">{post.category}</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 hover:border-blue-600 text-xs font-mono font-semibold text-neutral-700 hover:text-blue-600 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{lang === 'ID' ? 'Bagikan' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-6">

        {/* Article Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
              {post.category}
            </span>
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTimeMinutes} {lang === 'ID' ? 'Menit Baca' : 'Min Read'}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.08]">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-normal border-l-4 border-blue-600 pl-4 py-1">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
            <img
              src="/logo.png"
              alt="Aelsta Logo"
              className="w-10 h-10 rounded-xl object-contain bg-neutral-950 p-1"
            />
            <div>
              <div className="text-xs font-bold text-neutral-950">{post.author}</div>
              <div className="text-[11px] text-neutral-500 font-mono">Web Architecture & Engineering Team</div>
            </div>
          </div>
        </motion.div>

        {/* Formatted Article Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-neutral max-w-none text-neutral-800 space-y-6 text-base md:text-lg leading-relaxed border-t border-neutral-200/80 pt-10"
        >
          {post.content.split('\n\n').map((paragraph, idx) => {
            // Code / Ascii Flowchart block
            if (paragraph.startsWith('```')) {
              const codeText = paragraph.replace(/```[a-z]*/g, '').trim();
              return (
                <div key={idx} className="my-8">
                  <div className="bg-neutral-900 text-neutral-400 px-4 py-2 rounded-t-2xl border border-neutral-800 text-xs font-mono flex items-center justify-between">
                    <span>ARCHITECTURAL WORKFLOW / CODE</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <pre className="p-6 bg-neutral-950 text-blue-400 font-mono text-xs sm:text-sm overflow-x-auto border-x border-b border-neutral-800 rounded-b-2xl leading-relaxed">
                    <code>{codeText}</code>
                  </pre>
                </div>
              );
            }

            // Heading 2
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 pt-8 pb-2 border-b border-neutral-100">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }

            // Heading 3
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-display text-xl font-bold text-neutral-950 pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            // List items
            if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
              const items = paragraph.split('\n- ').map((item) => item.replace(/^- /, ''));
              return (
                <ul key={idx} className="space-y-3 bg-neutral-50 p-6 rounded-2xl border border-neutral-200/90 my-6">
                  {items.map((it, iIdx) => (
                    <li key={iIdx} className="text-neutral-800 text-sm sm:text-base flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Divider
            if (paragraph === '---') {
              return <hr key={idx} className="my-8 border-neutral-200" />;
            }

            return (
              <p key={idx} className="text-neutral-700 leading-relaxed font-sans">
                {paragraph}
              </p>
            );
          })}
        </motion.div>

        {/* CTA Card inside Article */}
        <div className="my-16 p-8 rounded-3xl bg-neutral-950 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aelsta Web Architecture</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              {lang === 'ID' ? 'Ingin Website Seperti Ini Untuk Bisnis Anda?' : 'Want a Website Like This for Your Business?'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {lang === 'ID'
                ? 'Kami siap membangunkan website ultra-cepat berbasis React + Decap CMS dengan harga mulai dari Rp150.000.'
                : 'We build ultra-fast React + Decap CMS websites starting from Rp150.000.'}
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/20 flex-shrink-0"
          >
            {lang === 'ID' ? 'Konsultasi Project' : 'Consultation'}
          </button>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-neutral-200">
            <h3 className="font-display text-2xl font-bold text-neutral-950 mb-6">
              {lang === 'ID' ? 'Artikel Terkait Lainnya' : 'Related Articles'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  onClick={() => onNavigateToPost(rPost.slug)}
                  className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-950 transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-mono font-semibold text-blue-600 uppercase mb-2 block">
                    {rPost.category}
                  </span>
                  <h4 className="font-display font-bold text-lg text-neutral-950 group-hover:text-blue-600 transition-colors mb-2">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {rPost.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

    </div>
  );
};
