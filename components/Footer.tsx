'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();
  return (
    <footer className="py-12 px-4 relative">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-700">
          <span className="text-lg font-medium">Made with</span>
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
          <span className="text-lg font-medium">by your office family</span>
        </div>

        <p className="text-gray-600 font-medium">
          Ashiesh Sir • Rajnish Sir • Shailly • Pranjal • Shuaib • Minakshi •{' '}
          <span onClick={() => router.push('/ilysm')}>Shriyam</span>
        </p>

        <div className="pt-6 text-gray-500 text-sm">
          <p>© 2025 • Celebrating Ananya Ji 🎉</p>
        </div>

        <div className="flex justify-center gap-2 pt-4">
          <span className="text-2xl animate-pulse">🎂</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>🎈</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>🎊</span>
        </div>
      </div>
    </footer>
  );
}
