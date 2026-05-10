import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { setDailyClaimed } from '../../Redux/stats/statsSlice';
import { getMoneyForBattle } from '../../Redux/auth/authOperations';
import { selectAuthIsLoggedIn } from '../../Redux/auth/authSelectors';
import { AppDispatch } from '../../Redux/store';
import { todayKey, clamp } from '../../utils/pokeUtils';
import { Button } from '../UI/Button';
import { Pokeball } from '../UI/Pokeball';
import css from './DailyQuest.module.css';
import { LuGift, LuFlame, LuCheck } from 'react-icons/lu';
import Notiflix from 'notiflix';

/* Deterministic daily reward using day-key as a seed */
function dayHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const TIPS = [
  'Bug-types crumble under Fire, Flying and Rock attacks.',
  'Steel resists most types — pair with Fighting/Fire/Ground to break through.',
  'A Ghost-type cannot be hit by a Normal attack at all.',
  'Special attacks scale with Sp. Atk vs the target’s Sp. Def.',
  'Legendaries roll only ~9% of Gold packs, but 100% of Legendary packs.',
  'Type STAB grants 1.5× damage when an attack matches the user’s type.',
  'In doubles, an Electric attack hits a Flying-type for super-effective damage.',
  'Dark beats Psychic — but Fairy beats Dark right back.',
];

export const DailyQuest = () => {
  const dispatch: AppDispatch = useDispatch();
  const stats = useSelector(selectStats);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const today = todayKey();

  const claimed = stats.dailyClaimed === today;
  const reward = useMemo(() => {
    const seed = dayHash(today);
    const baseRewards = [200, 300, 400, 500, 750];
    const idx = seed % baseRewards.length;
    const tip = TIPS[seed % TIPS.length];
    return { coins: baseRewards[idx], tip };
  }, [today]);

  const [secondsToReset, setSecondsToReset] = useState(0);
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      setSecondsToReset(Math.floor((tomorrow.getTime() - now.getTime()) / 1000));
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const handleClaim = () => {
    if (!isLoggedIn) {
      Notiflix.Notify.warning('Sign in to claim daily rewards.');
      return;
    }
    if (claimed) return;
    dispatch(getMoneyForBattle(reward.coins));
    dispatch(setDailyClaimed(today));
    Notiflix.Notify.success(`+${reward.coins} coins claimed! Streak: ${stats.dailyStreak + 1}`);
  };

  const hh = String(Math.floor(secondsToReset / 3600)).padStart(2, '0');
  const mm = String(Math.floor((secondsToReset / 60) % 60)).padStart(2, '0');
  const ss = String(secondsToReset % 60).padStart(2, '0');

  return (
    <motion.div
      className={css.wrap}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css.banner}>
        <div className={css.bannerLeft}>
          <Pokeball size={42} />
          <div>
            <span className={css.eyebrow}>Daily Quest</span>
            <h2 className={css.title}>Trainer’s Coin Pouch</h2>
            <p className={css.lead}>
              Visit every day to claim coins and grow your daily streak. Today’s reward
              awaits.
            </p>
          </div>
        </div>
        <div className={css.streak}>
          <LuFlame />
          <strong>{stats.dailyStreak}</strong>
          <span>day streak</span>
        </div>
      </div>

      <div className={css.grid}>
        <div className={css.card}>
          <span className={css.cardLabel}>Today's reward</span>
          <div className={css.coins}>
            <span className={css.coinDot} />
            <strong>{reward.coins}</strong>
            <span>coins</span>
          </div>
          {claimed ? (
            <div className={css.claimedBadge}>
              <LuCheck /> Claimed — come back in
              <span className={css.timer}>
                {hh}:{mm}:{ss}
              </span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              fullWidth
              iconLeft={<LuGift />}
              onClick={handleClaim}
            >
              Claim today’s reward
            </Button>
          )}
        </div>

        <div className={css.card}>
          <span className={css.cardLabel}>Trainer’s tip</span>
          <p className={css.tip}>{reward.tip}</p>
          <div className={css.streakBar}>
            {[0, 1, 2, 3, 4, 5, 6].map(i => {
              const filled = i < clamp(stats.dailyStreak % 7, 0, 7);
              return (
                <span
                  key={i}
                  className={`${css.streakDot} ${filled ? css.streakDotOn : ''}`}
                />
              );
            })}
          </div>
          <small>Reach 7-day streak for an "Daily Dedication" achievement.</small>
        </div>
      </div>
    </motion.div>
  );
};
