import css from './PokePack.module.css';
import { motion } from 'framer-motion';
import { Button } from '../UI/Button';

type PackType = 'Silver' | 'Gold' | 'Legendary';
type PokePackPropsType = {
  type: PackType | string | undefined;
  handleOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

const SPECS: Record<PackType, { price: number; legendary: number; gradient: string; subtitle: string }> = {
  Silver: {
    price: 500,
    legendary: 2,
    gradient: 'linear-gradient(160deg, #cdd2da 0%, #6f7585 50%, #2d3140 100%)',
    subtitle: 'Solid odds for early trainers.',
  },
  Gold: {
    price: 1000,
    legendary: 9,
    gradient: 'linear-gradient(160deg, #ffd86f 0%, #fcb045 50%, #5a3a00 100%)',
    subtitle: 'Stronger pulls and a real shot at legends.',
  },
  Legendary: {
    price: 5000,
    legendary: 100,
    gradient: 'linear-gradient(160deg, #c084fc 0%, #6f35fc 50%, #1b0a4f 100%)',
    subtitle: '100% guaranteed legendary Pokémon.',
  },
};

export const PokePack = ({ type, handleOnClick }: PokePackPropsType) => {
  const t = (type as PackType) ?? 'Silver';
  const spec = SPECS[t] ?? SPECS.Silver;

  return (
    <motion.div
      className={css.pack}
      style={{ background: spec.gradient }}
      whileHover={{ y: -6, rotate: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}
    >
      <div className={css.foil} aria-hidden />
      <div className={css.shine} aria-hidden />
      <div className={css.body}>
        <div className={css.top}>
          <span className={css.tier}>{t}</span>
          <span className={css.price}>{spec.price.toLocaleString()} ¢</span>
        </div>
        <div className={css.center}>
          <h3 className={css.title}>{t} Pack</h3>
          <p className={css.subtitle}>{spec.subtitle}</p>
        </div>
        <div className={css.bottom}>
          <span className={css.chip}>
            Legendary chance <strong>{spec.legendary}%</strong>
          </span>
          <Button variant="primary" size="sm" onClick={handleOnClick}>
            Buy & open
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
