import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 50;
const PARTICLE_COUNT = 12;

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export function CometCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const trail: TrailPoint[] = [];
    const particles: Particle[] = [];
    let mouseX = -999;
    let mouseY = -999;
    let prevMouseX = -999;
    let prevMouseY = -999;
    let smoothX = -999;
    let smoothY = -999;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const spawnParticles = (x: number, y: number, speed: number) => {
      const count = Math.min(Math.floor(speed * 0.3), 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = Math.random() * 2 + 0.5;
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 0,
          maxLife: 20 + Math.random() * 25,
          size: Math.random() * 2.5 + 0.5,
          hue: 260 + Math.random() * 40, // purple to blue range
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth interpolation of mouse position
      if (smoothX === -999) {
        smoothX = mouseX;
        smoothY = mouseY;
      } else {
        smoothX += (mouseX - smoothX) * 0.35;
        smoothY += (mouseY - smoothY) * 0.35;
      }

      // Calculate speed
      const dx = smoothX - prevMouseX;
      const dy = smoothY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevMouseX = smoothX;
      prevMouseY = smoothY;

      // Add to trail
      if (smoothX > -500) {
        trail.unshift({ x: smoothX, y: smoothY, age: 0 });
        if (trail.length > TRAIL_LENGTH) trail.pop();

        // Spawn particles when moving
        if (speed > 1.5) {
          spawnParticles(smoothX, smoothY, speed);
        }
      }

      // Age trail points
      trail.forEach((p) => p.age++);

      // Draw comet tail with smooth curve
      if (trail.length >= 3) {
        // Draw multiple layers for glow effect
        for (let layer = 0; layer < 3; layer++) {
          const widthMult = [3, 2, 1][layer];
          const alphaMult = [0.08, 0.2, 0.6][layer];

          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);

          for (let i = 1; i < trail.length - 1; i++) {
            const cpX = (trail[i].x + trail[i + 1].x) / 2;
            const cpY = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, cpX, cpY);
          }

          const gradient = ctx.createLinearGradient(
            trail[0].x, trail[0].y,
            trail[trail.length - 1].x, trail[trail.length - 1].y
          );

          gradient.addColorStop(0, `rgba(200, 160, 255, ${alphaMult})`);
          gradient.addColorStop(0.3, `rgba(139, 92, 246, ${alphaMult * 0.7})`);
          gradient.addColorStop(0.6, `rgba(100, 60, 220, ${alphaMult * 0.4})`);
          gradient.addColorStop(1, `rgba(80, 40, 200, 0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = widthMult * (1 + speed * 0.08);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.2
          ? progress / 0.2
          : 1 - (progress - 0.2) / 0.8;
        const size = p.size * (1 - progress * 0.5);

        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 70%, 75%, ${alpha * 0.8})`;
          ctx.fill();
        }

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Keep particles count reasonable
      while (particles.length > PARTICLE_COUNT * 8) {
        particles.shift();
      }

      // Draw cursor head glow
      if (trail.length > 0 && smoothX > -500) {
        const head = trail[0];

        // Large outer aura
        const outerGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 25 + speed * 0.5);
        outerGlow.addColorStop(0, `rgba(180, 140, 255, ${Math.min(0.5, 0.3 + speed * 0.01)})`);
        outerGlow.addColorStop(0.4, 'rgba(139, 92, 246, 0.15)');
        outerGlow.addColorStop(1, 'rgba(100, 50, 200, 0)');
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 25 + speed * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Medium inner glow
        const innerGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
        innerGlow.addColorStop(0, 'rgba(220, 200, 255, 0.8)');
        innerGlow.addColorStop(0.5, 'rgba(180, 150, 255, 0.3)');
        innerGlow.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();

        // Subtle ring
        ctx.beginPath();
        ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 180, 255, ${Math.min(0.6, 0.3 + speed * 0.02)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.style.cursor = 'none';

    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}
