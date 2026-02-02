import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
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
  );
}