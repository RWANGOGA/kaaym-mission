// app/contact/page.tsx
'use client';

import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const phone1 = "256759471542"; // 0759471542 → international format
  const phone2 = "256766295103"; // 0766295103 → international format

  const message = "I want to extend a helpful hand or support the mission";

  const waLink1 = `https://wa.me/${phone1}?text=${encodeURIComponent(message)}`;
  const waLink2 = `https://wa.me/${phone2}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image – fully visible, no dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/kaaym123.jpeg')",
        }}
      />

      {/* NO background color / dark overlay at all – image is 100% visible */}

      {/* Main Content – all text in pure white with subtle shadow only for readability */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="max-w-5xl mx-auto">

          {/* Clean, Professional Title – pure white */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight px-2"
              style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.6)' }}>
            Support Our Mission
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-10 sm:mb-14 max-w-4xl mx-auto leading-relaxed font-light px-2"
             style={{ textShadow: '1px 2px 8px rgba(0,0,0,0.6)' }}>
            Your support helps us spread the Gospel and transform lives at Makerere University and beyond.
          </p>

          <div className="space-y-6 sm:space-y-8">
            <p className="text-sm sm:text-base md:text-lg text-white font-medium px-2"
               style={{ textShadow: '1px 2px 6px rgba(0,0,0,0.6)' }}>
              Connect with us directly via WhatsApp
            </p>

            {/* WhatsApp Buttons – green with white text */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <a
                href={waLink1}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 sm:gap-3 bg-green-600 hover:bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                <span>0759 471 542</span>
              </a>

              <a
                href={waLink2}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 sm:gap-3 bg-green-600 hover:bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                <span>0766 295 103</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-white mt-6 sm:mt-8 font-normal px-2"
               style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              Click a number to start a WhatsApp conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}