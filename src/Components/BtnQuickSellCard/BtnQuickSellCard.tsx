import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { quickSellCard } from '../../Redux/auth/authOperations';
import { addCardSold } from '../../Redux/stats/statsSlice';
import { setPackedPokemonState } from '../../Redux/pokeShop/pokeShopSlice';
import { Button } from '../UI/Button';
import { LuCoins } from 'react-icons/lu';

type Props = { ovrl: number };

export const calculatePrice = (ovrl: number) => Number(ovrl * 3);

export const BtnQuickSellCard = ({ ovrl }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const price = calculatePrice(ovrl);

  const handleOnClick = () => {
    dispatch(quickSellCard(price));
    dispatch(addCardSold());
    dispatch(setPackedPokemonState());
  };

  return (
    <Button variant="ghost" iconLeft={<LuCoins />} onClick={handleOnClick}>
      Quick sell · {price}¢
    </Button>
  );
};
