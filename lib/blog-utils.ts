import { BlogPost } from './types';

export const formatDate = (dateString?: string): string => {
  // DummyJSON posts don't have dates, so we'll return a default or handle gracefully
  if (!dateString) {
    return 'Recently';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getAllTags = (posts: BlogPost[]): string[] => {
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const filterPostsBySearch = (
  posts: BlogPost[],
  query: string
): BlogPost[] => {
  if (!query.trim()) return posts;

  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.body.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const filterPostsByTag = (
  posts: BlogPost[],
  tag: string | null
): BlogPost[] => {
  if (!tag) return posts;
  return posts.filter(post => post.tags.includes(tag));
};

export const stripHtmlTags = (html: string): string => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const truncateText = (text: string, length: number = 150): string => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
};