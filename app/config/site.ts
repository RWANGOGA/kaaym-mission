// config/site.ts
import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'KAAYM',
  description: 'Kigezi Ankore Anglican Youth Missioners - St. Francis Chapel, Makerere University',
  mission: 'Preparing the harvest for the Lord and ensure that the truth and knowledge of God is spread to all nations, institutions of learning, churches, and communities.',
  vision: "KAAYM envisions a world where everyone lives purposefully to realize their full potential according to God's will. It envisions nations of the world transformed through godly leadership.",
  baseLocation: 'St. Francis Chapel, Makerere University, Kampala',
  jerusalemLocation: 'Western Uganda',
  socialLinks: {
    facebook: 'https://facebook.com/kaaym',
    instagram: 'https://instagram.com/kaaym',
    youtube: 'https://youtube.com/@kaaym', // Replace with actual channel
    email: 'info@kaaym.org',
    phone: '+256756348528' // Replace with actual phone
  }
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' }
];
