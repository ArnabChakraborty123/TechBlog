'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark'; // Default to dark mode
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Avoid hydration mismatch - render placeholder until mounted
  if (theme === null) {
    return (
      <button
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-secondary hover:bg-secondary/80"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-accent group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Background glow effect for dark mode */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-primary/10 dark:to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300" />
      
      {/* Sun icon for light mode */}
      <Sun
        className={`absolute w-5 h-5 text-primary transition-all duration-300 ${
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
        }`}
      />
      
      {/* Moon icon for dark mode */}
      <Moon
        className={`absolute w-5 h-5 text-primary transition-all duration-300 ${
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
        }`}
      />

      {/* Hover effect ring */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/20 dark:group-hover:border-primary/40 transition-all duration-300" />
    </button>
  );
}