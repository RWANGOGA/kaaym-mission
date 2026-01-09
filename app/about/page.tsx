// app/about/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Cross, Heart, Users, Target, Award, MapPin, Sparkles, BookOpen, Globe, ChevronDown, Star, Send, Compass, Shield, Lightbulb, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import Link from 'next/link';

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(entry.target.getAttribute('data-section') || '0');
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Cross,
      title: 'Faith',
      titleColor: 'text-sky-600',
      color: 'from-sky-500 to-blue-600',
      description: 'Faith is the driving force behind Christian mission. It compels believers to go, serve, and proclaim the Gospel with confidence in God’s calling rather than in their own strength. As Scripture teaches, “faith is the assurance of things hoped for, the conviction of things not seen” (Hebrews 11:1). This faith enables Christians to step into unfamiliar places, overcome challenges, and remain committed to sharing Christ’s love through word and action, trusting that God is at work beyond what they can see.'
    },
    {
      icon: Heart,
      title: 'Love',
      titleColor: 'text-green-600',
      color: 'from-orange-500 to-orange-600',
      description: 'Showing Christ\'s love through service and compassion   Through mission in our home dioceses, we share the Gospel in familiar cultural and social contexts, making the message of Christ more relevant and impactful. This mission is motivated by love and obedience, as Scripture reminds us that “we love because He first loved us” (1 John 4:19). By serving at home, we become instruments of unity, encouragement, and transformation within the Church and the wider community.'
    },
    {
      icon: Users,
      title: 'Fellowship',
      titleColor: 'text-purple-600',
      color: 'from-green-700 to-green-800',
      description: ' Fellowship strengthens our faith and unity in Christ. We gather every Monday, Thursday, and Friday for prayer, Bible study, and mutual encouragement, in obedience to Scripture: “Let us consider how to stir up one another to love and good works, not neglecting to meet together” (Hebrews 10:24–25).Building strong community bonds among believers'
    },
    {
      icon: Target,
      title: 'Mission',
      titleColor: 'text-yellow-600',
      color: 'from-amber-700 to-amber-800',
      description: ' Mission is our response to Christ’s call to serve and share the Gospel. We engage in mission activities within our home dioceses, reaching out to communities through evangelism, service, and fellowship, guided by Scripture: “Go therefore and make disciples of all nations” (Matthew 28:19).Committed to spreading the Gospel to all nations'
    },
    {
      icon: Shield,
      title: 'Excellence',
      titleColor: 'text-gray-800',
      color: 'from-sky-600 to-sky-700',
      description: ' Mission is carried out with a spirit of excellence as we serve and share the Gospel in our home dioceses. We strive to honor God through disciplined service, integrity, and commitment in all mission activities, guided by Scripture: “Whatever you do, work at it with all your heart, as working for the Lord” (Colossians 3:23). Pursuing excellence in all our ministry endeavors'
    },
    {
      icon: MapPin,
      title: 'Outreach',
      titleColor: 'text-white',
      color: 'from-orange-600 to-red-600',
      description: 'Since its founding 39 years ago, KAAYM has passionately lived out the Great Commission, “Go into all the world and preach the gospel to all creation” (Mark 16:15), through dynamic outreach that includes regular services in Kampala Anglican churches, broadcasting messages of hope on Family TV, and dedicated ministry to elders, ensuring the light of Christ shines in every sphere of societyReaching out to communities with the message of hope'
    }
  ];

  const journeySteps = [
    { icon: Lightbulb, label: 'BEGINNING', desc: 'Founded with vision and passion in 1987  inspired by  Late Bishop Kivengere teaching to young Anglican christain youth at Makerere University ' },
    { icon: Users, label: 'GROWTH', desc: 'Expanding our community and our faith and salvation accross our home dioceses' },
    { icon: MapPin, label: 'MISSIONS', desc: 'Reaching Western Uganda through our home dioceses every end of the semster and some times in the middle of the semster durring holidays  above all Making  Jesus Christ Known by everyone' },
    { icon: Heart, label: 'IMPACT', desc: 'Transforming lives spiritually, reviving souls that  are always lost , restoring marriages, lost hopes , inspiring young youth in our dioceses  , grooming young christians into responsiple citizens who are discent morally upright  and above all saved ' }
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section with Background Image and Geometric Photos */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/kawempe.jpg" 
            alt="KAAYM Mission"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/85 to-amber-600/90"></div>
        </div>

        {/* Geometric Image - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden lg:block z-10">
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-[600px] -translate-x-16"
            style={{
              clipPath: 'polygon(0 0, 100% 10%, 90% 90%, 0 100%)',
              backgroundImage: 'url(/images/Kaaym12.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        {/* Geometric Image - Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block z-10">
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] translate-x-16 rounded-full overflow-hidden shadow-2xl"
            style={{
              backgroundImage: 'url(/images/KAAYM.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              Welcome to<br />
              KAAYM
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/95 mb-8 font-light drop-shadow-lg">
              Kigezi Ankore Anglican Youth Missioners
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="/contact"
                className="bg-white text-orange-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-xl"
              >
                Be part of us 
              </Link>
              <Link
                href="/ministries"
                className="bg-white text-orange-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-xl"
              >
                Fellowship with us 
              </Link>
            </div>

            {/* Location Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-full border border-white/40">
              <MapPin className="w-6 h-6 text-white" />
              <span className="text-lg text-white font-medium">St. Francis Chapel, Makerere University</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-10 h-10 text-white" />
        </div>
      </section>

      {/* Our Story Section – Now with yellow.jpg background and larger readable text */}
      <section className="py-20 relative overflow-hidden" data-section="1">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/yellow.jpg" 
            alt="KAAYM Story Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-16 ${visibleSections.has(1) ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
                Our Story
              </h2>
              <p className="text-2xl md:text-3xl text-white/95 max-w-2xl mx-auto drop-shadow-lg">
                A journey of faith, growth, and transformation
              </p>
            </div>

            {/* Journey Steps */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`${visibleSections.has(1) ? 'animate-drop-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-sky-500">
                      <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                        {step.label}
                      </h3>
                      <p className="text-gray-600 text-center text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Story Content – Larger, readable text with white semi-transparent background */}
            <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-200 ${visibleSections.has(1) ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <div className="prose prose-lg md:prose-xl max-w-none text-gray-800">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
                  ABOUT KAAYM
                </h3>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  <strong>Background:</strong> Through the mission of the late Bishop Festo Kivengere (RIP), challenging the youth to become active in their church especially the Anglican Church, a group of young and vibrant Christians during that time took it as God’s assurance for evangelism in the home dioceses.
                </p>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  Rev. Dr. Medard Birungyinyuma was a renowned evangelist and founder of World Vision Ministries. Robert Ndwahura, Turyamuhika Silvanus Boni, Gideon Batumirwa, Jonathan Besigyewe and Justus Nyagaba all who were Makerere students, came together and formed Kigezi Anglican Youth Mission (KAAYM) in 1987 and this was soon after the death of Bishop Festo Kivengere where God used them mightily in Kigezi diocese. Later in 1992, people from Ankole were also arrested in Christ and they joined Kigezi to form Kigezi Ankole Anglican Youth Mission (KAAYM).
                </p>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  Through the years, thousands have given their lives to Christ, souls conquered, families reconciled and many others through KAAYM. We carry out outreaches in schools, hospitals, prisons etc., in addition to beginning of semester, mid semester and of ancient missions. The weekly KAAYM program includes fellowship, prayer meetings, choir practice and monthly meetings.
                </p>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  What started as a small group of passionate Anglican students has grown into a thriving ministry that impacts hundreds of lives each semester. We are united by our faith, driven by our mission, and committed to making a difference in the Kingdom of God.
                </p>

                <p className="text-lg md:text-xl leading-relaxed">
                  Every end of semester, we embark on mission trips to Western Uganda – our spiritual Jerusalem. These journeys are opportunities to share the Gospel, serve communities, build relationships, and witness the power of God’s love in action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative overflow-hidden" data-section="2">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/KAAYM.jpg" 
            alt="KAAYM Mission"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-sky-900/80 to-orange-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Mission */}
              <div className={`${visibleSections.has(2) ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-transparent mb-6"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {siteConfig.mission}
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className={`${visibleSections.has(2) ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-transparent mb-6"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {siteConfig.vision}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 relative" data-section="3">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/image01.jpg" 
            alt="Core Values Background"
            className="w-full h-full object-cover brightness-125 contrast-110"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-16 ${visibleSections.has(3) ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
                Our Core Values
              </h2>
              <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow-lg">
                The principles that guide everything we do in ministry
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className={`${visibleSections.has(3) ? 'animate-drop-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-3 border-t-4 border-sky-500 group">
                      <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-black text-center mb-4 ${value.titleColor}`}>
                        {value.title}
                      </h3>
                      <p className="text-gray-700 text-center leading-relaxed text-base">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-white" data-section="4">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* First Card - New to KAAYM */}
            <div className={`mb-20 ${visibleSections.has(4) ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image Side */}
                <div className="relative order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl transform rotate-3"></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
                      <img 
                        src="/images/image.png" 
                        alt="New to KAAYM"
                        className="w-full h-[500px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="order-1 md:order-2">
                  <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    New to KAAYM? We're ready to help!
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    KAAYM is comprised of a dynamic group of believers serving together, growing 
                    together and using the gifts God has given them in myriad ways. Has God given 
                    you a passion or focus? Then, we have a place for you!
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-3 text-orange-600 font-bold text-lg hover:gap-5 transition-all group"
                  >
                    <span className="border-b-2 border-orange-600 pb-1">Get Involved in KAAYM</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Second Card */}
            <div className={`${visibleSections.has(4) ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Are you looking for a fellowship? Find what you need!
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Whether you are serving in ministry at Makerere or in a unique location around 
                    Western Uganda, the KAAYM Team of elders is here to help you with everything from training, mentoring to spiritual support.
                  </p>
                  <div className="space-y-4">
                    <Link href="/contact" className="block">
                      <div className="inline-flex items-center gap-3 text-purple-600 font-bold text-lg hover:gap-5 transition-all group">
                        <span className="border-b-2 border-purple-600 pb-1">Get Leader + Mission Support</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                    <Link href="/about" className="block">
                      <div className="inline-flex items-center gap-3 text-purple-600 font-bold text-lg hover:gap-5 transition-all group">
                        <span className="border-b-2 border-purple-600 pb-1">Connect with KAAYM Ministries</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative">
                  <div className="relative">
                    <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-teal-300 to-teal-400 rounded-full opacity-50"></div>
                    <div className="absolute top-32 -right-4 w-48 h-48 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-40"></div>
                    <div className="absolute -bottom-8 left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-50"></div>
                    <div className="absolute bottom-24 -left-4 w-24 h-24 rounded-full border-4 border-purple-500 opacity-60"></div>
                    
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 85%)' }}>
                      <img 
                        src="/images/Kaaym_images2.jpg" 
                        alt="KAAYM Leaders"
                        className="w-full h-[500px] object-cover rounded-3xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Jerusalem Section */}
      <section className="py-20 relative overflow-hidden" data-section="5">
        <div className="absolute inset-0">
          <img 
            src="/images/COMMITEE.jpg" 
            alt="KAAYM Outreach"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-amber-900/80 to-sky-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`${visibleSections.has(5) ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Western Uganda: Our Jerusalem
              </h2>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Just as the disciples were called to be witnesses in Jerusalem, Judea, 
                  Samaria, and to the ends of the earth (Acts 1:8), Western Uganda is our 
                  Jerusalem - our starting point for spreading the Gospel.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every semester, we journey to this region to serve, evangelize, and witness 
                  God's transformative power in action. It's where our faith becomes tangible 
                  and where we see lives changed by the Gospel. Know God and make Him Known!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes drop-in {
          0% { opacity: 0; transform: translateY(-50px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-drop-in { animation: drop-in 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}