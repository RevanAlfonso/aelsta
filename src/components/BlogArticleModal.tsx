import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User } from 'lucide-react';
import type { BlogPost } from '../lib/blog';

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-200 z-10 my-8 max-h-[85vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Article Header */}
          <div className="mb-8 border-b border-neutral-100 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                {post.category}
              </span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-neutral-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              {post.title}
            </h2>
          </div>

          {/* Rendered Markdown Body */}
          <div className="prose prose-neutral max-w-none text-neutral-800 space-y-4 text-sm sm:text-base leading-relaxed">
            {post.content.split('\n\n').map((paragraph, idx) => {
              // Code / Ascii Flowchart block
              if (paragraph.startsWith('```')) {
                const codeText = paragraph.replace(/```[a-z]*/g, '').trim();
                return (
                  <pre
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-950 text-blue-400 font-mono text-xs overflow-x-auto border border-neutral-800 leading-normal my-4"
                  >
                    <code>{codeText}</code>
                  </pre>
                );
              }

              // Heading 2
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={idx} className="font-display text-2xl font-bold text-neutral-950 pt-4 pb-1 border-b border-neutral-100">
                    {paragraph.replace('## ', '')}
                  </h3>
                );
              }

              // Heading 3
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={idx} className="font-display text-lg font-bold text-neutral-900 pt-2">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }

              // List items
              if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ').map((item) => item.replace(/^- /, ''));
                return (
                  <ul key={idx} className="space-y-2 list-disc list-inside bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                    {items.map((it, iIdx) => (
                      <li key={iIdx} className="text-neutral-700 text-xs sm:text-sm">
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Divider
              if (paragraph === '---') {
                return <hr key={idx} className="my-6 border-neutral-200" />;
              }

              return (
                <p key={idx} className="text-neutral-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="mt-10 pt-6 border-t border-neutral-100 flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>Decap CMS Powered Article</span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white font-sans font-bold hover:bg-blue-600 transition-colors"
            >
              Tutup Artikel
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
