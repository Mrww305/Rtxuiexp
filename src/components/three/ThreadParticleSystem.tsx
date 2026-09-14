// Yarn and Fiber particle canvas for hero and manufacturing headers
import React, { useRef, useEffect } from 'react';

export const ThreadParticleSystem: React.FC<{ className?: string; count?: number }> = ({
  className = 'absolute inset-0 pointer-events-none opacity-40',
  count = 35
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle representation of microscopic textile cotton/silk fibers
    interface FiberParticle {
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      rotSpeed: number;
      opacity: number;
      color: string;
      curve: number;
    }

    const colors = ['#f59e0b', '#d97706', '#94a3b8', '#cbd5e1', '#e2e8f0'];
    const particles: FiberParticle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 12 + Math.random() * 26,
      angle: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      rotSpeed: (Math.random() - 0.5) * 0.012,
      opacity: 0.2 + Math.random() * 0.45,
      color: colors[Math.floor(Math.random() * colors.length)],
      curve: (Math.random() - 0.5) * 8
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(p.angle) * 0.25;
        p.angle += p.rotSpeed;

        if (p.y < -40) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.quadraticCurveTo(0, p.curve, p.length / 2, 0);
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden="true" />;
};
