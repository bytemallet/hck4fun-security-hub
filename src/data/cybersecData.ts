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

// Function to fetch cyber links from content.json
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

// Removed mock data - now using content.json