'use client';

import { Crown, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-pink-200 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <Crown className="w-12 h-12 text-amber-400 animate-bounce" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">
            About Our Star ⭐
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center font-medium">
            <span className="text-pink-500 font-bold">Ananya Ji</span>, our{' '}
            <span className="text-amber-500 font-semibold">Operations & Strategy Manager</span>,
            is the heart of our team. Her leadership, laughter, and kindness inspire everyone around her.
            She makes every challenge feel manageable and every success sweeter.
            <span className="block mt-4 text-pink-600">
              Today, we celebrate YOU! 🎂✨
            </span>
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
