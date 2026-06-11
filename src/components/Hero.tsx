import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { translations } from '../utils/translations';

export const Hero: React.FC = () => {
  const { settings, language } = useAppData();
  const t = translations[language];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with elegant dark vignette overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-10000 ease-out"
        style={{ 
          backgroundImage: `url('${settings.heroBackgroundUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000'}')`,
        }}
      />
      {/* Cinematic dark mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/90" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center select-none">
        <span className={`text-xs sm:text-sm tracking-[0.5em] uppercase text-gold font-medium mb-4 block animate-fade-in ${language === 'lo' ? 'font-handwriting tracking-[0.2em]' : ''}`}>
          {t.heroSubtitle}
        </span>
        <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-wide leading-tight mb-6 ${language === 'lo' ? 'font-handwriting' : 'font-serif'}`}>
          {t.heroTitle1} <br />
          <span className="italic font-light text-gold-light">{t.heroTitle2}</span>
        </h1>
        <p className={`max-w-xl mx-auto text-sm sm:text-base font-light text-dark-text-muted tracking-widest leading-relaxed mb-10 ${language === 'lo' ? 'font-handwriting' : ''}`}>
          {t.heroDescription}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#booking"
            className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] bg-gold-gradient text-black hover:scale-105 hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 rounded"
          >
            {t.heroCtaAvailability}
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 rounded"
          >
            {t.heroCtaPortfolio}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 opacity-80 animate-bounce">
        <span className={`text-[11px] sm:text-xs tracking-[0.3em] uppercase text-dark-text-muted font-medium ${language === 'lo' ? 'font-handwriting text-lg sm:text-xl tracking-[0.1em] text-gold/90' : ''}`}>
          {t.heroScroll}
        </span>
        <ChevronDown className="h-5 w-5 text-gold" />
      </div>
    </section>
  );
};
