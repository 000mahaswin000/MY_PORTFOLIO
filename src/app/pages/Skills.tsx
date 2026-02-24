import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

const techIcons = [
  {
    label: 'React',
    color: '#61DAFB',
    bg: 'rgba(97,218,251,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    label: 'JavaScript',
    color: '#F7DF1E',
    bg: 'rgba(247,223,30,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    label: 'TypeScript',
    color: '#3178C6',
    bg: 'rgba(49,120,198,0.18)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    label: 'Node.js',
    color: '#68A063',
    bg: 'rgba(104,160,99,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    label: 'Python',
    color: '#3776AB',
    bg: 'rgba(55,118,171,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    label: 'AWS',
    color: '#FF9900',
    bg: 'rgba(255,153,0,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  },
  {
    label: 'Docker',
    color: '#2496ED',
    bg: 'rgba(36,150,237,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    label: 'MongoDB',
    color: '#47A248',
    bg: 'rgba(71,162,72,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    label: 'PostgreSQL',
    color: '#336791',
    bg: 'rgba(51,103,145,0.18)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    label: 'Next.js',
    color: '#fff',
    bg: 'rgba(255,255,255,0.1)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    label: 'Tailwind',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    label: 'Firebase',
    color: '#FFCA28',
    bg: 'rgba(255,202,40,0.12)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  },
  {
    label: 'GraphQL',
    color: '#E10098',
    bg: 'rgba(225,0,152,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    label: 'Redux',
    color: '#764ABC',
    bg: 'rgba(118,74,188,0.18)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  },
  {
    label: 'Git',
    color: '#F05032',
    bg: 'rgba(240,80,50,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    label: 'Figma',
    color: '#F24E1E',
    bg: 'rgba(242,78,30,0.15)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    label: 'Linux',
    color: '#FCC624',
    bg: 'rgba(252,198,36,0.12)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  },
  {
    label: 'Kubernetes',
    color: '#326CE5',
    bg: 'rgba(50,108,229,0.18)',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  },
];

const skillCategories = [
  {
    title: 'Web / App Development',
    color: '#61DAFB',
    borderColor: 'rgba(97,218,251,0.4)',
    skills: ['Django', 'Flutter', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    title: 'UI/UX Design',
    color: '#F24E1E',
    borderColor: 'rgba(242,78,30,0.4)',
    skills: ['Figma', 'v0.dev', 'Stitch', 'Prototyping'],
  },
  {
    title: 'Tools & Technologies',
    color: '#06B6D4',
    borderColor: 'rgba(6,182,212,0.4)',
    skills: ['Antigravity', 'Jest', 'Webpack', 'Redux', 'Firebase'],
  },
  {
    title: 'Creative Skills',
    color: '#764ABC',
    borderColor: 'rgba(118,74,188,0.4)',
    skills: ['UI Animation', 'SVG Animation', '3D Modeling', 'Motion Graphics'],
  },
];

interface IconPos {
  x: number;
  y: number;
  z: number;
  idx: number;
  opacity: number;
  scale: number;
}

function SkillsSphere() {
  const [iconPositions, setIconPositions] = useState<IconPos[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const baseRotYRef = useRef(0);
  const animRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(170);

  const basePositions = useMemo(() => {
    const n = techIcons.length;
    return techIcons.map((_, i) => {
      const theta = (2 * Math.PI * i) / GOLDEN_RATIO;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });
  }, []);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      setRadius(w < 480 ? 110 : w < 768 ? 140 : 170);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2 + 1);
      const dy = (e.clientY - cy) / (rect.height / 2 + 1);
      targetRef.current = {
        x: Math.max(-1, Math.min(1, dy)) * 35,
        y: Math.max(-1, Math.min(1, dx)) * 45,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (touch.clientX - cx) / (rect.width / 2 + 1);
      const dy = (touch.clientY - cy) / (rect.height / 2 + 1);
      targetRef.current = {
        x: Math.max(-1, Math.min(1, dy)) * 35,
        y: Math.max(-1, Math.min(1, dx)) * 45,
      };
    };

    const animate = () => {
      rotationRef.current.x += (targetRef.current.x - rotationRef.current.x) * 0.04;
      rotationRef.current.y += (targetRef.current.y - rotationRef.current.y) * 0.04;

      baseRotYRef.current += 0.25;

      const totalY = ((rotationRef.current.y + baseRotYRef.current) * Math.PI) / 180;
      const totalX = (rotationRef.current.x * Math.PI) / 180;

      const cosX = Math.cos(totalX);
      const sinX = Math.sin(totalX);
      const cosY = Math.cos(totalY);
      const sinY = Math.sin(totalY);

      const newPositions: IconPos[] = basePositions.map((pos, idx) => {
        const x1 = pos.x * cosY + pos.z * sinY;
        const y1 = pos.y;
        const z1 = -pos.x * sinY + pos.z * cosY;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const opacity = Math.max(0, (z2 + 1) / 2);
        const scale = 0.45 + (z2 + 1) / 2.6;

        return { x: x2 * radius, y: -y2 * radius, z: z2, idx, opacity, scale };
      });

      newPositions.sort((a, b) => a.z - b.z);
      setIconPositions(newPositions);
      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [basePositions, radius]);

  const containerSize = radius * 2 + 100;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerSize,
        height: containerSize,
        maxWidth: '100%',
        margin: '0 auto',
        cursor: 'grab',
      }}
    >
      {/* Sphere ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 35%, rgba(100,100,255,0.2) 0%, rgba(80,0,160,0.12) 50%, transparent 75%)',
            boxShadow:
              '0 0 80px rgba(100,50,255,0.25), inset 0 0 40px rgba(100,100,255,0.08)',
          }}
        />
      </div>

      {/* Orbit ring 1 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: radius * 2 + 50,
            height: (radius * 2 + 50) * 0.32,
            border: '1px solid rgba(120,150,255,0.35)',
            borderRadius: '50%',
            transform: 'rotateX(76deg)',
            boxShadow: '0 0 15px rgba(120,150,255,0.15)',
          }}
        />
      </div>

      {/* Orbit ring 2 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: radius * 2 + 20,
            height: (radius * 2 + 20) * 0.25,
            border: '1px solid rgba(200,100,255,0.2)',
            borderRadius: '50%',
            transform: 'rotateX(72deg) rotateZ(30deg)',
            boxShadow: '0 0 10px rgba(200,100,255,0.1)',
          }}
        />
      </div>

      {/* Icons with logos */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {iconPositions.map((pos) => {
          const icon = techIcons[pos.idx];
          if (pos.opacity < 0.05) return null;
          return (
            <div
              key={pos.idx}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${pos.scale})`,
                opacity: pos.opacity,
                zIndex: Math.round(pos.z * 100 + 100),
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  background: icon.bg,
                  border: `1px solid ${icon.color}60`,
                  borderRadius: 12,
                  padding: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  boxShadow: `0 0 12px ${icon.color}30`,
                  backdropFilter: 'blur(4px)',
                }}
                title={icon.label}
              >
                <img
                  src={icon.logo}
                  alt={icon.label}
                  style={{
                    width: 24,
                    height: 24,
                    objectFit: 'contain',
                    filter:
                      icon.label === 'Next.js'
                        ? 'invert(1)'
                        : 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        padding: 'clamp(30px, 5vw, 60px) 20px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 40px)' }}
        >
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 5vw, 54px)',
              fontWeight: 800,
              marginBottom: 14,
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Skills
          </h1>
          <p
            style={{
              color: 'rgba(180,180,220,0.65)',
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            Crafting digital experiences with a modern tech stack focused on performance, scalability,
            and user-centric design.
          </p>
        </motion.div>

        {/* 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <SkillsSphere />
        </motion.div>

        {/* Skill Category Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(12px, 2vw, 20px)',
            marginTop: 'clamp(30px, 4vw, 50px)',
          }}
        >
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              style={{
                background: 'rgba(8,8,28,0.85)',
                border: `1px solid ${cat.borderColor}`,
                borderRadius: 16,
                padding: 'clamp(16px, 2.5vw, 24px)',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 0 20px ${cat.color}10`,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
            >
              <h3
                style={{
                  color: cat.color,
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  fontWeight: 700,
                  marginBottom: 14,
                  textShadow: `0 0 20px ${cat.color}50`,
                }}
              >
                {cat.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    style={{
                      background: `${cat.color}12`,
                      border: `1px solid ${cat.color}35`,
                      color: 'rgba(210,210,240,0.85)',
                      borderRadius: 20,
                      padding: '4px 10px',
                      fontSize: 12,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}