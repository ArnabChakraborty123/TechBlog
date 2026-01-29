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
import { Sparkles, ArrowRight, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
                </div>
                <span className="text-sm font-semibold text-primary tracking-wide">Latest in Tech</span>
                <TrendingUp className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.05]">
                  Discover the
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-fuchsia-600 dark:from-primary dark:via-purple-400 dark:to-fuchsia-400 mt-3 animate-in slide-in-from-left duration-700">
                    Future of Tech
                  </span>
                </h2>
                
                <div className="h-1 w-24 bg-gradient-to-r from-primary via-purple-600 to-transparent rounded-full" />
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Explore cutting-edge articles, tutorials, and insights on <span className="text-foreground font-medium">AI</span>, <span className="text-foreground font-medium">web development</span>, <span className="text-foreground font-medium">cybersecurity</span>, and <span className="text-foreground font-medium">cloud computing</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <a
                  href="#articles"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-primary-foreground bg-gradient-to-r from-primary via-purple-600 to-primary bg-size-200 hover:bg-right-bottom transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/25 dark:hover:shadow-primary/40 hover:scale-105 transform"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore Articles
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>
                <button
                  onClick={() => setShowAbout(!showAbout)}
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-foreground bg-secondary/80 hover:bg-secondary dark:bg-secondary/50 dark:hover:bg-secondary/70 transition-all duration-300 border border-border/60 dark:border-border/50 hover:border-border dark:hover:border-border/80 backdrop-blur-sm hover:scale-105 transform"
                >
                  <span className="flex items-center gap-2">
                    {showAbout ? 'Show Less' : 'Learn More'}
                    <Zap className={`w-4 h-4 transition-transform duration-300 ${showAbout ? 'rotate-180' : 'group-hover:rotate-12'}`} />
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 justify-center lg:justify-start pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-foreground">{posts.length}+</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-foreground">{categories.length}</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">Readers</div>
                </div>
              </div>

              {/* Collapsible About Section */}
              {showAbout && (
                <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="glass rounded-3xl p-8 border border-border/40 backdrop-blur-sm">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 dark:from-primary/30 dark:to-purple-600/30 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">TechBlog</span>
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Your comprehensive resource for technology insights and knowledge.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Diverse Content</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                We cover <span className="text-primary font-medium">{categories.length} different categories</span> including AI, web development, cybersecurity, cloud computing, gaming, and mathematics.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Regular Updates</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Stay informed with our constantly updated collection of <span className="text-primary font-medium">{posts.length}+ articles</span>, featuring the latest trends and tutorials.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Expert Insights</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                In-depth tutorials, guides, and analysis from industry experts to help you stay ahead in tech.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Easy Discovery</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Powerful search and filtering tools to help you find exactly what you are looking for quickly.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border/40">
                        <p className="text-sm text-muted-foreground text-center">
                          Join our community of <span className="text-primary font-semibold">10,000+ tech enthusiasts</span> staying updated with the latest in technology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 relative w-full max-w-xl lg:max-w-2xl">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-600/30 to-fuchsia-600/30 rounded-3xl blur-2xl group-hover:blur-3xl opacity-75 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Main image container */}
                <div className="relative h-[400px] lg:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl dark:shadow-primary/20 float-animation border border-border/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1719253479632-61b2fdc77a65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Technology and code"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 z-20 glass px-6 py-3 rounded-2xl border border-border/40 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-semibold text-foreground">Live Updates</span>
                    </div>
                  </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 bg-gradient-to-b from-primary via-purple-600 to-fuchsia-600 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Articles</span>
                </h2>
              </div>
            </div>

            {/* Search Bar with enhanced styling */}
            <div className="mb-8">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search articles by title, description, or content..."
              />
            </div>

            {/* Category Filter with improved design */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <p className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Filter by Category
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Results Count with better visibility */}
            {!isLoading && (
              <div className="glass px-6 py-4 rounded-2xl border border-border/40 inline-block">
                {filteredPosts.length === 0 ? (
                  <p className="text-sm text-muted-foreground font-medium">No articles found. Try adjusting your search or filters.</p>
                ) : (
                  <p className="text-sm font-medium">
                    Showing <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">{filteredPosts.length}</span> of{' '}
                    <span className="text-lg font-bold text-foreground">{posts.length}</span> article{posts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Error State with modern design */}
          {error && (
            <div className="glass border border-destructive/50 bg-destructive/5 dark:bg-destructive/10 px-8 py-6 rounded-2xl mb-10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-destructive text-lg font-bold">!</span>
                </div>
                <div>
                  <p className="font-bold text-destructive text-lg mb-2">Error Loading Articles</p>
                  <p className="text-sm text-destructive/80 leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {isLoading ? (
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
                  setSelectedCategory(null);
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
                <h4 className="font-bold mb-6 text-foreground text-lg">Categories</h4>
                <ul className="space-y-3.5 text-sm">
                  {categories.slice(0, 5).map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                        {cat}
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