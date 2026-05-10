import { logOutUser } from '../../Redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { Button } from '../UI/Button';
import { FiLogOut } from 'react-icons/fi';

export const BtnLogOut = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Button
      variant="ghost"
      size="sm"
      iconLeft={<FiLogOut size={14} />}
      onClick={() => dispatch(logOutUser())}
    >
      Sign out
    </Button>
  );
};
