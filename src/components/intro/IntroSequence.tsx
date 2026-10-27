import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { SceneCanvas } from './SceneCanvas';
import { HUD } from './HUD';
import { FallbackIntro } from './FallbackIntro';
import { IntroContextState, SequencePhase } from '../../types/intro';
import { TIMELINE_CONFIG } from '../../config/timelineConfig';
import { soundEngine } from '../../audio/soundSystem';

interface IntroSequenceProps {
  onComplete: () => void;
}

// WebGL capability check
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  });

  // Mouse / Pointer Parallax normalized coordinates (-1 to 1)
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Main intro context state (Audio enabled by default)
  const [introState, setIntroState] = useState<IntroContextState>({
    phase: 'idle',
    progress: 0,
    time: 0,
    altitude: 120450,
    velocity: 11.2,
    cameraFov: TIMELINE_CONFIG.fov.idle,
    shakeIntensity: TIMELINE_CONFIG.shake.idle,
    warpIntensity: 0,
    reentryIntensity: 0,
    flashIntensity: 0,
    cockpitSlideOffset: 0,
    isMuted: false,
    quality: 'high',
    reducedMotion: false,
  });

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animProxyRef = useRef({
    time: 0,
    progress: 0,
    altitude: 120450,
    velocity: 11.2,
    cameraFov: 60,
    shakeIntensity: 0.03,
    warpIntensity: 0,
    reentryIntensity: 0,
    flashIntensity: 0,
    cockpitSlideOffset: 0,
  });

  // Verify WebGL & performance capabilities on mount, start audio automatically
  useEffect(() => {
    const webglOk = isWebGLAvailable();
    setHasWebGL(webglOk);

    // Adaptive quality detection
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      setIntroState((prev) => ({ ...prev, quality: 'medium' }));
    }

    // Initialize audio automatically on intro mount
    soundEngine.init();

    // Ready after short buffer
    const timer = setTimeout(() => {
      setIsReady(true);
      soundEngine.init();
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Parallax pointer tracking
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setPointer({ x, y });
  }, []);

  // Master Launch Sequence triggered on button click
  const handleInitiateLanding = useCallback(() => {
    if (introState.phase !== 'idle') return;

    // Trigger button sound
    soundEngine.playButtonPress();

    if (reducedMotion) {
      // Respect prefers-reduced-motion: replace flight with short fade transition
      setIntroState((prev) => ({ ...prev, phase: 'landing', flashIntensity: 1 }));
      setTimeout(() => {
        onComplete();
      }, 700);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        soundEngine.dispose();
        onComplete();
      },
    });
    timelineRef.current = tl;

    const proxy = animProxyRef.current;
    const { phases, fov, shake } = TIMELINE_CONFIG;

    // Helper to sync GSAP values with React state
    const updateReactState = (currentPhase: SequencePhase) => {
      setIntroState((prev) => ({
        ...prev,
        phase: currentPhase,
        time: proxy.time,
        progress: proxy.progress,
        altitude: proxy.altitude,
        velocity: proxy.velocity,
        cameraFov: proxy.cameraFov,
        shakeIntensity: proxy.shakeIntensity,
        warpIntensity: proxy.warpIntensity,
        reentryIntensity: proxy.reentryIntensity,
        flashIntensity: proxy.flashIntensity,
        cockpitSlideOffset: proxy.cockpitSlideOffset,
      }));
    };

    // -------------------------------------------------------------
    // 1. 0.0s: HUD flashes, thrusters engage, cockpit shakes
    // -------------------------------------------------------------
    tl.to(proxy, {
      duration: phases.thrusters.duration,
      time: phases.thrusters.duration,
      progress: 0.08,
      shakeIntensity: shake.thrusterRamp,
      flashIntensity: 0.35,
      ease: 'power2.in',
      onStart: () => {
        soundEngine.rampThrusters(phases.thrusters.duration);
        updateReactState('thrusters');
      },
      onUpdate: () => updateReactState('thrusters'),
    });

    // -------------------------------------------------------------
    // 2. 0.5 - 2.5s: Hyperspeed Warp (Warp streaks, FOV 60 -> 110, rumble)
    // -------------------------------------------------------------
    tl.to(proxy, {
      duration: phases.warp.duration,
      time: phases.thrusters.duration + phases.warp.duration,
      progress: 0.38,
      cameraFov: fov.warpPeak,
      warpIntensity: 1.0,
      shakeIntensity: shake.warpRumble,
      velocity: 88.5,
      flashIntensity: 0,
      ease: 'power3.inOut',
      onStart: () => {
        soundEngine.setWarpIntensity(1.0);
        updateReactState('warp');
      },
      onUpdate: () => {
        soundEngine.setWarpIntensity(proxy.warpIntensity);
        updateReactState('warp');
      },
    });

    // -------------------------------------------------------------
    // 3. 2.5 - 4.5s: Drop out of warp with white flash, planet rushes
    // -------------------------------------------------------------
    tl.to(proxy, {
      duration: 0.15,
      flashIntensity: 1.0,
      warpIntensity: 0,
      onStart: () => {
        soundEngine.triggerDropOut();
        soundEngine.setWarpIntensity(0);
      },
      onUpdate: () => updateReactState('dropout'),
    });

    tl.to(proxy, {
      duration: phases.dropout.duration - 0.15,
      time: 4.5,
      progress: 0.68,
      cameraFov: fov.dropout,
      flashIntensity: 0,
      altitude: 12500,
      velocity: 28.4,
      shakeIntensity: 0.12,
      ease: 'power2.out',
      onStart: () => updateReactState('dropout'),
      onUpdate: () => updateReactState('dropout'),
    });

    // -------------------------------------------------------------
    // 4. 4.5 - 6.5s: Atmospheric entry (heat glow, plasma streaks, strong shake)
    // -------------------------------------------------------------
    tl.to(proxy, {
      duration: phases.reentry.duration,
      time: 6.5,
      progress: 0.88,
      reentryIntensity: 1.0,
      shakeIntensity: shake.reentryMax,
      altitude: 850,
      velocity: 7.2,
      ease: 'power2.inOut',
      onStart: () => {
        soundEngine.setReentryIntensity(1.0);
        updateReactState('reentry');
      },
      onUpdate: () => {
        soundEngine.setReentryIntensity(proxy.reentryIntensity);
        updateReactState('reentry');
      },
    });

    // -------------------------------------------------------------
    // 5. 6.5 - 7.5s: Cloud breakthrough, approach runway, landing thud
    // -------------------------------------------------------------
    tl.to(proxy, {
      duration: phases.landing.duration,
      time: 7.5,
      progress: 0.98,
      reentryIntensity: 0,
      altitude: 0,
      velocity: 0,
      cameraFov: fov.landing,
      shakeIntensity: 0.02,
      ease: 'power3.out',
      onStart: () => {
        updateReactState('landing');
        setTimeout(() => {
          soundEngine.triggerLandingThud();
        }, 700);
      },
      onUpdate: () => updateReactState('landing'),
    });

    // -------------------------------------------------------------
    // 6. 7.5s+: Fade to bright white/sky, cockpit frame slides away
    // -------------------------------------------------------------
    tl.to(proxy, {
      duration: phases.reveal.duration,
      time: TIMELINE_CONFIG.totalDuration,
      progress: 1.0,
      cockpitSlideOffset: 1.0,
      flashIntensity: 0.95,
      ease: 'power2.inOut',
      onStart: () => updateReactState('reveal'),
      onUpdate: () => updateReactState('reveal'),
    });
  }, [introState.phase, onComplete, reducedMotion]);

  // Fallback if WebGL is unavailable
  if (!hasWebGL) {
    return <FallbackIntro onComplete={onComplete} reason="WebGL Not Supported" />;
  }

  // Preloader / initial safety guard
  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-space-950 flex flex-col items-center justify-center font-mono text-cyan-400 z-50">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
        <div className="text-xs tracking-widest uppercase animate-pulse">
          INITIALIZING COCKPIT AVIONICS...
        </div>
      </div>
    );
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-screen h-screen overflow-hidden bg-space-950 select-none cursor-default"
    >
      {/* 3D Scene Viewport */}
      <SceneCanvas introState={introState} pointer={pointer} />

      {/* Sci-Fi Cockpit Heads-Up Display */}
      <HUD
        introState={introState}
        onInitiateLanding={handleInitiateLanding}
        pointer={pointer}
      />


    </div>
  );
};
