import React, { useState, useEffect, useCallback } from 'react';
import { IntroSequence } from './components/intro/IntroSequence';
import { HomePage } from './components/home/HomePage';

const INTRO_COMPLETED_KEY = 'cinematic_intro_completed_v1';

export const App: React.FC = () => {
  // Check sessionStorage to avoid replaying on refresh
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const stored = sessionStorage.getItem(INTRO_COMPLETED_KEY);
      return stored !== 'true';
    } catch {
      return true;
    }
  });

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_COMPLETED_KEY, 'true');
    } catch {
      // ignore storage errors
    }
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem(INTRO_COMPLETED_KEY);
    } catch {
      // ignore storage errors
    }
    setShowIntro(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-space-950">
      {/* 
        When showIntro is true, render the single <IntroSequence /> component.
        When intro completes, unmount the 3D canvas completely to free GPU memory.
      */}
      {showIntro ? (
        <IntroSequence onComplete={handleIntroComplete} />
      ) : (
        <HomePage onReplayIntro={handleReplayIntro} />
      )}
    </div>
  );
};

export default App;
