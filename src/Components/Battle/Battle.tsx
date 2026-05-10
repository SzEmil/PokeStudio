import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AnimatePresence } from '../UI/AnimatePresenceFix';
import Notiflix from 'notiflix';

import { selectAuthUser } from '../../Redux/auth/authSelectors';
import {
  selectBattleUser,
  selectBattleComputer,
  selectIsGameStarted,
  selectUserMove,
  selectComputerMove,
} from '../../Redux/battle/battleSelectors';
import {
  addToArena,
  addToArenaComputer,
  setUserHp,
  setComputerHp,
  setTurn,
  startGame,
  stopGame,
  resetBattleSquads,
} from '../../Redux/battle/battleSlice';
import { fetchAIPokemons } from '../../Redux/battle/battleOperations';
import { userLostCard, getMoneyForBattle } from '../../Redux/auth/authOperations';
import { addBattleWon, addBattleLost } from '../../Redux/stats/statsSlice';
import { AppDispatch } from '../../Redux/store';

import { Button } from '../UI/Button';
import { TypeBadge } from '../UI/TypeBadge';
import { Pokeball } from '../UI/Pokeball';
import {
  prettyName,
  paddedId,
  damageCalc,
  delay,
  getStat,
  getTypes,
  spriteOfficial,
} from '../../utils/pokeUtils';
import { PokemonType, getEffectiveness } from '../../data/types';
import css from './Battle.module.css';
import {
  LuSwords,
  LuShield,
  LuZap,
  LuRefreshCw,
  LuPlay,
  LuTrophy,
  LuFlame,
  LuInfo,
} from 'react-icons/lu';

type Difficulty = 'easy' | 'medium' | 'hard' | 'master';

const REWARDS: Record<Difficulty, number> = {
  easy: 600,
  medium: 1200,
  hard: 2200,
  master: 4500,
};
const PENALTIES: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 2,
  master: 3,
};

type Action =
  | { kind: 'attack'; movePower: number; isSpecial?: boolean }
  | { kind: 'special'; movePower: number }
  | { kind: 'defend' };

