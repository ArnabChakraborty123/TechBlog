'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/blog-utils';
import { X, Clock, Calendar, Share2, Bookmark, Eye, Check, Link as LinkIcon, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ArticleModalProps {
  article: BlogPost | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (article) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'auto';
      };
    }
  }, [article, onClose]);

  if (!article) return null;

  // Generate shareable URL (adjust based on your actual URL structure)
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/article/${article.id}` 
    : '';
  const shareTitle = article.title;
  const shareDescription = article.description;

  const handleShare = async () => {
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback to custom share menu
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(shareTitle);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 animate-in fade-in"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close article modal"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-background rounded-2xl shadow-2xl dark:shadow-primary/10 max-w-4xl w-full max-h-[90vh] overflow-hidden relative pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-8 duration-300"
          role="dialog"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Floating */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-md border border-border/50 dark:border-border/30 hover:bg-destructive/90 dark:hover:bg-destructive hover:border-destructive hover:text-destructive-foreground transition-all duration-300 flex items-center justify-center group shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
            {/* Article Header Image */}
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src={article.photo_url || '/placeholder-article.jpg'}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Floating Category Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-flex items-center gap-2 bg-primary/90 dark:bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm shadow-lg dark:glow-purple">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  {article.category}
                </span>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-3xl" />
            </div>

            {/* Article Content */}
            <div className="relative px-6 sm:px-12 pb-12 -mt-20">
              {/* Content Card */}
              <div className="relative glass dark:bg-background/95 rounded-2xl p-6 sm:p-8 border border-border/50 dark:border-border/30 shadow-xl">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time>{formatDate(article.created_at)}</time>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>1.2K views</span>
                  </div>
                </div>

                {/* Title */}
                <h1 
                  id="modal-title" 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight"
                >
                  {article.title}
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4 dark:bg-primary/5 py-2 rounded-r">
                  {article.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-border/50 relative">
                  <div className="relative">
                    <button
                      onClick={handleShare}
                      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary dark:bg-secondary/50 hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border/50 dark:border-border/30 hover:border-primary"
                    >
                      <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-semibold">Share</span>
                    </button>

                    {/* Share Menu Dropdown */}
                    {showShareMenu && (
                      <div className="absolute top-full left-0 mt-2 w-64 p-3 rounded-xl bg-background dark:bg-card border border-border/50 dark:border-border/30 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          Share this article
                        </p>
                        
                        {/* Copy Link */}
                        <button
                          onClick={copyToClipboard}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary dark:hover:bg-secondary/50 transition-colors group"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-500">Link copied!</span>
                            </>
                          ) : (
                            <>
                              <LinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                Copy link
                              </span>
                            </>
                          )}
                        </button>

                        {/* Social Media Buttons */}
                        <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                          <button
                            onClick={shareToTwitter}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary dark:hover:bg-secondary/50 transition-colors group"
                          >
                            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                              Share on Twitter
                            </span>
                          </button>

                          <button
                            onClick={shareToFacebook}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary dark:hover:bg-secondary/50 transition-colors group"
                          >
                            <Facebook className="w-4 h-4 text-[#1877F2]" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                              Share on Facebook
                            </span>
                          </button>

                          <button
                            onClick={shareToLinkedIn}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary dark:hover:bg-secondary/50 transition-colors group"
                          >
                            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                              Share on LinkedIn
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary dark:bg-secondary/50 hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border/50 dark:border-border/30 hover:border-primary">
                    <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold">Save</span>
                  </button>
                </div>

                {/* Article Content */}
                <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-muted prose-pre:border prose-pre:border-border/50">
                  <div
                    className="leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: article.content_html }}
                  />
                </article>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold text-lg">
                        TB
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">TechBlog Team</p>
                        <p className="text-sm text-muted-foreground">Expert Contributors</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last updated: {formatDate(article.updated_at)}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="text-xs font-semibold text-muted-foreground mr-2">Tags:</span>
                  {['Technology', 'Development', 'Tutorial'].map((tag) => (
                    <button
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary dark:bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Articles CTA */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 border border-primary/20 dark:border-primary/30">
                <h3 className="font-bold text-lg mb-2 text-foreground">Want to read more?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore similar articles and stay updated with the latest tech trends.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 dark:glow-purple-strong"
                >
                  Browse More Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}