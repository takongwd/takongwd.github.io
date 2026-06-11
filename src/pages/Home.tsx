import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { MasonryGrid } from '../components/MasonryGrid';
import { Pricing } from '../components/Pricing';
import { BookingModal } from '../components/BookingModal';
import { FloatingContact } from '../components/FloatingContact';
import { Camera, MapPin, Mail, Phone } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useTransparentLogo } from '../hooks/useTransparentLogo';
import { translations } from '../utils/translations';

export const Home: React.FC = () => {
  const { settings, language } = useAppData();
  const t = translations[language];
  
  // Custom transparent logo: color matches our luxury gold (#c5a880)
  const logoUrl = useTransparentLogo('/logo_raw.png', 197, 168, 128);

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-[#f5f5f7] flex flex-col">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow pt-24">
        <Hero />
        <MasonryGrid />
        <Pricing />
        <BookingModal />
      </main>

      {/* Floating Action Buttons */}
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
