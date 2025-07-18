import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/cybersecData";

interface SearchFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedDifficulty: string;
  selectedType: string;
  selectedTags: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onTypeChange: (type: string) => void;
  onTagRemove: (tag: string) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  selectedCategory,
  selectedDifficulty,
  selectedType,
  selectedTags,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onTypeChange,
  onTagRemove,
  onClearFilters
}: SearchFiltersProps) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedType !== 'all' || selectedTags.length > 0;

  return (
    <div className="space-y-4 p-6 bg-gradient-card rounded-lg border border-border/50 shadow-cyber">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search cybersecurity learning resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[200px] bg-background/50 border-border/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/50">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger className="w-[150px] bg-background/50 border-border/50">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/50">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/50">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="tutorial">Tutorial</SelectItem>
            <SelectItem value="tool">Tool</SelectItem>
            <SelectItem value="concept">Concept</SelectItem>
            <SelectItem value="practical">Practical</SelectItem>
            <SelectItem value="cheatsheet">Cheatsheet</SelectItem>
            <SelectItem value="course">Course</SelectItem>
          </SelectContent>
        </Select>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="border-destructive/20 text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Active tags:
          </span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer"
              onClick={() => onTagRemove(tag)}
            >
              {tag}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}