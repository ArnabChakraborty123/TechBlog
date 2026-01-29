import { BlogPost } from './types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getAllCategories = (posts: BlogPost[]): string[] => {
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
};

export const filterPostsBySearch = (
  posts: BlogPost[],
  query: string
): BlogPost[] => {
  if (!query.trim()) return posts;

  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.content_text.toLowerCase().includes(lowerQuery)
  );
};

export const filterPostsByCategory = (
  posts: BlogPost[],
  category: string | null
): BlogPost[] => {
  if (!category) return posts;
  return posts.filter(post => post.category === category);
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
