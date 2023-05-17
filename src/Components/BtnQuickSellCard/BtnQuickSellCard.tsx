import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { quickSellCard } from '../../Redux/auth/authOperations';
import css from './BtnQuickSellCard.module.css';
import { setPackedPokemonState } from '../../Redux/pokeShop/pokeShopSlice';

type BtnQuickSellCardPropType = {
  ovrl: number;
};

export const BtnQuickSellCard = ({ ovrl }: BtnQuickSellCardPropType) => {
  function calculatePrice() {
    return Number(ovrl * 3);
  }

  const dispatch: AppDispatch = useDispatch();
  const price: number = calculatePrice();

  const handleOnClick = () => {
    dispatch(quickSellCard(price));
    dispatch(setPackedPokemonState());
  };
  return (
    <button className={css.btn} type="button" onClick={handleOnClick}>
      Quick Sell for {price}
    </button>
  );
};
