import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, ShieldCheck, Zap, Activity, Compass, Flame } from 'lucide-react';
import { IntroContextState } from '../../types/intro';

interface HUDProps {
  introState: IntroContextState;
  onInitiateLanding: () => void;
  pointer: { x: number; y: number };
}

export const HUD: React.FC<HUDProps> = ({
  introState,
  onInitiateLanding,
  pointer,
}) => {
  const { phase, altitude, velocity, warpIntensity, reentryIntensity, flashIntensity } = introState;
  const isIdle = phase === 'idle';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  // Magnetic hover effect on INITIATE LANDING button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !isIdle) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.35;
    const distY = (e.clientY - centerY) * 0.35;
    setMagneticOffset({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Status message determined by phase
  const getStatusText = () => {
    switch (phase) {
      case 'idle':
        return 'ALL SYSTEMS NOMINAL';
      case 'thrusters':
        return 'ENGAGING THRUSTERS';
      case 'warp':
        return 'HYPERSPACE DRIVE ENGAGED';
      case 'dropout':
        return 'WARP DROPOUT // ORBITAL INTERCEPT';
      case 'reentry':
        return 'ATMOSPHERIC INGRESS // THERMAL MAX';
      case 'landing':
        return 'APPROACH VECTOR LOCKED // TOUCHDOWN';
      case 'reveal':
      case 'done':
        return 'SYSTEM DEPLOYED // WELCOME';
      default:
        return 'INITIALIZING...';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-10 font-mono select-none overflow-hidden scanlines">
      {/* ========================================================
          FULL-SCREEN DYNAMIC VFX OVERLAYS (Flash & Heat Glow)
      ======================================================== */}
      {/* 1. Whiteout Drop-out / Reveal Flash */}
      <div
        className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-75"
        style={{
          opacity: flashIntensity,
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Atmospheric Entry Heat Glow Vignette (Red/Orange hot borders) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          opacity: Math.min(1, reentryIntensity * 1.3),
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255, 60, 0, 0.45) 80%, rgba(255, 120, 0, 0.8) 100%)',
          boxShadow: 'inset 0 0 120px rgba(255, 80, 0, 0.7)',
        }}
      />

      {/* ========================================================
          TOP HUD BAR: Flight Telemetry & System Status
      ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between w-full max-w-7xl mx-auto"
      >
        {/* Left Telemetry Cluster */}
        <div className="flex items-center space-x-4 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/30 text-xs text-cyan-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-light">NAV:</span>
            <span className="font-semibold text-emerald-400">ONLINE</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">CORE:</span>
            <span className="text-cyan-300">
              {warpIntensity > 0 ? `${(warpIntensity * 9.9).toFixed(1)}c` : 'SUBLIGHT'}
            </span>
          </div>
          {reentryIntensity > 0 && (
            <>
              <span className="text-slate-600">|</span>
              <div className="flex items-center space-x-1 text-orange-400 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                <span>{(reentryIntensity * 2800).toFixed(0)}°C</span>
              </div>
            </>
          )}
        </div>

        {/* Center Live Mission Status Banner */}
        <div className="hidden sm:flex flex-col items-center">
          <div className="text-[10px] tracking-widest text-slate-500 uppercase">
            Trajectory Computer v4.2
          </div>
          <div className="flex items-center space-x-2 mt-0.5">
            <div
              className={`w-2 h-2 rounded-full ${
                reentryIntensity > 0
                  ? 'bg-orange-500 animate-ping'
                  : warpIntensity > 0
                  ? 'bg-cyan-400 animate-ping'
                  : 'bg-emerald-400 animate-pulse'
              }`}
            />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-200 hud-glow-text">
              {getStatusText()}
            </span>
          </div>
        </div>

        {/* Right Coordinate & Heading Cluster */}
        <div className="flex items-center space-x-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/30 text-xs text-cyan-400">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '24s' }} />
          <span className="text-slate-300 font-medium">BEARING: 042° // ELEV: -14°</span>
        </div>
      </motion.div>

      {/* ========================================================
          CENTER HUD RETICLE & ARTIFICIAL HORIZON
      ======================================================== */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Parallax Flight Reticle */}
        <motion.div
          animate={{
            x: pointer.x * 25,
            y: pointer.y * 20,
            opacity: phase === 'reveal' ? 0 : 0.85,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative flex items-center justify-center w-52 h-52 pointer-events-none"
        >
          {/* Outer Crosshair Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/25 border-dashed animate-spin" style={{ animationDuration: '40s' }} />
          
          {/* Segmented Horizon Marks */}
          <div className="absolute w-44 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute h-44 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
          
          <Crosshair className="w-10 h-10 text-cyan-300/80 stroke-1" />

          {/* Artificial horizon pitch brackets */}
          <div className="absolute left-2 w-4 h-8 border-l border-t border-b border-cyan-400/40" />
          <div className="absolute right-2 w-4 h-8 border-r border-t border-b border-cyan-400/40" />
        </motion.div>

        {/* Dynamic Flight Telemetry Columns (Left: Altitude, Right: Velocity) */}
        <motion.div
          animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
          className="absolute inset-x-8 sm:inset-x-16 flex justify-between items-center text-xs"
        >
          {/* Left: Altitude Tape */}
          <div className="bg-slate-950/60 backdrop-blur-sm p-3 rounded border-l-2 border-cyan-400 text-left">
            <div className="text-[10px] text-slate-400 tracking-wider">ALTITUDE</div>
            <div className="text-lg sm:text-xl font-bold text-cyan-300 tabular-nums">
              {altitude.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <span className="text-xs font-normal text-slate-400 ml-1">KM</span>
            </div>
            <div className="w-20 h-1 bg-slate-800 rounded mt-1 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-100"
                style={{ width: `${Math.min(100, (altitude / 120450) * 100)}%` }}
              />
            </div>
          </div>

          {/* Right: Velocity Tape */}
          <div className="bg-slate-950/60 backdrop-blur-sm p-3 rounded border-r-2 border-cyan-400 text-right">
            <div className="text-[10px] text-slate-400 tracking-wider">VELOCITY</div>
            <div className="text-lg sm:text-xl font-bold text-cyan-300 tabular-nums">
              {velocity.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              <span className="text-xs font-normal text-slate-400 ml-1">KM/S</span>
            </div>
            <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-400 mt-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>G-FORCE: {introState.shakeIntensity > 0.2 ? '4.8G' : '1.0G'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          BOTTOM HUD: "INITIATE LANDING" Pulsing Magnetic Button
      ======================================================== */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto pb-6 sm:pb-8">
        <AnimatePresence>
          {isIdle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative pointer-events-auto"
            >
              {/* Outer Pulsing Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse transition duration-1000" />

              {/* Main Interactive Button with Magnetic Physics */}
              <motion.button
                ref={buttonRef}
                onClick={onInitiateLanding}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: magneticOffset.x, y: magneticOffset.y }}
                transition={{ type: 'spring', damping: 15, stiffness: 250 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-8 py-4 sm:px-10 sm:py-4.5 bg-slate-950/90 text-cyan-300 rounded-full font-bold text-sm sm:text-base tracking-widest border border-cyan-400/70 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.85)] hover:text-white hover:border-cyan-300 transition-all duration-200 group flex items-center space-x-3 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping group-hover:bg-white" />
                <span className="hud-glow-text font-display">INITIATE LANDING</span>
                <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                  ENTER
                </span>
              </motion.button>

              <div className="text-center text-[11px] text-slate-400 mt-3 font-mono tracking-wider flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span>APPROACH VECTOR COMPUTED • READY FOR DESCENT</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Sequence Status when active */}
        {!isIdle && phase !== 'reveal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-cyan-500/40 text-cyan-300 text-xs tracking-wider"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">{getStatusText()}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
