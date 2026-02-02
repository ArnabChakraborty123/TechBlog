'use client';

import { useState, useEffect } from 'react';
import { fetchBlogPosts } from '@/lib/api';
import {
  getAllTags,
  filterPostsBySearch,
  filterPostsByTag,
} from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { ArticleModal } from '@/components/article-modal';
import { StructuredData, getWebsiteStructuredData, getAllArticlesStructuredData } from '@/components/structured-data';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { BackgroundEffects } from '@/components/backgroundeffects';
import { SearchFilterSection } from '@/components/searchfiltersection';
import { ArticlesGrid } from '@/components/articlesgrid';
import { Footer } from '@/components/footer';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchBlogPosts(0, 30);
        if (response.posts) {
          setPosts(response.posts);
          setTags(getAllTags(response.posts));
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        setError('Failed to fetch blog posts. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Apply filters when search, tag, or posts change
  useEffect(() => {
    let filtered = posts;

    // Apply tag filter
    filtered = filterPostsByTag(filtered, selectedTag);

    // Apply search filter
    filtered = filterPostsBySearch(filtered, searchQuery);

    setFilteredPosts(filtered);
  }, [searchQuery, selectedTag, posts]);

  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <>
      <StructuredData data={getWebsiteStructuredData()} />
      {posts.length > 0 && <StructuredData data={getAllArticlesStructuredData(posts)} />}
      <main className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundEffects />
        
        <Header />
        
        <Hero postsCount={posts.length} tagsCount={tags.length} />

        <SearchFilterSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          filteredPostsCount={filteredPosts.length}
        />

        <ArticlesGrid
          posts={filteredPosts}
          isLoading={isLoading}
          error={error}
          onArticleClick={handleSelectArticle}
          onClearFilters={handleClearFilters}
        />

        <Footer tags={tags} onTagClick={setSelectedTag} />

        <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
      </main>
    </>
  );
}