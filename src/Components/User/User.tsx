import { useSelector } from 'react-redux';
import { selectAuthUser, selectAuthUserCoins } from '../../Redux/auth/authSelectors';
import { selectStats } from '../../Redux/stats/statsSelectors';
import { levelFromXp } from '../../Redux/stats/statsSlice';
import css from './User.module.css';

export const User = () => {
  const user = useSelector(selectAuthUser);
  const coins = useSelector(selectAuthUserCoins);
  const stats = useSelector(selectStats);
  const cardsCount = Math.max(0, (user.cards?.length ?? 1) - 1);
  const initial = (user.username ?? '?').charAt(0).toUpperCase();
  const lvl = levelFromXp(stats.xp);

  return (
    <div className={css.user}>
      <div className={css.avatar} aria-hidden>
        <span>{initial}</span>
        <span className={css.levelDot}>L{lvl.level}</span>
      </div>
      <div className={css.info}>
        <span className={css.name}>{user.username}</span>
        <div className={css.meta}>
          <span className={css.coinChip} title="Coins">
            <span className={css.coinDot} />
            {coins?.toLocaleString() ?? 0}
          </span>
          <span className={css.cardsChip} title="Pokémon collected">
            {cardsCount} cards
          </span>
        </div>
      </div>
    </div>
  );
};
