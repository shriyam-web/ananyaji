'use client';

import { Heart, Sparkles, Star, Crown, Gift, Smile, Cake } from 'lucide-react';

const wishes = [
  {
    name: 'Ashiesh Sir',
    message: 'Proud of your journey and joy 💖',
    icon: Gift,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Rajnish Sir',
    message: 'Keep shining, Ananya! Many happy returns 🎂',
    icon: Cake,
    color: 'from-orange-400 to-pink-400',
  },
  {
    name: 'Shailly',
    message: "You're our motivation every day 💐",
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
  },
  {
    name: 'Pranjal',
    message: 'You make work fun and inspiring 😄',
    icon: Smile,
    color: 'from-amber-400 to-orange-400',
  },
  {
    name: 'Shuaib',
    message: "Here's to more success and smiles 🥂",
    icon: Star,
    color: 'from-yellow-400 to-amber-400',
  },
  {
    name: 'Minakshi',
    message: 'The queen of multitasking deserves a royal day 👑',
    icon: Crown,
    color: 'from-purple-400 to-pink-400',
  },
  {
    name: 'Vikash',
    message: 'Happy birthday to you in advance',
    icon: Crown,
    color: 'from-purple-400 to-pink-400',
  },
  {
    name: 'Shriyam',
    message: 'Your positivity lights up the whole office!',
    icon: Sparkles,
    color: 'from-pink-400 to-rose-400',
  },
];

export function WishesSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">
          Birthday Wishes 💝
        </h2>

        <p className="text-center text-gray-600 text-lg mb-16 font-medium">
          From everyone who loves and appreciates you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => {
            const Icon = wish.icon;
            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-pink-200 hover:border-pink-300 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${wish.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{wish.name}</h3>
                </div>

                <p className="text-gray-700 leading-relaxed font-medium">
                  "{wish.message}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
