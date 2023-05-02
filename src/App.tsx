
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from './Redux/pokemons/pokemonsOperations';
import { useSelector } from 'react-redux';
import { selectPokemons } from './Redux/pokemons/pokemonsSelectors';

export const App = () => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(fetchPokemons());
  };
  const pokeData = useSelector(selectPokemons);
  const handlePokeData = () => {
    console.log(pokeData);
  };
  return (
    <div>
      <button type="button" onClick={handleOnClick}>
        FETCH POKEMONS
      </button>
      <button type="button" onClick={handlePokeData}>
        WHAT IN THE BOX
      </button>
    </div>
  );
};
