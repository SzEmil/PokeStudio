import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Notiflix from 'notiflix';
import {
  POKE_API,
  prettyName,
  paddedId,
  spriteOfficial,
  getStat,
  getTypes,
  totalStats,
} from '../../utils/pokeUtils';
import { TypeBadge } from '../UI/TypeBadge';
import { Button } from '../UI/Button';
import { Pokeball } from '../UI/Pokeball';
import { Confetti } from '../UI/Confetti';
import { catchAttempt } from '../../Redux/stats/statsSlice';
import { addCard } from '../../Redux/auth/authOperations';
import { selectAuthIsLoggedIn } from '../../Redux/auth/authSelectors';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { AppDispatch } from '../../Redux/store';
import css from './WildEncounter.module.css';
import { LuRefreshCw } from 'react-icons/lu';

type Phase = 'wild' | 'aiming' | 'throwing' | 'result';

const ENCOUNTER_BIASES = [
  { weight: 50, range: [1, 200] }, // common
  { weight: 35, range: [200, 700] }, // uncommon
  { weight: 13, range: [700, 898] }, // rare
  { weight: 2, range: [144, 151] }, // legendary chance
];

function pickEncounterId(): number {
  const total = ENCOUNTER_BIASES.reduce((s, b) => s + b.weight, 0);
  let roll = Math.random() * total;
  for (const b of ENCOUNTER_BIASES) {
    if (roll < b.weight) {
      const [min, max] = b.range;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    roll -= b.weight;
  }
  return Math.floor(Math.random() * 898) + 1;
}

export const WildEncounter = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const stats = useSelector(selectStats);

  const [pokemon, setPokemon] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [phase, setPhase] = useState<Phase>('wild');
  const [loading, setLoading] = useState(true);
  const [meterPos, setMeterPos] = useState(0);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<'caught' | 'flee' | null>(null);
  const [throws, setThrows] = useState(3);
  const animRef = useRef<number | null>(null);

  const fetchEncounter = async () => {
    setLoading(true);
    setPhase('wild');
    setOutcome(null);
    setStoppedAt(null);
    setMeterPos(0);
    setThrows(3);

    const id = pickEncounterId();
    try {
      const r = await axios.get(`${POKE_API}/pokemon/${id}`);
      setPokemon(r.data);
      try {
        const speciesUrl = r.data.species?.url;
        if (speciesUrl) {
          const r2 = await axios.get(speciesUrl);
          setDetails(r2.data);
        } else {
          setDetails(null);
        }
      } catch {
        setDetails(null);
      }
    } catch {
      Notiflix.Notify.failure('Wild Pokémon escaped before the encounter started.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEncounter();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Animate meter while aiming */
  useEffect(() => {
    if (phase !== 'aiming') return;
    let direction = 1;
    let pos = 0;
    const tick = () => {
      pos += direction * 1.4;
      if (pos >= 100) {
        pos = 100;
        direction = -1;
      }
      if (pos <= 0) {
        pos = 0;
        direction = 1;
      }
      setMeterPos(pos);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase]);

  const handleStartAim = () => {
    setPhase('aiming');
  };

  const handleThrow = () => {
    if (phase !== 'aiming' || !pokemon) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const distanceFromCenter = Math.abs(meterPos - 50);
    const accuracy = Math.max(0, 1 - distanceFromCenter / 50);
    const baseRate =
      pokemon.base_experience >= 250
        ? 0.18
        : pokemon.base_experience >= 180
        ? 0.42
        : pokemon.base_experience >= 110
        ? 0.66
        : 0.85;
    const success = Math.random() < baseRate * (0.4 + accuracy * 0.6);
    setStoppedAt(meterPos);
    setPhase('throwing');

    setTimeout(() => {
      dispatch(catchAttempt({ success }));
      if (success) {
        setOutcome('caught');
        setPhase('result');
        if (isLoggedIn && pokemon && details) {
          dispatch(addCard({ card: { overview: pokemon, details } as any }));
          Notiflix.Notify.success(
            `${prettyName(pokemon.name)} was caught and added to your shelf!`
          );
        } else if (!isLoggedIn) {
          Notiflix.Notify.info('Sign in to keep wild Pokémon you catch.');
        }
      } else {
        const newThrows = throws - 1;
        setThrows(newThrows);
        if (newThrows <= 0) {
          setOutcome('flee');
          setPhase('result');
          Notiflix.Notify.warning(
            `${prettyName(pokemon.name)} broke free and fled into the wild.`
          );
        } else {
          setPhase('wild');
          Notiflix.Notify.failure(
            `${prettyName(pokemon.name)} broke free! ${newThrows} Pokéball${newThrows > 1 ? 's' : ''} left.`
          );
        }
      }
    }, 900);
  };

  const types = pokemon ? getTypes(pokemon) : [];
  const hp = pokemon ? getStat(pokemon.stats, 'hp') : 0;
  const speed = pokemon ? getStat(pokemon.stats, 'speed') : 0;

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Mini-game</span>
          <h2 className={css.title}>Wild encounter</h2>
          <p>
            A wild Pokémon appears! Time your throw to land the meter near the center.
            {' '}
            {isLoggedIn ? 'Catches are added straight to your shelf.' : 'Sign in to keep the catch.'}
          </p>
        </div>
        <div className={css.scoreboard}>
          <div className={css.scoreChip}>
            Caught <strong>{stats.catchesSucceeded}</strong>/{stats.catchesAttempted}
          </div>
          <div className={css.scoreChip}>
            Throws left <strong>{throws}</strong>/3
          </div>
        </div>
      </header>

      <div className={css.stage}>
        {loading || !pokemon ? (
          <div className={css.empty}>
            <Pokeball size={60} spinning />
          </div>
        ) : (
          <>
            <div className={css.creatureBox}>
              <motion.img
                key={pokemon.id}
                className={`${css.creature} ${phase === 'throwing' ? css.shake : ''} ${
                  outcome === 'caught' ? css.caught : ''
                }`}
                src={spriteOfficial(pokemon.id)}
                alt={pokemon.name}
                initial={{ y: 0, opacity: 0 }}
                animate={
                  outcome === 'caught'
                    ? { scale: 0.4, opacity: 0, y: 50 }
                    : outcome === 'flee'
                    ? { x: -300, opacity: 0 }
                    : { y: [0, -10, 0], opacity: 1 }
                }
                transition={
                  outcome
                    ? { duration: 0.6 }
                    : { repeat: Infinity, duration: 2.6, ease: 'easeInOut' }
                }
                onError={e => {
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                }}
              />
              {outcome === 'caught' && <Confetti count={70} />}

              <div className={css.creatureInfo}>
                <span className={css.creatureId}>{paddedId(pokemon.id)}</span>
                <h3>{prettyName(pokemon.name)}</h3>
                <div className={css.creatureTypes}>
                  {types.map(t => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
                <div className={css.creatureStats}>
                  <span>HP {hp}</span>
                  <span>SPD {speed}</span>
                  <span>BST {totalStats(pokemon.stats)}</span>
                </div>
              </div>
            </div>

            {phase === 'wild' && outcome === null && (
              <div className={css.actionRow}>
                <Button variant="primary" size="lg" onClick={handleStartAim}>
                  Throw Pokéball ({throws} left)
                </Button>
                <Button variant="ghost" onClick={fetchEncounter}>
                  Run away
                </Button>
              </div>
            )}

            {phase === 'aiming' && (
              <div className={css.aimWrap}>
                <p className={css.hint}>Tap when the marker is in the green zone!</p>
                <div className={css.meter}>
                  <div className={css.zone} />
                  <motion.div
                    className={css.marker}
                    style={{ left: `${meterPos}%` }}
                  />
                </div>
                <Button variant="primary" size="lg" onClick={handleThrow}>
                  Throw now!
                </Button>
              </div>
            )}

            {phase === 'throwing' && (
              <div className={css.throwing}>
                <Pokeball size={42} spinning />
                <span>
                  Accuracy: {Math.round(100 - Math.abs((stoppedAt ?? 0) - 50) * 2)}%
                </span>
              </div>
            )}

            {phase === 'result' && (
              <motion.div
                className={`${css.result} ${
                  outcome === 'caught' ? css.resultCaught : css.resultFled
                }`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {outcome === 'caught' ? (
                  <h3>You caught {prettyName(pokemon.name)}!</h3>
                ) : (
                  <h3>{prettyName(pokemon.name)} fled into the wild.</h3>
                )}
                <Button
                  variant="primary"
                  iconLeft={<LuRefreshCw />}
                  onClick={fetchEncounter}
                >
                  New encounter
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
