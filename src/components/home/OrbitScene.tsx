import React, { useEffect, useState } from 'react';
import { Rocket, Satellite } from 'lucide-react';

/**
 * Persistent full-site background: a planet with six orbit rings, one per
 * section. The ship rides the ring of the section currently in view and
 * glides outward/inward as you scroll; the planet surface drifts to a new
 * side on every section change.
 */

export const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'] as const;

const RADII = [200, 250, 300, 350, 400, 450];

type BodyKind = 'satellite' | 'moon' | 'asteroids' | 'beacon';
const BODIES: { kind: BodyKind; duration: number; phase: number }[] = [
  { kind: 'satellite', duration: 26, phase: 0.15 },
  { kind: 'moon', duration: 34, phase: 0.6 },
  { kind: 'asteroids', duration: 40, phase: 0.3 },
  { kind: 'beacon', duration: 30, phase: 0.8 },
  { kind: 'moon', duration: 46, phase: 0.45 },
  { kind: 'satellite', duration: 52, phase: 0.05 },
];

function useActiveSectionIndex(): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      if (atBottom) {
        setActive(SECTION_IDS.length - 1);
        return;
      }
      const probe = window.scrollY + window.innerHeight * 0.35;
      let next = 0;
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

const Body: React.FC<{ kind: BodyKind }> = ({ kind }) => {
  switch (kind) {
    case 'moon':
      return <span className="orbit-moon" />;
    case 'satellite':
      return <Satellite className="orbit-satellite" strokeWidth={1.6} />;
    case 'asteroids':
      return (
        <span className="orbit-asteroids">
          <i />
          <i />
          <i />
        </span>
      );
    default:
      return <span className="orbit-beacon" />;
  }
};

export const OrbitScene: React.FC = () => {
  const active = useActiveSectionIndex();
  const r = RADII[active] ?? RADII[0];
  // Shift the surface texture so each section shows a different side of the planet.
  const shift = ((active * 47) % 100) - 50;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient nebula + starfield */}
      <div className="absolute -top-40 left-1/4 h-[650px] w-[650px] rounded-full bg-purple-600/15 blur-[160px]" />
      <div className="absolute top-1/3 -right-24 h-[600px] w-[600px] rounded-full bg-hud-cyan/10 blur-[170px]" />
      <div className="orbit-stars" />

      <div className="orbit-stage absolute left-1/2 top-1/2">
        {RADII.map((rad, i) => (
          <div
            key={rad}
            className={`orbit-ring ${i === active ? 'orbit-ring-active' : ''}`}
            style={{ width: rad * 2, height: rad * 2 }}
          />
        ))}

        {BODIES.map((b, i) => (
          <div
            key={i}
            className={`orbit-body ${i === active ? 'orbit-body-active' : ''}`}
            style={{
              width: RADII[i] * 2,
              height: RADII[i] * 2,
              animationDuration: `${b.duration}s`,
              animationDelay: `-${b.phase * b.duration}s`,
            }}
          >
            <Body kind={b.kind} />
          </div>
        ))}

        <div className="planet" style={{ ['--planet-shift' as string]: `${shift}px` }}>
          <div className="planet-surface" />
        </div>

        <div className="orbit-track" style={{ width: r * 2, height: r * 2 }}>
          <div className="orbit-spin">
            <Rocket className="orbit-ship" strokeWidth={1.8} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};