const Battle = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectBattleUser);
  const battleComputer = useSelector(selectBattleComputer);
  const userData = useSelector(selectAuthUser);
  const isGameStarted = useSelector(selectIsGameStarted);
  const userMove = useSelector(selectUserMove);
  const computerMove = useSelector(selectComputerMove);

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [showResult, setShowResult] = useState<null | 'won' | 'lost'>(null);
  const [defendingUser, setDefendingUser] = useState(false);
  const [defendingComputer, setDefendingComputer] = useState(false);
  const [chargeUser, setChargeUser] = useState(0);
  const [chargeComputer, setChargeComputer] = useState(0);
  const [animUserAttack, setAnimUserAttack] = useState(false);
  const [animComputerAttack, setAnimComputerAttack] = useState(false);
  const [floatTextUser, setFloatTextUser] = useState<string>('');
  const [floatTextComputer, setFloatTextComputer] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [defeatedUser, setDefeatedUser] = useState<number[]>([]);
  const [defeatedComputer, setDefeatedComputer] = useState<number[]>([]);
  const [lostPokemons, setLostPokemons] = useState<any[]>([]);
  const [aiTurnPending, setAiTurnPending] = useState(false);

  const userArena = user.pokemonOnArena;
  const compArena = battleComputer.pokemonOnArena;

  const userCards = user.cards ?? [];
  const compCards = battleComputer.cards ?? [];

  const userTypes: PokemonType[] = useMemo(
    () => (userArena ? getTypes(userArena.overview) : []),
    [userArena]
  );
  const compTypes: PokemonType[] = useMemo(
    () => (compArena ? getTypes(compArena) : []),
    [compArena]
  );

  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [log]);

  /* Reset visual state on game start */
  useEffect(() => {
    if (isGameStarted) {
      setLog([]);
      setDefeatedUser([]);
      setDefeatedComputer([]);
      setChargeUser(0);
      setChargeComputer(0);
    }
  }, [isGameStarted]);

  const writeLog = (s: string) => setLog(l => [...l, s]);

  /* ---------- Helpers ---------- */

  const fetchAI = (d: Difficulty) => {
    dispatch(fetchAIPokemons(d));
    setDifficulty(d);
  };

  const startBattle = () => {
    if (!difficulty) {
      Notiflix.Notify.warning('Pick a difficulty first.');
      return;
    }
    if (userCards.length < 3 || compCards.length < 3) {
      Notiflix.Notify.warning('Both squads need 3 Pokémon.');
      return;
    }
    if (!userArena) {
      Notiflix.Notify.warning('Send your first Pokémon to the arena first.');
      return;
    }
    dispatch(startGame());
    dispatch(addToArenaComputer(compCards[0]));
    setShowResult(null);
    writeLog(
      `Battle started — ${userData.username} vs AI on ${difficulty.toUpperCase()} difficulty.`
    );
  };

  const endBattle = (won: boolean) => {
    if (won) {
      dispatch(addBattleWon());
      const reward = REWARDS[difficulty ?? 'easy'];
      dispatch(getMoneyForBattle(reward));
      writeLog(`Victory! +${reward} coins earned.`);
      Notiflix.Notify.success(
        `Congrats ${userData.username}! +${reward} coins.`
      );
      setShowResult('won');
    } else {
      dispatch(addBattleLost());
      const lossCount = PENALTIES[difficulty ?? 'easy'];
      const ids = userCards.map(c => c.overview!.id);
      const lost: number[] = [];
      while (lost.length < Math.min(lossCount, ids.length)) {
        const r = ids[Math.floor(Math.random() * ids.length)];
        if (!lost.includes(r)) lost.push(r);
      }
      const lostCards = userCards.filter(c => lost.includes(c.overview!.id));
      setLostPokemons(lostCards);
      dispatch(userLostCard(lost));
      writeLog(`Defeat... You lost ${lossCount} Pokémon from your collection.`);
      Notiflix.Notify.failure(`You lost. Train harder, ${userData.username}.`);
      setShowResult('lost');
    }
    dispatch(stopGame());
  };

  /* ---------- User actions ---------- */

  const handleUserAction = async (action: Action) => {
    if (!userMove || !userArena || !compArena) return;

    if (action.kind === 'defend') {
      setDefendingUser(true);
      setChargeUser(c => Math.min(3, c + 1));
      writeLog(`${prettyName(userArena.overview.name)} braced for impact.`);
      dispatch(setTurn('computer'));
      setTimeout(() => setDefendingUser(false), 1500);
      setAiTurnPending(true);
      return;
    }

    setAnimUserAttack(true);
    setTimeout(() => setAnimUserAttack(false), 700);

    const isSpecial = action.kind === 'special';
    // STAB placeholder — keep at 1 until move-type metadata is wired
    const stab = userTypes.length > 0 ? 1 : 1;
    const attackerStat = isSpecial
      ? getStat(userArena.overview.stats, 'special-attack')
      : getStat(userArena.overview.stats, 'attack');
    const defenderStat = defendingComputer
      ? isSpecial
        ? getStat(compArena.stats, 'special-defense') * 1.5
        : getStat(compArena.stats, 'defense') * 1.5
      : isSpecial
      ? getStat(compArena.stats, 'special-defense')
      : getStat(compArena.stats, 'defense');
    const eff =
      compTypes.length > 0 && userTypes.length > 0
        ? getEffectiveness(userTypes[0], compTypes)
        : 1;
    const isCrit = Math.random() < 0.1;

    const dmg = damageCalc({
      attackerStat,
      defenderStat,
      movePower: action.movePower,
      effectiveness: eff,
      isSpecial,
      isCrit,
      stab,
    });

    const remainingHp = Math.max(0, getStat(compArena.stats, 'hp') - dmg);
    dispatch(setComputerHp({ id: compArena.id, hp: remainingHp }));
    setFloatTextComputer(`-${dmg}`);
    setTimeout(() => setFloatTextComputer(''), 1200);

    const tag =
      eff === 0
        ? ' (no effect)'
        : eff > 1
        ? ' — super effective!'
        : eff < 1
        ? ' — not very effective'
        : '';
    writeLog(
      `${prettyName(userArena.overview.name)} used ${
        isSpecial ? 'Special Attack' : 'Hit'
      } for ${dmg} dmg${tag}${isCrit ? ' (CRITICAL!)' : ''}.`
    );

    if (isSpecial) setChargeUser(0);
    else setChargeUser(c => Math.min(3, c + 1));

    setDefendingComputer(false);

    if (remainingHp <= 0) {
      writeLog(`${prettyName(compArena.name)} fainted.`);
      setDefeatedComputer(p => [...p, compArena.id]);
      const next = compCards.find(
        c => !defeatedComputer.includes(c.id) && c.id !== compArena.id && c.stats.find((s: any) => s.stat.name === 'hp')?.base_stat > 0
      );
      if (next) {
        await delay(900);
        dispatch(addToArenaComputer(next));
        writeLog(`AI sent out ${prettyName(next.name)}.`);
        dispatch(setTurn('user'));
      } else {
        await delay(700);
        endBattle(true);
      }
      return;
    }

    dispatch(setTurn('computer'));
    setAiTurnPending(true);
  };

  /* ---------- Computer turn (effect) ---------- */

  useEffect(() => {
    if (!aiTurnPending || !isGameStarted || !computerMove || !userArena || !compArena) return;
    setAiTurnPending(false);

    const run = async () => {
      await delay(900);
      /* Decision: defend if low hp; special if charged; otherwise attack */
      const compHpStat = getStat(compArena.stats, 'hp');
      const compMaxHp = getStat(compArena.stats, 'hp') || 1;
      const ratio = compHpStat / compMaxHp;
      let decision: 'attack' | 'special' | 'defend' = 'attack';
      if (chargeComputer >= 3 && Math.random() > 0.2) decision = 'special';
      else if (ratio < 0.35 && Math.random() < 0.4) decision = 'defend';

      if (decision === 'defend') {
        setDefendingComputer(true);
        setChargeComputer(c => Math.min(3, c + 1));
        writeLog(`AI's ${prettyName(compArena.name)} braced.`);
        setTimeout(() => setDefendingComputer(false), 1500);
        dispatch(setTurn('user'));
        return;
      }

      setAnimComputerAttack(true);
      setTimeout(() => setAnimComputerAttack(false), 700);

      const isSpecial = decision === 'special';
      const attackerStat = isSpecial
        ? getStat(compArena.stats, 'special-attack')
        : getStat(compArena.stats, 'attack');
      const userStats = userArena.overview.stats;
      const defenderStat = defendingUser
        ? isSpecial
          ? getStat(userStats, 'special-defense') * 1.5
          : getStat(userStats, 'defense') * 1.5
        : isSpecial
        ? getStat(userStats, 'special-defense')
        : getStat(userStats, 'defense');
      const eff =
        compTypes.length > 0 && userTypes.length > 0
          ? getEffectiveness(compTypes[0], userTypes)
          : 1;
      const isCrit = Math.random() < 0.08;

      const dmg = damageCalc({
        attackerStat,
        defenderStat,
        movePower: isSpecial ? 75 : 45,
        effectiveness: eff,
        isSpecial,
        isCrit,
      });
      const remaining = Math.max(0, getStat(userStats, 'hp') - dmg);
      dispatch(setUserHp({ id: userArena.overview.id, hp: remaining }));
      setFloatTextUser(`-${dmg}`);
      setTimeout(() => setFloatTextUser(''), 1200);
      const tag =
        eff === 0
          ? ' (no effect)'
          : eff > 1
          ? ' — super effective!'
          : eff < 1
          ? ' — not very effective'
          : '';
      writeLog(
        `${prettyName(compArena.name)} used ${
          isSpecial ? 'Special Attack' : 'Hit'
        } for ${dmg} dmg${tag}${isCrit ? ' (CRIT!)' : ''}.`
      );

      if (isSpecial) setChargeComputer(0);
      else setChargeComputer(c => Math.min(3, c + 1));

      setDefendingUser(false);

      if (remaining <= 0) {
        writeLog(`${prettyName(userArena.overview.name)} fainted.`);
        setDefeatedUser(p => [...p, userArena.overview.id]);
        const nextIdx = userCards.findIndex(
          c => c.overview!.id !== userArena.overview.id && getStat(c.overview!.stats, 'hp') > 0
        );
        if (nextIdx >= 0) {
          await delay(800);
          dispatch(addToArena(userCards[nextIdx]));
          writeLog(`You sent out ${prettyName(userCards[nextIdx].overview!.name)}.`);
          dispatch(setTurn('user'));
        } else {
          await delay(600);
          endBattle(false);
        }
        return;
      }
      dispatch(setTurn('user'));
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiTurnPending, computerMove]);

  /* ---------- Render ---------- */

  const userMaxHp = userArena ? getStat(userArena.overview.stats, 'hp') : 0;
  const compMaxHp = compArena ? getStat(compArena.stats, 'hp') : 0;

  return (
    <div className={css.arenaContainer}>
      <header className={css.arenaHead}>
        <div>
          <span className={css.eyebrow}>Battle Arena</span>
          <h2>3v3 turn-based duel</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowRules(p => !p)} iconLeft={<LuInfo />}>
          {showRules ? 'Hide rules' : 'Rules'}
        </Button>
      </header>

      {showRules && (
        <motion.div
          className={css.rules}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <h4>How to battle</h4>
          <ul>
            <li>Add three Pokémon to your battle squad from your shelf.</li>
            <li>Pick a difficulty (Easy / Medium / Hard / Master).</li>
            <li>
              Attack reduces enemy HP. Defend reduces incoming damage by 50% and partially charges
              your special meter.
            </li>
            <li>Special Attack unlocks after charging it three times. It hits much harder.</li>
            <li>Type matchups apply: ×0.5 / ×1 / ×2 (and chains for dual types).</li>
            <li>Critical hits land randomly for 1.5× damage.</li>
            <li>
              Win to earn coins, lose and forfeit some Pokémon — penalty scales with difficulty.
            </li>
          </ul>
        </motion.div>
      )}

      {!isGameStarted && (
        <div className={css.setup}>
          <div className={css.setupRow}>
            <span className={css.setupLabel}>1 · Pick difficulty</span>
            <div className={css.diffRow}>
              {(['easy', 'medium', 'hard', 'master'] as Difficulty[]).map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => fetchAI(d)}
                  className={`${css.diffBtn} ${difficulty === d ? css.diffActive : ''} ${css[`diff_${d}`]}`}
                >
                  {d.toUpperCase()}
                  <small>+{REWARDS[d]}¢ · -{PENALTIES[d]} loss</small>
                </button>
              ))}
            </div>
          </div>
          <div className={css.setupRow}>
            <span className={css.setupLabel}>2 · Choose your starter</span>
            <SquadList
              cards={userCards}
              activeId={userArena?.overview?.id}
              onPick={c => dispatch(addToArena(c))}
              defeatedIds={defeatedUser}
              variant="user"
            />
          </div>
          <div className={css.setupRow}>
            <span className={css.setupLabel}>3 · AI roster</span>
            <SquadList
              cards={compCards.map(c => ({ overview: c }))}
              activeId={undefined}
              defeatedIds={defeatedComputer}
              variant="ai"
            />
          </div>
          <div className={css.setupCta}>
            <Button
              variant="primary"
              size="lg"
              iconLeft={<LuPlay />}
              disabled={!difficulty || userCards.length < 3 || compCards.length < 3 || !userArena}
              onClick={startBattle}
            >
              Start battle
            </Button>
            <Button
              variant="ghost"
              size="md"
              iconLeft={<LuRefreshCw />}
              onClick={() => {
                dispatch(resetBattleSquads());
                setDifficulty(null);
                Notiflix.Notify.info('Battle squads reset.');
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      {isGameStarted && userArena && compArena && (
        <div className={css.stage}>
          <div className={css.turnBadge}>
            <Pokeball size={14} spinning={userMove} />
            {userMove ? 'Your turn' : "AI's turn"}
          </div>

          {/* Computer side */}
          <div className={`${css.fighterRow} ${css.fighterTop}`}>
            <FighterCard
              name={prettyName(compArena.name)}
              id={compArena.id}
              hp={getStat(compArena.stats, 'hp')}
              maxHp={compMaxHp || 1}
              types={compTypes}
              defending={defendingComputer}
              attacking={animComputerAttack}
              floatText={floatTextComputer}
              charge={chargeComputer}
              spriteUrl={compArena.sprites?.front_default ?? spriteOfficial(compArena.id)}
              owner="ai"
            />
          </div>

          {/* User side */}
          <div className={`${css.fighterRow} ${css.fighterBottom}`}>
            <FighterCard
              name={prettyName(userArena.overview.name)}
              id={userArena.overview.id}
              hp={getStat(userArena.overview.stats, 'hp')}
              maxHp={userMaxHp || 1}
              types={userTypes}
              defending={defendingUser}
              attacking={animUserAttack}
              floatText={floatTextUser}
              charge={chargeUser}
              spriteUrl={
                userArena.overview.sprites?.back_default ??
                userArena.overview.sprites?.front_default ??
                spriteOfficial(userArena.overview.id)
              }
              owner="user"
            />
          </div>

          <div className={css.gameControls}>
            <div className={css.actions}>
              <Button
                variant="primary"
                fullWidth
                iconLeft={<LuSwords />}
                disabled={!userMove}
                onClick={() => handleUserAction({ kind: 'attack', movePower: 45 })}
              >
                Attack <small>{getStat(userArena.overview.stats, 'attack')}</small>
              </Button>
              <Button
                variant="secondary"
                fullWidth
                iconLeft={<LuZap />}
                disabled={!userMove || chargeUser < 3}
                onClick={() =>
                  handleUserAction({ kind: 'special', movePower: 75 })
                }
              >
                Special <small>
                  {chargeUser >= 3 ? 'READY' : `${chargeUser}/3 charged`}
                </small>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                iconLeft={<LuShield />}
                disabled={!userMove}
                onClick={() => handleUserAction({ kind: 'defend' })}
              >
                Defend <small>{getStat(userArena.overview.stats, 'defense')}</small>
              </Button>
              <Button
                variant="danger"
                size="sm"
                fullWidth
                onClick={() => endBattle(false)}
              >
                Forfeit
              </Button>
            </div>

            <div className={css.log} ref={logRef}>
              <header>Battle log</header>
              <ul>
                {log.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showResult && (
          <motion.div
            className={css.resultBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResult(null)}
          >
            <motion.div
              className={`${css.resultModal} ${
                showResult === 'won' ? css.resultWon : css.resultLost
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            >
              <header>
                {showResult === 'won' ? <LuTrophy size={42} /> : <LuFlame size={42} />}
                <h2>
                  {showResult === 'won'
                    ? 'Victory!'
                    : 'Defeat...'}
                </h2>
              </header>
              <p>
                {showResult === 'won'
                  ? `You earned ${REWARDS[difficulty ?? 'easy']} coins.`
                  : `You lost ${PENALTIES[difficulty ?? 'easy']} Pokémon from your collection.`}
              </p>
              {showResult === 'lost' && lostPokemons.length > 0 && (
                <div className={css.lostList}>
                  {lostPokemons.map((p: any) => (
                    <div key={p.overview.id} className={css.lostTile}>
                      <img
                        alt={p.overview.name}
                        src={
                          p.overview.sprites?.other?.home?.front_default ??
                          spriteOfficial(p.overview.id)
                        }
                      />
                      <span>{prettyName(p.overview.name)}</span>
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setShowResult(null);
                  dispatch(resetBattleSquads());
                  setDifficulty(null);
                }}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Battle;

/* ---------- Sub-components ---------- */

interface SquadProps {
  cards: any[];
  activeId?: number;
  onPick?: (c: any) => void;
  defeatedIds?: number[];
  variant: 'user' | 'ai';
}

const SquadList = ({ cards, activeId, onPick, defeatedIds = [], variant }: SquadProps) => {
  if (cards.length === 0) {
    return (
      <div className={css.squadEmpty}>
        {variant === 'user'
          ? 'Add 3 Pokémon to your battle squad from your shelf.'
          : 'Pick a difficulty to summon AI opponents.'}
      </div>
    );
  }
  return (
    <ul className={css.squad}>
      {cards.map((c: any) => {
        const o = c.overview;
        const id = o.id;
        const isActive = activeId === id;
        const isDefeated = defeatedIds.includes(id);
        return (
          <li key={id}>
            <button
              type="button"
              className={`${css.squadItem} ${isActive ? css.squadActive : ''} ${
                isDefeated ? css.squadDefeated : ''
              }`}
              onClick={onPick ? () => onPick(c) : undefined}
              disabled={!onPick || isDefeated}
            >
              <img
                src={spriteOfficial(id)}
                onError={e => {
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                }}
                alt={o.name}
              />
              <span>{prettyName(o.name)}</span>
              <span className={css.squadId}>{paddedId(id)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

interface FighterProps {
  name: string;
  id: number;
  hp: number;
  maxHp: number;
  types: PokemonType[];
  defending: boolean;
  attacking: boolean;
  floatText: string;
  charge: number;
  spriteUrl: string;
  owner: 'user' | 'ai';
}

const FighterCard = ({
  name,
  id,
  hp,
  maxHp,
  types,
  defending,
  attacking,
  floatText,
  charge,
  spriteUrl,
  owner,
}: FighterProps) => {
  const pct = Math.max(0, (hp / Math.max(1, maxHp)) * 100);
  return (
    <div className={`${css.fighter} ${css[`fighter_${owner}`]}`}>
      <div className={css.fighterMeta}>
        <div className={css.fighterTopRow}>
          <h3>{name}</h3>
          <span className={css.fighterId}>{paddedId(id)}</span>
        </div>
        <div className={css.fighterTypes}>
          {types.map(t => (
            <TypeBadge key={t} type={t} size="sm" />
          ))}
        </div>
        <div className={css.hpBar}>
          <motion.div
            className={css.hpFill}
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                pct < 25
                  ? 'linear-gradient(90deg, #f87171, #dc2626)'
                  : pct < 60
                  ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                  : 'linear-gradient(90deg, #34d399, #10b981)',
            }}
          />
        </div>
        <div className={css.fighterMetrics}>
          <span>
            HP: {hp}/{maxHp}
          </span>
          <span className={css.charge}>
            Special:{' '}
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className={`${css.chargeDot} ${i < charge ? css.chargeOn : ''}`}
              />
            ))}
          </span>
        </div>
      </div>
      <div className={css.fighterArt}>
        {floatText && (
          <motion.div
            className={css.floatText}
            initial={{ opacity: 0, y: 0, scale: 0.9 }}
            animate={{ opacity: 1, y: -50, scale: 1.2 }}
            transition={{ duration: 1.1 }}
          >
            {floatText}
          </motion.div>
        )}
        <motion.img
          src={spriteUrl}
          alt={name}
          className={`${css.fighterImg} ${defending ? css.imgDefending : ''} ${
            attacking ? (owner === 'user' ? css.imgAttackingUser : css.imgAttackingAI) : ''
          }`}
          animate={
            defending
              ? { x: [0, -4, 4, -4, 4, 0] }
              : attacking
              ? owner === 'user'
                ? { x: [0, 30, -10, 0], scale: [1, 1.1, 0.95, 1] }
                : { x: [0, -30, 10, 0], scale: [1, 1.1, 0.95, 1] }
              : { x: 0, scale: 1 }
          }
          transition={{ duration: 0.6 }}
          onError={e => {
            e.currentTarget.src = spriteOfficial(id);
          }}
        />
      </div>
    </div>
  );
};
