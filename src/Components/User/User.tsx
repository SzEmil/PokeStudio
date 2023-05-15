import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import css from './User.module.css';

export const User = () => {
  const user = useSelector(selectAuthUser);
  return (
    <div className={css.user}>
      <FiUser size="24px" />
      <h3 className={css.userTitle}>{user.username}</h3>
    </div>
  );
};
