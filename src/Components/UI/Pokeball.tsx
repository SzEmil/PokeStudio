import css from './Pokeball.module.css';

interface Props {
  size?: number;
  spinning?: boolean;
}

export function Pokeball({ size = 64, spinning = false }: Props) {
  return (
    <div
      className={`${css.ball} ${spinning ? css.spin : ''}`}
      style={{ width: size, height: size }}
      aria-label="Pokéball"
    >
      <div className={css.top} />
      <div className={css.bottom} />
      <div className={css.middle} />
      <div className={css.button} />
    </div>
  );
}
