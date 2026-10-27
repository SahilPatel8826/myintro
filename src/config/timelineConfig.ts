export interface TimelineConfig {
  totalDuration: number;
  phases: {
    thrusters: { start: number; duration: number };
    warp: { start: number; duration: number };
    dropout: { start: number; duration: number };
    reentry: { start: number; duration: number };
    landing: { start: number; duration: number };
    reveal: { start: number; duration: number };
  };
  fov: {
    idle: number;
    warpPeak: number;
    dropout: number;
    landing: number;
  };
  shake: {
    idle: number;
    thrusterRamp: number;
    warpRumble: number;
    reentryMax: number;
    touchdown: number;
  };
  postprocessing: {
    bloomIdle: number;
    bloomWarpPeak: number;
    chromaticAberrationWarp: number;
    chromaticAberrationReentry: number;
    reentryHeatVignetteMax: number;
  };
  planet: {
    idleDistance: number;
    dropoutDistance: number;
    entryDistance: number;
    surfaceDistance: number;
  };
  particles: {
    starCount: number;
    dustCount: number;
    warpStreakCount: number;
    fireStreakCount: number;
  };
}

export const TIMELINE_CONFIG: TimelineConfig = {
  totalDuration: 8.2,
  phases: {
    thrusters: { start: 0.0, duration: 0.5 },
    warp: { start: 0.5, duration: 2.0 },
    dropout: { start: 2.5, duration: 2.0 },
    reentry: { start: 4.5, duration: 2.0 },
    landing: { start: 6.5, duration: 1.0 },
    reveal: { start: 7.5, duration: 0.7 },
  },
  fov: {
    idle: 60,
    warpPeak: 110,
    dropout: 65,
    landing: 58,
  },
  shake: {
    idle: 0.03,
    thrusterRamp: 0.15,
    warpRumble: 0.28,
    reentryMax: 0.45,
    touchdown: 0.6,
  },
  postprocessing: {
    bloomIdle: 0.6,
    bloomWarpPeak: 2.8,
    chromaticAberrationWarp: 0.015,
    chromaticAberrationReentry: 0.022,
    reentryHeatVignetteMax: 0.95,
  },
  planet: {
    idleDistance: 24,
    dropoutDistance: 15,
    entryDistance: 6,
    surfaceDistance: 1.8,
  },
  particles: {
    starCount: 2200,
    dustCount: 200,
    warpStreakCount: 450,
    fireStreakCount: 300,
  },
};
