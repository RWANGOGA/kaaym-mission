// app/about/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Cross, 
  Heart, 
  Users, 
  Target, 
  Award, 
  MapPin, 
  ChevronDown, 
  Lightbulb, 
  ArrowRight,
  Shield,
} from 'lucide-react';
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
      color: 'from-sky-500 to-blue-600',
      description: 'Faith is the driving force behind Christian mission. It compels believers to go, serve, and proclaim the Gospel with confidence in God’s calling rather than in their own strength. As Scripture teaches, “faith is the assurance of things hoped for, the conviction of things not seen” (Hebrews 11:1). This faith enables Christians to step into unfamiliar places, overcome challenges, and remain committed to sharing Christ’s love.'
    },
    {
      icon: Heart,
      title: 'Love',
      color: 'from-orange-500 to-orange-600',
      description: 'Showing Christ\'s love through service and compassion. Through mission in our home dioceses, we share the Gospel in familiar contexts, making the message of Christ more relevant and impactful. This mission is motivated by love and obedience, as Scripture reminds us that “we love because He first loved us” (1 John 4:19).'
    },
    {
      icon: Users,
      title: 'Fellowship',
      color: 'from-green-700 to-green-800',
      description: 'Fellowship strengthens our faith and unity in Christ. We gather every Monday, Thursday, and Friday for prayer, Bible study, and mutual encouragement, in obedience to Scripture: “Let us consider how to stir up one another to love and good works...” (Hebrews 10:24–25). Building strong community bonds among believers.'
    },
    {
      icon: Target,
      title: 'Mission',
      color: 'from-amber-700 to-amber-800',
      description: 'Mission is our response to Christ’s call to serve and share the Gospel. We engage in mission activities within our home dioceses, reaching out through evangelism, service, and fellowship, guided by Scripture: “Go therefore and make disciples of all nations” (Matthew 28:19).'
    },
    {
      icon: Shield,
      title: 'Excellence',
      color: 'from-sky-600 to-sky-700',
      description: 'Mission is carried out with a spirit of excellence. We strive to honor God through disciplined service, integrity, and commitment in all mission activities, guided by Scripture: “Whatever you do, work at it with all your heart, as working for the Lord” (Colossians 3:23).'
    },
    {
      icon: MapPin,
      title: 'Outreach',
      color: 'from-orange-600 to-red-600',
      description: 'Since its founding 39 years ago, KAAYM has passionately lived out the Great Commission (Mark 16:15), through dynamic outreach including regular services in Kampala Anglican churches, broadcasting on Family TV, and ministry to elders — ensuring the light of Christ shines everywhere.'
    }
  ];

  const journeySteps = [
    { 
      icon: Lightbulb, 
      label: 'BEGINNING', 
      desc: 'Founded with vision and passion in **1987** — inspired by the powerful teaching of the Late Bishop Festo Kivengere to young Anglican Christian youth at Makerere University.' 
    },
    { 
      icon: Users, 
      label: 'GROWTH', 
      desc: '**Expanding** our community, spreading faith and the message of salvation across our home dioceses with increasing impact each year.' 
    },
    { 
      icon: MapPin, 
      label: 'MISSIONS', 
      desc: 'Reaching **Western Uganda** every end of semester (and sometimes mid-semester during holidays) — above all, making Jesus Christ known to everyone.' 
    },
    { 
      icon: Heart, 
      label: 'IMPACT', 
      desc: 'Transforming lives spiritually, **reviving lost souls**, restoring marriages, renewing hope, inspiring youth, grooming responsible morally upright citizens — and above all, leading people to salvation.' 
    }
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
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

        {/* Left Geometric Image - Slightly smaller, balanced medium size */}
        <div className="absolute left-0 top-0 bottom-0 w-5/12 sm:w-5/12 lg:w-5/24 z-10 pointer-events-none">
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-48 sm:w-60 lg:w-80 h-64 sm:h-80 lg:h-96 -translate-x-8 sm:-translate-x-12 lg:-translate-x-16"
            style={{
              clipPath: 'polygon(0 0, 100% 10%, 90% 90%, 0 100%)',
              backgroundImage: 'url(/images/Kaaym12.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        {/* Right Geometric Image - Slightly smaller, balanced medium size */}
        <div className="absolute right-0 top-0 bottom-0 w-5/12 sm:w-5/12 lg:w-5/24 z-10 pointer-events-none hidden sm:block">
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-48 sm:w-60 lg:w-80 h-48 sm:h-64 lg:h-80 translate-x-8 sm:translate-x-12 lg:translate-x-16 rounded-full overflow-hidden shadow-2xl"
            style={{
              backgroundImage: 'url(/images/KAAYM.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              Welcome to<br />
              KAAYM
            </h1>

            <p className="text-2xl md:text-3xl text-white/95 mb-8 font-light drop-shadow-lg">
              Kigezi Ankore Anglican Youth Missioners
            </p>

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

            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-full border border-white/40">
              <MapPin className="w-6 h-6 text-white" />
              <span className="text-lg text-white font-medium">St. Francis Chapel, Makerere University</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-10 h-10 text-white" />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 relative overflow-hidden" data-section="1">
        <div className="absolute inset-0">
          <img src="/images/yellow.jpg" alt="KAAYM Story" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 ${visibleSections.has(1) ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">Our Story</h2>
              <p className="text-2xl md:text-3xl text-white/95 max-w-2xl mx-auto drop-shadow-lg">
                A journey of faith, growth, and transformation
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
              {journeySteps.map((step, index) => {
                const IconComponent = step.icon;
                const colors = [
                  'from-amber-600 to-orange-700',
                  'from-sky-600 to-blue-700',
                  'from-violet-600 to-purple-700',
                  'from-emerald-600 to-teal-700'
                ];
                
                return (
                  <div
                    key={index}
                    className={`group relative ${visibleSections.has(1) ? 'animate-drop-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative bg-white/96 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colors[index]}`} />
                      
                      <div className={`w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-extrabold text-center mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {step.label}
                      </h3>
                      
                      <p className="text-gray-800 text-center text-base sm:text-lg leading-7 font-medium tracking-wide">
                        {step.desc.split('**').map((part, i) => 
                          i % 2 === 0 ? part : (
                            <span key={i} className={`font-bold bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent`}>
                              {part}
                            </span>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-200 ${visibleSections.has(1) ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <div className="prose prose-lg md:prose-xl max-w-none text-gray-800">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
                  ABOUT KAAYM
                </h3>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  <strong>Background:</strong> Through the mission of the late Bishop Festo Kivengere (RIP), challenging the youth to become active in their church especially the Anglican Church, a group of young and vibrant Christians during that time took it as God’s assurance for evangelism in the home dioceses.
                </p>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  Rev. Dr. Medard BirungyibyaYesu was a renowned evangelist and founder of World Shine Ministries. Robert Ndwahura, Turyamuhika Silvanus Boni, Gideon Batumirwa, Jonathan Besigyewe and Justus Nyagaba all who were Makerere students, came together and formed Kigezi Anglican Youth Mission (KAAYM) in 1987 and this was soon after the death of Bishop Festo Kivengere where God used them mightily in Kigezi diocese. Later in 1992, people from Ankole were also compleded in Christ and they joined Kigezi to form Kigezi Ankole Anglican Youth Mission (KAAYM).
                </p>

                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  Through the years, thousands have given their lives to Christ, souls conquered, families reconciled and many others through KAAYM. We carry out outreaches in schools, hospitals, prisons etc., in addition to beginning of semester, mid semester and of end semseter missions. The weekly KAAYM program includes fellowship, prayer meetings, choir practice and elders visits and  services in Kawempe.
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
            <div className={`text-center mb-16 ${visibleSections.has(3) ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
                Our Core Values
              </h2>
              <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow-lg">
                The principles that guide everything we do in ministry
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className={`group relative ${visibleSections.has(3) ? 'animate-drop-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative bg-white/92 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
                      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${value.color} rounded-t-2xl`} />
                      
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className={`text-2xl md:text-3xl font-extrabold text-center mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-800 text-center leading-relaxed text-base sm:text-lg">
                        {value.description.split(/["“]([^"”]+)["”]/).map((part, i) => 
                          i % 2 === 1 ? (
                            <span key={i} className="font-semibold text-orange-700">
                              {part}
                            </span>
                          ) : part
                        )}
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
            <div className={`mb-20 ${visibleSections.has(4) ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
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

            <div className={`${visibleSections.has(4) ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
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