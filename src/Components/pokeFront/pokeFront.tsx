import css from './pokeFront.module.css';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pokeIdFromUrl, prettyName, paddedId, spriteHome, spriteOfficial } from '../../utils/pokeUtils';

interface PokemonProps {
  pokemon: {
    name: string;
    url: string;
  };
  index?: number;
}

export const PokeFront = memo(({ pokemon: { name, url }, index = 0 }: PokemonProps) => {
  const id = pokeIdFromUrl(url);

  return (
    <NavLink to={`/pokemon/${id}`} className={css.linkReset}>
      <motion.div
        className={css.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.4), ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
      >
        <div className={css.glow} aria-hidden />
        <div className={css.imageBox}>
          <img
            className={css.image}
            alt={name}
            loading="lazy"
            src={spriteHome(id)}
            onError={e => {
              const t = e.currentTarget;
              if (t.dataset.fallback) return;
              t.dataset.fallback = '1';
              t.src = spriteOfficial(id);
            }}
          />
        </div>
        <div className={css.info}>
          <span className={css.id}>{paddedId(id)}</span>
          <h3 className={css.name}>{prettyName(name)}</h3>
        </div>
      </motion.div>
    </NavLink>
  );
});
