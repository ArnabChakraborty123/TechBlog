import type { MetadataRoute } from 'next';
import { fetchBlogPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetchBlogPosts(0, 10);
    const blogs = response.blogs || [];

    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `https://techblog.com/blog/${blog.id}`,
      lastModified: new Date(blog.updated_at),
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
      ...blogEntries,
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
