import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../Redux/auth/authSelectors';
import { selectAuthIsRefreshing } from '../Redux/auth/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  return {
    isLoggedIn,
    isRefreshing,
  };
};
