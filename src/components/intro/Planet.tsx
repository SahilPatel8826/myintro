import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  distance: number;
  rotationSpeed?: number;
}

// Custom GLSL Shader for procedural planet with continents, oceans, terminator shadow, and night city lights
const PlanetShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uSunDirection: { value: new THREE.Vector3(1.5, 0.8, 1.2).normalize() },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vSunDir;
    uniform vec3 uSunDirection;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      // Transform sun direction to view space
      vSunDir = normalize((viewMatrix * vec4(uSunDirection, 0.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vSunDir;
    uniform float uTime;

    // Simplex noise implementation for procedural landmasses
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vec3 N = normalize(vNormal);
      vec3 L = normalize(vSunDir);
      vec3 V = normalize(-vPosition);

      // Procedural terrain sampling using sphere coordinate
      vec3 sphereCoord = normalize(vNormal);
      float elevation = snoise(sphereCoord * 2.8);
      elevation += 0.5 * snoise(sphereCoord * 5.6);
      elevation += 0.25 * snoise(sphereCoord * 11.2);

      // Deep Ocean vs Land
      bool isOcean = elevation < 0.08;
      vec3 oceanColor = vec3(0.015, 0.075, 0.22);
      vec3 shallowColor = vec3(0.03, 0.25, 0.35);
      vec3 landLowColor = vec3(0.08, 0.28, 0.12);
      vec3 landHighColor = vec3(0.35, 0.28, 0.18);
      vec3 snowColor = vec3(0.85, 0.92, 0.98);

      vec3 surfaceColor;
      if (isOcean) {
        float depth = smoothstep(-0.6, 0.08, elevation);
        surfaceColor = mix(oceanColor, shallowColor, depth);
      } else {
        float landHeight = smoothstep(0.08, 0.6, elevation);
        if (landHeight < 0.6) {
          surfaceColor = mix(landLowColor, landHighColor, landHeight / 0.6);
        } else {
          surfaceColor = mix(landHighColor, snowColor, (landHeight - 0.6) / 0.4);
        }
      }

      // Terminator lighting (diffuse)
      float NdotL = dot(N, L);
      float diffuse = smoothstep(-0.15, 0.25, NdotL);

      // Specular reflection on water
      vec3 H = normalize(L + V);
      float spec = isOcean ? pow(max(dot(N, H), 0.0), 32.0) * 0.7 * diffuse : 0.0;

      // Night side city lights
      float nightMask = smoothstep(0.1, -0.25, NdotL);
      float cityDensity = snoise(sphereCoord * 14.0 + vec3(5.0));
      cityDensity += 0.5 * snoise(sphereCoord * 28.0);
      float cityLights = smoothstep(0.35, 0.7, cityDensity) * (!isOcean ? 1.0 : 0.0) * nightMask;
      vec3 cityGlow = vec3(1.0, 0.75, 0.35) * cityLights * 2.5;

      // Fresnel rim lighting (Atmosphere scattering)
      float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.8);
      vec3 atmosphereColor = vec3(0.0, 0.7, 1.0) * fresnel * (diffuse * 0.8 + 0.3);

      vec3 finalColor = surfaceColor * diffuse + vec3(spec) + cityGlow + atmosphereColor;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

// Outer Atmospheric Halo Fresnel Material
const AtmosphereHaloMaterial = {
  uniforms: {
    uSunDirection: { value: new THREE.Vector3(1.5, 0.8, 1.2).normalize() },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(-vPosition);
      float rim = pow(1.0 - max(dot(N, V), 0.0), 3.2);
      vec3 haloColor = vec3(0.05, 0.65, 1.0) * rim * 1.5;
      gl_FragColor = vec4(haloColor, rim * 0.85);
    }
  `
};

export const Planet: React.FC<PlanetProps> = ({ distance, rotationSpeed = 0.002 }) => {
  const planetRef = useRef<THREE.Group>(null);
  const surfaceRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Custom shader uniforms
  const shaderUniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uSunDirection: { value: new THREE.Vector3(1.5, 0.8, 1.2).normalize() }
    };
  }, []);

  const haloUniforms = useMemo(() => {
    return {
      uSunDirection: { value: new THREE.Vector3(1.5, 0.8, 1.2).normalize() }
    };
  }, []);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.position.z = -distance;
    }
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += rotationSpeed * 0.4;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 0.7;
    }
    shaderUniforms.uTime.value += delta;
  });

  return (
    <group ref={planetRef} position={[0, -0.6, -distance]}>
      {/* 1. Main Planet Body with Procedural Terrain & City Lights */}
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[7.5, 64, 64]} />
        <shaderMaterial
          uniforms={shaderUniforms}
          vertexShader={PlanetShaderMaterial.vertexShader}
          fragmentShader={PlanetShaderMaterial.fragmentShader}
        />
      </mesh>

      {/* 2. Rotating Atmospheric Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[7.58, 48, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.38}
          roughness={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Outer Atmospheric Rim Glow (Fresnel Halo) */}
      <mesh>
        <sphereGeometry args={[7.75, 48, 48]} />
        <shaderMaterial
          uniforms={haloUniforms}
          vertexShader={AtmosphereHaloMaterial.vertexShader}
          fragmentShader={AtmosphereHaloMaterial.fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Distant Sun / Rim Light source */}
      <directionalLight
        position={[25, 12, 18]}
        intensity={2.8}
        color="#ffffff"
      />
      <ambientLight intensity={0.12} color="#0c1833" />

      {/* Sun glow billboard */}
      <mesh position={[45, 20, 30]}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial color="#fffbe6" />
      </mesh>
    </group>
  );
};
