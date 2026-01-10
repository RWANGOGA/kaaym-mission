// app/events/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Youtube, Play, Volume2, VolumeX } from 'lucide-react';

interface MediaItem {
  id: string;
  media?: string;
  mediaType: 'image' | 'video';
}

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const displayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ALL MEDIA - Images and Videos
  const allMedia: MediaItem[] = [
    // Videos
    { id: 'v1', media: '/videos/kaaym.mp4', mediaType: 'video' },
    { id: 'v2', media: '/videos/kaaym1.mp4', mediaType: 'video' },
    { id: 'v3', media: '/videos/kaaym2.mp4', mediaType: 'video' },
    { id: 'v4', media: '/videos/kaaym3.mp4', mediaType: 'video' },
    { id: 'v5', media: '/videos/meeeee.mp4', mediaType: 'video' },
    { id: 'v6', media: '/videos/meeee.mp4', mediaType: 'video' },
    { id: 'v7', media: '/videos/mee.mp4', mediaType: 'video' },
    { id: 'v8', media: '/videos/eme.mp4', mediaType: 'video' },
    
    // Images
    { id: 'i1', media: '/images/kevin5.jpeg', mediaType: 'image' },
    { id: 'i2', media: '/images/kevin6.jpeg', mediaType: 'image' },
    { id: 'i3', media: '/images/kevin10.jpeg', mediaType: 'image' },
    { id: 'i4', media: '/images/kevin13.jpeg', mediaType: 'image' },
    { id: 'i5', media: '/images/kevin14.jpeg', mediaType: 'image' },
    { id: 'i6', media: '/images/kevin16.jpeg', mediaType: 'image' },
    { id: 'i7', media: '/images/kAAYM4.jpg', mediaType: 'image' },
    { id: 'i8', media: '/images/committe.jpg', mediaType: 'image' },
  ];

  const currentItem = allMedia[currentSlide];

  // Handle automatic slide progression
  useEffect(() => {
    if (!isPlaying) return;

    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
    }

    const duration = currentItem.mediaType === 'video' ? 10000 : 4000;
    
    displayTimerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % allMedia.length);
    }, duration);

    return () => {
      if (displayTimerRef.current) {
        clearTimeout(displayTimerRef.current);
      }
    };
  }, [currentSlide, isPlaying, currentItem.mediaType, allMedia.length]);

  // Handle video playback
  useEffect(() => {
    if (currentItem.mediaType === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.muted = isMuted;
      video.currentTime = 0;
      
      // Small delay to ensure video is ready
      const playTimeout = setTimeout(() => {
        video.play().catch(error => {
          console.log('Video autoplay failed:', error);
          // Try again with muted
          video.muted = true;
          video.play().catch(err => console.log('Muted play failed:', err));
        });
      }, 100);

      return () => clearTimeout(playTimeout);
    }
  }, [currentSlide, currentItem.mediaType, isMuted]);

  return (
    <div className="min-h-screen bg-black">
      {/* SECTION 1: PURE VISUAL FULL SCREEN ROTATION */}
      <section className="relative h-screen w-screen overflow-hidden bg-black">
        <div className="absolute inset-0 h-full w-full">
          {currentItem.mediaType === 'image' ? (
            <img
              key={currentItem.id}
              src={currentItem.media}
              alt=""
              className="h-full w-full object-cover animate-in fade-in duration-500"
            />
          ) : (
            <video
              key={currentItem.id}
              ref={videoRef}
              className="h-full w-full object-cover"
              loop
              muted={isMuted}
              playsInline
              autoPlay
              preload="auto"
            >
              <source src={currentItem.media} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Minimal controls at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
            }}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            </div>
          </button>

          {currentItem.mediaType === 'video' && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
          )}

          <div className="text-white text-xs font-mono">
            {currentSlide + 1}/{allMedia.length}
          </div>
        </div>
      </section>

      {/* SECTION 2: PURE VISUAL GALLERY */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Visual Grid - No Text */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {allMedia.map((media) => (
                <div
                  key={media.id}
                  className="group relative overflow-hidden bg-black aspect-square cursor-pointer"
                >
                  {media.mediaType === 'image' ? (
                    <img
                      src={media.media}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <video
                        className="h-full w-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={media.media} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/40 p-2 rounded-full">
                          <Play className="w-5 h-5 text-white" fill="white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* YouTube Link - Only Text on Page */}
            <div className="mt-16 text-center">
              <a 
                href="https://www.youtube.com/@KAAYMMukChapter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Youtube className="w-4 h-4" />
                <span>For more events visit our YouTube channel</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}