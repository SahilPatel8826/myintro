import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { WarpEffect } from './WarpEffect';
import { AtmosphereEntry } from './AtmosphereEntry';
import { Cockpit } from './Cockpit';
import { IntroContextState } from '../../types/intro';
import { TIMELINE_CONFIG } from '../../config/timelineConfig';

interface SceneCanvasProps {
  introState: IntroContextState;
  pointer: { x: number; y: number };
}

// Camera Controller that updates FOV, sway, shake, and look-at
const CameraController: React.FC<{
  introState: IntroContextState;
  pointer: { x: number; y: number };
}> = ({ introState, pointer }) => {
  const { camera } = useThree();
  const baseFovRef = useRef(60);

  useEffect(() => {
    if ('fov' in camera) {
      baseFovRef.current = (camera as THREE.PerspectiveCamera).fov;
    }
  }, [camera]);

  useFrame(() => {
    if (!('fov' in camera)) return;
    const perspCamera = camera as THREE.PerspectiveCamera;

    // Smooth FOV interpolation based on intro state
    if (perspCamera.fov !== introState.cameraFov) {
      perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, introState.cameraFov, 0.15);
      perspCamera.updateProjectionMatrix();
    }

    // Camera breathing sway & mouse parallax
    const swayX = Math.sin(introState.time * 0.7) * 0.02;
    const swayY = Math.cos(introState.time * 0.5) * 0.015;

    const shakeX = (Math.random() - 0.5) * introState.shakeIntensity * 0.08;
    const shakeY = (Math.random() - 0.5) * introState.shakeIntensity * 0.08;

    camera.position.x = pointer.x * 0.08 + swayX + shakeX;
    camera.position.y = pointer.y * 0.06 + swayY + shakeY;
    camera.position.z = 0;

    camera.lookAt(pointer.x * 0.04, pointer.y * 0.03, -10);
  });

  return null;
};

// Post-processing effects that dynamically react to timeline state
const PostEffects: React.FC<{ introState: IntroContextState }> = ({ introState }) => {
  const { warpIntensity, reentryIntensity, flashIntensity } = introState;

  // Calculate bloom intensity based on warp and whiteout flash
  const bloomIntensity = TIMELINE_CONFIG.postprocessing.bloomIdle +
    warpIntensity * (TIMELINE_CONFIG.postprocessing.bloomWarpPeak - TIMELINE_CONFIG.postprocessing.bloomIdle) +
    flashIntensity * 3.5;

  // Chromatic aberration offset
  const chromaticVal = (warpIntensity * TIMELINE_CONFIG.postprocessing.chromaticAberrationWarp) +
    (reentryIntensity * TIMELINE_CONFIG.postprocessing.chromaticAberrationReentry);

  const chromaticOffset = useRef(new THREE.Vector2(0, 0));
  chromaticOffset.current.set(chromaticVal, chromaticVal);

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.25}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={chromaticOffset.current}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.85 + reentryIntensity * 0.4}
      />
    </EffectComposer>
  );
};

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ introState, pointer }) => {
  // Determine planet distance dynamically from intro state progress
  const planetDistance = THREE.MathUtils.lerp(
    TIMELINE_CONFIG.planet.idleDistance,
    TIMELINE_CONFIG.planet.surfaceDistance,
    Math.pow(introState.progress, 1.8)
  );

  return (
    <div className="relative w-full h-full select-none">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 350 }}
        dpr={[1, 2]} // Performance: capped at 2
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={['#030712']} />
        
        <CameraController introState={introState} pointer={pointer} />

        {/* 1. Deep-space multi-layer starfield */}
        <Starfield
          count={introState.quality === 'low' ? 1000 : TIMELINE_CONFIG.particles.starCount}
          dustCount={introState.quality === 'low' ? 80 : TIMELINE_CONFIG.particles.dustCount}
        />

        {/* 2. Detailed 3D procedural Planet */}
        <Planet distance={planetDistance} />

        {/* 3. Hyperspace Warp streaking particles */}
        <WarpEffect
          intensity={introState.warpIntensity}
          count={introState.quality === 'low' ? 200 : TIMELINE_CONFIG.particles.warpStreakCount}
        />

        {/* 4. Atmospheric re-entry plasma fire streaks */}
        <AtmosphereEntry
          intensity={introState.reentryIntensity}
          count={introState.quality === 'low' ? 150 : TIMELINE_CONFIG.particles.fireStreakCount}
        />

        {/* 5. 3D Spaceship Cockpit interior frame */}
        <Cockpit
          pointerOffset={pointer}
          shakeIntensity={introState.shakeIntensity}
          slideOffset={introState.cockpitSlideOffset}
          time={introState.time}
        />

        {/* 6. Post-processing stack */}
        {introState.quality !== 'low' && <PostEffects introState={introState} />}
      </Canvas>
    </div>
  );
};
