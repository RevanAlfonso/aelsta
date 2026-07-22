import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Calendar, BookOpen, ArrowRight, Lock, ExternalLink } from 'lucide-react';
import { getAllPosts } from '../lib/blog';
import { useLanguage } from '../context/LanguageContext';

interface BlogListPageProps {
  onNavigateBack: () => void;
  onSelectPost: (slug: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigateBack, onSelectPost }) => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const posts = getAllPosts();

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-28 pb-24 selection:bg-blue-600 selection:text-white">

      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center justify-between py-4 border-b border-neutral-200/80">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-950 hover:text-white text-xs font-mono font-semibold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'ID' ? 'Kembali ke Halaman Utama' : 'Back to Home'}</span>
          </button>

          <a
            href="/admin/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 text-white hover:bg-blue-600 text-xs font-mono font-semibold transition-all group shadow-xs"
          >
            <Lock className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
            <span>Decap CMS Admin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Page Title */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-3 block font-semibold">
            {lang === 'ID' ? 'Blog & Publikasi' : 'Blog & Articles'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            {lang === 'ID' ? 'Insight Arsitektur Web Modern' : 'Modern Web Insights'}<span className="text-blue-600">.</span>
          </h1>
          <p className="text-neutral-600 text-lg mt-3">
            {lang === 'ID'
              ? 'Artikel teknis, tutorial Decap CMS, optimasi kecepatan Google Lighthouse, dan strategi digital.'
              : 'Technical guides, Decap CMS tutorials, Google Lighthouse optimization, and digital strategy.'}
          </p>
        </div>

        {/* Search & Category Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'ID' ? 'Cari artikel...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${selectedCategory === cat
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200 text-neutral-500 font-mono text-sm">
            {lang === 'ID' ? 'Tidak ada artikel yang ditemukan.' : 'No articles found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
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
                    {lang === 'ID' ? 'Buka Halaman Artikel' : 'Open Article Page'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-neutral-950" />
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
