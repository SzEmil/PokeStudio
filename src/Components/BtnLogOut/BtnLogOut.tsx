import { logOutUser } from '../../Redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
export const BtnLogOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(logOutUser());
  };
  return (
    <div>
      <button type="button" onClick={handleOnClick}>
        LogOut
      </button>
    </div>
  );
};
