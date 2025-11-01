'use client';

import { FormEvent, useState, useEffect, useRef } from 'react';

const PASSWORD = 'myloveananya';

type FloatingHeart = { id: number; left: number; top: number; delay: number; size: number; opacity: number; emoji: string };
type Sparkle = { id: number; left: number; top: number; delay: number; size: number };
type WeddingSparkle = { id: number; left: number; top: number };

export default function SecretLovePage() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [showWeddingCard, setShowWeddingCard] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [modalDecorHearts, setModalDecorHearts] = useState<FloatingHeart[]>([]);
  const [backgroundDecorHearts, setBackgroundDecorHearts] = useState<FloatingHeart[]>([]);
  const [backgroundDecorSparkles, setBackgroundDecorSparkles] = useState<Sparkle[]>([]);
  const [weddingFooterDecorSparkles, setWeddingFooterDecorSparkles] = useState<WeddingSparkle[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [identityStep, setIdentityStep] = useState<'choice' | 'sasur' | 'ananya'>('choice');
  const audioRef = useRef<HTMLAudioElement>(null);

  const loveQuotes = [
    "You are my sun, my moon, and all of my stars ✨",
    "In a sea of people, my eyes will always search for you 👀💕",
    "You're the reason I believe in love 💝",
    "Every love story is beautiful, but ours is my favorite 📖",
    "With you, I am home 🏡💕"
  ];

  // Fix hydration error by only rendering random elements on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    const modalHeartsData = Array.from({ length: 20 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 50 + 30,
      opacity: 0.1 + Math.random() * 0.2,
      emoji: ['❤️', '💕', '💖', '💝'][Math.floor(Math.random() * 4)],
    }));
    setModalDecorHearts(modalHeartsData);
    const backgroundHeartsData = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      size: Math.random() * 40 + 15,
      opacity: 0.2 + Math.random() * 0.3,
      emoji: ['❤️', '💕', '💖', '💝', '💗', '💓'][Math.floor(Math.random() * 6)],
    }));
    setBackgroundDecorHearts(backgroundHeartsData);
    const sparkleData = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 20 + 10,
    }));
    setBackgroundDecorSparkles(sparkleData);
    const weddingSparklesData = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      left: index * 10,
      top: Math.random() * 100,
    }));
    setWeddingFooterDecorSparkles(weddingSparklesData);
  }, [isMounted]);

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % loveQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loveQuotes.length]);

  useEffect(() => {
    if (!isMounted || !showWeddingCard) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isMounted, showWeddingCard]);

  // Create hearts when unlocked
  useEffect(() => {
    if (unlocked && !showWeddingCard) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        };
        setHearts((prev) => [...prev.slice(-10), newHeart]);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [unlocked, showWeddingCard]);

  // Play song when unlocked
  useEffect(() => {
    if (unlocked && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, [unlocked]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const openAudioPlayer = () => {
    setShowAudioPlayer(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const closeAudioPlayer = () => {
    setShowAudioPlayer(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === PASSWORD) {
      setUnlocked(true);
      setError('');
    } else {
      setError('Wrong password, sweetheart. Try again.');
      setUnlocked(false);
    }
  };

  const downloadWeddingCard = () => {
    window.print();
  };

  const openIdentityModal = () => {
    setIdentityStep('choice');
    setShowIdentityModal(true);
  };

  const closeIdentityModal = () => {
    setShowIdentityModal(false);
    setIdentityStep('choice');
  };

  const handleIdentitySasur = () => {
    setIdentityStep('sasur');
  };

  const handleIdentityAnanya = () => {
    setIdentityStep('ananya');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 relative overflow-hidden">
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src="/raabta.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Music Player - Shows when unlocked */}
      {unlocked && !showWeddingCard && !showAudioPlayer && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
          <button
            onClick={openAudioPlayer}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white"
          >
            <span className="text-2xl animate-bounce">
              {isPlaying ? '🎵' : '🎶'}
            </span>
            <span className="font-bold text-lg">
              Open Music Player
            </span>
            <span className="text-2xl animate-pulse">
              🎼
            </span>
          </button>
          <div className="text-center mt-2 text-rose-600 font-semibold text-sm bg-white/90 px-3 py-1 rounded-full">
            🎼 Raabta - Our Song 💕
          </div>
        </div>
      )}

      {/* Maximized Romantic Audio Player Modal */}
      {showAudioPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
          {/* Close Button */}
          <button
            onClick={closeAudioPlayer}
            className="absolute top-6 right-6 z-[110] bg-white/90 hover:bg-white text-rose-600 rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-rose-300"
          >
            <span className="text-3xl font-bold">×</span>
          </button>

          {/* Floating Hearts in Background */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {modalDecorHearts.map((heart) => (
                <div
                  key={`modal-heart-${heart.id}`}
                  className="absolute animate-float-slow"
                  style={{
                    left: `${heart.left}%`,
                    top: `${heart.top}%`,
                    animationDelay: `${heart.delay}s`,
                    fontSize: `${heart.size}px`,
                    opacity: heart.opacity,
                  }}
                >
                  {heart.emoji}
                </div>
              ))}
            </div>
          )}

          {/* Main Audio Player Card */}
          <div className="relative w-full max-w-lg mx-4 animate-scale-in">
            {/* Romantic Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-6 border-white">
              {/* Image with Gradient Overlay */}
              <div className="relative">
                <img
                  src="/my1.jpg"
                  alt="Our Love"
                  className="w-full h-auto object-cover"
                />
                {/* Beautiful Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Decorative Floating Hearts on Image */}
                <div className="absolute top-4 left-4 text-4xl animate-bounce opacity-80">💖</div>
                <div className="absolute top-4 right-4 text-4xl animate-bounce opacity-80" style={{ animationDelay: '0.3s' }}>💖</div>
              </div>

              {/* Audio Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rose-900/95 via-pink-900/90 to-transparent p-3 md:p-4">
                {/* Song Title */}
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2 animate-pulse">🎵</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    Raabta
                  </h2>
                  <p className="text-base md:text-lg text-rose-200 italic">
                    "Our Song, Our Story" 💕
                  </p>
                </div>

                {/* Play/Pause Controls */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <button
                    onClick={toggleAudio}
                    className="group relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-400 hover:via-pink-400 hover:to-purple-400 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-xl hover:scale-110 transition-all border-3 border-white"
                  >
                    <span className="text-xl md:text-2xl">
                      {isPlaying ? '⏸️' : '▶️'}
                    </span>
                  </button>
                </div>

                {/* Status Text */}
                <div className="text-center">
                  <p className="text-sm md:text-base text-white font-semibold">
                    {isPlaying ? '🎶 Now Playing...' : '⏸️ Paused'}
                  </p>
                </div>

                {/* Romantic Message */}
                <div className="mt-3 text-center">
                  <p className="text-xs md:text-sm text-rose-200 italic">
                    "Every beat of this song reminds me of you 💓"
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Sparkles Around Card */}
            <div className="absolute -top-3 left-1/3 text-4xl animate-bounce">✨</div>
            <div className="absolute -top-3 right-1/3 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute -bottom-3 left-[45%] text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>💫</div>
            <div className="absolute -bottom-3 right-[45%] text-4xl animate-bounce" style={{ animationDelay: '0.7s' }}>�</div>
          </div>
        </div>
      )}

      {showIdentityModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl border-4 border-rose-200 p-8 text-center">
            <button
              type="button"
              onClick={closeIdentityModal}
              className="absolute top-4 right-4 text-3xl font-bold text-rose-500 hover:text-rose-600"
            >
              ×
            </button>
            {identityStep === 'choice' && (
              <div className="space-y-6 mt-4">
                <h2 className="text-3xl font-bold text-rose-600">Are you Ananya ji or Sasur ji?</h2>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={handleIdentityAnanya}
                    className="w-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white text-xl font-semibold py-3 shadow-xl hover:scale-105 transition-transform"
                  >
                    Ananya ji
                  </button>
                  <button
                    type="button"
                    onClick={handleIdentitySasur}
                    className="w-full rounded-full bg-gradient-to-r from-purple-500 via-rose-500 to-pink-500 text-white text-xl font-semibold py-3 shadow-xl hover:scale-105 transition-transform"
                  >
                    Sasur ji
                  </button>
                </div>
              </div>
            )}
            {identityStep === 'sasur' && (
              <div className="space-y-6 mt-8">
                <p className="text-2xl font-bold text-rose-600">Pranaam from a sanskaari future daamad 😂 okay ji bye 🥹🙏</p>
                <button
                  type="button"
                  onClick={closeIdentityModal}
                  className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white text-xl font-semibold py-3 shadow-xl hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            )}
            {identityStep === 'ananya' && (
              <div className="space-y-6 mt-8">
                <p className="text-2xl font-bold text-rose-600">I need to confirm first!</p>
                <button
                  type="button"
                  onClick={() => setIdentityStep('choice')}
                  className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white text-xl font-semibold py-3 shadow-xl hover:scale-105 transition-transform"
                >
                  Okay
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Hearts */}
          {backgroundDecorHearts.map((heart) => (
            <div
              key={`heart-${heart.id}`}
              className="absolute animate-float-slow"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
                animationDelay: `${heart.delay}s`,
                fontSize: `${heart.size}px`,
                opacity: heart.opacity,
              }}
            >
              {heart.emoji}
            </div>
          ))}

          {/* Sparkles */}
          {backgroundDecorSparkles.map((sparkle) => (
            <div
              key={`sparkle-${sparkle.id}`}
              className="absolute animate-sparkle"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`,
                fontSize: `${sparkle.size}px`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-8">
        {!unlocked ? (
          /* PASSWORD SCREEN */
          <div className="w-full max-w-md animate-fade-in">
            <div className="rounded-3xl bg-white/95 p-12 text-center shadow-2xl backdrop-blur-xl border-4 border-rose-300 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 text-6xl opacity-20">🌹</div>
              <div className="absolute top-0 right-0 text-6xl opacity-20">🌹</div>
              <div className="absolute bottom-0 left-0 text-6xl opacity-20">💐</div>
              <div className="absolute bottom-0 right-0 text-6xl opacity-20">💐</div>

              <div className="text-8xl mb-6 animate-heart-beat">💕</div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Our Secret Garden
              </h1>
              <p className="text-lg text-rose-500 italic mb-2">
                "Where love blooms eternal..."
              </p>
              <p className="text-sm text-rose-400 mb-8">
                Enter the magic words to unlock my heart 🗝️💖
              </p>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="password"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="✨ The Secret Password ✨"
                    className="w-full rounded-full border-3 border-rose-400 bg-gradient-to-r from-pink-50 to-rose-50 px-8 py-5 text-center text-rose-700 placeholder-rose-400 shadow-xl focus:border-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 text-lg font-medium"
                  />
                </div>
                {error && (
                  <p className="text-base text-rose-600 animate-shake flex items-center justify-center gap-2">
                    <span>💔</span> {error} <span>💔</span>
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 py-5 text-xl font-bold tracking-wide text-white shadow-2xl transition-all hover:scale-105 hover:shadow-pink-500/50 hover:from-rose-400 hover:via-pink-500 hover:to-purple-500 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    💖 Unlock My Heart 💖
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>

              <div className="mt-8 text-rose-300 text-xs">
                Hint: It's what I feel for you, my love 💝
              </div>
            </div>
          </div>
        ) : !showWeddingCard ? (
          /* MAIN LOVE PAGE */
          <div className="w-full max-w-7xl animate-fade-in">
            <div className="rounded-3xl bg-white/98 p-8 md:p-16 shadow-2xl backdrop-blur-xl border-4 border-rose-300 relative overflow-hidden">

              {/* Floating hearts effect on unlock */}
              {hearts.map((heart) => (
                <div
                  key={heart.id}
                  className="absolute pointer-events-none text-4xl animate-float-up z-50"
                  style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                >
                  💖
                </div>
              ))}

              {/* Main Header */}
              <div className="text-center mb-12 space-y-6 relative">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-6xl animate-bounce">🌹</span>
                  <span className="text-8xl animate-heart-beat">💝</span>
                  <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌹</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-extrabold text-rose-700 leading-tight animate-text-shimmer drop-shadow-[0_8px_20px_rgba(225,120,170,0.45)]">
                  I Love You So Much, Ananya! ❤️
                </h1>

                <div className="max-w-4xl mx-auto space-y-4">
                  <p className="text-2xl text-rose-600 italic font-medium leading-relaxed">
                    "Every beat of my heart whispers your name. Every breath I take is filled with thoughts of you.
                    You are my sun, my moon, my stars, and my entire universe. ✨"
                  </p>
                  <p className="text-xl text-pink-600 font-medium">
                    Thank you for being the most beautiful part of my life 💕
                  </p>
                </div>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4 my-8">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-rose-400 to-rose-400 rounded"></div>
                  <span className="text-5xl">💞</span>
                  <div className="h-1 w-32 bg-gradient-to-l from-transparent via-rose-400 to-rose-400 rounded"></div>
                </div>
              </div>

              {/* Romantic Quotes Carousel */}
              <div className="mb-12 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 p-8 rounded-3xl border-3 border-rose-200 shadow-xl">
                <div className="text-center space-y-3">
                  <div className="text-4xl">💌</div>
                  <p className="text-2xl text-rose-700 italic font-semibold animate-pulse">
                    {loveQuotes[currentQuoteIndex]}
                  </p>
                </div>
              </div>

              {/* Photo Gallery with Special Effects */}
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-center text-rose-700 mb-8 flex items-center justify-center gap-3">
                  <span>📸</span> Our Beautiful Moments <span>📸</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* First Image with Heart Frame */}
                  <div className="group relative rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 hover:rotate-1 border-8 border-rose-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 z-10"></div>
                    <img
                      src="/my1.jpg"
                      alt="Our Memory 1"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end justify-center pb-6">
                      <span className="text-white font-bold text-3xl drop-shadow-lg">💕 You & Me 💕</span>
                    </div>
                    {/* Corner hearts */}
                    <div className="absolute top-4 left-4 text-5xl animate-bounce z-30">💖</div>
                    <div className="absolute top-4 right-4 text-5xl animate-bounce z-30" style={{ animationDelay: '0.3s' }}>💖</div>
                  </div>

                  {/* Second Image with Heart Frame */}
                  <div className="group relative rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 hover:-rotate-1 border-8 border-pink-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 z-10"></div>
                    <img
                      src="/my3.jpg"
                      alt="Our Memory 2"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end justify-center pb-6">
                      <span className="text-white font-bold text-3xl drop-shadow-lg">💖 Forever Us 💖</span>
                    </div>
                    {/* Corner hearts */}
                    <div className="absolute bottom-4 left-4 text-5xl animate-bounce z-30" style={{ animationDelay: '0.2s' }}>💗</div>
                    <div className="absolute bottom-4 right-4 text-5xl animate-bounce z-30" style={{ animationDelay: '0.5s' }}>💗</div>
                  </div>
                </div>

                {/* Video Section - Full Width with Special Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 p-2">
                  <div className="rounded-2xl overflow-hidden">
                    <video
                      controls
                      className="w-full h-auto"
                      poster="/my3.jpg"
                    >
                      <source src="/my2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Floating hearts around video */}
                  <div className="absolute -top-6 left-1/4 text-6xl animate-bounce">💝</div>
                  <div className="absolute -top-6 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>💝</div>
                </div>
              </div>

              {/* Love Messages Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 p-8 rounded-3xl shadow-xl text-center border-4 border-rose-300 transform hover:scale-105 transition-all hover:rotate-2">
                  <div className="text-6xl mb-4 animate-bounce">🌹</div>
                  <h3 className="text-2xl font-bold text-rose-800 mb-3">My Beautiful Queen</h3>
                  <p className="text-rose-700 text-base leading-relaxed">You rule my heart with grace, beauty, and endless love 👑💕</p>
                </div>

                <div className="bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 p-8 rounded-3xl shadow-xl text-center border-4 border-pink-300 transform hover:scale-105 transition-all">
                  <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.2s' }}>💑</div>
                  <h3 className="text-2xl font-bold text-pink-800 mb-3">Forever Together</h3>
                  <p className="text-pink-700 text-base leading-relaxed">You & Me, through every sunrise and sunset, always 🌅💞</p>
                </div>

                <div className="bg-gradient-to-br from-red-100 via-rose-100 to-red-200 p-8 rounded-3xl shadow-xl text-center border-4 border-red-300 transform hover:scale-105 transition-all hover:-rotate-2">
                  <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.4s' }}>💍</div>
                  <h3 className="text-2xl font-bold text-red-800 mb-3">My Soulmate</h3>
                  <p className="text-red-700 text-base leading-relaxed">Destined to find you, blessed to love you, forever yours 💝✨</p>
                </div>
              </div>

              {/* Special Love Letter Section */}
              <div className="mb-12 bg-gradient-to-br from-amber-50 to-rose-50 p-10 rounded-3xl shadow-2xl border-4 border-rose-300 relative">
                <div className="absolute top-4 right-4 text-5xl animate-spin-slow">💌</div>
                <h3 className="text-3xl font-bold text-rose-800 mb-6 text-center">A Letter to My Love 💕</h3>
                <div className="space-y-4 text-rose-700 text-lg leading-relaxed font-medium">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-rose-600 first-letter:mr-3 first-letter:float-left">
                    My dearest Ananya, words cannot express how deeply I love you. You've filled my life with colors I never knew existed.
                    Your smile brightens my darkest days, your laughter is my favorite melody, and your love is my greatest treasure.
                  </p>
                  <p>
                    Every moment with you feels like a beautiful dream I never want to wake up from. You make me want to be better,
                    to love harder, to dream bigger. With you, I've found my home, my peace, my everything. 🏡💖
                  </p>
                  <p className="italic text-center text-xl text-rose-600 font-bold">
                    I promise to love you today, tomorrow, and for all the tomorrows to come. You are my forever. 💍✨
                  </p>
                </div>
              </div>

              {/* Reasons I Love You */}
              <div className="mb-12">
                <h3 className="text-4xl font-bold text-center text-rose-700 mb-8">
                  <span className="animate-bounce inline-block">💝</span> Just Some Reasons Why I Love You <span className="animate-bounce inline-block">💝</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { emoji: "😊", text: "Your smile that lights up my entire world" },
                    { emoji: "💫", text: "The way you make ordinary moments magical" },
                    { emoji: "🎵", text: "Your laugh that's my favorite sound" },
                    { emoji: "🌟", text: "How you believe in me even when I don't" },
                    { emoji: "💕", text: "The way you care for everyone around you" },
                    { emoji: "✨", text: "Your beautiful soul that shines so bright" },
                    { emoji: "🎨", text: "Your unique perspective on everything" },
                    { emoji: "🌈", text: "The colors you bring into my life" },
                  ].map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-rose-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-5xl">{reason.emoji}</span>
                      <p className="text-rose-700 font-medium text-lg">{reason.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wedding Card Button */}
              <div className="text-center space-y-6 mb-12">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-1 w-24 bg-gradient-to-r from-transparent to-rose-400 rounded"></div>
                  <span className="text-5xl animate-bounce">💒</span>
                  <div className="h-1 w-24 bg-gradient-to-l from-transparent to-rose-400 rounded"></div>
                </div>

                <button
                  onClick={() => setShowWeddingCard(true)}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 text-2xl font-extrabold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/50 transition-all duration-500 animate-pulse overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-4xl">💒</span>
                    <span>See Our Wedding Card</span>
                    <span className="text-4xl">💒</span>
                  </span>
                </button>

                <p className="text-rose-500 text-lg italic animate-bounce">
                  ✨ Click to see our beautiful future together ✨
                </p>
              </div>

              {/* Final Signature */}
              <div className="text-center mt-16 space-y-4 pt-8 border-t-4 border-rose-200">
                <p className="text-3xl font-medium text-rose-500 italic">
                  Forever and always yours,
                </p>
                <button
                  type="button"
                  onClick={openIdentityModal}
                  className="text-5xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Your Shriyam 💕✨
                </button>
                <div className="flex items-center justify-center gap-3 text-4xl">
                  <span className="animate-bounce">💖</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💝</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💗</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>💓</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>💕</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* WEDDING CARD */
          <div className="w-full max-w-5xl animate-fade-in">
            <div className="text-center mb-8">
              <button
                onClick={() => setShowWeddingCard(false)}
                className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Back to Our Love Story
                  <span className="text-2xl">💕</span>
                </span>
              </button>
            </div>

            <div
              id="wedding-card"
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-double border-rose-400 relative"
            >
              {/* Decorative corners for wedding card */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-rose-300 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-rose-300 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-rose-300 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-rose-300 rounded-br-3xl"></div>

              {/* Wedding Card Header */}
              <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 p-12 text-center relative overflow-hidden">
                <div className="absolute top-6 left-6 text-6xl animate-spin-slow">🌸</div>
                <div className="absolute top-6 right-6 text-6xl animate-spin-slow" style={{ animationDelay: '1s' }}>🌸</div>
                <div className="absolute bottom-6 left-6 text-6xl animate-bounce">🕊️</div>
                <div className="absolute bottom-6 right-6 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🕊️</div>

                <div className="relative z-10">
                  <h2 className="text-6xl font-extrabold text-white mb-3 font-serif drop-shadow-lg">
                    Wedding Invitation
                  </h2>
                  <p className="text-white text-3xl italic font-medium">Together Forever 💍</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="h-1 w-20 bg-white/50 rounded"></div>
                    <span className="text-5xl">💕</span>
                    <div className="h-1 w-20 bg-white/50 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Wedding Card Body */}
              <div className="p-16 space-y-10 bg-gradient-to-b from-rose-50 via-pink-50 to-rose-50">
                {/* Decorative Line */}
                <div className="flex items-center justify-center gap-6">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-rose-400 to-rose-400 rounded"></div>
                  <span className="text-6xl animate-pulse">💕</span>
                  <div className="h-1 w-32 bg-gradient-to-l from-transparent via-rose-400 to-rose-400 rounded"></div>
                </div>

                <div className="text-center space-y-8">
                  <p className="text-3xl text-rose-600 italic font-serif font-bold">
                    "Two souls, one heart, one beautiful journey" ✨
                  </p>

                  <div className="text-6xl font-bold text-rose-800 space-y-4 font-serif">
                    <button
                      type="button"
                      onClick={openIdentityModal}
                      className="drop-shadow-md text-rose-800"
                    >
                      Shriyam
                    </button>
                    <div className="flex items-center justify-center gap-4 text-5xl">
                      <span className="animate-bounce">💍</span>
                      <span className="text-4xl">&</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💍</span>
                    </div>
                    <p className="drop-shadow-md">Ananya</p>
                  </div>

                  <p className="text-2xl text-rose-600 italic max-w-2xl mx-auto leading-relaxed">
                    Together with our families, joyfully invite you to witness and celebrate our union of love
                  </p>

                  {/* Wedding Details Box */}
                  <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-rose-300 max-w-2xl mx-auto relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg">
                      Save The Date 💝
                    </div>
                    <div className="space-y-6 mt-4 text-rose-700 text-xl">
                      <div className="flex items-center justify-center gap-4 bg-rose-50 p-6 rounded-2xl">
                        <span className="text-4xl">📅</span>
                        <span className="font-semibold">Coming Soon - A Date to Remember</span>
                      </div>
                      <div className="flex items-center justify-center gap-4 bg-pink-50 p-6 rounded-2xl">
                        <span className="text-4xl">⏰</span>
                        <span className="font-semibold">When the stars align for us ✨</span>
                      </div>
                      <div className="flex items-center justify-center gap-4 bg-red-50 p-6 rounded-2xl">
                        <span className="text-4xl">📍</span>
                        <span className="font-semibold">In Our Dreams & Soon Reality 🌟</span>
                      </div>
                    </div>
                  </div>

                  {/* Love Quote */}
                  <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 p-8 rounded-3xl border-3 border-rose-300 shadow-xl">
                    <p className="text-rose-800 italic text-2xl leading-relaxed font-serif">
                      "In the garden of love, we found each other. <br />
                      Through life's journey, we'll walk together. <br />
                      Forever and always, hand in hand, heart to heart." 💕
                    </p>
                  </div>

                  {/* Image Section */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative rounded-3xl overflow-hidden border-6 border-rose-300 shadow-2xl transform hover:scale-105 transition-all">
                      <img src="/my1.jpg" alt="Couple" className="w-full h-64 object-cover" />
                      <div className="absolute top-4 right-4 text-5xl animate-bounce">💖</div>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden border-6 border-pink-300 shadow-2xl transform hover:scale-105 transition-all">
                      <img src="/my3.jpg" alt="Couple" className="w-full h-64 object-cover" />
                      <div className="absolute top-4 left-4 text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>💖</div>
                    </div>
                  </div>

                  {/* Special Message */}
                  <div className="bg-gradient-to-br from-amber-50 to-rose-50 p-8 rounded-2xl border-2 border-rose-300">
                    <p className="text-rose-700 text-xl font-medium leading-relaxed">
                      Your presence would make our special day even more beautiful.
                      Join us as we begin our forever together! 🎉💕
                    </p>
                  </div>
                </div>

                {/* Decorative Line */}
                <div className="flex items-center justify-center gap-6">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-rose-400 to-rose-400 rounded"></div>
                  <span className="text-6xl animate-pulse">💒</span>
                  <div className="h-1 w-32 bg-gradient-to-l from-transparent via-rose-400 to-rose-400 rounded"></div>
                </div>

                <p className="text-center text-rose-600 italic text-2xl font-serif">
                  "Love recognizes no barriers. It jumps hurdles, leaps fences, <br />
                  penetrates walls to arrive at its destination full of hope." 💫
                </p>
              </div>

              {/* Wedding Card Footer */}
              <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 p-8 text-center relative">
                <p className="text-white text-2xl font-bold relative z-10">With All Our Love & Blessings 🙏💕</p>
                <div className="absolute inset-0 overflow-hidden">
                  {weddingFooterDecorSparkles.map((sparkle) => (
                    <span
                      key={`wedding-sparkle-${sparkle.id}`}
                      className="absolute text-white/20 text-4xl"
                      style={{
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                      }}
                    >
                      ✨
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center mt-8 space-y-4">
              <button
                onClick={downloadWeddingCard}
                className="group px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-purple-500/50 transition-all relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-3xl">📥</span>
                  Save Our Wedding Card
                  <span className="text-3xl">💕</span>
                </span>
              </button>
              <p className="text-rose-500 text-lg italic">
                Click to print or save this special invitation ✨
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }
        
        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes text-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s infinite linear;
        }
        
        .animate-sparkle {
          animation: sparkle 3s infinite ease-in-out;
        }
        
        .animate-heart-beat {
          animation: heart-beat 1.5s infinite ease-in-out;
        }
        
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          #wedding-card,
          #wedding-card * {
            visibility: visible;
          }
          #wedding-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}