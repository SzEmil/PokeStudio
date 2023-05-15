import { logOutUser } from '../../Redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import css from './BtnLogOut.module.css';

export const BtnLogOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(logOutUser());
  };
  return (
    <div>
      <button className={css.btn} type="button" onClick={handleOnClick}>
        LogOut
      </button>
    </div>
  );
};
