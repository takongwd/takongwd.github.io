import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { Check, Flame, Percent } from 'lucide-react';
import { translations } from '../utils/translations';

export const Pricing: React.FC = () => {
  const { pricingPackages, settings, language } = useAppData();
  const t = translations[language];

  const [activeCategory, setActiveCategory] = useState<'main' | 'addon'>('main');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Reset index when changing category
  React.useEffect(() => {
    setActiveIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector('.snap-center')?.getBoundingClientRect().width || 300;
    const gap = 24; // gap-6
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(index);
  };

  const getOriginalPrice = (priceStr: string): string => {
    const digits = priceStr.replace(/[^0-9]/g, '');
    if (!digits) return '';
    const num = parseInt(digits, 10);
    const originalNum = Math.round(num * 1.3);
    const formatted = originalNum.toLocaleString('en-US');
    if (priceStr.toUpperCase().includes('THB')) {
      return `${formatted} THB`;
    } else if (priceStr.includes('$')) {
      return `$${formatted}`;
    } else {
      const suffix = priceStr.replace(/[0-9,\s]/g, '');
      return `${formatted} ${suffix}`.trim();
    }
  };

  const mainPackages = pricingPackages.filter(pkg => (pkg.category || 'main') === 'main');
  const addonPackages = pricingPackages.filter(pkg => pkg.category === 'addon');
  const currentPackages = activeCategory === 'main' ? mainPackages : addonPackages;

  return (
    <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-[#0d0d0f] to-[#050505] border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-medium block mb-3">
            {t.pricingSubtitle}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide">
            {t.pricingTitle}
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 px-4">
          <button
            onClick={() => setActiveCategory('main')}
            className={`px-3.5 py-3 sm:px-6 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest rounded transition-all duration-300 cursor-pointer w-[48%] sm:w-auto text-center shrink-0 ${
              activeCategory === 'main'
                ? 'bg-gold text-black shadow-lg shadow-gold/15 font-bold'
                : 'border border-white/10 hover:border-gold hover:text-gold text-dark-text-muted bg-transparent'
            }`}
          >
            {language === 'lo' ? 'ແພັກເກດຖ່າຍຮູບຫຼັກ' : 'Wedding Packages'}
          </button>
          <button
            onClick={() => setActiveCategory('addon')}
            className={`px-3.5 py-3 sm:px-6 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest rounded transition-all duration-300 cursor-pointer w-[48%] sm:w-auto text-center shrink-0 ${
              activeCategory === 'addon'
                ? 'bg-gold text-black shadow-lg shadow-gold/15 font-bold'
                : 'border border-white/10 hover:border-gold hover:text-gold text-dark-text-muted bg-transparent'
            }`}
          >
            {language === 'lo' ? 'ບໍລິການ Photo Booth ເສີມ' : 'Photo Booth Add-ons'}
          </button>
        </div>

        {/* Promotion Banner - Only shown for main packages */}
        {activeCategory === 'main' && settings.promotionText && (
          <div className="max-w-3xl mx-auto mb-10 animate-fade-in">
            <div className="relative py-4 px-5 sm:py-5 sm:px-8 rounded-lg bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border border-gold/20 flex flex-row items-center gap-4 sm:gap-5 overflow-hidden">
              <div className="absolute top-0 right-0 py-0.5 px-2 bg-gold text-black text-[8px] uppercase tracking-widest font-bold rotate-12 translate-x-4 translate-y-1 scale-90">
                Special Offer
              </div>
              <div className="p-2 sm:p-2.5 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center shrink-0">
                <Percent className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base text-white font-medium mb-0.5 tracking-wider">
                  {t.pricingPromoHeader}
                </h4>
                <p className="text-[11px] text-dark-text-muted leading-relaxed">
                  {settings.promotionText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Photo Booth Intro Text */}
        {activeCategory === 'addon' && (
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <p className="text-sm font-light leading-relaxed text-dark-text-muted">
              {language === 'lo' 
                ? 'ບໍລິການຕູ້ຖ່າຍຮູບ Photo Booth ສໍາລັບແຂກຮ່ວມງານ ພ້ອມລະບົບສະແກນ QR Code ເພື່ອຮັບໄຟລ໌ຮູບໄດ້ທັນທີໃນງານ! (ລວມກອບຮູບອອກແບບພິເສດ)'
                : 'Premium Photo Booth service for event guests, featuring instant QR Code scanning to download high-quality digital files directly during your celebration! (Includes custom border designs)'}
            </p>
          </div>
        )}

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-center gap-1.5 text-[10px] text-gold/75 tracking-wider mb-4 animate-pulse">
          <span>{language === 'lo' ? 'ເລື່ອນຊ້າຍ-ຂວາ ເພື່ອເບິ່ງແພັກເກດທັງໝົດ' : 'Swipe left/right to view all packages'}</span>
          <span className="text-xs">➔</span>
        </div>

        {/* Packages Cards Grid / Slider */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-6 md:gap-8 items-stretch justify-start md:justify-center pb-8 md:pb-0 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-3"
        >
          {currentPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-lg glass-effect glass-effect-hover border transition-all duration-300 w-[85vw] sm:w-[380px] md:w-auto shrink-0 md:shrink snap-center ${
                pkg.isPopular
                  ? 'border-gold/45 shadow-lg shadow-gold/5 scale-102 lg:scale-105 z-10 bg-gradient-to-b from-[#161619]/90 to-[#0d0d0f]/90'
                  : 'border-dark-border'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gold text-black text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center space-x-1.5 shadow-lg shadow-gold/25">
                  <Flame className="h-3 w-3 fill-black" />
                  <span>{t.pricingPopular}</span>
                </div>
              )}

              <div>
                {/* Package Name */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-2 tracking-wide">
                  {pkg.name}
                </h3>
                {/* Description */}
                <p className="text-[11px] text-dark-text-muted font-light min-h-[34px] leading-normal mb-4">
                  {pkg.description}
                </p>
                {/* Price */}
                <div className="mb-5 flex flex-col justify-end">
                  {getOriginalPrice(pkg.price) && (
                    <span className="text-xs sm:text-sm text-white/30 line-through font-serif tracking-wide mb-1 font-light">
                      {getOriginalPrice(pkg.price)}
                    </span>
                  )}
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-serif text-gold font-normal tracking-wide">
                      {pkg.price}
                    </span>
                    <span className="text-dark-text-muted text-[10px] uppercase tracking-widest ml-2 font-medium">
                      {t.pricingInvestment}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="w-full h-[1px] bg-dark-border mb-4" />
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-white/80 font-light leading-normal">
                      <Check className="h-4 w-4 text-gold shrink-0 mr-3 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                to={`/booking?package=${pkg.id}`}
                className={`w-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 ${
                  pkg.isPopular
                    ? 'bg-gold-gradient text-black hover:scale-102 shadow-lg shadow-gold/15'
                    : 'border border-white/10 hover:border-gold hover:text-gold text-white bg-transparent hover:bg-gold/5'
                }`}
              >
                {t.pricingCta}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
          {currentPackages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (containerRef.current) {
                  const container = containerRef.current;
                  const cardWidth = container.querySelector('.snap-center')?.getBoundingClientRect().width || 300;
                  const gap = 24; // gap-6
                  container.scrollTo({
                    left: idx * (cardWidth + gap),
                    behavior: 'smooth'
                  });
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-4 bg-gold shadow-sm shadow-gold/30'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to package ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
