import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  dustCount?: number;
}

export const Starfield: React.FC<StarfieldProps> = ({
  count = 2200,
  dustCount = 200,
}) => {
  const starsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Multi-tier starfield generation (positions, sizes, colors)
  const { starPositions, starColors, starSizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // Color palettes for stars: cool blue-white, bright white, warm amber
    const palette = [
      new THREE.Color('#94d2bd'),
      new THREE.Color('#e0fbfc'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#fefae0'),
      new THREE.Color('#ee6c4d'),
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a deep sphere surrounding the camera
      const r = 40 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2.2 + 0.8;
    }

    return {
      starPositions: positions,
      starColors: colors,
      starSizes: sizes,
    };
  }, [count]);

  // Foreground drifting cosmic dust particles
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = -Math.random() * 15;
    }
    return pos;
  }, [dustCount]);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
      starsRef.current.rotation.x += delta * 0.002;
    }
    if (dustRef.current) {
      // Drifting dust particles in foreground
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
        positions[i * 3] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.001;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Deep Space Multi-Layer Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.65}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Drifting Dust Particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00f0ff"
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Deep Nebula Gradients (Backdrop Sky Spheres) */}
      <mesh position={[0, 0, -80]}>
        <sphereGeometry args={[110, 24, 24]} />
        <meshBasicMaterial
          color="#080820"
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
