// app/components/WelcomeSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeSection({ onNext }: { onNext: () => void }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <motion.div
      className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e0b0ff, #ffb6c1)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating balloons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            suppressHydrationWarning
            key={i}
            className="absolute w-16 h-20 rounded-full"
            style={{
              background: `hsl(${Math.random() * 360}, 70%, 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-white/50"></div>
          </motion.div>
        ))}
      </div>

      {/* Glitter particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            suppressHydrationWarning
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20],
            }}
            transition={{
              duration: 1 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Detailed Animated Cake */}
      <motion.div
        className="relative z-10 mb-8 md:mb-12"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={`relative ${isDesktop ? "w-96 h-96" : "w-64 h-64"}`}>
          {/* Cake base - bottom layer */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                         w-64 h-20 bg-pink-300 rounded-t-full
                         shadow-lg border-b-8 border-pink-400"
          ></div>

          {/* Cake middle layer */}
          <div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 
                         w-56 h-20 bg-pink-200 rounded-t-full
                         shadow-lg border-b-8 border-pink-300"
          ></div>

          {/* Cake top layer */}
          <div
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 
                         w-48 h-20 bg-pink-100 rounded-t-full
                         shadow-lg border-b-8 border-pink-200"
          ></div>

          {/* Frosting details */}
          <div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 
                         w-64 h-6 bg-white rounded-full"
          ></div>
          <div
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 
                         w-56 h-6 bg-white rounded-full"
          ></div>
          <div
            className="absolute bottom-48 left-1/2 transform -translate-x-1/2 
                         w-48 h-6 bg-white rounded-full"
          ></div>

          {/* Candles */}
          <div
            className="absolute bottom-52 left-1/2 transform -translate-x-1/2 
                         flex justify-between w-40"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={{
                  rotate: [0, -1, 0, 1, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {/* Candle */}
                <div
                  className={`w-4 h-16 mx-auto ${
                    i === 0
                      ? "bg-blue-300"
                      : i === 1
                      ? "bg-purple-300"
                      : i === 2
                      ? "bg-yellow-300"
                      : i === 3
                      ? "bg-green-300"
                      : "bg-red-300"
                  } rounded-t-lg`}
                ></div>

                {/* Candle flame */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.1, 1],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-200 rounded-full"></div>
                    <motion.div
                      className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                      animate={{
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Glow effect around candle */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  style={{
                    boxShadow: "0 0 20px 10px rgba(255, 200, 0, 0.5)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Decorative sprinkles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              suppressHydrationWarning
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0
                  ? "w-2 h-2 bg-red-400"
                  : i % 3 === 1
                  ? "w-3 h-3 bg-yellow-400"
                  : "w-2.5 h-2.5 bg-blue-400"
              }`}
              style={{
                top: `${Math.random() * 40 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                rotate: [0, 180],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-script drop-shadow-lg"
          animate={{
            textShadow: [
              "0 0 10px rgba(255,255,255,0.5)",
              "0 0 20px rgba(255,255,255,0.7)",
              "0 0 10px rgba(255,255,255,0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Hi Winda, Selamat Ulang Tahun!
        </motion.h1>

        {/* <motion.p
          className="text-xl md:text-xl text-white max-w-xl mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Make a wish and blow out the candles to begin your celebration!
        </motion.p> */}
      </motion.div>

      {/* Next button */}
      <motion.div
        className="z-10 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.button
          onClick={onNext}
          className="w-20 h-20 rounded-full border-4 border-yellow-300 flex items-center justify-center text-white text-2xl bg-pink-400/40 backdrop-blur-lg"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
            backgroundColor: "rgba(255, 182, 193, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          &rarr;
        </motion.button>
        {/* <p className="text-white mt-4 font-medium">Begin Celebration</p> */}
      </motion.div>
    </motion.div>
  );
}
