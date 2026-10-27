import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Download, Play, Zap, Cpu, ShieldCheck, ArrowRight, Sparkles, Terminal, Compass, Eye } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { soundEngine } from '../../audio/soundSystem';

interface HeroProps {
  onReplayIntro: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReplayIntro }) => {
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [showWarpBanner, setShowWarpBanner] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGalaxyWarp = () => {
    if (isWarping) return;
    setIsWarping(true);
    soundEngine.init();
    soundEngine.rampThrusters(0.4);

    // Singularity slingshot sequence
    setTimeout(() => {
      soundEngine.triggerDropOut();
      setShowWarpBanner(true);
    }, 2400);

    setTimeout(() => {
      setIsWarping(false);
    }, 4200);

    setTimeout(() => {
      setShowWarpBanner(false);
    }, 7000);
  };

  const handleDownloadResume = () => {
    soundEngine.init();
    soundEngine.playButtonPress();
    // Trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sahil_Patel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center px-4 sm:px-8 overflow-hidden bg-space-950">
      {/* ========================================================
          CINEMATIC GALAXY BACKGROUND & NEBULAE
      ======================================================== */}
      {/* Deep Space Background Canvas with subtle parallax */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)`,
        }}
      >
        {/* Glowing Violet Nebula (Upper Left & Center) */}
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/12 w-[450px] h-[450px] bg-violet-500/12 rounded-full blur-[140px] pointer-events-none" />

        {/* Electric-Blue Nebula (Right & Bottom Center) */}
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-hud-cyan/15 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Deep Cosmic Starfield Grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:48px_48px] opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:96px_96px] opacity-20" />
      </div>

      {/* ========================================================
          ANIMATED SHOOTING STARS (METEORS)
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shooting-star top-12 left-[15%] w-36" style={{ animationDelay: '0s', animationDuration: '6.5s' }} />
        <div className="shooting-star top-28 left-[45%] w-44" style={{ animationDelay: '2.8s', animationDuration: '7.5s' }} />
        <div className="shooting-star top-1/2 left-[5%] w-32" style={{ animationDelay: '4.5s', animationDuration: '8s' }} />
        <div className="shooting-star top-20 right-[25%] w-40" style={{ animationDelay: '1.4s', animationDuration: '7s' }} />
      </div>

      {/* ========================================================
          FLOATING STARLIGHT MOTES / PARTICLES
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="mote-particle absolute rounded-full bg-hud-cyan"
            style={{
              top: `${15 + (i * 5.5)}%`,
              left: `${8 + (i * 6.5)}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              opacity: 0.35,
              animationDelay: `${(i * 0.45)}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* ========================================================
          FLOATING WARP NOTIFICATION BANNER
      ======================================================== */}
      <AnimatePresence>
        {showWarpBanner && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none max-w-lg w-full px-4"
          >
            <div className="bg-slate-900/95 border border-hud-cyan/60 shadow-[0_0_40px_rgba(0,240,255,0.45)] backdrop-blur-2xl px-6 py-3.5 rounded-2xl flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-hud-cyan/20 flex items-center justify-center text-hud-cyan shrink-0 animate-spin">
                <Zap className="w-5 h-5 text-hud-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-hud-cyan tracking-widest uppercase font-bold">
                  // SINGULARITY JUMP CONFIRMED
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-white">
                  WARP TRAJECTORY COMPLETE // WELCOME TO SECTOR 001
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-hud-cyan animate-ping ml-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 relative z-10">
        {/* ========================================================
            LEFT COLUMN: INTRODUCTION, ROLE, CTAs, METRICS
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col items-start gap-5 text-left"
        >
          {/* Status Indicator Capsule */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high/90 border border-hud-cyan/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-hud-cyan animate-pulse" />
            <span className="font-mono text-[11px] text-hud-cyan tracking-widest uppercase font-semibold">
              TRANSMISSION ACTIVE // ORBITAL NODE
            </span>
          </div>

          {/* Animated Gradient Headline Introduction */}
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm text-slate-400 uppercase tracking-[0.22em] font-medium mb-1">
              {PORTFOLIO_CONTENT.personal.callsign}
            </span>
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-7xl tracking-tight text-white uppercase leading-[1.05]">
              {/* <span className="text-white block sm:inline">Hi, I'm </span> */}
              <span className="animated-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-hud-cyan via-purple-400 to-hud-teal">
                Sahil Patel
              </span>
            </h1>
            <div className="h-1.5 w-40 bg-gradient-to-r from-hud-cyan via-purple-500 to-hud-teal rounded-full mt-2" />
          </div>

          {/* Role Badge: "A Full Stack & Golang Developer" */}
          <div className="bg-gradient-to-r from-slate-900/90 via-surface-container/90 to-slate-900/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-hud-cyan/30 shadow-[0_0_20px_rgba(0,240,255,0.08)]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-hud-cyan animate-pulse" />
              <p className="font-mono text-sm sm:text-base text-slate-100 font-semibold tracking-wide">
                Role: <span className="text-hud-cyan">{PORTFOLIO_CONTENT.personal.role}</span>
              </p>
            </div>
          </div>

          {/* Short Description of Work */}
          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            {PORTFOLIO_CONTENT.personal.missionStatement}
          </p>

          {/* Interactive Galaxy Warp Trigger Button */}
          <div className="w-full max-w-md pt-1">
            <button
              onClick={handleGalaxyWarp}
              disabled={isWarping}
              className="group relative w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-surface-container to-slate-900 border-2 border-hud-cyan text-white font-mono tracking-[0.16em] uppercase flex items-center justify-center gap-3 warp-btn-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-hud-cyan via-purple-500 to-hud-teal rounded-2xl blur-md opacity-45 group-hover:opacity-100 transition duration-500 -z-10" />
              <Rocket className={`w-4 h-4 text-hud-cyan transition-transform duration-700 ${isWarping ? 'animate-spin' : 'group-hover:rotate-45'}`} />
              <span className="font-bold text-xs sm:text-sm tracking-widest text-hud-cyan group-hover:text-white transition-colors">
                {isWarping ? 'WARPING SINGULARITY...' : 'TRAVEL TO MY GALAXY'}
              </span>
              <Zap className="w-4 h-4 text-hud-amber group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Primary Action Buttons: "View My Work" & "Download Resume" */}
          <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
            {/* "View My Work" Button */}
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-hud-cyan text-slate-950 font-bold tracking-widest uppercase hover:shadow-[0_0_28px_rgba(0,240,255,0.7)] transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* "Download Resume" Button */}
            <button
              onClick={handleDownloadResume}
              className="px-6 py-3.5 rounded-full bg-surface-container-high/90 text-white hover:bg-slate-800 hover:text-hud-cyan border border-slate-700 hover:border-hud-cyan/50 tracking-widest uppercase transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4 text-hud-teal" />
              <span>DOWNLOAD RESUME</span>
            </button>

            {/* Replay Intro Button */}
            <button
              onClick={onReplayIntro}
              className="px-5 py-3.5 rounded-full bg-hud-cyan/10 hover:bg-hud-cyan/20 text-hud-cyan border border-hud-cyan/40 tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer"
              title="Replay 3D Cockpit Landing Intro"
            >
              <Play className="w-3.5 h-3.5 fill-hud-cyan" />
              <span>REPLAY INTRO</span>
            </button>
          </div>

          {/* Orbital Telemetry Counters */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg pt-3 font-mono">
            {PORTFOLIO_CONTENT.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container-low/90 backdrop-blur-xl p-3.5 rounded-xl border border-slate-800/80 shadow-md hover:border-hud-cyan/30 transition-colors"
              >
                <div className="text-[10px] text-slate-400 tracking-wider">{stat.label}</div>
                <div className="font-display text-xl sm:text-2xl font-bold text-hud-cyan">
                  {stat.value}{' '}
                  <span className="text-xs text-slate-400 font-normal">{stat.unit}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========================================================
            RIGHT COLUMN: ASTRONAUT OVERLOOKING EARTH & PLANET STAGE
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-lg lg:max-w-xl relative flex items-center justify-center min-h-[460px]"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
          }}
        >
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] rounded-full flex items-center justify-center">
            {/* Outer Orbital Rotating SVG HUD Rings */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" strokeDasharray="6 12" />
              <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="2" strokeDasharray="3 18" />
              <circle cx="200" cy="200" r="142" fill="none" stroke="rgba(0, 229, 188, 0.4)" strokeWidth="1" strokeDasharray="40 70" />
            </svg>

            {/* BLACK HOLE SINGULARITY GATE (Top Right Quadrant) */}
            <div
              onClick={handleGalaxyWarp}
              title="Target Singularity Gateway // Click to Warp"
              className="absolute -top-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 z-30 pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110"
            >
              {/* Accretion Glow */}
              <div className="absolute inset-0 rounded-full accretion-glow bg-gradient-to-tr from-hud-cyan/40 via-purple-500/40 to-hud-amber/50 blur-xl" />
              
              {/* Rotating Discs */}
              <div className="absolute inset-1 rounded-full black-hole-disk border-2 border-dashed border-hud-cyan/60 opacity-80" />
              <div
                className="absolute inset-3 rounded-full black-hole-disk border border-purple-400/70 opacity-90 shadow-[0_0_25px_rgba(168,85,247,0.7)]"
                style={{ animationDirection: 'reverse', animationDuration: '16s' }}
              />
              
              {/* Event Horizon & Core */}
              <div className="absolute inset-7 rounded-full border-2 border-hud-cyan shadow-[0_0_20px_rgba(0,240,255,0.85)] animate-pulse" />
              <div className="absolute inset-10 rounded-full bg-slate-950 border border-black shadow-[inset_0_0_15px_#000000] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-black shadow-[0_0_12px_rgba(0,0,0,1)]" />
              </div>

              {/* Black Hole Label */}
              
            </div>

            {/* ASTRONAUT OVERLOOKING EARTH - HOLOGRAPHIC COMPOSITE VIEWPORT */}
            <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_90px_rgba(0,240,255,0.35)] border-2 border-hud-cyan/40 bg-slate-950 z-10 flex items-center justify-center group">
              {/* Background Planet (Earth / Exoplanet) */}
              <img
                src={PORTFOLIO_CONTENT.personal.planetImage}
                alt="Earth & Exoplanet View"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen scale-110 opacity-70 group-hover:scale-115 transition-transform duration-1000"
              />

              {/* Glowing Atmosphere Rim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-space-950/90 via-transparent to-hud-cyan/30" />

              {/* Foreground Astronaut Overlooking Earth */}
             
            </div>

            {/* INTERACTIVE HIGH-TECH SCOUT SPACESHIP (Sahil-01) */}
            <div
              onClick={handleGalaxyWarp}
              title="Sahil-01 Scout Vessel // Click to Engage Thrusters"
              className={`absolute left-0 bottom-10 z-30 transition-all duration-1000 cursor-pointer group ${
                isWarping ? 'translate-x-52 -translate-y-52 scale-50 rotate-45' : 'ship-idle-animation'
              }`}
            >
              {/* Thruster Flame */}
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-b from-hud-cyan via-purple-500 to-transparent rounded-full thruster-plume transition-all duration-300 ${
                isWarping ? 'w-8 h-16 blur-sm' : 'w-5 h-8 blur-[1px]'
              }`} />

              {/* Spaceship Vector Hull */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_16px_rgba(0,240,255,0.7)] group-hover:scale-110 transition-transform">
                <svg className="w-full h-full fill-none" viewBox="0 0 100 100">
                  <path d="M 50 2 C 75 25, 75 75, 50 98 C 25 75, 25 25, 50 2" stroke="rgba(0,240,255,0.3)" strokeDasharray="4 6" strokeWidth="1.5" className="animate-pulse" />
                  <polygon points="50,15 15,75 32,70" fill="#111827" stroke="#00f0ff" strokeWidth="1.8" />
                  <polygon points="50,15 85,75 68,70" fill="#111827" stroke="#a855f7" strokeWidth="1.8" />
                  <polygon points="50,8 64,68 50,78 36,68" fill="#030712" stroke="#e2e8f0" strokeWidth="2" />
                  <polygon points="50,22 56,42 50,48 44,42" fill="#00f0ff" />
                  <rect x="40" y="74" width="6" height="5" rx="1" fill="#00f0ff" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="54" y="74" width="6" height="5" rx="1" fill="#a855f7" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="50" y1="48" x2="50" y2="70" stroke="#ffb703" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Call-sign Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-space-950/90 border border-hud-cyan/40 text-hud-cyan text-[8px] font-mono px-1.5 py-0.2 rounded whitespace-nowrap shadow-sm group-hover:border-hud-cyan transition-colors">
                SHIP: SAHIL-01
              </div>
            </div>

            {/* Floating Glassmorphism Micro-Telemetry Badges */}
            <div className="absolute -top-3 left-4 bg-surface-container-high/90 border border-hud-cyan/30 backdrop-blur-xl px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2 z-20 font-mono text-[10px]">
              <Cpu className="w-3.5 h-3.5 text-hud-cyan" />
              <div className="flex flex-col text-left">
                <span className="text-slate-400">ENGINE_CORE</span>
                <span className="text-white font-semibold">GOROUTINE POOL // 99.9%</span>
              </div>
            </div>

            <div className="absolute -bottom-4 right-6 bg-surface-container-high/90 border border-purple-500/30 backdrop-blur-xl px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2 z-20 font-mono text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <div className="flex flex-col text-left">
                <span className="text-slate-400">DISTRIBUTED FABRIC</span>
                <span className="text-white font-semibold">RAFT QUORUM: ACTIVE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
