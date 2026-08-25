import React, { useEffect, useRef } from 'react';

export function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let stars = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let running = true;

    const initStars = () => {
      stars = [];
      // Keep star count low — this canvas starts only after first paint / idle
      const density = prefersReducedMotion ? 8000 : 4200;
      const numStars = Math.min(90, Math.floor((width * height) / density));

      for (let i = 0; i < numStars; i++) {
        const depth = Math.random() < 0.2 ? 1 : Math.random() < 0.6 ? 2 : 3;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth,
          radius: (Math.random() * 1.5 + 0.5) / depth,
          speed: prefersReducedMotion ? 0 : (Math.random() * 0.25 + 0.08) / depth,
          baseAlpha: Math.random() * 0.28 + 0.12,
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.baseAlpha})`;
        ctx.fill();
      });
    };

    let lastFrame = 0;
    const TARGET_FPS = 20;
    const FRAME_MS = 1000 / TARGET_FPS;

    const draw = (time) => {
      if (!running) return;

      if (time - lastFrame < FRAME_MS) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.12;
        const clampedAlpha = Math.max(0.06, Math.min(0.55, alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${clampedAlpha})`;
        ctx.fill();

        star.x += star.speed;
        if (star.x > width + star.radius) {
          star.x = -star.radius;
          star.y = Math.random() * height;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      } else if (!running) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    resize();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-background" aria-hidden="true">
      {/* Fewer / lighter nebula clouds for GPU cost */}
      <div
        className="absolute top-[10%] left-[-20%] w-[55vw] h-[55vw] rounded-full mix-blend-screen blur-[100px] opacity-12"
        style={{
          background: 'radial-gradient(circle, hsla(var(--cosmic-lilac)/0.28) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[45%] right-[-20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[110px] opacity-10"
        style={{
          background: 'radial-gradient(circle, hsla(var(--cosmic-purple)/0.22) 0%, transparent 70%)',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}
