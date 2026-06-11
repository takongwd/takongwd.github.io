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
            {language === 'lo' ? 'ຈອງຄິວງານຖ່າຍຮູບຂອງທ່ານ' : 'RESERVE YOUR SHOOTING DATE'}
          </span>
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-wide leading-tight mb-6 animate-fade-in ${language === 'lo' ? 'font-handwriting' : 'font-serif'}`}>
            {language === 'lo' ? 'ຈອງຄິວ ແລະ ກວດເບິ່ງວັນຫວ່າງ' : 'Book a Shoot & Check Dates'}
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-light text-dark-text-muted tracking-widest leading-relaxed mb-8">
            {language === 'lo' 
              ? 'ກວດເບິ່ງວັນຫວ່າງຂອງສະຕູດີໂອຜ່ານປະຕິທິນ ແລະ ປ້ອນຂໍ້ມູນຕິດຕໍ່ເພື່ອຈອງຄິວງານຖ່າຍຮູບຂອງທ່ານໄດ້ທັນທີ.'
              : 'Check our live availability calendar below and fill out your reservation details to secure your shoot date.'}
          </p>

          <button
            onClick={handleScrollToForm}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] bg-gold-gradient text-black hover:scale-105 hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 rounded cursor-pointer"
          >
            <span>{language === 'lo' ? 'ເລື່ອນລົງເພື່ອຈອງວັນ' : 'Scroll to Calendar'}</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
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
