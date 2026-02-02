'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchBlogPosts } from '@/lib/api';
import {
  getAllTags,
  filterPostsBySearch,
  filterPostsByTag,
} from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { ArticleCard } from '@/components/article-card';
import { ArticleModal } from '@/components/article-modal';
import { SearchBar } from '@/components/search-bar';
import { TagFilter } from '@/components/tag-filter';
import { ThemeToggle } from '@/components/theme-toggle';
import { StructuredData, getWebsiteStructuredData, getAllArticlesStructuredData } from '@/components/structured-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, ArrowRight, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

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

  return (
    <>
      <StructuredData data={getWebsiteStructuredData()} />
      {posts.length > 0 && <StructuredData data={getAllArticlesStructuredData(posts)} />}
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Enhanced animated background effects */}
        <div className="fixed inset-0 mesh-gradient pointer-events-none opacity-40" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] pointer-events-none" />
        
        {/* Animated orbs */}
        <div className="fixed top-1/4 -left-48 w-96 h-96 bg-primary/20 dark:bg-primary/30 rounded-full blur-[128px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
        <div className="fixed bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[128px] animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '2s' }} />

        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/40 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-primary rounded-xl blur-md group-hover:blur-lg transition-all duration-300 opacity-70 group-hover:opacity-100" />
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-purple-600 to-primary flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-primary-foreground animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl  font-bold text-foreground tracking-tight bg-clip-text">
                  Tech<span className="text-transparent bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text">Blog</span>
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Insights that inspire</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-6">
                <a 
                  href="#articles" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                >
                  Articles
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
                </a>
                <a 
                  href="#" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-600/10 to-primary/10 dark:from-primary/20 dark:via-purple-600/20 dark:to-primary/20 border border-primary/20 dark:border-primary/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-default group">
                <div className="relative">
                  <Zap className="w-4 h-4 text-primary dark:text-primary animate-pulse" />
                  <Zap className="absolute inset-0 w-4 h-4 text-primary dark:text-primary animate-ping opacity-30" />
                </div>
                <span className="text-sm font-semibold text-foreground tracking-wide">Latest in Technology</span>
                <TrendingUp className="w-4 h-4 text-primary dark:text-primary group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
              
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black leading-tight">
                <span className="block text-foreground mb-2">Discover the</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-primary animate-gradient-x">
                  Future of Tech
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Explore cutting-edge insights, comprehensive tutorials, and expert analyses that keep you at the forefront of innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                <a 
                  href="#articles"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-primary-foreground overflow-hidden shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary animate-gradient-x" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  <span className="relative flex items-center gap-3">
                    Explore Articles
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>
                <a 
                  href="#"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base bg-secondary/60 dark:bg-secondary/40 hover:bg-secondary dark:hover:bg-secondary/60 text-foreground border border-border/40 hover:border-primary/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Learn More
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-12 pt-6">
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                    {posts.length}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mt-1">Articles</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                    {tags.length}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mt-1">Topics</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                    10k+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mt-1">Readers</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-600 to-primary rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-gradient-x" />
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/40 bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
                    alt="Technology visualization"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">Live Updates</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Real-time Tech Insights</h3>
                    <p className="text-sm text-white/80">Stay connected with the latest developments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section id="articles" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="glass rounded-3xl p-8 border border-border/40 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2 bg-clip-text">
                  Latest <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text">Articles</span>
                </h3>
                <p className="text-muted-foreground font-light">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} available
                </p>
              </div>
              <div className="w-full lg:w-auto lg:min-w-[400px]">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search articles..."
                />
              </div>
            </div>
            
            <TagFilter
              tags={tags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
            />
          </div>
        </section>

        {/* Articles Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {error ? (
            <div className="text-center py-24">
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center border border-red-500/20">
                  <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-red-500 mb-6 text-xl font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-primary hover:text-primary/80 font-semibold transition-all duration-300 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-5">
                  <Skeleton className="h-64 rounded-3xl" />
                  <Skeleton className="h-5 w-3/4 rounded-full" />
                  <Skeleton className="h-4 w-1/2 rounded-full" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-6 duration-700"
                >
                  <ArticleCard
                    article={article}
                    onClick={() => handleSelectArticle(article)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-muted to-muted/50 dark:from-muted/50 dark:to-muted/30 flex items-center justify-center border border-border/40">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 text-xl font-light max-w-md mx-auto">
                No articles match your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-primary hover:text-primary/80 font-semibold transition-all duration-300 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Enhanced Footer */}
        <footer className="relative border-t border-border/40 bg-muted/20 dark:bg-muted/10 backdrop-blur-xl mt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 dark:via-primary/10 dark:to-primary/20 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-primary rounded-xl blur-md opacity-70" />
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-purple-600 to-primary flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">TechBlog</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
                  Your ultimate source for the latest technology news, in-depth tutorials, and expert insights. Stay ahead in the ever-evolving world of tech.
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', label: 'Twitter' },
                    { icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', label: 'GitHub' },
                    { icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', label: 'LinkedIn' }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="group w-11 h-11 rounded-xl bg-secondary/60 dark:bg-secondary/40 hover:bg-gradient-to-br hover:from-primary hover:to-purple-600 hover:text-primary-foreground transition-all duration-300 flex items-center justify-center border border-border/40 hover:border-transparent hover:scale-110 transform"
                      aria-label={social.label}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-foreground text-lg">Popular Tags</h4>
                <ul className="space-y-3.5 text-sm">
                  {tags.slice(0, 5).map((tag) => (
                    <li key={tag}>
                      <button
                        onClick={() => setSelectedTag(tag)}
                        className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-foreground text-lg">Company</h4>
                <ul className="space-y-3.5 text-sm">
                  {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                    <li key={item}>
                      <a href="#" className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p className="font-medium">&copy; 2026 TechBlog. All rights reserved.</p>
              <p className="flex items-center gap-2">
                Crafted with <span className="text-red-500 animate-pulse">❤️</span> by passionate developers
              </p>
            </div>
          </div>
        </footer>

        {/* Article Modal */}
        <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
      </main>
    </>
  );
}