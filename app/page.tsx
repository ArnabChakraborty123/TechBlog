'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchBlogPosts } from '@/lib/api';
import {
  getAllCategories,
  filterPostsBySearch,
  filterPostsByCategory,
} from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { ArticleCard } from '@/components/article-card';
import { ArticleModal } from '@/components/article-modal';
import { SearchBar } from '@/components/search-bar';
import { CategoryFilter } from '@/components/category-filter';
import { ThemeToggle } from '@/components/theme-toggle';
import { StructuredData, getWebsiteStructuredData, getAllArticlesStructuredData } from '@/components/structured-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchBlogPosts(0, 10);
        if (response.success && response.blogs) {
          setPosts(response.blogs);
          setCategories(getAllCategories(response.blogs));
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

  // Apply filters when search, category, or posts change
  useEffect(() => {
    let filtered = posts;

    // Apply category filter
    filtered = filterPostsByCategory(filtered, selectedCategory);

    // Apply search filter
    filtered = filterPostsBySearch(filtered, searchQuery);

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <StructuredData data={getWebsiteStructuredData()} />
      {posts.length > 0 && <StructuredData data={getAllArticlesStructuredData(posts)} />}
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated background effects for dark mode */}
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        <div className="fixed inset-0 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-primary/5 dark:via-transparent dark:to-transparent pointer-events-none" />

        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/40">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 dark:from-primary dark:to-purple-600 flex items-center justify-center dark:glow-purple">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Tech<span className="text-primary">Blog</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6">
                <a 
                  href="#articles" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  Articles
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
                <a 
                  href="#" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Latest in Tech</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                Discover the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-primary dark:from-primary dark:via-purple-400 dark:to-fuchsia-400 mt-2">
                  Future of Tech
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Explore cutting-edge articles, tutorials, and insights on AI, web development, cybersecurity, and cloud computing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a
                  href="#articles"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 overflow-hidden dark:glow-purple-strong"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Articles
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-foreground bg-secondary hover:bg-secondary/80 dark:bg-secondary/50 dark:hover:bg-secondary/70 transition-all duration-300 border border-border dark:border-border/50"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="flex-1 relative w-full max-w-xl">
              <div className="relative h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-primary/10 float-animation">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent dark:from-primary/30 dark:to-transparent z-10" />
                <Image
                  //src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop"
                  src="https://images.unsplash.com/photo-1719253479632-61b2fdc77a65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Technology and code"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Latest Articles</h2>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search articles by title, description, or content..."
              />
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Filter by Category
              </p>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Results Count */}
            {!isLoading && (
              <div className="text-sm text-muted-foreground font-medium">
                {filteredPosts.length === 0 ? (
                  <p>No articles found. Try adjusting your search or filters.</p>
                ) : (
                  <p>
                    Showing <span className="text-primary font-bold">{filteredPosts.length}</span> of{' '}
                    <span className="text-foreground font-bold">{posts.length}</span> article{posts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="glass border border-destructive/50 bg-destructive/5 dark:bg-destructive/10 px-6 py-5 rounded-2xl mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-destructive text-xs">!</span>
                </div>
                <div>
                  <p className="font-semibold text-destructive mb-1">Error Loading Articles</p>
                  <p className="text-sm text-destructive/80">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-56 rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <ArticleCard
                    article={article}
                    onClick={() => handleSelectArticle(article)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted dark:bg-muted/50 mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4 text-lg">
                No articles match your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="relative border-t border-border/40 bg-muted/30 dark:bg-muted/20 backdrop-blur-sm mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 dark:from-primary dark:to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">TechBlog</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  Your ultimate source for the latest technology news, in-depth tutorials, and expert insights. Stay ahead in the ever-evolving world of tech.
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <a href="#" className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary/50 hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary/50 hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary/50 hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-foreground">Categories</h4>
                <ul className="space-y-3 text-sm">
                  {categories.slice(0, 5).map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-foreground">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; 2024 TechBlog. All rights reserved.</p>
              <p>Crafted with ❤️ by passionate developers</p>
            </div>
          </div>
        </footer>

        {/* Article Modal */}
        <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
      </main>
    </>
  );
}