import { BlogPost } from '@/lib/types';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tech Blog',
    url: 'https://techblog.com',
    description: 'Discover the latest tech news, tutorials, and industry insights from our expert writers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://techblog.com/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getArticleStructuredData(article: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.photo_url,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Tech Blog',
    },
  };
}

export function getAllArticlesStructuredData(articles: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tech Blog Articles',
    description: 'Collection of latest tech articles',
    url: 'https://techblog.com',
    hasPart: articles.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: article.photo_url,
      datePublished: article.created_at,
      dateModified: article.updated_at,
    })),
  };
}
