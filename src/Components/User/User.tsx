import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import css from './User.module.css';
import { selectAuthUserCoins } from '../../Redux/auth/authSelectors';

export const User = () => {
  const user = useSelector(selectAuthUser);
  const coins = useSelector(selectAuthUserCoins);
  return (
    <div className={css.user}>
      <FiUser size="24px" />

      <h3 className={css.userTitle}>{user.username}</h3>
      <p className={css.coins}>
        Coins: <span className={css.coinsVal}>{coins}</span>
      </p>
    </div>
  );
};
