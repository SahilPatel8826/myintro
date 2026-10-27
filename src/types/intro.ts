export type SequencePhase = 
  | 'idle' 
  | 'thrusters' 
  | 'warp' 
  | 'dropout' 
  | 'reentry' 
  | 'landing' 
  | 'reveal' 
  | 'done';

export interface TelemetryData {
  altitudeKm: number;
  velocityKmS: number;
  gForce: number;
  heatPercentage: number;
  warpFactor: number;
  statusMessage: string;
}

export interface IntroContextState {
  phase: SequencePhase;
  progress: number; // 0 to 1 overall
  time: number; // current timeline seconds
  altitude: number; // in km
  velocity: number; // in km/s
  cameraFov: number;
  shakeIntensity: number;
  warpIntensity: number; // 0 to 1
  reentryIntensity: number; // 0 to 1
  flashIntensity: number; // 0 to 1 whiteout flash
  cockpitSlideOffset: number; // 0 to 100% sliding away at reveal
  isMuted: boolean;
  quality: 'high' | 'medium' | 'low';
  reducedMotion: boolean;
}
