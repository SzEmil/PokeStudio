import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { POKE_API, prettyName, paddedId, spriteOfficial, getStat, getTypes, totalStats } from '../../utils/pokeUtils';
import { TYPE_COLORS, ALL_TYPES, getEffectiveness, PokemonType } from '../../data/types';
import { Button } from '../UI/Button';
import { Pokeball } from '../UI/Pokeball';
import { TypeBadge } from '../UI/TypeBadge';
import { triviaAnswer } from '../../Redux/stats/statsSlice';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { getMoneyForBattle } from '../../Redux/auth/authOperations';
import { selectAuthIsLoggedIn } from '../../Redux/auth/authSelectors';
import { AppDispatch } from '../../Redux/store';
import css from './Trivia.module.css';
import { LuRefreshCw, LuBrain, LuCheck, LuX } from 'react-icons/lu';

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
  pokemon?: any;
  hint?: string;
};

type Difficulty = 'easy' | 'medium' | 'hard';

const REWARDS: Record<Difficulty, number> = {
  easy: 50,
  medium: 120,
  hard: 250,
};

const DIFFICULTY_RANGES: Record<Difficulty, [number, number]> = {
  easy: [1, 151], // Kanto
  medium: [1, 493], // Up to Sinnoh
  hard: [1, 898], // All
};

async function fetchRandomPokemon(diff: Difficulty): Promise<any> {
  const [min, max] = DIFFICULTY_RANGES[diff];
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  const r = await axios.get(`${POKE_API}/pokemon/${id}`);
  return r.data;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

async function buildQuestion(diff: Difficulty): Promise<Question> {
  const variants = ['type', 'baseStat', 'totalStats', 'effectiveness', 'gen'];
  const pick = variants[Math.floor(Math.random() * variants.length)];

  const target = await fetchRandomPokemon(diff);
  const types: PokemonType[] = getTypes(target);

  if (pick === 'type') {
    const correct = types[0];
    const distractors = shuffle(ALL_TYPES.filter(t => !types.includes(t))).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    return {
      prompt: `What is the primary type of ${prettyName(target.name)}?`,
      options,
      correctIndex: options.indexOf(correct),
      pokemon: target,
    };
  }

  if (pick === 'totalStats') {
    const total = totalStats(target.stats);
    const distractors = [
      total + 30,
      total - 40,
      total + 80,
      total - 70,
    ].filter(n => n > 0);
    const options = shuffle([total, ...shuffle(distractors).slice(0, 3)]).map(String);
    return {
      prompt: `What is the BST (base stat total) of ${prettyName(target.name)}?`,
      options,
      correctIndex: options.indexOf(String(total)),
      pokemon: target,
    };
  }

  if (pick === 'baseStat') {
    const which = ['hp', 'attack', 'defense', 'speed'][Math.floor(Math.random() * 4)];
    const v = getStat(target.stats, which);
    const distractors = [v + 15, v - 20, v + 30, v - 35].filter(n => n > 0);
    const options = shuffle([v, ...shuffle(distractors).slice(0, 3)]).map(String);
    return {
      prompt: `What is the base ${which.toUpperCase()} of ${prettyName(target.name)}?`,
      options,
      correctIndex: options.indexOf(String(v)),
      pokemon: target,
    };
  }

  if (pick === 'effectiveness') {
    const enemy = ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];
    const mult = getEffectiveness(enemy, types);
    const optionPool = [0, 0.25, 0.5, 1, 2, 4];
    const distractors = shuffle(optionPool.filter(o => o !== mult)).slice(0, 3);
    const options = shuffle([mult, ...distractors]).map(o => `×${o}`);
    return {
      prompt: `How effective is a ${enemy.toUpperCase()} attack against ${prettyName(target.name)} (${types.join('/')})?`,
      options,
      correctIndex: options.indexOf(`×${mult}`),
      pokemon: target,
    };
  }

  /* generation */
  const gen = generationOfId(target.id);
  const otherGens = shuffle([1, 2, 3, 4, 5, 6, 7, 8].filter(g => g !== gen.id)).slice(0, 3);
  const options = shuffle([gen, ...otherGens.map(id => ({ id, label: `Gen ${id}` }))]).map(o =>
    typeof o === 'object' && 'label' in o ? o.label : `Gen ${o}`
  );
  return {
    prompt: `Which generation is ${prettyName(target.name)} from?`,
    options,
    correctIndex: options.indexOf(`Gen ${gen.id}`),
    pokemon: target,
  };
}

