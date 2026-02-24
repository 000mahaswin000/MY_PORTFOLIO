import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; r: number;
  alpha: number; speed: number; phase: number;
}

interface Meteor {
  x: number; y: number; vx: number; vy: number;
  len: number; life: number; maxLife: number;
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < 400; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.2,
          alpha: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.012 + 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const addMeteor = () => {
      const x = Math.random() * canvas.width * 0.8;
      const y = Math.random() * canvas.height * 0.4;
      meteors.push({
        x, y,
        vx: 5 + Math.random() * 5,
        vy: 2 + Math.random() * 3,
        len: 80 + Math.random() * 80,
        life: 0,
        maxLife: 50 + Math.random() * 40,
      });
    };

    const draw = (t: number) => {
      ctx.fillStyle = '#000010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula glows
      const nebulas = [
        { x: 0.5, y: 0.35, r: 0.4, c: 'rgba(80,0,140,0.08)' },
        { x: 0.2, y: 0.65, r: 0.28, c: 'rgba(0,40,130,0.06)' },
        { x: 0.8, y: 0.5, r: 0.22, c: 'rgba(0,80,120,0.05)' },
        { x: 0.6, y: 0.2, r: 0.18, c: 'rgba(100,0,150,0.04)' },
      ];

      nebulas.forEach(n => {
        const gx = n.x * canvas.width;
        const gy = n.y * canvas.height;
        const gr = n.r * Math.max(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, n.c);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Stars with twinkling
      stars.forEach(s => {
        const tw = Math.sin(t * s.speed * 60 + s.phase) * 0.25 + 0.75;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(s.alpha * tw).toFixed(2)})`;
        ctx.fill();
      });

      // Meteors
      if (frame % 160 === 0 && Math.random() < 0.6) addMeteor();

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const p = m.life / m.maxLife;
        const alpha = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
        const angle = Math.atan2(m.vy, m.vx);

        const grad = ctx.createLinearGradient(
          m.x - Math.cos(angle) * m.len,
          m.y - Math.sin(angle) * m.len,
          m.x, m.y
        );
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(180,150,255,${(alpha * 0.6).toFixed(2)})`);
        grad.addColorStop(1, `rgba(255,255,255,${alpha.toFixed(2)})`);

        ctx.beginPath();
        ctx.moveTo(m.x - Math.cos(angle) * m.len, m.y - Math.sin(angle) * m.len);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.fill();

        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }

      frame++;
    };

    const loop = (ts: number) => {
      draw(ts / 1000);
      animId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
