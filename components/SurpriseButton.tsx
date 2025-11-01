'use client';

import { useState } from 'react';
import { Gift, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function SurpriseButton() {
  const [showSurprise, setShowSurprise] = useState(false);

  const handleSurprise = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Multiple confetti bursts from different origins
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFC0CB', '#FF69B4', '#FFB6C1', '#FFA500', '#FF1493', '#FF6347']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFC0CB', '#FF69B4', '#FFB6C1', '#FFA500', '#FF1493', '#FF6347']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFC0CB', '#FF69B4', '#FFB6C1', '#FFA500', '#FF1493', '#FF6347']
      });
    }, 200);

    setShowSurprise(true);
  };

  return (
    <>
      <button
        onClick={handleSurprise}
        className="group relative bg-gradient-to-r from-pink-500 to-amber-400 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none"
      >
        <div className="flex items-center gap-3">
          <Gift className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span>Click for a Surprise 🎁</span>
        </div>

        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </button>

      {showSurprise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-pink-100 via-white to-amber-100 rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-4 border-4 border-pink-300 relative animate-scale-in">
            <button
              onClick={() => setShowSurprise(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="text-8xl animate-bounce">🎉</div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-amber-400 animate-spin" />
                  <Sparkles className="absolute -bottom-2 -left-2 w-8 h-8 text-pink-400 animate-spin" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent animate-rainbow-text">
                We Love You, Ananya Ji!
              </h3>

              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                Keep shining always 💫
              </p>

              <p className="text-lg text-gray-600 italic">
                Your dedication, kindness, and leadership make our workplace feel like a family.
                Thank you for being YOU! 🌟
              </p>

              <div className="flex justify-center gap-2 pt-4">
                <span className="text-3xl animate-bounce">💖</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎂</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎈</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎊</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
