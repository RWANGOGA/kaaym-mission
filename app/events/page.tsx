// app/events/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080';

interface DownloadableFile {
  id: number;
  title: string;
  description: string;
  file_url: string;
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  file_url?: string;
  downloadable_files: DownloadableFile[];
}

interface Product {
  id: number;
  title: string;
  description: string;
  price?: string;
  image_url?: string;
  category: string;
  downloadable_files: DownloadableFile[];
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image_url?: string;
  announcements: Announcement[];
  products: Product[];
  downloadable_files: DownloadableFile[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/events/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Could not load events. Please try again later.');
        setLoading(false);
      });
  }, []);

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
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* All styles are scoped here */}
      <style jsx global>{`
        /* Hide scrollbar for clean look */
        .overflow-hidden {
          scrollbar-width: none; /* Firefox */
        }
        .overflow-hidden::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        /* Infinite smooth auto-scroll */
        .animate-scroll-horizontal {
          display: flex;
          animation: scroll-horizontal 80s linear infinite; /* Adjust time for speed */
          will-change: transform;
        }

        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Half because we duplicate items */
          }
        }

        /* Pause on hover */
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }

        /* Card hover effect */
        .event-card {
          transition: all 0.3s ease;
        }
        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* TOP SECTION - Intro about KAAYM */}
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

        {/* MIDDLE SECTION - Auto-scrolling horizontal carousel */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Latest Events, Announcements & Resources
            </h2>

            {events.length === 0 ? (
              <p className="text-center text-xl text-gray-600 py-12">
                No events or resources available yet. Check back soon!
              </p>
            ) : (
              <div className="overflow-hidden relative">
                <div className="flex animate-scroll-horizontal gap-8 py-6">
                  {/* Duplicate items for seamless infinite loop */}
                  {[...events, ...events].map((event, index) => (
                    <div
                      key={`${event.id}-${index}`}
                      className="w-[320px] md:w-[380px] flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 event-card"
                    >
                      {/* Image - ADDED unoptimized HERE */}
                      {event.image_url && (
                        <div className="relative h-56 md:h-64 bg-gray-100">
                          <Image
                            src={`${API_URL}${event.image_url}`}
                            alt={event.title}
                            fill
                            unoptimized
                            className="object-cover"
                            priority={index < 4}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-3 line-clamp-2">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <span className="font-medium">{event.date}</span>
                          {event.location && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{event.location}</span>
                            </>
                          )}
                        </div>

                        <p className="text-gray-700 mb-6 line-clamp-4 text-sm leading-relaxed">
                          {event.description}
                        </p>

                        {/* Downloadable Files */}
                        {(event.downloadable_files?.length > 0 || event.announcements?.some(a => a.file_url)) && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-purple-800 mb-2">Downloads:</h4>
                            
                            {/* Legacy announcement files */}
                            {event.announcements?.map(ann => 
                              ann.file_url && (
                                <a
                                  key={ann.id}
                                  href={`${API_URL}${ann.file_url}`}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg text-sm transition flex items-center justify-between"
                                >
                                  <span className="font-medium">{ann.title}</span>
                                  <span className="text-xs">↓</span>
                                </a>
                              )
                            )}

                            {/* New downloadable files */}
                            {event.downloadable_files?.map(file => (
                              <a
                                key={file.id}
                                href={`${API_URL}${file.file_url}`}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg text-sm transition flex items-center justify-between"
                              >
                                <span className="font-medium">{file.title}</span>
                                <span className="text-xs">↓</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM SECTION - Gallery - ADDED unoptimized HERE */}
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