import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { TypeBadge } from '../UI/TypeBadge';
import { StatBar } from '../UI/StatBar';
import { Button } from '../UI/Button';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import {
  POKE_API,
  prettyName,
  paddedId,
  getStat,
  getTypes,
  totalStats,
  spriteOfficial,
} from '../../utils/pokeUtils';
import { STAT_LABEL, getEffectiveness, PokemonType } from '../../data/types';
import css from './Compare.module.css';
import { LuSwords, LuShield, LuShuffle } from 'react-icons/lu';

const STAT_KEYS = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

async function fetchPoke(name: string): Promise<any> {
  const response = await axios.get(`${POKE_API}/pokemon/${name}`);
  return response.data;
}

export const Compare = () => {
  const pokeList = useSelector(selectPokemons);
  const [leftQuery, setLeftQuery] = useState('pikachu');
  const [rightQuery, setRightQuery] = useState('charizard');
  const [left, setLeft] = useState<any>(null);
  const [right, setRight] = useState<any>(null);
  const [loadingLeft, setLoadingLeft] = useState(false);
  const [loadingRight, setLoadingRight] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingLeft(true);
      try {
        const data = await fetchPoke(leftQuery.toLowerCase());
        if (!cancelled) setLeft(data);
      } catch {
        if (!cancelled) setLeft(null);
      } finally {
        if (!cancelled) setLoadingLeft(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [leftQuery]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingRight(true);
      try {
        const data = await fetchPoke(rightQuery.toLowerCase());
        if (!cancelled) setRight(data);
      } catch {
        if (!cancelled) setRight(null);
      } finally {
        if (!cancelled) setLoadingRight(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [rightQuery]);

  const randomize = () => {
    if (pokeList.length < 2) return;
    const a = pokeList[Math.floor(Math.random() * pokeList.length)];
    const b = pokeList[Math.floor(Math.random() * pokeList.length)];
    setLeftQuery(a.name);
    setRightQuery(b.name);
  };

  const winnerStat = (a?: any, b?: any, key?: string) => {
    if (!a || !b || !key) return 'tie';
    const av = getStat(a.stats, key);
    const bv = getStat(b.stats, key);
    if (av === bv) return 'tie';
    return av > bv ? 'left' : 'right';
  };

  const leftTypes = left ? (getTypes(left) as PokemonType[]) : [];
  const rightTypes = right ? (getTypes(right) as PokemonType[]) : [];

  const leftAttacksRight = leftTypes[0] ? getEffectiveness(leftTypes[0], rightTypes) : 1;
  const rightAttacksLeft = rightTypes[0] ? getEffectiveness(rightTypes[0], leftTypes) : 1;

  const leftBst = left ? totalStats(left.stats) : 0;
  const rightBst = right ? totalStats(right.stats) : 0;

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Side-by-side</span>
          <h2 className={css.title}>Pokémon Comparator</h2>
          <p>Compare any two Pokémon's stats, types and matchup.</p>
        </div>
        <Button variant="ghost" size="sm" iconLeft={<LuShuffle />} onClick={randomize}>
          Randomize
        </Button>
      </header>

      <div className={css.searchRow}>
        <input
          className={css.search}
          value={leftQuery}
          onChange={e => setLeftQuery(e.target.value)}
          placeholder="Pokémon name (e.g. pikachu)"
        />
        <span className={css.vs}>VS</span>
        <input
          className={css.search}
          value={rightQuery}
          onChange={e => setRightQuery(e.target.value)}
          placeholder="Pokémon name (e.g. charizard)"
        />
      </div>

      <div className={css.duel}>
        <Side
          poke={left}
          loading={loadingLeft}
          types={leftTypes}
          bst={leftBst}
          align="left"
          opponentBst={rightBst}
        />
        <Side
          poke={right}
          loading={loadingRight}
          types={rightTypes}
          bst={rightBst}
          align="right"
          opponentBst={leftBst}
        />
      </div>

      {left && right && (
        <motion.div
          className={css.statsCompare}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className={css.compareTitle}>Stat-by-stat showdown</h3>
          <div className={css.statRows}>
            {STAT_KEYS.map(key => {
              const av = getStat(left.stats, key);
              const bv = getStat(right.stats, key);
              const winner = winnerStat(left, right, key);
              return (
                <div key={key} className={css.statRow}>
                  <div className={`${css.statHalf} ${winner === 'left' ? css.statWin : ''}`}>
                    <span>{av}</span>
                    <StatBar
                      label=""
                      value={av}
                      max={Math.max(255, Math.max(av, bv))}
                      showValue={false}
                    />
                  </div>
                  <span className={css.statKey}>{STAT_LABEL[key] ?? key}</span>
                  <div className={`${css.statHalf} ${winner === 'right' ? css.statWin : ''}`}>
                    <StatBar
                      label=""
                      value={bv}
                      max={Math.max(255, Math.max(av, bv))}
                      showValue={false}
                    />
                    <span>{bv}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={css.matchup}>
            <h3 className={css.compareTitle}>Type matchup</h3>
            <div className={css.matchupRow}>
              <div className={css.matchupSide}>
                <LuSwords />
                <span>{prettyName(left.name)}</span>
                <strong>×{leftAttacksRight}</strong>
                <small>vs {prettyName(right.name)}</small>
              </div>
              <div className={css.matchupSide}>
                <LuShield />
                <span>{prettyName(right.name)}</span>
                <strong>×{rightAttacksLeft}</strong>
                <small>vs {prettyName(left.name)}</small>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface SideProps {
  poke: any;
  loading: boolean;
  types: PokemonType[];
  bst: number;
  align: 'left' | 'right';
  opponentBst: number;
}

const Side = ({ poke, loading, types, bst, align, opponentBst }: SideProps) => {
  if (loading) return <div className={css.side}><PokeballLoader label="Searching" /></div>;
  if (!poke) return <div className={css.side}>Pokémon not found.</div>;

  const better = bst > opponentBst;

  return (
    <div className={`${css.side} ${css[`side_${align}`]} ${better ? css.sideBetter : ''}`}>
      <img src={spriteOfficial(poke.id)} alt={poke.name} className={css.image} />
      <div className={css.info}>
        <span className={css.id}>{paddedId(poke.id)}</span>
        <h3 className={css.name}>{prettyName(poke.name)}</h3>
        <div className={css.types}>
          {types.map(t => (
            <TypeBadge key={t} type={t} size="sm" />
          ))}
        </div>
        <div className={css.bstChip}>
          BST <strong>{bst}</strong>
        </div>
      </div>
    </div>
  );
};
