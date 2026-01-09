// app/contact/page.tsx
'use client';

import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const phone = "256759471542";
  const email = "ivanahumuza61@gmail.com";

  const message = "I want to extend a helpful hand or support the mission";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/image.jpg')", // Replace with your edited black-and-white/red-tinted call center image
        }}
      />

      {/* Solid Red Block on the Left + Gradient Fade to Transparent on the Right */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgb(220, 38, 38) 30%, rgba(220, 38, 38, 0.9) 50%, rgba(220, 38, 38, 0) 90%)',
        }}
      />

      {/* Optional subtle pulse animation on the overlay (remove if you don't want any pulsing) */}
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