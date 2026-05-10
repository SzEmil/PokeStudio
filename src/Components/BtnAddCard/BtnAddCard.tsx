import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { addCard } from '../../Redux/auth/authOperations';
import { addCardCollected } from '../../Redux/stats/statsSlice';
import { selectPackedPokemon } from '../../Redux/pokeShop/pokeShopSelectors';
import { setPackedPokemonState } from '../../Redux/pokeShop/pokeShopSlice';
import { Button } from '../UI/Button';
import { LuPlus } from 'react-icons/lu';

export const BtnAddCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const hotpoke: any = useSelector(selectPackedPokemon);

  const handleOnClick = () => {
    dispatch(addCard({ card: hotpoke }));
    dispatch(addCardCollected());
    dispatch(setPackedPokemonState());
  };
  return (
    <Button variant="primary" iconLeft={<LuPlus />} onClick={handleOnClick}>
      Add to shelf
    </Button>
  );
};
