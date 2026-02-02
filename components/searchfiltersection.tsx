import { SearchBar } from '@/components/search-bar';
import { TagFilter } from '@/components/tag-filter';

interface SearchFilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  filteredPostsCount: number;
}

export function SearchFilterSection({
  searchQuery,
  onSearchChange,
  tags,
  selectedTag,
  onSelectTag,
  filteredPostsCount
}: SearchFilterSectionProps) {
  return (
    <section id="articles" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="glass rounded-3xl p-8 border border-border/40 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2 bg-clip-text">
              Latest <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text">Articles</span>
            </h3>
            <p className="text-muted-foreground font-light">
              {filteredPostsCount} {filteredPostsCount === 1 ? 'article' : 'articles'} available
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-[400px]">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search articles..."
            />
          </div>
        </div>
        
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={onSelectTag}
        />
      </div>
    </section>
  );
}