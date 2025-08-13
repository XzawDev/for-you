// app/components/GiftSurprise.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftSurprise({ onBack }: { onBack: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMeme, setShowMeme] = useState(false);

  const openGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setShowMeme(true);
      }, 800);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating confetti */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Soft glow */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Kotak Kejutan
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-600 text-center mb-12 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        ></motion.p>

        {/* Gift box container with simplified positioning */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-end justify-center">
          {/* Gift box base */}
          <motion.div
            className="absolute bottom-0 w-48 h-40 md:w-60 md:h-48 bg-gradient-to-r from-[#EF4668] to-[#F59A9B] rounded-lg shadow-xl z-10"
            animate={isOpen ? { y: 20 } : { y: 0 }}
            transition={{ type: "spring", damping: 10 }}
          >
            {/* Ribbon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-[#FFE085]"></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-[#FFE085]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFE085] rounded-full"></div>
          </motion.div>

          {/* Gift box lid - simplified positioning */}
          <motion.div
            className="absolute w-52 h-24 md:w-64 md:h-28 bg-gradient-to-r from-[#EF4668] to-[#F59A9B] rounded-t-lg shadow-xl cursor-pointer z-20"
            style={{ bottom: "10rem" }} // Positioned on top of the base
            animate={
              isOpen
                ? {
                    rotateX: -90,
                    y: -40,
                    opacity: 0,
                  }
                : {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{ type: "spring", damping: 15 }}
            onClick={openGift}
            whileHover={!isOpen ? { scale: 1.05 } : {}}
            whileTap={!isOpen ? { scale: 0.95 } : {}}
          >
            {/* Ribbon on lid */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-[#FFE085]"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-[#FFE085]"></div>

            {/* Bow on lid */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-[#FFE085] rounded-full z-10"></div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-16 bg-[#FFE085] rounded-l-full"></div>
              <div className="absolute top-0 right-0 w-8 h-16 bg-[#FFE085] rounded-r-full"></div>
            </div>
          </motion.div>

          {/* Surprise meme centered with gift box */}
          <AnimatePresence>
            {showMeme && (
              <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  mass: 0.5,
                }}
              >
                <div className="bg-white p-2 rounded-lg shadow-xl border-4 border-yellow-400">
                  <div
                    className="w-48 h-[256px] md:w-60 md:h-[320px] bg-gray-200 border-2 border-dashed rounded-xl overflow-hidden"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src="/meme.jpg"
                      alt="Surprise Meme"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-2 text-center font-bold text-gray-700">
                    DUUARR!💥
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        <motion.div
          className="mt-24 text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600">
            {isOpen
              ? "Semoga harimu minggu terus. 😂"
              : "Ketuk tutup kotak merah di atas untuk melihat kejutanmu. Bersiaplah untuk sesuatu yang seru!"}
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-6 mt-12">
          <motion.button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-white text-gray-700 font-medium flex items-center gap-2 shadow-lg border border-gray-200"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f9fafb",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
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
        </div>
      </div>
    </div>
  );
}
