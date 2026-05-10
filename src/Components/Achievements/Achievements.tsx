import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../../data/achievements';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { unlockAchievement } from '../../Redux/stats/statsSlice';
import { AppDispatch } from '../../Redux/store';
import { LuTrophy, LuLock } from 'react-icons/lu';
import css from './Achievements.module.css';

export const Achievements = () => {
  const stats = useSelector(selectStats);
  const dispatch: AppDispatch = useDispatch();

  /* Auto-unlock newly fulfilled achievements */
  useEffect(() => {
    ACHIEVEMENTS.forEach(a => {
      if (a.test(stats) && !stats.achievements.includes(a.id)) {
        dispatch(unlockAchievement(a.id));
      }
    });
  }, [dispatch, stats]);

  const unlocked = stats.achievements.length;
  const total = ACHIEVEMENTS.length;
  const pct = (unlocked / total) * 100;

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div>
          <h2 className={css.title}>
            <LuTrophy /> Achievements
          </h2>
          <p className={css.lead}>
            {unlocked} of {total} unlocked ({pct.toFixed(0)}%)
          </p>
        </div>
        <div className={css.progressBar}>
          <motion.div
            className={css.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <div className={css.grid}>
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = stats.achievements.includes(a.id);
          return (
            <motion.div
              key={a.id}
              className={`${css.tile} ${isUnlocked ? css.unlocked : css.locked}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <div className={css.icon}>
                {isUnlocked ? <span>{a.icon}</span> : <LuLock />}
              </div>
              <div className={css.info}>
                <h4>{a.name}</h4>
                <p>{a.description}</p>
              </div>
              {isUnlocked && <span className={css.badge}>Unlocked</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
