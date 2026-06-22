import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  darkMode?: boolean;
}

export function LoadingScreen({ darkMode = true }: LoadingScreenProps = {}) {
  const languages = [
    'NAMMA FUTURE',
    'நமது எதிர்காலம்',
    'ನಮ್ಮ ಭವಿಷ್ಯ',
    'നമ്മ ഭാവി',
    'మన భవిష్యత్తు',
    'हमारा भविष्य'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % languages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        darkMode ? 'bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1f] to-[#0a0a0f]' : ''
      }`}
      style={!darkMode ? { background: '#f0f9ff' } : {}}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{
            background: darkMode
              ? 'rgba(139,92,246,0.18)'
              : 'radial-gradient(circle, rgba(14,165,233,0.20) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -18, scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full text-center"
          >
            <p
              style={{
                fontFamily: currentIndex === 0 ? "'League Spartan', sans-serif" : 'system-ui, sans-serif',
                fontSize: 'clamp(28px, 6vw, 68px)',
                fontWeight: 800,
                letterSpacing: currentIndex === 0 ? '0.10em' : '0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2,
                display: 'block',
                color: darkMode ? '#ffffff' : '#0ea5e9',
              }}
            >
              {languages[currentIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
