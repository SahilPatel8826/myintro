import React from 'react';
import { Volume2, VolumeX, FastForward, Eye } from 'lucide-react';
import { soundEngine } from '../../audio/soundSystem';

interface IntroControlsProps {
  onSkip: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion?: () => void;
}

export const IntroControls: React.FC<IntroControlsProps> = ({
  onSkip,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  return (
    <div className="absolute top-6 right-6 z-30 flex items-center space-x-3 pointer-events-auto select-none">
      {/* Audio Toggle (Mute / Unmute) */}
      <button
        onClick={() => {
          soundEngine.init();
          onToggleMute();
        }}
        className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-200 shadow-lg cursor-pointer group flex items-center space-x-2 text-xs font-mono"
        title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
        )}
        <span className="hidden sm:inline text-[11px] font-medium">
          {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
        </span>
      </button>

      {/* Reduced Motion Toggle / Indicator */}
      {onToggleReducedMotion && (
        <button
          onClick={onToggleReducedMotion}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg cursor-pointer flex items-center space-x-1.5 text-xs font-mono border ${
            reducedMotion
              ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
              : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle Reduced Motion"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden md:inline text-[11px]">
            {reducedMotion ? 'MOTION: REDUCED' : 'FULL FX'}
          </span>
        </button>
      )}

      {/* Skip Intro Button */}
      <button
        onClick={onSkip}
        className="px-4 py-2 rounded-full bg-cyan-950/70 hover:bg-cyan-900/90 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-md transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer flex items-center space-x-2 text-xs font-mono font-semibold"
      >
        <span>SKIP INTRO</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
