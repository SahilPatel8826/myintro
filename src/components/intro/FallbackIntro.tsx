import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';

interface FallbackIntroProps {
  onComplete: () => void;
  reason?: string;
}

export const FallbackIntro: React.FC<FallbackIntroProps> = ({
  onComplete,
  reason = 'WebGL acceleration unavailable or reduced motion enabled',
}) => {
  const [isLanding, setIsLanding] = useState(false);

  const handleStart = () => {
    setIsLanding(true);
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="relative w-full h-screen bg-space-950 flex flex-col items-center justify-center p-6 text-slate-100 overflow-hidden font-mono">
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />

      {/* Atmospheric Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* CSS-Animated Planet */}
      <motion.div
        animate={
          isLanding
            ? { scale: [1, 2.8, 6], opacity: [1, 0.8, 0] }
            : {
                rotate: 360,
                y: [-8, 8, -8],
              }
        }
        transition={
          isLanding
            ? { duration: 1.2, ease: 'easeInOut' }
            : {
                rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-cyan-600 shadow-[0_0_60px_rgba(0,240,255,0.4)] border border-cyan-400/30 flex items-center justify-center my-8"
      >
        {/* Planet Surface details / rings */}
        <div className="absolute inset-3 rounded-full border border-cyan-400/20" />
        <div className="absolute w-[125%] h-6 border-t-2 border-cyan-400/60 rounded-[100%] rotate-[-25deg] shadow-[0_0_20px_rgba(0,240,255,0.8)]" />
        <Globe className="w-24 h-24 text-cyan-400/40" />
      </motion.div>

      {/* UI Controls */}
      <div className="relative z-10 flex flex-col items-center space-y-4 max-w-md text-center">
        <div className="text-xs text-slate-400 tracking-wider">
          STATUS: ORBITAL RENDEZVOUS // {reason}
        </div>

        <button
          onClick={handleStart}
          disabled={isLanding}
          className="px-8 py-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white rounded-full font-bold text-sm tracking-widest border border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.3)] transition duration-200 flex items-center space-x-3 cursor-pointer disabled:opacity-50"
        >
          <span>{isLanding ? 'DESCENDING TO SURFACE...' : 'ENTER PORTFOLIO'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onComplete}
          className="text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
        >
          Skip animation
        </button>
      </div>
    </div>
  );
};
