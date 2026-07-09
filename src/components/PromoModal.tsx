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
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link 
            to="/booking"
            onClick={onClose}
            className="flex-1 py-3.5 bg-gold-gradient text-black text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2 hover:scale-102 transition-all duration-300 shadow-lg shadow-gold/15 text-center"
          >
            <Calendar className="h-4 w-4" />
            <span>{language === 'lo' ? 'ຈອງຄິວງານ' : 'Book Shoot'}</span>
          </Link>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 py-3.5 border border-gold/30 hover:border-gold/60 bg-gold/5 hover:bg-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2 hover:scale-102 transition-all duration-300 text-center"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.288 1.488 4.625 1.489 5.425 0 9.837-4.417 9.84-9.846.002-2.628-1.01-5.1-2.852-6.945C16.417 1.99 13.95 1.018 11.96 1.018c-5.429 0-9.842 4.417-9.845 9.847-.001 1.761.472 3.197 1.402 4.673l-1.009 3.687 3.791-.994zM16.518 13.722c-.247-.125-1.47-.724-1.696-.807-.228-.083-.393-.125-.558.125-.166.249-.641.808-.785.969-.144.162-.288.181-.536.056-.248-.125-1.047-.385-1.996-1.23-.737-.656-1.235-1.465-1.38-1.714-.144-.247-.015-.382.11-.506.11-.11.247-.288.371-.432.124-.145.165-.248.248-.413.082-.166.041-.31-.02-.433-.062-.124-.558-1.344-.764-1.84-.2-.487-.402-.419-.558-.427-.144-.008-.31-.008-.475-.008-.165 0-.433.062-.66.31-.227.249-.867.847-.867 2.067 0 1.219.887 2.396.986 2.532.099.136 1.745 2.664 4.227 3.733.59.255 1.05.407 1.41.52.593.189 1.133.162 1.558.1.475-.07 1.47-.6 1.677-1.18.206-.58.206-1.077.144-1.18-.062-.102-.227-.164-.475-.289z" />
            </svg>
            <span>{language === 'lo' ? 'ຕິດຕໍ່ WhatsApp' : 'WhatsApp'}</span>
          </a>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-[10px] uppercase tracking-wider text-dark-text-muted hover:text-white transition-all underline cursor-pointer"
          >
            {language === 'lo' ? 'ປິດໜ້າຈໍ' : 'Close Window'}
          </button>
        </div>

      </div>
    </div>
  );
};
