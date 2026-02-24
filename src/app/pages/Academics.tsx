import { motion } from 'motion/react';
import { GraduationCap, Code, BookOpen, School, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const academics = [
  {
    period: '2021 — 2023',
    degree: 'M.S. in Software Engineering',
    institution: 'Stanford University',
    icon: <GraduationCap size={18} />,
    highlights: [
      'Specialized in Distributed Systems and Cloud Architecture',
      'Published research on low-latency microservices patterns',
      'GPA: 3.94/4.0',
    ],
    color: '#8b5cf6',
    side: 'left',
  },
  {
    period: '2017 — 2021',
    degree: 'B.Tech in Computer Science',
    institution: 'Georgia Institute of Technology',
    icon: <Code size={18} />,
    highlights: [
      'Core focus on Algorithms, OS, and Database Management',
      'Developed a custom JVM as a senior capstone project',
      "Dean's List for 8 consecutive semesters",
    ],
    color: '#06b6d4',
    side: 'right',
  },
  {
    period: '2015 — 2017',
    degree: 'Higher Secondary Education',
    institution: 'Science & Mathematics Major',
    icon: <BookOpen size={18} />,
    highlights: [
      'Awarded "Student of the Year" for academic excellence',
      'National Mathematics Olympiad Finalist',
    ],
    color: '#10b981',
    side: 'left',
  },
  {
    period: '2005 — 2015',
    degree: 'Primary & Secondary School',
    institution: 'Laying the Foundations',
    icon: <School size={18} />,
    highlights: [
      'Consistent topper in Science and Information Tech',
      'Lead organizer for school tech exhibitions',
    ],
    color: '#f59e0b',
    side: 'right',
  },
];

export function Academics() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        padding: 'clamp(40px, 6vw, 80px) 20px',
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}
        >
          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 58px)',
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            <span style={{ color: '#fff' }}>Academic </span>
            <span
              style={{
                color: '#8b5cf6',
                textShadow: '0 0 40px rgba(139,92,246,0.5)',
              }}
            >
              Odyssey
            </span>
          </h1>
          <p
            style={{
              color: 'rgba(180,180,220,0.65)',
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Charting the path of my learning journey from the foundations to
            specialized expertise.
          </p>
        </motion.div>

        {/* Timeline */}
        {isMobile ? (
          // Mobile: single-column timeline
          <div style={{ position: 'relative' }}>
            {/* Left vertical line */}
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  'linear-gradient(to bottom, transparent, #8b5cf6 10%, #06b6d4 50%, #8b5cf6 90%, transparent)',
                boxShadow: '0 0 10px rgba(139,92,246,0.5)',
                borderRadius: 2,
              }}
            />

            {academics.map((item, i) => (
              <div key={i} style={{ position: 'relative', paddingLeft: 52, marginBottom: 32 }}>
                {/* Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: 16,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${item.color}40, transparent)`,
                    border: `2px solid ${item.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    boxShadow: `0 0 12px ${item.color}50`,
                    zIndex: 2,
                  }}
                >
                  {item.icon}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'rgba(6,6,24,0.88)',
                    border: `1px solid ${item.color}40`,
                    borderRadius: 14,
                    padding: '16px 18px',
                    backdropFilter: 'blur(14px)',
                    boxShadow: `0 0 20px ${item.color}12`,
                  }}
                >
                  <div style={{ color: item.color, fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>
                    {item.period}
                  </div>
                  <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
                    {item.degree}
                  </h3>
                  <div style={{ color: 'rgba(180,180,220,0.6)', fontSize: 12, fontStyle: 'italic', marginBottom: 12 }}>
                    {item.institution}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.highlights.map((h, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: 'rgba(190,190,225,0.75)', fontSize: 12, marginBottom: 6, lineHeight: 1.5 }}>
                        <Star size={10} color={item.color} style={{ marginTop: 3, flexShrink: 0 }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: alternating timeline
          <div style={{ position: 'relative' }}>
            {/* Central glowing line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: 0,
                bottom: 0,
                width: 3,
                background:
                  'linear-gradient(to bottom, transparent, #00f5ff 15%, #8b5cf6 50%, #00f5ff 85%, transparent)',
                boxShadow: '0 0 15px rgba(0,245,255,0.6), 0 0 30px rgba(0,245,255,0.3)',
                borderRadius: 2,
                animation: 'timeline-pulse 2.5s ease-in-out infinite',
              }}
            />

            {academics.map((item, i) => {
              const isLeft = item.side === 'left';
              return (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    marginBottom: 'clamp(40px, 6vw, 80px)',
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${item.color}40, transparent)`,
                      border: `2px solid ${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      zIndex: 2,
                      boxShadow: `0 0 20px ${item.color}60, 0 0 40px ${item.color}30`,
                      animation: 'timeline-pulse 2.5s ease-in-out infinite',
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: 'calc(50% - 40px)',
                      background: 'rgba(6,6,24,0.88)',
                      border: `1px solid ${item.color}45`,
                      borderRadius: 18,
                      padding: 'clamp(18px, 3vw, 28px)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: `0 0 30px ${item.color}15, 0 8px 40px rgba(0,0,0,0.5)`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    whileHover={{
                      borderColor: `${item.color}80`,
                      boxShadow: `0 0 50px ${item.color}25, 0 8px 40px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {/* Corner glow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: -30,
                        [isLeft ? 'right' : 'left']: -30,
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                        pointerEvents: 'none',
                      }}
                    />

                    <div style={{ color: item.color, fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>
                      {item.period}
                    </div>
                    <h3 style={{ color: '#fff', fontSize: 'clamp(15px, 2vw, 19px)', fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
                      {item.degree}
                    </h3>
                    <div style={{ color: 'rgba(180,180,220,0.6)', fontSize: 'clamp(12px, 1.4vw, 14px)', fontStyle: 'italic', marginBottom: 16 }}>
                      {item.institution}
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {item.highlights.map((h, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(190,190,225,0.75)', fontSize: 'clamp(12px, 1.4vw, 13px)', marginBottom: 8, lineHeight: 1.5 }}>
                          <Star size={11} color={item.color} style={{ marginTop: 3, flexShrink: 0 }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: 'rgba(150,150,200,0.55)',
            fontSize: 14,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#8b5cf6',
              boxShadow: '0 0 10px rgba(139,92,246,0.8)',
            }}
          />
          Always learning. Forever curious.
        </motion.div>
      </div>
    </div>
  );
}