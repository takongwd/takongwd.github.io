import React from 'react';
import { Camera, ShieldCheck, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { useTransparentLogo } from '../hooks/useTransparentLogo';
import { translations } from '../utils/translations';

interface NavbarProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdmin = false, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Custom context values
  const { language, setLanguage } = useAppData();
  const t = translations[language];

  // Custom transparent logo: color matches our luxury gold (#c5a880)
  const logoUrl = useTransparentLogo('/logo_raw.png', 197, 168, 128);

  const navLinks = [
    { label: t.navPortfolio, to: '/', hash: '#portfolio' },
    { label: t.navPackages, to: '/', hash: '#pricing' },
    { label: t.navCheckDates, to: '/booking', hash: '' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Takong Photography Logo" 
                className="h-16 sm:h-20 w-auto object-contain brightness-110 group-hover:scale-102 transition-transform duration-300"
              />
            ) : (
              <>
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-dark-card to-black border border-gold/20 group-hover:border-gold/50 transition-all duration-300">
                  <Camera className="h-6 w-6 text-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-[0.2em] font-medium text-white group-hover:text-gold transition-colors duration-300">
                    TAKONG
                  </span>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-light">
                    Wedding Photography
                  </span>
                </div>
              </>
            )}
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              if (link.hash) {
                return (
                  <a
                    key={link.label}
                    href={isHome ? link.hash : `${link.to}${link.hash}`}
                    className="text-xs tracking-widest uppercase text-dark-text-muted hover:text-white transition-colors duration-300 font-medium"
                  >
                    {link.label}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`text-xs tracking-widest uppercase transition-colors duration-300 font-medium ${
                      location.pathname === link.to ? 'text-gold font-semibold' : 'text-dark-text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
            
            {isAdmin ? (
              <button
                onClick={onLogout}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all duration-300 cursor-pointer"
              >
                {t.navLogout}
              </button>
            ) : (
              <Link
                to={location.pathname.startsWith('/admin') ? '/' : '/admin'}
                className="flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest border border-gold/30 hover:border-gold bg-gold/5 text-gold hover:bg-gold hover:text-black rounded transition-all duration-300 cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{location.pathname.startsWith('/admin') ? t.navViewSite : t.navAdminPanel}</span>
              </Link>
            )}

            {/* Language Toggle (Desktop) */}
            <div className="flex items-center space-x-2.5 border-l border-dark-border pl-6 h-5">
              <button
                onClick={() => setLanguage('en')}
                className={`text-[10px] tracking-widest font-bold transition-colors cursor-pointer ${
                  language === 'en' ? 'text-gold' : 'text-dark-text-muted hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-[10px] text-dark-text-muted font-light">/</span>
              <button
                onClick={() => setLanguage('lo')}
                className={`text-[10px] tracking-widest font-bold transition-colors cursor-pointer ${
                  language === 'lo' ? 'text-gold' : 'text-dark-text-muted hover:text-white'
                }`}
              >
                LO
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-dark-text-muted hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-effect border-t border-dark-border py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              if (link.hash) {
                return (
                  <a
                    key={link.label}
                    href={isHome ? link.hash : `${link.to}${link.hash}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm tracking-wider uppercase text-dark-text-muted hover:text-white py-2"
                  >
                    {link.label}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm tracking-wider uppercase py-2 transition-colors ${
                      location.pathname === link.to ? 'text-gold font-semibold' : 'text-dark-text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
            
            {isAdmin ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout?.();
                }}
                className="w-full text-center py-3 text-sm font-semibold uppercase border border-red-500/30 bg-red-950/20 text-red-400 rounded"
              >
                {t.navLogout}
              </button>
            ) : (
              <Link
                to={location.pathname.startsWith('/admin') ? '/' : '/admin'}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3 text-sm font-semibold uppercase border border-gold/30 bg-gold/5 text-gold rounded"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{location.pathname.startsWith('/admin') ? t.navViewSite : t.navAdminPanel}</span>
              </Link>
            )}

            {/* Mobile Language Toggle */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-dark-border/40">
              <button
                onClick={() => {
                  setLanguage('en');
                  setIsOpen(false);
                }}
                className={`text-xs tracking-widest font-bold py-1.5 px-3 rounded transition-colors ${
                  language === 'en' ? 'bg-gold text-black' : 'text-dark-text-muted hover:text-white bg-white/5'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => {
                  setLanguage('lo');
                  setIsOpen(false);
                }}
                className={`text-xs tracking-widest font-bold py-1.5 px-3 rounded transition-colors ${
                  language === 'lo' ? 'bg-gold text-black' : 'text-dark-text-muted hover:text-white bg-white/5'
                }`}
              >
                ພາສາລາວ (PETSALART)
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
