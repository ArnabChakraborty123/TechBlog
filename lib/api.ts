import { ApiResponse } from './types';

const API_BASE_URL = 'https://api.slingacademy.com/v1/sample-data/blog-posts';

export const fetchBlogPosts = async (offset = 0, limit = 10): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?offset=${offset}&limit=${limit}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    throw error;
  }
};
