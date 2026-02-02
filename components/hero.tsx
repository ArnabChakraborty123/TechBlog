import Image from 'next/image';
import { Zap, TrendingUp, ArrowRight } from 'lucide-react';

interface HeroProps {
  postsCount: number;
  tagsCount: number;
}

export function Hero({ postsCount, tagsCount }: HeroProps) {
  return (
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
                {postsCount}+
              </div>
              <div className="text-sm text-muted-foreground font-medium mt-1">Articles</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="text-center lg:text-left">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                {tagsCount}+
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
  );
}