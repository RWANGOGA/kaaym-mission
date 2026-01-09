'use client';

import { useState, useEffect, useRef } from 'react';
import { Video, Music, Play, Youtube, Calendar, ExternalLink, Heart, Users, Mic, BookOpen } from 'lucide-react';
import YouTube from 'react-youtube';
import { MediaItem } from '../types';

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Extract YouTube IDs from the provided URLs
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Organized videos by category for better layout
  const videoCategories = {
    worship: [
      {
        id: '2',
        title: 'Special Praise & Worship',
        description: 'Powerful worship session at St. Francis Chapel',
        type: 'video',
        youtubeId: 'id2jeZ0Xbsg',
        thumbnail: 'https://img.youtube.com/vi/id2jeZ0Xbsg/maxresdefault.jpg',
        date: '2024-09-10',
        duration: '45:20',
        category: 'Worship',
        icon: <Mic className="w-5 h-5" />,
        color: 'from-purple-600 to-pink-600',
        shape: 'rounded-3xl'
      },
      {
        id: '7',
        title: 'Worship Sessions',
        description: 'Beautiful worship and praise moments',
        type: 'video',
        youtubeId: getYouTubeId('https://www.youtube.com/watch?v=5578g8nWRvg'),
        thumbnail: 'https://img.youtube.com/vi/5578g8nWRvg/maxresdefault.jpg',
        date: '2024-10-15',
        duration: '35:40',
        category: 'Worship',
        icon: <Heart className="w-5 h-5" />,
        color: 'from-pink-600 to-rose-600',
        shape: 'rounded-2xl'
      }
    ],
    fellowship: [
      {
        id: '1',
        title: 'Theme Exposition',
        description: 'Exposing the semester theme to missioners',
        type: 'video',
        youtubeId: 'KMmoH9ES7oc',
        thumbnail: 'https://img.youtube.com/vi/KMmoH9ES7oc/maxresdefault.jpg',
        date: '2024-08-15',
        duration: '15:32',
        category: 'Fellowship',
        icon: <Users className="w-5 h-5" />,
        color: 'from-blue-600 to-cyan-600',
        shape: 'rounded-l-3xl rounded-tr-3xl'
      },
      {
        id: '3',
        title: 'Year One Fellowship',
        description: 'Sharing from Uncle and KAAYM elder',
        type: 'video',
        youtubeId: 'oU31UC7UH9w',
        thumbnail: 'https://img.youtube.com/vi/oU31UC7UH9w/maxresdefault.jpg',
        date: '2024-09-05',
        duration: '12:15',
        category: 'Fellowship',
        icon: <Users className="w-5 h-5" />,
        color: 'from-cyan-600 to-blue-600',
        shape: 'rounded-r-3xl rounded-tl-3xl'
      },
      {
        id: '5',
        title: 'Fellowship Moments',
        description: 'Additional fellowship recordings',
        type: 'video',
        youtubeId: getYouTubeId('https://www.youtube.com/watch?v=w4q58YWWt4o'),
        thumbnail: 'https://img.youtube.com/vi/w4q58YWWt4o/maxresdefault.jpg',
        date: '2024-10-01',
        duration: '20:30',
        category: 'Fellowship',
        icon: <Users className="w-5 h-5" />,
        color: 'from-sky-600 to-blue-600',
        shape: 'rounded-xl'
      }
    ],
    testimonies: [
      {
        id: '4',
        title: 'KAAYM Elders Sharing',
        description: 'Sharing the Gospel at Makerere University',
        type: 'video',
        youtubeId: 'bK2uVyWmbl0',
        thumbnail: 'https://img.youtube.com/vi/bK2uVyWmbl0/maxresdefault.jpg',
        date: '2024-08-28',
        duration: '18:45',
        category: 'Testimonies',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'from-amber-600 to-orange-600',
        shape: 'rounded-t-3xl rounded-b-xl'
      },
      {
        id: '6',
        title: 'Powerful Testimonies',
        description: 'Testimonies and sharing from KAAYM members',
        type: 'video',
        youtubeId: getYouTubeId('https://www.youtube.com/watch?v=3lv4lUbe16A'),
        thumbnail: 'https://img.youtube.com/vi/3lv4lUbe16A/maxresdefault.jpg',
        date: '2024-10-08',
        duration: '25:15',
        category: 'Testimonies',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'from-orange-600 to-amber-600',
        shape: 'rounded-b-3xl rounded-t-xl'
      }
    ]
  };

  const floatingImages = [
    { src: '/images/me.jpg' },
    { src: '/images/me2.jpg' },
    { src: '/images/West.jpeg' },
    { src: '/images/phio.jpg' },
    { src: '/images/papa.jpg' },
    { src: '/images/kuk.jpg' },
    { src: '/images/Kevin.jpg' },
    { src: '/images/Isreal.jpg' },
    { src: '/images/Honest.jpg' },
    { src: '/images/helen.jpg' },
    { src: '/images/brave.jpg' },
    { src: '/images/benja.jpg' },
    { src: '/images/Ankore.jpeg' }
  ];

  useEffect(() => {
    setIsLoaded(true);
    // Flatten all videos for visibility tracking
    const allVideos = [...videoCategories.worship, ...videoCategories.fellowship, ...videoCategories.testimonies];
    allVideos.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(item.id));
      }, index * 100);
    });
  }, []);

  // Continuous loop for image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % floatingImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [floatingImages.length]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: { autoplay: 0 },
  };

  return (
    <div className="bg-gray-50">
      {/* HEADER: Full-Bleed background with smart image positioning */}
      <section className="relative bg-black text-white h-[60vh] md:h-[85vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-center bg-cover z-0"
          style={{ backgroundImage: 'url(/images/land.jpg)' }}
        />
        
        <div className="absolute inset-0 w-full h-full z-10">
          {floatingImages.map((img, idx) => (
            <div
              key={idx}
              ref={el => {
                imageRefs.current[idx] = el;
              }}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 w-full h-full bg-center bg-cover"
                style={{ 
                  backgroundImage: `url(${img.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 25%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-20 pointer-events-none">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-tight">
              Media Gallery
            </h1>
            <p className="text-2xl md:text-3xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Watch our mission trips, testimonies, and worship sessions
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center gap-8">
            <button
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${
                activeTab === 'video' 
                  ? 'bg-gradient-to-r from-green-700 to-green-800 text-white scale-105' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('video')}
            >
              <Video className="w-5 h-5" />
              Videos
            </button>
            <button
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${
                activeTab === 'audio' 
                  ? 'bg-gradient-to-r from-green-700 to-green-800 text-white scale-105' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('audio')}
            >
              <Music className="w-5 h-5" />
              Audio
            </button>
          </div>
        </div>
      </section>

      {/* Media Grid with Green Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Green Background Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: 'url(/images/green.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          {/* Header for video section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Featured Videos
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
              Watch our latest fellowship sessions, worship moments, and testimonies from the KAAYM community
            </p>
            
            {/* YouTube Channel Link */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-12 border border-white/20">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Youtube className="w-10 h-10 text-red-500 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">More Content Available</h3>
              </div>
              <p className="text-gray-200 mb-6 text-lg">
                For more of our <span className="text-purple-300 font-semibold">testimonies</span>, 
                <span className="text-blue-300 font-semibold"> fellowship recordings</span>, 
                <span className="text-green-300 font-semibold"> videos</span>, and 
                <span className="text-pink-300 font-semibold"> worship songs</span>, 
                visit our YouTube channel and explore our growing collection of spiritual content.
              </p>
              <a
                href="https://www.youtube.com/@KAAYMMukChapter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl"
              >
                <Youtube className="w-6 h-6" />
                Visit Our YouTube Channel
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Video Grid - Organized by Categories */}
          <div className="max-w-7xl mx-auto">
            {!selectedVideo ? (
              <div className="space-y-16">
                {/* Worship Videos */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Worship & Praise</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {videoCategories.worship.map((item) => (
                      <VideoCard key={item.id} item={item} setSelectedVideo={setSelectedVideo} />
                    ))}
                  </div>
                </div>

                {/* Fellowship Videos */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Fellowship Moments</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoCategories.fellowship.map((item) => (
                      <VideoCard key={item.id} item={item} setSelectedVideo={setSelectedVideo} />
                    ))}
                  </div>
                </div>

                {/* Testimonies Videos */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-3 rounded-xl">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Testimonies & Sharing</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-transparent ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videoCategories.testimonies.map((item) => (
                      <VideoCard key={item.id} item={item} setSelectedVideo={setSelectedVideo} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="flex items-center gap-2 text-white hover:text-green-300 font-semibold mb-6"
                >
                  ← Back to Videos
                </button>
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <YouTube videoId={selectedVideo} opts={opts} className="w-full h-full" />
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-800/50 to-green-900/50 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Never Miss an Update
              </h3>
              <p className="text-gray-200 mb-6">
                Subscribe to our YouTube channel to get notified about new videos, live streams, and special events.
              </p>
              <a
                href="https://www.youtube.com/@KAAYMMukChapter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl"
              >
                <Youtube className="w-6 h-6" />
                Subscribe to KAAYM Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-10">
          <button 
            onClick={() => setSelectedVideo(null)}
            className="self-end text-white mb-4 hover:text-green-400 font-bold flex items-center gap-2"
          >
            ✕ Close Player
          </button>
          <div className="flex-1 w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <YouTube videoId={selectedVideo} opts={opts} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section className="relative py-20 text-white text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: 'url(/images/land.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          <Youtube className="w-16 h-16 mx-auto mb-6 text-red-600 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">Join Our Online Community</h2>
          <p className="text-gray-200 mb-10 max-w-xl mx-auto">Watch weekly sermons, worship sessions, and live mission trip highlights.</p>
          <a
            href="https://www.youtube.com/@KAAYMMukChapter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all hover:scale-105 shadow-lg"
          >
            Watch More of Our Content on YouTube
          </a>
        </div>
      </section>
    </div>
  );
}

// Separate Video Card Component
function VideoCard({ item, setSelectedVideo }: any) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:shadow-2xl ${item.shape} overflow-hidden group ${
        true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onClick={() => setSelectedVideo(item.youtubeId)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color}/20 via-transparent to-transparent`} />
        <div className="absolute top-4 left-4">
          <span className={`bg-gradient-to-r ${item.color} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
            {item.icon}
            {item.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-white text-sm px-3 py-1 rounded-lg">
            {item.duration}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`bg-gradient-to-r ${item.color} p-4 rounded-full transform group-hover:scale-110 transition-transform`}>
            <Play className="w-10 h-10 text-white fill-white" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent uppercase tracking-wider`}>
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-300">
            <Calendar className="w-4 h-4" />
            {item.date}
          </span>
        </div>
        <h3 className="font-bold text-xl text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text">
          {item.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {item.description}
        </p>
        
        <button className={`mt-4 w-full bg-gradient-to-r ${item.color}/30 hover:${item.color}/50 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]`}>
          <Play className="w-5 h-5" />
          Watch Now
        </button>
      </div>
    </div>
  );
} 
