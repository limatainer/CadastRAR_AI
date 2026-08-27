import { useScroll, useSpring, useTransform, motion } from 'motion/react';

/**
 * HUD / Sci-Fi FUI landing backdrop (per ui-ux-pro-max design system):
 * a faint SVG node-link wireframe + technical brackets + scan sweep, themed via
 * CSS tokens so it recolours for light/dark. Parallax deltas kept small (skill:
 * decorative layers only, 5-15% so foreground never desyncs).
 */
export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  // Small parallax deltas on decorative layers only.
  const gridY = useTransform(smooth, [0, 1], ['0%', '12%']);
  const wireY = useTransform(smooth, [0, 1], ['0%', '-8%']);
  const bracketY = useTransform(smooth, [0, 1], ['0%', '6%']);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stroke = 'var(--hud-line)';
  const glow = 'var(--hud-glow)';

  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Perspective wireframe grid */}
      <motion.div className="animated-bg__grid" style={{ y: reduce ? 0 : gridY }} />

      {/* SVG node-link wireframe — the "fancy pattern" */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ y: reduce ? 0 : wireY }}
      >
        <defs>
          <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke={stroke} strokeWidth="1" fill="none" filter="url(#hud-glow)">
          {/* concentric targeting rings, top-right */}
          <circle cx="1180" cy="180" r="120" />
          <circle cx="1180" cy="180" r="190" />
          <circle cx="1180" cy="180" r="260" />
          <line x1="1180" y1="20" x2="1180" y2="340" />
          <line x1="1020" y1="180" x2="1340" y2="180" />
          {/* crosshair, lower-left */}
          <circle cx="240" cy="680" r="90" />
          <circle cx="240" cy="680" r="150" />
          <line x1="240" y1="540" x2="240" y2="820" />
          <line x1="100" y1="680" x2="380" y2="680" />
          {/* connecting network lines */}
          <path d="M240 680 L680 420 L1180 180" />
          <path d="M680 420 L900 760" />
          <path d="M680 420 L420 200" />
          <path d="M900 760 L1180 180" />
          {/* diamond markers at nodes */}
          <rect x="676" y="416" width="8" height="8" transform="rotate(45 680 420)" />
          <rect x="896" y="756" width="8" height="8" transform="rotate(45 900 760)" />
          <rect x="416" y="196" width="8" height="8" transform="rotate(45 420 200)" />
        </g>
      </motion.svg>

      {/* Glowing axis nodes */}
      <div className="animated-bg__node" style={{ top: '20%', left: '82%' }} />
      <div className="animated-bg__node" style={{ top: '76%', left: '17%', animationDelay: '0.8s' }} />
      <div className="animated-bg__node" style={{ top: '47%', left: '47%', animationDelay: '1.6s' }} />

      {/* Corner brackets */}
      <motion.div className="animated-bg__bracket animated-bg__bracket--tl" style={{ y: reduce ? 0 : bracketY }} />
      <motion.div className="animated-bg__bracket animated-bg__bracket--tr" style={{ y: reduce ? 0 : bracketY }} />
      <motion.div className="animated-bg__bracket animated-bg__bracket--bl" style={{ y: reduce ? 0 : bracketY }} />
      <motion.div className="animated-bg__bracket animated-bg__bracket--br" style={{ y: reduce ? 0 : bracketY }} />

      {/* Scan sweep */}
      <div className="animated-bg__scan" style={{ background: `linear-gradient(to bottom, transparent, ${glow}, transparent)` }} />

      {/* Near-solid theme surface (HUD shows as a faint ghost) so text is always
          fully readable in both themes; decorative motion stays visible */}
      <div
        className="absolute inset-0"
        style={{ background: 'color-mix(in srgb, var(--bg) 93%, transparent)' }}
      />
    </div>
  );
}
