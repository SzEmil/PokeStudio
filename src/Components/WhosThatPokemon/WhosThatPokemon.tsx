import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Notiflix from 'notiflix';
import { Button } from '../UI/Button';
import { Pokeball } from '../UI/Pokeball';
import { Confetti } from '../UI/Confetti';
import { TypeBadge } from '../UI/TypeBadge';
import { POKE_API, prettyName, paddedId, spriteOfficial, getTypes } from '../../utils/pokeUtils';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { whosThatGuessCorrect, whosThatGuessWrong } from '../../Redux/stats/statsSlice';
import { selectPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { getMoneyForBattle } from '../../Redux/auth/authOperations';
import { selectAuthIsLoggedIn } from '../../Redux/auth/authSelectors';
import { AppDispatch } from '../../Redux/store';
import css from './WhosThatPokemon.module.css';
import { LuRefreshCw, LuFlame, LuCheck, LuX } from 'react-icons/lu';

type Phase = 'guess' | 'reveal';

const REWARD_PER_STREAK = 35;

export const WhosThatPokemon = () => {
  const dispatch: AppDispatch = useDispatch();
  const stats = useSelector(selectStats);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const pokeList = useSelector(selectPokemons);

  const [target, setTarget] = useState<any>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('guess');
  const [picked, setPicked] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const initRef = useRef(false);

  const fetchRound = async () => {
    setLoading(true);
    setPicked(null);
    setPhase('guess');
    setShowConfetti(false);

    const candidates =
      pokeList.length >= 100 ? pokeList : Array.from({ length: 898 }).map((_, i) => ({ name: `${i + 1}`, url: '' }));

    const id = Math.floor(Math.random() * 898) + 1;
    try {
      const target = await axios.get(`${POKE_API}/pokemon/${id}`);
      const distractors = new Set<string>();
      while (distractors.size < 3) {
        const candidate = candidates[Math.floor(Math.random() * candidates.length)];
        const name = candidate.name;
        if (name && name !== target.data.name) distractors.add(name);
      }
      const opts = Array.from(distractors).concat(target.data.name);
      opts.sort(() => Math.random() - 0.5);
      setTarget(target.data);
      setOptions(opts);
    } catch {
      Notiflix.Notify.failure('Failed to load Pokémon. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    fetchRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = (name: string) => {
    if (phase !== 'guess' || !target) return;
    setPicked(name);
    setPhase('reveal');
    if (name === target.name) {
      dispatch(whosThatGuessCorrect());
      setShowConfetti(true);
      if (isLoggedIn) {
        const reward = REWARD_PER_STREAK * (stats.whosThatPokemonStreak + 1);
        dispatch(getMoneyForBattle(reward));
      }
    } else {
      dispatch(whosThatGuessWrong());
    }
  };

  const types = useMemo(() => (target ? getTypes(target) : []), [target]);

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Mini-game</span>
          <h2 className={css.title}>Who's that Pokémon?</h2>
          <p>
            A silhouette appears. Guess the right Pokémon to earn{' '}
            <strong>{REWARD_PER_STREAK}¢ × streak</strong>.
          </p>
        </div>
        <div className={css.scoreboard}>
          <div className={css.scoreChip}>
            <LuFlame /> Streak <strong>{stats.whosThatPokemonStreak}</strong>
          </div>
          <div className={css.scoreChip}>
            Best <strong>{stats.whosThatPokemonBest}</strong>
          </div>
        </div>
      </header>

      <div className={css.stage}>
        {loading ? (
          <div className={css.silhouetteWrap}>
            <Pokeball size={60} spinning />
          </div>
        ) : target ? (
          <>
            <div className={css.silhouetteWrap}>
              <motion.img
                key={target.id}
                src={spriteOfficial(target.id)}
                alt="?"
                className={`${css.silhouette} ${phase === 'reveal' ? css.revealed : ''}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              {showConfetti && <Confetti count={50} />}
              {phase === 'reveal' && (
                <motion.div
                  className={css.idTag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span>{paddedId(target.id)}</span>
                  <strong>{prettyName(target.name)}</strong>
                  <div className={css.idTypes}>
                    {types.map(t => (
                      <TypeBadge key={t} type={t} size="sm" />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className={css.options}>
              {options.map(opt => {
                const isCorrect = phase === 'reveal' && opt === target.name;
                const isWrong = phase === 'reveal' && opt === picked && opt !== target.name;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handlePick(opt)}
                    className={`${css.option} ${isCorrect ? css.optionCorrect : ''} ${
                      isWrong ? css.optionWrong : ''
                    }`}
                    disabled={phase !== 'guess'}
                  >
                    <span>{prettyName(opt)}</span>
                    {isCorrect && <LuCheck />}
                    {isWrong && <LuX />}
                  </button>
                );
              })}
            </div>

            {phase === 'reveal' && (
              <motion.div
                className={css.feedback}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {picked === target.name ? (
                  <p className={css.correctMsg}>
                    Correct! +
                    {isLoggedIn ? REWARD_PER_STREAK * stats.whosThatPokemonStreak : 0}
                    ¢ — keep the streak alive!
                  </p>
                ) : (
                  <p className={css.wrongMsg}>
                    Wrong, it was <strong>{prettyName(target.name)}</strong>. Streak reset.
                  </p>
                )}
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={<LuRefreshCw />}
                  onClick={fetchRound}
                >
                  Next Pokémon
                </Button>
              </motion.div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
