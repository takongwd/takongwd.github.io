import React from 'react';
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
        <svg 
          className="h-6 w-6 transform group-hover:scale-110 transition-transform" 
          viewBox="0 0 16 16" 
          fill="currentColor"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.601 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
        
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
