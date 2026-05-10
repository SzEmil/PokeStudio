import clsx from 'clsx';
import { PokemonType, TYPE_COLORS } from '../../data/types';
import css from './TypeBadge.module.css';

interface Props {
  type: PokemonType | string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft';
}

export function TypeBadge({ type, size = 'md', variant = 'solid' }: Props) {
  const color = (TYPE_COLORS as Record<string, string>)[type] ?? '#888';
  return (
    <span
      className={clsx(css.badge, css[size], css[variant])}
      style={
        variant === 'solid'
          ? { background: color, boxShadow: `0 4px 12px ${color}66` }
          : { background: `${color}22`, color, border: `1px solid ${color}55` }
      }
    >
      {type}
    </span>
  );
}
