'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FloatingElements } from '@/components/FloatingElements';

interface BirthdayContent {
  initial: {
    title: string;
    subtitle: string;
  };
  readMore: Array<{
    title: string;
    content: string;
  }>;
}

export default function BirthdayPage() {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState<BirthdayContent | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
    // Load the birthday content from JSON
    fetch('/shaily-content.json')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Failed to load content:', err));
  }, []);

  // useEffect(() => {
  //   // Show alert on page load
  //   if (mounted) {
  //     alert('🎵 whenever i see you !');
  //   }
  // }, [mounted]);

  if (!mounted || !content) return null;

  const currentText = showMore ? content.readMore[currentMessageIndex] : content.initial;
  const totalMessages = content.readMore.length;

  const handleNextMessage = () => {
    if (currentMessageIndex < totalMessages - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const handlePrevMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    }
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    }
  };



  return (
    <main className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 overflow-hidden">
      <audio ref={audioRef} src="/audio.mp3" muted={false} preload="auto" crossOrigin="anonymous" />
      <FloatingElements />

      <div className="relative z-10 flex items-center justify-center h-screen px-6 py-8 overflow-hidden">
        <div className="w-full max-w-6xl h-full">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            {/* Left Section - Text Content */}
            <div className="space-y-6 overflow-y-auto max-h-full pr-2">
              {/* Animated Container */}
              <div
                className={`rounded-3xl bg-white/80 backdrop-blur p-6 md:p-8 shadow-2xl transform transition-all duration-700 ${showMore
                  ? 'scale-100 opacity-100'
                  : 'scale-100 opacity-100'
                  }`}
              >
                {/* Title */}
                <h1
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent mb-3 transition-all duration-700 ${showMore ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
                    }`}
                >
                  {currentText.title}
                </h1>

                {/* Subtitle or Content */}
                {!showMore ? (
                  <p className="text-base md:text-lg text-rose-400 font-medium animate-pulse">
                    {(currentText as typeof content.initial).subtitle}
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm md:text-base text-rose-700 leading-relaxed whitespace-pre-line">
                      {(currentText as typeof content.readMore[0]).content}
                    </p>
                    {/* Message Counter */}
                    <p className="text-sm text-rose-400 mt-4">
                      Message {currentMessageIndex + 1} of {totalMessages}
                    </p>
                  </div>
                )}

                {/* Decorative Elements */}
                <div className="mt-4 flex gap-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
                  <div className="h-1 w-8 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full"></div>
                </div>
              </div>

              {/* Button Section */}
              {!showMore ? (
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  <button
                    onClick={() => setShowMore(true)}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base"
                  >
                    Read More →
                  </button>
                  <button
                    onClick={handlePlayAudio}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base"
                  >
                    🎵 Play Audio
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  <button
                    onClick={handlePrevMessage}
                    disabled={currentMessageIndex === 0}
                    className="px-4 py-2 md:px-5 md:py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextMessage}
                    disabled={currentMessageIndex === totalMessages - 1}
                    className="px-4 py-2 md:px-5 md:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next →
                  </button>
                  <button
                    onClick={() => {
                      setShowMore(false);
                      setCurrentMessageIndex(0);
                    }}
                    className="px-4 py-2 md:px-5 md:py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
                  >
                    Home ↩
                  </button>
                </div>
              )}

              {/* Decorative Hearts */}
              <div className="flex gap-3 text-2xl md:text-3xl">
                <span className="animate-bounce">❤</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                  🎂
                </span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                  ✨
                </span>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="relative w-full h-96 md:h-full md:max-h-screen overflow-hidden flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl w-full h-full">
                <Image
                  src="/shaily2.jpg"
                  alt="Birthday person"
                  width={500}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Decorative Frame */}
                <div className="absolute inset-0 rounded-3xl border-4 border-rose-200/50 pointer-events-none"></div>
              </div>

              {/* Floating Decorative Elements around Image */}
              <div className="absolute -top-4 -right-4 text-5xl animate-pulse">🎉</div>
              <div className="absolute -bottom-4 -left-4 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                🎈
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -z-0"></div>
    </main>
  );
}