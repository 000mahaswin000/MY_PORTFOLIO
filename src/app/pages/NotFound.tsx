import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export function NotFound() {
  const scrollToHome = () => {
    const element = document.getElementById('home');
    if (element) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            fontSize: 'clamp(80px, 15vw, 140px)',
            fontWeight: 900,
            color: 'rgba(139,92,246,0.3)',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          404
        </div>
        <h2
          style={{
            color: '#fff',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Lost in Space
        </h2>
        <p style={{ color: 'rgba(170,170,215,0.65)', marginBottom: 32, fontSize: 15 }}>
          This page drifted into a black hole.
        </p>
        <motion.button
          onClick={scrollToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
            border: 'none',
            color: '#fff',
            padding: '13px 28px',
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '0 auto',
          }}
        >
          <Home size={16} /> Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
