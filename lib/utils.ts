// lib/utils.ts
// Utility functions for KAAYM website

import { format, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string, formatStr: string = 'PPP'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Get relative time (e.g., "2 days ago")
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error getting relative time:', error);
    return dateString;
  }
};

/**
 * Check if event is upcoming
 */
export const isUpcoming = (dateString: string): boolean => {
  try {
    const eventDate = parseISO(dateString);
    const now = new Date();
    return eventDate > now;
  } catch (error) {
    console.error('Error checking if upcoming:', error);
    return false;
  }
};

/**
 * Extract YouTube video ID from various URL formats
 */
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Generate YouTube thumbnail URL
 */
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string => {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Uganda format)
 */
export const isValidUgandaPhone = (phone: string): boolean => {
  // Matches formats: +256XXXXXXXXX, 256XXXXXXXXX, 07XXXXXXXX, 03XXXXXXXX
  const phoneRegex = /^(\+?256|0)?[37]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Format phone number to Uganda standard
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('256')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+256${cleaned.slice(1)}`;
  }
  
  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate slug from title
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Capitalize first letter of each word
 */
export const titleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Share on social media
 */
export const shareOnSocialMedia = (platform: 'facebook' | 'twitter' | 'whatsapp', url: string, text?: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : '';

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
  };

  window.open(shareUrls[platform], '_blank', 'width=600,height=400');
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Format duration from seconds to readable format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Parse duration string (MM:SS or HH:MM:SS) to seconds
 */
export const parseDuration = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  
  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  
  return 0;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if browser supports webp images
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

/**
 * Get optimized image URL (for CDN or image optimization)
 */
export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
  // If using a service like Cloudinary or Imgix, modify URL here
  // For now, return original URL
  return url;
};

/**
 * Calculate reading time
 */
export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Generate random color for avatars
 */
export const getRandomColor = (seed?: string): string => {
  const colors = [
    '#1e3a8a', // blue-900
    '#7c3aed', // purple-600
    '#059669', // green-600
    '#dc2626', // red-600
    '#d97706', // amber-600
    '#0891b2', // cyan-600
  ];

  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Sort events by date
 */
export const sortEventsByDate = <T extends { date: string }>(events: T[], ascending: boolean = true): T[] => {
  return [...events].sort((a, b) => {
    const dateA = parseISO(a.date).getTime();
    const dateB = parseISO(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Group events by month
 */
export const groupEventsByMonth = <T extends { date: string }>(events: T[]): Record<string, T[]> => {
  return events.reduce((groups, event) => {
    const monthYear = format(parseISO(event.date), 'MMMM yyyy');
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(event);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting localStorage:', error);
      return false;
    }
  },
  
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error('Error getting localStorage:', error);
      return defaultValue ?? null;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage:', error);
      return false;
    }
  }
};