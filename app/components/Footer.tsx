// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [imageError, setImageError] = useState(false);

  // Background images that will cycle (full cover)
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
  }, []);

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Full-cover cycling background images with the exact blue tone from the screenshot */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-5000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt="KAAYM Background"
              fill
              className="object-cover object-center"
              style={{
                objectPosition: 'center 30%', // Ensures heads are fully visible
              }}
              priority={index === 0}
            />
            {/* Deep blue overlay matching the screenshot's vibrant blue lighting */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/60 to-blue-950/80" />
          </div>
        ))}
      </div>

      {/* Main Footer Content – Your original words and layout preserved */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Location Section – Larger badge */}
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 bg-amber-500 rounded-2xl flex items-center justify-center shadow-2xl">
                {imageError ? (
                  <span className="text-blue-950 font-black text-4xl tracking-wider">
                    KAAYM
                  </span>
                ) : (
                  <Image
                    src="/images/kaaym_badge.jpg"
                    alt="KAAYM Badge"
                    width={128}
                    height={128}
                    className="rounded-2xl object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-amber-400">{siteConfig.name}</h3>
                <p className="text-amber-300 text-base">Kigezi Ankole Anglican Youth Missioners</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-2xl font-bold text-white">
                {siteConfig.baseLocation}
              </p>
              <p className="text-lg text-amber-200">
                St. Francis Chapel, Makerere University
              </p>
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                className="block text-amber-300 hover:text-amber-200 transition text-lg mt-4"
              >
                {siteConfig.socialLinks.email}
              </a>
            </div>

            <Link
              href="/donate"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold px-8 py-3 rounded-md transition shadow-lg text-lg"
            >
              JOIN US NOW
            </Link>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-xl font-bold text-amber-400 mb-6">About</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about/leadership" className="text-gray-300 hover:text-white transition">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/about/values" className="text-gray-300 hover:text-white transition">
                  Growing together
                </Link>
              </li>
              <li>
                <Link href="/about/beliefs" className="text-gray-300 hover:text-white transition">
                  Fellowships
                </Link>
              </li>
            </ul>

            <h4 className="text-xl font-bold text-amber-400 mt-10 mb-6">Next Steps</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/next-steps/lunch" className="text-gray-300 hover:text-white transition">
                  External Activities
                </Link>
              </li>
              <li>
                <Link href="/next-steps/baptism" className="text-gray-300 hover:text-white transition">
                  Internal activities
                </Link>
              </li>
              <li>
                <Link href="/next-steps/volunteer" className="text-gray-300 hover:text-white transition">
                  Volunteering in StFrancis Chapel
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministries Column */}
          <div>
            <h4 className="text-xl font-bold text-amber-400 mb-6">Ministries</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/ministries/kids" className="text-gray-300 hover:text-white transition">
                  KAAYM Chairperson-seat
                </Link>
              </li>
              <li>
                <Link href="/ministries/youth" className="text-gray-300 hover:text-white transition">
                  Care Groups
                </Link>
              </li>
              <li>
                <Link href="/ministries/storytellers" className="text-gray-300 hover:text-white transition">
                  Doices
                </Link>
              </li>
              <li>
                <Link href="/ministries/college" className="text-gray-300 hover:text-white transition">
                  Prayer seat
                </Link>
              </li>
              <li>
                <Link href="/ministries/equip" className="text-gray-300 hover:text-white transition">
                  Missions-Desk
                </Link>
              </li>
              <li>
                <Link href="/ministries/communities" className="text-gray-300 hover:text-white transition">
                  Publicity-Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help? Column */}
          <div>
            <h4 className="text-xl font-bold text-amber-400 mb-6">Need Assistance?</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/help/counseling" className="text-gray-300 hover:text-white transition">
                  Join our weekly fellowships 
                </Link>
              </li>
              <li>
                <Link href="/help/prayer" className="text-gray-300 hover:text-white transition">
                  Prayer Request
                </Link>
              </li>
              <li>
                <Link href="/help/benevolence" className="text-gray-300 hover:text-white transition">
                  We here to standard with you  always , talk to us 
                </Link>
              </li>
            </ul>

            <div className="mt-12">
              <h5 className="text-lg font-semibold text-amber-300 mb-4">Follow Us</h5>
              <div className="flex gap-4">
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center hover:bg-amber-400 transition"
                >
                  <Facebook className="w-6 h-6 text-blue-950" />
                </a>
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center hover:bg-amber-400 transition"
                >
                  <Instagram className="w-6 h-6 text-blue-950" />
                </a>
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center hover:bg-amber-400 transition"
                >
                  <Youtube className="w-6 h-6 text-blue-950" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="relative z-10 border-t border-white/20 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}