import { motion } from 'framer-motion';
import css from './StatBar.module.css';

interface Props {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
}

export function StatBar({ label, value, max = 200, color, showValue = true }: Props) {
  const pct = Math.min(100, (value / max) * 100);
  const fill = color
    ? color
    : value < 50
    ? 'linear-gradient(90deg, #f87171, #fb923c)'
    : value < 90
    ? 'linear-gradient(90deg, #fbbf24, #facc15)'
    : 'linear-gradient(90deg, #34d399, #10b981)';

  return (
    <div className={css.row}>
      <span className={css.label}>{label}</span>
      <div className={css.barWrap}>
        <motion.div
          className={css.fill}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: fill }}
        />
      </div>
      {showValue && <span className={css.value}>{value}</span>}
    </div>
  );
}
