'use client';

import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { formatDate, truncateText } from '@/lib/blog-utils';
import { Card } from '@/components/ui/card';
import { Clock, TrendingUp } from 'lucide-react';

interface ArticleCardProps {
  article: BlogPost;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-border/50 dark:border-border/30 bg-card dark:bg-card/50 backdrop-blur-sm dark:hover:border-primary/50 dark:hover:shadow-primary/10"
      onClick={onClick}
      role="article"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <Image
          src={article.photo_url || '/placeholder-article.jpg'}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={false}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 bg-primary/90 dark:bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
            <TrendingUp className="w-3 h-3" />
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-primary to-purple-600 group-hover:h-full transition-all duration-500" />
        
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {formatDate(article.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-foreground group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 leading-tight">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow leading-relaxed mb-4">
          {truncateText(article.description, 120)}
        </p>

        {/* Read More Button */}
        <button
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300 group/btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Read Full Article
          <svg 
            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Hover glow effect for dark mode */}
        <div className="absolute inset-0 rounded-lg opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg" />
        </div>
      </div>
    </Card>
  );
}