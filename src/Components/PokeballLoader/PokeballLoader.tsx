import css from './PokeballLoader.module.css';
import { Pokeball } from '../UI/Pokeball';

interface Props {
  size?: number;
  label?: string;
}

export const PokeballLoader = ({ size = 80, label }: Props) => {
  return (
    <div className={css.wrapper}>
      <div className={css.glow}>
        <Pokeball size={size} spinning />
      </div>
      {label !== undefined && <p className={css.label}>{label || 'Loading...'}</p>}
    </div>
  );
};
