import { motion } from 'framer-motion';
import { useMemo } from 'react';
import css from './Confetti.module.css';

interface Props {
  count?: number;
  colors?: string[];
  /** rises from center -> outwards. Defaults true */
  burst?: boolean;
  duration?: number;
}

const DEFAULT_COLORS = ['#ffcb05', '#ff5e5e', '#6390f0', '#7ac74c', '#c084fc', '#34d399'];

export function Confetti({
  count = 60,
  colors = DEFAULT_COLORS,
  burst = true,
  duration = 1.6,
}: Props) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 280;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const size = 6 + Math.random() * 10;
      const rotate = Math.random() * 720 - 360;
      return {
        x,
        y,
        size,
        rotate,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.1,
        rounded: Math.random() > 0.4,
      };
    });
  }, [count, colors]);

  return (
    <div className={css.wrap} aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className={css.piece}
          style={{
            background: p.color,
            width: p.size,
            height: p.size * (p.rounded ? 1 : 0.4),
            borderRadius: p.rounded ? '50%' : '2px',
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.4 }}
          animate={
            burst
              ? {
                  x: p.x,
                  y: p.y + 80,
                  rotate: p.rotate,
                  opacity: [1, 1, 0],
                  scale: [0.4, 1.1, 0.7],
                }
              : { y: 600, rotate: p.rotate, opacity: [1, 1, 0] }
          }
          transition={{ duration, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
