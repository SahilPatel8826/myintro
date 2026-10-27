/**
 * Procedural Web Audio API sound synthesizer for cinematic spaceship sequence.
 * Requires zero external audio files. 100% reliable, zero network latency.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false; // Enabled by default as requested
  
  // Continuous audio nodes for modulation
  private ambientGain: GainNode | null = null;
  private warpGain: GainNode | null = null;
  private warpOsc: OscillatorNode | null = null;
  private warpFilter: BiquadFilterNode | null = null;
  private reentryGain: GainNode | null = null;
  private reentryFilter: BiquadFilterNode | null = null;
  private isInitialized = false;

  public init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.setupContinuousNodes();
      this.isInitialized = true;

      // Gracefully handle browser autoplay policies: auto-resume on first interaction
      if (this.ctx.state === 'suspended') {
        const unlockAudio = () => {
          if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }
          window.removeEventListener('pointerdown', unlockAudio);
          window.removeEventListener('keydown', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
          window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
        window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
        window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
        window.addEventListener('click', unlockAudio, { once: true, passive: true });
      }
    } catch (e) {
      console.warn("Web Audio API graceful initialization fallback", e);
    }
  }

  private setupContinuousNodes() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Ambient Cockpit Drone (low sine + filtered warmth)
    const droneOsc1 = this.ctx.createOscillator();
    const droneOsc2 = this.ctx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc2.type = 'sine';
    droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
    droneOsc2.frequency.setValueAtTime(110, this.ctx.currentTime);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    droneOsc1.connect(droneFilter);
    droneOsc2.connect(droneFilter);
    droneFilter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    droneOsc1.start();
    droneOsc2.start();

    // 2. Warp Synth (Ramping tone + noise)
    this.warpOsc = this.ctx.createOscillator();
    this.warpOsc.type = 'sawtooth';
    this.warpOsc.frequency.setValueAtTime(80, this.ctx.currentTime);

    this.warpFilter = this.ctx.createBiquadFilter();
    this.warpFilter.type = 'bandpass';
    this.warpFilter.Q.setValueAtTime(3, this.ctx.currentTime);
    this.warpFilter.frequency.setValueAtTime(300, this.ctx.currentTime);

    this.warpGain = this.ctx.createGain();
    this.warpGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.warpOsc.connect(this.warpFilter);
    this.warpFilter.connect(this.warpGain);
    this.warpGain.connect(this.masterGain);
    this.warpOsc.start();

    // 3. Atmospheric Roar (Noise buffer generator)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.reentryFilter = this.ctx.createBiquadFilter();
    this.reentryFilter.type = 'lowpass';
    this.reentryFilter.frequency.setValueAtTime(350, this.ctx.currentTime);

    this.reentryGain = this.ctx.createGain();
    this.reentryGain.gain.setValueAtTime(0, this.ctx.currentTime);

    whiteNoise.connect(this.reentryFilter);
    this.reentryFilter.connect(this.reentryGain);
    this.reentryGain.connect(this.masterGain);
    whiteNoise.start();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }
    if (this.masterGain) {
      const targetGain = muted ? 0 : 0.65;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.1);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Sound effects triggered during timeline progression
   */
  public playButtonPress() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public rampThrusters(duration: number = 0.5) {
    if (!this.ctx || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.cancelScheduledValues(now);
    this.ambientGain.gain.linearRampToValueAtTime(0.4, now + duration);
  }

  public setWarpIntensity(intensity: number) {
    if (!this.ctx || !this.warpGain || !this.warpOsc || !this.warpFilter) return;
    const now = this.ctx.currentTime;
    // Frequency shifts from 80Hz up to 900Hz
    this.warpOsc.frequency.setValueAtTime(80 + intensity * 820, now);
    this.warpFilter.frequency.setValueAtTime(300 + intensity * 2400, now);
    this.warpGain.gain.setValueAtTime(intensity * 0.45, now);
  }

  public triggerDropOut() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Sub-bass boom & descending resonance
    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boomOsc.type = 'triangle';
    boomOsc.frequency.setValueAtTime(220, now);
    boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.7);

    boomGain.gain.setValueAtTime(0.65, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    boomOsc.connect(boomGain);
    boomGain.connect(this.masterGain);
    boomOsc.start(now);
    boomOsc.stop(now + 0.9);
  }

  public setReentryIntensity(intensity: number) {
    if (!this.ctx || !this.reentryGain || !this.reentryFilter) return;
    const now = this.ctx.currentTime;
    // Roar filter opens up with intensity
    this.reentryFilter.frequency.setValueAtTime(250 + intensity * 1400, now);
    this.reentryGain.gain.setValueAtTime(intensity * 0.55, now);
  }

  public triggerLandingThud() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Heavy landing punch
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(90, now);
    thudOsc.frequency.exponentialRampToValueAtTime(28, now + 0.45);

    thudGain.gain.setValueAtTime(0.7, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    thudOsc.connect(thudGain);
    thudGain.connect(this.masterGain);
    thudOsc.start(now);
    thudOsc.stop(now + 0.6);

    // Fade continuous sounds down
    if (this.reentryGain) {
      this.reentryGain.gain.linearRampToValueAtTime(0, now + 0.4);
    }
    if (this.warpGain) {
      this.warpGain.gain.linearRampToValueAtTime(0, now + 0.2);
    }
  }

  public dispose() {
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch (e) {
        // ignore
      }
    }
    this.ctx = null;
    this.isInitialized = false;
  }
}

export const soundEngine = new SoundEngine();
