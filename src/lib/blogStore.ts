import { getAllPosts } from './blog';
import type { BlogPost } from './blog';

const STORAGE_KEY = 'aelsta_blog_posts_v1';
const AUTH_KEY = 'aelsta_admin_auth';

export function getStoredPosts(): BlogPost[] {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Error loading posts from localStorage:', e);
  }

  // Fallback to initial markdown posts
  const initialPosts = getAllPosts();
  savePostsToStorage(initialPosts);
  return initialPosts;
}

export function savePostsToStorage(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving posts to localStorage:', e);
  }
}

export function savePost(postToSave: BlogPost): BlogPost[] {
  const posts = getStoredPosts();
  const existingIdx = posts.findIndex((p) => p.slug === postToSave.slug);

  if (existingIdx !== -1) {
    posts[existingIdx] = postToSave;
  } else {
    posts.unshift(postToSave);
  }

  savePostsToStorage(posts);
  return posts;
}

export function deletePost(slug: string): BlogPost[] {
  const posts = getStoredPosts();
  const updated = posts.filter((p) => p.slug !== slug);
  savePostsToStorage(updated);
  return updated;
}

export function loginAdmin(user: string, pass: string): boolean {
  if (user === 'adminaelsta' && pass === 'aelsta123') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function checkIsAdmin(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function logoutAdmin(): void {
  localStorage.removeItem(AUTH_KEY);
}
