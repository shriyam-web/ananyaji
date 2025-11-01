'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'question' | 'sasur' | 'ananya'>('question');

  useEffect(() => {
    if (modalState === 'ananya') {
      const timeout = setTimeout(() => {
        setIsModalOpen(false);
        setModalState('question');
        router.push('/ilysm');
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [modalState, router]);

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
          <span onClick={() => {
            setModalState('question');
            setIsModalOpen(true);
          }}>Shriyam</span>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center space-y-5">
            {modalState === 'question' && (
              <>
                <p className="text-xl font-semibold text-gray-800">Are you Ananya Ji or Sasur Ji?</p>
                <div className="flex flex-col gap-3">
                  <button
                    className="w-full rounded-full bg-pink-500 text-white py-2 text-lg font-medium transition hover:bg-pink-600"
                    onClick={() => setModalState('ananya')}
                  >
                    Ananya Ji
                  </button>
                  <button
                    className="w-full rounded-full border border-pink-200 text-pink-500 py-2 text-lg font-medium transition hover:bg-pink-50"
                    onClick={() => setModalState('sasur')}
                  >
                    Sasur Ji
                  </button>
                </div>
                <button
                  className="text-sm text-gray-500 transition hover:text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Maybe later
                </button>
              </>
            )}

            {modalState === 'sasur' && (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-700">Pranaam from a sanskari future daamad 😂 okay ji bye 🥹 </p>
                <div className="flex justify-center gap-3">
                  <button
                    className="rounded-full bg-pink-500 px-4 py-2 text-white font-medium transition hover:bg-pink-600"
                    onClick={() => setModalState('question')}
                  >
                    Go back
                  </button>
                  <button
                    className="rounded-full border border-pink-200 px-4 py-2 text-pink-500 font-medium transition hover:bg-pink-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {modalState === 'ananya' && (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-gray-800">I need to confirm first...</p>
                <p className="text-gray-500">Give me just a moment.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
