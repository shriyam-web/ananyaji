'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-11-02T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
          <Heart className="w-10 h-10 text-pink-400 animate-bounce" />
          <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 bg-clip-text text-transparent animate-float animate-rainbow-text">
          Happy Birthday
        </h1>

        <h2 className="text-5xl md:text-7xl font-bold text-pink-500 animate-float animate-heartbeat" style={{ animationDelay: '0.2s' }}>
          Ananya Ji 🎉
        </h2>

        <p className="text-xl md:text-2xl text-gray-600 font-medium animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          From your office family with love 💖
        </p>

        <div className="pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg md:text-xl text-gray-500 mb-6 font-medium">
            Countdown to November 2nd, 2025
          </p>

          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <TimeBox value={timeLeft.minutes} label="Minutes" />
            <TimeBox value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 min-w-[100px] border-2 border-pink-200 transform hover:scale-105 transition-transform">
      <div className="text-4xl md:text-5xl font-bold text-pink-500">{value}</div>
      <div className="text-sm md:text-base text-gray-600 font-medium mt-2">{label}</div>
    </div>
  );
}
