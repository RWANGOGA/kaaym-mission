'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, MapPin, Facebook, Instagram, Youtube, Heart, BookOpen } from 'lucide-react';

// ✅ ONLY YOUR SPECIFIED PAGES
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
  { href: '/support', label: 'Support Us' },
];

// Social links config
const siteConfig = {
  socialLinks: {
    email: 'contact@kaaym.org',
    facebook: 'https://facebook.com/kaaym',
    instagram: 'https://instagram.com/kaaym',
    youtube: 'https://youtube.com/kaaym',
  }
};

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [verseVisible, setVerseVisible] = useState(true);
  const pathname = usePathname();

  // ✅ Mount guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Scroll logic
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // ✅ Prevent body scroll when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // ✅ Close sidebar on route change
  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }, [pathname]);

  // ✅ Verse pop in/out animation
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const interval = setInterval(() => {
      setVerseVisible((prev) => !prev);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Add CSS for verse animation */}
      <style>{`
        @keyframes verseFadeInOut {
          0% { opacity: 0; transform: scale(0.95); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }
        .verse-animation {
          animation: verseFadeInOut 3s ease-in-out infinite;
        }
      `}</style>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900'
        }`}
      >
        {/* Top Bar */}
        {!scrolled && (
          <div className="bg-purple-800 text-white py-2.5">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 text-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                  <a
                    href={`mailto:${siteConfig.socialLinks.email}`}
                    className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{siteConfig.socialLinks.email}</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>St. Francis Chapel, Makerere University</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4 hover:text-blue-300 transition-colors" />
                  </a>
                  <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 hover:text-pink-300 transition-colors" />
                  </a>
                  <a href={siteConfig.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-4 h-4 hover:text-red-300 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-6">
              <img
                src="/images/kaaym_badge.jpg"
                alt="KAAYM"
                className="w-20 h-20 object-contain rounded-full"
              />
              <div>
                <h1 className={`text-4xl font-black ${scrolled ? 'text-purple-900' : 'text-white'}`}>
                  KAAYM
                </h1>
                <p className={`text-sm font-semibold ${scrolled ? 'text-gray-600' : 'text-purple-100'}`}>
                  Kigezi Ankore Anglican Youth Missioners
                </p>
              </div>
            </Link>

            {/* Desktop Menu - ONLY YOUR 6 PAGES */}
            <div className="hidden lg:flex items-center gap-3">
              {navItems
                .filter(item => item.href !== '/support') // Support button is separate
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      isActive(item.href)
                        ? 'bg-purple-600 text-white'
                        : scrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Support Us Button */}
              <Link
                href="/support"
                className="ml-3 px-6 py-3 rounded-lg bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold flex items-center gap-2 transition-colors"
              >
                <Heart className="w-5 h-5" />
                Support Us
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-colors`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar with Pop-in/Pop-out Verse */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Panel - Black Background */}
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-black text-white shadow-xl overflow-hidden">
            {/* Bible Verse Background - POP IN/OUT ANIMATION */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 bg-black" />
              
              {/* Complete verse text in yellow with pop animation */}
              <div className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-1000 ${
                verseVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-center verse-animation">
                  <div className="flex justify-center mb-4">
                    <BookOpen className="w-10 h-10 text-yellow-400" />
                  </div>
                  <p className="text-lg font-serif italic leading-relaxed text-yellow-300">
                    "Come now, let us reason together," says the LORD. 
                    <br /><br />
                    "Though your sins are like scarlet, they shall be as white as snow; 
                    though they are red as crimson, they shall be like wool.
                    <br /><br />
                    If you are willing and obedient, you will eat the good things of the land;
                    <br />
                    but if you resist and rebel, you will be devoured by the sword."
                  </p>
                  <p className="mt-6 text-xl font-bold text-yellow-400">
                    Isaiah 1:18-20
                  </p>
                  
                  {/* Always visible reference verse */}
                  <div className="mt-8 pt-4 border-t border-yellow-400/30">
                    <p className="text-sm text-yellow-300/80">
                      The mouth of the LORD has spoken.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reference verse that stays visible */}
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-auto">
                <div className="bg-yellow-400/20 backdrop-blur-sm py-3 px-6 mx-6 rounded-lg border border-yellow-400/30">
                  <p className="text-sm font-bold text-yellow-300">
                    "The mouth of the LORD has spoken." — Isaiah 1:20
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 h-full flex flex-col overflow-y-auto bg-black/70">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 bg-black/80 backdrop-blur-sm sticky top-0">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/images/kaaym_badge.jpg"
                    alt="KAAYM"
                    className="w-14 h-14 object-contain rounded-full border-2 border-gray-600"
                  />
                  <div>
                    <h1 className="text-2xl font-black text-white">KAAYM</h1>
                    <p className="text-xs font-semibold text-gray-400">
                      Kigezi Ankore Anglican Youth Missioners
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links - CLEAN WITHOUT BOXES */}
              <div className="p-4 flex-1">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-4 transition-colors ${
                        isActive(item.href)
                          ? 'text-yellow-400 font-bold border-l-4 border-yellow-400'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span className="text-lg font-medium">{item.label}</span>
                      {item.href === '/support' && (
                        <Heart className="w-5 h-5 text-yellow-400" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Non-scrollable Footer Area */}
              <div className="sticky bottom-0 bg-black/90 backdrop-blur-sm p-6 border-t border-gray-800">
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.socialLinks.email}`}
                    className="flex items-center gap-3 hover:text-yellow-400 transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{siteConfig.socialLinks.email}</span>
                  </a>

                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">St. Francis Chapel, Makerere University</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href={siteConfig.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-blue-400 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={siteConfig.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-pink-400 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={siteConfig.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-red-400 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Prayer Encouragement */}
                  <div className="pt-4 mt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 text-center">
                      <span className="text-yellow-400 font-semibold">KOW GOD AND MAKE HIM KNOWN.</span>
                      <br />
                      Thank you for visiting our site . God bless you 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}