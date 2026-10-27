import React from 'react';
import { Terminal, Play, ArrowUp } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-space-950 py-16 px-4 sm:px-8 border-t border-slate-900 font-mono text-xs shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-900">
        {/* Left: Identity */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg tracking-tight uppercase text-white">
              {PORTFOLIO_CONTENT.personal.name}
            </span>
            <span className="text-slate-500">/// SYS_ID: 0x7E3</span>
          </div>
          <p className="text-slate-400 text-xs font-sans">
            Distributed Systems · High-Throughput Engines · Cloud Infrastructure
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <a href="#hero" className="hover:text-hud-cyan transition-colors">INDEX</a>
          <span className="text-slate-700">•</span>
          <a href="#about" className="hover:text-hud-cyan transition-colors">ABOUT</a>
          <span className="text-slate-700">•</span>
          <a href="#skills" className="hover:text-hud-cyan transition-colors">SKILLS</a>
          <span className="text-slate-700">•</span>
          <a href="#experience" className="hover:text-hud-cyan transition-colors">EXPEDITIONS</a>
          <span className="text-slate-700">•</span>
          <a href="#projects" className="hover:text-hud-cyan transition-colors">ARCHIVES</a>
          <span className="text-slate-700">•</span>
          <a href="#contact" className="hover:text-hud-cyan transition-colors">COMMS</a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-hud-cyan/10 hover:bg-hud-cyan/20 text-hud-cyan border border-hud-cyan/30 transition shadow-sm cursor-pointer"
          >
            <Play className="w-3 h-3 fill-hud-cyan" />
            <span className="font-semibold text-[11px]">REPLAY INTRO</span>
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <span>© 2026 DEEP_SPACE_NODE. ALL CHANNELS SECURED.</span>
        <div className="flex items-center gap-2 text-hud-cyan">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider">LATENCY: 12MS // REGION: US-EAST</span>
        </div>
      </div>
    </footer>
  );
};
