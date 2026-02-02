'use client';

import { Button } from '@/components/ui/button';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function TagFilter({
  tags,
  selectedTag,
  onSelectTag,
}: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedTag === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectTag(null)}
        className="transition-all"
      >
        All Tags
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectTag(tag)}
          className="transition-all"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}