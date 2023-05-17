import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { addCard } from '../../Redux/auth/authOperations';
import { selectPackedPokemon } from '../../Redux/pokeShop/pokeShopSelectors';
import css from './BtnAddCard.module.css';
import { selectAuthUserCoins } from '../../Redux/auth/authSelectors';
import { setPackedPokemonState } from '../../Redux/pokeShop/pokeShopSlice';

type priceType = {
  price: number;
};
export const BtnAddCard = ({ price }: priceType) => {
  const dispatch: AppDispatch = useDispatch();
  const hotpoke: any = useSelector(selectPackedPokemon);
  const coins = useSelector(selectAuthUserCoins);

  const handleOnClick = async () => {
    const card = hotpoke;
    if (coins! < price) return console.error('not enough coins!');
    dispatch(addCard({ card }));
    dispatch(setPackedPokemonState());
  };
  return (
    <button className={css.btn} type="button" onClick={handleOnClick}>
      Add card
    </button>
  );
};
