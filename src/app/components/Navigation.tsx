import { useState, useEffect, useCallback, useRef } from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'academics', label: 'Academics' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const isScrollingToRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Scroll-position based active section detection
  useEffect(() => {
    const NAV_HEIGHT = 64;

    const getActiveSection = () => {
      if (isScrollingToRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 50) {
        setActiveSection('contact');
        return;
      }

      if (scrollY < 100) {
        setActiveSection('home');
        return;
      }

      let bestId = 'home';
      let bestDistance = Infinity;

      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top;
        const triggerPoint = NAV_HEIGHT + 100;

        if (sectionTop <= triggerPoint && rect.bottom > triggerPoint) {
          const dist = Math.abs(sectionTop - triggerPoint);
          if (dist < bestDistance) {
            bestDistance = dist;
            bestId = link.id;
          }
        }
      }

      if (bestDistance === Infinity) {
        for (const link of navLinks) {
          const el = document.getElementById(link.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const triggerPoint = NAV_HEIGHT + 100;
          if (rect.top <= triggerPoint) {
            bestId = link.id;
          }
        }
      }

      setActiveSection(bestId);
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          getActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    getActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      isScrollingToRef.current = id;

      const yOffset = -64;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingToRef.current = null;
      }, 800);
    }
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(0,0,20,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(100,100,255,0.12)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 20px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              My Portfolio
              <span style={{ color: '#8b5cf6' }}>.</span>
            </span>
          </motion.div>
        </button>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  color: active ? '#fff' : 'rgba(190,190,255,0.65)',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  background: active ? 'rgba(139,92,246,0.25)' : 'transparent',
                  border: active
                    ? '1px solid rgba(139,92,246,0.5)'
                    : '1px solid transparent',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: Social */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(190,190,255,0.65)', lineHeight: 0 }}
          >
            <Github size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(190,190,255,0.65)', lineHeight: 0 }}
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(190,190,255,0.65)', lineHeight: 0 }}
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}