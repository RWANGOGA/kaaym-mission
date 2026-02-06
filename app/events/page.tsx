'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Use environment variable for production (Render), fallback to local for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

const PDF_PLACEHOLDER = '/pdf-placeholder.png';
const FALLBACK_IMAGE = '/images/placeholder.jpg';

interface Item {
  id: number;
  title: string;
  type: 'product' | 'resource';
  image?: string;
  file?: string;
  created_at: string;
  is_active: boolean;
}

/* =========================
   URL FIXER - makes relative paths absolute
========================= */
const makeAbsoluteUrl = (path?: string | null) => {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('//')) return path;
  if (!path.startsWith('/')) path = '/' + path;
  return `${API_URL}${path}`;
};

export default function EventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    console.log(`🔄 Fetching items from: ${API_URL}/api/items/`);
    
    fetch(`${API_URL}/api/items/`)
      .then(res => {
        console.log(`✅ Response status: ${res.status}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(`✅ Received data:`, data);
        
        const list = Array.isArray(data) ? data : data.results || [];
        console.log(`📊 Total items: ${list.length}`);

        const prepared = list
          .filter((i: Item) => i.is_active)
          .map((item: Item) => {
            let preview = FALLBACK_IMAGE;
            let download = null;

            if (item.type === 'product' && item.image) {
              preview = makeAbsoluteUrl(item.image)!;
              download = preview;
            }

            if (item.type === 'resource' && item.file) {
              const fileUrl = makeAbsoluteUrl(item.file)!;
              preview = item.file.toLowerCase().endsWith('.pdf')
                ? PDF_PLACEHOLDER
                : fileUrl;
              download = fileUrl;
            }

            return {
              id: item.id,
              title: item.title,
              preview,
              download,
            };
          });

        console.log(`✅ Active items prepared: ${prepared.length}`);
        setItems(prepared);
        setLoading(false);
      })
      .catch(error => {
        console.error(`❌ Error fetching items:`, error);
        console.error(`❌ Used API URL: ${API_URL}/api/items/`);
        setError(`Failed to load items: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-purple-700 text-xl">
        Loading KAAYM content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Connection Error</div>
          <div className="text-red-500">{error}</div>
          <div className="text-gray-600 text-sm mt-4">
            Make sure the backend is running on {API_URL}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Duplicate for infinite scroll
  const sliderItems = [...items, ...items];

  return (
    <>
      <style jsx global>{`
        .slider-track {
          display: flex;
          width: ${sliderItems.length * 100}%;
          animation: slide 40s linear infinite;
        }

        .slider-item {
          width: 100vw;
          flex-shrink: 0;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${items.length * 100}vw);
          }
        }

        .slider-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="bg-gray-50 min-h-screen">
        {/* HERO */}
        <section className="bg-purple-900 text-white py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            KAAYM Events & Media
          </h1>
          <p className="mt-4 text-lg">
            Flyers, Posters, Products & Announcements
          </p>
        </section>

        {/* SLIDER */}
        <section className="overflow-hidden bg-white">
          <div className="slider-track">
            {sliderItems.map((item, index) => (
              <div key={index} className="slider-item flex justify-center py-16">
                <div className="w-[90%] md:w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* IMAGE */}
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={item.preview}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">
                      {item.title}
                    </h3>

                    {item.download && (
                      <a
                        href={item.download}
                        target="_blank"
                        download
                        className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                      >
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}