import { useState, useMemo, useEffect } from "react";
import { Shield, Search, Github, Twitter, Send, Linkedin } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";
import { LinkCard } from "@/components/LinkCard";
import { SearchFilters } from "@/components/SearchFilters";
import { StatsOverview } from "@/components/StatsOverview";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CyberLink, fetchCyberLinksWithPriority } from "@/data/cybersecData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [cyberLinks, setCyberLinks] = useState<CyberLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRemaining, setLoadingRemaining] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { priorityLinks, remainingLinks } = await fetchCyberLinksWithPriority(50);
      setCyberLinks(priorityLinks);
      setLoading(false);
      
      // Load remaining items in background
      setLoadingRemaining(true);
      const remaining = await remainingLinks;
      setCyberLinks(prev => [...prev, ...remaining]);
      setLoadingRemaining(false);
    };
    loadData();
  }, []);

  const filteredLinks = useMemo(() => {
    return cyberLinks.filter(link => {
      const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || link.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || link.difficulty === selectedDifficulty;
      const matchesType = selectedType === "all" || link.type === selectedType;
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => 
        link.tags.some(linkTag => linkTag.toLowerCase().includes(tag.toLowerCase()))
      );

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesTags;
    });
  }, [cyberLinks, searchQuery, selectedCategory, selectedDifficulty, selectedType, selectedTags]);

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedType("all");
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-gradient-cyber rounded-lg animate-glow-pulse">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-md object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                  Hck4fun Learning Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Master cybersecurity concepts, tools, and techniques
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <a href="https://t.me/hck4fun" target="_blank" rel="noopener noreferrer" 
                   className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Send className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </a>
                <a href="https://twitter.com/hack4fun" target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </a>
                <a href="https://github.com/bytemallet" target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Github className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </a>
                <a href="https://linkedin.com/in/xaviermarrugat" target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <StatsOverview links={cyberLinks} filteredCount={filteredLinks.length} />

        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          selectedType={selectedType}
          selectedTags={selectedTags}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onTypeChange={setSelectedType}
          onTagRemove={handleTagRemove}
          onClearFilters={handleClearFilters}
        />

        {/* Results */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Learning Resources Library
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <span>{filteredLinks.length} resources found</span>
              {loadingRemaining && (
                <span className="text-xs opacity-75">(loading more...)</span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50 animate-pulse" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Loading learning resources...
              </h3>
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No learning resources found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria or clear the filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLinks.map((link, index) => (
                <div
                  key={`${link.title}-${index}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => {
                    // Add tag click functionality for better UX
                    link.tags.forEach(tag => {
                      if (searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())) {
                        handleTagClick(tag);
                      }
                    });
                  }}
                >
                  <LinkCard link={link} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-gradient-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Hck4fun Learning Hub - Master the art of cybersecurity
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Curated educational content from trusted cybersecurity experts and institutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
