import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CockpitProps {
  pointerOffset: { x: number; y: number };
  shakeIntensity: number;
  slideOffset: number; // 0 to 1, slides cockpit away at reveal
  time: number;
}

export const Cockpit: React.FC<CockpitProps> = ({
  pointerOffset,
  shakeIntensity,
  slideOffset,
  time,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ledRef1 = useRef<THREE.MeshStandardMaterial>(null);
  const ledRef2 = useRef<THREE.MeshStandardMaterial>(null);
  const ledRef3 = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // 1. Natural cockpit breathing/idle sway motion
    const swayX = Math.sin(time * 0.8) * 0.015;
    const swayY = Math.cos(time * 0.6) * 0.012;

    // 2. Mouse/touch parallax response (subtle tilt & shift)
    const targetX = pointerOffset.x * 0.12 + swayX;
    const targetY = -pointerOffset.y * 0.08 + swayY;

    // 3. Dynamic shake / vibration applied to cockpit frame
    const shakeX = (Math.random() - 0.5) * shakeIntensity * 0.18;
    const shakeY = (Math.random() - 0.5) * shakeIntensity * 0.18;
    const shakeZ = (Math.random() - 0.5) * shakeIntensity * 0.12;

    // 4. Reveal phase slide away (downwards and slightly back)
    const slideY = -slideOffset * 4.5;
    const slideZ = -slideOffset * 1.5;

    groupRef.current.position.set(
      targetX + shakeX,
      targetY + shakeY + slideY,
      -1.4 + shakeZ + slideZ
    );

    groupRef.current.rotation.set(
      -pointerOffset.y * 0.05 + (Math.random() - 0.5) * shakeIntensity * 0.05,
      pointerOffset.x * 0.05 + (Math.random() - 0.5) * shakeIntensity * 0.05,
      (Math.random() - 0.5) * shakeIntensity * 0.03
    );

    // Blinking cockpit avionics indicator LEDs
    if (ledRef1.current) {
      ledRef1.current.emissiveIntensity = Math.sin(time * 4) > 0.1 ? 2.5 : 0.2;
    }
    if (ledRef2.current) {
      ledRef2.current.emissiveIntensity = Math.sin(time * 6 + 1.2) > 0 ? 3.0 : 0.1;
    }
    if (ledRef3.current) {
      ledRef3.current.emissiveIntensity = Math.cos(time * 3 + 2.5) > -0.2 ? 2.0 : 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.4]}>
      {/* ========================================================
          COCKPIT DASHBOARD & LOWER CONSOLE PANELS
      ======================================================== */}
      {/* Main bottom console block */}
      <mesh position={[0, -1.05, 0]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[3.8, 0.7, 0.9]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.45}
          metalness={0.85}
        />
      </mesh>

      {/* Angled Instrument Panels (Left & Right Wings) */}
      <mesh position={[-1.35, -0.9, 0.1]} rotation={[-0.35, 0.35, 0.1]}>
        <boxGeometry args={[1.1, 0.55, 0.6]} />
        <meshStandardMaterial color="#0b1120" roughness={0.5} metalness={0.8} />
      </mesh>

      <mesh position={[1.35, -0.9, 0.1]} rotation={[-0.35, -0.35, -0.1]}>
        <boxGeometry args={[1.1, 0.55, 0.6]} />
        <meshStandardMaterial color="#0b1120" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Center Console Flight Stick / HUD Base */}
      <mesh position={[0, -0.75, 0.15]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.45, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* ========================================================
          CANOPY STRUTS & WINDOW FRAME
      ======================================================== */}
      {/* Top Curved Roof Canopy */}
      <mesh position={[0, 1.25, -0.05]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[3.8, 0.55, 0.6]} />
        <meshStandardMaterial color="#0a0f1d" metalness={0.88} roughness={0.4} />
      </mesh>

      {/* Left Pillar Strut */}
      <mesh position={[-1.75, 0.1, 0]} rotation={[0, 0.45, -0.18]}>
        <boxGeometry args={[0.45, 2.3, 0.5]} />
        <meshStandardMaterial color="#090d1a" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Right Pillar Strut */}
      <mesh position={[1.75, 0.1, 0]} rotation={[0, -0.45, 0.18]}>
        <boxGeometry args={[0.45, 2.3, 0.5]} />
        <meshStandardMaterial color="#090d1a" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Subtle Canopy Reinforcement Cross-Beams */}
      <mesh position={[-0.95, 0.4, -0.1]} rotation={[0, 0.2, -0.42]}>
        <cylinderGeometry args={[0.025, 0.025, 1.8, 12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.2} />
      </mesh>

      <mesh position={[0.95, 0.4, -0.1]} rotation={[0, -0.2, 0.42]}>
        <cylinderGeometry args={[0.025, 0.025, 1.8, 12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* ========================================================
          GLOWING HUD STRIPS & INTERIOR LED ACCENTS
      ======================================================== */}
      {/* Lower Dashboard Cyan Accent Light strip */}
      <mesh position={[0, -0.72, 0.05]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[2.4, 0.02, 0.04]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Left Instrument Strip */}
      <mesh position={[-1.2, -0.68, 0.1]} rotation={[-0.35, 0.35, 0.1]}>
        <boxGeometry args={[0.6, 0.015, 0.03]} />
        <meshBasicMaterial color="#00e5bc" />
      </mesh>

      {/* Right Instrument Strip */}
      <mesh position={[1.2, -0.68, 0.1]} rotation={[-0.35, -0.35, -0.1]}>
        <boxGeometry args={[0.6, 0.015, 0.03]} />
        <meshBasicMaterial color="#00e5bc" />
      </mesh>

      {/* Top Overhead Amber Status Strip */}
      <mesh position={[0, 0.98, -0.02]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[1.8, 0.015, 0.03]} />
        <meshBasicMaterial color="#ffb703" />
      </mesh>

      {/* Blinking Avionics LED Indicator Lights */}
      {/* 1. Green Flight Ready LED */}
      <mesh position={[-0.75, -0.65, 0.12]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial
          ref={ledRef1}
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* 2. Amber System Warning LED */}
      <mesh position={[-0.68, -0.65, 0.12]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial
          ref={ledRef2}
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* 3. Cyan Quantum Core / Comms LED */}
      <mesh position={[0.68, -0.65, 0.12]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial
          ref={ledRef3}
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* ========================================================
          CURVED VIEWPORT GLASS PANE (Reflections & Tint)
      ======================================================== */}
      <mesh position={[0, 0.15, -0.25]}>
        <planeGeometry args={[3.4, 2.1]} />
        <meshPhysicalMaterial
          color="#021424"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          transmission={0.85}
          ior={1.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
