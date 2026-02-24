import { motion } from 'motion/react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const projects = [
  {
    title: 'Nebula Explorer',
    description:
      'An interactive 3D visualization of cosmic structures, rendered with real-time data from NASA APIs.',
    tags: ['React', 'Three.js', 'WebGL'],
    color: '#06b6d4',
    borderColor: 'rgba(6,182,212,0.5)',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1615392030676-6c532fe0c302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG5lYnVsYSUyMDNEJTIwdmlzdWFsaXphdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzcxODQ2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: '#',
    demo: '#',
  },
  {
    title: 'Exo-Planet Finder',
    description:
      'Discover new worlds and habitable zones using machine learning models trained on Kepler data.',
    tags: ['Vue.js', 'A-Frame', 'Python'],
    color: '#8b5cf6',
    borderColor: 'rgba(139,92,246,0.45)',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1769255119710-cc682f1d882c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleG9wbGFuZXQlMjBkaXNjb3ZlcnklMjBzcGFjZSUyMHNjaWVuY2V8ZW58MXx8fHwxNzcxODQ2NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: '#',
    demo: '#',
  },
  {
    title: 'Cosmic Journey',
    description:
      'Virtual reality space exploration experience with procedurally generated environments.',
    tags: ['Node.js', 'WebXR', 'Three.js'],
    color: '#10b981',
    borderColor: 'rgba(16,185,129,0.4)',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1655929947078-263a3dea40aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXQlMjBkYXJrJTIwbmVvbnxlbnwxfHx8fDE3NzE4NDY2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: '#',
    demo: '#',
  },
  {
    title: 'Stellar Dashboard',
    description:
      'Real-time analytics dashboard for satellite telemetry with AI-powered anomaly detection.',
    tags: ['React', 'TypeScript', 'AWS'],
    color: '#f59e0b',
    borderColor: 'rgba(245,158,11,0.4)',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1720962158937-7ea890052166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBmdXR1cmlzdGljJTIwZGFya3xlbnwxfHx8fDE3NzE4NDY2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: '#',
    demo: '#',
  },
  {
    title: 'Aurora AI',
    description:
      'Natural language interface for astronomy queries, powered by GPT-4 and vector search.',
    tags: ['Next.js', 'OpenAI', 'Pinecone'],
    color: '#e879f9',
    borderColor: 'rgba(232,121,249,0.4)',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMGFic3RyYWN0fGVufDF8fHx8MTc3MTgwNTE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: '#',
    demo: '#',
  },
  {
    title: 'Orbit Tracker',
    description:
      'Live satellite tracker with ISS position, pass predictions, and 3D globe visualization.',
    tags: ['React', 'D3.js', 'Node.js'],
    color: '#f43f5e',
    borderColor: 'rgba(244,63,94,0.4)',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1761212534376-a8b8d7c56669?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBvcmJpdCUyMGVhcnRoJTIwdHJhY2tpbmd8ZW58MXx8fHwxNzcxODQ2NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: '#',
    demo: '#',
  },
];

export function Projects() {
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
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}
        >
          <div
            style={{
              color: '#06b6d4',
              fontSize: 13,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            My Work
          </div>
          <h1
            style={{
              fontSize: 'clamp(26px, 5vw, 52px)',
              fontWeight: 800,
              marginBottom: 16,
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Stellar Project Showcase
          </h1>
          <p
            style={{
              color: 'rgba(180,180,220,0.65)',
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            A collection of cosmic-scale projects built with passion for performance and elegance.
          </p>
        </motion.div>

        {/* Featured Project */}
        {projects
          .filter((p) => p.featured)
          .map((project, i) => (
            <motion.div
              key={`featured-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              whileHover={{ y: -6 }}
              style={{
                background: 'rgba(6,6,28,0.9)',
                border: `1px solid ${project.borderColor}`,
                borderRadius: 24,
                marginBottom: 'clamp(30px, 4vw, 50px)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(16px)',
                boxShadow: `0 0 60px ${project.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                alignItems: 'center',
                cursor: 'default',
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 30% 50%, ${project.color}08 0%, transparent 60%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Featured badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                  border: `1px solid ${project.color}50`,
                  color: project.color,
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  zIndex: 2,
                }}
              >
                <Star size={10} /> FEATURED
              </div>

              {/* Left: Project Image */}
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(200px, 25vw, 300px)',
                  overflow: 'hidden',
                  borderRadius: '24px 0 0 24px',
                }}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, transparent 30%, ${project.color}20 100%)`,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Right: Info */}
              <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
                <h2
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(22px, 3vw, 30px)',
                    fontWeight: 800,
                    marginBottom: 12,
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    color: 'rgba(180,180,220,0.75)',
                    fontSize: 'clamp(13px, 1.6vw, 15px)',
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {project.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}40`,
                        color: project.color,
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                      border: 'none',
                      color: '#fff',
                      padding: '10px 22px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      textDecoration: 'none',
                    }}
                  >
                    <ExternalLink size={14} /> View Project
                  </motion.a>
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(200,200,240,0.85)',
                      padding: '10px 22px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      textDecoration: 'none',
                    }}
                  >
                    <Github size={14} /> Source
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(14px, 2vw, 24px)',
          }}
        >
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <motion.div
                key={`project-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: 'rgba(6,6,28,0.88)',
                  border: `1px solid ${project.borderColor}`,
                  borderRadius: 20,
                  backdropFilter: 'blur(14px)',
                  boxShadow: `0 0 30px ${project.color}12, 0 8px 30px rgba(0,0,0,0.4)`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Project Image Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    height: 160,
                    overflow: 'hidden',
                  }}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to bottom, transparent 40%, rgba(6,6,28,0.95))`,
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
                  <h3
                    style={{
                      color: '#fff',
                      fontSize: 'clamp(16px, 2.2vw, 20px)',
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      color: 'rgba(170,170,215,0.7)',
                      fontSize: 'clamp(12px, 1.4vw, 13px)',
                      lineHeight: 1.65,
                      marginBottom: 18,
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 20,
                    }}
                  >
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        style={{
                          background: `${project.color}12`,
                          border: `1px solid ${project.color}35`,
                          color: project.color,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1,
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}40`,
                        color: project.color,
                        padding: '9px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                        textDecoration: 'none',
                      }}
                    >
                      <ExternalLink size={13} /> View
                    </motion.a>
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(190,190,230,0.7)',
                        padding: '9px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        textDecoration: 'none',
                      }}
                    >
                      <Github size={13} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
