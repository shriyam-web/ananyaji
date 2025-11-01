'use client';

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useState, useRef } from 'react';

export function VideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Handle fullscreen change
    useState(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    });

    return (
        <section className="py-20 px-4 relative">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">
                    Special Moments 🎬
                </h2>

                <p className="text-center text-gray-600 text-lg mb-16 font-medium">
                    Cherished memories with Ananya Ji
                </p>

                <div ref={containerRef} className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <video
                        ref={videoRef}
                        className="w-full aspect-video object-cover"
                        src="/7.mp4"
                        poster="/3.jpg" // Using first image as poster
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                    />

                    {/* Custom Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={togglePlay}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors group"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                ) : (
                                    <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                )}
                            </button>

                            <button
                                onClick={toggleMute}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors group"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                ) : (
                                    <Volume2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                )}
                            </button>

                            <button
                                onClick={toggleFullscreen}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors group"
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                ) : (
                                    <Maximize className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Play Button Overlay when paused */}
                    {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={togglePlay}
                                className="bg-pink-500/80 backdrop-blur-sm rounded-full p-6 hover:bg-pink-500 transition-colors group animate-pulse"
                            >
                                <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-center text-gray-500 text-sm mt-8 italic">
                    A special video memory 💖
                </p>
            </div>
        </section>
    );
}
