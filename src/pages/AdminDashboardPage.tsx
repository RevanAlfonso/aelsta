import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, Plus, Edit3, Trash2, ArrowLeft, AlertCircle, FileText, Eye } from 'lucide-react';
import { getStoredPosts, savePost, deletePost, loginAdmin, checkIsAdmin, logoutAdmin } from '../lib/blogStore';
import type { BlogPost } from '../lib/blog';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'CMS & Technology',
    date: new Date().toISOString().split('T')[0],
    author: 'Aelsta Studio',
    excerpt: '',
    content: '',
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    const isAuth = checkIsAdmin();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      setPosts(getStoredPosts());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginAdmin(username, password)) {
      setIsAuthenticated(true);
      setPosts(getStoredPosts());
    } else {
      setLoginError('Username atau Password salah! (Default: adminaelsta / aelsta123)');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleOpenNewPost = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'CMS & Technology',
      date: new Date().toISOString().split('T')[0],
      author: 'Aelsta Studio',
      excerpt: '',
      content: '',
    });
    setEditingPost(null);
    setIsEditing(true);
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      date: post.date,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
    });
    setIsEditing(true);
  };

  const handleDeletePost = (slug: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      const updated = deletePost(slug);
      setPosts(updated);
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();

    let slugToUse = formData.slug.trim();
    if (!slugToUse) {
      slugToUse = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const postObj: BlogPost = {
      title: formData.title,
      slug: slugToUse,
      category: formData.category,
      date: formData.date,
      author: formData.author,
      excerpt: formData.excerpt,
      content: formData.content,
    };

    const updated = savePost(postObj);
    setPosts(updated);
    setIsEditing(false);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 selection:bg-blue-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative"
        >
          {/* Back Button */}
          <button
            onClick={onNavigateHome}
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website</span>
          </button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Aelsta CMS Admin Login<span className="text-blue-500">.</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              Masuk untuk kelola, tambah, edit, & hapus artikel.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono mb-6 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="adminaelsta"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
              />
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-[11px] text-neutral-400 font-mono">
              💡 <strong>Akses default:</strong><br />
              Username: <code className="text-blue-400 font-bold">adminaelsta</code><br />
              Password: <code className="text-blue-400 font-bold">aelsta123</code>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-600/20"
            >
              Login ke Dashboard Admin
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard Overview
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-600 selection:text-white pt-24 pb-20">

      {/* Header Bar */}
      <header className="fixed top-0 inset-x-0 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 z-40 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Aelsta Logo"
            className="w-8 h-8 rounded-xl object-contain bg-neutral-900 p-1"
          />
          <div>
            <div className="font-display font-bold text-base text-white">
              Aelsta Admin Dashboard<span className="text-blue-500">.</span>
            </div>
            <div className="text-[10px] font-mono text-neutral-400">LOGGED IN AS ADMINAELSTA</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            Lihat Website
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              Kelola Artikel Blog ({posts.length})
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Tambah artikel baru, edit konten, atau hapus artikel secara instan.
            </p>
          </div>

          <button
            onClick={handleOpenNewPost}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>

        {/* Posts Table / Card List */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
          {posts.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 font-mono text-sm">
              Belum ada artikel. Klik "Tulis Artikel Baru" di atas untuk menambah artikel pertama.
            </div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-900/60 transition-colors"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                        {post.category}
                      </span>
                      <span className="text-neutral-500">{post.date}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-400">{post.author}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => handleOpenEditPost(post)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeletePost(post.slug, post.title)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/60 border border-red-800/80 hover:bg-red-900 text-red-300 text-xs font-mono transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Hapus</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Editor Modal Drawer */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white z-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {editingPost ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Isi detail dan isi konten artikel dalam format Markdown.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-neutral-950 p-1 rounded-xl border border-neutral-800 flex items-center text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveTab('editor')}
                      className={`px-3 py-1 rounded-lg ${activeTab === 'editor' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                    >
                      <FileText className="w-3.5 h-3.5 inline mr-1" />
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1 rounded-lg ${activeTab === 'preview' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                    >
                      <Eye className="w-3.5 h-3.5 inline mr-1" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {activeTab === 'editor' ? (
                <form onSubmit={handleSavePost} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Judul Artikel
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Contoh: Panduan Mengoptimalkan SEO Website"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Slug (URL identifier)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="otomatis dari judul jika dikosongkan"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm font-mono focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Kategori
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
                      >
                        <option value="CMS & Technology">CMS & Technology</option>
                        <option value="Panduan Web">Panduan Web</option>
                        <option value="SEO & Performa">SEO & Performa</option>
                        <option value="Strategi Bisnis">Strategi Bisnis</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Tanggal Publish
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm font-mono focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Penulis
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Ringkasan (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Ringkasan singkat 1-2 kalimat untuk kartu artikel..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Isi Konten Artikel (Markdown Format)
                    </label>
                    <textarea
                      rows={10}
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="## Subjudul Artikel&#10;&#10;Tuliskan paragraf artikel di sini...&#10;&#10;- Poin 1&#10;- Poin 2"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-blue-300 text-sm font-mono focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white"
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20"
                    >
                      Simpan Artikel
                    </button>
                  </div>
                </form>
              ) : (
                /* Live Preview Mode */
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 font-sans text-neutral-200">
                  <h1 className="text-3xl font-extrabold font-display text-white">{formData.title || 'Judul Artikel Preview'}</h1>
                  <p className="text-neutral-400 italic border-l-2 border-blue-500 pl-3">{formData.excerpt}</p>
                  <hr className="border-neutral-800" />
                  <div className="space-y-4 text-sm leading-relaxed">
                    {formData.content ? (
                      formData.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)
                    ) : (
                      <span className="text-neutral-500 font-mono">Belum ada konten artikel disikan...</span>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
