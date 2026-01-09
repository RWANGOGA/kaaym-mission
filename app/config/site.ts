// config/site.ts
import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'KAAYM',
  description: 'Kigezi Ankore  Anglican Youth Missioners - St. Francis Chapel, Makerere University',
  mission: 'Spreading the Gospel of Jesus Christ and bringing salvation to all, with a special focus on our Anglican brothers and sisters across Uganda.',
  vision: 'To be a beacon of hope and salvation, reaching out to communities in Western Uganda and beyond, transforming lives through Christ.',
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