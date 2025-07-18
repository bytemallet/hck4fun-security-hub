import { TrendingUp, BookOpen, Users, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberLink } from "@/data/cybersecData";

interface StatsOverviewProps {
  links: CyberLink[];
  filteredCount: number;
}

export function StatsOverview({ links, filteredCount }: StatsOverviewProps) {
  const totalLinks = links.length;
  const tutorialCount = links.filter(link => link.type === 'tutorial').length;
  const advancedCount = links.filter(link => link.difficulty === 'advanced').length;
  const toolCount = links.filter(link => link.type === 'tool').length;

  const stats = [
    {
      title: "Learning Resources",
      value: totalLinks.toLocaleString(),
      icon: TrendingUp,
      description: `${filteredCount} available`,
      color: "text-blue-500"
    },
    {
      title: "Tutorials",
      value: tutorialCount,
      icon: BookOpen,
      description: "Step-by-step guides",
      color: "text-green-500"
    },
    {
      title: "Advanced Content",
      value: advancedCount,
      icon: Code,
      description: "Expert-level resources",
      color: "text-red-500"
    },
    {
      title: "Tools & Scripts",
      value: toolCount,
      icon: Users,
      description: "Ready-to-use tools",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="animate-slide-up bg-gradient-card border-border/50 hover:shadow-cyber transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}