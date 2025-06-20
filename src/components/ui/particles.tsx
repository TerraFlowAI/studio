
"use client";

import React, { useEffect, useRef, useCallback } from 'react';

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
  // DENSITY will be calculated on the client side in makeCircles
  // const DENSITY = Math.pow(quantity, 0.8) * window.innerHeight * window.innerWidth / 2000000; // MOVED

  const makeCircles = useCallback(() => {
    if (context.current && canvasRef.current && typeof window !== 'undefined') {
      // Calculate DENSITY here, only on the client
      const DENSITY = Math.pow(quantity, 0.8) * window.innerHeight * window.innerWidth / 2000000;
      circles.current = []; // Clear existing circles before creating new ones
      for (let i = 0; i < DENSITY; i++) {
        circles.current.push({
          x: Math.random() * canvasRef.current.width,
          y: Math.random() * canvasRef.current.height,
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
    }
  }, [quantity, size]);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current && typeof window !== 'undefined') {
      canvasRef.current.width = canvasContainerRef.current.offsetWidth;
      canvasRef.current.height = canvasContainerRef.current.offsetHeight;
      context.current.fillStyle = color;
      makeCircles(); // Remake circles on resize
    }
  }, [color, makeCircles]);


  const animate = useCallback(() => {
    if (context.current && canvasRef.current && typeof window !== 'undefined') {
      context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      circles.current.forEach((circle) => {
        const AB = mouse.current.x - circle.x;
        const AC = mouse.current.y - circle.y;
        const distance = Math.sqrt(AB * AB + AC * AC);
        const alpha = Math.atan2(AC, AB);
        const delta = Math.min(1 / (distance || 1) * mouse.current.magnetism, 10); // Avoid division by zero
        
        circle.magnetism += (delta - circle.magnetism) * 0.05;

        if (distance < mouse.current.staticity) {
          const magnetismForce = Math.sin(alpha) * circle.magnetism; // Renamed to avoid conflict
          circle.x += Math.cos(alpha) * circle.magnetism;
          circle.y += magnetismForce;
        }

        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX += ((mousePosition.current.x / (staticity / 100) - circle.translateX) / ease);
        circle.translateY += ((mousePosition.current.y / (staticity / 100) - circle.translateY) / ease);
        
        if (circle.x < -50) circle.x = canvasRef.current.width + 50;
        if (circle.x > canvasRef.current.width + 50) circle.x = -50;
        if (circle.y < -50) circle.y = canvasRef.current.height + 50;
        if (circle.y > canvasRef.current.height + 50) circle.y = -50;

        circle.alpha += (circle.targetAlpha - circle.alpha) * 0.05;

        if (context.current && circle.alpha > 0) {
            context.current.fillStyle = color;
            context.current.beginPath();
            context.current.arc(circle.x + circle.translateX, circle.y + circle.translateY, circle.size, 0, 2 * Math.PI);
            context.current.fill();
        }
      });
    }
    if (typeof window !== 'undefined') {
        window.requestAnimationFrame(animate);
    }
  }, [staticity, ease, color, vx, vy]);

  useEffect(() => {
    if (canvasRef.current && typeof window !== 'undefined') {
      context.current = canvasRef.current.getContext('2d');
      resizeCanvas(); // Initial setup
      const animationFrameId = window.requestAnimationFrame(animate);
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeCanvas, animate, refresh]); // refresh dependency will re-trigger setup

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (canvasRef.current && typeof window !== 'undefined') {
        const rect = canvasRef.current.getBoundingClientRect();
        const { width: w, height: h } = { w: canvasRef.current.width, h: canvasRef.current.height }; // Renamed to avoid conflict
        const x = e.clientX - rect.left - w / 2;
        const y = e.clientY - rect.top - h / 2;
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
          mousePosition.current = { x, y };
        }
      }
    };
    if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

   useEffect(() => {
    mouse.current.staticity = staticity;
  }, [staticity]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
    </div>
  );
};

export default Particles;
