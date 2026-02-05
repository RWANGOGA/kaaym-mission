// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Mail, MapPin, Youtube, Heart, BookOpen, LogIn, UserPlus, LogOut, User } from 'lucide-react';

// ✅ ONLY YOUR SPECIFIED PAGES
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
  { href: '/support', label: 'Support Us' },
];

// Social links config (only YouTube now)
const siteConfig = {
  socialLinks: {
    email: 'contact@kaaym.org',
    youtube: 'https://www.youtube.com/@KAAYMMukChapter',
  }
};

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [verseVisible, setVerseVisible] = useState(true);
  const pathname = usePathname();

  // Simple session check (replace with proper Django auth later)
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if user is logged in (Django session)
  useEffect(() => {
    if (!mounted) return;

    const checkSession = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/check-auth/', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || null);
        }
      } catch (err) {
        console.log('Not logged in');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [mounted]);

  // Scroll logic
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Prevent body scroll when sidebar is open
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

  // Close sidebar on route change
  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }, [pathname]);

  // Verse pop in/out animation
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const interval = setInterval(() => {
      setVerseVisible((prev) => !prev);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      // Clear local state and redirect
      setUser(null);
      router.push('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  // Render authentication buttons
  const renderAuthButtons = (isMobile = false) => {
    if (loading) {
      return (
        <div className={`${isMobile ? 'px-4 py-2' : ''} text-gray-400 text-sm`}>
          Loading...
        </div>
      );
    }

    if (user) {
      // User is logged in
      return (
        <div className={`flex items-center gap-3 ${isMobile ? 'flex-col items-start w-full' : ''}`}>
          <div
            className={`flex items-center gap-2 ${
              isMobile
                ? 'px-4 py-2 text-gray-300'
                : scrolled
                ? 'text-gray-700'
                : 'text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium truncate max-w-[160px]" title={user.email || 'User'}>
              {user.email?.split('@')[0] || 'User'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              isMobile
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full'
                : scrolled
                ? 'text-red-600 hover:bg-red-50'
                : 'text-red-300 hover:bg-white/10'
            }`}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      );
    }

    // User is not logged in
    return (
      <div className={`flex items-center gap-3 ${isMobile ? 'flex-col items-start w-full' : ''}`}>
        <Link
          href="/login"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isMobile
              ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 w-full'
              : scrolled
              ? 'text-blue-600 hover:bg-blue-50'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>

        <Link
          href="/signup"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isMobile
              ? 'bg-green-600 text-white hover:bg-green-500 w-full justify-center'
              : 'bg-green-600 text-white hover:bg-green-500 shadow-lg hover:shadow-xl'
          }`}
        >
          <UserPlus className="w-5 h-5" />
          Sign Up
        </Link>
      </div>
    );
  };

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

                {/* Only YouTube in top bar */}
                <div className="flex items-center gap-4">
                  <a 
                    href={siteConfig.socialLinks.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/images/kaaym_badge.jpg"
                alt="KAAYM"
                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105"
              />
              <div className="hidden sm:block">
                <h1 className={`text-2xl sm:text-3xl font-bold ${scrolled ? 'text-yellow-500' : 'text-yellow-400'} tracking-tight`}>
                  KAAYM
                </h1>
                <p className={`text-xs sm:text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-white'} mt-0.5 leading-tight`}>
                  Kigezi Ankore Anglican Youth Missioners
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
              {navItems
                .filter(item => item.href !== '/support')
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
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
                className="px-4 py-2 rounded-lg bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <Heart className="w-5 h-5" />
                Support Us
              </Link>

              {/* Auth Buttons - Desktop */}
              <div className="ml-2 pl-4 border-l border-gray-400">
                {renderAuthButtons()}
              </div>
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

        {/* Mobile Sidebar */}
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

          {/* Sidebar Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-black text-white shadow-xl overflow-hidden">
            {/* Bible Verse Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 bg-black" />
              
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
                </div>
              </div>

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
                    className="w-20 h-20 object-cover rounded-full border-4 border-purple-600 shadow-xl"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-yellow-400 tracking-tight">
                      KAAYM
                    </h1>
                    <p className="text-xs font-medium text-white mt-0.5 leading-relaxed">
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

              {/* Navigation Links */}
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

                {/* Auth Section - Mobile */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <p className="px-4 text-sm text-gray-400 mb-3 font-semibold">Account</p>
                  {renderAuthButtons(true)}
                </div>
              </div>

              {/* Footer Area */}
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

                  {/* Only YouTube social icon */}
                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href={siteConfig.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-red-600/30 hover:bg-red-600/50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Youtube className="w-6 h-6 text-red-500" />
                    </a>
                  </div>

                  {/* Prayer Encouragement */}
                  <div className="pt-4 mt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 text-center">
                      <span className="text-yellow-400 font-semibold">KNOW GOD AND MAKE HIM KNOWN.</span>
                      <br />
                      Thank you for visiting our site. God bless you!
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