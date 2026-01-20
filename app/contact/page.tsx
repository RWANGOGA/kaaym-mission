// app/contact/page.tsx
'use client';

import { MessageCircle, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const phone = "256759471542";
  const email = "ivanahumuza61@gmail.com";
  const message = "I want to extend a helpful hand or support the mission";
  const waLink = `https://wa.me{phone}?text=${encodeURIComponent(message)}`;

  // Frequently Asked Questions Data
  const faqs = [
    {
      question: "What is KAAYM's mission?",
      answer: "Our mission is to know God and make Him known, fostering spiritual growth and community among Anglican youth in the Kigezi Ankole region.",
    },
    {
      question: "What are KAAYM's main activities and ministries?",
      answer: "We are active in several areas: running weekly fellowships, broadcasting Christian ministries on TVs (especially Family Tv), organizing missions to our home dioceses in Ankore and Kigezi, and ministering around Kampala through Runyakitara services.",
    },
    {
      question: "Where is the KAAYM Makerere Chapter located?",
      answer: "The KAAYM-MUK chapter operates under St. Francis Chapel, Makerere University.",
    },
    {
      question: "When did KAAYM begin?",
      answer: "KAAYM was initially formed as Kigezi Anglican Youth Mission in 1987 by Makerere students Rev. Dr. Medard Birungyibya Yesu, Robert Ndwahura, Turyamuhika Silvanus Boni, Gideon Batumirwa, Jonathan Besigyewe, and Justus Nyagaba. Following this, people from Ankole joined in 1992, forming the Kigezi Ankole Anglican Youth Mission (KAAYM) we know today.",
    },
    {
      question: "Who can join KAAYM?",
      answer: "Membership is primarily for Anglican youth and students, especially those affiliated with Makerere University Chapel, but we welcome anyone interested in our mission and fellowships.",
    },
    {
      question: "When are the weekly fellowships?",
      answer: "Fellowships typically happen every week at St. Francis Chapel, Makerere University. Please check our weekly program section for the most current schedule.",
    },
    {
      question: "How can I support the mission?",
      answer: "We appreciate welfare in form clothings for all genders, financial help any amount to facilite our mission activities  during our missions, also  appreciate  help extended to our fellow KAAYMErs inform of any aid.",
    },
  ];

  // State to manage expanded FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/image.jpg')",
        }}
      />

      {/* Solid Red Block on the Left + Gradient Fade to Transparent on the Right */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgb(220, 38, 38) 30%, rgba(220, 38, 38, 0.9) 50%, rgba(220, 38, 38, 0) 90%)',
        }}
      />

      {/* Optional subtle pulse animation (keep if you like the effect) */}
      <div className="absolute inset-0 bg-red-600/5 animate-pulse-slow pointer-events-none"></div>

      {/* Main Content (aligned to the left like the screenshot) */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight"
            style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.5)' }}
          >
            We're here for you!
          </h1>

          {/* Contact Information */}
          <div 
            className="text-xl md:text-2xl text-white leading-relaxed"
            style={{ textShadow: '1px 2px 6px rgba(0,0,0,0.5)' }}
          >
            <p className="mb-8">
              If you would like to talk to us, please call us at{' '}
              <a 
                href={`tel:+${phone}`}
                className="font-bold hover:underline"
              >
                +{phone}
              </a>
              {' '}or send an email to{' '}
              <a 
                href={`mailto:${email}`}
                className="font-bold hover:underline"
              >
                {email}
              </a>
            </p>

            {/* WhatsApp Button */}
            <div className="mt-12">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-8 h-8" strokeWidth={2} />
                <span>Contact us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* FAQS SECTION STARTS HERE */}
          <div className="mt-24 pt-12 border-t-2 border-white/30">
            <h2 
              className="text-4xl font-bold text-white mb-8"
              style={{ textShadow: '2px 4px 6px rgba(0,0,0,0.7)' }}
            >
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
                  <button
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-xl font-semibold text-white">{faq.question}</span>
                    {openFaqIndex === index ? <Minus className="w-6 h-6 text-amber-400" /> : <Plus className="w-6 h-6 text-white/70" />}
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-6 pt-0 text-gray-200 text-lg">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* FAQS SECTION ENDS HERE */}

        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
