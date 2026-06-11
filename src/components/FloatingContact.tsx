import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export const FloatingContact: React.FC = () => {
  const { settings } = useAppData();

  // Format whatsapp link
  // The phone number might have + or spaces, clean it up for the URL
  const cleanPhone = settings.whatsappNumber.replace(/[+\s-]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello!%20I'm%20interested%20in%20booking%20a%20wedding%20photography%20session.`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#121215] border border-gold/30 hover:border-gold rounded-full text-gold hover:text-black hover:bg-gold-gradient shadow-2xl transition-all duration-300 cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
        
        {/* Hover label */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 origin-right transition-all duration-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold bg-[#0d0d0f] border border-gold/20 rounded shadow-lg whitespace-nowrap">
          WhatsApp Chat
        </span>
      </a>

      {/* Facebook Button - Native SVG to ensure robust rendering */}
      <a
        href={settings.facebookPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#121215] border border-gold/30 hover:border-gold rounded-full text-gold hover:text-black hover:bg-gold-gradient shadow-2xl transition-all duration-300 cursor-pointer"
        aria-label="Visit Facebook Page"
      >
        <svg 
          className="h-6 w-6 transform group-hover:scale-110 transition-transform" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
        
        {/* Hover label */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 origin-right transition-all duration-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold bg-[#0d0d0f] border border-gold/20 rounded shadow-lg whitespace-nowrap">
          Facebook Page
        </span>
      </a>
    </div>
  );
};
