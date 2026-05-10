import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Section } from '../../Components/Section/Section';
import { selectAuthUser, selectAuthIsLoggedIn } from '../../Redux/auth/authSelectors';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { levelFromXp, levelTitle } from '../../Redux/stats/statsSlice';
import { Achievements } from '../../Components/Achievements/Achievements';
import { Button } from '../../Components/UI/Button';
import { ACHIEVEMENTS } from '../../data/achievements';
import css from './Profile.module.css';
import {
  LuTrophy,
  LuFlame,
  LuPackage,
  LuStar,
  LuSwords,
  LuCoins,
  LuTarget,
  LuBrain,
} from 'react-icons/lu';

const Profile = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const user = useSelector(selectAuthUser);
  const stats = useSelector(selectStats);

  if (!isLoggedIn) {
    return (
      <Section>
        <div className={css.guard}>
          <h2>Sign in to access your profile</h2>
          <p>Track your achievements, battle history and progress.</p>
          <NavLink to="/register">
            <Button variant="primary" size="lg">
              Get started
            </Button>
          </NavLink>
        </div>
      </Section>
    );
  }

  const totalCards = Math.max(0, (user.cards?.length ?? 1) - 1);
  const winRate =
    stats.battlesWon + stats.battlesLost > 0
      ? Math.round((stats.battlesWon / (stats.battlesWon + stats.battlesLost)) * 100)
      : 0;
  const triviaAcc =
    stats.triviaPlayed > 0 ? Math.round((stats.triviaCorrect / stats.triviaPlayed) * 100) : 0;
  const catchAcc =
    stats.catchesAttempted > 0
      ? Math.round((stats.catchesSucceeded / stats.catchesAttempted) * 100)
      : 0;

  const lvl = levelFromXp(stats.xp);
  const title = levelTitle(lvl.level);

  return (
    <div className={css.page}>
      <Section>
        <motion.header
          className={css.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={css.avatar}>
            {(user.username ?? '?').charAt(0).toUpperCase()}
            <span className={css.levelChip}>L{lvl.level}</span>
          </div>
          <div className={css.heroBody}>
            <span className={css.eyebrow}>Trainer profile</span>
            <h1>{user.username}</h1>
            <p>{user.email}</p>

            <div className={css.xpRow}>
              <div className={css.xpHead}>
                <strong>{title}</strong>
                <span>
                  {lvl.current} / {lvl.needed} XP to L{lvl.level + 1}
                </span>
              </div>
              <div className={css.xpBar}>
                <motion.div
                  className={css.xpFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${lvl.pct}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className={css.badges}>
              <span className={css.badgeRank}>{title}</span>
              <span className={css.badge}>
                <LuTrophy /> {stats.achievements.length}/{ACHIEVEMENTS.length}
              </span>
              <span className={css.badge}>
                <LuFlame /> {stats.dailyStreak} day streak
              </span>
            </div>
          </div>
        </motion.header>

        <div className={css.kpis}>
          <KPI label="Cards" value={totalCards} icon={<LuPackage />} accent="brand" />
          <KPI label="Coins" value={(user.coins ?? 0).toLocaleString()} icon={<LuCoins />} accent="gold" />
          <KPI label="Total XP" value={stats.xp.toLocaleString()} icon={<LuStar />} accent="purple" />
          <KPI label="Battles won" value={stats.battlesWon} icon={<LuSwords />} accent="green" />
          <KPI label="Battles lost" value={stats.battlesLost} icon={<LuFlame />} accent="red" />
          <KPI label="Win rate" value={`${winRate}%`} icon={<LuTrophy />} accent="purple" />
          <KPI label="Packs opened" value={stats.packsOpened} icon={<LuPackage />} accent="blue" />
          <KPI label="Legendaries" value={stats.legendaryPulled} icon={<LuStar />} accent="purple" />
          <KPI label="Cards sold" value={stats.cardsSold} icon={<LuCoins />} accent="gold" />
          <KPI label="Catch rate" value={`${catchAcc}%`} icon={<LuTarget />} accent="green" />
          <KPI label="Trivia acc" value={`${triviaAcc}%`} icon={<LuBrain />} accent="blue" />
          <KPI label="Best streak" value={stats.whosThatPokemonBest} icon={<LuFlame />} accent="red" />
        </div>

        <div className={css.section}>
          <Achievements />
        </div>
      </Section>
    </div>
  );
};

export default Profile;

const KPI = ({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent: 'brand' | 'gold' | 'green' | 'blue' | 'purple' | 'red';
}) => (
  <motion.div
    className={`${css.kpi} ${css[`kpi_${accent}`]}`}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className={css.kpiIcon}>{icon}</div>
    <div className={css.kpiInfo}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  </motion.div>
);
