import { BlogPost } from '@/lib/types';
import { ArticleCard } from '@/components/article-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ArticlesGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  onArticleClick: (article: BlogPost) => void;
  onClearFilters: () => void;
}

export function ArticlesGrid({
  posts,
  isLoading,
  error,
  onArticleClick,
  onClearFilters
}: ArticlesGridProps) {
  if (error) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-5">
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-5 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-1/2 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
            onClick={onClearFilters}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-primary hover:text-primary/80 font-semibold transition-all duration-300 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All Filters
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((article, index) => (
          <div
            key={article.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-in fade-in slide-in-from-bottom-6 duration-700"
          >
            <ArticleCard
              article={article}
              onClick={() => onArticleClick(article)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}