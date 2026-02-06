// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Youtube, Mail } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [imageError, setImageError] = useState(false);

  // Background images that cycle (full cover)
  const backgroundImages = [
    '/images/Ankore.jpeg',
    '/images/Ankore1.jpeg',
    '/images/KAAYM120.jpeg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <footer className="relative text-white overflow-hidden bg-gray-900">
      
      {/* Full-cover cycling background images */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt="KAAYM Background"
              fill
              className="object-cover object-center"
              style={{ objectPosition: 'center 30%' }}
              priority={index === 0}
            />
            {/* Intense black gradient overlay fading from Right to Left */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/70 to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Reordered grid layout to place brand section on the far left */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Expanded Badge Section (moved back to the far left) */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Circular Logo Boundary */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 border-amber-400 mx-auto sm:mx-0">
                {imageError ? (
                  <span className="text-gray-900 font-black text-4xl">KAAYM</span>
                ) : (
                  <Image
                    src="/images/kaaym_badge.jpg"
                    alt="KAAYM Badge"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-amber-400 leading-tight">{siteConfig.name}</h3>
                <p className="text-amber-200 text-lg italic">Kigezi Ankole Anglican Youth Missioners</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xl font-bold text-white">{siteConfig.baseLocation}</p>
              <p className="text-gray-300">St. Francis Chapel, Makerere University</p>
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition mt-2"
              >
                <Mail size={20} /> {siteConfig.socialLinks.email}
              </a>
            </div>

            <Link
              href="/donate"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-gray-900 font-black px-10 py-4 rounded-xl transition shadow-xl uppercase tracking-wider"
            >
              JOIN US NOW
            </Link>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">About</h4>
            <ul className="space-y-4 text-gray-200">
              <li><Link href="/about/leadership" className="hover:text-amber-300 transition">Leadership</Link></li>
              <li><Link href="/about/values" className="hover:text-amber-300 transition">Growing together</Link></li>
              <li><Link href="/about/fellowships" className="hover:text-amber-300 transition">Fellowships</Link></li>
            </ul>

            <h4 className="text-xl font-bold text-amber-400 mt-12 mb-6 border-b border-amber-500/30 pb-2">Next Steps</h4>
            <ul className="space-y-4 text-gray-200">
              <li><Link href="/activities/external" className="hover:text-amber-300 transition">External Activities</Link></li>
              <li><Link href="/activities/internal" className="hover:text-amber-300 transition">Internal activities</Link></li>
              <li><Link href="/volunteer" className="hover:text-amber-300 transition">Volunteering at St. Francis</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">Departments</h4>
            <ul className="space-y-4 text-gray-200">
              <li><Link href="/dept/chairperson" className="hover:text-amber-300 transition">KAAYM Chairperson-seat</Link></li>
              <li><Link href="/dept/care-groups" className="hover:text-amber-300 transition">Care Groups</Link></li>
              <li><Link href="/dept/dioceses" className="hover:text-amber-300 transition">Dioceses</Link></li>
              <li><Link href="/dept/prayer" className="hover:text-amber-300 transition">Prayer seat</Link></li>
              <li><Link href="/dept/missions" className="hover:text-amber-300 transition">Missions-Desk</Link></li>
              <li><Link href="/dept/publicity" className="hover:text-amber-300 transition">Publicity-Desk</Link></li>
            </ul>
          </div>

          {/* Assistance & Social */}
          <div>
            <h4 className="text-xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">Need Assistance?</h4>
            <ul className="space-y-4 text-gray-200">
              <li><Link href="/fellowships" className="hover:text-amber-300 transition">Join weekly fellowships</Link></li>
              <li><Link href="/prayer-request" className="hover:text-amber-300 transition">Prayer Request</Link></li>
              <li className="text-amber-100/90 italic bg-white/5 p-4 rounded-lg border-l-4 border-amber-500">
                We are here to stand with you always, talk to us.
              </li>
            </ul>

            <div className="mt-12">
              <h5 className="text-lg font-semibold text-amber-300 mb-4">Official Channel</h5>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.youtube.com/@KAAYMMukChapter" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all shadow-lg"
                >
                  <Youtube size={24} className="group-hover:scale-110 transition-transform" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Verse, Slogan, and Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
            {/* Added Verse: now large and bold, placed first */}
            <p className="text-white font-extrabold text-sm sm:text-base mb-3 px-2">
                "that I may know Him and the power of is resurrection, and may share His sufferings, becoming like Him in His death," — Philippians 3:10
            </p>
             {/* Added Slogan: now large and bold, placed second */}
            <p className="text-amber-400 font-extrabold text-lg sm:text-xl mb-3 uppercase tracking-wider px-2">
                KNOW GOD AND MAKE HIM KNOWN
            </p>
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
                &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
