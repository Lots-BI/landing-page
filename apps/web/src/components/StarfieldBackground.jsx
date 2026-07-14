import React, { useEffect, useRef } from 'react';

export function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let stars = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const initStars = () => {
      stars = [];
      // Create stars across 3 depth layers for parallax
      const numStars = Math.floor((width * height) / 1500); // Responsive density
      
      for (let i = 0; i < numStars; i++) {
        // Depth layer: 1 (closest/fastest) to 3 (farthest/slowest)
        const depth = Math.random() < 0.2 ? 1 : Math.random() < 0.6 ? 2 : 3;
        
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth,
          radius: (Math.random() * 1.5 + 0.5) / depth,
          speed: (Math.random() * 0.3 + 0.1) / depth,
          baseAlpha: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach(star => {
        // Calculate twinkling effect
        const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;
        const clampedAlpha = Math.max(0.1, Math.min(1, alpha));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${clampedAlpha})`;
        ctx.fill();

        // Move star left to right for parallax drift
        star.x += star.speed;
        
        // Wrap around screen seamlessly
        if (star.x > width + star.radius) {
          star.x = -star.radius;
          star.y = Math.random() * height;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-background">
      {/* Nebula Clouds (CSS for optimal blur/glow performance) */}
      <div 
        className="absolute top-[10%] left-[-20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[120px] opacity-40 will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, hsla(var(--nebula-lilas)/0.6) 0%, transparent 70%)',
          animation: 'nebula-drift-left-right 45s infinite linear'
        }} 
      />
      <div 
        className="absolute top-[40%] right-[-20%] w-[70vw] h-[70vw] rounded-full mix-blend-screen blur-[140px] opacity-30 will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, hsla(var(--nebula-roxo)/0.5) 0%, transparent 70%)',
          animation: 'nebula-drift-right-left 55s infinite linear'
        }} 
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen blur-[100px] opacity-40 will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, hsla(var(--nebula-rosa)/0.4) 0%, transparent 70%)',
          animation: 'nebula-drift-left-right 65s infinite linear reverse'
        }} 
      />
      <div 
        className="absolute top-[-20%] right-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-screen blur-[100px] opacity-30 will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, hsla(var(--nebula-azul)/0.5) 0%, transparent 70%)',
          animation: 'nebula-drift-right-left 40s infinite linear reverse'
        }} 
      />

      {/* High-performance Canvas Starfield */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}