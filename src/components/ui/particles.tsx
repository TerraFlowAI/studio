"use client";

import React, { useEffect, useRef, useCallback } from 'react';

// Interfaces for props and particle state
interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
  refresh?: boolean;
  vx?: number;
  vy?: number;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

/**
 * A client-side only component that renders animated particles on a canvas.
 * All rendering logic is contained within useEffect to prevent hydration errors.
 */
export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  size = 0.4,
  color = '#888888',
  refresh = false,
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number; staticity: number; magnetism: number }>({
    x: 0,
    y: 0,
    staticity: staticity,
    magnetism: 0,
  });

  // Update mouse staticity when the prop changes
  useEffect(() => {
    mouse.current.staticity = staticity;
  }, [staticity]);

  // The main animation loop, wrapped in useCallback for performance.
  const animate = useCallback(() => {
    if (!canvasRef.current || !context.current) return;
    const canvas = canvasRef.current;
    const ctx = context.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.current.forEach((circle) => {
      // Handle mouse interaction
      const AB = mouse.current.x - circle.x;
      const AC = mouse.current.y - circle.y;
      const distance = Math.sqrt(AB * AB + AC * AC);
      const alpha = Math.atan2(AC, AB);
      const delta = Math.min(1 / (distance || 1) * mouse.current.magnetism, 10);
      circle.magnetism += (delta - circle.magnetism) * 0.05;
      if (distance < mouse.current.staticity) {
        const magnetismForce = Math.sin(alpha) * circle.magnetism;
        circle.x += Math.cos(alpha) * circle.magnetism;
        circle.y += magnetismForce;
      }

      // Move particle
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += ((mousePosition.current.x / (staticity / 100) - circle.translateX) / ease);
      circle.translateY += ((mousePosition.current.y / (staticity / 100) - circle.translateY) / ease);
      
      // Screen wrap
      if (circle.x < -50) circle.x = canvas.width + 50;
      if (circle.x > canvas.width + 50) circle.x = -50;
      if (circle.y < -50) circle.y = canvas.height + 50;
      if (circle.y > canvas.height + 50) circle.y = -50;

      // Fade in
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.05;

      // Draw particle
      if (ctx && circle.alpha > 0) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(circle.x + circle.translateX, circle.y + circle.translateY, circle.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    window.requestAnimationFrame(animate);
  }, [staticity, ease, color, vx, vy]);
  
  // This effect hook handles all client-side setup and cleanup.
  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;
    
    context.current = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    let animationFrameId: number;

    const makeCircles = () => {
      // Use client-side APIs and Math.random safely inside this function
      const DENSITY = Math.pow(quantity, 0.8) * window.innerHeight * window.innerWidth / 2000000;
      circles.current = [];
      for (let i = 0; i < DENSITY; i++) {
        circles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          translateX: 0,
          translateY: 0,
          size: Math.random() * 2 + size,
          alpha: 0,
          targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
          dx: (Math.random() - 0.5) * 0.1,
          dy: (Math.random() - 0.5) * 0.1,
          magnetism: 0,
        });
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      if (context.current) {
         context.current.fillStyle = color;
      }
      makeCircles();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const { width: w, height: h } = canvas;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mousePosition.current = { x, y };
      }
    };
    
    // Initial setup
    resizeCanvas();
    animationFrameId = window.requestAnimationFrame(animate);
    
    // Add event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup function to remove listeners and cancel animation
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animate, color, quantity, size, refresh]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
    </div>
  );
};

export default Particles;
