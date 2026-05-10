import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import css from './Card.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  glow?: string;
}

export function Card({ glass = true, hover = false, glow, className, style, children, ...rest }: Props) {
  return (
    <div
      className={clsx(css.card, glass && css.glass, hover && css.hover, className)}
      style={{ ...(glow ? { boxShadow: `0 30px 60px ${glow}` } : {}), ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
