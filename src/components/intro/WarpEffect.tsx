import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WarpEffectProps {
  intensity: number; // 0 to 1
  count?: number;
}

export const WarpEffect: React.FC<WarpEffectProps> = ({
  intensity,
  count = 450,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initial random positions and speeds for warp lines
  const streaks = useMemo(() => {
    return Array.from({ length: count }, () => {
      // Cylindrical distribution radiating outward from center
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.pow(Math.random(), 1.5) * 16;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: -Math.random() * 80,
        speed: 40 + Math.random() * 60,
        length: 2 + Math.random() * 8,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current || intensity <= 0.001) return;

    for (let i = 0; i < count; i++) {
      const streak = streaks[i];

      // Move streak toward camera based on intensity
      streak.z += streak.speed * intensity * delta * 2.8;

      // Wrap around when past camera
      if (streak.z > 5) {
        streak.z = -75;
      }

      dummy.position.set(streak.x, streak.y, streak.z);
      // Stretch cylinder along Z axis proportionally to intensity
      const stretchZ = streak.length * (1 + intensity * 6);
      dummy.scale.set(0.02, 0.02, stretchZ);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (intensity <= 0.001) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <cylinderGeometry args={[1, 1, 1, 6]} />
      <meshBasicMaterial
        color="#a5f3fc"
        transparent
        opacity={Math.min(1, intensity * 1.2)}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
