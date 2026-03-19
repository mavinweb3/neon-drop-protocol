"use client";

import React, { useEffect, useRef } from 'react';

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    class Particle {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * -0.2 - 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.radius < 0) {
          this.y = height + this.radius;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* Digital Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Dynamic slow-moving glares - radial gradients */}
      <div 
        className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full animate-[pulse_14s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 60%)' }}
      />
      <div 
        className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full animate-[pulse_18s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 60%)', animationDelay: '2s' }}
      />
      
      {/* Static CSS noise overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
};

export default AmbientBackground;
