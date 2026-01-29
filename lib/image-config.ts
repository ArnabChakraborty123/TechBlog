/**
 * Image optimization configuration for Next.js
 * Ensures proper image loading with fallbacks
 */

export const IMAGE_SIZES = {
  articleCard: {
    width: 400,
    height: 200,
  },
  articleHero: {
    width: 800,
    height: 400,
  },
  heroImage: {
    width: 800,
    height: 600,
  },
};

export const IMAGE_QUALITY = 75; // Balance between quality and performance

export const IMAGE_PLACEHOLDER = '/placeholder-article.jpg';

/**
 * Get optimized image URL with appropriate sizing
 */
export const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  if (!url) return IMAGE_PLACEHOLDER;
  // Return original URL as is; Next.js Image component will optimize
  return url;
};
