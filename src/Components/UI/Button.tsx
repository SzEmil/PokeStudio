import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import css from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth,
    iconLeft,
    iconRight,
    loading,
    className,
    children,
    disabled,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        css.btn,
        css[variant],
        css[size],
        fullWidth && css.fullWidth,
        loading && css.loading,
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <span className={css.shine} aria-hidden />
      {iconLeft && <span className={css.icon}>{iconLeft}</span>}
      <span className={css.label}>{children}</span>
      {iconRight && <span className={css.icon}>{iconRight}</span>}
    </button>
  );
});
