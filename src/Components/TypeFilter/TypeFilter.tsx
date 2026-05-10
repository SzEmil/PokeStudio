import clsx from 'clsx';
import { ALL_TYPES, PokemonType, TYPE_COLORS } from '../../data/types';
import css from './TypeFilter.module.css';

interface Props {
  selected: PokemonType[];
  onToggle: (type: PokemonType) => void;
  onClear?: () => void;
}

export function TypeFilter({ selected, onToggle, onClear }: Props) {
  return (
    <div className={css.row}>
      <span className={css.label}>Filter by type</span>
      <div className={css.chips}>
        {ALL_TYPES.map(t => {
          const active = selected.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => onToggle(t)}
              className={clsx(css.chip, active && css.active)}
              style={
                active
                  ? { background: TYPE_COLORS[t], borderColor: TYPE_COLORS[t] }
                  : { borderColor: `${TYPE_COLORS[t]}55`, color: TYPE_COLORS[t] }
              }
            >
              {t}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && onClear && (
        <button type="button" className={css.clear} onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
}
