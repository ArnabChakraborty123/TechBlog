import type { MetadataRoute } from 'next';
import { fetchBlogPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetchBlogPosts(0, 30);
    const posts = response.posts || [];

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `https://techblog.com/blog/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [
      {
        url: 'https://techblog.com',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...postEntries,
    ];
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return [
      {
        url: 'https://techblog.com',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}