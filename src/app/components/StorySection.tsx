// app/components/TimedMessage.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Define font options as a type for better autocompletion
type FontOption = "serif" | "sans" | "handwriting" | "elegant" | "modern";

interface TimedMessageProps {
  onNext: () => void;
  onBack: () => void;
  font?: FontOption; // Add font prop with default value
}

const ContinuousBackground = () => {
  const shapes = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: `shape-${i}`,
      bg: `rgba(${
        i % 3 === 0
          ? "255, 182, 193"
          : i % 3 === 1
          ? "224, 176, 255"
          : "173, 216, 230"
      }, ${Math.random() * 0.3 + 0.2})`,
      size: Math.random() * 80 + 20,
      top: Math.random() * 100,
      left: Math.random() * 100,
      xOffset: Math.random() * 40 - 20,
      duration: 15 + Math.random() * 15,
    }))
  ).current;

  const lines = useRef(
    Array.from({ length: 15 }, (_, i) => ({
      id: `line-${i}`,
      width: Math.random() * 200 + 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      xOffset: Math.random() * 200 - 100,
      duration: 12 + Math.random() * 12,
    }))
  ).current;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full"
          style={{
            background: shape.bg,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, shape.xOffset, 0],
            rotate: [0, 180],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute h-0.5"
          style={{
            background: "rgba(224, 176, 255, 0.3)",
            width: `${line.width}px`,
            top: `${line.top}%`,
            left: `${line.left}%`,
            transform: `rotate(${line.rotation}deg)`,
          }}
          animate={{
            x: [0, line.xOffset],
            rotate: [0, 360],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

// Font mapping object for easy customization
const FONT_CLASSES: Record<FontOption, string> = {
  serif: "font-serif italic font-medium", // Classic serif
  sans: "font-sans font-semibold", // Clean sans-serif
  handwriting: "font-[cursive] font-normal", // Handwritten style
  elegant: "font-[Georgia] italic font-medium", // Elegant serif
  modern: "font-sans font-light tracking-wider", // Modern thin
};

export default function TimedMessage({
  onNext,
  onBack,
  font = "serif", // Default to serif
}: TimedMessageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // The heartfelt message in Indonesian
  const messageParts = [
    "Selamat ulang tahun, untuk kamu yang hari ini bertambah satu angka.",
    "Tepat 18 tahun lalu, pada 13 Agustus 2007, adalah hari saat kamu pertama kali menangis.",
    "Aku ingin kamu tahu meski langit kadang abu-abu, merah membara, atau gelap tanpa cahaya— ada seseorang yang akan ada di setiap langkahmu, memayungi dengan caranya yang paling sunyi.",
    "Bukan agar kamu tak pernah jatuh, tapi supaya pada saat kamu jatuh, kamu tahu ada tangan yang siap menahan tanpa bertanya apa salahmu.",
    "Hari ini, aku menitipkan satu rasa pada setiap lilin kecil di kue ulang tahunmu: semoga api itu bukan hanya sekedar untuk ditiup, tapi juga untuk menyalakan api kecil di dadamu.",
    "Api yang percaya bahwa impianmu sangat layak dikejar—meski jalannya kadang naik turun, seperti napas yang tersedu-sedu dalam tangisan.",
    "Aku tahu lelahmu tak selalu berisik.",
    "Kadang ia datang dengan pelan, memeluk dari belakang hingga matamu tak lagi mampu menahan derasnya air mata yang mengalir di wajahmu.",
    "Untuk itu, aku siapkan satu kantong besar berisi izin untuk berhenti sejenak, menarik napas dalam-dalam, dan melangkah kembali dengan hati yang lebih ringan.",
    "Izin itu tak pernah kedaluwarsa.",
    "Jadi, yaa...",
    "Berbahagialah.😁",
    "Bukan karena hari ini sempurna, tapi karena kamu sudah sampai di sini—dengan segala retak yang bukan membuatmu rapuh, melainkan justru membuatmu lebih utuh.",
    "Dan jika suatu hari nanti hasilnya belum seperti apa yang kamu harapkan, ingatlah ada seseorang yang membuka pintu selebar-lebarnya untukmu pulang.",
    "Apapun hasilnya, baik atau belum baik, kamu selalu punya tempat untuk bersandar tanpa syarat.",
    "Selamat ulang tahun.🎉",
    "Semoga tahun ini memberimu lebih banyak kebahagian, lebih banyak waktu untuk dirimu sendiri, dan lebih banyak keberanian untuk terus berjalan, menuju dirimu yang paling kamu rindukan.",
  ];

  // Handle navigation to a specific index
  const goToSentence = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setDirection(index > currentIndex ? 0 : 1);
    setCurrentIndex(index);

    // Set new timeout after manual navigation
    timeoutRef.current = setTimeout(() => {
      if (currentIndex < messageParts.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 9000);
  };

  // Auto-advance to next sentence
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (currentIndex < messageParts.length - 1) {
        setDirection(0);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  // Get font classes based on prop
  const fontClass = FONT_CLASSES[font] || FONT_CLASSES.serif;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-50 to-indigo-100">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 bg-grid bg-[length:40px_40px] opacity-5"></div>

      {/* Continuous background animation */}
      <ContinuousBackground />

      {/* Content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {/* Main message display */}
        <div className="max-w-3xl w-full text-center mb-16 min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 0 ? -50 : 50 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute"
            >
              <div className="relative">
                {/* Text shadow effect */}
                <div className="absolute inset-0 blur-sm opacity-30 bg-white rounded-lg -z-10"></div>

                {/* Text container with font class applied */}
                <div className="bg-white/80 backdrop-blur-sm px-8 py-10 rounded-2xl shadow-xl border border-white">
                  <p
                    className={`text-2xl md:text-3xl leading-relaxed text-gray-800 ${fontClass}`}
                  >
                    {messageParts[currentIndex]}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-12">
          {messageParts.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentIndex
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSentence(index)}
              aria-label={`Pesan ${index + 1}`}
            />
          ))}
        </div>

        {/* Page navigation buttons */}
        <div className="flex justify-center gap-8">
          <motion.button
            onClick={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              onBack();
            }}
            className="px-8 py-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 font-medium flex items-center gap-2 shadow-lg border border-white"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            ← Kembali
          </motion.button>
          <motion.button
            onClick={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              onNext();
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium flex items-center gap-2 shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(236, 72, 153, 0.4)",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Lanjut →
          </motion.button>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-pink-300 rounded-tl-2xl"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-pink-300 rounded-tr-2xl"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-pink-300 rounded-bl-2xl"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-pink-300 rounded-br-2xl"></div>
      </div>
    </div>
  );
}
