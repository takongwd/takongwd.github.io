import React, { useState, useMemo } from 'react';
import { useAppData } from '../context/AppDataContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { translations } from '../utils/translations';

export const MasonryGrid: React.FC = () => {
  const { albums, photos, language } = useAppData();
  const t = translations[language];
  
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(30);

  // Reset pagination on album switch
  const handleSelectAlbum = (id: string) => {
    setSelectedAlbumId(id);
    setVisibleCount(30);
  };

  // Stable shuffle for 'All' tab to mix photos from different albums
  const shuffledAllPhotos = useMemo(() => {
    const arr = [...photos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [photos]);

  // Filter photos based on album selection
  const filteredPhotos = selectedAlbumId === 'all'
    ? shuffledAllPhotos.slice(0, visibleCount)
    : photos.filter(p => p.albumId === selectedAlbumId);

  const activeAlbum = albums.find(a => a.id === selectedAlbumId);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#050505] to-[#0d0d0f] border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <span className="hidden sm:block text-xs uppercase tracking-[0.4em] text-gold font-medium mb-3">
            {t.portfolioSubtitle}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
            {t.portfolioTitle}
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-3 md:mt-6" />
        </div>

        {/* Mobile Album Selector Dropdown (Clean, luxury styled select) */}
        <div className="block md:hidden px-2 mb-8 animate-fade-in">
          <select
            value={selectedAlbumId}
            onChange={(e) => handleSelectAlbum(e.target.value)}
            className="w-full bg-[#0d0d0f] border border-gold/30 hover:border-gold focus:border-gold focus:outline-none rounded px-4 py-3.5 text-xs tracking-wider transition-all text-white font-medium text-center"
          >
            <option value="all" className="bg-[#0d0d0f] text-left">{t.portfolioSelectOption}</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id} className="bg-[#0d0d0f] text-left">
                {album.title}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Album Selector Tabs */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mb-10 pb-3 scroll-smooth">
          <button
            onClick={() => handleSelectAlbum('all')}
            className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest rounded transition-all duration-300 shrink-0 ${
              selectedAlbumId === 'all'
                ? 'bg-gold text-black shadow-lg shadow-gold/15'
                : 'border border-white/10 hover:border-gold hover:text-gold text-dark-text-muted bg-transparent'
            }`}
          >
            {t.portfolioAllWork}
          </button>
          
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => handleSelectAlbum(album.id)}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest rounded transition-all duration-300 shrink-0 ${
                selectedAlbumId === album.id
                  ? 'bg-gold text-black shadow-lg shadow-gold/15'
                  : 'border border-white/10 hover:border-gold hover:text-gold text-dark-text-muted bg-transparent'
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>

        {/* Active Album Description */}
        {activeAlbum && (
          <div className="max-w-2xl mx-auto text-center mb-12 animate-fade-in">
            <p className={`font-light leading-relaxed text-dark-text-muted ${
              language === 'lo' ? 'font-handwriting text-lg md:text-xl' : 'text-sm md:text-base italic'
            }`}>
              "{activeAlbum.description}"
            </p>
          </div>
        )}

        {/* Photos Grid - Left-to-right Grid Layout */}
        {filteredPhotos.length > 0 ? (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 items-start">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className="relative overflow-hidden rounded group border border-white/5 bg-[#121215] cursor-pointer photo-shimmer shadow-lg hover:shadow-black/70 transition-all duration-300"
                >
                  <img
                    src={photo.url}
                    alt="Wedding celebration"
                    loading="lazy"
                    className="w-full h-auto block group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none select-none protect-image"
                  />
                  
                  {/* Transparent protective shield overlay */}
                  <div className="absolute inset-0 z-10 protect-image" />
                  
                  {/* Overlay hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 z-20 protect-image">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-gold/85 font-semibold block">
                        {albums.find(a => a.id === photo.albumId)?.title || 'Wedding Portfolio'}
                      </span>
                      <h4 className="font-serif text-base text-white font-light mt-1">
                        {t.portfolioViewCaptures}
                      </h4>
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/10 text-white">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {selectedAlbumId === 'all' && shuffledAllPhotos.length > visibleCount && (
              <div className="flex justify-center mt-12 animate-fade-in">
                <button
                  onClick={() => setVisibleCount(prev => prev + 30)}
                  className="px-8 py-3.5 border border-gold/40 text-gold hover:text-black hover:bg-gold-gradient text-xs font-semibold uppercase tracking-[0.2em] rounded hover:scale-102 transition-all duration-300 cursor-pointer shadow-lg shadow-gold/5"
                >
                  {language === 'en' ? 'View More Work' : 'ເບິ່ງຜົນງານເພີ່ມເຕີມ'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 border border-dashed border-dark-border rounded-lg">
            <p className="text-dark-text-muted text-sm tracking-wide">
              {t.portfolioNoPhotos}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 select-none"
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded transition-all z-50 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Slider Content */}
          <div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center">
            {/* Prev arrow */}
            <button 
              onClick={prevPhoto}
              className="absolute left-0 sm:left-4 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 rounded-full transition-all z-30 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Photo Wrapper */}
            <div className="relative h-full w-full max-h-full max-w-full flex items-center justify-center protect-image select-none pointer-events-auto">
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt="Lightbox display"
                className="max-h-full max-w-full object-contain rounded shadow-2xl animate-fade-in border border-white/5 pointer-events-none select-none protect-image"
              />
              {/* Invisible protection shield overlay */}
              <div className="absolute inset-0 z-20 protect-image" />
            </div>

            {/* Next arrow */}
            <button 
              onClick={nextPhoto}
              className="absolute right-0 sm:right-4 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 rounded-full transition-all z-30 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Lightbox Info Footer */}
          <div className="mt-4 text-center">
            <span 
              onClick={() => {
                const albumId = filteredPhotos[lightboxIndex].albumId;
                handleSelectAlbum(albumId);
                closeLightbox();
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-xs tracking-[0.2em] uppercase text-gold hover:text-white hover:underline cursor-pointer transition-colors font-semibold"
            >
              {albums.find(a => a.id === filteredPhotos[lightboxIndex].albumId)?.title || 'Wedding Portfolio'}
            </span>
            <p className="text-[10px] text-dark-text-muted uppercase tracking-widest mt-1">
              Image {lightboxIndex + 1} of {filteredPhotos.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
