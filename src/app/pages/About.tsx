import { motion } from 'motion/react';
import { Code2, Globe, Layers, Cpu, ArrowRight, MapPin, Mail, Coffee, Download } from 'lucide-react';
import chessImage from '../../assets/icon.png';

const stats = [
  { num: '10+', label: 'AI Known', icon: <Coffee size={18} /> },
  { num: '5+', label: 'Projects Completed', icon: <Layers size={18} /> },
  { num: '20+', label: 'Technologies', icon: <Cpu size={18} /> },
  { num: '∞', label: 'Lines of Code', icon: <Code2 size={18} /> },
];

const skills = [
  { label: 'Python', level: 95, color: '#61DAFB' },
  { label: 'C / C++', level: 92, color: '#3178C6' },
  { label: 'AI', level: 88, color: '#68A063' },
  { label: 'Backend Development', level: 78, color: '#FF9900' },
  { label: 'UI/UX Design', level: 75, color: '#F24E1E' },
];

export function About() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -64;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        padding: 'clamp(40px, 6vw, 80px) 20px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}
        >
          <div
            style={{
              color: '#8b5cf6',
              fontSize: 13,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Get To Know Me
          </div>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            About{' '}
            <span style={{ color: '#8b5cf6', textShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
              Me
            </span>
          </h1>
          <p style={{ color: 'rgba(180,180,220,0.6)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
            Passionate developer crafting digital experiences that matter.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(30px, 4vw, 60px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Avatar + Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Avatar Card */}
            <div
              style={{
                background: 'rgba(10,10,35,0.8)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: 24,
                padding: 'clamp(24px, 4vw, 40px)',
                backdropFilter: 'blur(16px)',
                marginBottom: 24,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow bg */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Avatar circle */}
              <div
                style={{
                  width: 'clamp(90px, 15vw, 120px)',
                  height: 'clamp(90px, 15vw, 120px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: 24,
                  boxShadow: '0 0 40px rgba(139,92,246,0.4)',
                  position: 'relative',
                  zIndex: 1,
                  border: '2px solid rgba(139,92,246,0.4)',
                }}
              >
                <img
                  src={chessImage}
                  alt="Chess piece avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <h2
                style={{
                  color: '#fff',
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                D Mahaswin
              </h2>
              <div style={{ color: '#8b5cf6', fontSize: 14, marginBottom: 16 }}>
                Master's Student in Computer Science
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  color: 'rgba(170,170,210,0.7)',
                  fontSize: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={14} color="#8b5cf6" /> Chennai, India
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={14} color="#8b5cf6" /> mahaswin@gmail.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={14} color="#8b5cf6" /> mahaswin.dev
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                    border: 'none',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  Hire Me <ArrowRight size={14} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, borderColor: 'rgba(139,92,246,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    color: 'rgba(200,190,255,0.85)',
                    padding: '12px 16px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Download size={14} /> CV
                </motion.button>
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  style={{
                    background: 'rgba(10,10,35,0.7)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    borderRadius: 14,
                    padding: '16px',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    style={{
                      color: '#8b5cf6',
                      marginBottom: 6,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      color: '#fff',
                      fontSize: 'clamp(18px, 3vw, 24px)',
                      fontWeight: 800,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div style={{ color: 'rgba(160,160,200,0.6)', fontSize: 11, marginTop: 2 }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Bio */}
            <div
              style={{
                background: 'rgba(10,10,35,0.8)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 20,
                padding: 'clamp(24px, 4vw, 36px)',
                backdropFilter: 'blur(16px)',
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Who I Am
              </h3>
              <p
                style={{
                  color: 'rgba(180,180,225,0.75)',
                  fontSize: 'clamp(13px, 1.6vw, 15px)',
                  lineHeight: 1.8,
                  marginBottom: 14,
                }}
              >
                I am an Integrated M.Tech student at SSN College of Engineering,
                operating at the intersection of system architecture and cybersecurity.
                I don’t just use tools; I seek to understand them from 
                first principles—whether it’s dissecting Linux kernels or 
                building scalable applications from the ground up.
              </p>
              <p
                style={{
                  color: 'rgba(180,180,225,0.75)',
                  fontSize: 'clamp(13px, 1.6vw, 15px)',
                  lineHeight: 1.8,
                }}
              >
                I believe in building digital experiences that are 
                not only high-performing but inherently secure.
                When I’m not auditing code or exploring AI implementations,
                I’m likely customizing my environment to squeeze 
                every bit of efficiency out of my workflow.
              </p>
            </div>

            {/* Skills */}
            <div
              style={{
                background: 'rgba(10,10,35,0.8)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 20,
                padding: 'clamp(24px, 4vw, 36px)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                Core Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {skills.map((skill, i) => (
                  <div key={skill.label}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ color: 'rgba(200,200,240,0.85)', fontSize: 13 }}>
                        {skill.label}
                      </span>
                      <span style={{ color: skill.color, fontSize: 13, fontWeight: 600 }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 5,
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                          borderRadius: 4,
                          boxShadow: `0 0 8px ${skill.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}