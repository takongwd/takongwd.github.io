import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { BookingModal } from '../components/BookingModal';
import { FloatingContact } from '../components/FloatingContact';
import { Camera, MapPin, Mail, Phone, ChevronDown } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useTransparentLogo } from '../hooks/useTransparentLogo';
import { translations } from '../utils/translations';

export const BookingPage: React.FC = () => {
  const { settings, language } = useAppData();
  const t = translations[language];
  const logoUrl = useTransparentLogo('/logo_raw.png', 197, 168, 128);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollToForm = () => {
    const formElement = document.getElementById('booking');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cleanPhone = settings.whatsappNumber.replace(/[+\s-]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    language === 'lo' 
      ? 'ສະບາຍດີ! ຂ້ອຍສົນໃຈຈອງວັນຖ່າຍຮູບ.' 
      : "Hello! I'm interested in booking a wedding photography session."
  )}`;

  return (
    <div className="min-h-screen bg-dark-bg text-[#f5f5f7] flex flex-col">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Booking Page Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Background image with vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url('${settings.heroBackgroundUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000'}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/95" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center select-none">
          <span className={`text-xs sm:text-sm tracking-[0.4em] uppercase text-gold font-medium mb-3 block animate-fade-in ${language === 'lo' ? 'font-handwriting tracking-[0.2em]' : ''}`}>
            {language === 'lo' ? 'ຈອງວັນຖ່າຍຮູບຂອງທ່ານ' : 'RESERVE YOUR SHOOTING DATE'}
          </span>
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-wide leading-tight mb-6 animate-fade-in ${language === 'lo' ? 'font-handwriting' : 'font-serif'}`}>
            {language === 'lo' ? 'ຈອງວັນຖ່າຍຮູບ ແລະ ກວດເບິ່ງວັນຫວ່າງ' : 'Book a Shoot & Check Dates'}
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-light text-dark-text-muted tracking-widest leading-relaxed mb-8">
            {language === 'lo' 
              ? 'ກວດເບິ່ງວັນຫວ່າງຂອງສະຕູດີໂອຜ່ານປະຕິທິນ ແລະ ປ້ອນຂໍ້ມູນຕິດຕໍ່ເພື່ອຈອງວັນຖ່າຍຮູບຂອງທ່ານໄດ້ທັນທີ.'
              : 'Check our live availability calendar below and fill out your reservation details to secure your shoot date.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <button
              onClick={handleScrollToForm}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] bg-gold-gradient text-black hover:scale-105 hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 rounded cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>{language === 'lo' ? 'ເລື່ອນລົງເພື່ອຈອງວັນ' : 'Scroll to Calendar'}</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
              {/* WhatsApp Icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 bg-[#121215] border border-gold/30 hover:border-gold rounded-full text-gold hover:text-black hover:bg-gold-gradient shadow-lg transition-all duration-300 cursor-pointer"
                aria-label="Contact on WhatsApp"
              >
                <svg 
                  className="h-5 w-5 transform group-hover:scale-110 transition-transform" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.601 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                <span className="absolute bottom-14 scale-0 group-hover:scale-100 origin-bottom transition-all duration-200 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gold bg-[#0d0d0f] border border-gold/20 rounded shadow-lg whitespace-nowrap z-50">
                  WhatsApp
                </span>
              </a>

              {/* Facebook Icon */}
              <a
                href={settings.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 bg-[#121215] border border-gold/30 hover:border-gold rounded-full text-gold hover:text-black hover:bg-gold-gradient shadow-lg transition-all duration-300 cursor-pointer"
                aria-label="Visit Facebook Page"
              >
                <svg 
                  className="h-5 w-5 transform group-hover:scale-110 transition-transform" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="absolute bottom-14 scale-0 group-hover:scale-100 origin-bottom transition-all duration-200 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gold bg-[#0d0d0f] border border-gold/20 rounded shadow-lg whitespace-nowrap z-50">
                  Facebook Page
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Form (ID represents 'booking' which smooth scrolls here) */}
      <main className="flex-grow">
        <BookingModal />
      </main>

      {/* Floating Buttons */}
      <FloatingContact />

      {/* Luxury Footer */}
      <footer className="bg-black border-t border-dark-border py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Brand Column */}
          <div className="space-y-4">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Takong Photography Logo" 
                className="h-14 w-auto object-contain brightness-110 mb-4" 
              />
            ) : (
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded bg-dark-card border border-gold/20">
                  <Camera className="h-5 w-5 text-gold" />
                </div>
                <span className="font-serif text-lg tracking-[0.2em] font-medium text-white">
                  TAKONG
                </span>
              </div>
            )}
            <p className="text-xs text-dark-text-muted leading-relaxed font-light">
              {t.footerDesc}
            </p>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-gold font-semibold">
              Contact & Studio
            </h4>
            <ul className="space-y-3 text-xs text-dark-text-muted font-light">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <span>{settings.whatsappNumber}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <span>info@takongweddinglaos.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Ban Phonsinuan, Sisattanak District, Vientiane, Laos</span>
              </li>
            </ul>
          </div>

          {/* Quick Info / Studio Hours Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-gold font-semibold">
              {t.footerHoursTitle}
            </h4>
            <ul className="space-y-2 text-xs text-dark-text-muted font-light">
              <li className="flex justify-between border-b border-dark-border/40 pb-2">
                <span>{t.footerHoursWeekdays}</span>
                <span className="text-white">09:00 AM - 06:00 PM</span>
              </li>
              <li className="flex justify-between flex-col sm:flex-row gap-1">
                <span>{t.footerHoursWeekends}</span>
                <span className="text-gold-light font-medium">{t.footerHoursAppointment}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-dark-border/40 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-widest uppercase text-dark-text-muted">
          <span>&copy; {new Date().getFullYear()} Takong Wedding Laos. {t.footerCopyright}</span>
          <span className="mt-2 sm:mt-0 font-medium">Fine Art Wedding Photography</span>
        </div>
      </footer>
    </div>
  );
};
