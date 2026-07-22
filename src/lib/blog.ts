export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  content: string;
}

export function parseFrontmatter(rawContent: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*[\r\n]([\s\S]*?)[\r\n]---\s*[\r\n]?([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const [, yamlBlock, content] = match;
  const data: Record<string, string> = {};

  yamlBlock.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  try {
    const local = localStorage.getItem('aelsta_blog_posts_v1');
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Error reading posts from storage:', e);
  }

  const modules = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw' }) as Record<string, { default: string } | string>;
  const posts: BlogPost[] = [];

  for (const path in modules) {
    const rawVal = modules[path];
    const rawContent = typeof rawVal === 'string' ? rawVal : rawVal.default;
    const fileName = path.split('/').pop() || '';
    const slug = fileName.replace('.md', '');
    const { data, content } = parseFrontmatter(rawContent);

    posts.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || '2026-07-22',
      author: data.author || 'Aelsta Studio',
      category: data.category || 'General',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || data.image || '',
      content,
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
