import React, { useMemo } from 'react';

/** Fixed star positions — no Math.random on render (stable + cheap) */
const STAR_SEED = [
  [8, 12], [22, 8], [35, 18], [48, 6], [62, 14], [78, 9], [91, 16],
  [12, 28], [28, 35], [41, 42], [55, 30], [70, 38], [85, 25], [5, 48],
  [18, 55], [33, 62], [47, 58], [63, 68], [80, 52], [94, 60],
  [10, 72], [25, 78], [40, 85], [58, 80], [72, 88], [88, 75], [15, 92],
  [45, 22], [68, 45], [82, 82], [3, 35], [52, 12], [75, 20], [30, 50],
  [90, 40], [20, 65], [60, 92], [38, 8], [50, 48], [14, 40],
];

function buildBoxShadow(stars) {
  return stars
    .map(([x, y], i) => {
      const alpha = 0.35 + ((i % 5) * 0.1);
      const blur = i % 7 === 0 ? 1 : 0;
      return `${x}vw ${y}vh ${blur}px rgba(255,255,255,${alpha})`;
    })
    .join(',');
}

/**
 * Lightweight cosmic backdrop: CSS nebula + CSS stars (GPU compositing only).
 * No canvas, no rAF loop — safe for Ads landing LCP.
 */
export function LightCosmicBackground() {
  const nearShadow = useMemo(() => buildBoxShadow(STAR_SEED.slice(0, 20)), []);
  const farShadow = useMemo(() => buildBoxShadow(STAR_SEED.slice(20)), []);

  return (
    <div className="light-cosmic fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-[#050505]" aria-hidden="true">
      <div className="light-cosmic__nebula light-cosmic__nebula--a" />
      <div className="light-cosmic__nebula light-cosmic__nebula--b" />
      <div className="light-cosmic__nebula light-cosmic__nebula--c" />

      <div
        className="light-cosmic__stars light-cosmic__stars--far"
        style={{ boxShadow: farShadow }}
      />
      <div
        className="light-cosmic__stars light-cosmic__stars--near"
        style={{ boxShadow: nearShadow }}
      />
    </div>
  );
}