function generationOfId(id: number) {
  if (id <= 151) return { id: 1, label: 'Gen 1' };
  if (id <= 251) return { id: 2, label: 'Gen 2' };
  if (id <= 386) return { id: 3, label: 'Gen 3' };
  if (id <= 493) return { id: 4, label: 'Gen 4' };
  if (id <= 649) return { id: 5, label: 'Gen 5' };
  if (id <= 721) return { id: 6, label: 'Gen 6' };
  if (id <= 809) return { id: 7, label: 'Gen 7' };
  return { id: 8, label: 'Gen 8' };
}

export const Trivia = () => {
  const dispatch: AppDispatch = useDispatch();
  const stats = useSelector(selectStats);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const [diff, setDiff] = useState<Difficulty>('easy');
  const [question, setQuestion] = useState<Question | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const acc = useMemo(
    () => (stats.triviaPlayed > 0 ? Math.round((stats.triviaCorrect / stats.triviaPlayed) * 100) : 0),
    [stats.triviaCorrect, stats.triviaPlayed]
  );

  const loadQuestion = async (d = diff) => {
    setLoading(true);
    setPicked(null);
    try {
      const q = await buildQuestion(d);
      setQuestion(q);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (idx: number) => {
    if (picked !== null || !question) return;
    setPicked(idx);
    const correct = idx === question.correctIndex;
    dispatch(triviaAnswer({ correct }));
    if (correct && isLoggedIn) {
      dispatch(getMoneyForBattle(REWARDS[diff]));
    }
  };

  const types = question?.pokemon ? getTypes(question.pokemon) : [];

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Mini-game</span>
          <h2 className={css.title}>Pokémon Trivia</h2>
          <p>
            Five rotating question types. Earn{' '}
            <strong style={{ color: TYPE_COLORS.electric }}>{REWARDS[diff]}¢</strong> for each correct answer on
            <strong> {diff}</strong> mode.
          </p>
        </div>
        <div className={css.scoreboard}>
          <div className={css.scoreChip}>
            <LuBrain /> Acc <strong>{acc}%</strong>
          </div>
          <div className={css.scoreChip}>
            Correct <strong>{stats.triviaCorrect}</strong>/{stats.triviaPlayed}
          </div>
        </div>
      </header>

      <div className={css.diffRow}>
        {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
          <button
            key={d}
            type="button"
            className={`${css.diffBtn} ${diff === d ? css.diffBtnActive : ''}`}
            onClick={() => {
              setDiff(d);
              loadQuestion(d);
            }}
          >
            {d.toUpperCase()}
            <small>+{REWARDS[d]}¢</small>
          </button>
        ))}
      </div>

      <div className={css.stage}>
        {loading || !question ? (
          <div className={css.loadBox}>
            <Pokeball size={48} spinning />
          </div>
        ) : (
          <>
            <motion.div
              className={css.questionArea}
              key={question.prompt}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {question.pokemon && (
                <div className={css.pokeBlock}>
                  <img src={spriteOfficial(question.pokemon.id)} alt={question.pokemon.name} />
                  <div className={css.pokeMeta}>
                    <span>{paddedId(question.pokemon.id)}</span>
                    <strong>{prettyName(question.pokemon.name)}</strong>
                    <div className={css.pokeTypes}>
                      {types.map(t => (
                        <TypeBadge key={t} type={t} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <h3 className={css.prompt}>{question.prompt}</h3>
            </motion.div>

            <div className={css.options}>
              {question.options.map((opt, i) => {
                const isCorrect = picked !== null && i === question.correctIndex;
                const isWrong = picked === i && i !== question.correctIndex;
                return (
                  <button
                    key={`${opt}-${i}`}
                    type="button"
                    onClick={() => handleAnswer(i)}
                    disabled={picked !== null}
                    className={`${css.option} ${isCorrect ? css.optCorrect : ''} ${
                      isWrong ? css.optWrong : ''
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrect && <LuCheck />}
                    {isWrong && <LuX />}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <motion.div
                className={css.feedback}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {picked === question.correctIndex ? (
                  <p className={css.feedbackOk}>
                    Correct! +{isLoggedIn ? REWARDS[diff] : 0}¢
                  </p>
                ) : (
                  <p className={css.feedbackBad}>
                    Wrong. Right answer was <strong>{question.options[question.correctIndex]}</strong>.
                  </p>
                )}
                <Button
                  variant="primary"
                  iconLeft={<LuRefreshCw />}
                  onClick={() => loadQuestion()}
                >
                  Next question
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
