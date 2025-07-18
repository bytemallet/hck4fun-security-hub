import { ExternalLink, Tag, BookOpen, GraduationCap, Code, Lightbulb, Wrench, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CyberLink } from "@/data/cybersecData";

interface LinkCardProps {
  link: CyberLink;
}

const difficultyConfig = {
  beginner: { icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10 border-green-500/20" },
  intermediate: { icon: GraduationCap, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
  advanced: { icon: Code, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
  concepts: { icon: Lightbulb, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" }
};

const typeConfig = {
  tutorial: { icon: BookOpen, color: "text-blue-500" },
  tool: { icon: Wrench, color: "text-purple-500" },
  tools: { icon: Wrench, color: "text-purple-500" },
  concept: { icon: Lightbulb, color: "text-yellow-500" },
  concepts: { icon: Lightbulb, color: "text-yellow-500" },
  practical: { icon: Code, color: "text-green-500" },
  cheatsheet: { icon: FileText, color: "text-orange-500" },
  cheatsheets: { icon: FileText, color: "text-orange-500" },
  course: { icon: Users, color: "text-indigo-500" },
  courses: { icon: Users, color: "text-indigo-500" }
};

export function LinkCard({ link }: LinkCardProps) {
  const difficultyKey = link.difficulty as keyof typeof difficultyConfig;
  const typeKey = link.type as keyof typeof typeConfig;
  
  const DifficultyIcon = link.difficulty && difficultyConfig[difficultyKey] ? difficultyConfig[difficultyKey].icon : BookOpen;
  const difficultyStyle = link.difficulty && difficultyConfig[difficultyKey] ? difficultyConfig[difficultyKey] : difficultyConfig.beginner;
  const TypeIcon = typeConfig[typeKey] ? typeConfig[typeKey].icon : Wrench;
  const typeColor = typeConfig[typeKey] ? typeConfig[typeKey].color : "text-gray-500";

  return (
    <Card className="group hover:shadow-cyber transition-all duration-300 animate-slide-up bg-gradient-card border-border/50 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {link.title}
          </CardTitle>
          <div className="flex flex-col gap-1">
            {link.difficulty && (
              <Badge variant="outline" className={`${difficultyStyle.bg} ${difficultyStyle.color} border-current text-xs`}>
                <DifficultyIcon className="w-3 h-3 mr-1" />
                {link.difficulty}
              </Badge>
            )}
            <Badge variant="outline" className={`bg-background/50 ${typeColor} border-current text-xs`}>
              <TypeIcon className="w-3 h-3 mr-1" />
              {link.type}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-3 text-muted-foreground">
          {link.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {link.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 hover:bg-secondary transition-colors">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {link.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-secondary/50">
              +{link.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground">
            {link.category}
          </span>
          <Button
            size="sm"
            onClick={() => window.open(link.url, '_blank')}
            className="bg-gradient-cyber hover:shadow-glow transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Learn Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}