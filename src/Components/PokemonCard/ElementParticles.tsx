import { useMemo } from 'react';
import { motion } from 'framer-motion';
import css from './ElementParticles.module.css';

interface Props {
  variant: string;
  color: string;
  count?: number;
}

export function ElementParticles({ variant, color, count = 18 }: Props) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      key: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
    }));
  }, [count]);

  return (
    <div className={`${css.layer} ${css[variant] ?? ''}`} aria-hidden>
      {particles.map(p => (
        <motion.span
          key={p.key}
          className={css.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 1.4}px ${color}`,
          }}
          animate={{
            y: [-6, -22, -6],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
