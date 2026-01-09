// types/index.ts
// Core type definitions for KAAYM Mission Website

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface Mission {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  images?: string[];
  participants?: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'fellowship' | 'mission' | 'prayer' | 'outreach' | 'announcement';
  image?: string;
  isUpcoming: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  contact?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio';
  youtubeId?: string;
  audioUrl?: string;
  thumbnail?: string;
  date: string;
  duration?: string;
  category?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  email?: string;
  phone?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  mission: string;
  vision: string;
  baseLocation: string;
  jerusalemLocation: string;
  socialLinks: SocialLinks;
}