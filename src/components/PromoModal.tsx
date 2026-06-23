import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { X, Sparkles, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromoModalProps {
  onClose: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ onClose }) => {
  const { settings, language } = useAppData();

  // Close when clicking overlay backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative bg-dark-card border border-gold/30 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl shadow-gold/10 p-6 sm:p-8 animate-scale-up">
        {/* Close Button X */}
        <button
          onClick={onClose}
          className="absolute top-4.5 right-4.5 p-1.5 border border-white/10 hover:border-gold/30 rounded text-dark-text-muted hover:text-white transition-all cursor-pointer z-10"
          aria-label="Close promotion popup"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />

        {/* Header */}
        <div className="text-center pb-4 mb-6 border-b border-dark-border/40">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] text-gold uppercase tracking-[0.2em] font-semibold mb-2">
            <Sparkles className="h-3 w-3" /> {language === 'lo' ? 'ໂປຣໂມຊັ່ນພິເສດ' : 'Special Offer'}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-wide leading-snug">
            {settings.promoPopupTitle}
          </h3>
        </div>

        {/* Offers Container */}
        <div className="space-y-4">
          
          {/* Package 1 */}
          <div className="p-4 rounded-lg bg-black/40 border border-dark-border hover:border-gold/15 transition-all">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                {settings.promoPopupPkg1Name}
              </h4>
              <div className="text-right shrink-0">
                <span className="block text-[10px] text-white/30 line-through tracking-wide leading-none mb-1">
                  {settings.promoPopupPkg1OrigPrice}
                </span>
                <span className="block text-sm sm:text-base font-serif font-semibold text-gold leading-none">
                  {settings.promoPopupPkg1Price}
                </span>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-dark-text-muted font-light leading-relaxed">
              {settings.promoPopupPkg1Desc}
            </p>
          </div>

          {/* Package 2 */}
          <div className="p-4 rounded-lg bg-gold/5 border border-gold/20 hover:border-gold/30 transition-all relative overflow-hidden">
            {/* Tag label */}
            <div className="absolute top-0 right-0 bg-gold text-black text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-bl">
              {language === 'lo' ? 'ຍອດນິຍົມ' : 'Popular'}
            </div>
            
            <div className="flex justify-between items-start gap-2 mb-2">
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                {settings.promoPopupPkg2Name}
              </h4>
              <div className="text-right shrink-0">
                <span className="block text-[10px] text-white/30 line-through tracking-wide leading-none mb-1">
                  {settings.promoPopupPkg2OrigPrice}
                </span>
                <span className="block text-sm sm:text-base font-serif font-semibold text-gold leading-none">
                  {settings.promoPopupPkg2Price}
                </span>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-dark-text-muted font-light leading-relaxed">
              {settings.promoPopupPkg2Desc}
            </p>
          </div>

        </div>

        {/* CTA Actions */}
        <div className="mt-8 space-y-3">
          <Link 
            to="/booking"
            onClick={onClose}
            className="w-full bg-gold-gradient text-black font-semibold text-xs sm:text-sm py-4 rounded-lg hover:scale-102 transition-all uppercase tracking-widest text-center shadow-lg shadow-gold/20 cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="h-4 w-4 shrink-0" />
            {language === 'lo' ? 'ຈອງຄິວງານຕອນນີ້' : 'Book Session Now'}
          </Link>
          
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-transparent text-dark-text-muted hover:text-white text-[10px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer text-center"
          >
            {language === 'lo' ? 'ປິດໜ້າຕ່າງນີ້' : 'Close this Window'}
          </button>
        </div>

      </div>
    </div>
  );
};
