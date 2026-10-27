import React, { useState, useEffect } from 'react';
import { Terminal, Play, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(100, Math.round((currentScroll / totalScroll) * 100)) : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-space-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Callsign Logo */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-hud-cyan/40 flex items-center justify-center text-hud-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:border-hud-cyan transition-all">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-white tracking-tight uppercase group-hover:text-hud-cyan transition-colors">
              {PORTFOLIO_CONTENT.personal.name}
            </span>
            <span className="font-mono text-[10px] text-hud-cyan tracking-widest">
              // BACKEND_ORBITAL
            </span>
          </div>
        </a>

        {/* Status Telemetry (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-slate-400 pl-4 border-l border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold uppercase">SYS: ONLINE</span>
          <span className="text-slate-600">///</span>
          <span className="text-slate-400">TELEMETRY: STABLE</span>
        </div>

        {/* Primary Nav Links (Exact Order: Hero -> About -> Skills -> Experience -> Projects -> Contact) */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/90 p-1.5 rounded-full border border-slate-800/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          {PORTFOLIO_CONTENT.navigation.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-hud-cyan text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.45)]'
                    : 'text-slate-300 hover:text-white hover:bg-surface-container-high'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Mission Sync, Audio, Intro Replay, Socials */}
        <div className="flex items-center gap-3">
          {/* Mission Sync Progress Bar */}
          <div className="hidden md:flex flex-col w-28 gap-1 font-mono text-[10px]">
            <div className="flex items-center justify-between text-slate-400">
              <span>SYNC</span>
              <span className="text-hud-cyan font-bold">{scrollProgress}%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-hud-cyan transition-all duration-150 shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Replay Intro Button */}
          <button
            onClick={onReplayIntro}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-hud-cyan/10 hover:bg-hud-cyan/20 text-hud-cyan text-xs font-mono border border-hud-cyan/40 hover:border-hud-cyan transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)] cursor-pointer"
            title="Replay 3D Cockpit Landing Intro"
          >
            <Play className="w-3 h-3 fill-hud-cyan" />
            <span className="font-semibold">REPLAY INTRO</span>
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/SahilPatel8826"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-slate-400 hover:bg-surface-container-high hover:text-white border border-slate-800 transition shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/sahilpatel8826"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-slate-400 hover:bg-surface-container-high hover:text-hud-cyan border border-slate-800 transition shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Avatar Profile */}
          <img
            src={PORTFOLIO_CONTENT.personal.avatar}
            alt="Sahil Profile"
            className="w-8 h-8 rounded-full object-cover border border-hud-cyan/50 shadow-[0_0_10px_rgba(0,240,255,0.3)] hidden sm:block"
          />
        </div>
      </div>

      {/* Pulsing Scanline Accent Line */}
      <div className="w-full h-0.5 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-hud-cyan to-transparent animate-pulse" />
      </div>
    </header>
  );
};
