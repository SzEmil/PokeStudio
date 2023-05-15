import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { addCard } from '../../Redux/auth/authOperations';
import { selectPokemonDetails } from '../../Redux/pokemonInfo/pokemonInfoSelectors';

type hotpokeData = Record<string, unknown>;
export const BtnAddCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const hotpoke = useSelector(selectPokemonDetails);
  const handleOnClick = () => {
    const card: hotpokeData = hotpoke;

    dispatch(addCard(card));
  };
  return (
    <button type="button" onClick={handleOnClick}>
      Add card
    </button>
  );
};