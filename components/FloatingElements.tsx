'use client';

import { useEffect, useState } from 'react';

type FloatingElement = {
  id: number;
  x: number;
  delay: number;
  emoji: string;
  size: number;
  duration: number;
  opacity: number;
  rotation: number;
};

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const emojis = ['🎈', '💖', '✨', '🎉', '🎊', '💐', '🎂', '⭐', '💝', '🌟', '🎁', '💕', '🌸', '🎀', '💫', '🧁', '🍓'];
    const newElements = Array.from({ length: 32 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      delay: Math.random() * 12,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: 26 + Math.random() * 30,
      duration: 18 + Math.random() * 15,
      opacity: 0.45 + Math.random() * 0.4,
      rotation: Math.random() * 24 - 12,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float-up drop-shadow-[0_10px_16px_rgba(255,182,193,0.35)]"
          style={{
            left: `${element.x}%`,
            bottom: '-12%',
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
            filter: 'saturate(110%) drop-shadow(0 8px 12px rgba(255, 170, 200, 0.35))',
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  );
}
