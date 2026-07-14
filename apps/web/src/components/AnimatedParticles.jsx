import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

export function AnimatedParticles() {
  const containerRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Memoize particles so they don't regenerate on component re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      // Continuous gentle floating animation: 35-40 second duration
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      type: i % 3, // 0: circle, 1: square, 2: triangle
      parallaxFactor: (Math.random() * 1.5) + 0.5, // Multiplier for depth effect
      // 1-3px subtle movement in multi-directional floating pattern
      floatX: Math.random() * 60 + 40,
      floatY: Math.random() * 60 + 40
    }));
  }, []);

  useEffect(() => {
    // Completely disable all mouse-tracking on mobile/tablet devices
    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!isHoverable) return;

    const handleMouseMove = (e) => {
      // Normalize mouse position to range [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      // Limit maximum displacement to extremely subtle 2.5px base
      targetPos.current = { x: nx * 30, y: ny * 30 };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rafId;
    const animate = () => {
      // Heavy easing/damping: lerp factor 0.05 ensures smooth interpolation (95% damping)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15;

      // Update CSS variables for high-performance transform rendering without React state updates
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentPos.current.x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentPos.current.y}px`);
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-5] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        // The outer div handles the ultra-smooth mouse tracking parallax via requestAnimationFrame
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            transform: `translate(calc(var(--mouse-x, 0px) * ${p.parallaxFactor}), calc(var(--mouse-y, 0px) * ${p.parallaxFactor}))`,
            willChange: 'transform' // GPU acceleration for the continuous parallax updates
          }}
        >
          {/* The inner motion.div handles the continuous, gentle, uninterrupted float */}
          <motion.div
            className="w-full h-full opacity-20"
            style={{
              borderRadius: p.type === 0 ? '50%' : p.type === 1 ? '10%' : '0',
              clipPath: p.type === 2 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
              background: `linear-gradient(135deg, hsla(var(--primary)/0.5), hsla(var(--secondary)/0.5))`
            }}
            animate={{
              x: [0, p.floatX, -p.floatX, 0],
              y: [0, -p.floatY, p.floatY, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
          />
        </div>
      ))}
    </div>
  );
}