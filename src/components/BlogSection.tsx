import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, ExternalLink, Lock } from 'lucide-react';
import { getAllPosts } from '../lib/blog';
import { useLanguage } from '../context/LanguageContext';

interface BlogSectionProps {
  onSelectPost: (slug: string) => void;
  onOpenBlogList: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost, onOpenBlogList }) => {
  const { lang } = useLanguage();
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-24 md:py-36 bg-white relative border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block font-semibold">
              {lang === 'ID' ? 'Artikel & Insight' : 'Articles & Insights'}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
              {lang === 'ID' ? 'Edukasi & Arsitektur Web Modern' : 'Education & Modern Web Architecture'}<span className="text-blue-600">.</span>
            </h2>
            <p className="text-neutral-600 text-base md:text-lg mt-3 font-normal">
              {lang === 'ID'
                ? 'Panduan teknologi, arsitektur headless CMS, dan strategi performa website.'
                : 'Tech guides, headless CMS architecture, and website performance strategy.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBlogList}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 text-xs font-mono font-semibold transition-all"
            >
              <span>{lang === 'ID' ? 'Lihat Semua Artikel' : 'View All Articles'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 text-white hover:bg-blue-600 text-xs font-mono font-semibold transition-all shadow-2xs group"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
              <span>Admin CMS Login</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => onSelectPost(post.slug)}
              className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 hover:border-neutral-950 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-mono font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-neutral-950 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-neutral-600 text-sm leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/60 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="flex items-center gap-1.5 font-sans font-semibold text-neutral-950 group-hover:text-blue-600">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  {lang === 'ID' ? 'Buka Halaman Artikel →' : 'Open Article Page →'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-neutral-950" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
