import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereEntryProps {
  intensity: number; // 0 to 1
  count?: number;
}

export const AtmosphereEntry: React.FC<AtmosphereEntryProps> = ({
  intensity,
  count = 350,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Fiery plasma particles (orange, golden amber, red-hot)
  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const palette = [
      new THREE.Color('#ff3e00'),
      new THREE.Color('#ff9100'),
      new THREE.Color('#ffda79'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#ff0055'),
    ];

    for (let i = 0; i < count; i++) {
      // Streamlining along the fuselage / windshield
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = -Math.random() * 25;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      spd[i] = 25 + Math.random() * 45;
    }

    return { positions: pos, colors: col, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || intensity <= 0.001) return;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Move sparks violently backwards toward & past camera
      posArray[i * 3 + 2] += speeds[i] * intensity * delta * 2.2;

      // Wrap around
      if (posArray[i * 3 + 2] > 3) {
        posArray[i * 3 + 2] = -25;
        posArray[i * 3] = (Math.random() - 0.5) * 8;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (intensity <= 0.001) return null;

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          vertexColors
          transparent
          opacity={Math.min(1, intensity * 1.5)}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Atmospheric Cloud condensation wisps */}
      <mesh position={[0, -0.2, -3]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial
          color="#ff7b25"
          transparent
          opacity={intensity * 0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
