export interface CyberLink {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'concepts';
  type: 'tutorial' | 'tool' | 'concept' | 'practical' | 'cheatsheet' | 'course' | 'tools' | 'concepts' | 'courses' | 'cheatsheets';
}

export const categories = [
  'Web Application Security',
  'Network Security', 
  'Penetration Testing',
  'Reverse Engineering',
  'Cryptography',
  'Digital Forensics',
  'Social Engineering',
  'Malware Analysis',
  'Red Team',
  'Blue Team',
  'Mobile Security',
  'Cloud Security',
  'OSINT',
  'Hardware Hacking',
  'Bug Bounty',
  'CTF & Challenges',
  'Courses'
];

// Function to fetch cyber links from content.json with progressive loading
export async function fetchCyberLinks(): Promise<CyberLink[]> {
  try {
    const response = await fetch('./content.json');
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
    return [];
  }
}

// Function to fetch first N items immediately for faster initial display
export async function fetchCyberLinksWithPriority(priorityCount: number = 50): Promise<{
  priorityLinks: CyberLink[];
  remainingLinks: Promise<CyberLink[]>;
}> {
  try {
    const response = await fetch('./content.json');
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    const allLinks: CyberLink[] = await response.json();
    
    const priorityLinks = allLinks.slice(0, priorityCount);
    const remainingLinks = Promise.resolve(allLinks.slice(priorityCount));
    
    return {
      priorityLinks,
      remainingLinks
    };
  } catch (error) {
    console.error('Error loading content:', error);
    return {
      priorityLinks: [],
      remainingLinks: Promise.resolve([])
    };
  }
}

// Removed mock data - now using content.json