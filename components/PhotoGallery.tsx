'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, src: '/3.jpg', alt: 'Photo 1' },
  { id: 2, src: '/5.jpg', alt: 'Photo 2' },
  { id: 3, src: '/6.jpg', alt: 'Photo 3' },
  { id: 4, src: '/8.jpg', alt: 'Photo 4' },
  { id: 5, src: '/9.jpg', alt: 'Photo 5' },
  { id: 6, src: '/baby2.jpg', alt: 'Photo 6' },
  { id: 7, src: '/baby3.jpg', alt: 'Photo 7' },
  { id: 8, src: '/baby4.jpg', alt: 'Photo 8' },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openModal = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === photos.length ? 1 : selectedPhoto + 1);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 1 ? photos.length : selectedPhoto - 1);
    }
  };

  return (
    <>
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">
            Memories Gallery 📸
          </h2>

          <p className="text-center text-gray-600 text-lg mb-16 font-medium">
            Beautiful moments with our amazing leader
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-rotate-2 transition-all duration-300 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(photo.id)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-sm font-medium">Photo {photo.id}</div>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-2">
                    <span className="text-xl">✨</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for full-size image view */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={photos.find(p => p.id === selectedPhoto)?.src || ''}
                alt={photos.find(p => p.id === selectedPhoto)?.alt || ''}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Photo counter */}
            <div className="text-center mt-4">
              <span className="text-white text-lg font-medium">
                {selectedPhoto} of {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
