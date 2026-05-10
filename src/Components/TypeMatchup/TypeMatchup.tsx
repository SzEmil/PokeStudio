import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ALL_TYPES,
  PokemonType,
  TYPE_COLORS,
  getEffectiveness,
} from '../../data/types';
import { TypeBadge } from '../UI/TypeBadge';
import { Button } from '../UI/Button';
import css from './TypeMatchup.module.css';
import { LuFlame, LuShield, LuSwords, LuTarget } from 'react-icons/lu';

export const TypeMatchup = () => {
  const [attacker, setAttacker] = useState<PokemonType>('fire');
  const [defenders, setDefenders] = useState<PokemonType[]>([]);
  const [showFullChart, setShowFullChart] = useState(false);

  const toggleDefender = (t: PokemonType) => {
    if (defenders.includes(t)) {
      setDefenders(defenders.filter(d => d !== t));
    } else if (defenders.length < 2) {
      setDefenders([...defenders, t]);
    }
  };

  const effectiveness = defenders.length > 0 ? getEffectiveness(attacker, defenders) : null;

  const offensiveAnalysis = useMemo(() => {
    return ALL_TYPES.map(t => ({
      type: t,
      mult: getEffectiveness(attacker, [t]),
    }));
  }, [attacker]);

  const tag =
    effectiveness === null
      ? 'Pick a defender'
      : effectiveness === 0
      ? 'No effect'
      : effectiveness === 0.25
      ? 'Barely effective ×0.25'
      : effectiveness === 0.5
      ? 'Not very effective ×0.5'
      : effectiveness === 1
      ? 'Normal effectiveness ×1'
      : effectiveness === 2
      ? 'Super effective ×2'
      : effectiveness === 4
      ? 'Devastating ×4'
      : `×${effectiveness}`;

  const tagClass =
    effectiveness === null
      ? css.tagNeutral
      : effectiveness === 0
      ? css.tagNone
      : effectiveness < 1
      ? css.tagWeak
      : effectiveness > 1
      ? css.tagStrong
      : css.tagNeutral;

  return (
    <div className={css.wrap}>
      <div className={css.head}>
        <div>
          <h2 className={css.title}>
            <LuTarget /> Type Matchup Calculator
          </h2>
          <p className={css.lead}>
            Pick an attacker and up to two defender types. Build flawless team coverage.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFullChart(v => !v)}
          iconLeft={<LuShield />}
        >
          {showFullChart ? 'Hide chart' : 'Full chart'}
        </Button>
      </div>

      <div className={css.boards}>
        <div className={css.board}>
          <h3 className={css.boardTitle}>
            <LuSwords /> Attacker
          </h3>
          <div className={css.chips}>
            {ALL_TYPES.map(t => (
              <button
                key={t}
                type="button"
                className={`${css.chip} ${attacker === t ? css.chipActive : ''}`}
                style={
                  attacker === t
                    ? { background: TYPE_COLORS[t], borderColor: TYPE_COLORS[t] }
                    : { borderColor: `${TYPE_COLORS[t]}55`, color: TYPE_COLORS[t] }
                }
                onClick={() => setAttacker(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={css.board}>
          <h3 className={css.boardTitle}>
            <LuShield /> Defender (max 2)
          </h3>
          <div className={css.chips}>
            {ALL_TYPES.map(t => (
              <button
                key={t}
                type="button"
                className={`${css.chip} ${defenders.includes(t) ? css.chipActive : ''}`}
                style={
                  defenders.includes(t)
                    ? { background: TYPE_COLORS[t], borderColor: TYPE_COLORS[t] }
                    : { borderColor: `${TYPE_COLORS[t]}55`, color: TYPE_COLORS[t] }
                }
                onClick={() => toggleDefender(t)}
                disabled={!defenders.includes(t) && defenders.length >= 2}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className={`${css.result} ${tagClass}`}
        key={`${attacker}_${defenders.join('_')}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={css.resultLeft}>
          <span>Attack</span>
          <TypeBadge type={attacker} size="lg" />
        </div>
        <span className={css.arrow}>→</span>
        <div className={css.resultMid}>
          {defenders.length === 0 ? (
            <span className={css.placeholder}>Pick defender(s)</span>
          ) : (
            defenders.map(t => <TypeBadge key={t} type={t} size="lg" />)
          )}
        </div>
        <span className={css.arrow}>=</span>
        <div className={css.resultRight}>
          <strong>{tag}</strong>
        </div>
      </motion.div>

      {showFullChart && (
        <div className={css.fullChart}>
          <h3 className={css.boardTitle}>
            <LuFlame /> {attacker.toUpperCase()} attacking — full coverage
          </h3>
          <div className={css.matrix}>
            {offensiveAnalysis.map(o => {
              const mult = o.mult;
              const cls =
                mult === 0
                  ? css.cellZero
                  : mult < 1
                  ? css.cellWeak
                  : mult > 1
                  ? css.cellStrong
                  : css.cellNeutral;
              return (
                <div key={o.type} className={`${css.cell} ${cls}`}>
                  <TypeBadge type={o.type} size="sm" />
                  <strong>×{mult}</strong>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
