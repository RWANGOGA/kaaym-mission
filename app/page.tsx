// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, MapPin, Calendar, BookOpen, Cross, Sparkles, Star, Zap } from 'lucide-react';
import { siteConfig } from './config/site';

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    '/images/kaaym1234.jpg',
    '/images/kaaym23.jpg',
    '/images/kaaym16.jpg',
    '/images/kaaym14.jpg',
    '/images/Kaaym13.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section with Image Slideshow Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`KAAYM Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Teal/Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-800/60 to-teal-700/70"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 text-white drop-shadow-2xl">
              Welcome to <br />
              <span className="text-amber-300 drop-shadow-2xl">{siteConfig.name}</span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-10 max-w-4xl mx-auto drop-shadow-lg">
              {siteConfig.description}
            </p>

            <p className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Spreading the <span className="font-bold text-amber-300">Gospel</span> of Jesus Christ 
              across Western Uganda and beyond — transforming lives through faith, fellowship, and mission.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/about"
                className="bg-amber-400 text-orange-900 px-10 py-5 rounded-full text-xl font-bold hover:bg-amber-300 transition shadow-2xl flex items-center justify-center gap-3"
              >
                Learn More About Us
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/events"
                className="border-4 border-amber-300 text-amber-300 px-10 py-5 rounded-full text-xl font-bold hover:bg-amber-300/20 transition backdrop-blur-sm"
              >
                Upcoming Events
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-10 text-amber-200 text-lg">
              <Link href="/locations" className="hover:text-white transition">
                Find Our Location
              </Link>
              <Link href="/ministries" className="hover:text-white transition">
                Explore Ministries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-amber-50">
        <div className="absolute inset-0">
          <img 
            src="/images/Kaaym_images2.jpg" 
            alt="Mission Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
              Our <span className="text-purple-700">Mission</span> & <span className="text-amber-700">Vision</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl border-l-8 border-purple-600 shadow-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {siteConfig.mission}
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl border-l-8 border-amber-600 shadow-lg">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {siteConfig.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Boxes fade out and back in repeatedly */}
      <section className="relative py-20 overflow-hidden">
        {/* Background image highly visible */}
        <div className="absolute inset-0">
          <img 
            src="/images/kaaym6.jpg" 
            alt="Activities Background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white drop-shadow-2xl mb-4">
              What We <span className="text-amber-300">Do</span>
            </h2>
            <p className="text-xl text-white/90 drop-shadow-lg max-w-3xl mx-auto">
              KAAYM is committed to spreading the Gospel through various ministries and outreach programs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Rectangle */}
            <div className="animate-fade-cycle-1">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-2xl text-white min-h-[280px] flex flex-col justify-center">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Mission Trips</h3>
                <p className="text-white/90 text-xs text-center">
                  Every semester, we journey to Western Uganda to spread the Gospel.
                </p>
              </div>
            </div>

            {/* Circle */}
            <div className="animate-fade-cycle-2">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-full p-6 shadow-2xl text-white aspect-square flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Fellowship</h3>
                <p className="text-white/90 text-xs text-center">
                  Prayer and worship that strengthen our faith.
                </p>
              </div>
            </div>

            {/* Triangle */}
            <div className="animate-fade-cycle-3">
              <div className="relative bg-gradient-to-br from-amber-600 to-orange-700 p-8 pb-6 shadow-2xl text-white min-h-[280px] flex flex-col justify-end" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Community Service</h3>
                <p className="text-white/90 text-xs text-center">
                  Serving communities through charity.
                </p>
              </div>
            </div>

            {/* Hexagon */}
            <div className="animate-fade-cycle-4">
              <div className="bg-gradient-to-br from-orange-600 to-amber-500 p-6 shadow-2xl text-white min-h-[280px] flex flex-col justify-center" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Bible Study</h3>
                <p className="text-white/90 text-xs text-center">
                  In-depth study of God's Word and spiritual growth.
                </p>
              </div>
            </div>

            {/* Diamond (rotated square) */}
            <div className="animate-fade-cycle-5">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 shadow-2xl text-white rotate-45 w-[280px] h-[280px] mx-auto">
                <div className="rotate-[-45deg] flex flex-col items-center justify-center h-full">
                  <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Student Programs</h3>
                  <p className="text-white/90 text-xs text-center">
                    Mentorship and leadership development.
                  </p>
                </div>
              </div>
            </div>

            {/* Oval */}
            <div className="animate-fade-cycle-6">
              <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-full p-6 shadow-2xl text-white aspect-[4/3] flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Cross className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Evangelism</h3>
                <p className="text-white/90 text-xs text-center">
                  Sharing Christ's love on campus and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous fade in/out cycle animations */}
        <style jsx>{`
          @keyframes fadeCycle {
            0% { opacity: 0; transform: translateY(30px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-30px); }
          }
          .animate-fade-cycle-1 { animation: fadeCycle 8s ease-in-out infinite; }
          .animate-fade-cycle-2 { animation: fadeCycle 8s ease-in-out 0.3s infinite; }
          .animate-fade-cycle-3 { animation: fadeCycle 8s ease-in-out 0.6s infinite; }
          .animate-fade-cycle-4 { animation: fadeCycle 8s ease-in-out 0.9s infinite; }
          .animate-fade-cycle-5 { animation: fadeCycle 8s ease-in-out 1.2s infinite; }
          .animate-fade-cycle-6 { animation: fadeCycle 8s ease-in-out 1.5s infinite; }
        `}</style>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-r from-purple-100 to-amber-100 text-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/KAAYM_images.jpg" 
            alt="Call to Action Background"
            className="w-full h-full object-cover opacity-35"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
              Join Us in Making a <span className="text-purple-700">Difference</span>
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-gray-700">
              Whether you're a student at Makerere University or a believer passionate about missions, 
              there's a place for you in KAAYM. Let's spread the <span className="text-amber-700 font-semibold">Gospel</span> together!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-purple-700 transition shadow-2xl"
              >
                Get Involved
              </Link>
              <Link
                href="/donate"
                className="bg-amber-500 text-gray-900 px-10 py-5 rounded-full text-xl font-bold hover:bg-amber-600 transition shadow-2xl"
              >
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Being Christ Together Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/kaaym34.png" 
            alt="KAAYM Activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-300 mb-4 tracking-wide">
                BEING CHRIST LIKE ... TOGETHER
              </h2>
            </div>

            {/* Three Columns */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Care Groups */}
              <div className="bg-teal-700 text-white p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-amber-300">
                  CARE GROUPS
                </h3>
                <div className="h-1 w-full bg-amber-300 mb-6"></div>
                
                <p className="text-teal-100 mb-6 leading-relaxed">
                  Seven care groups that act as small cells for teaching God's word together, 
                  building fellowship, and growing in faith as a community of believers.
                </p>

                <div className="space-y-4 text-teal-50">
                  <div>
                    <h4 className="font-bold text-lg mb-2">Care Group Get-Together</h4>
                    <p className="text-sm">
                      Once a semester, we gather as care groups to strengthen our bonds in Christ 
                      and encourage one another in faith.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">Bible Quiz</h4>
                    <p className="text-sm">
                      Engaging Bible quiz sessions once a semester to deepen our knowledge of 
                      Scripture and grow in understanding God's Word.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">Gift Sharing</h4>
                    <p className="text-sm">
                      Once a semester, we share gifts as expressions of love and fellowship, 
                      reflecting Christ's love for His church.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diocesan Departments */}
              <div className="bg-teal-600 text-white p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-amber-300">
                  DIOCESAN DEPARTMENT
                </h3>
                <div className="h-1 w-full bg-amber-300 mb-6"></div>
                
                <p className="text-teal-100 mb-6 leading-relaxed">
                  The department that unites believers from various dioceses across the region, 
                  bringing together diverse communities under one mission in Christ.
                </p>

                <div className="space-y-3 text-teal-50 mb-6">
                  <p className="font-semibold">Our Dioceses Include:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• North Ankole Diocese</li>
                    <li>• South Ankole Diocese</li>
                    <li>• West Ankole Diocese</li>
                    <li>• Ankole Diocese</li>
                    <li>• Kigezi Diocese</li>
                    <li>• North Kigezi Diocese</li>
                    <li>• Kinkizi Diocese</li>
                    <li>• North West Ankole Diocese</li>
                    <li>• And many other dioceses</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-bold text-lg mb-2">Diocesan Get-Together</h4>
                  <p className="text-sm">
                    Once a semester, each diocese gathers to share God's Word together, 
                    worship, and strengthen our diocesan fellowship in Christ.
                  </p>
                </div>
              </div>

              {/* KAAYM External Activities */}
              <div className="bg-teal-800 text-white p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-amber-300">
                  KAAYM EXTERNAL ACTIVITIES
                </h3>
                <div className="h-1 w-full bg-amber-300 mb-6"></div>
                
                <p className="text-teal-100 mb-6 leading-relaxed">
                  Reaching beyond our campus community to connect with elders, churches, 
                  and the broader body of Christ throughout the region.
                </p>

                <div className="space-y-4 text-teal-50">
                  <div>
                    <h4 className="font-bold text-lg mb-2">Visits to KAAYM Elders</h4>
                    <p className="text-sm">
                      We honor and learn from our spiritual fathers and mothers, receiving 
                      wisdom and guidance from those who have faithfully served before us.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">Church Visits</h4>
                    <p className="text-sm">
                      Regular visits to churches across the region to share testimonies, 
                      minister, and build connections with the wider Christian community.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">Community Outreach</h4>
                    <p className="text-sm">
                      Engaging with communities through service, evangelism, and sharing 
                      the transformative love of Christ beyond university walls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}