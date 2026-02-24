import { motion } from 'motion/react';
import { Github, Instagram, Twitter, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'academics', label: 'Academics' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const socialLinks = [
  { icon: <Github size={18} />, href: 'https://github.com', label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <Twitter size={18} />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <Instagram size={18} />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <Mail size={18} />, href: 'mailto:surya@example.com', label: 'Email' },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -64;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(100,100,200,0.12)',
        background: 'rgba(0,0,12,0.6)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(40px, 5vw, 64px) 20px 0',
        }}
      >
        {/* Top row: Logo + Nav + Social */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollToSection('home')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                }}
              >
                Surya
                <span style={{ color: '#8b5cf6' }}>.</span>
              </span>
            </button>
            <p
              style={{
                color: 'rgba(160,160,200,0.6)',
                fontSize: 13,
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              Full-Stack Software Engineer passionate about building scalable
              web applications and stunning digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: 'rgba(200,200,240,0.85)',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 16,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Quick Links
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px 20px',
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(160,160,200,0.55)',
                    fontSize: 13,
                    cursor: 'pointer',
                    padding: '2px 0',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#8b5cf6')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(160,160,200,0.55)')
                  }
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4
              style={{
                color: 'rgba(200,200,240,0.85)',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 16,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Connect
            </h4>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                  style={{
                    width: 40,
                    height: 40,
                    background: 'rgba(15,15,40,0.8)',
                    border: '1px solid rgba(100,100,200,0.18)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(170,170,210,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), rgba(6,182,212,0.3), transparent)',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div
            style={{
              color: 'rgba(130,130,175,0.55)',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Built with <Heart size={12} color="#f43f5e" fill="#f43f5e" /> by Surya Pratap
            <span style={{ margin: '0 6px' }}>·</span>
            2025
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#8b5cf6',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <ArrowUp size={14} /> Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}