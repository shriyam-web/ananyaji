'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { WishesSection } from '@/components/WishesSection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { VideoSection } from '@/components/VideoSection';
import { SurpriseButton } from '@/components/SurpriseButton';
import { Footer } from '@/components/Footer';
import { FloatingElements } from '@/components/FloatingElements';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 overflow-hidden">
      <FloatingElements />
      <HeroSection />
      <AboutSection />
      <WishesSection />
      <PhotoGallery />
      <VideoSection />
      <div className="flex justify-center py-16">
        <SurpriseButton />
      </div>
      <Footer />
    </main>
  );
}
