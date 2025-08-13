// app/components/MusicPlayer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    {
      title: "Perfection",
      artist: "Andra And The Backbone",
      duration: "3:19",
    },
    // { title: "Neon Highway", artist: "Retro Future", duration: "4:12" },
    // { title: "Digital Sunset", artist: "Vapor Vibes", duration: "3:28" },
    // { title: "Palm Tree Breeze", artist: "Tropical Waves", duration: "3:57" },
  ];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.log("Playback failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition =
        e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const newTime =
        (clickPosition / progressBarWidth) * audioRef.current.duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-800 overflow-hidden p-4">
      {/* Soft floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.1,
          }}
        ></div>

        {/* Soft floating shapes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, rgba(${
                Math.random() > 0.5 ? 236 : 168
              }, ${Math.random() * 100 + 72}, ${
                Math.random() * 100 + 153
              }, 0.5) 0%, transparent 70%)`,
              width: `${Math.random() * 100 + 100}px`,
              height: `${Math.random() * 100 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 180],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Soft glow effect */}
        <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 mb-2">
            Favorite Music
          </h1>
          <p className="text-indigo-200 text-xl">
            Aku memilih lagu ini karena bingung mau memilih lagu apa
          </p>
        </motion.div>

        {/* Radio Player */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-3xl border-2 border-white/20 p-8 shadow-2xl shadow-purple-900/30"
        >
          {/* Radio Display */}
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 mb-8 border border-white/10 relative overflow-hidden">
            {/* Soft screen effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent opacity-30"></div>

            {/* Song info */}
            <div className="relative z-10 text-center">
              <div className="text-pink-400 text-sm mb-1">NOW PLAYING</div>
              <div className="text-2xl font-bold text-white mb-1">
                {songs[currentSong].title}
              </div>
              <div className="text-indigo-300">{songs[currentSong].artist}</div>

              {/* Visualizer */}
              <div className="flex justify-center items-end h-20 mt-6 gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t"
                    animate={{
                      height: isPlaying
                        ? `${Math.random() * 30 + 20}px`
                        : "5px",
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.07,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="h-1 bg-gray-700 rounded-full mb-6 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{ width: `${(currentTime / 180) * 100}%` }}
              animate={{
                width: isPlaying ? `${(currentTime / 180) * 100}%` : "0%",
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-white rounded-full -top-1.5"
              style={{ left: `${(currentTime / 180) * 100}%` }}
              animate={{
                left: isPlaying ? `${(currentTime / 180) * 100}%` : "0%",
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400 mb-8">
            <div>{formatTime(currentTime)}</div>
            <div>{songs[currentSong].duration}</div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <button
              onClick={prevSong}
              className="text-white hover:text-pink-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                />
              </svg>
            </button>

            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg hover:shadow-pink-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </motion.button>

            <button
              onClick={nextSong}
              className="text-white hover:text-pink-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H4a1 1 0 01-1-1v-7a1 1 0 011-1h3.5z"
              />
            </svg>

            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`,
                }}
              />
            </div>

            <div className="text-indigo-300 text-sm w-10">{volume}%</div>
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md mt-10"
        >
          <div className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-pink-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Playlist
          </div>

          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            {songs.map((song, index) => (
              <motion.div
                key={index}
                className={`flex items-center justify-between p-4 hover:bg-white/10 cursor-pointer transition-colors ${
                  currentSong === index
                    ? "bg-white/10 border-l-4 border-pink-500"
                    : ""
                }`}
                onClick={() => {
                  setCurrentSong(index);
                  setIsPlaying(true);
                }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <div>
                  <div
                    className={`font-medium ${
                      currentSong === index ? "text-pink-400" : "text-white"
                    }`}
                  >
                    {song.title}
                  </div>
                  <div className="text-sm text-indigo-300">{song.artist}</div>
                </div>
                <div className="text-gray-400 text-sm">{song.duration}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-6 mt-12 w-full max-w-md">
          <motion.button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white font-medium flex items-center gap-2 shadow-lg border border-white/20"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </motion.button>

          <motion.button
            onClick={onNext}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium flex items-center gap-2 shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(236, 72, 153, 0.4)",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Lanjut
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="./musik.mp3" // Adjust the path as necessary
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
        onLoadedMetadata={() => {
          // memastikan durasi ter-load
          console.log("Audio duration:", audioRef.current?.duration);
        }}
      />
    </div>
  );
}
