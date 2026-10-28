import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { X, FileText, Mail } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

interface ProfileRevealProps {
  open: boolean;
  origin: { x: number; y: number };
  onClose: () => void;
}

const EASE = [0.7, 0, 0.2, 1] as const;

export const ProfileReveal: React.FC<ProfileRevealProps> = ({ open, origin, onClose }) => {
  const reduce = useReducedMotion();
  const d = (n: number) => (reduce ? 0 : n);
  const p = PORTFOLIO_CONTENT.personal;

  // 3D tilt following the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Particle burst from the center of the portrait
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 140 + Math.random() * 170;
        return {
          x: Math.cos(a) * dist,
          y: Math.sin(a) * dist,
          size: 2 + Math.random() * 3,
          delay: 0.25 + Math.random() * 0.25,
          teal: i % 3 === 0,
        };
      }),
    []
  );

  // Esc to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const goContact = () => {
    onClose();
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  };

  const radius = typeof window !== 'undefined' ? Math.hypot(window.innerWidth, window.innerHeight) : 2400;
  const from = `circle(0px at ${origin.x}px ${origin.y}px)`;
  const to = `circle(${radius}px at ${origin.x}px ${origin.y}px)`;

  // Portal to <body>: the navbar's backdrop-blur would otherwise trap position:fixed
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="profile-reveal"
          role="dialog"
          aria-modal="true"
          aria-label="Profile"
          onClick={onClose}
          initial={reduce ? { opacity: 0 } : { clipPath: from }}
          animate={reduce ? { opacity: 1 } : { clipPath: to }}
          exit={reduce ? { opacity: 0 } : { clipPath: from }}
          transition={{ duration: reduce ? 0.2 : 0.8, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-space-950/95 backdrop-blur-xl overflow-y-auto"
        >
          {/* Ambient glow + grid */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hud-cyan/10 blur-[110px]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          <button
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-surface-container/80 text-slate-300 transition hover:border-hud-cyan hover:text-hud-cyan"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center px-6 py-16"
          >
            {/* Portrait stage */}
            <div
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ perspective: 1000 }}
              className="relative"
            >
              <motion.div
                style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
                className="relative aspect-[4/5] w-[min(72vw,300px)]"
              >
                {/* Orbit rings */}
                {!reduce && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1, rotate: 360 }}
                      transition={{
                        opacity: { delay: 0.5, duration: 0.8 },
                        scale: { delay: 0.5, duration: 0.8, ease: 'easeOut' },
                        rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
                      }}
                      className="absolute -inset-10 rounded-full border border-dashed border-hud-cyan/40"
                    >
                      <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-hud-cyan shadow-[0_0_14px_#00f0ff]" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1, rotate: -360 }}
                      transition={{
                        opacity: { delay: 0.7, duration: 0.8 },
                        scale: { delay: 0.7, duration: 0.8, ease: 'easeOut' },
                        rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                      }}
                      className="absolute -inset-20 rounded-full border border-hud-teal/25"
                    >
                      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-hud-orange shadow-[0_0_12px_#ff6b35]" />
                    </motion.div>
                  </>
                )}

                {/* Particle burst */}
                {!reduce &&
                  particles.map((pt, i) => (
                    <motion.span
                      key={i}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{ x: pt.x, y: pt.y, opacity: [0, 1, 0], scale: [0, 1, 0.4] }}
                      transition={{ duration: 1.4, delay: pt.delay, ease: 'easeOut' }}
                      style={{ width: pt.size, height: pt.size }}
                      className={`pointer-events-none absolute left-1/2 top-1/2 rounded-full ${
                        pt.teal ? 'bg-hud-teal' : 'bg-hud-cyan'
                      } shadow-[0_0_8px_currentColor]`}
                    />
                  ))}

                {/* HUD corner brackets */}
                {[
                  '-left-3 -top-3 border-l-2 border-t-2 origin-top-left',
                  '-right-3 -top-3 border-r-2 border-t-2 origin-top-right',
                  '-bottom-3 -left-3 border-b-2 border-l-2 origin-bottom-left',
                  '-bottom-3 -right-3 border-b-2 border-r-2 origin-bottom-right',
                ].map((cls, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: d(0.2 + i * 0.08), duration: 0.4, ease: 'easeOut' }}
                    className={`absolute h-7 w-7 border-hud-cyan ${cls}`}
                  />
                ))}

                {/* Scan-line reveal of the photo */}
                <motion.div
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0)' }}
                  transition={{ delay: d(0.35), duration: reduce ? 0.2 : 1, ease: EASE }}
                  className="absolute inset-0 overflow-hidden rounded-xl border border-hud-cyan/50 shadow-[0_0_45px_rgba(0,240,255,0.3)]"
                >
                  <motion.img
                    src={p.astronautImage}
                    alt={p.fullName}
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { scale: 1.45, filter: 'blur(18px) grayscale(1) brightness(2)' }
                    }
                    animate={
                      reduce
                        ? { opacity: 1 }
                        : { scale: 1, filter: 'blur(0px) grayscale(0) brightness(1)' }
                    }
                    transition={{ delay: d(0.35), duration: reduce ? 0.2 : 1.5, ease: 'easeOut' }}
                    className="h-full w-full object-cover"
                  />

                  {/* RGB-split glitch flashes */}
                  {!reduce &&
                    [
                      { hue: 'hue-rotate(150deg) saturate(3)', dx: [0, -10, 7, -4, 0] },
                      { hue: 'hue-rotate(300deg) saturate(3)', dx: [0, 9, -6, 5, 0] },
                    ].map((g, i) => (
                      <motion.img
                        key={i}
                        src={p.avatar}
                        alt=""
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0.4, 0.6, 0], x: g.dx }}
                        transition={{ delay: 0.9 + i * 0.1, duration: 0.7 }}
                        style={{ filter: g.hue }}
                        className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
                      />
                    ))}

                  {/* Scanline texture */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space-950/60 via-transparent to-transparent" />
                </motion.div>

                {/* Moving scan bar */}
                {!reduce && (
                  <motion.div
                    initial={{ top: '0%', opacity: 1 }}
                    animate={{ top: '100%', opacity: [1, 1, 0] }}
                    transition={{ delay: 0.35, duration: 1, ease: EASE }}
                    className="pointer-events-none absolute left-[-12px] right-[-12px] h-[3px] bg-hud-cyan shadow-[0_0_24px_6px_rgba(0,240,255,0.7)]"
                  />
                )}
              </motion.div>
            </div>

            {/* Identity text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: d(1.3), duration: 0.5 }}
              className="mt-14 flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-hud-cyan"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              IDENTITY VERIFIED
            </motion.div>

            <h2 className="mt-3 text-center font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {p.fullName.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: d(1.4 + i * 0.045), duration: 0.45, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: d(1.9), duration: 0.5 }}
              className="mt-2 text-center font-mono text-xs tracking-wider text-slate-300"
            >
              {p.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d(2.0), duration: 0.5 }}
              className="mt-1 text-center font-mono text-[11px] tracking-wider text-slate-500"
            >
              {p.academicSpec}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: d(2.15), duration: 0.5 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              <button
                onClick={goContact}
                className="flex items-center gap-2 rounded-full bg-hud-cyan px-5 py-2 font-mono text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.45)] transition hover:brightness-110"
              >
                <Mail className="h-4 w-4" />
                CONTACT ME
              </button>
              <a
                href={p.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-hud-cyan/50 bg-hud-cyan/10 px-5 py-2 font-mono text-xs font-semibold text-hud-cyan transition hover:bg-hud-cyan/20"
              >
                <FileText className="h-4 w-4" />
                RESUME
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProfileReveal;
