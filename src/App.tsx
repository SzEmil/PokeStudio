import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from './Redux/pokemons/pokemonsOperations';
import { useSelector } from 'react-redux';
import { selectPokemons } from './Redux/pokemons/pokemonsSelectors';
import { AppDispatch } from './Redux/store';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { lazy } from 'react';
import { selectRandomPokemon } from './Redux/pokemonInfo/pokemonInfoSelectors';

const HomePage = lazy(() => import('../src/Pages/Home/Home'));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const randomPoke = useSelector(selectRandomPokemon);

  const pokeData = useSelector(selectPokemons);

  const handlePokeData = () => {
    console.log(pokeData);
  };

  return (
    <>
      <div>
        <button type="button" onClick={handlePokeData}>
          WHAT IN THE BOX
        </button>
        <button onClick={() => console.log(randomPoke)}>
          co tam w randomie slychac
        </button>
      </div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
