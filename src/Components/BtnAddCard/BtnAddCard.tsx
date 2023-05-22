import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { addCard } from '../../Redux/auth/authOperations';
import { selectPackedPokemon } from '../../Redux/pokeShop/pokeShopSelectors';
import css from './BtnAddCard.module.css';
import { setPackedPokemonState } from '../../Redux/pokeShop/pokeShopSlice';

export const BtnAddCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const hotpoke: any = useSelector(selectPackedPokemon);

  const handleOnClick = async () => {
    const card = hotpoke;

    dispatch(addCard({ card }));
    dispatch(setPackedPokemonState());
  };
  return (
    <button className={css.btn} type="button" onClick={handleOnClick}>
      Add card
    </button>
  );
};
