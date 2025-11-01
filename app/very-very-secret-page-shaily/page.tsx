'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setMounted(true);
    // Load the birthday content from JSON
    fetch('/shaily-content.json')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Failed to load content:', err));
  }, []);

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

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 overflow-hidden">
      <FloatingElements />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-6xl">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Section - Text Content */}
            <div className="space-y-8">
              {/* Animated Container */}
              <div
                className={`rounded-3xl bg-white/80 backdrop-blur p-10 shadow-2xl transform transition-all duration-700 ${
                  showMore
                    ? 'scale-100 opacity-100'
                    : 'scale-100 opacity-100'
                }`}
              >
                {/* Title */}
                <h1
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent mb-4 transition-all duration-700 ${
                    showMore ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
                  }`}
                >
                  {currentText.title}
                </h1>

                {/* Subtitle or Content */}
                {!showMore ? (
                  <p className="text-lg text-rose-400 font-medium animate-pulse">
                    {(currentText as typeof content.initial).subtitle}
                  </p>
                ) : (
                  <div className="space-y-4">
                    <p className="text-rose-700 leading-relaxed whitespace-pre-line">
                      {(currentText as typeof content.readMore[0]).content}
                    </p>
                    {/* Message Counter */}
                    <p className="text-sm text-rose-400 mt-4">
                      Message {currentMessageIndex + 1} of {totalMessages}
                    </p>
                  </div>
                )}

                {/* Decorative Elements */}
                <div className="mt-8 flex gap-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
                  <div className="h-1 w-8 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full"></div>
                </div>
              </div>

              {/* Button Section */}
              {!showMore ? (
                <button
                  onClick={() => setShowMore(true)}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Read More →
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={handlePrevMessage}
                    disabled={currentMessageIndex === 0}
                    className="px-6 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextMessage}
                    disabled={currentMessageIndex === totalMessages - 1}
                    className="px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                  <button
                    onClick={() => {
                      setShowMore(false);
                      setCurrentMessageIndex(0);
                    }}
                    className="px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Home ↩
                  </button>
                </div>
              )}

              {/* Decorative Hearts */}
              <div className="flex gap-4 text-3xl">
                <span className="animate-bounce">❤️</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                  🎂
                </span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                  ✨
                </span>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="relative h-full min-h-96 md:min-h-full">
              <div className="rounded-3xl overflow-hidden shadow-2xl w-full h-full">
                <Image
                  src="/9.jpg"
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