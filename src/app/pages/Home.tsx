import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import heroImage from "../../assets/me.png";

const ROLES = [
  "Vibe Coder",
  "Linux Enthusiast",
  "Student",
  "Modding hardware by day, coding by night",
  "SSN '30",
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.35)",
        borderRadius: 20,
        padding: "6px 16px",
        marginBottom: 28,
        height: 32,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Sparkles
        size={13}
        color="#a78bfa"
        style={{ flexShrink: 0 }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            color: "rgba(200,180,255,0.9)",
            fontSize: 13,
            whiteSpace: "nowrap",
          }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Constellation canvas background
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    interface CStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }

    let stars: CStar[] = [];
    const STAR_COUNT = 120;
    const CONNECTION_DIST = 150;

    const resize = () => {
      canvas.width =
        canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height =
        canvas.parentElement?.clientHeight ||
        window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.6 + 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.pulse += s.pulseSpeed;

        // Wrap around
        if (s.x < -10) s.x = canvas.width + 10;
        if (s.x > canvas.width + 10) s.x = -10;
        if (s.y < -10) s.y = canvas.height + 10;
        if (s.y > canvas.height + 10) s.y = -10;
      });

      // Draw constellation lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      stars.forEach((s) => {
        const twinkle = Math.sin(s.pulse) * 0.3 + 0.7;
        const a = s.alpha * twinkle;

        // Glow
        const glow = ctx.createRadialGradient(
          s.x,
          s.y,
          0,
          s.x,
          s.y,
          s.r * 4,
        );
        glow.addColorStop(0, `rgba(180, 160, 255, ${a * 0.5})`);
        glow.addColorStop(1, "rgba(180, 160, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 255, ${a})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -64;
    const y =
      element.getBoundingClientRect().top +
      window.scrollY +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export function Home() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Constellation Background */}
      <ConstellationCanvas />

      {/* Decorative nebula glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "20%",
          width: "clamp(300px, 50vw, 700px)",
          height: "clamp(300px, 50vw, 700px)",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, rgba(100,0,200,0.08) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative red/crimson accent glow */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 30vw, 400px)",
          background:
            "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Content grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 100px) 20px 40px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: 40,
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RotatingRole />

            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(32px, 5.5vw, 64px)",
                lineHeight: 1.1,
                marginBottom: 24,
                fontWeight: 800,
                letterSpacing: "-1.5px",
              }}
            >
              Hello, I'm
              <br />{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                D.Mahaswin
              </span>
            </h1>

            <p
              style={{
                color: "rgba(190,190,230,0.65)",
                fontSize: "clamp(14px, 1.8vw, 16px)",
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 460,
              }}
            >
              Master's Student in Computer Science
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <motion.a
                href="/resume.pdf"
                download="Mahaswin_Resume.pdf"
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 30px rgba(139,92,246,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  border: "1px solid rgba(139,92,246,0.7)",
                  color: "#fff",
                  padding: "13px 28px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 14,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Resume <Download size={16} />
              </motion.a>
            </div>

            {/* Mini stats */}
            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 48,
                flexWrap: "wrap",
              }}
            >
              {[{ num: "20+", label: "Happy Clients" }].map(
                (stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        color: "#8b5cf6",
                        fontSize: "clamp(20px, 3vw, 28px)",
                        fontWeight: 800,
                      }}
                    >
                      {stat.num}
                    </div>
                    <div
                      style={{
                        color: "rgba(170,170,210,0.6)",
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Right: Hero Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Decorative ring behind portrait */}
          <div
            style={{
              position: "absolute",
              width: "clamp(280px, 35vw, 420px)",
              height: "clamp(280px, 35vw, 420px)",
              borderRadius: "50%",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow:
                "0 0 60px rgba(139,92,246,0.15), inset 0 0 60px rgba(139,92,246,0.05)",
              animation: "pulse-glow 4s ease-in-out infinite",
            }}
          />

          {/* Second decorative ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: "clamp(320px, 40vw, 480px)",
              height: "clamp(320px, 40vw, 480px)",
              borderRadius: "50%",
              border: "1px dashed rgba(6,182,212,0.15)",
            }}
          />

          {/* Portrait image */}
          <div
            style={{
              width: "clamp(240px, 30vw, 360px)",
              height: "clamp(240px, 30vw, 360px)",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "2px solid rgba(139,92,246,0.3)",
              boxShadow:
                "0 0 40px rgba(139,92,246,0.25), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <ImageWithFallback
              src={heroImage}
              alt="Developer portrait"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Overlay gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(0,0,16,0.6))",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Floating tech badges around portrait */}
          {[
            {
              label: "Linux",
              color: "#61DAFB",
              angle: -30,
              dist: 170,
            },
            {
              label: "Python",
              color: "#68A063",
              angle: 45,
              dist: 180,
            },
            {
              label: "Game Dev",
              color: "#FF9900",
              angle: 120,
              dist: 165,
            },
            {
              label: "Vibe Coder",
              color: "#3178C6",
              angle: 210,
              dist: 175,
            },
          ].map((badge, i) => {
            const rad = (badge.angle * Math.PI) / 180;
            const x = Math.cos(rad) * badge.dist;
            const y = Math.sin(rad) * badge.dist;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: {
                    delay: 0.8 + i * 0.15,
                    duration: 0.4,
                  },
                  scale: {
                    delay: 0.8 + i * 0.15,
                    duration: 0.5,
                    type: "spring",
                  },
                  y: {
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1 + i * 0.2,
                  },
                }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(10,10,40,0.9)",
                  border: `1px solid ${badge.color}50`,
                  borderRadius: 10,
                  padding: "5px 10px",
                  color: badge.color,
                  fontSize: 11,
                  fontWeight: 700,
                  backdropFilter: "blur(8px)",
                  boxShadow: `0 0 12px ${badge.color}25`,
                  whiteSpace: "nowrap",
                }}
              >
                {badge.label}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          delay: 2,
          duration: 1.5,
          repeat: Infinity,
          y: { repeat: Infinity },
        }}
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "rgba(150,140,200,0.5)",
          fontSize: 11,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, transparent, rgba(139,92,246,0.5))",
          }}
        />
        SCROLL
      </motion.div>
    </div>
  );
}