'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const API_URL = 'http://127.0.0.1:8001';

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
   URL FIXER
========================= */
const makeAbsoluteUrl = (path?: string | null) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (!path.startsWith('/')) path = '/' + path;
  return `${API_URL}${path}`;
};

export default function EventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/items/`)
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];

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

        setItems(prepared);
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
