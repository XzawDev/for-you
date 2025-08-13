"use client";
import React, { useState } from "react";
import WelcomeSection from "./components/WelcomeSection";
import StorySection from "./components/StorySection";
import MusicPlayer from "./components/MusicPlayer";
import GiftSurprise from "./components/GiftBox";

export default function Home() {
  const [step, setStep] = useState(1);

  function handleNext() {
    setStep((prev) => prev + 1);
  }

  return (
    <>
      {step === 1 && <WelcomeSection onNext={handleNext} />}
      {step === 2 && (
        <StorySection onBack={() => setStep(1)} onNext={handleNext} />
      )}
      {step === 3 && (
        <MusicPlayer onBack={() => setStep(2)} onNext={handleNext} />
      )}
      {step === 4 && <GiftSurprise onBack={() => setStep(3)} />}
    </>
  );
}
