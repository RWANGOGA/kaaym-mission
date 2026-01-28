'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // adjust path (e.g. ../lib/firebase or ../../lib/firebase)

interface ResourceItem {
  id: string;
  title: string;
  description?: string;
  type: string;
  imageUrls?: string[];
  fileUrl?: string;
  fileName?: string;
  createdAt?: any;
}

export default function EventsPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const q = query(
          collection(db, 'items'),
          where('type', '==', 'resource'),
          where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ResourceItem[];

        // Sort by newest first (optional but nice)
        items.sort((a, b) => {
          const dateA = a.createdAt?.toMillis?.() || 0;
          const dateB = b.createdAt?.toMillis?.() || 0;
          return dateB - dateA;
        });

        setResources(items);
      } catch (err: any) {
        console.error('Firestore fetch error:', err);
        setError('Could not load announcements, flyers & posters. Try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Prepare images for carousel
  const carouselImages = resources.flatMap(item => {
    const images: { url: string; title: string }[] = [];

    if (item.imageUrls && item.imageUrls.length > 0) {
      item.imageUrls.forEach(url => images.push({ url, title: item.title }));
    } else if (item.fileUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.fileUrl)) {
      images.push({ url: item.fileUrl, title: item.title });
    }

    return images;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-purple-800 animate-pulse">
          Loading KAAYM Events...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Keep all your original styles */}
      <style jsx global>{`
        .overflow-hidden { scrollbar-width: none; }
        .overflow-hidden::-webkit-scrollbar { display: none; }
        .animate-scroll-horizontal {
          display: flex;
          animation: scroll-horizontal 80s linear infinite;
          will-change: transform;
        }
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-horizontal:hover { animation-play-state: paused; }
        .event-card { transition: all 0.3s ease; }
        .event-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* TOP SECTION - unchanged */}
        <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg">
              KAAYM Events & Mission Updates
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Kigezi Ankore Anglican Youth Missioners (KAAYM) — spreading the Gospel of Jesus Christ 
              through fellowship, outreach, Bible study, and community transformation at 
              Makerere University and beyond.
            </p>
            <p className="text-lg opacity-90 font-medium">
              Know God and Make Him Known — Join us in this divine mission!
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION - Carousel from Firestore */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Latest Announcements, Flyers & Posters
            </h2>

            {carouselImages.length === 0 ? (
              <p className="text-center text-xl text-gray-600 py-12">
                No announcements or posters available yet. Check back soon!
              </p>
            ) : (
              <div className="overflow-hidden relative">
                <div className="flex animate-scroll-horizontal gap-8 py-6">
                  {[...carouselImages, ...carouselImages].map((img, index) => (
                    <div
                      key={`${img.title}-${index}`}
                      className="w-[320px] md:w-[380px] flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 event-card"
                    >
                      <div className="relative h-56 md:h-64 bg-gray-100">
                        <Image
                          src={img.url}
                          alt={img.title}
                          fill
                          unoptimized={true}
                          className="object-cover"
                          priority={index < 4}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-3 line-clamp-2">
                          {img.title}
                        </h3>
                        {/* Optional: add description or download link if fileUrl exists */}
                        {img.url.includes('.pdf') && (
                          <a
                            href={img.url}
                            download
                            className="mt-2 inline-block text-sm text-purple-600 hover:underline"
                          >
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM SECTION - Gallery – unchanged */}
        <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
              KAAYM in Action
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              From mission trips to Bible studies, fellowship gatherings to community outreach — 
              KAAYM continues to spread the Gospel across Western Uganda and beyond.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {['/images/kaaym1234.jpg', '/images/kaaym16.jpg', '/images/Kaaym13.jpg', '/images/kaaym6.jpg'].map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image 
                    src={src} 
                    alt={`KAAYM gallery ${i+1}`} 
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}